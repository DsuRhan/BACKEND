// src/services/profile.service.ts
import { ProfileRepository } from "../repositories/profile.repository";

export class CreateProfileService {
  constructor(private repo: ProfileRepository) {}

  execute(userId: string, data: any) {
    return this.repo.create(userId, data);
  }
}

export class GetProfileService {
  constructor(private repo: ProfileRepository) {}

  execute(userId: string) {
    return this.repo.findByUserId(userId);
  }
}

export class UpdateProfileService {
  constructor(private repo: ProfileRepository) {}

  execute(userId: string, data: any) {
    return this.repo.update(userId, data);
  }
}

export class DeleteProfileService {
  constructor(private repo: ProfileRepository) {}

  execute(userId: string) {
    return this.repo.delete(userId);
  }
}
