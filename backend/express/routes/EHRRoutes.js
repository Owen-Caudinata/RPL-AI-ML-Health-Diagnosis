import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get("/get/ehr", async (req, res) => {
    try {
        const ehrRecords = await prisma.ehr.findMany();

        res.status(200).json(ehrRecords);
    } catch (error) {
        console.error("Error fetching EHR records:", error);
        res.status(500).send("Internal Server Error");
    }
});

export default router;
