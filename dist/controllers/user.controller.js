import { asyncHandler } from "../utils/async.handler.js";
import { successResponse } from "../utils/response.js";
export class UserController {
    getAllSvc;
    getByIdSvc;
    updateSvc;
    deleteSvc;
    searchSvc;
    constructor(getAllSvc, getByIdSvc, updateSvc, deleteSvc, searchSvc) {
        this.getAllSvc = getAllSvc;
        this.getByIdSvc = getByIdSvc;
        this.updateSvc = updateSvc;
        this.deleteSvc = deleteSvc;
        this.searchSvc = searchSvc;
    }
    getAllUsers = asyncHandler(async (_, res) => {
        const users = await this.getAllSvc.execute();
        return successResponse(res, "Daftar user", users);
    });
    getUserById = asyncHandler(async (req, res) => {
        const user = await this.getByIdSvc.execute(req.params.id);
        return successResponse(res, "User ditemukan", user);
    });
    updateUser = asyncHandler(async (req, res) => {
        const user = await this.updateSvc.execute(req.params.id, req.body);
        return successResponse(res, "User berhasil diupdate", user);
    });
    deleteUser = asyncHandler(async (req, res) => {
        const user = await this.deleteSvc.execute(req.params.id);
        return successResponse(res, "User berhasil dihapus", user);
    });
    searchUsers = asyncHandler(async (req, res) => {
        const { name, email } = req.query;
        const users = await this.searchSvc.execute(name, email);
        return successResponse(res, "Hasil pencarian user", users);
    });
}
//# sourceMappingURL=user.controller.js.map
