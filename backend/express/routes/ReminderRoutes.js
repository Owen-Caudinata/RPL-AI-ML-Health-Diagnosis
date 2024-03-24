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

    const createReminder = await prisma.reminder.create({
      data: {
        id: id,
        createdAt: createdAt,
        updatedAt: updatedAt,
        title: title,
        content: content,
        published: published,
        user: user,
        userId: userId,
      },
    });

    res.status(201).json(createReminder);
  } catch (error) {
    console.error("Error creating reminder :", error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    const ehrId = parseInt(req.params.id);
    const { title, content, published, userId } = req.body;

    const existingEHR = await prisma.electronicHealthRecord.findUnique({
      where: {
        id: ehrId,
      },
    });

    if (!existingEHR) {
      return res.status(404).send("EHR record from current ID not found");
    }

    const editEHR = await prisma.electronicHealthRecord.update({
      where: {
        id: ehrId,
      },
      data: {
        title: title || existingEHR.title,
        content: content || existingEHR.content,
        published: published !== undefined ? published : existingEHR.published,
      },
    });

    res.status(200).json(editEHR);
  } catch (error) {
    console.error("Error updating EHR record:", error);
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
