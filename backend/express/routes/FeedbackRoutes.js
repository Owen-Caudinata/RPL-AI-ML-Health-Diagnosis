import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/get", async (req, res) => {
  try {
    const feedbackRecords = await prisma.feedbackRecords.findMany();

    res.status(200).json(feedbackRecords);
  } catch (error) {
    console.error("Error fetching Feedback Record:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/create", async (req, res) => {
  try {
    const { title, content, published, admin, adminId } = req.body;

    const createFeedback = await prisma.feedback.create({
      data: {
        id: id,
        createdAt: createdAt,
        title: title,
        content: content,
        published: published,
        user: user,
        userId: userId,
      },
    });

    res.status(201).json(createFeedback);
  } catch (error) {
    console.error("Error creating Feedback Record:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    const FeedbackId = parseInt(req.params.id);
    const { id, createdAt, updatedAt, title, content, published, user, userId } = req.body;

    const existingFeedback = await prisma.Feedback.findUnique({
      where: {
        id: FeedbackId,
      },
    });

    if (!existingFeedback) {
      return res.status(404).send("Feedback Record from current ID not found");
    }

    const editFeedback = await prisma.FeedbackRecords.update({
      where: {
        id: FeedbackId,
      },
      data: {
        createdAt: createdAt || existingFeedback.createdAt,
        updatedAt: updatedAt || existingFeedback.updatedAt,
        title: title || existingEHR.title,
        content: content || existingEHR.content,
        published: published !== undefined ? published : existingEHR.published,
        user: user || existingFeedback.user,
        userId: userId || existingFeedback.userId,
      },
    });

    res.status(200).json(editFeedback);
  } catch (error) {
    console.error("Error updating Feedback Record:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const feedbackId = parseInt(req.params.id);

    const feedbackRecord = await prisma.feedbackRecord.findUnique({
      where: {
        id: feedbackId,
      },
    });

    if (!feedbackRecord) {
      return res.status(404).send("Feedback Record with ID selected not found");
    }

    await prisma.feedbackRecord.delete({
      where: {
        id: feedbackId,
      },
    });

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting Feedback record:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
