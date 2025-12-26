// src/controllers/product.controller.ts
import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/async.handler';
import { successResponse } from '../utils/response';
import {
  getAllProductsService,
  getProductByIdService,
  createProductService,
  updateProductService,
  deleteProductService,
  getProductStatsService
} from '../services/product.service';

export class ProductController {
  constructor(
    private getAllSvc: getAllProductsService,
    private getByIdSvc: getProductByIdService,
    private createSvc: createProductService,
    private updateSvc: updateProductService,
    private deleteSvc: deleteProductService,
    private statsSvc: getProductStatsService
  ) {}

  // ✅ FIX RESPONSE SHAPE
  getAllProducts = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.getAllSvc.execute({
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
      search: req.query.search as string,
      sortBy: req.query.sortBy as string,
      sortOrder: req.query.sortOrder as 'asc' | 'desc'
    });

    return successResponse(res, 'Daftar produk', {
      products: result.products,
      totalItems: result.totalItems
    });
  });

 getStats = asyncHandler(async (req: Request, res: Response) => {
  const stats = await this.statsSvc.execute(req.query.categoryId as string);
  return successResponse(res, 'Statistik produk', stats);
});


  getProductById = asyncHandler(async (req: Request, res: Response) => {
    const product = await this.getByIdSvc.execute(req.params.id as any);
    return successResponse(res, 'Produk ditemukan', product);
  });

  // ✅ RETURN ONLY ID
  createProduct = asyncHandler(async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image is required'
      });
    }

    const product = await this.createSvc.execute({
      ...req.body,
      price: Number(req.body.price),
      stock: Number(req.body.stock),
      image: `/public/uploads/${req.file.filename}`
    });

    return successResponse(
      res,
      'Produk dibuat',
      { id: product.id },
      null,
      201
    );
  });

  updateProduct = asyncHandler(async (req: Request, res: Response) => {
    const data: any = {
  ...req.body
};

if (req.body.price !== undefined) {
  data.price = Number(req.body.price);
}

if (req.body.stock !== undefined) {
  data.stock = Number(req.body.stock);
}


    if (req.file) {
      data.image = `/public/uploads/${req.file.filename}`;
    }

    const product = await this.updateSvc.execute(req.params.id as any, data);
    return successResponse(res, 'Produk diupdate', product);
  });

  // ✅ NO DATA RETURNED
  deleteProduct = asyncHandler(async (req: Request, res: Response) => {
    await this.deleteSvc.execute(req.params.id as any);
    return successResponse(res, 'Produk dihapus');
  });
}
