import { initializeApp } from "firebase/app"
import { getMessaging, getToken, onMessage } from "firebase/messaging"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Cloud Messaging and get a reference to the service
let messaging: any = null

// We need to check if we're in the browser before initializing messaging
if (typeof window !== "undefined") {
  try {
    messaging = getMessaging(app)
  } catch (error) {
    console.error("Firebase messaging initialization error:", error)
  }
}

export async function requestNotificationPermission() {
  if (!messaging) return null

  try {
    const permission = await Notification.requestPermission()
    if (permission === "granted") {
      // Get the token
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      })
      return token
    }
    return null
  } catch (error) {
    console.error("Notification permission error:", error)
    return null
  }
}

export function onMessageListener() {
  if (!messaging) return () => {}

  return onMessage(messaging, (payload: any) => {
    console.log("Message received:", payload)
    // You can handle the message here or pass it to a callback
    return payload
  })
}

export { app }
