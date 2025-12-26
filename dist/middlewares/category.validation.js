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
export const createCategoryValidation = [
    body("name")
        .trim()
        .notEmpty().withMessage("Nama kategori wajib diisi")
        .isLength({ min: 3 }).withMessage("Nama kategori minimal 3 karakter"),
    body("description")
        .trim()
        .optional()
        .isLength({ min: 10 }).withMessage("Deskripsi minimal 10 karakter jika diisi")
];
export const getCategoryByIdValidation = [
    param("id")
        .isNumeric().withMessage("ID harus angka")
];
//# sourceMappingURL=category.validation.js.map
