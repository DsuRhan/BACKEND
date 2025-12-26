import { Router } from "express";
import { ProfileRepository } from "../repositories/profile.repository";
import { ProfileController } from "../controllers/profile.controller";
import {
  CreateProfileService,
  GetProfileService,
  UpdateProfileService,
  DeleteProfileService
} from "../services/profile.service";
import { createProfileValidation } from "../middlewares/profile.validation";
import { validate } from "../utils/validate";

const router = Router();
const repo = new ProfileRepository();
const controller = new ProfileController(
  new CreateProfileService(repo),
  new GetProfileService(repo),
  new UpdateProfileService(repo),
  new DeleteProfileService(repo)
);

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: User profile management
 */

/**
 * @swagger
 * /profile:
 *   post:
 *     summary: Create user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Profile created
 */
router.post("/profile", createProfileValidation, validate, controller.store);

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get current user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile detail
 *       404:
 *         description: Profile not found
 */
router.get("/profile", controller.show);

/**
 * @swagger
 * /profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated
 */
router.put("/profile", controller.update);

/**
 * @swagger
 * /profile:
 *   delete:
 *     summary: Delete user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile deleted
 */
router.delete("/profile", controller.destroy);

export default router;
