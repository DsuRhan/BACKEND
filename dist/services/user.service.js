// src/services/user.service.ts
import { UserRepository } from "../repositories/user.repository.js";
/* =========================
   GET ALL USERS
========================= */
export class GetAllUsersService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async execute() {
        return this.repo.findAll();
    }
}
/* =========================
   GET USER BY ID
========================= */
export class GetUserByIdService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async execute(id) {
        const user = await this.repo.findById(id);
        if (!user)
            throw new Error("User not found");
        return user;
    }
}
/* =========================
   UPDATE USER
========================= */
export class UpdateUserService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async execute(id, data) {
        const user = await this.repo.findById(id);
        if (!user)
            throw new Error("User not found");
        // never allow password update here
        delete data.password;
        return this.repo.update(id, data);
    }
}
/* =========================
   DELETE USER (SOFT)
========================= */
export class DeleteUserService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async execute(id) {
        const user = await this.repo.findById(id);
        if (!user)
            throw new Error("User not found");
        return this.repo.softDelete(id);
    }
}
/* =========================
   SEARCH USERS
========================= */
export class SearchUsersService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async execute(name, email) {
        if (name)
            return this.repo.searchByName(name);
        if (email)
            return this.repo.searchByEmail(email);
        return this.repo.findAll();
    }
}
//# sourceMappingURL=user.service.js.map
