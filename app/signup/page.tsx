"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

/**
 * SignupPage Component
 * 
 * A client-side rendered page that handles user registration.
 * Features:
 * - Multi-step form with validation
 * - Role-based registration
 * - Password confirmation
 * - Language preference selection
 * - Phone number (optional)
 * - Error handling and display
 * - Loading states
 */

export default function SignupPage() {
  // Form state management with all required fields
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    role: "",
    phone: "",
    preferredLanguage: "en", // Default language
  })
  const [error, setError] = useState<string | null>(null)
  const { signUp, isLoading } = useAuth()

  /**
   * Handles changes to text input fields
   * @param e - Change event from input elements
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  /**
   * Handles changes to select input fields
   * @param name - Field name to update
   * @param value - New value for the field
   */
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  /**
   * Handles form submission with validation
   * @param e - Form submission event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Form validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    if (!formData.role) {
      setError("Please select a role")
      return
    }

    try {
      await signUp(formData.email, formData.password, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: formData.role,
        phone: formData.phone,
        preferredLanguage: formData.preferredLanguage,
      })
      // Redirect is handled in the AuthContext
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Failed to sign up")
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
          <h2 className="mt-6 text-2xl font-bold tracking-tight">Create your account</h2>
        </div>

        {/* Error message display */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Registration form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Name fields in a two-column layout */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Email field */}
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            {/* Password fields */}
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            {/* Role selection */}
            <div>
              <Label htmlFor="role">I am a</Label>
              <Select value={formData.role} onValueChange={(value) => handleSelectChange("role", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="patient">Patient</SelectItem>
                  <SelectItem value="doctor">Doctor</SelectItem>
                  <SelectItem value="caregiver">Caregiver</SelectItem>
                  <SelectItem value="admin">Administrator</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Optional phone number field */}
            <div>
              <Label htmlFor="phone">Phone number (optional)</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            {/* Language preference selection */}
            <div>
              <Label htmlFor="preferredLanguage">Preferred language</Label>
              <Select
                value={formData.preferredLanguage}
                onValueChange={(value) => handleSelectChange("preferredLanguage", value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Swahili</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Submit button with loading state */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Sign up"
            )}
          </Button>

          {/* Sign in link for existing users */}
          <div className="text-center text-sm">
            <span className="text-gray-600 dark:text-gray-400">Already have an account? </span>
            <Link
              href="/login"
              className="font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300"
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
