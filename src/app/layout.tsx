import React from "react";
import { Inter, Space_Grotesk } from "next/font/google";
import { MotionConfig } from "motion/react";
import PageWrapper from "../components/layout/PageWrapper";
import Script from "next/script";
import { getClarityScript } from "@/lib/clarity";
// import AuroraBackground removed for clean background

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["700"],
  preload: true,
});

export const metadata = {
  metadataBase: new URL("https://webdude.hu"),
  title:
    "WebDude | Full-Stack Webfejlesztés, AI Workflow & Agent Rendszerek — Kecskemét",
  description:
    "Full-stack webfejlesztés, AI workflow és agent rendszerek — egy kézből. 26 év tapasztalat, Next.js 16, React 19, Tailwind v4, Firebase alapú prémium megoldások.",
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || "",
  },
  openGraph: {
    siteName: "WebDude",
    type: "website",
    title: "WebDude | Full-Stack Webfejlesztés, AI Workflow & Agent Rendszerek",
    description:
      "Full-stack webfejlesztés, AI workflow és agent rendszerek — egy kézből. 26 év tapasztalat, Next.js 16, React 19, Tailwind v4, Firebase alapú prémium megoldások.",
    images: [{ url: "/og/webdude-og.jpg", width: 1200, height: 630 }],
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://webdude.hu/#organization",
    name: "WebDude",
    founder: {
      "@type": "Person",
      name: "Norbi",
      jobTitle: "Full-Stack Web Developer & AI Specialist",
    },
    serviceType: [
      "Web Development",
      "UI/UX Design",
      "AI Agent Development",
      "WordPress Development",
      "Grafikai Tervezés",
      "SEO Optimalizálás",
    ],
    areaServed: { "@type": "Country", name: "Hungary" },
    url: "https://webdude.hu",
    telephone: "+36 70 323 8003",
    email: "hello@webdude.hu",
    description:
      "Full-stack webfejlesztés, AI workflow és agent rendszerek — egy kézből. 26 év tapasztalat, Next.js 16, React 19, Tailwind v4, Firebase alapú prémium megoldások.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kecskemét",
      addressRegion: "Bács-Kiskun",
      addressCountry: "HU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 46.908,
      longitude: 19.693,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "16:00",
    },
    priceRange: "€€",
    logo: {
      "@type": "ImageObject",
      url: "https://webdude.hu/og/webdude-og.jpg",
      width: 1200,
      height: 630,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+36 70 323 8003",
      email: "hello@webdude.hu",
      contactType: "customer service",
      areaServed: "HU",
      availableLanguage: "Hungarian",
    },
    sameAs: [
      "https://www.facebook.com/webdude.hu",
      "https://www.linkedin.com/company/webdude",
      "https://twitter.com/webdude_hu",
    ],
  };

  return (
    <MotionConfig reducedMotion="user">
      <html
        lang="hu"
        data-scroll-behavior="smooth"
        className="overflow-x-hidden"
      >
        <head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
          {/* Preconnect for performance */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            rel="preconnect"
            href="https://firebasestorage.googleapis.com"
          />
          <Script
            id="json-ld"
            type="application/ld+json"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
            }}
          />
          {process.env.NODE_ENV === "production" &&
            process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID && (
              <Script
                id="clarity"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: getClarityScript(
                    process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID
                  ),
                }}
              />
            )}
        </head>
        <body
          className={`${inter.className} ${spaceGrotesk.className} antialiased min-h-screen max-w-[100vw] relative bg-transparent overflow-x-hidden touch-action-pan-y`}
        >
          {/* Skip link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-amber-500 focus:text-bg-base focus:px-4 focus:py-2 focus:rounded-md"
          >
            Ugrás a fő tartalomra
          </a>

          {/* Globális CSS Háttérréteg */}
          <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
            <div className="absolute top-[-10%] left-[15%] w-150 h-150 rounded-full bg-amber-500/15 blur-[140px] bg-ambient-glow-1" />
            <div className="absolute top-[40%] right-[10%] w-125 h-125 rounded-full bg-yellow-600/10 blur-[150px] bg-ambient-glow-2" />
            <div className="absolute bottom-[-10%] left-[20%] w-[162.5] h-[162.5] rounded-full bg-amber-600/10 blur-[160px] bg-ambient-glow-1" />
            <div className="absolute inset-0 bg-mesh-grid opacity-60" />
          </div>

          {/* Fő tartalom réteg */}
          <PageWrapper>{children}</PageWrapper>
        </body>
      </html>
    </MotionConfig>
  );
}
