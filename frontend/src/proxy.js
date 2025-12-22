import { NextResponse } from "next/server";

export async function proxy(req) {
  const { pathname } = req.nextUrl;

  const checkoutProtected = pathname.startsWith("/checkout");
  const adminProtected = pathname.startsWith("/admin");

  if (checkoutProtected || adminProtected) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-token`,
        {
          method: "GET",
          headers: {
            cookie: req.headers.get("cookie") || "",
          },
          credentials: "include",
        }
      );

      if (!res.ok) {
        const loginUrl = new URL("/login", req.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
      }

      const data = await res.json();

      if (adminProtected && data?.decoded?.role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    } catch (err) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout/:path*", "/admin/:path*"],
};
