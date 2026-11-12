import type { Metadata } from "next";
import { buildBreadcrumbSchema } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: "Kristófka Munkafolyamat | WebDude",
  description:
    "Az exkluzív 6-ágensű multi-agent AI workflow rendszer. Kristófka: 26 éves grafikai rutin + 16 év webfejlesztői tapasztalat találkozik a legújabb AI technológiákkal. Egyedi árajánlat kérése.",
  alternates: {
    canonical: "https://webdude.hu/termekek/kristofka-munkafolyamat",
  },
  openGraph: {
    title: "Kristófka Munkafolyamat | WebDude",
    description:
      "Az exkluzív 6-ágensű multi-agent AI workflow rendszer. Kristófka: 26 éves grafikai rutin + 16 év webfejlesztői tapasztalat találkozik a legújabb AI technológiákkal. Egyedi árajánlat kérése.",
    url: "https://webdude.hu/termekek/kristofka-munkafolyamat",
    siteName: "WebDude",
    images: [
      {
        url: "/og/webdude-og.jpg",
        width: 1200,
        height: 630,
        alt: "Kristófka Munkafolyamat",
      },
    ],
    locale: "hu_HU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kristófka Munkafolyamat | WebDude",
    description:
      "Az exkluzív 6-ágensű multi-agent AI workflow rendszer. Kristófka: 26 éves grafikai rutin + 16 év webfejlesztői tapasztalat találkozik a legújabb AI technológiákkal. Egyedi árajánlat kérése.",
    images: ["/og/webdude-og.jpg"],
  },
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Kristófka Munkafolyamat",
  description:
    "Az exkluzív 6-ágensű multi-agent AI workflow rendszer. Kristófka: 26 éves grafikai rutin + 16 év webfejlesztői tapasztalat találkozik a legújabb AI technológiákkal.",
  image: "https://webdude.hu/og/webdude-og.jpg",
  brand: {
    "@type": "Brand",
    "@id": "https://webdude.hu/#organization",
    name: "WebDude",
  },
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    url: "https://webdude.hu/termekek/kristofka-munkafolyamat",
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
  { name: "Kristófka Munkafolyamat", url: "/termekek/kristofka-munkafolyamat" },
]);

export default function Layout({ children }: { children: React.ReactNode }) {
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
