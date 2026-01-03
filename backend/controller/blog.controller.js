import cloudinary from "../config/cloudinary.js";
import { Blogs } from "../model/blog.model.js";
import { checkAuthor } from "../services/blog.services.js";

export const createBlog = async (req, res) => {
  try {
    let imageUrl = null;
    const { title, content } = req.body;

    if (req.file) {
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        {
          folder: "blog_images",
        },
      )
      imageUrl = {
        url: result.secure_url,
        public_id: result.public_id
      }
    }

    const blog = await Blogs.create({
      title,
      content,
      image: imageUrl,
      author: req.user.id
    });

    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog
    })
  } catch (error) {
    console.error("❌ Controller error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export const publishBlog = async (req, res) => {
  try {
    const blog = await Blogs.findById(req.params.id);
    console.log("publish Blog", blog);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      })
    }


    if (!checkAuthor(blog, req.user.id))
      return res.status(403).json({ message: "Not allowed" });

    blog.status = "PUBLISHED";
    await blog.save();
    return res.status(200).json({
      success: true,
      message: "Blog published successfully",
      blog
    });

  } catch (error) {

  }
}

/* SOFT DELETE */
export const deleteblog = async (req, res) => {
  try {
    const blog = await Blogs.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      })
    }

    if (!checkAuthor(blog, req.user.id))
      return res.status(403).json({ message: "Not allowed" });

    blog.status = "DELETED";
    blog.isDeleted = true;
    blog.deletedAt = new Date();
    await blog.save();

    return res.status(200).json({
      message: "Blog deleted successfully",
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    })
  }
}

export const getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find({ author: req.user.id, status: { $ne: "DELETED" } }).sort({ createdAt: -1 });
    return res.status(200).json({ blogs })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
}