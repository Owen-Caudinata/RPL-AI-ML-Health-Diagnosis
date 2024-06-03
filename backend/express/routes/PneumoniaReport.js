import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authenticateAdmin } from "../middleware/auth.js";

const router = Router();
const prisma = new PrismaClient();

router.get("/get", async (req, res) => {
    try {
        const pneumoniaReporting = await prisma.pneumoniaReport.findMany();

        res.status(200).json(pneumoniaReporting);
    } catch (error) {
        console.error("Error Fetching Data Pneumonia Report: ", error);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/create", authenticateAdmin, async (req, res) => {
    try {
        const { predictionId, description, userId } = req.body;

        const createPneumonia = await prisma.pneumoniaReport.create({
            data: {
                predictionId: predictionId,
                description: description,
                userId: userId,
            },
        });

        res.status(201).json(createPneumonia);
    } catch (error) {
        console.error("Error creating Pneumonia  record:", error);
        res.status(500).send("Internal Server Error");
    }
});



export default router;