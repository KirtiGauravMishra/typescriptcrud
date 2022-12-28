import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { connectDB } from './config/db';
import billsRoutes from './routes/billRoutes';
const app = express();

app.use(express.json());

connectDB(process.env.MONGO_URL as string);

app.use('/bills', billsRoutes);

app.listen(process.env.PORT, () => console.log('Server is up and running'));
