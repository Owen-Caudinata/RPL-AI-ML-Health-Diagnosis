import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/get", async (req, res) => {
    try {
        const pneuomaniaRpt = await prisma.pneuomaniaReport.findMany();

        res.status(200).json(pneuomaniaRpt);
    } catch (error) {
        console.error("Error fetching Pneuomania Report:", error);
        res.status(500).send("Internal Server Error");
    }
})

router.post("/create", async (req, res) => {
    try {
        const { classification, deskription, status, user, userID} = req.body;

        const createPnmania = await prisma.pneuomaniaRpt.create({
            data: {
                classification: classification,
                deskription: deskription,
                status: status,
                userId: userId,
            },
        })

        res.status(201).json(createPnmania);
    } catch (error) {
        console.error("Error creating Pneuomania record:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.put("/edit/:id", async (req, res) => {
    
});

router.delete("/delete/:id", async (req, res) => {
    
});

router.get("/broadcast", async (req, res) => {
    
});