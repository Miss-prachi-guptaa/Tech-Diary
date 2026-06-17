import { Router } from "express";

const router = Router();

import * as profileController from '../controller/profile.controller.js';
import { verifytoken } from "../middleware/auth.middleware.js";
import { upload } from '../middleware/multer.middleware.js';



router.get('/', verifytoken, profileController.getProfile);
 router.patch('/', verifytoken, upload.single("profilePicture"), profileController.updateProfile);


 export const profilerouter = router;