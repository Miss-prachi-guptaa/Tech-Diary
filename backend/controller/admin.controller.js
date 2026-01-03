import { Blogs } from "../model/blog.model.js";


export const adminDeleteBlog = async (req, res) => {
  try {
    //check

    const blog = await Blogs.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Soft delete
    blog.status = "DELETED";
    await blog.save();

    res.json({
      message: "Blog deleted by admin (soft delete)"
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};
