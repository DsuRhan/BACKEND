import { TransactionRepository } from "../repositories/transaction.repository.js";
export declare class CheckoutTransactionService {
    private repo;
    constructor(repo: TransactionRepository);
    checkout(userId: string, items: {
        productId: string;
        quantity: number;
    }[]): Promise<{
        items: ({
            product: {
                id: string;
                name: string;
                description: string | null;
                price: import("@prisma/client-runtime-utils").Decimal;
                stock: number;
                image: string;
                categoryId: string | null;
                storeId: string | null;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
            };
        } & {
            id: string;
            quantity: number;
            priceAtTime: import("@prisma/client-runtime-utils").Decimal;
            productId: string;
            transactionId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
        total: import("@prisma/client-runtime-utils").Decimal;
    }>;
    getById(id: string): Promise<({
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            username: string;
            email: string;
            password: string;
            role: string;
        };
        items: ({
            product: {
                id: string;
                name: string;
                description: string | null;
                price: import("@prisma/client-runtime-utils").Decimal;
                stock: number;
                image: string;
                categoryId: string | null;
                storeId: string | null;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
            };
        } & {
            id: string;
            quantity: number;
            priceAtTime: import("@prisma/client-runtime-utils").Decimal;
            productId: string;
            transactionId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
        total: import("@prisma/client-runtime-utils").Decimal;
    }) | null>;
}
//# sourceMappingURL=transaction.service.d.ts.map
