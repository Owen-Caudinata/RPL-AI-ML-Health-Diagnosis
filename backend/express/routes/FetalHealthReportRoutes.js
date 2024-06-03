import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authenticateAdmin } from "../middleware/auth.js";

const router = Router();
const prisma = new PrismaClient();

router.get("/get", async (req, res) => {
    try {
        const fetalHealthReport = await prisma.fetalHealthReport.findMany();

        res.status(200).json(fetalHealthReport);
    } catch (error) {
        console.error("Error Fetching Data fetalHealth Report: ", error);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/create", authenticateAdmin, async (req, res) => {
    try {
        const { predictionId, description, userId } = req.body;

        const createAlzh = await prisma.fetalHealthReport.create({
            data: {
                predictionId: predictionId,
                description: description,
                userId: userId,
            },
        });

        res.status(201).json(createAlzh);
    } catch (error) {
        console.error("Error creating Fetal Health record:", error);
        res.status(500).send("Internal Server Error");
    }
});



export default router;