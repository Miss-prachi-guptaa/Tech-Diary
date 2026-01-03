import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './config/db.js';
import { authrouter } from './routes/auth.route.js';
import { blogrouter } from './routes/blog.route.js';
import cookieParser from "cookie-parser";
import { adminrouter } from './routes/admin.routes.js';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
dbConnect();
app.use(cookieParser());


app.use('/api/auth', authrouter);
app.use('/api/blogs', blogrouter);
app.use("/api/admin", adminrouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
})