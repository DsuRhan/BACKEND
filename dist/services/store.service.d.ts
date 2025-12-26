import { StoreRepository } from "../repositories/store.repository.js";
import { Prisma } from "../generated/client.js";
interface FindAllParams {
    page: number;
    limit: number;
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}
export declare class GetAllStoresService {
    private storeRepo;
    constructor(storeRepo: StoreRepository);
    execute(params: FindAllParams): Promise<{
        stores: ({
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
        })[];
        totalItems: number;
        totalPages: number;
        currentPage: number;
    }>;
}
export declare class GetStoreById {
    private storeRepo;
    constructor(storeRepo: StoreRepository);
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
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
    }>;
}
export declare class CreateStore {
    private storeRepo;
    constructor(storeRepo: StoreRepository);
    execute(userId: string, data: {
        name: string;
        description?: string;
    }): Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
    }>;
}
export declare class UpdateStore {
    private storeRepo;
    constructor(storeRepo: StoreRepository);
    execute(id: string, data: Prisma.StoreUpdateInput): Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
    }>;
}
export declare class DeleteStore {
    private storeRepo;
    constructor(storeRepo: StoreRepository);
    execute(id: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
    }>;
}
export {};
//# sourceMappingURL=store.service.d.ts.map
