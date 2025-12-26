// src/repositories/auth.repository.ts
import prisma from "../database.js";
export class AuthRepository {
    findByEmail(email) {
        return prisma.user.findUnique({ where: { email } });
    }
    create(data) {
        return prisma.user.create({ data });
    }
}
//# sourceMappingURL=auth.repository.js.map
