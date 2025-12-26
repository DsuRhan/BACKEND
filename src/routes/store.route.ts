//src/routes/store.route.ts
import { Router } from 'express';
import { StoreController } from '../controllers/store.controller';
import {
    GetAllStoresService,
    GetStoreById,
    CreateStore,
    UpdateStore,
    DeleteStore
} from '../services/store.service';
import { StoreRepository } from '../repositories/store.repository';
import { validate, getStoreByIdValidation, createStoreValidation } from '../middlewares/store.validation';


const router = Router();
const repo = new StoreRepository();
const controller = new StoreController(
    new GetAllStoresService(repo),
    new GetStoreById(repo),
    new CreateStore(repo),
    new UpdateStore(repo),
    new DeleteStore(repo)
);

/**
 * @swagger
 * tags:
 *   name: Stores
 *   description: Store management
 */

/**
 * @swagger
 * /stores:
 *   get:
 *     summary: Get all stores (pagination, search, sort)
 *     tags: [Stores]
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
 *         description: List of stores
 */
router.get('/stores', controller.getAll);

/**
 * @swagger
 * /stores/{id}:
 *   get:
 *     summary: Get store by ID
 *     tags: [Stores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Store detail
 *       404:
 *         description: Store not found
 */
router.get('/stores/:id', validate(getStoreByIdValidation), controller.getById);

/**
 * @swagger
 * /stores:
 *   post:
 *     summary: Create new store
 *     tags: [Stores]
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
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Store created
 */
router.post('/stores', validate(createStoreValidation), controller.create);

/**
 * @swagger
 * /stores/{id}:
 *   put:
 *     summary: Update store
 *     tags: [Stores]
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
 *             required:
 *               - name
 *               - userId
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               userId:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       200:
 *         description: Store updated
 */
router.put(
  '/stores/:id',
  validate(getStoreByIdValidation.concat(createStoreValidation as any)),
  controller.update
);

/**
 * @swagger
 * /stores/{id}:
 *   delete:
 *     summary: Soft delete store
 *     tags: [Stores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Store deleted
 */
router.delete('/stores/:id', validate(getStoreByIdValidation), controller.delete);


export default router;