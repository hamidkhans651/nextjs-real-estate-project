import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/server/auth"; // Adjust this to the path where your `auth` function is defined

export async function middleware(req: NextRequest) {
  // Check the user session (auth function should return session info)
  const session = await auth();

  
  // If no session exists, redirect to login page
  if (!session) {
    const loginUrl = new URL("/login", req.url); // Adjust the login route if needed
    return NextResponse.redirect(loginUrl);
  }

  // Check if trying to access admin routes
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (session.user && 'role' in session.user && session.user.role !== "admin") {
      // Redirect non-admin users to home page
      const homeUrl = new URL("/", req.url);
      return NextResponse.redirect(homeUrl);
    }
  }

  // Check if trying to access user dashboard
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    // Allow access to user dashboard for all authenticated users
    return NextResponse.next();
  }

  // Allow the request to continue
  return NextResponse.next();
}

// Apply this middleware to all routes inside the /admin folder and /dashboard
export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
