import type { Metadata } from "next";
import { buildBreadcrumbSchema } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: "AI Chatbot Starter | WebDude",
  description:
    "Magyar nyelvű AI chatbot rendszer 24/7 ügyfélszolgálathoz. Azonnal integrálható bármilyen weboldalra. 85% support költség csökkenés, 3.2x ügyfél elégedettség. Egyedi árajánlat kérése.",
  alternates: {
    canonical: "https://webdude.hu/termekek/ai-chatbot-starter",
  },
  openGraph: {
    title: "AI Chatbot Starter | WebDude",
    description:
      "Magyar nyelvű AI chatbot rendszer 24/7 ügyfélszolgálathoz. Azonnal integrálható bármilyen weboldalra. 85% support költség csökkenés, 3.2x ügyfél elégedettség. Egyedi árajánlat kérése.",
    url: "https://webdude.hu/termekek/ai-chatbot-starter",
    siteName: "WebDude",
    images: [
      {
        url: "/og/webdude-og.jpg",
        width: 1200,
        height: 630,
        alt: "AI Chatbot Starter",
      },
    ],
    locale: "hu_HU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Chatbot Starter | WebDude",
    description:
      "Magyar nyelvű AI chatbot rendszer 24/7 ügyfélszolgálathoz. Azonnal integrálható bármilyen weboldalra. 85% support költség csökkenés, 3.2x ügyfél elégedettség. Egyedi árajánlat kérése.",
    images: ["/og/webdude-og.jpg"],
  },
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "AI Chatbot Starter",
  description:
    "Válaszolj azonnal minden ügyfélkérésre 24/7. Magyar nyelvű AI chatbot rendszer, amely azonnal integrálható bármilyen weboldalra. 85% support költség csökkenés, 3.2x ügyfél elégedettség.",
  image: "https://webdude.hu/og/webdude-og.jpg",
  brand: {
    "@type": "Brand",
    "@id": "https://webdude.hu/#organization",
    name: "WebDude",
  },
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    url: "https://webdude.hu/termekek/ai-chatbot-starter",
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
  { name: "AI Chatbot Starter", url: "/termekek/ai-chatbot-starter" },
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
