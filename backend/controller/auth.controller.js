import { Users } from "../model/user.js";
import { comparePassword, generateToken, hashPassword } from "../services/auth.services.js";

export const postRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
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
    console.log("🔥 BACKEND ERROR:", error);
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
    const token = generateToken({
      id: user._id,
      role: user.role
    });

    res.cookie("access_token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // change to true in production (HTTPS)
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      userId: user._id.toString()

    });
  } catch (error) {
    console.log("LOGIN ERROR:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}