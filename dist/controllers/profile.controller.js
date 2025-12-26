import { asyncHandler } from "../utils/async.handler.js";
export class ProfileController {
    createSvc;
    getSvc;
    updateSvc;
    deleteSvc;
    constructor(createSvc, getSvc, updateSvc, deleteSvc) {
        this.createSvc = createSvc;
        this.getSvc = getSvc;
        this.updateSvc = updateSvc;
        this.deleteSvc = deleteSvc;
    }
    store = asyncHandler(async (req, res) => {
        const profile = await this.createSvc.execute(req.user.id, req.body);
        res.status(201).json(profile);
    });
    show = asyncHandler(async (req, res) => {
        const profile = await this.getSvc.execute(req.user.id);
        res.json(profile);
    });
    update = asyncHandler(async (req, res) => {
        const profile = await this.updateSvc.execute(req.user.id, req.body);
        res.json(profile);
    });
    destroy = asyncHandler(async (req, res) => {
        await this.deleteSvc.execute(req.user.id);
        res.status(204).send();
    });
}
//# sourceMappingURL=profile.controller.js.map
