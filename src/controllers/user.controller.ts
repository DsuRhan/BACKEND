// src/controllers/user.controller.ts
import type { Request, Response } from "express";
import { asyncHandler } from "../utils/async.handler";
import { successResponse } from "../utils/response";

export class UserController {
  constructor(
    private getAllSvc: any,
    private getByIdSvc: any,
    private updateSvc: any,
    private deleteSvc: any,
    private searchSvc: any
  ) {}

  getAllUsers = asyncHandler(async (_: Request, res: Response) => {
    const users = await this.getAllSvc.execute();
    return successResponse(res, "Daftar user", users);
  });

  getUserById = asyncHandler(async (req: Request, res: Response) => {
    const user = await this.getByIdSvc.execute(req.params.id);
    return successResponse(res, "User ditemukan", user);
  });

  updateUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await this.updateSvc.execute(req.params.id, req.body);
    return successResponse(res, "User berhasil diupdate", user);
  });

  deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await this.deleteSvc.execute(req.params.id);
    return successResponse(res, "User berhasil dihapus", user);
  });

  searchUsers = asyncHandler(async (req: Request, res: Response) => {
    const { name, email } = req.query as any;
    const users = await this.searchSvc.execute(name, email);
    return successResponse(res, "Hasil pencarian user", users);
  });
}
