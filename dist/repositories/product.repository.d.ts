import type { Prisma } from "../generated/client.js";
export declare class ProductRepository {
    findAll(skip: number, take: number, where: Prisma.ProductWhereInput, orderBy: Prisma.ProductOrderByWithRelationInput): Promise<({
        category: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        } | null;
        store: {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
        } | null;
    } & {
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
    })[]>;
    countAll(where: Prisma.ProductWhereInput): Promise<number>;
    findById(id: string): Promise<({
        category: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        } | null;
        store: {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
        } | null;
    } & {
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
    }) | null>;
    create(data: Prisma.ProductCreateInput): Promise<{
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
    }>;
    update(id: string, data: Prisma.ProductUpdateInput): Promise<{
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
    }>;
    softDelete(id: string): Promise<{
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
    }>;
    getStatistics(categoryId?: string): Promise<Prisma.GetProductAggregateType<{
        where: {
            categoryId?: string;
            deletedAt: null;
        };
        _count: {
            id: true;
        };
        _avg: {
            price: true;
        };
        _min: {
            price: true;
        };
        _max: {
            price: true;
        };
        _sum: {
            stock: true;
        };
    }>>;
    getProductsByCategoryStats(categoryId?: string): Promise<(Prisma.PickEnumerable<Prisma.ProductGroupByOutputType, "categoryId"[]> & {
        _count: {
            id: number;
        };
        _avg: {
            price: import("@prisma/client-runtime-utils").Decimal | null;
        };
    })[]>;
    getLowStockProducts(limit?: number): Promise<{
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
    }[]>;
}
//# sourceMappingURL=product.repository.d.ts.map
