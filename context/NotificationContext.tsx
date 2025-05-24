"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { requestNotificationPermission, onMessageListener } from "@/lib/firebase"
import { supabase } from "@/lib/supabase"

interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  read: boolean
  created_at: string
  type?: string
  data?: Record<string, unknown>
}

type NotificationContextType = {
  notificationPermission: string | null
  notificationToken: string | null
  notifications: Notification[]
  requestPermission: () => Promise<string | null>
  markAsRead: (notificationId: string) => Promise<void>
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notificationPermission, setNotificationPermission] = useState<string | null>(null)
  const [notificationToken, setNotificationToken] = useState<string | null>(null)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [userId, setUserId] = useState<string | null>(null)

  // Check if user is authenticated
  useEffect(() => {
    const checkUser = async () => {
      if (!supabase) {
        console.error("Supabase client is not initialized")
        return
      }

      const { data } = await supabase.auth.getSession()
      if (data.session?.user) {
        setUserId(data.session.user.id)
      }
    }

    checkUser()

    if (!supabase) {
      console.error("Supabase client is not initialized")
      return
    }

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUserId(session?.user?.id || null)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  // Request notification permission and get token
  const requestPermission = async () => {
    if (typeof window !== "undefined" && "Notification" in window) {
      try {
        const permission = await Notification.requestPermission()
        setNotificationPermission(permission)

        if (permission === "granted") {
          const token = await requestNotificationPermission()
          setNotificationToken(token)

          // Save token to user profile if authenticated
          if (userId && token && supabase) {
            await supabase.from("profiles").update({ notification_token: token }).eq("id", userId)
          }

          return token
        }
      } catch (error) {
        console.error("Error requesting notification permission:", error)
      }
    }
    return null
  }

  // Fetch notifications when user changes
  useEffect(() => {
    if (!userId || !supabase) return

    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching notifications:", error)
        return
      }

      setNotifications(data || [])
    }

    fetchNotifications()

    // Subscribe to new notifications
    const subscription = supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        (payload: { new: Notification }) => {
          setNotifications((prev) => [payload.new, ...prev])
        },
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [userId])

  // Listen for foreground messages
  useEffect(() => {
    const unsubscribe = onMessageListener()
    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe()
      }
    }
  }, [])

  // Mark notification as read
  const markAsRead = async (notificationId: string) => {
    if (!supabase) {
      console.error("Supabase client is not initialized")
      return
    }

    await supabase.from("notifications").update({ read: true }).eq("id", notificationId)

    setNotifications((prev) =>
      prev.map((notification) => (notification.id === notificationId ? { ...notification, read: true } : notification)),
    )
  }

  return (
    <NotificationContext.Provider
      value={{
        notificationPermission,
        notificationToken,
        notifications,
        requestPermission,
        markAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}
