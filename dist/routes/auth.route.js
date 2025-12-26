// src/routes/auth.route.ts
import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { AuthRepository } from "../repositories/auth.repository.js";
import { RegisterService, LoginService } from "../services/auth.service.js";
import { validate } from "../utils/validate.js";
import { registerValidation, loginValidation } from "../middlewares/auth.validation.js";
import { upload } from "../middlewares/upload.middleware.js";
const router = Router();
const authRepo = new AuthRepository();
const registerSvc = new RegisterService(authRepo);
const loginSvc = new LoginService(authRepo);
const authController = new AuthController(registerSvc, loginSvc);
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered
 */
router.post("/auth/register", upload.none(), validate(registerValidation), authController.register);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login success (JWT token)
 */
router.post("/auth/login", validate(loginValidation), authController.login);
export default router;
//# sourceMappingURL=auth.route.js.map
