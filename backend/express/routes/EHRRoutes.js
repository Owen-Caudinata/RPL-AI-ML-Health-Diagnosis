import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authenticateUser, authenticateAdmin } from "../middleware/auth.js";

const router = Router();
const prisma = new PrismaClient();

router.get("/get", authenticateUser, async (req, res) => {
    try {
        const userId = req.user.userId;
        const ehrRecords = await prisma.electronicHealthRecord.findMany({ where: { userId } });

        res.status(200).json(ehrRecords);
    } catch (error) {
        console.error("Error fetching EHR records:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/create", authenticateUser, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { title, content, published } = req.body;

        const createEHR = await prisma.electronicHealthRecord.create({
            data: {
                title: title,
                content: content,
                published: published,
                userId: userId,
            },
        });

        res.status(201).json(createEHR);
    } catch (error) {
        console.error("Error creating EHR record:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.put("/edit/:id", authenticateUser, async (req, res) => {
    try {
        const userId = req.user.userId;
        const ehrId = parseInt(req.params.id);
        const { title, content, published } = req.body;

        const existingEHR = await prisma.electronicHealthRecord.findUnique({
            where: {
                userId: userId,
                id: ehrId,
            },
        });

        if (!existingEHR) {
            return res.status(404).send("EHR record from current ID not found");
        }

        const editEHR = await prisma.electronicHealthRecord.update({
            where: {
                userId: userId,
                id: ehrId,
            },
            data: {
                title: title || existingEHR.title,
                content: content || existingEHR.content,
                published: published !== undefined ? published : existingEHR.published,
            },
        });

        res.status(200).json(editEHR);
    } catch (error) {
        console.error("Error updating EHR record:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.delete("/delete/:id", authenticateUser, async (req, res) => {
    try {
        const userId = req.user.userId;
        const ehrId = parseInt(req.params.id);

        const ehrRecord = await prisma.electronicHealthRecord.findUnique({
            where: {
                userId: userId,
                id: ehrId,
            },
        });

        if (!ehrRecord) {
            return res.status(404).send("EHR record with ID selected not found");
        }

        await prisma.electronicHealthRecord.delete({
            where: {
                userId: userId,
                id: ehrId,
            },
        });

        res.status(204).send();
    } catch (error) {
        console.error("Error deleting EHR record:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/get-all", authenticateAdmin, async (req, res) => {
    try {
        const ehrRecords = await prisma.electronicHealthRecord.findMany();

        res.status(200).json(ehrRecords);
    } catch (error) {
        console.error("Error fetching EHR records:", error);
        res.status(500).send("Internal Server Error");
    }
});

export default router;
