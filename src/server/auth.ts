import { createServerFn } from "@tanstack/react-start";
import { prisma } from "./db";
import { verifyPassword, signToken, verifyToken } from "../lib/auth";

// ── Session (reads cookie from request headers directly) ──────────────────────
export const getSession = createServerFn({ method: "GET" })
  .handler(async ({ request }) => {
    try {
      const cookieHeader = request.headers.get("cookie") ?? "";
      const match = cookieHeader.match(/(?:^|;\s*)auth_token=([^;]+)/);
      const token = match ? decodeURIComponent(match[1]) : null;
      if (!token) return null;

      const payload = verifyToken(token);
      if (!payload?.userId) return null;

      const user = await prisma.user.findUnique({
        where: { id: payload.userId },
        select: { id: true, email: true, role: true },
      });
      return user;
    } catch {
      return null;
    }
  });

// ── Login (returns token; client stores cookie) ───────────────────────────────
export const loginUser = createServerFn({ method: "POST" })
  .inputValidator((data: { email: string; password: string }) => data)
  .handler(async ({ data }) => {
    const { email, password } = data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Invalid email or password");

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) throw new Error("Invalid email or password");

    const token = signToken({ userId: user.id, role: user.role });

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      token, // client will set the cookie
    };
  });

// ── Logout (client clears cookie) ─────────────────────────────────────────────
export const logoutUser = createServerFn({ method: "POST" })
  .handler(async () => {
    return { success: true };
  });
