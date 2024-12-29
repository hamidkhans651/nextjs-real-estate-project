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

  // Allow the request to continue
  return NextResponse.next();
}

// Apply this middleware to all routes inside the /dashboard folder
export const config = {
  matcher: "/dashboard/page.tsx", // Protect all routes under /dashboard
};
