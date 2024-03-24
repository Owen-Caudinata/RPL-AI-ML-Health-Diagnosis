import express from "express";
import { PrismaClient } from "@prisma/client";
import ehrRouter from "./routes/EHRRoutes.js";
import dailyNewsLetterRouter from "./routes/DailyNewsletterRoutes.js";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.use("/ehr", ehrRouter);
app.use("/dailyNewsletter", dailyNewsLetterRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
