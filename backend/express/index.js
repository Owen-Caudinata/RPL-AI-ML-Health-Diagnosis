import express from "express";
import cors from "cors";
import ehrRouter from "./routes/EHRRoutes.js";
import dailyNewsLetterRouter from "./routes/DailyNewsLetterRoutes.js";
import reminderRouter from "./routes/ReminderRoutes.js";
import feedbackRouter from "./routes/FeedbackRoutes.js";
import alzheimerReportRouter from "./routes/AlzheimerReportRoutes.js";
import userRouter from "./routes/UserRoutes.js";
import adminRouter from "./routes/AdminRoutes.js";
import pneuomaniaReport from "./routes/PneuomaniaReport.js"

const app = express();

app.use(express.json());
app.use(cors());

app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/ehr", ehrRouter);
app.use("/dailyNewsletter", dailyNewsLetterRouter);
app.use("/reminder", reminderRouter);
app.use("/alzheimerReport", alzheimerReportRouter);
app.use("/feedback", feedbackRouter);
app.use("/pneuomania", pneuomaniaReport);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
