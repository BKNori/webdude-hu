import { Metadata } from "next";
import { buildBreadcrumbSchema } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: "AI Prompt Sablonok | Grafikai AI Prompt Könyvtár | WebDude",
  description:
    "Professzionális, tesztelt AI prompt sablonok Midjourney, DALL-E és más AI képgenerálókhoz. Logo design, termékfotó, social media banner és weboldal hero promptok.",
  openGraph: {
    title: "AI Prompt Sablonok | Grafikai AI Prompt Könyvtár",
    description:
      "Professzionális, tesztelt AI prompt sablonok Midjourney, DALL-E és más AI képgenerálókhoz. Logo design, termékfotó, social media banner és weboldal hero promptok.",
    type: "website",
    url: "https://webdude.hu/ai-megoldasok/ai-prompt-sablonok",
    images: [
      {
        url: "/assets/banners/ai-design-hero.webp",
        width: 1200,
        height: 630,
        alt: "AI Prompt Sablonok",
      },
    ],
    locale: "hu_HU",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Prompt Sablonok | Grafikai AI Prompt Könyvtár",
    description:
      "Professzionális, tesztelt AI prompt sablonok Midjourney, DALL-E és más AI képgenerálókhoz.",
    images: ["/assets/banners/ai-design-hero.webp"],
  },
  alternates: {
    canonical: "https://webdude.hu/ai-megoldasok/ai-prompt-sablonok",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "AI Prompt Sablonok",
  description:
    "Professzionális, tesztelt AI prompt sablonok Midjourney, DALL-E és más AI képgenerálókhoz. Logo design, termékfotó, social media banner és weboldal hero promptok.",
  url: "https://webdude.hu/ai-megoldasok/ai-prompt-sablonok",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "SoftwareApplication",
        name: "Midjourney",
        applicationCategory: "DesignApplication",
        operatingSystem: "Web",
      },
      {
        "@type": "SoftwareApplication",
        name: "DALL-E",
        applicationCategory: "DesignApplication",
        operatingSystem: "Web",
      },
    ],
  },
  provider: {
    "@type": "Organization",
    "@id": "https://webdude.hu/#organization",
    name: "WebDude",
  },
  founder: {
    "@type": "Person",
    "@id": "https://webdude.hu/#person",
    name: "Balog Norbert",
    description: "26 év grafikai tervezési és 16 év webfejlesztői tapasztalat",
  },
};

/** 
 * Breadcrumb (morzsamenü) séma — a projekt AEO-szabványa szerint minden 
 * aloldalon kötelező. Az i-megoldasok szülő szekció az anyaútvonal. 
 */ 
const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Főoldal", url: "/" },
  { name: "AI Megoldások", url: "/ai-megoldasok" },
  { name: "AI Prompt Sablonok", url: "/ai-megoldasok/ai-prompt-sablonok" },
]);

export default function AIPromptSablonokLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
