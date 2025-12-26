// src/controllers/transaction.controller.ts
import { TransactionRepository } from "../repositories/transaction.repository.js";
import { CheckoutTransactionService } from "../services/transaction.service.js";
import { asyncHandler } from "../utils/async.handler.js";
import { successResponse } from "../utils/response.js";
const repo = new TransactionRepository();
const transactionService = new CheckoutTransactionService(repo);
export const checkout = asyncHandler(async (req, res) => {
    const userId = req.user?.id;
    const { items } = req.body;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const transaction = await transactionService.checkout(userId, items);
    return successResponse(res, "Checkout berhasil", transaction, null, 201);
});
export const getDetail = asyncHandler(async (req, res) => {
    const transaction = await transactionService.getById(req.params.id);
    return successResponse(res, "Detail transaksi", transaction);
});
//# sourceMappingURL=transaction.controller.js.map
