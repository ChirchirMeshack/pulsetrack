import Link from "next/link"
import { ArrowRight, Calendar, MessageSquare, Users, Shield, Clock, Heart, CheckCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StructuredData } from "@/components/structured-data"

/**
 * Home page component for PulseTrack landing page.
 * This is the main landing page that showcases the product features,
 * benefits, and call-to-action sections.
 */
export default function Home() {
  // Check if required environment variables are missing
  const isMissingEnvVars =
    typeof window !== "undefined" &&
    (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

  return (
    <main className="flex min-h-screen flex-col">
      {/* SEO structured data component */}
      <StructuredData />

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          {/* Logo and Brand Name */}
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Heart className="h-6 w-6 text-green-600" />
              <span className="font-bold text-xl">
                <span className="text-green-600">Pulse</span>Track
              </span>
            </Link>
          </div>

          {/* Navigation Links and Auth Buttons */}
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="#features" className="transition-colors hover:text-green-600">
                Features
              </Link>
              <Link href="#how-it-works" className="transition-colors hover:text-green-600">
                How It Works
              </Link>
              <Link href="#pricing" className="transition-colors hover:text-green-600">
                Pricing
              </Link>
            </nav>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Environment Variables Warning Alert */}
      {isMissingEnvVars && (
        <div className="container py-4">
          <Alert variant="destructive">
            <AlertTitle>Missing Environment Variables</AlertTitle>
            <AlertDescription>
              Supabase URL and/or Anon Key are missing. Please check your environment variables.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Hero Section - Main Value Proposition */}
      <section className="container flex flex-col items-center justify-center space-y-4 py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Hero Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative rounded-full p-4 bg-green-100 dark:bg-green-900">
              <div className="h-16 w-16 rounded-full bg-green-500 flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          {/* Hero Title and Description */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Healthcare Communication
            <span className="block text-green-600 dark:text-green-400">Made Simple</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-3xl mx-auto">
            Bridge the communication gap between doctors, patients, caregivers, and administrators. Improve appointment
            adherence and patient outcomes through automated, multi-channel reminders.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link href="/signup">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
              <Link href="#demo">Watch Demo</Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
              Free 30-day trial
            </div>
            <div className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
              No credit card required
            </div>
            <div className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
              HIPAA compliant
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Product Capabilities */}
      <section id="features" className="container py-24 bg-muted/50">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to improve patient engagement
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Comprehensive tools designed for healthcare providers to enhance communication and reduce no-shows.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="mx-auto mt-16 max-w-6xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Individual Feature Cards */}
            <Card>
              <CardHeader>
                <Calendar className="h-10 w-10 text-green-600" />
                <CardTitle>Smart Appointment Reminders</CardTitle>
                <CardDescription>
                  Automated reminders via SMS, email, and WhatsApp to reduce no-shows by up to 40%.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <MessageSquare className="h-10 w-10 text-green-600" />
                <CardTitle>Multi-Channel Communication</CardTitle>
                <CardDescription>
                  Reach patients through their preferred communication channels with personalized messages.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-green-600" />
                <CardTitle>Family Access Portal</CardTitle>
                <CardDescription>
                  Allow family members and caregivers to manage appointments and receive updates.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-green-600" />
                <CardTitle>HIPAA Compliant</CardTitle>
                <CardDescription>
                  Enterprise-grade security ensuring all patient data is protected and compliant.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="h-10 w-10 text-green-600" />
                <CardTitle>Real-time Analytics</CardTitle>
                <CardDescription>
                  Track engagement metrics, appointment adherence, and communication effectiveness.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Heart className="h-10 w-10 text-green-600" />
                <CardTitle>Patient-Centered Care</CardTitle>
                <CardDescription>
                  Improve patient satisfaction and outcomes through better communication and engagement.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section - Implementation Steps */}
      <section id="how-it-works" className="container py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How PulseTrack Works</h2>
          <p className="mt-4 text-lg text-muted-foreground">Simple setup, powerful results. Get started in minutes.</p>
        </div>

        {/* Implementation Steps Grid */}
        <div className="mx-auto mt-16 max-w-6xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-xl font-semibold">Connect Your System</h3>
              <p className="mt-2 text-muted-foreground">
                Integrate with your existing EHR or practice management system in minutes.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold">Configure Reminders</h3>
              <p className="mt-2 text-muted-foreground">
                Set up automated reminder schedules and customize messages for your practice.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-semibold">Watch Engagement Soar</h3>
              <p className="mt-2 text-muted-foreground">
                Monitor improved appointment adherence and patient satisfaction in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call-to-Action Section */}
      <section className="container py-24 bg-green-50 dark:bg-green-950">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to transform your patient communication?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of healthcare providers who trust PulseTrack to improve patient engagement.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/signup">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="border-t bg-background">
        <div className="container py-12">
          {/* Footer Grid Layout */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Company Info */}
            <div>
              <Link href="/" className="flex items-center space-x-2">
                <Heart className="h-6 w-6 text-green-600" />
                <span className="font-bold text-xl">
                  <span className="text-green-600">Pulse</span>Track
                </span>
              </Link>
              <p className="mt-4 text-sm text-muted-foreground">
                Bridging the communication gap in healthcare through intelligent automation.
              </p>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="font-semibold">Product</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#features" className="hover:text-green-600">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-green-600">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#demo" className="hover:text-green-600">
                    Demo
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-semibold">Company</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-green-600">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-green-600">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-green-600">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-green-600">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="font-semibold">Support</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/help" className="hover:text-green-600">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="hover:text-green-600">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/status" className="hover:text-green-600">
                    Status
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright Notice */}
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 PulseTrack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
