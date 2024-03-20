import express from "express";
import { getReportings } from "../controllers/ReportingController";

const router = express.Router();

router.get('/reportings', getReportings);

export default router;