import type { Metadata } from "next";
import { buildBreadcrumbSchema } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: "Prémium AI & Automatizációs Megoldások | WebDude",
  description:
    "Prémium AI munkafolyamatok, automatizációs eszközök, CRO megoldások és AI műhely sablonok KKV-knak. Egyedi árajánlat kérése a projekt igényei alapján.",
  alternates: {
    canonical: "https://webdude.hu/termekek",
  },
  openGraph: {
    title: "Prémium AI & Automatizációs Megoldások | WebDude",
    description:
      "Prémium AI munkafolyamatok, automatizációs eszközök, CRO megoldások és AI műhely sablonok KKV-knak. Egyedi árajánlat kérése a projekt igényei alapján.",
    url: "https://webdude.hu/termekek",
    siteName: "WebDude",
    images: [
      {
        url: "/og/webdude-og.jpg",
        width: 1200,
        height: 630,
        alt: "Prémium AI & Automatizációs Megoldások",
      },
    ],
    locale: "hu_HU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prémium AI & Automatizációs Megoldások | WebDude",
    description:
      "Prémium AI munkafolyamatok, automatizációs eszközök, CRO megoldások és AI műhely sablonok KKV-knak. Egyedi árajánlat kérése a projekt igényei alapján.",
    images: ["/og/webdude-og.jpg"],
  },
};

const collectionPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Prémium AI & Automatizációs Megoldások",
  description:
    "Prémium AI munkafolyamatok, automatizációs eszközök, CRO megoldások és AI műhely sablonok KKV-knak. Egyedi árajánlat kérése a projekt igényei alapján.",
  url: "https://webdude.hu/termekek",
  publisher: {
    "@type": "Organization",
    "@id": "https://webdude.hu/#organization",
    name: "WebDude",
  },
  about: {
    "@type": "Thing",
    name: "AI Automatizáció",
  },
} as const;

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Főoldal", url: "/" },
  { name: "Termékek", url: "/termekek" },
]);

export default function TermekekLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageJsonLd).replace(/</g, "\\u003c"),
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
