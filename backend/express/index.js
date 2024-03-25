import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import ehrRouter from "./routes/EHRRoutes.js";
import dailyNewsLetterRouter from "./routes/DailyNewsLetterRoutes.js";
import reminderRouter from "./routes/ReminderRoutes.js";
import feedbackRouter from "./routes/FeedbackRoutes.js";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/ehr", ehrRouter);
app.use("/dailyNewsletter", dailyNewsLetterRouter);
app.use("/reminder", reminderRouter);
app.use("/feedback", feedbackRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
