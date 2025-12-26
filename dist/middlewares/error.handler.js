import { errorResponse } from "../utils/response.js";
import { NODE_ENV } from "../utils/env.js";
import { Prisma } from "../generated/client.js";
export const errorHandler = (err, _req, res, _next) => {
    console.error("ERROR:", err.message);
    const statusCode = err.message.includes("tidak ditemukan") ? 404 : 400;
    errorResponse(res, err.message || "Terjadi kesalahan server", statusCode, NODE_ENV === "development" ? { stack: err.stack } : null);
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
            return res.status(400).json({
                success: false,
                message: "Data sudah ada (Unique constraint violation)",
                field: err.meta?.target
            });
        }
        if (err.code === "P2025") {
            return res.status(404).json({
                success: false,
                message: "Data tidak ditemukan"
            });
        }
    }
    // Handle Error Validasi / Umum
    res.status(500).json({ success: false, message: err.message });
};
//# sourceMappingURL=error.handler.js.map
