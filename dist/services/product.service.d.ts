import type { Prisma } from "../generated/client.js";
import { ProductRepository } from "../repositories/product.repository.js";
interface FindAllParams {
    page: number;
    limit: number;
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}
export declare class getAllProductsService {
    private repo;
    constructor(repo: ProductRepository);
    execute(params: FindAllParams): Promise<{
        products: ({
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
        })[];
        totalItems: number;
        totalPages: number;
        currentPage: number;
    }>;
}
export declare class getProductStatsService {
    private repo;
    constructor(repo: ProductRepository);
    execute(categoryId?: string): Promise<{
        overview: Prisma.GetProductAggregateType<{
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
        }>;
        byCategory: (Prisma.PickEnumerable<Prisma.ProductGroupByOutputType, "categoryId"[]> & {
            _count: {
                id: number;
            };
            _avg: {
                price: import("@prisma/client-runtime-utils").Decimal | null;
            };
        })[];
        lowStock: {
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
    }>;
}
export declare class getProductByIdService {
    private repo;
    constructor(repo: ProductRepository);
    execute(id: string): Promise<{
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
    }>;
}
export declare class createProductService {
    private repo;
    constructor(repo: ProductRepository);
    execute(data: {
        name: string;
        price: number;
        stock: number;
        description?: string;
        categoryId: string;
        storeId?: string;
        image: string;
    }): Promise<{
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
}
export declare class updateProductService {
    private repo;
    constructor(repo: ProductRepository);
    execute(id: string, data: Prisma.ProductUpdateInput): Promise<{
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
}
export declare class deleteProductService {
    private repo;
    constructor(repo: ProductRepository);
    execute(id: string): Promise<{
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
}
export {};
//# sourceMappingURL=product.service.d.ts.map
