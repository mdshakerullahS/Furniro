import { NextResponse } from "next/server";

export async function proxy(req) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const checkoutProtected = pathname.startsWith("/checkout");
  const adminProtected = pathname.startsWith("/admin/dashboard");

  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("redirect", pathname);

  if ((checkoutProtected || adminProtected) && !token) {
    return NextResponse.redirect(loginUrl);
  }

  if (adminProtected) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-token`,
        {
          method: "GET",
          headers: { cookie: req.headers.get("cookie") || "" },
        }
      );

      const data = await res.json();

      if (!res.ok || data?.decoded?.role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    } catch (err) {
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout/:path*", "/admin/:path*"],
};
