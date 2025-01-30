import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  res.headers.set("X-Frame-Options", "ALLOWALL"); // or SAMEORIGIN if only for your domain
  res.headers.set("Content-Security-Policy", "frame-ancestors *;");
  return res;
}

export const config = {
  matcher: "/embed-content", // Apply only to your embed page
};
