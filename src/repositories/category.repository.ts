//src/repositories/category.repository.ts
import prisma from '../database';
import type { Prisma } from '../generated/client';

export class CategoryRepository {
  findAll(
    skip: number,
    take: number,
    where: Prisma.CategoryWhereInput,
    orderBy: Prisma.CategoryOrderByWithRelationInput
  ) {
    return prisma.category.findMany({
      skip,
      take,
      where,
      orderBy,
      include: { products: true }
    });
  }

  countAll(where: Prisma.CategoryWhereInput) {
    return prisma.category.count({ where });
  }

  findById(id: string) {
    return prisma.category.findFirst({
      where: { id, deletedAt: null },
      include: { products: true }
    });
  }

  create(data: Prisma.CategoryCreateInput) {
    return prisma.category.create({ data });
  }

  update(id: string, data: Prisma.CategoryUpdateInput) {
    return prisma.category.update({ where: { id }, data });
  }

  softDelete(id: string) {
    return prisma.category.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }
}
