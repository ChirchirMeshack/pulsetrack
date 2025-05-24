/**
 * Authentication and Authorization Middleware
 * 
 * This middleware handles:
 * - Session validation
 * - Protected route access
 * - Role-based routing
 * - User redirection based on roles
 */

import { createClient } from "@supabase/ssr"
// import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/**
 * Middleware function that processes each request
 * @param req - The incoming request object
 * @returns NextResponse - The response to be sent
 */
export async function middleware(req: NextRequest) {
  // Create a new response object
  const res = NextResponse.next()
  
  // Initialize Supabase client for server-side rendering
  const supabase = createClient({ req, res })

  // Get the current session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Authentication Check
  if (!session) {
    // If no session exists, check if trying to access protected routes
    const url = req.nextUrl.pathname
    if (
      url.startsWith("/dashboard") ||
      url.startsWith("/patient") ||
      url.startsWith("/admin")
    ) {
      // Redirect unauthenticated users to login page
      return NextResponse.redirect(new URL("/login", req.url))
    }
    return res
  }

  // Role-based Access Control
  // Extract user role from session metadata
  const role = session.user?.user_metadata?.role
  const url = req.nextUrl.pathname

  // Role-based Routing Rules
  // Doctor Access Control
  if (role === "doctor" && url.startsWith("/patient")) {
    // Doctors cannot access patient routes
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  // Patient Access Control
  if (
    role === "patient" &&
    (url.startsWith("/dashboard") || url.startsWith("/admin"))
  ) {
    // Patients can only access patient routes
    return NextResponse.redirect(new URL("/patient", req.url))
  }

  // Caregiver Access Control
  if (
    role === "caregiver" &&
    (url.startsWith("/dashboard") || url.startsWith("/admin"))
  ) {
    // Caregivers can only access patient routes
    return NextResponse.redirect(new URL("/patient", req.url))
  }

  // Admin Access Control
  if (
    role === "admin" &&
    (url.startsWith("/dashboard") || url.startsWith("/patient"))
  ) {
    // Admins can only access admin routes
    return NextResponse.redirect(new URL("/admin", req.url))
  }

  // If no redirects are needed, proceed with the request
  return res
}

/**
 * Middleware Configuration
 * Specifies which routes should be processed by this middleware
 * Matches all routes under:
 * - /dashboard/*
 * - /patient/*
 * - /admin/*
 */
export const config = {
  matcher: ["/dashboard/:path*", "/patient/:path*", "/admin/:path*"],
}