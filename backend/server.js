import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './config/db.js';
import { authrouter } from './routes/auth.route.js';
import { blogrouter } from './routes/blog.route.js';
import cookieParser from "cookie-parser";
import { adminrouter } from './routes/admin.routes.js';
import { searchrouter } from './routes/search.routes.js';
import { profilerouter } from './routes/profile.routes.js';




dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://techdiary-one.vercel.app"
    ],
    credentials: true,
  })
);
app.use(express.json());
dbConnect();
app.use(cookieParser());


app.use('/api/auth', authrouter);
app.use('/api/blogs', blogrouter);
app.use("/api/admin", adminrouter);
app.use('/api/search', searchrouter);
app.use('/api/profile', profilerouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
})