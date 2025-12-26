//src/repositories/transaction.repository.ts
import prisma from "../database";
import type { Prisma } from "../generated/client";

export class TransactionRepository {
  findById(id: string) {
    return prisma.transaction.findUnique({
      where: { id },
      include: {
        user: true,
        items: {
          include: { product: true }
        }
      }
    });
  }

  findAll() {
    return prisma.transaction.findMany({
      where: { deletedAt: null },
      include: {
        user: true,
        items: {
          include: { product: true }
        }
      }
    });
  }

  create(
    data: Prisma.TransactionCreateInput,
    tx: Prisma.TransactionClient
  ) {
    return tx.transaction.create({
      data,
      include: {
        items: {
          include: { product: true }
        }
      }
    });
  }
}
