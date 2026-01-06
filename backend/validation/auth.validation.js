import Joi from "joi";
import { ROLES } from "../constants/roles.js";

export const registerSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .max(50)
    .pattern(/^[a-zA-Z\s]+$/)
    .required()
    .messages({
      "string.base": "Name must be a string",
      "string.empty": "Name is required",
      "string.min": "Name must be at least 3 characters",
      "string.max": "Name must be at most 50 characters",
      "string.pattern.base": "Name can only contain letters and spaces",
      "any.required": "Name is required"
    }),

  email: Joi.string()
    .trim()
    .lowercase()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Please enter a valid email address",
      "string.empty": "Email is required",
      "any.required": "Email is required"
    }),

  password: Joi.string()
    .min(8)
    .max(128)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
    )
    .required()
    .messages({
      "string.min": "Password must be at least 6 characters",
      "string.max": "Password must be at most 128 characters",
      "string.pattern.base":
        "Password must contain uppercase, lowercase, number, and special character",
      "any.required": "Password is required"
    }),

  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Passwords do not match",
      "any.required": "Confirm password is required"
    }),

  role: Joi.number()
    .valid(...Object.values(ROLES))
    .default(ROLES.USER)



}).options({
  abortEarly: false,   // show all errors, not just first
  allowUnknown: false // reject extra fields (security)
});



export const loginSchema = Joi.object({
  email: Joi.string()
    .trim()
    .lowercase()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Please enter a valid email address",
      "string.empty": "Email is required",
      "any.required": "Email is required"
    }),

  password: Joi.string()
    .required()
    .messages({
      "string.empty": "Password is required",
      "any.required": "Password is required"
    })
})
  .options({
    abortEarly: false,
    allowUnknown: false
  });
