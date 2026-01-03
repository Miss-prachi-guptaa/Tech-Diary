import argon2 from "argon2";
import jwt from "jsonwebtoken";

export const hashPassword = async (password) => {

  return await argon2.hash(password);
}

export const comparePassword = async (hashedPassowrd, plainPassword) => {
  return await argon2.verify(hashedPassowrd, plainPassword);
}

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });
}

