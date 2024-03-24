import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/get", async (req, res) => {
  try {
    const reminderRecords = await prisma.reminderRecords.findMany();

    res.status(200).json(reminderRecords);
  } catch (error) {
    console.error("Error fetching Reminder Record:", error);
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
    console.error("Error creating Reminder Record:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    const reminderId = parseInt(req.params.id);
    const { id, createdAt, updatedAt, title, content, published, user, userId } = req.body;

    const existingReminder = await prisma.reminder.findUnique({
      where: {
        id: reminderId,
      },
    });

    if (!existingReminder) {
      return res.status(404).send("Reminder Record from current ID not found");
    }

    const editReminder = await prisma.reminderRecords.update({
      where: {
        id: reminderId,
      },
      data: {
        createdAt: createdAt || existingReminder.createdAt,
        updatedAt: updatedAt || existingReminder.updatedAt,
        title: title || existingEHR.title,
        content: content || existingEHR.content,
        published: published !== undefined ? published : existingEHR.published,
        user: user || existingReminder.user,
        userId: userId || existingReminder.userId,
      },
    });

    res.status(200).json(editReminder);
  } catch (error) {
    console.error("Error updating Reminder Record:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const reminderId = parseInt(req.params.id);

    const reminderRecord = await prisma.reminderRecord.findUnique({
      where: {
        id: reminderId,
      },
    });

    if (!reminderRecord) {
      return res.status(404).send("Reminder Record with ID selected not found");
    }

    await prisma.reminderRecord.delete({
      where: {
        id: reminderId,
      },
    });

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting Reminder record:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
