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
    // Extract necessary data from the request body
    const { id, createdAt, updatedAt, title, content, published, user, userId } = req.body;

    const createEHR = await prisma.electronicHealthRecord.create({
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

    res.status(201).json(createEHR);
  } catch (error) {
    console.error("Error creating EHR record:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
