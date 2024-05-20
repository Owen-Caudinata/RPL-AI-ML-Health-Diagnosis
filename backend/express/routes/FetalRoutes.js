import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authenticateAdmin } from "../middleware/auth.js";

const router = Router();
const prisma = new PrismaClient();

router.get("/get", async (req, res) => {
    try {
        const fetalReporting = await prisma.fetalHealth.findMany();

        res.status(200).json(fetalReporting);
    } catch (error) {
        console.error("Error Fetching Data Fetal Report: ", error);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/create", authenticateUser, async (req, res) => {
    try {
        const { fetalId, age, description,userId } = req.body;

        const createFetal = await prisma.fetalHealth.create({
            data: {
                fetalId: fetalId,
                age: age,
                description:description,
                userId: userId,
            },
        });

        res.status(201).json(createFetal);
    } catch (error) {
        console.error("Error creating Fetal record:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.put("/edit/:id", authenticateUser, async (req, res) => {
  try {
      const userId = req.user.userId;
      const fetalId = parseInt(req.params.id);
      const { title, content, published } = req.body;

      const existingFetal = await prisma.fetalHealth.findUnique({
          where: {
              userId: userId,
              id: fetalId,
          },
      });

      if (!existingFetal) {
          return res.status(404).send("Fetal record from current ID not found");
      }

      const editFetal = await prisma.fetalHealth.update({
          where: {
              userId: userId,
              id: fetalId,
          },
          data: {
              title: title || existingFetal.title,
              content: content || existingFetal.content,
              published: published !== undefined ? published : existingFetal.published,
          },
      });

      res.status(200).json(editFetal);
  } catch (error) {
      console.error("Error updating Fetal record:", error);
      res.status(500).send("Internal Server Error");
  }
});

router.delete("/delete/:id", authenticateUser, async (req, res) => {
  try {
      const userId = req.user.userId;
      const fetalId = parseInt(req.params.id);

      const fetalRecord = await prisma.fetalHealth.findUnique({
          where: {
              userId: userId,
              id: fetalId,
          },
      });

      if (!fetalRecord) {
          return res.status(404).send("Fetal record with ID selected not found");
      }

      await prisma.fetalHealth.delete({
          where: {
              userId: userId,
              id: fetalId,
          },
      });

      res.status(204).send();
  } catch (error) {
      console.error("Error deleting Fetal record:", error);
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