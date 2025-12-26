//src/routes/category.route.ts
import { Router } from 'express';
import { CategoryRepository } from '../repositories/category.repository';
import {
  GetAllCategoriesService,
  GetCategoryByIdService,
  CreateCategoryService,
  UpdateCategoryService,
  DeleteCategoryService
} from '../services/category.service';
import { CategoryController } from '../controllers/category.controller';
import { validate } from '../utils/validate';
import {
  getCategoryByIdValidation,
  createCategoryValidation
} from '../middlewares/category.validation';

const router = Router();
const repo = new CategoryRepository();

const controller = new CategoryController(
  new GetAllCategoriesService(repo),
  new GetCategoryByIdService(repo),
  new CreateCategoryService(repo),
  new UpdateCategoryService(repo),
  new DeleteCategoryService(repo)
);

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories (pagination, search, sort)
 *     tags: [Categories]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *     responses:
 *       200:
 *         description: List of categories
 */
router.get('/categories', controller.getAll);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Category detail with products
 *       404:
 *         description: Category not found
 */
router.get(
  '/categories/:id',
  validate(getCategoryByIdValidation),
  controller.getById
);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created
 */
router.post(
  '/categories',
  validate(createCategoryValidation),
  controller.create
);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated
 *       404:
 *         description: Category not found
 */
router.put(
  '/categories/:id',
  validate([...getCategoryByIdValidation, ...createCategoryValidation]),
  controller.update
);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Soft delete category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Category deleted
 *       404:
 *         description: Category not found
 */
router.delete(
  '/categories/:id',
  validate(getCategoryByIdValidation),
  controller.delete
);

export default router;
