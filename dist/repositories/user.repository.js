// src/repositories/user.repository.ts
import prisma from "../database.js";
export class UserRepository {
    findAll() {
        return prisma.user.findMany({
            where: { deletedAt: null },
            include: { transactions: true }
        });
    }
    findById(id) {
        return prisma.user.findFirst({
            where: { id, deletedAt: null }
        });
    }
    update(id, data) {
        return prisma.user.update({
            where: { id },
            data
        });
    }
    softDelete(id) {
        return prisma.user.update({
            where: { id },
            data: { deletedAt: new Date() }
        });
    }
    searchByName(name) {
        return prisma.user.findMany({
            where: {
                username: { contains: name, mode: "insensitive" },
                deletedAt: null
            }
        });
    }
    searchByEmail(email) {
        return prisma.user.findMany({
            where: {
                email: { contains: email, mode: "insensitive" },
                deletedAt: null
            }
        });
    }
}
//# sourceMappingURL=user.repository.js.map
