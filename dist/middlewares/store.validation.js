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
export const createStoreValidation = [
    body("name")
        .trim()
        .notEmpty().withMessage("Nama store wajib diisi")
        .isLength({ min: 3 }).withMessage("Nama store minimal 3 karakter"),
    body("description")
        .trim()
        .optional()
        .isLength({ min: 10 }).withMessage("Deskripsi minimal 10 karakter jika diisi")
];
export const getStoreByIdValidation = [
    param("id")
        .isUUID().withMessage("ID harus UUID valid")
];
//# sourceMappingURL=store.validation.js.map
