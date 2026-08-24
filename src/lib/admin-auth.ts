/**
 * Admin auth, deliberately minimal: one shared password from the environment.
 *
 * There is one admin and there will be one admin for months, so a user table,
 * a session store and a password-reset flow would all be scaffolding around a
 * single secret. What this does need is to not be forgeable and to not sit in
 * a readable cookie — hence a SHA-256 of the password rather than the password
 * itself, and httpOnly.
 *
 * Replace this the moment a second person needs access, or the moment the
 * dashboard can do anything destructive.
 */

export const ADMIN_COOKIE = "silsila_admin";

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

/** Web Crypto rather than node:crypto — this has to run in middleware too. */
export async function sessionToken(password: string): Promise<string> {
  const data = new TextEncoder().encode(`silsila-admin:v1:${password}`);
  return toHex(await crypto.subtle.digest("SHA-256", data));
}

export function adminPassword(): string {
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    throw new Error(
      "ADMIN_PASSWORD is not set. Add it to .env — the admin pages cannot open without it.",
    );
  }

  return password;
}

/** Length-independent, non-short-circuiting compare. */
export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;

  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return mismatch === 0;
}

export async function isValidToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  return safeEqual(token, await sessionToken(adminPassword()));
}
