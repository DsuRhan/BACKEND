// src/repositories/profile.repository.ts
import prisma from "../database.js";
export class ProfileRepository {
    create(userId, data) {
        return prisma.profile.create({ data: { ...data, userId } });
    }
    findByUserId(userId) {
        return prisma.profile.findUnique({ where: { userId } });
    }
    update(userId, data) {
        return prisma.profile.update({ where: { userId }, data });
    }
    delete(userId) {
        return prisma.profile.delete({ where: { userId } });
    }
}
//# sourceMappingURL=profile.repository.js.map
