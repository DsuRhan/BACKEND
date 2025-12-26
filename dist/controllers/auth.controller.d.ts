import type { Request, Response } from "express";
import { RegisterService, LoginService } from "../services/auth.service.js";
export declare class AuthController {
    private registerSvc;
    private loginSvc;
    constructor(registerSvc: RegisterService, loginSvc: LoginService);
    register: (req: Request, res: Response, next: import("express").NextFunction) => void;
    login: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=auth.controller.d.ts.map
