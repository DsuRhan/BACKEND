import type { Request, Response } from "express";
import { asyncHandler } from "../utils/async.handler";
import { successResponse } from "../utils/response";
import { RegisterService, LoginService } from "../services/auth.service";

export class AuthController {
  constructor(
    private registerSvc: RegisterService,
    private loginSvc: LoginService
  ) {}

  register = asyncHandler(async (req: Request, res: Response) => {
    try {
      const user = await this.registerSvc.execute(req.body);
      return successResponse(res, "Register berhasil", user, null, 201);
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        message: err.message || "Register gagal"
      });
    }
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    try {
      const result = await this.loginSvc.execute(req.body);
      return successResponse(res, "Login berhasil", result);
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        message: err.message || "Login gagal"
      });
    }
  });
}
