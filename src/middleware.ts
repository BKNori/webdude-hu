import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for static files, API routes, and admin routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots") ||
    pathname.startsWith("/sitemap") ||
    pathname.startsWith("/rss") ||
    pathname.startsWith("/og") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check if the pathname already has a language prefix
  const supportedLanguages = ["en"];
  const languagePrefix = supportedLanguages.find((lang) =>
    pathname.startsWith(`/${lang}`)
  );

  // If the pathname has a language prefix, let it pass
  if (languagePrefix) {
    return NextResponse.next();
  }

  // Default Hungarian routing - no redirect, just let it pass
  // Hungarian URLs stay as-is (no prefix)
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt (robots file)
     * - sitemap.xml (sitemap file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|rss).*)",
  ],
};