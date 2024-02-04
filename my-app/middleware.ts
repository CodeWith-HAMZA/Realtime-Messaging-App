import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// const isAuthenticated = true

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")

  const isAuthenticated = !!token

  if (!isAuthenticated) {
    console.log("behn chood pehly login karly")

    return NextResponse.redirect(new URL("/login", request.url).toString())
  }
  else {
    console.log("chal chal aagy chal, tu paass he")
  }


}
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/chat/:path*',
}