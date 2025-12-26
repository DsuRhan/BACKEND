//src/repositories/store.repository.ts
import prisma from "../database.js";
export class StoreRepository {
    findAll = (skip, take, where, orderBy) => {
        return prisma.store.findMany({
            skip,
            take,
            where,
            orderBy,
            include: { products: true }
        });
    };
    countAll = (where) => {
        return prisma.store.count({ where });
    };
    findById = (id) => {
        return prisma.store.findFirst({
            where: { id, deletedAt: null },
            include: { products: true }
        });
    };
    create = (data) => {
        return prisma.store.create({ data });
    };
    update = (id, data) => {
        return prisma.store.update({ where: { id }, data });
    };
    softDelete = (id) => {
        return prisma.store.update({
            where: { id },
            data: { deletedAt: new Date() }
        });
    };
}
;
//# sourceMappingURL=store.repository.js.map
