// src/controllers/transaction.controller.ts
import { TransactionRepository } from "../repositories/transaction.repository";
import { CheckoutTransactionService } from "../services/transaction.service";
import { asyncHandler } from "../utils/async.handler";
import { successResponse } from "../utils/response";
import type { Request, Response } from "express";

const repo = new TransactionRepository();
const transactionService = new CheckoutTransactionService(repo);

export const checkout = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { items } = req.body;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const transaction = await transactionService.checkout(userId, items);

  return successResponse(res, "Checkout berhasil", transaction, null, 201);
});

export const getDetail = asyncHandler(async (req: Request, res: Response) => {
  const transaction = await transactionService.getById(req.params.id as string);

  return successResponse(res, "Detail transaksi", transaction);
});
