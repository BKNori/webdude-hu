import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kapcsolat & Konzultáció | WebDude | Közvetlen Megbeszélés",
  description:
    "Kérj ajánlatot közvetlenül Norbitól! Nincs projektmenedzseri réteg: 26 év tapasztalattal tervezek és fejlesztek Next.js rendszereket országosan.",
  alternates: {
    canonical: "https://webdude.hu/kapcsolat",
  },
};

const kapcsolatJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "WebDude.hu",
      url: "https://webdude.hu",
      description:
        "Prémium webfejlesztés, grafikai tervezés és AI automatizáció országosan. 26 év grafikai és 16 év webfejlesztői tapasztalattal.",
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://webdude.hu/#organization",
      name: "WebDude",
      url: "https://webdude.hu",
      foundingDate: "2009",
      description:
        "Prémium webfejlesztés, grafikai tervezés és AI automatizáció országosan. Egyedi weboldalak, arculattervezés és AI megoldások. 26 év tervezőgrafikai és 16 év webfejlesztői tapasztalattal.",
      telephone: "+36 70 323 8003",
      email: "hello@webdude.hu",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kecskemét",
        addressCountry: "HU",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 46.8758,
        longitude: 19.5152,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "17:00",
        },
      ],
      areaServed: {
        "@type": "Country",
        name: "Hungary",
      },
      founder: {
        "@type": "Person",
        "@id": "https://webdude.hu/#person",
        name: "Balog Norbert",
        alternateName: ["Balog Norbi", "WebDude"],
        jobTitle: "Full-Stack Webfejlesztő, Art Director & AI Automatizációs Szakértő",
        description:
          "26 év tervezőgrafikai és 16 év webfejlesztői tapasztalattal rendelkező digitális szakember. Egyedi weboldalak, arculattervezés és AI automatizáció országosan. Közvetlen együttműködés, nincs ügynökségi bonyolultság.",
        url: "https://webdude.hu/szia-norbi-vagyok",
      },
      sameAs: [
        "https://www.facebook.com/webdude.hu",
        "https://www.linkedin.com/company/webdude",
      ],
      knowsAbout: [
        "Webfejlesztés",
        "Grafikai tervezés",
        "WordPress",
        "AI automatizáció",
        "Arculattervezés",
        "Weboldal készítés",
        "SEO optimalizálás",
        "Next.js fejlesztés",
      ],
    },
    {
      "@type": "ContactPoint",
      "@id": "https://webdude.hu/#contactpoint",
      telephone: "+36703238003",
      email: "hello@webdude.hu",
      contactType: "customer service",
      availableLanguage: ["Hungarian", "English"],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Kezdőlap",
          item: "https://webdude.hu",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Kapcsolat & Konzultáció",
          item: "https://webdude.hu/kapcsolat",
        },
      ],
    },
  ],
};

export default function KapcsolatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(kapcsolatJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {children}
    </>
  );
}
