import { Router } from "express";
import * as blogController from '../controller/blog.controller.js';
import { verifytoken } from "../middleware/auth.middleware.js";
import { upload } from '../middleware/multer.middleware.js'


const router = Router();

router.post("/create",
  verifytoken,
  upload.single("image"), // 👈 multer middleware,
  blogController.createBlog
);

router.put("/publish/:id", verifytoken, blogController.publishBlog);
router.get("/my", verifytoken, blogController.getMyBlogs);
router.get("/all", blogController.getAllBlogs);
router.delete("/:id", verifytoken, blogController.deleteblog);
router.get('/profile', verifytoken, blogController.getProfile);


export const blogrouter = router;