import cloudinary from "../config/cloudinary.js";
import { Blogs } from "../model/blog.model.js";
import { findUserById } from "../services/auth.services.js";
import { checkAuthor } from "../services/blog.services.js";
import { addEmbeddingJob } from "../services/embeddings/embeddingQueue.js";
import { Users } from "../model/user.js";



export const createBlog = async (req, res) => {
  try {
    let imageUrl = null;
    const { title, content, tags, category } = req.body;

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
      tags,
      category,
      image: imageUrl,
      author: req.user.id
    });

    await addEmbeddingJob(blog._id.toString());
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

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find({ status: "PUBLISHED", isDeleted: false }).sort({ createdAt: -1 });
    return res.status(200).json({ blogs })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
}

export const getProfile = async (req, res) => {
  try {
    const user = await findUserById(req.user.id);
    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    };

    const totalBlogs = await Blogs.countDocuments({
      author: req.user.id,
      status: { $ne: "DELETED" }
    });

    const totalPublished = await Blogs.countDocuments({
      author: req.user.id,
      status: "PUBLISHED"
    });

    const totalDrafts = await Blogs.countDocuments({
      author: req.user.id,
      status: "DRAFT"
    });

    return res.status(200).json({
  success: true,
  user: {
    id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    bio: user.bio,
    profilePicture: user.profilePicture,
    createdAt: user.createdAt,

    followersCount: user.followers?.length || 0,
    followingCount: user.following?.length || 0,

    totalBlogs,
    totalPublished,
    totalDrafts
  }
});

  } catch (error) {
    console.log("❌ Controller error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
}

export const updateProfile = async (req, res) => {
  
  try {
console.log("Reached before username check");
    console.log(req.body);
console.log(req.file);

console.log("BODY =", req.body);
console.log("FILE =", req.file);
    const user = await findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }


    const { name, username, bio } = req.body;

    // Update text fields
    user.name = name || user.name;
    user.bio = bio || user.bio;

    // Check if the username is being updated and if it's unique
if (username) {

  const existingUser = await Users.findOne({
    username: username.toLowerCase()
  });
console.log("Existing user with same username:", existingUser);
  if (
    existingUser &&
    existingUser._id.toString() !== user._id.toString()
  ) {
    return res.status(400).json({
      success: false,
      message: "Username already exists"
    });
  }

  user.username = username.toLowerCase();
}


    // Update profile picture if a new one is uploaded
   if (req.file) {

  if (user.profilePicturePublicId) {
    await cloudinary.uploader.destroy(user.profilePicturePublicId);
  }

  const result = await cloudinary.uploader.upload(
    `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
    {
      folder: "profile_pictures",
    }
  );

  user.profilePicture = result.secure_url;
  user.profilePicturePublicId = result.public_id;
}

console.log("Username =", username);

    await user.save();
 

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        bio: user.bio,
       profilePicture: user.profilePicture,
       profilePicturePublicId: result.public_id,
        createdAt: user.createdAt,
        followersCount: user.followers?.length || 0,
        followingCount: user.following?.length || 0,
      },
    });
  }
  catch (error) {
    console.log("❌ Controller error:",error.message);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
}



export const getEditPage = async (req, res) => {
  try {
    const blog = await Blogs.findById(req.params.id);
    console.log("edit", blog)
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      })
    }
    return res.status(200).json({
      success: true,
      blog
    })
  }
  catch (error) {
    console.log("❌ Controller error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
}

export const updateBlogPage = async (req, res) => {


  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const blog = await Blogs.findByIdAndUpdate(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      })
    }

    if (!checkAuthor(blog, req.user.id))
      return res.status(403).json({ message: "Not allowed" });

    // update text fields
    blog.title = title || blog.title;
    blog.content = content || blog.content;

    // update image if new one is uploaded
    if (req.file) {
      // delete old image from cloudinary
      if (blog.image?.public_id) {
        await cloudinary.uploader.destroy(blog.image.public_id);
      }
      // upload new image
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        {
          folder: "blog_images",
        },
      )
      blog.image = {
        url: result.secure_url,
        public_id: result.public_id
      }
    }

    await blog.save();

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog
    });
  } catch (error) {
    console.log("UPDATE BLOG ERROR:", error.message);

    res.status(500).json({
      success: false,
      message: "Error updating blog"
    });
  }
}