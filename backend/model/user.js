import mongoose from "mongoose";
import { ROLES } from "../constants/roles.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,//html tag not allowed
    required: [true, "Full name is required"],
    trim: true,
    minlength: 3,
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 3,
    // don’t return password by default
  },
  role: {
    type: Number,
    enum: Object.values({ ROLES }),
    default: ROLES.USER,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
},
  {
    timestamps: true,
  });

// now create model 
export const Users = mongoose.model("user", userSchema);