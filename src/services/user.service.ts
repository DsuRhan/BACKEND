// src/services/user.service.ts
import { UserRepository } from "../repositories/user.repository";
import type { User } from "../generated/client";

/* =========================
   GET ALL USERS
========================= */
export class GetAllUsersService {
  constructor(private repo: UserRepository) {}

  async execute(): Promise<User[]> {
    return this.repo.findAll();
  }
}

/* =========================
   GET USER BY ID
========================= */
export class GetUserByIdService {
  constructor(private repo: UserRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.repo.findById(id);
    if (!user) throw new Error("User not found");
    return user;
  }
}

/* =========================
   UPDATE USER
========================= */
export class UpdateUserService {
  constructor(private repo: UserRepository) {}

  async execute(id: string, data: Partial<User>): Promise<User> {
    const user = await this.repo.findById(id);
    if (!user) throw new Error("User not found");

    // never allow password update here
    delete (data as any).password;

    return this.repo.update(id, data);
  }
}

/* =========================
   DELETE USER (SOFT)
========================= */
export class DeleteUserService {
  constructor(private repo: UserRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.repo.findById(id);
    if (!user) throw new Error("User not found");

    return this.repo.softDelete(id);
  }
}

/* =========================
   SEARCH USERS
========================= */
export class SearchUsersService {
  constructor(private repo: UserRepository) {}

  async execute(name?: string, email?: string): Promise<User[]> {
    if (name) return this.repo.searchByName(name);
    if (email) return this.repo.searchByEmail(email);
    return this.repo.findAll();
  }
}
