"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { WaitlistStatus } from "@/generated/prisma/enums";
import {
  ADMIN_COOKIE,
  adminPassword,
  isValidToken,
  safeEqual,
  sessionToken,
} from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

const SESSION_DAYS = 30;

export async function logIn(_prev: string | null, formData: FormData) {
  const submitted = String(formData.get("password") ?? "");

  // Compare through the same constant-time path as the cookie check.
  if (!safeEqual(submitted, adminPassword())) {
    return "Wrong password.";
  }

  const store = await cookies();
  store.set(ADMIN_COOKIE, await sessionToken(adminPassword()), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * SESSION_DAYS,
  });

  redirect("/admin");
}

export async function logOut() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}

/** Server actions are not covered by the middleware matcher in every case, so
 *  this re-checks rather than assuming the caller came through a gated page. */
async function assertAdmin() {
  const store = await cookies();

  if (!(await isValidToken(store.get(ADMIN_COOKIE)?.value))) {
    throw new Error("Not authorised.");
  }
}

export async function setStatus(formData: FormData) {
  await assertAdmin();

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");

  if (!id || !(status in WaitlistStatus)) {
    throw new Error("Bad request.");
  }

  await prisma.waitlistEntry.update({
    where: { id },
    data: { status: status as WaitlistStatus },
  });

  revalidatePath("/admin");
}
