import jwt from "jsonwebtoken";
import { loginSchema, registerSchema } from "../validation/auth.validation.js";

export const verifytoken = (req, res, next) => {

  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized,token not found" });
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);


  req.user = decodedToken;
  console.log('req.user', req.user);
  next();

}

export const validateRegister = (req, res, next) => {
  const { error, value } = registerSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      errors: error.details.map(err => err.message)
    });
  }

  req.body = value; // sanitized data
  next();
};
export const validateLogin = (req, res, next) => {
  const { error, value } = loginSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      errors: error.details.map(err => err.message)
    });
  }

  req.body = value; // sanitized input
  next();
};