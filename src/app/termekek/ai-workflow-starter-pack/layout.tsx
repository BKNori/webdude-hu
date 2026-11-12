import type { Metadata } from "next";
import { buildBreadcrumbSchema } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: "AI Workflow Starter Pack | WebDude",
  description:
    "Spórolj heti 15 órát manuális munkával kész AI workflow sablonokkal. Email kampányok, lead generálás és ügyfélszolgálat automatizálása. 3.4x organikus elérés. Egyedi árajánlat kérése.",
  alternates: {
    canonical: "https://webdude.hu/termekek/ai-workflow-starter-pack",
  },
  openGraph: {
    title: "AI Workflow Starter Pack | WebDude",
    description:
      "Spórolj heti 15 órát manuális munkával kész AI workflow sablonokkal. Email kampányok, lead generálás és ügyfélszolgálat automatizálása. 3.4x organikus elérés. Egyedi árajánlat kérése.",
    url: "https://webdude.hu/termekek/ai-workflow-starter-pack",
    siteName: "WebDude",
    images: [
      {
        url: "/og/webdude-og.jpg",
        width: 1200,
        height: 630,
        alt: "AI Workflow Starter Pack",
      },
    ],
    locale: "hu_HU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Workflow Starter Pack | WebDude",
    description:
      "Spórolj heti 15 órát manuális munkával kész AI workflow sablonokkal. Email kampányok, lead generálás és ügyfélszolgálat automatizálása. 3.4x organikus elérés. Egyedi árajánlat kérése.",
    images: ["/og/webdude-og.jpg"],
  },
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "AI Workflow Starter Pack",
  description:
    "Spórolj heti 15 órát manuális munkával. Automatizáld email kampányokat, lead generálást és ügyfélszolgálatot kész AI workflow sablonokkal. 3.4x organikus elérés, 300 DPI nyomdakész outputok.",
  image: "https://webdude.hu/og/webdude-og.jpg",
  brand: {
    "@type": "Brand",
    "@id": "https://webdude.hu/#organization",
    name: "WebDude",
  },
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    url: "https://webdude.hu/termekek/ai-workflow-starter-pack",
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
  { name: "AI Workflow Starter Pack", url: "/termekek/ai-workflow-starter-pack" },
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
