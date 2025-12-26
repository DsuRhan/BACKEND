import { body } from "express-validator";
export const createProfileValidation = [
    body("name").notEmpty(),
    body("gender").isIn(["male", "female"]),
    body("address").notEmpty(),
    body("image").optional().isString(),
];
//# sourceMappingURL=profile.validation.js.map