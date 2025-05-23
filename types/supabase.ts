export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      appointments: {
        Row: {
          id: string
          doctor_id: string
          patient_id: string
          datetime: string
          status: "scheduled" | "confirmed" | "cancelled" | "completed"
          created_at: string
          updated_at: string
          notes: string | null
          reminder_channels: string[]
        }
        Insert: {
          id?: string
          doctor_id: string
          patient_id: string
          datetime: string
          status?: "scheduled" | "confirmed" | "cancelled" | "completed"
          created_at?: string
          updated_at?: string
          notes?: string | null
          reminder_channels?: string[]
        }
        Update: {
          id?: string
          doctor_id?: string
          patient_id?: string
          datetime?: string
          status?: "scheduled" | "confirmed" | "cancelled" | "completed"
          created_at?: string
          updated_at?: string
          notes?: string | null
          reminder_channels?: string[]
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          first_name: string
          last_name: string
          role: "patient" | "doctor" | "admin" | "caregiver"
          created_at: string
          updated_at: string
          phone: string | null
          preferred_language: string | null
        }
        Insert: {
          id: string
          email: string
          first_name: string
          last_name: string
          role: "patient" | "doctor" | "admin" | "caregiver"
          created_at?: string
          updated_at?: string
          phone?: string | null
          preferred_language?: string | null
        }
        Update: {
          id?: string
          email?: string
          first_name?: string
          last_name?: string
          role?: "patient" | "doctor" | "admin" | "caregiver"
          created_at?: string
          updated_at?: string
          phone?: string | null
          preferred_language?: string | null
        }
      }
      caregiver_patients: {
        Row: {
          id: string
          caregiver_id: string
          patient_id: string
          created_at: string
        }
        Insert: {
          id?: string
          caregiver_id: string
          patient_id: string
          created_at?: string
        }
        Update: {
          id?: string
          caregiver_id?: string
          patient_id?: string
          created_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          sender_id: string
          receiver_id: string
          content: string
          created_at: string
          read: boolean
          appointment_id: string | null
        }
        Insert: {
          id?: string
          sender_id: string
          receiver_id: string
          content: string
          created_at?: string
          read?: boolean
          appointment_id?: string | null
        }
        Update: {
          id?: string
          sender_id?: string
          receiver_id?: string
          content?: string
          created_at?: string
          read?: boolean
          appointment_id?: string | null
        }
      }
    }
  }
}
