import type { Request, Response } from "express";
export declare class UserController {
    private getAllSvc;
    private getByIdSvc;
    private updateSvc;
    private deleteSvc;
    private searchSvc;
    constructor(getAllSvc: any, getByIdSvc: any, updateSvc: any, deleteSvc: any, searchSvc: any);
    getAllUsers: (req: Request, res: Response, next: import("express").NextFunction) => void;
    getUserById: (req: Request, res: Response, next: import("express").NextFunction) => void;
    updateUser: (req: Request, res: Response, next: import("express").NextFunction) => void;
    deleteUser: (req: Request, res: Response, next: import("express").NextFunction) => void;
    searchUsers: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=user.controller.d.ts.map