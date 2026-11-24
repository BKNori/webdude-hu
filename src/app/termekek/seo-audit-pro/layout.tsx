import type { Metadata } from "next";
import { buildBreadcrumbSchema } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: "SEO & AEO Audit Pro | WebDude",
  description:
    "Szakértői SEO és AEO Audit Pro 26 év tervezői és 16 év fejlesztői rutinnal, 95+ Lighthouse és Schema.org fókusszal. Egyedi árajánlat kérése közvetlenül.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://webdude.hu/termekek/seo-audit-pro",
  },
  openGraph: {
    title: "SEO & AEO Audit Pro | WebDude",
    description:
      "Szakértői SEO és AEO Audit Pro 26 év tervezői és 16 év fejlesztői rutinnal, 95+ Lighthouse és Schema.org fókusszal. Egyedi árajánlat kérése közvetlenül.",
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
      "Szakértői SEO és AEO Audit Pro 26 év tervezői és 16 év fejlesztői rutinnal, 95+ Lighthouse és Schema.org fókusszal. Egyedi árajánlat kérése közvetlenül.",
    images: ["/og/webdude-og.jpg"],
  },
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "SEO & AEO Audit Pro",
  description:
    "Szakértői SEO és AEO Audit Pro 26 év tervezői és 16 év fejlesztői rutinnal, 95+ Lighthouse és Schema.org fókusszal. Egyedi árajánlat kérése közvetlenül.",
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
      name: "WebDude",
      foundingDate: "2009",
      telephone: "+36 70 323 8003",
      email: "hello@webdude.hu",
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
    alternateName: ["Balog Norbi", "WebDude"],
    jobTitle: "Full-Stack Webfejlesztő, Art Director & AI Automatizációs Szakértő",
    description: "26 év tervezőgrafikai és 16 év webfejlesztői tapasztalat",
  },
} as const;

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Főoldal", url: "/" },
  { name: "Termékek", url: "/termekek" },
  { name: "SEO & AEO Audit Pro", url: "/termekek/seo-audit-pro" },
]);

export default function ProductRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
