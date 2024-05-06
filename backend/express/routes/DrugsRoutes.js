import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authenticateUser, authenticateAdmin } from "../middleware/auth.js";

const router = Router();
const prisma = new PrismaClient();

router.get("/get", authenticateUser, async (req, res) => {
    try {
        const userId = req.user.userId;
        const drugsRecords = await prisma.drugsRecord.findMany({ where: { userId } });

        res.status(200).json(drugsRecords);
    } catch (error) {
        console.error("Error fetching Drugs records:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/create", authenticateUser, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { drugsID, nameDrugs, category, description } = req.body;

        const createDrugs = await prisma.drugsRecord.create({
            data: {
                drugsID: drugsID,
                nameDrugs: nameDrugs,
                category: category,
                description: description,
                userId: userId,
            },
        });

        res.status(201).json(createDrugs);
    } catch (error) {
        console.error("Error creating Drugs record:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.put("/edit/:id", authenticateUser, async (req, res) => {
    try {
        const userId = req.user.userId;
        const drugsId = parseInt(req.params.id);
        const { drugsID, nameDrugs, category, description } = req.body;

        const existingDrugs = await prisma.drugsRecord.findUnique({
            where: {
                userId: userId,
                id: drugsId,
            },
        });

        if (!existingDrugs) {
            return res.status(404).send("Drugs record from current ID not found");
        }

        const editDrugs = await prisma.drugsRecord.update({
            where: {
                userId: userId,
                id: drugsId,
            },
            data: {
                drugsID: drugsID || existingDrugs.drugsID,
                nameDrugs: nameDrugs || existingDrugs.nameDrugs,
                category: category !== undefined ? category : existingDrugs.category,
                description: description || existingDrugs.description
            },
        });

        res.status(200).json(editDrugs);
    } catch (error) {
        console.error("Error updating Drugs record:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.delete("/delete/:id", authenticateUser, async (req, res) => {
    try {
        const userId = req.user.userId;
        const drugsId = parseInt(req.params.id);

        const drugsRecord = await prisma.drugsRecord.findUnique({
            where: {
                userId: userId,
                id: drugsId,
            },
        });

        if (!drugsRecord) {
            return res.status(404).send("Drugs record with ID selected not found");
        }

        await prisma.drugsRecord.delete({
            where: {
                userId: userId,
                id: drugsId,
            },
        });

        res.status(204).send();
    } catch (error) {
        console.error("Error deleting Drugs record:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/get-all", authenticateAdmin, async (req, res) => {
    try {
        const drugsRecords = await prisma.drugsRecord.findMany();

        res.status(200).json(drugsRecords);
    } catch (error) {
        console.error("Error fetching Drugs records:", error);
        res.status(500).send("Internal Server Error");
    }
});

export default router;