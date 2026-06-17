import { Blogs } from "../model/blog.model.js";
import { findUserById } from "../services/auth.services.js";
import { checkAuthor } from "../services/blog.services.js";
import { addEmbeddingJob } from "../services/embeddings/embeddingQueue.js";
import { Users } from "../model/user.js";



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
       profilePicturePublicId: user.profilePicturePublicId,
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