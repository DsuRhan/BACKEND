import type { Prisma } from "../generated/client.js";
export declare class TransactionRepository {
    findById(id: string): Prisma.Prisma__TransactionClient<({
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
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    findAll(): Prisma.PrismaPromise<({
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
    })[]>;
    create(data: Prisma.TransactionCreateInput, tx: Prisma.TransactionClient): Prisma.Prisma__TransactionClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: undefined;
    }>;
}
//# sourceMappingURL=transaction.repository.d.ts.map
