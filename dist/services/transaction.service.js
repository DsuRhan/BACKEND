//src/services/transaction.service.ts
import prisma from "../database.js";
import { TransactionRepository } from "../repositories/transaction.repository.js";
export class CheckoutTransactionService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async checkout(userId, items) {
        return prisma.$transaction(async (tx) => {
            let total = 0;
            for (const item of items) {
                const product = await tx.product.findUnique({
                    where: { id: item.productId }
                });
                if (!product)
                    throw new Error("Product not found");
                if (product.stock < item.quantity)
                    throw new Error("Insufficient stock");
                total += Number(product.price) * item.quantity;
                await tx.product.update({
                    where: { id: product.id },
                    data: { stock: { decrement: item.quantity } }
                });
            }
            return this.repo.create({
                user: { connect: { id: userId } },
                total,
                items: {
                    create: items.map(i => ({
                        productId: i.productId,
                        quantity: i.quantity,
                        priceAtTime: 0
                    }))
                }
            }, tx);
        });
    }
    async getById(id) {
        return this.repo.findById(id);
    }
}
//# sourceMappingURL=transaction.service.js.map
