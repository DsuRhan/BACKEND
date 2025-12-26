import { asyncHandler } from "../utils/async.handler.js";
import { successResponse } from "../utils/response.js";
import { RegisterService, LoginService } from "../services/auth.service.js";
export class AuthController {
    registerSvc;
    loginSvc;
    constructor(registerSvc, loginSvc) {
        this.registerSvc = registerSvc;
        this.loginSvc = loginSvc;
    }
    register = asyncHandler(async (req, res) => {
        try {
            const user = await this.registerSvc.execute(req.body);
            return successResponse(res, "Register berhasil", user, null, 201);
        }
        catch (err) {
            return res.status(400).json({
                success: false,
                message: err.message || "Register gagal"
            });
        }
    });
    login = asyncHandler(async (req, res) => {
        try {
            const result = await this.loginSvc.execute(req.body);
            return successResponse(res, "Login berhasil", result);
        }
        catch (err) {
            return res.status(400).json({
                success: false,
                message: err.message || "Login gagal"
            });
        }
    });
}
//# sourceMappingURL=auth.controller.js.map
