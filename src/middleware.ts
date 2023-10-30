import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  //   console.log(request.nextUrl);
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/login" || path === "/signup";

  const token = request.cookies.get("token")?.value || "";

  if (token && isPublicPath) {
    //redirect to path other then isPublicPath
    return NextResponse.redirect(new URL("/", request.nextUrl));
    // console.log("first");
  }

  if (!token && !isPublicPath) {
    //redirect to public path
    return NextResponse.redirect(new URL("/login", request.nextUrl));
    // console.log("second");
  }
}

export const config = {
  matcher: ["/signup", "/login", "/profile/:id*"],
};
