import { asyncHandler } from '../utils/async.handler';
import { successResponse } from '../utils/response';
import type { Request, Response } from 'express';
import {
  GetAllStoresService,
  GetStoreById,
  CreateStore,
  UpdateStore,
  DeleteStore
} from '../services/store.service';

export class StoreController {
  constructor(
    private getAllSvc: GetAllStoresService,
    private getByIdSvc: GetStoreById,
    private createSvc: CreateStore,
    private updateSvc: UpdateStore,
    private deleteSvc: DeleteStore
  ) {}

  getAll = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.getAllSvc.execute({
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
      search: req.query.search as string,
      sortBy: req.query.sortBy as string,
      sortOrder: req.query.sortOrder as any
    });

    return successResponse(res, 'Daftar toko', {
      stores: result.stores
    });
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const store = await this.getByIdSvc.execute(req.params.id as any);
    return successResponse(res, 'Store ditemukan', store);
  });

  create = asyncHandler(async (req: Request, res: Response) => {
    const { userId, name, description } = req.body;

    const store = await this.createSvc.execute(userId, {
      name,
      description
    });

    return successResponse(res, 'Store dibuat', store, null, 201);
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const store = await this.updateSvc.execute(req.params.id as any, req.body);
    return successResponse(res, 'Store diupdate', store);
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    await this.deleteSvc.execute(req.params.id as any);
    return successResponse(res, 'Store dihapus', null);
  });
}
