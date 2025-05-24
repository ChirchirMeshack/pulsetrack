import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/context/AuthContext"
import { NotificationProvider } from "@/context/NotificationContext"

/**
 * Inter font configuration from Google Fonts.
 * This font is used throughout the application for consistent typography.
 * Only loading the Latin subset for optimal performance.
 */
const inter = Inter({ subsets: ["latin"] })

/**
 * Application metadata configuration.
 * This object defines SEO-related metadata, social media cards,
 * and other important meta information for the application.
 */
export const metadata: Metadata = {
  // Default title and template for all pages
  title: {
    default: "PulseTrack - Healthcare Communication Platform",
    template: "%s | PulseTrack",
  },
  // Primary description for SEO and social sharing
  description:
    "Bridge the communication gap between doctors, patients, caregivers, and administrators. Improve appointment adherence and patient outcomes through automated, multi-channel reminders.",
  // SEO keywords for better search engine visibility
  keywords: [
    "healthcare communication",
    "patient engagement",
    "appointment reminders",
    "medical practice management",
    "HIPAA compliant",
    "patient portal",
    "healthcare automation",
    "medical reminders",
    "patient communication",
    "healthcare technology",
  ],
  // Author and creator information
  authors: [{ name: "PulseTrack Team" }],
  creator: "PulseTrack",
  publisher: "PulseTrack",
  // Disable automatic format detection for better control
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // Base URL for metadata
  metadataBase: new URL("https://pulsetrack.app"),
  // Canonical URL configuration
  alternates: {
    canonical: "/",
  },
  // OpenGraph metadata for social media sharing
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pulsetrack.app",
    title: "PulseTrack - Healthcare Communication Platform",
    description:
      "Bridge the communication gap between doctors, patients, caregivers, and administrators. Improve appointment adherence and patient outcomes through automated, multi-channel reminders.",
    siteName: "PulseTrack",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PulseTrack - Healthcare Communication Platform",
      },
    ],
  },
  // Twitter card metadata for Twitter sharing
  twitter: {
    card: "summary_large_image",
    title: "PulseTrack - Healthcare Communication Platform",
    description:
      "Bridge the communication gap between doctors, patients, caregivers, and administrators. Improve appointment adherence and patient outcomes through automated, multi-channel reminders.",
    images: ["/og-image.png"],
    creator: "@pulsetrack",
  },
  // Search engine crawling configuration
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Search engine verification codes
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
}

/**
 * Root layout component that wraps the entire application.
 * This component provides the base HTML structure and includes
 * necessary providers for theming, authentication, and notifications.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be rendered
 * @returns {JSX.Element} The root layout component
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      {/* 
        Head section with essential meta tags and links
        - Favicon configuration for different platforms
        - Web app manifest for PWA support
        - Theme color for browser UI
        - Viewport settings for responsive design
      */}
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#16a34a" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        {/* 
          Provider hierarchy:
          1. ThemeProvider: Handles light/dark mode and system preferences
          2. AuthProvider: Manages authentication state and user session
          3. NotificationProvider: Handles application notifications
          
          The providers are nested to ensure proper context availability
          throughout the application.
        */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <NotificationProvider>
              {/* 
                Main content wrapper with gradient background
                - Light mode: white to light green gradient
                - Dark mode: dark gray to slightly lighter gray gradient
              */}
              <div className="min-h-screen bg-gradient-to-b from-white to-green-50 dark:from-gray-900 dark:to-gray-800">
                {children}
              </div>
            </NotificationProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
