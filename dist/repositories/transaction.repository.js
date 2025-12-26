//src/repositories/transaction.repository.ts
import prisma from "../database.js";
export class TransactionRepository {
    findById(id) {
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
    create(data, tx) {
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
//# sourceMappingURL=transaction.repository.js.map
