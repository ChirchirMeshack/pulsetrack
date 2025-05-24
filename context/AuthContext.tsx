"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { Session, User } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

interface UserData {
  firstName: string
  lastName: string
  role: string
  phone?: string
  preferredLanguage?: string
}

interface ProfileUpdateData {
  email?: string
  password?: string
  firstName?: string
  lastName?: string
  phone?: string
  preferredLanguage?: string
}

/**
 * Type definition for the authentication context.
 * This interface defines all the properties and methods that will be available
 * through the auth context to any component that consumes it.
 */
type AuthContextType = {
  user: User | null                    // Current authenticated user
  session: Session | null              // Current active session
  isLoading: boolean                   // Loading state for auth operations
  signIn: (email: string, password: string) => Promise<void>           // Sign in method
  signUp: (email: string, password: string, userData: UserData) => Promise<void>  // Sign up method
  signOut: () => Promise<void>         // Sign out method
  resetPassword: (email: string) => Promise<void>  // Password reset method
  updateProfile: (data: ProfileUpdateData) => Promise<void>      // Profile update method
}

// Create the authentication context with undefined as initial value
const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * AuthProvider component that wraps the application and provides authentication context.
 * This component manages the authentication state and provides methods for auth operations.
 * 
 * @param children - React nodes that will have access to the auth context
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // State management for user, session, and loading status
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  /**
   * Effect hook to initialize and manage authentication state.
   * This runs on component mount and handles:
   * 1. Initial session check
   * 2. Setting up auth state change listener
   * 3. Cleanup of subscription on unmount
   */
  useEffect(() => {
    const setData = async () => {
      if (!supabase) {
        console.error("Supabase client is not initialized")
        setIsLoading(false)
        return
      }

      // Get the current session
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()
      if (error) {
        console.error(error)
        setIsLoading(false)
        return
      }

      // Update state with session data
      setSession(session)
      setUser(session?.user ?? null)
      setIsLoading(false)
    }

    if (!supabase) {
      console.error("Supabase client is not initialized")
      setIsLoading(false)
      return
    }

    // Subscribe to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setIsLoading(false)
    })

    // Initialize data
    setData()

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  /**
   * Sign in method that authenticates a user with email and password.
   * Redirects to dashboard on successful authentication.
   * 
   * @param email - User's email address
   * @param password - User's password
   */
  const signIn = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      if (!supabase) {
        throw new Error("Supabase client is not initialized")
      }

      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      router.push("/dashboard")
    } catch (error) {
      console.error("Error signing in:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Sign up method that creates a new user account and associated profile.
   * Creates both auth user and profile record in the database.
   * 
   * @param email - User's email address
   * @param password - User's password
   * @param userData - Additional user information (name, role, etc.)
   */
  const signUp = async (email: string, password: string, userData: UserData) => {
    setIsLoading(true)
    try {
      if (!supabase) {
        throw new Error("Supabase client is not initialized")
      }

      // Create the auth user
      const {
        data: { user },
        error,
      } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
            role: userData.role,
          },
        },
      })

      if (error) throw error

      if (user) {
        // Create the user's profile record
        const { error: profileError } = await supabase.from("profiles").insert({
          id: user.id,
          email: email,
          first_name: userData.firstName,
          last_name: userData.lastName,
          role: userData.role,
          phone: userData.phone || null,
          preferred_language: userData.preferredLanguage || "en",
        })

        if (profileError) throw profileError
      }

      router.push("/login?message=Check your email to confirm your account")
    } catch (error) {
      console.error("Error signing up:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Sign out method that ends the current user session.
   * Redirects to home page after successful sign out.
   */
  const signOut = async () => {
    setIsLoading(true)
    try {
      if (!supabase) {
        throw new Error("Supabase client is not initialized")
      }
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Password reset method that initiates the password reset flow.
   * Sends a reset password email to the user.
   * 
   * @param email - User's email address
   */
  const resetPassword = async (email: string) => {
    setIsLoading(true)
    try {
      if (!supabase) {
        throw new Error("Supabase client is not initialized")
      }
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      if (error) throw error
    } catch (error) {
      console.error("Error resetting password:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Profile update method that updates both auth metadata and profile data.
   * Can update email, password, and other profile information.
   * 
   * @param data - Object containing the fields to update
   */
  const updateProfile = async (data: ProfileUpdateData) => {
    setIsLoading(true)
    try {
      if (!supabase) {
        throw new Error("Supabase client is not initialized")
      }
      if (!user) throw new Error("No user logged in")

      // Update auth metadata if email or password is being changed
      if (data.email || data.password) {
        const { error } = await supabase.auth.updateUser({
          email: data.email,
          password: data.password,
        })
        if (error) throw error
      }

      // Update profile data in the database
      const updates = {
        id: user.id,
        ...(data.firstName && { first_name: data.firstName }),
        ...(data.lastName && { last_name: data.lastName }),
        ...(data.phone && { phone: data.phone }),
        ...(data.preferredLanguage && { preferred_language: data.preferredLanguage }),
        updated_at: new Date().toISOString(),
      }

      const { error } = await supabase.from("profiles").update(updates).eq("id", user.id)

      if (error) throw error
    } catch (error) {
      console.error("Error updating profile:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Provide the auth context to children components
  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Custom hook to use the auth context.
 * This hook provides access to the auth context and its values.
 * Must be used within an AuthProvider component.
 * 
 * @returns The auth context
 * @throws Error if used outside of AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
