import type { Metadata } from "next";
import { buildBreadcrumbSchema } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: "Tartalomtervező AI Műhely | WebDude",
  description:
    "Professzionális tartalomtervező eszköz AI-vel. Blog bejegyzések, social media tartalom, landing page szövegek és teljes tartalom kalendár generálása. SEO-optimalizált, konverzióra fókuszált. Egyedi árajánlat kérése.",
  alternates: {
    canonical: "https://webdude.hu/termekek/tartalomtervezo-ai-muhely",
  },
  openGraph: {
    title: "Tartalomtervező AI Műhely | WebDude",
    description:
      "Professzionális tartalomtervező eszköz AI-vel. Blog bejegyzések, social media tartalom, landing page szövegek és teljes tartalom kalendár generálása. SEO-optimalizált, konverzióra fókuszált. Egyedi árajánlat kérése.",
    url: "https://webdude.hu/termekek/tartalomtervezo-ai-muhely",
    siteName: "WebDude",
    images: [
      {
        url: "/og/webdude-og.jpg",
        width: 1200,
        height: 630,
        alt: "Tartalomtervező AI Műhely",
      },
    ],
    locale: "hu_HU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tartalomtervező AI Műhely | WebDude",
    description:
      "Professzionális tartalomtervező eszköz AI-vel. Blog bejegyzések, social media tartalom, landing page szövegek és teljes tartalom kalendár generálása. SEO-optimalizált, konverzióra fókuszált. Egyedi árajánlat kérése.",
    images: ["/og/webdude-og.jpg"],
  },
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Tartalomtervező AI Műhely",
  description:
    "Professzionális tartalomtervező eszköz AI-vel. Blog bejegyzések, social media tartalom, landing page szövegek és teljes tartalom kalendár generálása. SEO-optimalizált, konverzióra fókuszált.",
  image: "https://webdude.hu/og/webdude-og.jpg",
  brand: {
    "@type": "Brand",
    "@id": "https://webdude.hu/#organization",
    name: "WebDude",
  },
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    url: "https://webdude.hu/termekek/tartalomtervezo-ai-muhely",
    seller: {
      "@type": "Organization",
      "@id": "https://webdude.hu/#organization",
      name: "WebDude.hu",
    },
    description: "Egyedi árajánlat kérése",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "31",
  },
  founder: {
    "@type": "Person",
    "@id": "https://webdude.hu/#person",
    name: "Balog Norbert",
    description: "26 év grafikai tervezési és 16 év webfejlesztői tapasztalat",
  },
} as const;

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Főoldal", url: "/" },
  { name: "Termékek", url: "/termekek" },
  { name: "Tartalomtervező AI Műhely", url: "/termekek/tartalomtervezo-ai-muhely" },
]);

export default function TartalomtervezoAIMuhelLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />
      {children}
    </>
  );
}
