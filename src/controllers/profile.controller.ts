// src/controllers/profile.controller.ts
import type { Request, Response } from "express";
import { asyncHandler } from "../utils/async.handler";

export class ProfileController {
  constructor(
    private createSvc: any,
    private getSvc: any,
    private updateSvc: any,
    private deleteSvc: any
  ) {}

  store = asyncHandler(async (req: Request, res: Response) => {
    const profile = await this.createSvc.execute(req.user!.id, req.body);
    res.status(201).json(profile);
  });

  show = asyncHandler(async (req: Request, res: Response) => {
    const profile = await this.getSvc.execute(req.user!.id);
    res.json(profile);
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const profile = await this.updateSvc.execute(req.user!.id, req.body);
    res.json(profile);
  });

  destroy = asyncHandler(async (req: Request, res: Response) => {
    await this.deleteSvc.execute(req.user!.id);
    res.status(204).send();
  });
}
