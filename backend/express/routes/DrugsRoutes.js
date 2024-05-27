import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authenticateAdmin } from "../middleware/auth.js";

const router = Router();
const prisma = new PrismaClient();

router.get("/get-all", authenticateAdmin, async (req, res) => {
    try {
    const drugs = await prisma.drugs.findMany();
    res.status(200).json(drugs);
    } catch (error) {
    console.error("Error fetching Drugs Records:", error);
    res.status(500).send("Internal Server Error");
    }
});

router.post("/create", authenticateAdmin, async (req, res) => {
    try {
    const { nameDrugs, category, description } = req.body;
    const createDrugs = await prisma.drugs.create({
        data: {
        nameDrugs: nameDrugs,
        category: category,
        description: description,
        },
    });
    res.status(201).json(createDrugs);
    } catch (error) {
    console.error("Error creating Drugs Record:", error);
    res.status(500).send("Internal Server Error");
    }
});

router.put("/edit/:id", authenticateAdmin, async (req, res) => {
    try {
    const drugsId = parseInt(req.params.id);
    const { nameDrugs, category, description } = req.body;

    const existingDrugs = await prisma.drugs.findUnique({
        where: {
        id: drugsId,
        },
    });

    if (!existingDrugs) {
        return res.status(404).send("Drugs Record not found");
    }

    const editDrugs = await prisma.drugs.update({
        where: {
            id: drugsId,
        },
        data: {
        nameDrugs: nameDrugs || existingDrugs.nameDrugs,
        category: category || existingDrugs.category,
        description: description || existingDrugs.description,
        updatedAt: new Date(),
        },
    });

    res.status(200).json(editDrugs);
    } catch (error) {
    console.error("Error updating Drugs Record:", error);
    res.status(500).send("Internal Server Error");
}
});

router.delete("/delete/:id", authenticateAdmin, async (req, res) => {
    try {
    const drugsId = parseInt(req.params.id);

    const drugsRecord = await prisma.drugs.findUnique({
        where: {
        id: drugsId,
    },
    });

    if (!drugsRecord) {
        return res.status(404).send("Drugs Record not found");
    }

    await prisma.drugs.delete({
        where: {
        id: drugsId,
        },
    });

    res.status(204).send();
    } catch (error) {
    console.error("Error deleting Drugs Record:", error);
    res.status(500).send("Internal Server Error");
    }
});

export default router;
