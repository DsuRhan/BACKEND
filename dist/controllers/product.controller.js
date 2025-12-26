import { asyncHandler } from "../utils/async.handler.js";
import { successResponse } from "../utils/response.js";
import { getAllProductsService, getProductByIdService, createProductService, updateProductService, deleteProductService, getProductStatsService } from "../services/product.service.js";
export class ProductController {
    getAllSvc;
    getByIdSvc;
    createSvc;
    updateSvc;
    deleteSvc;
    statsSvc;
    constructor(getAllSvc, getByIdSvc, createSvc, updateSvc, deleteSvc, statsSvc) {
        this.getAllSvc = getAllSvc;
        this.getByIdSvc = getByIdSvc;
        this.createSvc = createSvc;
        this.updateSvc = updateSvc;
        this.deleteSvc = deleteSvc;
        this.statsSvc = statsSvc;
    }
    // ✅ FIX RESPONSE SHAPE
    getAllProducts = asyncHandler(async (req, res) => {
        const result = await this.getAllSvc.execute({
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 10,
            search: req.query.search,
            sortBy: req.query.sortBy,
            sortOrder: req.query.sortOrder
        });
        return successResponse(res, "Daftar produk", {
            products: result.products,
            totalItems: result.totalItems
        });
    });
    getStats = asyncHandler(async (req, res) => {
        const stats = await this.statsSvc.execute(req.query.categoryId);
        return successResponse(res, "Statistik produk", stats);
    });
    getProductById = asyncHandler(async (req, res) => {
        const product = await this.getByIdSvc.execute(req.params.id);
        return successResponse(res, "Produk ditemukan", product);
    });
    // ✅ RETURN ONLY ID
    createProduct = asyncHandler(async (req, res) => {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            });
        }
        const product = await this.createSvc.execute({
            ...req.body,
            price: Number(req.body.price),
            stock: Number(req.body.stock),
            image: `/public/uploads/${req.file.filename}`
        });
        return successResponse(res, "Produk dibuat", { id: product.id }, null, 201);
    });
    updateProduct = asyncHandler(async (req, res) => {
        const data = {
            ...req.body
        };
        if (req.body.price !== undefined) {
            data.price = Number(req.body.price);
        }
        if (req.body.stock !== undefined) {
            data.stock = Number(req.body.stock);
        }
        if (req.file) {
            data.image = `/public/uploads/${req.file.filename}`;
        }
        const product = await this.updateSvc.execute(req.params.id, data);
        return successResponse(res, "Produk diupdate", product);
    });
    // ✅ NO DATA RETURNED
    deleteProduct = asyncHandler(async (req, res) => {
        await this.deleteSvc.execute(req.params.id);
        return successResponse(res, "Produk dihapus");
    });
}
//# sourceMappingURL=product.controller.js.map
