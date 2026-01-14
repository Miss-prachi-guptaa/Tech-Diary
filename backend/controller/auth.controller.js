import { RefreshToken } from "../model/refreshToken.model.js";
import { Users } from "../model/user.js";
import { comparePassword, generateAccessToken, generateRefreshToken, hashPassword } from "../services/auth.services.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const postRegister = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    console.log("req.body", name, email, password)
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already existed"
      });
    }
    const hashedPassword = await hashPassword(password);
    //insert into model
    const user = await Users.create({ name, email, password: hashedPassword, role: req.body.role });
    console.log("insert into model", user)//joi

    return res.status(201).json({
      success: true,
      message: "Registration successful"
    });


  } catch (error) {
    console.log("🔥 BACKEND ERROR:", error.stack);//
    return res.status(500).json({ success: false, message: "Server error" });
  }


}

export const postLogin = async (req, res) => {
  try {

    // check email exit in db then login
    const { email, password } = req.body;
    console.log(email, password);

    const user = await Users.findOne({ email });
    console.log(user)
    if (!user)
      return res.status(400).json({
        success: false,
        message: "Invalid email "
      })

    const isPasswordValid = await comparePassword(user.password, password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: "Invalid password" });
    }
    // res.cookie('isLoggedIn', true);
    const accessToken = generateAccessToken({
      id: user._id,
      role: user.role
    });

    const refreshToken = generateRefreshToken({
      id: user._id,
    })

    /* =====================
   Hash refresh token
====================== */
    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    //   6. Save refresh token in DB
    // ====================== */

    await RefreshToken.create({
      userId: user._id,
      tokenHash: refreshTokenHash,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: false,          // localhost
      sameSite: "lax",        // ✅ IMPORTANT
      maxAge: 7 * 24 * 60 * 60 * 1000
    });



    return res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,//chnge here for token 
      userId: user._id.toString()

    });
  } catch (error) {
    console.log("LOGIN ERROR:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}



export const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;

    /* =====================
       1. Check cookie
    ====================== */
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    /* =====================
       2. Verify JWT
    ====================== */
    let decoded;
    try {
      decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
    } catch (err) {
      return res.status(403).json({
        success: false,
        message: "Invalid refresh token"
      });
    }

    /* =====================
       3. Hash incoming token
    ====================== */
    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    /* =====================
       4. Check DB
    ====================== */
    const tokenDoc = await RefreshToken.findOne({
      userId: decoded.id,
      tokenHash: refreshTokenHash,
      isRevoked: false,
      expiresAt: { $gt: new Date() }
    });

    if (!tokenDoc) {
      return res.status(403).json({
        success: false,
        message: "Refresh token revoked or expired"
      });
    }

    /* =====================
       5. Generate new access token
    ====================== */
    const newAccessToken = generateAccessToken({
      id: decoded.id
    });

    /* =====================
       6. Send response
    ====================== */
    return res.status(200).json({
      success: true,
      accessToken: newAccessToken
    });

  } catch (error) {
    console.error("REFRESH TOKEN ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


export const logout = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully"
  });
};


