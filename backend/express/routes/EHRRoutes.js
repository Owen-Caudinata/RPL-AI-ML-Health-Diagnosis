import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/get", async (req, res) => {
  try {
    const ehrRecords = await prisma.electronicHealthRecord.findMany();

    res.status(200).json(ehrRecords);
  } catch (error) {
    console.error("Error fetching EHR records:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/create", async (req, res) => {
  try {
    const { title, content, published, user, userId } = req.body;

    const createEHR = await prisma.electronicHealthRecord.create({
      data: {
        title: title,
        content: content,
        published: published,
        userId: userId,
      },
    });

    res.status(201).json(createEHR);
  } catch (error) {
    console.error("Error creating EHR record:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const ehrId = parseInt(req.params.id);

    const ehrRecord = await prisma.electronicHealthRecord.findUnique({
      where: {
        id: ehrId,
      },
    });

    if (!ehrRecord) {
      return res.status(404).send("EHR record with ID selected not found");
    }

    await prisma.electronicHealthRecord.delete({
      where: {
        id: ehrId,
      },
    });

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting EHR record:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
