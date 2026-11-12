import type { Metadata } from "next";
import { buildBreadcrumbSchema } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: "SEO & AEO Audit Pro | WebDude",
  description:
    "SEO & AEO Audit Pro: A 26 éves tapasztalat erejével a találati listák élén. 95+ Lighthouse score alapú technikai alapok, 16 év WordPress & WooCommerce CMS szakértelem. Egyedi árajánlat kérése.",
  alternates: {
    canonical: "https://webdude.hu/termekek/seo-audit-pro",
  },
  openGraph: {
    title: "SEO & AEO Audit Pro | WebDude",
    description:
      "SEO & AEO Audit Pro: A 26 éves tapasztalat erejével a találati listák élén. 95+ Lighthouse score alapú technikai alapok, 16 év WordPress & WooCommerce CMS szakértelem. Egydi árajánlat kérése.",
    url: "https://webdude.hu/termekek/seo-audit-pro",
    siteName: "WebDude",
    images: [
      {
        url: "/og/webdude-og.jpg",
        width: 1200,
        height: 630,
        alt: "SEO & AEO Audit Pro",
      },
    ],
    locale: "hu_HU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO & AEO Audit Pro | WebDude",
    description:
      "SEO & AEO Audit Pro: A 26 éves tapasztalat erejével a találati listák élén. 95+ Lighthouse score alapú technikai alapok, 16 év WordPress & WooCommerce CMS szakértelem. Egydi árajánlat kérése.",
    images: ["/og/webdude-og.jpg"],
  },
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "SEO & AEO Audit Pro",
  description:
    "SEO & AEO Audit Pro: A 26 éves tapasztalat erejével a találati listák élén. 95+ Lighthouse score alapú technikai alapok, 16év WordPress & WooCommerce CMS szakértelem.",
  image: "https://webdude.hu/og/webdude-og.jpg",
  brand: {
    "@type": "Brand",
    "@id": "https://webdude.hu/#organization",
    name: "WebDude",
  },
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    url: "https://webdude.hu/termekek/seo-audit-pro",
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
  { name: "SEO & AEO Audit Pro", url: "/termekek/seo-audit-pro" },
] as const);

export default function SEOAuditAIMuhelyLayout({ children }: { children: React.ReactNode }) {
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
