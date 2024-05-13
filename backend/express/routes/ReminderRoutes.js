import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authenticateUser } from "../middleware/auth.js";

const router = Router();
const prisma = new PrismaClient();

router.get("/get", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.userId;
    const reminderRecords = await prisma.reminder.findMany({ where: { userId } });

    res.status(200).json(reminderRecords);
  } catch (error) {
    console.error("Error fetching Reminder Record:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/create", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { title, content, published } = req.body;

    const createReminder = await prisma.reminder.create({
      data: {
        title: title,
        content: content,
        published: published,
        userId: userId,
      },
    });

    res.status(201).json(createReminder);
  } catch (error) {
    console.error("Error creating Reminder record:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/edit/:id", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.userId;
    const reminderId = parseInt(req.params.id);
    const { title, content, published } = req.body;

    const existingReminder = await prisma.reminder.findUnique({
      where: {
        id: reminderId,
        userId: userId,
      },
    });

    if (!existingReminder) {
      return res.status(404).send("Reminder Record from current ID not found");
    }

    const editReminder = await prisma.reminder.update({
      where: {
        id: reminderId,
        userId: userId,
      },
      data: {
        title: title || existingReminder.title,
        content: content || existingReminder.content,
        published: published !== undefined ? published : existingReminder.published,
      },
    });

    res.status(200).json(editReminder);
  } catch (error) {
    console.error("Error updating Reminder Record:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/delete/:id", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.userId;
    const reminderId = parseInt(req.params.id);

    const reminderRecord = await prisma.reminder.findUnique({
      where: {
        id: reminderId,
        userId: userId,
      },
    });

    if (!reminderRecord) {
      return res.status(404).send("Reminder Record with ID selected not found");
    }

    await prisma.reminder.delete({
      where: {
        id: reminderId,
        userId: userId,
      },
    });

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting Reminder record:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
