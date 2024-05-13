import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authenticateUser } from "../middleware/auth.js";

const router = Router();
const prisma = new PrismaClient();

router.get("/get", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.userId;
    const scheduleRecords = await prisma.schedule.findMany({ where: { userId } });

    res.status(200).json(scheduleRecords);
  } catch (error) {
    console.error("Error fetching Schedule Record:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/create", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { title, content, published } = req.body;

    const createSchedule = await prisma.schedule.create({
      data: {
        title: title,
        content: content,
        description: description,
        published: published,
        userId: userId,
        type: type,
      },
    });

    res.status(201).json(createSchedule);
  } catch (error) {
    console.error("Error creating Schedule record:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/delete/:id", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.userId;
    const scheduleId = parseInt(req.params.id);

    const scheduleRecord = await prisma.schedule.findUnique({
      where: {
        id: scheduleId,
        userId: userId,
      },
    });

    if (!scheduleRecord) {
      return res.status(404).send("Schedule Record with ID selected not found");
    }

    await prisma.schedule.delete({
      where: {
        id: scheduleId,
        userId: userId,
      },
    });

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting Schedule record:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
