//src/repositories/store.repository.ts
import prisma from '../database';
import type { Prisma } from '../generated/client';

export class StoreRepository {
  findAll = (
    skip: number,
    take: number,
    where: Prisma.StoreWhereInput,
    orderBy: Prisma.StoreOrderByWithRelationInput
  ) => {
  return prisma.store.findMany({
    skip,
    take,
    where,
    orderBy,
    include: { products: true }
  });
};

  countAll = (where: Prisma.StoreWhereInput) => {
  return prisma.store.count({ where });
};

  findById = (id: string) => {
    return prisma.store.findFirst({
      where: { id, deletedAt: null },
      include: { products: true }
    });
  };


  create = (data: Prisma.StoreCreateInput) => {
    return prisma.store.create({ data });
  };

  update = (id: string, data: Prisma.StoreUpdateInput) => {
    return prisma.store.update({ where: { id }, data });
  };
  softDelete = (id: string) => {
    return prisma.store.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  };
};
