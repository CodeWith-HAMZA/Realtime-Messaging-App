import { NextConfig } from "next";
import { MiddlewareMatcher } from "next/dist/build/analysis/get-page-static-info";
import { Middleware } from "next/dist/lib/load-custom-routes";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import UserService from "./services/userServices";
import axios from "axios";
const authRoutes = [
  "/auth/login",
  "/auth/",
  "/login",
  "/register",
  "/auth/register",
]; // Define your protected routes

const protectedRoutes = ["/chat/:path*", "/"];

export default async function middleware(req: NextRequest) {
  try {
    const res = await fetch("http://localhost:4000/api/user/check-auth", {
      headers: { token: req.cookies?.get("Authorization")?.value },
    });

    const isAuthenticated = res.ok;
    console.log(
      await res.json(),
      req.cookies?.get("Authorization")?.value,
      "isauth"
    );

    if (!isAuthenticated) {
      // Redirect to login page if not authenticated and accessing a protected route
      return NextResponse.redirect(new URL("/auth/login", req.url).toString());
    } else if (authRoutes.includes(req.nextUrl.pathname)) {
      // return NextResponse.redirect(new URL("/chat", req.url).toString())
    }
    // Continue with the request if authenticated or not accessing a protected route
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login/tehauste", req.url).toString());
    
  }
}
// See "Matching Paths" below to learn more, run the middleware- when hitting /chat
export const config = {
  matcher: [...protectedRoutes],
};
