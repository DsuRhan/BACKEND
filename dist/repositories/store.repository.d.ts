import type { Prisma } from "../generated/client.js";
export declare class StoreRepository {
    findAll: (skip: number, take: number, where: Prisma.StoreWhereInput, orderBy: Prisma.StoreOrderByWithRelationInput) => Prisma.PrismaPromise<({
        products: {
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
        }[];
    } & {
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
    })[]>;
    countAll: (where: Prisma.StoreWhereInput) => Prisma.PrismaPromise<number>;
    findById: (id: string) => Prisma.Prisma__StoreClient<({
        products: {
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
        }[];
    } & {
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    create: (data: Prisma.StoreCreateInput) => Prisma.Prisma__StoreClient<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    update: (id: string, data: Prisma.StoreUpdateInput) => Prisma.Prisma__StoreClient<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    softDelete: (id: string) => Prisma.Prisma__StoreClient<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
}
//# sourceMappingURL=store.repository.d.ts.map
