import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authenticateUser, authenticateAdmin } from "../middleware/auth.js";

const router = Router();
const prisma = new PrismaClient();

router.get("/get", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.userId;
    const fetalRecords = await prisma.feedback.findMany({ where: { userId } });

    res.status(200).json(fetalRecords);
  } catch (error) {
    console.error("Error fetching Fetal Records:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/create", authenticateUser, async (req, res) => {
  try {
    const { title, content } = req.body;

    const createFetal = await prisma.fetalHealth.create({
      data: {
        title: title,
        content: content,
        userId: req.user.userId, // Assuming userId is stored in req.user
      },
    });

    res.status(201).json(createFetal);
  } catch (error) {
    console.error("Error creating Fetal Record:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/edit/:id", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.userId;
    const fetalID = parseInt(req.params.id);
    const { title, content, published } = req.body;

    const existingFetal = await prisma.fetalHealth.findUnique({
      where: {
        userId: userId,
        id: fetalID,
      },
    });

    if (!existingFetal) {
      return res.status(404).send("Fetal Record not found");
    }

    const editFetal = await prisma.fetalHealth.update({
      where: {
        userId: req.user.userId,
        id: fetalID,
      },
      data: {
        title: title || existingFetal.title,
        content: content || existingFetal.content,
        published: published !== undefined ? published : existingFetal.published,
      },
    });

    res.status(200).json(editFetal);
  } catch (error) {
    console.error("Error updating Fetal Record:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/delete/:id", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.userId;
    const fetalID = parseInt(req.params.id);

    const fetalRecords = await prisma.fetalHealth.findUnique({
      where: {
        id: fetalID,
        userId: userId,
      },
    });

    if (!fetalRecords) {
      return res.status(404).send("Fetal Record not found");
    }

    await prisma.fetalHealth.delete({
      where: {
        id: fetalID,
      },
    });

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting Fetal Record:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/get-all", authenticateAdmin, async (req, res) => {
  try {
    const fetalRecords = await prisma.fetalHealth.findMany();

    res.status(200).json(fetalRecords);
  } catch (error) {
    console.error("Error fetching Fetal records:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
