import express, { json } from 'express';
import cors from 'cors';
import router from './routes/ReportingRoute.js';

const app = express();
//menambahkan middleware
app.use(cors());
app.use(json());
app.use(router);

app.listen(5000, () => console.log('Server Berjalan Pada Port 5000'));