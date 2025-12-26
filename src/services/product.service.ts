// src/services/product.service.ts
import type { Prisma } from '../generated/client';
import { ProductRepository } from '../repositories/product.repository';

interface FindAllParams {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export class getAllProductsService {
  constructor(private repo: ProductRepository) {}

  async execute(params: FindAllParams) {
    const { page, limit, search, sortBy, sortOrder } = params;
    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = {
      deletedAt: null,
      ...(search && {
        name: { contains: search, mode: 'insensitive' }
      })
    };

    const orderBy: any = sortBy
      ? { [sortBy]: sortOrder || 'desc' }
      : { createdAt: 'desc' };

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
  constructor(private repo: ProductRepository) {}

  async execute(categoryId?: string) {
    const overview = await this.repo.getStatistics(categoryId);

    if (overview._count.id === 0) {
      return {
        overview,
        byCategory: [],
        lowStock: []
      };
    }

    const byCategory =
      await this.repo.getProductsByCategoryStats(categoryId);

    const lowStock =
      await this.repo.getLowStockProducts();

    return { overview, byCategory, lowStock };
  }
}


export class getProductByIdService {
  constructor(private repo: ProductRepository) {}

  async execute(id: string) {
    const product = await this.repo.findById(id);
    if (!product) throw new Error('Product not found');
    return product;
  }
}

export class createProductService {
  constructor(private repo: ProductRepository) {}

  async execute(data: {
    name: string;
    price: number;
    stock: number;
    description?: string;
    categoryId: string;
    storeId?: string;
    image: string;
  }) {
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
  constructor(private repo: ProductRepository) {}

  async execute(id: string, data: Prisma.ProductUpdateInput) {
    const exists = await this.repo.findById(id);
    if (!exists) throw new Error('Product not found');
    return this.repo.update(id, data);
  }
}

export class deleteProductService {
  constructor(private repo: ProductRepository) {}

  async execute(id: string) {
    const exists = await this.repo.findById(id);
    if (!exists) throw new Error('Product not found');
    return this.repo.softDelete(id);
  }
}
