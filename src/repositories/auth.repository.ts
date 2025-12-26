// src/repositories/auth.repository.ts
import prisma from "../database";
import type { Prisma } from "../generated/client";

export class AuthRepository {
  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  create(data: Prisma.UserCreateInput) {
    return prisma.user.create({ data });
  }
}
