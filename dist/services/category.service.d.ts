import type { Prisma } from "../generated/client.js";
import { CategoryRepository } from "../repositories/category.repository.js";
interface FindAllParams {
    page: number;
    limit: number;
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}
export declare class GetAllCategoriesService {
    private repo;
    constructor(repo: CategoryRepository);
    execute(params: FindAllParams): Promise<{
        categories: ({
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
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        })[];
        totalItems: number;
        totalPages: number;
        currentPage: number;
    }>;
}
export declare class GetCategoryByIdService {
    private repo;
    constructor(repo: CategoryRepository);
    execute(id: string): Promise<{
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
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
}
export declare class CreateCategoryService {
    private repo;
    constructor(repo: CategoryRepository);
    execute(data: {
        name: string;
    }): Prisma.Prisma__CategoryClient<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
}
export declare class UpdateCategoryService {
    private repo;
    constructor(repo: CategoryRepository);
    execute(id: string, data: Prisma.CategoryUpdateInput): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
}
export declare class DeleteCategoryService {
    private repo;
    constructor(repo: CategoryRepository);
    execute(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
}
export {};
//# sourceMappingURL=category.service.d.ts.map
