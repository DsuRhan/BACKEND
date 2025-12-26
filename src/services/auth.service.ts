// src/services/auth.service.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthRepository } from "../repositories/auth.repository";

const JWT_SECRET = process.env.JWT_SECRET || "secret_kunci_rahasia";

export class RegisterService {
  constructor(private authRepo: AuthRepository) {}

  async execute(data: {
    username: string;
    email: string;
    password: string;
    role?: string;
  }) {
    const existing = await this.authRepo.findByEmail(data.email);
    if (existing) throw new Error("Email sudah terdaftar");

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.authRepo.create({
      username: data.username,
      email: data.email,
      password: hashedPassword,
      role: data.role || "USER",
    });

    const { password, ...safeUser } = user;
    return safeUser;
  }
}

export class LoginService {
  constructor(private authRepo: AuthRepository) {}

  async execute(data: { email: string; password: string }) {
    const user = await this.authRepo.findByEmail(data.email);
    if (!user) throw new Error("Email atau password salah");

    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) throw new Error("Email atau password salah");

    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const { password, ...safeUser } = user;
    return { user: safeUser, token };
  }
}
