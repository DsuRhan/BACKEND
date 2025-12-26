import type { Request, Response } from "express";
import { GetAllStoresService, GetStoreById, CreateStore, UpdateStore, DeleteStore } from "../services/store.service.js";
export declare class StoreController {
    private getAllSvc;
    private getByIdSvc;
    private createSvc;
    private updateSvc;
    private deleteSvc;
    constructor(getAllSvc: GetAllStoresService, getByIdSvc: GetStoreById, createSvc: CreateStore, updateSvc: UpdateStore, deleteSvc: DeleteStore);
    getAll: (req: Request, res: Response, next: import("express").NextFunction) => void;
    getById: (req: Request, res: Response, next: import("express").NextFunction) => void;
    create: (req: Request, res: Response, next: import("express").NextFunction) => void;
    update: (req: Request, res: Response, next: import("express").NextFunction) => void;
    delete: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=store.controller.d.ts.map
