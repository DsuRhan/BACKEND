// src/repositories/product.repository.ts
import prisma from '../database';
import type { Prisma } from '../generated/client';

export class ProductRepository {

  async findAll(
    skip: number,
    take: number,
    where: Prisma.ProductWhereInput,
    orderBy: Prisma.ProductOrderByWithRelationInput
  ) {
    return prisma.product.findMany({
      skip,
      take,
      where,
      orderBy,
      include: { category: true, store: true }
    });
  }

  async countAll(where: Prisma.ProductWhereInput) {
    return prisma.product.count({ where });
  }

  async findById(id: string) {
    return prisma.product.findFirst({
      where: { id, deletedAt: null },
      include: { category: true, store: true }
    });
  }

  async create(data: Prisma.ProductCreateInput) {
    return prisma.product.create({ data });
  }

  async update(id: string, data: Prisma.ProductUpdateInput) {
    return prisma.product.update({
      where: { id },
      data
    });
  }

  async softDelete(id: string) {
    return prisma.product.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }

  /* ===== ADVANCED QUERY ===== */

  async getStatistics(categoryId?: string) {
    return prisma.product.aggregate({
      where: {
        deletedAt: null,
        ...(categoryId && { categoryId })
      },
      _count: { id: true },
      _avg: { price: true },
      _min: { price: true },
      _max: { price: true },
      _sum: { stock: true }
    });
  }

async getProductsByCategoryStats(categoryId?: string) {
  const where: Prisma.ProductWhereInput = {
    deletedAt: null,
    ...(categoryId && { categoryId })
  };

  const count = await prisma.product.count({ where });
  if (count === 0) return [];

  return prisma.product.groupBy({
    by: ['categoryId'],
    where,
    _count: { id: true },
    _avg: { price: true }
  });
}



  async getLowStockProducts(limit = 5) {
    return prisma.product.findMany({
      where: {
        deletedAt: null,
        stock: { lt: 10 }
      },
      orderBy: { stock: 'asc' },
      take: limit
    });
  }
}
