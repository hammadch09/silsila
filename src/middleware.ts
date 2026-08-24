import { NextResponse, type NextRequest } from "next/server";

import { ADMIN_COOKIE, isValidToken } from "@/lib/admin-auth";

/**
 * Gate everything under /admin. Middleware rather than a check inside the page,
 * so a route added under /admin later is protected by default instead of
 * protected only if someone remembers.
 */
export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
  }

  if (await isValidToken(request.cookies.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.next();
  }

  const login = request.nextUrl.clone();
  login.pathname = "/admin/login";
  login.search = "";
  return NextResponse.redirect(login);
}

export const config = {
  matcher: "/admin/:path*",
};
