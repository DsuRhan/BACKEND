import { Router } from "express";
import { checkout, getDetail } from "../controllers/transaction.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
const router = Router();
/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Transaction and checkout
 */
/**
 * @swagger
 * /transactions/checkout:
 *   post:
 *     summary: Checkout transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - productId
 *                     - quantity
 *                   properties:
 *                     productId:
 *                       type: string
 *                       format: uuid
 *                     quantity:
 *                       type: integer
 *     responses:
 *       201:
 *         description: Transaction created
 *       400:
 *         description: Insufficient stock or invalid product
 */
router.post("/transactions/checkout", authenticate, checkout);
/**
 * @swagger
 * /transactions/{id}:
 *   get:
 *     summary: Get transaction detail by ID
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Transaction detail with items
 *       404:
 *         description: Transaction not found
 */
router.get("/transactions/:id", authenticate, getDetail);
export default router;
//# sourceMappingURL=transaction.route.js.map
