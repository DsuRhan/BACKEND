// src/services/profile.service.ts
import { ProfileRepository } from "../repositories/profile.repository.js";
export class CreateProfileService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    execute(userId, data) {
        return this.repo.create(userId, data);
    }
}
export class GetProfileService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    execute(userId) {
        return this.repo.findByUserId(userId);
    }
}
export class UpdateProfileService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    execute(userId, data) {
        return this.repo.update(userId, data);
    }
}
export class DeleteProfileService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    execute(userId) {
        return this.repo.delete(userId);
    }
}
//# sourceMappingURL=profile.service.js.map
