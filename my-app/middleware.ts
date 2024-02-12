import { NextConfig } from 'next'
import { MiddlewareMatcher } from 'next/dist/build/analysis/get-page-static-info'
import { Middleware } from 'next/dist/lib/load-custom-routes'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import UserService from './services/userServices'
import axios from 'axios'
const authRoutes = ['/auth/login', '/auth/', '/login', '/register', '/auth/register']; // Define your protected routes


const protectedRoutes = ["/settings"]; // Define the protected routes

export default async function middleware(req: NextRequest) {
  const res = await fetch("http://localhost:4000/api/user/check-auth", { headers: { token: req.cookies.get("Authorization")?.value } });

  const isAuthenticated = res.ok
 

  if (!isAuthenticated) {

    // Redirect to login page if not authenticated and accessing a protected route
    return NextResponse.redirect(new URL("/auth/login", req.url).toString())

  } else if (authRoutes.includes(req.nextUrl.pathname)) {

    // return NextResponse.redirect(new URL("/chat", req.url).toString())
  }
  // Continue with the request if authenticated or not accessing a protected route
  return NextResponse.next();
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/chat/:path*', '/']
}