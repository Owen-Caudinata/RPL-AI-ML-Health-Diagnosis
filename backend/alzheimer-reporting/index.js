import express from "express";
import cors from "cors";
import router from "./routes/ReportingRoute";

const app = express();
//menambahkan middleware
app.use(cors());
app.use(express.json());
app.use(router());

app.listen(5000, ()=> console.log('Server Berjalan Pada Port 5000'))