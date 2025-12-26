import { body } from "express-validator";

export const registerValidation = [
  body("username")
    .notEmpty().withMessage("Username wajib diisi")
    .isLength({ min: 3 }).withMessage("Username minimal 3 karakter"),

  body("email")
    .notEmpty().withMessage("Email wajib diisi")
    .isEmail().withMessage("Format email tidak valid"),

  body("password")
    .notEmpty().withMessage("Password wajib diisi")
    .isLength({ min: 6 }).withMessage("Password minimal 6 karakter")
];

export const loginValidation = [
  body("email")
    .notEmpty().withMessage("Email wajib diisi")
    .isEmail().withMessage("Format email tidak valid"),

  body("password")
    .notEmpty().withMessage("Password wajib diisi")
];
