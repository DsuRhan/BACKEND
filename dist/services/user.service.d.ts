import { UserRepository } from "../repositories/user.repository.js";
import type { User } from "../generated/client.js";
export declare class GetAllUsersService {
    private repo;
    constructor(repo: UserRepository);
    execute(): Promise<User[]>;
}
export declare class GetUserByIdService {
    private repo;
    constructor(repo: UserRepository);
    execute(id: string): Promise<User>;
}
export declare class UpdateUserService {
    private repo;
    constructor(repo: UserRepository);
    execute(id: string, data: Partial<User>): Promise<User>;
}
export declare class DeleteUserService {
    private repo;
    constructor(repo: UserRepository);
    execute(id: string): Promise<User>;
}
export declare class SearchUsersService {
    private repo;
    constructor(repo: UserRepository);
    execute(name?: string, email?: string): Promise<User[]>;
}
//# sourceMappingURL=user.service.d.ts.map
