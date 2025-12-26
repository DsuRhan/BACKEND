// src/repositories/user.repository.ts
import prisma from "../database";
import type { Prisma } from "../generated/client";

export class UserRepository {
  findAll() {
    return prisma.user.findMany({
      where: { deletedAt: null },
      include: { transactions: true }
    });
  }

  findById(id: string) {
    return prisma.user.findFirst({
      where: { id, deletedAt: null }
    });
  }

  update(id: string, data: Prisma.UserUpdateInput) {
    return prisma.user.update({
      where: { id },
      data
    });
  }

  softDelete(id: string) {
    return prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }

  searchByName(name: string) {
    return prisma.user.findMany({
      where: {
        username: { contains: name, mode: "insensitive" },
        deletedAt: null
      }
    });
  }

  searchByEmail(email: string) {
    return prisma.user.findMany({
      where: {
        email: { contains: email, mode: "insensitive" },
        deletedAt: null
      }
    });
  }
}
