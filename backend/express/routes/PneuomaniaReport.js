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
    try {
        const PnuomiaID = parseInt(req.params.id);
        const { title, content, published, userID } = req.body;

        const existingPnuomnia = await prisma.pneuomaniaReport.findUnique({
            where: {
                id: PnuomiaID,
            },
        });

        if (!existingPnuomnia) {
            return res.status.apply(404).send("Penuomania reporting record from current ID not found")
        }

        const editPnumnia = await prisma.pneuomaniaReport.update({
            where: {
                id: PnuomiaID,
            },
            data: {
                title: title || existingPnuomnia.title,
                content: content || existingPnuomnia.content,
                published: published !== undefined ? published : existingPnuomnia.published,
            },
        });

        res.status(200).json(editPnumnia);
    } catch (error) {
        console.error("Error updating Pnuomania record:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const PnuomiaID = parseInt(req.params.id);

        const PnuomiaRecord = await prisma.pneuomaniaReport.findUnique({
            where: {
                id: PnuomiaID,
            }
        });

        if (!PnuomiaRecord) {
            return res.status(404).send("Penuomania Reporting record with ID selected not found");
        }
        await prisma.pneuomaniaReport.delete({
            where: {
                id: PnuomiaID,
            },
        });

        res.status(204).send();
    } catch (error) {
        console.error("Error deleting Pnuomania Report record:", error);
        res.status(500).send("Internal Server Error");
    }
});

export default router