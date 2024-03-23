import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get("/get", async (req, res) => {
    try {
        const ehrRecords = await prisma.electronicHealthRecord.find;

        res.status(200).json(ehrRecords);
    } catch (error) {
        console.error("Error fetching EHR records:", error);
        res.status(500).send("Internal Server Error");
    }
});

export default router;
