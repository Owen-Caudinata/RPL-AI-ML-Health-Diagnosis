import express from 'express';
import { PrismaClient } from '@prisma/client';
import ehrRouter from "./routes/EHRRoutes.js";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.use("/ehr", ehrRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
