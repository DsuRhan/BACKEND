// src/routes/user.route.ts
import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { UserRepository } from "../repositories/user.repository";
import {
  GetAllUsersService,
  GetUserByIdService,
  UpdateUserService,
  DeleteUserService,
  SearchUsersService
} from "../services/user.service";

const router = Router();

// Dependency Injection
const userRepo = new UserRepository();
const getAllSvc = new GetAllUsersService(userRepo);
const getByIdSvc = new GetUserByIdService(userRepo);
const updateSvc = new UpdateUserService(userRepo);
const deleteSvc = new DeleteUserService(userRepo);
const searchSvc = new SearchUsersService(userRepo);

const userController = new UserController(
  getAllSvc,
  getByIdSvc,
  updateSvc,
  deleteSvc,
  searchSvc
);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/users", userController.getAllUsers);

/**
 * @swagger
 * /users/search:
 *   get:
 *     summary: Search users by username or email
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Search result
 */
router.get("/users/search", userController.searchUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: User detail
 *       404:
 *         description: User not found
 */
router.get("/users/:id", userController.getUserById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user (password not allowed)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
 */
router.put("/users/:id", userController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Soft delete user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted
 */
router.delete("/users/:id", userController.deleteUser);

export default router;
