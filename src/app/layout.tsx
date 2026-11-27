import { Bebas_Neue, Plus_Jakarta_Sans } from "next/font/google";
import { MotionConfig } from "motion/react";
import PageWrapper from "../components/layout/PageWrapper";
import Script from "next/script";
import { getClarityScript } from "@/lib/clarity";
import {
  buildGaConsentInitScript,
  isValidGaMeasurementId,
} from "@/lib/analytics";
import { getDictionary, pickGlobalDictionary } from "@/lib/dictionary";
import {
  CANONICAL_LOCALBUSINESS_ENTITY,
  serializeJsonLd,
} from "@/lib/structuredData";

import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-bebas",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-jakarta",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const metadata = {
  metadataBase: new URL("https://webdude.hu"),
  title: "WebDude | Full-Stack Webfejlesztés, AI Workflow & Agent Rendszerek",
  description:
    "Full-stack webfejlesztés, AI workflow és agent rendszerek — egy kézből. 26 év grafikai és 16 év webfejlesztői rutin, országos online szolgáltatással.",
  alternates: {
    types: {
      "application/rss+xml": [
        {
          url: "https://webdude.hu/feed.xml",
          title: "WebDude Blog RSS Feed",
        },
      ],
    },
  },
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
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || "",
  },
  openGraph: {
    siteName: "WebDude",
    type: "website",
    title: "WebDude | Full-Stack Webfejlesztés, AI Workflow & Agent Rendszerek",
    description:
      "Full-stack webfejlesztés, AI workflow és agent rendszerek — egy kézből. 26 év grafikai és 16 év webfejlesztői rutin, országos online szolgáltatással.",
    images: [{ url: "/og/webdude-og.jpg", width: 1200, height: 630 }],
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const [huDict, enDict] = await Promise.all([
    getDictionary("hu"),
    getDictionary("en"),
  ]);
  const globalDictionaries = {
    hu: pickGlobalDictionary(huDict),
    en: pickGlobalDictionary(enDict),
  };
  const gaMeasurementId = isValidGaMeasurementId(
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  )
    ? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID.trim()
    : null;

  return (
    <MotionConfig reducedMotion="user">
      <html
        lang="hu"
        data-theme="light"
        suppressHydrationWarning
        data-scroll-behavior="smooth"
        className="overflow-x-hidden"
      >
        <head>
          <script
            id="webdude-theme-init"
            dangerouslySetInnerHTML={{
              __html: `(function(){try{var s=localStorage.getItem('webdude-theme');var t=s==='dark'?'dark':'light';document.documentElement.setAttribute('data-theme',t);document.documentElement.style.colorScheme=t;}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`,
            }}
          />
          <link
            rel="alternate"
            type="application/rss+xml"
            title="WebDude Blog RSS Feed"
            href="https://webdude.hu/feed.xml"
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: serializeJsonLd(CANONICAL_LOCALBUSINESS_ENTITY),
            }}
          />
          {gaMeasurementId && (
            <>
              <Script
                id="ga4-config"
                data-ga="true"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: buildGaConsentInitScript(gaMeasurementId),
                }}
              />
              <Script
                id="ga4-gtag"
                src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
                strategy="afterInteractive"
              />
            </>
          )}
          {process.env.NODE_ENV === "production" &&
            process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID && (
              <Script
                id="clarity"
                strategy="lazyOnload"
                dangerouslySetInnerHTML={{
                  __html: getClarityScript(
                    process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID
                  ),
                }}
              />
            )}
        </head>
        <body
          className={`${bebasNeue.variable} ${plusJakartaSans.variable} antialiased min-h-screen max-w-[100vw] relative bg-transparent overflow-x-hidden touch-action-pan-y`}
        >
          {/* Skip link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-[#00B5F1] focus:text-bg-base focus:px-4 focus:py-2 focus:rounded-md"
          >
            Ugrás a fő tartalomra
          </a>

          {/* Globális CSS Háttérréteg */}
          <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden opacity-35 dark:opacity-100">
            <div className="absolute top-[-10%] left-[15%] w-150 h-150 rounded-full bg-[#00B5F1]/15 blur-[140px] bg-ambient-glow-1" />
            <div className="absolute top-[40%] right-[10%] w-125 h-125 rounded-full bg-[#00B5F1]/10 blur-[150px] bg-ambient-glow-2" />
            <div className="absolute bottom-[-10%] left-[20%] w-[162.5] h-[162.5] rounded-full bg-[#00B5F1]/10 blur-[160px] bg-ambient-glow-1" />
            <div className="absolute inset-0 bg-mesh-grid opacity-60" />
          </div>

          {/* Fő tartalom réteg */}
          <PageWrapper dictionaries={globalDictionaries}>{children}</PageWrapper>
        </body>
      </html>
    </MotionConfig>
  );
}
