import { ProductRepository } from "../repositories/product.repository.js";
export class getAllProductsService {
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
        const products = await this.repo.findAll(skip, limit, where, orderBy);
        const totalItems = await this.repo.countAll(where);
        return {
            products,
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: page
        };
    }
}
export class getProductStatsService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async execute(categoryId) {
        const overview = await this.repo.getStatistics(categoryId);
        if (overview._count.id === 0) {
            return {
                overview,
                byCategory: [],
                lowStock: []
            };
        }
        const byCategory = await this.repo.getProductsByCategoryStats(categoryId);
        const lowStock = await this.repo.getLowStockProducts();
        return { overview, byCategory, lowStock };
    }
}
export class getProductByIdService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async execute(id) {
        const product = await this.repo.findById(id);
        if (!product)
            throw new Error("Product not found");
        return product;
    }
}
export class createProductService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async execute(data) {
        return this.repo.create({
            name: data.name,
            description: data.description ?? null,
            price: data.price,
            stock: data.stock,
            image: data.image,
            category: { connect: { id: data.categoryId } },
            ...(data.storeId && {
                store: { connect: { id: data.storeId } }
            })
        });
    }
}
export class updateProductService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async execute(id, data) {
        const exists = await this.repo.findById(id);
        if (!exists)
            throw new Error("Product not found");
        return this.repo.update(id, data);
    }
}
export class deleteProductService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async execute(id) {
        const exists = await this.repo.findById(id);
        if (!exists)
            throw new Error("Product not found");
        return this.repo.softDelete(id);
    }
}
//# sourceMappingURL=product.service.js.map
