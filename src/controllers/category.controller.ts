//src/controllers/category.controller.ts
import { asyncHandler } from '../utils/async.handler';
import { successResponse } from '../utils/response';
import type { Request, Response } from 'express';
import {
  GetAllCategoriesService,
  GetCategoryByIdService,
  CreateCategoryService,
  UpdateCategoryService,
  DeleteCategoryService
} from '../services/category.service';

export class CategoryController {
  constructor(
    private getAllSvc: GetAllCategoriesService,
    private getByIdSvc: GetCategoryByIdService,
    private createSvc: CreateCategoryService,
    private updateSvc: UpdateCategoryService,
    private deleteSvc: DeleteCategoryService
  ) {}

  getAll = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.getAllSvc.execute({
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
      search: req.query.search as string,
      sortBy: req.query.sortBy as string,
      sortOrder: req.query.sortOrder as any
    });

    return successResponse(res, 'Daftar kategori', result.categories, {
      page: result.currentPage,
      limit: Number(req.query.limit) || 10,
      total: result.totalItems,
      totalPages: result.totalPages
    });
  });

  getById = asyncHandler(async (req: any, res: any) => {
    const category = await this.getByIdSvc.execute(req.params.id);
    return successResponse(res, 'Kategori ditemukan', category);
  });

  create = asyncHandler(async (req: any, res: any) => {
    const category = await this.createSvc.execute(req.body);
    return successResponse(res, 'Kategori dibuat', category, null, 201);
  });

  update = asyncHandler(async (req: any, res: any) => {
    const category = await this.updateSvc.execute(req.params.id, req.body);
    return successResponse(res, 'Kategori diupdate', category);
  });

  delete = asyncHandler(async (req: any, res: any) => {
    const category = await this.deleteSvc.execute(req.params.id);
    return successResponse(res, 'Kategori dihapus', category);
  });
}
