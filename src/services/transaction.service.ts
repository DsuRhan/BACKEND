//src/services/transaction.service.ts
import prisma from "../database";
import { TransactionRepository } from "../repositories/transaction.repository";

export class CheckoutTransactionService {
  constructor(private repo: TransactionRepository) {}

  async checkout(
    userId: string,
    items: { productId: string; quantity: number }[]
  ) {
    return prisma.$transaction(async (tx) => {
      let total = 0;

      for (const item of items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId }
        });

        if (!product) throw new Error("Product not found");
        if (product.stock < item.quantity)
          throw new Error("Insufficient stock");

        total += Number(product.price) * item.quantity;

        await tx.product.update({
          where: { id: product.id },
          data: { stock: { decrement: item.quantity } }
        });
      }

      return this.repo.create(
        {
          user: { connect: { id: userId } },
          total,
          items: {
            create: items.map(i => ({
              productId: i.productId,
              quantity: i.quantity,
              priceAtTime: 0
            }))
          }
        },
        tx
      );
    });
  }

  async getById(id: string) {
    return this.repo.findById(id);
  }
}
