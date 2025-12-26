//src/services/store.service.ts
import {StoreRepository} from '../repositories/store.repository';
import { Prisma } from '../generated/client';

interface FindAllParams {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export class GetAllStoresService {
  constructor(private storeRepo: StoreRepository) {}

  async execute(params: FindAllParams) {
    const { page, limit, search, sortBy, sortOrder } = params;
    const skip = (page - 1) * limit;

  const where: Prisma.StoreWhereInput = { deletedAt: null };
  if (search) {
    where.name = { contains: search, mode: 'insensitive' };
  }

  const orderBy: any = sortBy
    ? { [sortBy]: sortOrder || 'desc' }
    : { createdAt: 'desc' };

  const stores = await this.storeRepo.findAll(skip, limit, where, orderBy);
  const totalItems = await this.storeRepo.countAll(where);

  return {
    stores,
    totalItems,
    totalPages: Math.ceil(totalItems / limit),
    currentPage: page
  };
};
};

export class GetStoreById {
  constructor(private storeRepo: StoreRepository) {}

  async execute(id: string) {
    const store = await this.storeRepo.findById(id);
    if (!store) throw new Error('Store not found');
    return store;
  }
};

export class CreateStore {
  constructor(private storeRepo: StoreRepository) {}

  async execute(userId: string, data: { name: string; description?: string }) {
    return this.storeRepo.create({
      name: data.name,
      description: data.description ?? null,
      user: { connect: { id: userId } }
    });
  }
};


export class UpdateStore {
  constructor(private storeRepo: StoreRepository) {}

  async execute(id: string, data: Prisma.StoreUpdateInput) {
    await this.storeRepo.findById(id) ?? (() => { throw new Error('Store not found'); })();
    return this.storeRepo.update(id, data);
  }
};

export class DeleteStore {
  constructor(private storeRepo: StoreRepository) {}

  async execute(id: string) {
    await this.storeRepo.findById(id) ?? (() => { throw new Error('Store not found'); })();
    return this.storeRepo.softDelete(id);
  }
};
