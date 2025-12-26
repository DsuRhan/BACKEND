import type { Request, Response } from "express";
import { GetAllCategoriesService, GetCategoryByIdService, CreateCategoryService, UpdateCategoryService, DeleteCategoryService } from "../services/category.service.js";
export declare class CategoryController {
    private getAllSvc;
    private getByIdSvc;
    private createSvc;
    private updateSvc;
    private deleteSvc;
    constructor(getAllSvc: GetAllCategoriesService, getByIdSvc: GetCategoryByIdService, createSvc: CreateCategoryService, updateSvc: UpdateCategoryService, deleteSvc: DeleteCategoryService);
    getAll: (req: Request, res: Response, next: import("express").NextFunction) => void;
    getById: (req: Request, res: Response, next: import("express").NextFunction) => void;
    create: (req: Request, res: Response, next: import("express").NextFunction) => void;
    update: (req: Request, res: Response, next: import("express").NextFunction) => void;
    delete: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=category.controller.d.ts.map
