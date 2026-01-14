import argon2 from "argon2";
import jwt from "jsonwebtoken";

export const hashPassword = async (password) => {

  return await argon2.hash(password);
}

export const comparePassword = async (hashedPassowrd, plainPassword) => {
  return await argon2.verify(hashedPassowrd, plainPassword);
}



export const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m"
  });
};

export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d"
  });
};

