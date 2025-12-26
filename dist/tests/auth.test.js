import request from "supertest";
import app from "../app.js";
import prisma from "../database.js";
describe("POST /api/auth/register", () => {
    it("should return 201 when provided valid data", async () => {
        const res = await request(app)
            .post("/api/auth/register")
            .send({
            username: "john_doe",
            email: "john.doe@example.com",
            password: "password123"
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty("id");
        expect(res.body.data).toHaveProperty("email", "john.doe@example.com");
        expect(res.body.data).not.toHaveProperty("password");
    });
    it("should fail if email already exists", async () => {
        const res = await request(app)
            .post("/api/auth/register")
            .send({
            username: "john_doe_2",
            email: "john.doe@example.com",
            password: "password123"
        });
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
    });
});
describe("POST /api/auth/login", () => {
    it("should return 200 and token when provided valid credentials", async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({
            email: "john.doe@example.com",
            password: "password123"
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty("token");
        expect(res.body.data).toHaveProperty("user");
        expect(res.body.data.user).toHaveProperty("email", "john.doe@example.com");
    });
    it("should fail when password is wrong", async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({
            email: "john.doe@example.com",
            password: "wrongpassword"
        });
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
    });
});
afterAll(async () => {
    await prisma.user.deleteMany({
        where: { email: "john.doe@example.com" }
    });
    await prisma.$disconnect();
});
//# sourceMappingURL=auth.test.js.map
