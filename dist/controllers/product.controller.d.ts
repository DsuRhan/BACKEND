import type { Request, Response } from "express";
import { getAllProductsService, getProductByIdService, createProductService, updateProductService, deleteProductService, getProductStatsService } from "../services/product.service.js";
export declare class ProductController {
    private getAllSvc;
    private getByIdSvc;
    private createSvc;
    private updateSvc;
    private deleteSvc;
    private statsSvc;
    constructor(getAllSvc: getAllProductsService, getByIdSvc: getProductByIdService, createSvc: createProductService, updateSvc: updateProductService, deleteSvc: deleteProductService, statsSvc: getProductStatsService);
    getAllProducts: (req: Request, res: Response, next: import("express").NextFunction) => void;
    getStats: (req: Request, res: Response, next: import("express").NextFunction) => void;
    getProductById: (req: Request, res: Response, next: import("express").NextFunction) => void;
    createProduct: (req: Request, res: Response, next: import("express").NextFunction) => void;
    updateProduct: (req: Request, res: Response, next: import("express").NextFunction) => void;
    deleteProduct: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=product.controller.d.ts.map
