import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/get", async (req, res) => {
    try {
        const alzheimerReporting = await prisma.alzheimerReporting.findMany();

        res.status(200).json(alzheimerReporting);
    } catch (error) {
        console.error("Error Fetching Data Alzheimer Report: ", error);
        res.status(500).send("Internal Server Error")
    }
})

router.post("/create", async (req, res) => {
    try {
        const { classification, deskription, status, user, userId } = req.body;

        const createAlzh = await prisma.alzheimerReporting.create({
            data: {
                classification: classification,
                deskription: deskription,
                status: status,
                userId: userId,
            },
        });

        res.status(201).json(createAlzh);
    } catch (error) {
        console.error("Error creating Alzh record:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.put("/edit/:id", async (req, res) => {
    try {
        const AlzhId = parseInt(req.params.id);
        const { title, content, published, userId } = req.body;

        const existingAlzh = await prisma.alzheimerReporting.findUnique({
            where: {
                id: AlzhId,
            },
        });

        if (!existingAlzh) {
            return res.status(404).send("Alzheimer reporting record from current ID not found");
        }

        const editAlzh = await prisma.alzheimerReporting.update({
            where: {
                id: AlzhId,
            },
            data: {
                title: title || existingAlzh.title,
                content: content || existingAlzh.content,
                published: published !== undefined ? published : existingAlzh.published,
            },
        });

        res.status(200).json(editAlzh);
    } catch (error) {
        console.error("Error updating Alzh record:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const AlzhId = parseInt(req.params.id);

        const AlzhRecord = await prisma.alzheimerReporting.findUnique({
            where: {
                id: AlzhId,
            },
        });

        if (!AlzhRecord) {
            return res.status(404).send("Alzhimer Reporting record with ID selected not found");
        }

        await prisma.alzheimerReporting.delete({
            where: {
                id: AlzhId,
            },
        });

        res.status(204).send();
    } catch (error) {
        console.error("Error deleting Alzheimer Report record:", error);
        res.status(500).send("Internal Server Error");
    }
});

export default router;