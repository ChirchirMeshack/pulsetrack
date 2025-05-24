import Script from "next/script"

export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "PulseTrack",
    description:
      "Healthcare communication platform that bridges the gap between doctors, patients, caregivers, and administrators through automated, multi-channel reminders.",
    url: "https://pulsetrack.app",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free trial available",
    },
    provider: {
      "@type": "Organization",
      name: "PulseTrack",
      url: "https://pulsetrack.app",
    },
    featureList: [
      "Automated appointment reminders",
      "Multi-channel communication (SMS, Email, WhatsApp)",
      "Family access portal",
      "HIPAA compliant security",
      "Real-time analytics",
      "Patient engagement tracking",
    ],
    screenshot: "https://pulsetrack.app/screenshot.png",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "150",
    },
  }

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}
