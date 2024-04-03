import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authenticateAdmin } from "../middleware/auth.js";

const router = Router();
const prisma = new PrismaClient();

router.get("/get-all", authenticateAdmin, async (req, res) => {
  try {
    const dailyNewsletterRecords = await prisma.dailyNewsLetter.findMany();
    res.status(200).json(dailyNewsletterRecords);
  } catch (error) {
    console.error("Error fetching Daily Newsletter Records:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/create", authenticateAdmin, async (req, res) => {
  try {
    const { title, content } = req.body;
    const createDailyNewsletter = await prisma.dailyNewsLetter.create({
      data: {
        title: title,
        content: content,
      },
    });
    res.status(201).json(createDailyNewsletter);
  } catch (error) {
    console.error("Error creating Daily Newsletter Record:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/edit/:id", authenticateAdmin, async (req, res) => {
  try {
    const dailyNewsletterId = parseInt(req.params.id);
    const { title, content } = req.body;

    const existingDailyNewsletter = await prisma.dailyNewsLetter.findUnique({
      where: {
        id: dailyNewsletterId,
      },
    });

    if (!existingDailyNewsletter) {
      return res.status(404).send("Daily Newsletter Record not found");
    }

    const editDailyNewsletter = await prisma.dailyNewsLetter.update({
      where: {
        id: dailyNewsletterId,
      },
      data: {
        title: title || existingDailyNewsletter.title,
        content: content || existingDailyNewsletter.content,
        updatedAt: new Date(),
      },
    });

    res.status(200).json(editDailyNewsletter);
  } catch (error) {
    console.error("Error updating Daily Newsletter Record:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/delete/:id", authenticateAdmin, async (req, res) => {
  try {
    const dailyNewsletterId = parseInt(req.params.id);

    const dailyNewsletterRecord = await prisma.dailyNewsLetter.findUnique({
      where: {
        id: dailyNewsletterId,
      },
    });

    if (!dailyNewsletterRecord) {
      return res.status(404).send("Daily Newsletter Record not found");
    }

    await prisma.dailyNewsLetter.delete({
      where: {
        id: dailyNewsletterId,
      },
    });

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting Daily Newsletter Record:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
