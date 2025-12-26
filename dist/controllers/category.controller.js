//src/controllers/category.controller.ts
import { asyncHandler } from "../utils/async.handler.js";
import { successResponse } from "../utils/response.js";
import { GetAllCategoriesService, GetCategoryByIdService, CreateCategoryService, UpdateCategoryService, DeleteCategoryService } from "../services/category.service.js";
export class CategoryController {
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
        return successResponse(res, "Daftar kategori", result.categories, {
            page: result.currentPage,
            limit: Number(req.query.limit) || 10,
            total: result.totalItems,
            totalPages: result.totalPages
        });
    });
    getById = asyncHandler(async (req, res) => {
        const category = await this.getByIdSvc.execute(req.params.id);
        return successResponse(res, "Kategori ditemukan", category);
    });
    create = asyncHandler(async (req, res) => {
        const category = await this.createSvc.execute(req.body);
        return successResponse(res, "Kategori dibuat", category, null, 201);
    });
    update = asyncHandler(async (req, res) => {
        const category = await this.updateSvc.execute(req.params.id, req.body);
        return successResponse(res, "Kategori diupdate", category);
    });
    delete = asyncHandler(async (req, res) => {
        const category = await this.deleteSvc.execute(req.params.id);
        return successResponse(res, "Kategori dihapus", category);
    });
}
//# sourceMappingURL=category.controller.js.map
