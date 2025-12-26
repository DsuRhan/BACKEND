import type { Request, Response } from "express";
export declare class ProfileController {
    private createSvc;
    private getSvc;
    private updateSvc;
    private deleteSvc;
    constructor(createSvc: any, getSvc: any, updateSvc: any, deleteSvc: any);
    store: (req: Request, res: Response, next: import("express").NextFunction) => void;
    show: (req: Request, res: Response, next: import("express").NextFunction) => void;
    update: (req: Request, res: Response, next: import("express").NextFunction) => void;
    destroy: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=profile.controller.d.ts.map