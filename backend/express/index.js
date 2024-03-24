import express from "express";
import { PrismaClient } from "@prisma/client";
import triggerRouter from "./routes/TriggerRoutes.js";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.use("/trigger", triggerRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
