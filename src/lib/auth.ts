import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { APIRoute } from "astro";

export const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

export function createSessionToken(userId: string) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
}

export function verifySessionToken(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as any;
  } catch {
    return null;
  }
}

export async function getUserFromRequest(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  const match = cookie.match(/session=([^;]+)/);
  if (!match) return null;
  const payload = verifySessionToken(decodeURIComponent(match[1]));
  if (!payload) return null;
  return prisma.user.findUnique({ where: { id: payload.userId } });
}
