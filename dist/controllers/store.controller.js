import { asyncHandler } from "../utils/async.handler.js";
import { successResponse } from "../utils/response.js";
import { GetAllStoresService, GetStoreById, CreateStore, UpdateStore, DeleteStore } from "../services/store.service.js";
export class StoreController {
    getAllSvc;
    getByIdSvc;
    createSvc;
    updateSvc;
    deleteSvc;
    constructor(getAllSvc, getByIdSvc, createSvc, updateSvc, deleteSvc) {
        this.getAllSvc = getAllSvc;
        this.getByIdSvc = getByIdSvc;
        this.createSvc = createSvc;
        this.updateSvc = updateSvc;
        this.deleteSvc = deleteSvc;
    }
    getAll = asyncHandler(async (req, res) => {
        const result = await this.getAllSvc.execute({
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 10,
            search: req.query.search,
            sortBy: req.query.sortBy,
            sortOrder: req.query.sortOrder
        });
        return successResponse(res, "Daftar toko", {
            stores: result.stores
        });
    });
    getById = asyncHandler(async (req, res) => {
        const store = await this.getByIdSvc.execute(req.params.id);
        return successResponse(res, "Store ditemukan", store);
    });
    create = asyncHandler(async (req, res) => {
        const { userId, name, description } = req.body;
        const store = await this.createSvc.execute(userId, {
            name,
            description
        });
        return successResponse(res, "Store dibuat", store, null, 201);
    });
    update = asyncHandler(async (req, res) => {
        const store = await this.updateSvc.execute(req.params.id, req.body);
        return successResponse(res, "Store diupdate", store);
    });
    delete = asyncHandler(async (req, res) => {
        await this.deleteSvc.execute(req.params.id);
        return successResponse(res, "Store dihapus", null);
    });
}
//# sourceMappingURL=store.controller.js.map
