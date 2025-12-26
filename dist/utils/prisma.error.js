import { Prisma } from "#generated/client";
function isPrismaClientKnownRequestError(error) {
    return (error instanceof Error &&
        "code" in error &&
        "meta" in error &&
        typeof error.code === "string");
}
function isPrismaError(error) {
    return error instanceof Prisma.PrismaClientKnownRequestError;
}
export { isPrismaClientKnownRequestError, isPrismaError };
//# sourceMappingURL=prisma.error.js.map