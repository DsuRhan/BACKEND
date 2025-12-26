//src/services/store.service.ts
import { StoreRepository } from "../repositories/store.repository.js";
import { Prisma } from "../generated/client.js";
export class GetAllStoresService {
    storeRepo;
    constructor(storeRepo) {
        this.storeRepo = storeRepo;
    }
    async execute(params) {
        const { page, limit, search, sortBy, sortOrder } = params;
        const skip = (page - 1) * limit;
        const where = { deletedAt: null };
        if (search) {
            where.name = { contains: search, mode: "insensitive" };
        }
        const orderBy = sortBy
            ? { [sortBy]: sortOrder || "desc" }
            : { createdAt: "desc" };
        const stores = await this.storeRepo.findAll(skip, limit, where, orderBy);
        const totalItems = await this.storeRepo.countAll(where);
        return {
            stores,
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: page
        };
    }
    ;
}
;
export class GetStoreById {
    storeRepo;
    constructor(storeRepo) {
        this.storeRepo = storeRepo;
    }
    async execute(id) {
        const store = await this.storeRepo.findById(id);
        if (!store)
            throw new Error("Store not found");
        return store;
    }
}
;
export class CreateStore {
    storeRepo;
    constructor(storeRepo) {
        this.storeRepo = storeRepo;
    }
    async execute(userId, data) {
        return this.storeRepo.create({
            name: data.name,
            description: data.description ?? null,
            user: { connect: { id: userId } }
        });
    }
}
;
export class UpdateStore {
    storeRepo;
    constructor(storeRepo) {
        this.storeRepo = storeRepo;
    }
    async execute(id, data) {
        await this.storeRepo.findById(id) ?? (() => { throw new Error("Store not found"); })();
        return this.storeRepo.update(id, data);
    }
}
;
export class DeleteStore {
    storeRepo;
    constructor(storeRepo) {
        this.storeRepo = storeRepo;
    }
    async execute(id) {
        await this.storeRepo.findById(id) ?? (() => { throw new Error("Store not found"); })();
        return this.storeRepo.softDelete(id);
    }
}
;
//# sourceMappingURL=store.service.js.map
