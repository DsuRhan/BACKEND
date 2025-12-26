//src/repositories/category.repository.ts
import prisma from "../database.js";
export class CategoryRepository {
    findAll(skip, take, where, orderBy) {
        return prisma.category.findMany({
            skip,
            take,
            where,
            orderBy,
            include: { products: true }
        });
    }
    countAll(where) {
        return prisma.category.count({ where });
    }
    findById(id) {
        return prisma.category.findFirst({
            where: { id, deletedAt: null },
            include: { products: true }
        });
    }
    create(data) {
        return prisma.category.create({ data });
    }
    update(id, data) {
        return prisma.category.update({ where: { id }, data });
    }
    softDelete(id) {
        return prisma.category.update({
            where: { id },
            data: { deletedAt: new Date() }
        });
    }
}
//# sourceMappingURL=category.repository.js.map
