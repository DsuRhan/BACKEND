import { ProfileRepository } from "../repositories/profile.repository.js";
export declare class CreateProfileService {
    private repo;
    constructor(repo: ProfileRepository);
    execute(userId: string, data: any): import("../generated/models").Prisma__ProfileClient<{
        id: string;
        name: string;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        gender: string;
        address: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
}
export declare class GetProfileService {
    private repo;
    constructor(repo: ProfileRepository);
    execute(userId: string): import("../generated/models").Prisma__ProfileClient<{
        id: string;
        name: string;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        gender: string;
        address: string;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
}
export declare class UpdateProfileService {
    private repo;
    constructor(repo: ProfileRepository);
    execute(userId: string, data: any): import("../generated/models").Prisma__ProfileClient<{
        id: string;
        name: string;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        gender: string;
        address: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
}
export declare class DeleteProfileService {
    private repo;
    constructor(repo: ProfileRepository);
    execute(userId: string): import("../generated/models").Prisma__ProfileClient<{
        id: string;
        name: string;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        gender: string;
        address: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
}
//# sourceMappingURL=profile.service.d.ts.map
