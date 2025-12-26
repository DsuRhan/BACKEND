// src/tests/product.test.ts
import request from "supertest";
import app from "../app";
import jwt from "jsonwebtoken";
import prisma from "../database";
import fs from "fs";
import path from "path";

const token = jwt.sign(
  { id: "11111111-1111-1111-1111-111111111111", role: "USER" },
  process.env.JWT_SECRET || "secret_kunci_rahasia"
);

describe("GET /api/products", () => {
  it("should return 401 if no token provided", async () => {
    const res = await request(app).get("/api/products");

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it("should return 200 and list of products", async () => {
    const res = await request(app)
      .get("/api/products")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("products");
    expect(Array.isArray(res.body.data.products)).toBe(true);
    expect(res.body.data).toHaveProperty("totalItems");
  });
});

describe("GET /api/products/:id", () => {
  let productId: string;

  beforeAll(async () => {
    const product = await prisma.product.create({
      data: {
        name: "Test Product",
        price: 10000,
        stock: 10,
        image: "test.jpg"
      }
    });
    productId = product.id;
  });

  it("should return 401 without token", async () => {
    const res = await request(app).get(`/api/products/${productId}`);

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it("should return product detail", async () => {
    const res = await request(app)
      .get(`/api/products/${productId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("id");
    expect(res.body.data.name).toBe("Test Product");
  });
});

describe("GET /api/products/stats", () => {
  it("should return 401 if no token provided", async () => {
    const res = await request(app).get("/api/products/stats");

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it("should return product statistics", async () => {
    const res = await request(app)
      .get("/api/products/stats")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("overview");
    expect(res.body.data).toHaveProperty("byCategory");
    expect(res.body.data).toHaveProperty("lowStock");
  });
});

describe("POST /api/products", () => {
  let categoryId: string;

  beforeAll(async () => {
    const uploadDir = path.join(process.cwd(), "public/uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
    const category = await prisma.category.upsert({
  where: { name: "Test Category" },
  update: {},
  create: { name: "Test Category" }
});

    categoryId = category.id;
  });

  it("should return 401 if no token provided", async () => {
    const res = await request(app).post("/api/products");

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it("should create product successfully", async () => {
    const res = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .field("name", "Produk Baru")
      .field("price", "50000")
      .field("stock", "5")
      .field("categoryId", categoryId)
      .attach(
  "image",
  Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=",
    "base64"
  ),
  { filename: "test.png", contentType: "image/png" }
);


    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("id");
  });
});

describe("PUT /api/products/:id", () => {
  let productId: string;

  beforeAll(async () => {
    const product = await prisma.product.create({
      data: {
        name: "Old Product",
        price: 10000,
        stock: 5,
        image: "old.jpg"
      }
    });
    productId = product.id;
  });

  it("should update product", async () => {
    const res = await request(app)
      .put(`/api/products/${productId}`)
      .set("Authorization", `Bearer ${token}`)
      .field("name", "Updated Product");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe("Updated Product");
  });
});

describe("DELETE /api/products/:id", () => {
  let productId: string;

  beforeAll(async () => {
    const product = await prisma.product.create({
      data: {
        name: "Delete Me",
        price: 10000,
        stock: 1,
        image: "delete.jpg"
      }
    });
    productId = product.id;
  });

  it("should soft delete product", async () => {
    const res = await request(app)
      .delete(`/api/products/${productId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
