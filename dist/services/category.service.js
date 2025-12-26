import { CategoryRepository } from "../repositories/category.repository.js";
export class GetAllCategoriesService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async execute(params) {
        const { page, limit, search, sortBy, sortOrder } = params;
        const skip = (page - 1) * limit;
        const where = {
            deletedAt: null,
            ...(search && {
                name: { contains: search, mode: "insensitive" }
            })
        };
        const orderBy = sortBy
            ? { [sortBy]: sortOrder || "desc" }
            : { createdAt: "desc" };
        const categories = await this.repo.findAll(skip, limit, where, orderBy);
        const totalItems = await this.repo.countAll(where);
        return {
            categories,
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: page
        };
    }
}
export class GetCategoryByIdService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async execute(id) {
        const category = await this.repo.findById(id);
        if (!category)
            throw new Error("Category not found");
        return category;
    }
}
export class CreateCategoryService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    execute(data) {
        return this.repo.create({ name: data.name });
    }
}
export class UpdateCategoryService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async execute(id, data) {
        await this.repo.findById(id) ?? (() => { throw new Error("Category not found"); })();
        return this.repo.update(id, data);
    }
}
export class DeleteCategoryService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async execute(id) {
        await this.repo.findById(id) ?? (() => { throw new Error("Category not found"); })();
        return this.repo.softDelete(id);
    }
}
//# sourceMappingURL=category.service.js.map
