import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authenticateAdmin, authenticateUser } from "../middleware/auth.js";

const router = Router();
const prisma = new PrismaClient();

router.post("/create", authenticateAdmin, async (req, res) => {
    try {
        const { manufacturer, name, category, description, published } = req.body;

        const createDrug = await prisma.drug.create({
            data: {
                manufacturer,
                name,
                category,
                description,
                published: published || false, // Default to false if not provided
            },
        });

        res.status(201).json(createDrug);
    } catch (error) {
        console.error("Error creating Drug record:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.put("/edit/:id", authenticateAdmin, async (req, res) => {
    try {
        const drugId = parseInt(req.params.id);
        const { manufacturer, name, category, description, published } = req.body;

        const existingDrug = await prisma.drug.findUnique({
            where: {
                id: drugId,
            },
        });

        if (!existingDrug) {
            return res.status(404).send("Drug record with the given ID not found");
        }

        const updatedDrug = await prisma.drug.update({
            where: {
                id: drugId,
            },
            data: {
                manufacturer: manufacturer !== undefined ? manufacturer : existingDrug.manufacturer,
                name: name !== undefined ? name : existingDrug.name,
                category: category !== undefined ? category : existingDrug.category,
                description: description !== undefined ? description : existingDrug.description,
                published: published !== undefined ? published : existingDrug.published,
            },
        });

        res.status(200).json(updatedDrug);
    } catch (error) {
        console.error("Error updating Drug record:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.delete("/delete/:id", authenticateAdmin, async (req, res) => {
    try {
        const drugId = parseInt(req.params.id);

        const drugRecord = await prisma.drug.findUnique({
            where: {
                id: drugId,
            },
        });

        if (!drugRecord) {
            return res.status(404).send("Drug record with the given ID not found");
        }

        await prisma.drug.delete({
            where: {
                id: drugId,
            },
        });

        res.status(204).send();
    } catch (error) {
        console.error("Error deleting Drug record:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/get-all", authenticateAdmin, async (req, res) => {
    try {
        const drugsRecords = await prisma.drug.findMany();

        res.status(200).json(drugsRecords);
    } catch (error) {
        console.error("Error fetching Drugs records:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/get-all-published", authenticateUser, async (req, res) => {
    try {
        const drugsRecords = await prisma.drug.findMany({
            where: {
                published: true
            }
        });

        res.status(200).json(drugsRecords);
    } catch (error) {
        console.error("Error fetching Drugs records:", error);
        res.status(500).send("Internal Server Error");
    }
});


export default router;