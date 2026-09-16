import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referenciák & Esettanulmányok | WebDude | Webfejlesztés Kecskemét",
  description:
    "Valós ügyféleredmények, konverzió-optimalizált Next.js weboldalak és egyedi digitális rendszerek. 26 év tapasztalat, mérhető növekedés.",
  alternates: {
    canonical: "https://webdude.hu/munkak",
  },
};

const munkakJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "WebDude.hu",
      url: "https://webdude.hu",
      description:
        "Prémium webfejlesztés, grafikai tervezés és AI automatizáció Kecskemétről. 26 év grafikai és 16 év webfejlesztői tapasztalattal.",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://webdude.hu/search?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Kezdőlap", item: "https://webdude.hu" },
        { "@type": "ListItem", position: 2, name: "Munkák & Esettanulmányok", item: "https://webdude.hu/munkak" },
      ],
    },
    {
      "@type": "Organization",
      name: "WebDude",
      url: "https://webdude.hu",
      logo: "https://webdude.hu/assets/logos/webdude-logo.webp",
      description:
        "Prémium webfejlesztés, grafikai tervezés és AI automatizáció Kecskemétről. 26 év grafikai és 16 év webfejlesztői tapasztalattal.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kecskemét",
        addressCountry: "HU",
      },
      founder: {
        "@type": "Person",
        name: "Norbi (WebDude)",
        jobTitle: "Webfejlesztő és Grafikai Tervező",
        description:
          "16+ év webfejlesztő és 26+ év grafikai tapasztalattal rendelkező digitális szakember. Egyedi weboldalak, arculattervezés és AI automatizáció Kecskemétről.",
      },
      sameAs: [
        "https://www.facebook.com/webdude.hu",
        "https://www.linkedin.com/company/webdude-hu",
      ],
    },
  ],
};

export default function MunkakLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(munkakJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {children}
    </>
  );
}
