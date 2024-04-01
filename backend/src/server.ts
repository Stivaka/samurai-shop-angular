import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import itemRouter from './router/item.router';
import userRouter from './router/user.router';
import { dbConnect } from './config/database.config';
dbConnect();

const app = express();

app.use(express.json());

app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.use(itemRouter);
app.use(userRouter);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port 3000...`);
    
})