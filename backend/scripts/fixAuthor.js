import mongoose from "mongoose";
import dotenv from "dotenv";
import { Blogs } from "../model/blog.model.js"// make sure .js extension is added

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to DB");

    const blogs = await Blogs.find();

    for (let blog of blogs) {
      if (typeof blog.author === "string") {
        blog.author = new mongoose.Types.ObjectId(blog.author);
        await blog.save();
      }
    }

    console.log("All authors converted!");
    process.exit();
  })
  .catch(err => console.log(err));