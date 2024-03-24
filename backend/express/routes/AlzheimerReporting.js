import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/get"), async (req, res) => {
    try {
        const alzheimerReporting = await prisma.alzheimerReporting.findMany();

        res.status(200).json(alzheimerReporting);
    } catch (error) {
        console.error("Error Fetching Data Alzheimer Report: ", error);
        res.status(500).send("Internal Server Error")
    }
}

router.post("/create", async (req, res) => {
    
});

router.put("/edit/:id", async (req, res) => {
    
});

router.delete("/delete/:id", async (req, res) => {

});

router.get("/broadcast", async (req, res) => {
    
});

export default router;