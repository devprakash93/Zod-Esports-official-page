import bcrypt from "bcryptjs";
import crypto from "node:crypto";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-zod-key-do-not-use-in-prod";

// ── Helpers ──────────────────────────────────────────────────────────────────
function base64url(input: string | Buffer): string {
  const buf = typeof input === "string" ? Buffer.from(input, "utf8") : input;
  return buf.toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

// ── Password ──────────────────────────────────────────────────────────────────
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// ── JWT (manual HS256 — no external dependency) ───────────────────────────────
export function signToken(payload: object): string {
  const header = base64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 86400; // 1 day
  const body = base64url(JSON.stringify({ ...payload, iat, exp }));
  const sig = base64url(
    crypto.createHmac("sha256", JWT_SECRET).update(`${header}.${body}`).digest()
  );
  return `${header}.${body}.${sig}`;
}

export function verifyToken(token: string): any {
  try {
    const [header, body, sig] = token.split(".");
    if (!header || !body || !sig) return null;
    // Verify signature
    const expected = base64url(
      crypto.createHmac("sha256", JWT_SECRET).update(`${header}.${body}`).digest()
    );
    if (sig !== expected) return null;
    // Decode payload
    const payload = JSON.parse(Buffer.from(body, "base64").toString("utf8"));
    // Check expiry
    if (payload.exp && Math.floor(Date.now() / 1000) > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}
