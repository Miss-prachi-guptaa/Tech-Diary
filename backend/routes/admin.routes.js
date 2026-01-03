import { Router } from "express";
import { verifytoken } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/role.middleware.js";
import { adminDeleteBlog } from "../controller/admin.controller.js";


const router = Router();

router.delete(
  "/delete-blog/:id",
  verifytoken,
  isAdmin,
  adminDeleteBlog
);

export const adminrouter = router;