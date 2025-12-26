//src/services/category.service.ts
import type { Prisma } from '../generated/client';
import { CategoryRepository } from '../repositories/category.repository';

interface FindAllParams {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export class GetAllCategoriesService {
  constructor(private repo: CategoryRepository) {}

  async execute(params: FindAllParams) {
    const { page, limit, search, sortBy, sortOrder } = params;
    const skip = (page - 1) * limit;

    const where: Prisma.CategoryWhereInput = {
      deletedAt: null,
      ...(search && {
        name: { contains: search, mode: 'insensitive' }
      })
    };

    const orderBy: any = sortBy
      ? { [sortBy]: sortOrder || 'desc' }
      : { createdAt: 'desc' };

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
  constructor(private repo: CategoryRepository) {}

  async execute(id: string) {
    const category = await this.repo.findById(id);
    if (!category) throw new Error('Category not found');
    return category;
  }
}

export class CreateCategoryService {
  constructor(private repo: CategoryRepository) {}

  execute(data: { name: string }) {
    return this.repo.create({ name: data.name });
  }
}

export class UpdateCategoryService {
  constructor(private repo: CategoryRepository) {}

  async execute(id: string, data: Prisma.CategoryUpdateInput) {
    await this.repo.findById(id) ?? (() => { throw new Error('Category not found'); })();
    return this.repo.update(id, data);
  }
}

export class DeleteCategoryService {
  constructor(private repo: CategoryRepository) {}

  async execute(id: string) {
    await this.repo.findById(id) ?? (() => { throw new Error('Category not found'); })();
    return this.repo.softDelete(id);
  }
}
