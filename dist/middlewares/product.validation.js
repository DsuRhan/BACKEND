// src/middlewares/product.validation.ts
import { body, param, validationResult } from "express-validator";
import { errorResponse } from "../utils/response.js";
// Helper function untuk menjalankan validasi
export const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        const errorList = errors.array().map((err) => ({
            field: err.path || err.param || "unknown",
            message: err.msg
        }));
        return errorResponse(res, "Validasi gagal", 400, errorList);
    };
};
export const updateProductValidation = [
    body("name")
        .optional()
        .trim()
        .isLength({ min: 3 }).withMessage("Nama produk minimal 3 karakter"),
    body("description")
        .optional()
        .trim()
        .isLength({ min: 10 }).withMessage("Deskripsi minimal 10 karakter"),
    body("price")
        .optional()
        .isNumeric().withMessage("Harga harus angka")
        .custom(v => v > 0).withMessage("Harga harus lebih dari 0"),
    body("stock")
        .optional()
        .isNumeric().withMessage("Stok harus angka")
        .custom(v => v >= 0).withMessage("Stok tidak boleh negatif")
];
export const createProductValidation = [
    body("name")
        .trim()
        .notEmpty().withMessage("Nama produk wajib diisi")
        .isLength({ min: 3 }).withMessage("Nama produk minimal 3 karakter"),
    body("description")
        .trim()
        .optional()
        .isLength({ min: 10 }).withMessage("Deskripsi minimal 10 karakter jika diisi"),
    body("price")
        .notEmpty().withMessage("Harga wajib diisi")
        .isNumeric().withMessage("Harga harus angka")
        .custom((value) => value > 0).withMessage("Harga harus lebih dari 0"),
    body("stock")
        .notEmpty().withMessage("Stok wajib diisi")
        .isNumeric().withMessage("Stok harus angka")
        .custom((value) => value >= 0).withMessage("Stok tidak boleh negatif"),
    body("categoryId")
        .notEmpty()
        .isUUID()
];
export const getProductByIdValidation = [
    param("id")
        .isUUID().withMessage("ID harus UUID valid")
];
//# sourceMappingURL=product.validation.js.map
