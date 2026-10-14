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
    "@type": "Person",
    name: "Norbi",
    jobTitle: "Web Developer & AI Specialist",
    url: "https://webdude.hu",
  },
};

/**
 * Breadcrumb (morzsamenü) séma — a projekt AEO-szabványa szerint minden
 * aloldalon kötelező. Az `ai-megoldasok` szülő szekció az anyaútvonal.
 */
const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Főoldal", url: "/" },
  { name: "AI Megoldások", url: "/ai-megoldasok" },
  { name: "AI Prompt Sablonok", url: "/ai-megoldasok/ai-prompt-sablonok" },
]);

export default function AIPromptSablonokLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      {/* XSS VÉDELEM: a `<` karakter escape-je kötelező a JSON-LD-ben is.
          (A korábbi verzió ezt kihagyta — ez volt az egyetlen, nem védett
          JSON-LD a teljes /ai-megoldasok fa alatt.) */}
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
