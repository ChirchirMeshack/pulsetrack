import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Helper functions for common Supabase operations
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

  if (error) {
    console.error("Error fetching user profile:", error)
    return null
  }

  return data
}

export async function getAppointments(userId: string, role: "patient" | "doctor") {
  const column = role === "patient" ? "patient_id" : "doctor_id"

  const { data, error } = await supabase
    .from("appointments")
    .select("*, patients:patient_id(*), doctors:doctor_id(*)")
    .eq(column, userId)
    .order("datetime", { ascending: true })

  if (error) {
    console.error("Error fetching appointments:", error)
    return []
  }

  return data
}

export async function createAppointment(appointmentData: any) {
  const { data, error } = await supabase.from("appointments").insert(appointmentData).select().single()

  if (error) {
    console.error("Error creating appointment:", error)
    throw error
  }

  return data
}
