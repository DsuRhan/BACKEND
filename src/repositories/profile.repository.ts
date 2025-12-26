// src/repositories/profile.repository.ts
import prisma from "../database";

export class ProfileRepository {
  create(userId: string, data: any) {
    return prisma.profile.create({ data: { ...data, userId } });
  }

  findByUserId(userId: string) {
    return prisma.profile.findUnique({ where: { userId } });
  }

  update(userId: string, data: any) {
    return prisma.profile.update({ where: { userId }, data });
  }

  delete(userId: string) {
    return prisma.profile.delete({ where: { userId } });
  }
}
