//src/app.ts
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import productRoutes from "./routes/product.route.js";
import categoryRoutes from "./routes/category.route.js";
import storeRoutes from "./routes/store.route.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import transactionRoutes from "./routes/transaction.route.js";
import { errorHandler } from "./middlewares/error.handler.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./utils/swagger.js"; // Import config yang tadi dibuat
const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Route Dokumentasi
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Routes
app.get("/", (req, res) => {
    res.redirect("/api-docs");
    const waktu = Date.now();
    res.json({ message: `Halo pemilik API Key: ${req}! Hari 5 – MVC E-Commerce + Service`, waktu_proses: `${waktu}ms` });
});
app.use("/api", productRoutes);
app.use("/api", categoryRoutes);
app.use("/api", storeRoutes);
app.use("/api", userRoutes);
app.use("/api", authRoutes);
app.use("/api", transactionRoutes);
// Error handler harus di paling bawah!
// Middleware error handling dengan 4 parameter (`err, req, res, next`) harus selalu 
// diletakkan PALING AKHIR di antara semua middleware dan route lainnya. 
// Ini memastikan bahwa semua error dari route atau middleware sebelumnya 
// dapat ditangkap dan diproses secara terpusat.
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map
