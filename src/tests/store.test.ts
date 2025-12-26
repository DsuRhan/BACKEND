import request from "supertest";
import app from "../app";
import prisma from "../database";

let userId: string;
let storeId: string;

beforeAll(async () => {
  const user = await prisma.user.create({
    data: {
      username: "store_owner",
      email: "store.owner@test.com",
      password: "hashed_password"
    }
  });
  userId = user.id;
});

describe("GET /api/stores", () => {
  it("should return list of stores", async () => {
    const res = await request(app).get("/api/stores");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("stores");
    expect(Array.isArray(res.body.data.stores)).toBe(true);
  });
});

describe("POST /api/stores", () => {
  it("should create store", async () => {
    const res = await request(app)
      .post("/api/stores")
      .send({
        name: "My Store",
        description: "Best store ever",
        userId
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("id");

    storeId = res.body.data.id;
  });
});

describe("GET /api/stores/:id", () => {
  it("should return store detail", async () => {
    const res = await request(app).get(`/api/stores/${storeId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe("My Store");
  });
});

describe("PUT /api/stores/:id", () => {
  it("should update store", async () => {
    const res = await request(app)
      .put(`/api/stores/${storeId}`)
      .send({
        name: "Updated Store"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe("Updated Store");
  });
});

describe("DELETE /api/stores/:id", () => {
  it("should soft delete store", async () => {
    const res = await request(app).delete(`/api/stores/${storeId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});

afterAll(async () => {
  await prisma.store.deleteMany();
  await prisma.user.deleteMany({
    where: { email: "store.owner@test.com" }
  });
  await prisma.$disconnect();
});
