import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/get", async (req, res) => {
  try {
    const dailyNewsLetterRecords = await prisma.dailyNewsLetter.findMany();

    res.status(200).json(dailyNewsLetterRecords);
  } catch (error) {
    console.error("Error fetching DailyNewsLetter records:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/create", async (req, res) => {
  // TODO: admin create daily newsletter
});

router.put("/edit/:id", async (req, res) => {
  // TODO: admin edit daily newsletter
});

router.delete("/delete/:id", async (req, res) => {
  // TODO: admin delete daily newsletter
});

router.get("/broadcast", async (req, res) => {
  // TODO: admin broadcast daily newsletter
});

export default router;
