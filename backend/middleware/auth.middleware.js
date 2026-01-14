import jwt from "jsonwebtoken";
import { loginSchema, registerSchema } from "../validation/auth.validation.js";

export const verifytoken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1️⃣ Check if Authorization header exists
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized, token not provided"
    });
  }
  console.log("authheader", authHeader);//we got the auth header
  const token = authHeader.split(" ")[1];
  console.log("tokensplit", token);

  // 2️⃣ Verify token
  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // Attach user info to request object
    req.user = decodedToken;
    console.log('req.user', req.user);
    next();
  } catch (error) {
    console.error("JWT ERROR:", error.message);

    return res.status(401).json({
      success: false,
      message: "Unauthorized, invalid token"
    });
  }
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