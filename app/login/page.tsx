"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

/**
 * LoginPage Component
 * 
 * A client-side rendered page that handles user authentication.
 * Features:
 * - Email and password authentication
 * - Error handling and display
 * - Loading states
 * - Password reset link
 * - Sign up redirection
 * - Success message display from URL parameters
 */
export default function LoginPage() {
  // Form state management
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  
  // Authentication context and URL parameters
  const { signIn, isLoading } = useAuth()
  const searchParams = useSearchParams()
  const message = searchParams.get("message") // Get success message from URL if present

  /**
   * Handles form submission for user authentication
   * @param e - Form event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      await signIn(email, password)
      // Redirect is handled in the AuthContext
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Failed to sign in")
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      {/* Main container with max width and spacing */}
      <div className="w-full max-w-md space-y-8">
        {/* Header section with logo and title */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            <span className="text-green-600 dark:text-green-400">Pulse</span>Track
          </h1>
          <h2 className="mt-6 text-2xl font-bold tracking-tight">Sign in to your account</h2>
        </div>

        {/* Success message alert (shown when redirected with message parameter) */}
        {message && (
          <Alert className="bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-800">
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {/* Error message alert (shown when authentication fails) */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Login form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            {/* Email input field */}
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>

            {/* Password input field with forgot password link */}
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          {/* Submit button with loading state */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>

          {/* Sign up link for new users */}
          <div className="text-center text-sm">
            <span className="text-gray-600 dark:text-gray-400">Don&apos;t have an account? </span>
            <Link
              href="/signup"
              className="font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
