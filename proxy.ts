import { NextResponse, type NextRequest } from "next/server";

/**
 * Sends anyone who arrives on plain http:// to the https:// version of the
 * same page, keeping the path and any ?query intact.
 *
 * Most hosts already do this, but when the site sits behind Cloudflare or a
 * similar proxy the visitor's original protocol only reaches us in the
 * x-forwarded-proto header, and that is what this checks. Local development on
 * localhost is left alone, since it has no certificate and does not need one.
 */
const LOCAL_HOST = /^(localhost|127\.0\.0\.1|\[::1\]|0\.0\.0\.0)(:\d+)?$/;

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const protocol = request.headers.get("x-forwarded-proto")?.split(",")[0].trim().toLowerCase();

  if (protocol === "http" && host && !LOCAL_HOST.test(host) && !host.endsWith(".local")) {
    const url = new URL(request.nextUrl.pathname + request.nextUrl.search, `https://${host}`);
    url.port = "";
    // 308 keeps the request method, so a form post is not silently turned into a GET.
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  // Static files are always requested from the page that loaded them, which is
  // already https by then, so there is no need to check each one.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png).*)"],
};
