import { Router } from "express";
import * as authController from '../controller/auth.controller.js';
import { validateLogin, validateRegister } from "../middleware/auth.middleware.js";

const route = Router();

route.post('/register', validateRegister, authController.postRegister);
route.post('/login', validateLogin, authController.postLogin);
route.post("/refresh", authController.refreshAccessToken);
route.post("/logout", authController.logout);


export const authrouter = route;
