import { AuthRepository } from "../repositories/auth.repository.js";
export declare class RegisterService {
    private authRepo;
    constructor(authRepo: AuthRepository);
    execute(data: {
        username: string;
        email: string;
        password: string;
        role?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        username: string;
        email: string;
        role: string;
    }>;
}
export declare class LoginService {
    private authRepo;
    constructor(authRepo: AuthRepository);
    execute(data: {
        email: string;
        password: string;
    }): Promise<{
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            username: string;
            email: string;
            role: string;
        };
        token: string;
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map
