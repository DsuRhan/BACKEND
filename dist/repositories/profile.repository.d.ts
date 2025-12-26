export declare class ProfileRepository {
    create(userId: string, data: any): import("../generated/models").Prisma__ProfileClient<{
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
    findByUserId(userId: string): import("../generated/models").Prisma__ProfileClient<{
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
    update(userId: string, data: any): import("../generated/models").Prisma__ProfileClient<{
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
    delete(userId: string): import("../generated/models").Prisma__ProfileClient<{
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
//# sourceMappingURL=profile.repository.d.ts.map
