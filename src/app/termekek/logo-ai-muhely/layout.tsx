import type { Metadata } from "next";
import { buildBreadcrumbSchema } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: "Logo AI Műhely | WebDude",
  description:
    "Egyedi arculattervezés és logo generálás Midjourney v6 Master promptokkal. Prémium vizuális identitás kialakítása. Egyedi árajánlat kérése.",
  alternates: {
    canonical: "https://webdude.hu/termekek/logo-ai-muhely",
  },
  openGraph: {
    title: "Logo AI Műhely | WebDude",
    description:
      "Egyedi arculattervezés és logo generálás Midjourney v6 Master promptokkal. Prémium vizuális identitás kialakítása. Egyedi árajánlat kérése.",
    url: "https://webdude.hu/termekek/logo-ai-muhely",
    siteName: "WebDude",
    images: [
      {
        url: "/og/webdude-og.jpg",
        width: 1200,
        height: 630,
        alt: "Logo AI Műhely",
      },
    ],
    locale: "hu_HU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Logo AI Műhely | WebDude",
    description:
      "Egyedi arculattervezés és logo generálás Midjourney v6 Master promptokkal. Prémium vizuális identitás kialakítása. Egyedi árajánlat kérése.",
    images: ["/og/webdude-og.jpg"],
  },
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Logo AI Műhely",
  description:
    "Professzionális AI logó tervező eszköz. Generálj egyedi logókat AI-vel, minimalistától a luxusig. Vektoros outputok, branding guideline-k és teljes identity rendszer.",
  image: "https://webdude.hu/og/webdude-og.jpg",
  brand: {
    "@type": "Brand",
    "@id": "https://webdude.hu/#organization",
    name: "WebDude",
  },
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    url: "https://webdude.hu/termekek/logo-ai-muhely",
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
  { name: "Logo AI Műhely", url: "/termekek/logo-ai-muhely" },
]);

export default function LogoAIMuhelyLayout({ children }: { children: React.ReactNode }) {
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
