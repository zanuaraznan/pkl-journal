import NextAuth from "next-auth";
import authConfig from "../auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  if (!isLoggedIn && !["/login", "/register"].includes(nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  if (isLoggedIn && ["/login", "/register"].includes(nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$).*)"],
};
