import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authenticateUser, authenticateAdmin } from "../middleware/auth.js";

const router = Router();
const prisma = new PrismaClient();

router.get("/get", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.userId;
    const feedbackRecords = await prisma.feedback.findMany({ where: { userId } });

    res.status(200).json(feedbackRecords);
  } catch (error) {
    console.error("Error fetching Feedback Records:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/create", authenticateUser, async (req, res) => {
  try {
    const { title, content } = req.body;

    const createFeedback = await prisma.feedback.create({
      data: {
        title: title,
        content: content,
        userId: req.user.userId, // Assuming userId is stored in req.user
      },
    });

    res.status(201).json(createFeedback);
  } catch (error) {
    console.error("Error creating Feedback Record:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/edit/:id", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.userId;
    const feedbackId = parseInt(req.params.id);
    const { title, content, published } = req.body;

    const existingFeedback = await prisma.feedback.findUnique({
      where: {
        userId: userId,
        id: feedbackId,
      },
    });

    if (!existingFeedback) {
      return res.status(404).send("Feedback Record not found");
    }

    const editFeedback = await prisma.feedback.update({
      where: {
        userId: req.user.userId,
        id: feedbackId,
      },
      data: {
        title: title || existingFeedback.title,
        content: content || existingFeedback.content,
        published: published !== undefined ? published : existingFeedback.published,
      },
    });

    res.status(200).json(editFeedback);
  } catch (error) {
    console.error("Error updating Feedback Record:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/delete/:id", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.userId;
    const feedbackId = parseInt(req.params.id);

    const feedbackRecord = await prisma.feedback.findUnique({
      where: {
        id: feedbackId,
        userId: userId,
      },
    });

    if (!feedbackRecord) {
      return res.status(404).send("Feedback Record not found");
    }

    await prisma.feedback.delete({
      where: {
        id: feedbackId,
      },
    });

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting Feedback Record:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/get-all", authenticateAdmin, async (req, res) => {
  try {
    const feedbackRecords = await prisma.feedback.findMany();

    res.status(200).json(feedbackRecords);
  } catch (error) {
    console.error("Error fetching EHR records:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
