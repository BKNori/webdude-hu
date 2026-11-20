import type { Metadata } from "next";
import AboutContentClient from "@/components/organisms/AboutContentClient";
import DirectAnswerBlock from "@/components/molecules/DirectAnswerBlock";
import { buildBreadcrumbSchema } from "@/lib/breadcrumb";
import { serializeJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Balog Norbert – WebDude | 26 év tapasztalat",
  description:
    "Grafikai tervezésből indultam, ma már komplex Next.js rendszereket és AI automatizációkat építek. Ismerd meg a WebDude mögött álló szakembert.",
  alternates: {
    canonical: "https://webdude.hu/szia-norbi-vagyok",
  },
  openGraph: {
    title: "Balog Norbert – WebDude | 26 év tapasztalat",
    description:
      "Grafikai tervezésből indultam, ma már komplex Next.js rendszereket és AI automatizációkat építek. Ismerd meg a WebDude mögött álló szakembert.",
    url: "https://webdude.hu/szia-norbi-vagyok",
    siteName: "WebDude",
    locale: "hu_HU",
    type: "profile",
    images: [
      {
        url: "/assets/personal/webdude-kep.webp",
        width: 1000,
        height: 1250,
        alt: "Balog Norbert - WebDude",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Balog Norbert – WebDude | 26 év tapasztalat",
    description:
      "Grafikai tervezésből indultam, ma már komplex Next.js rendszereket és AI automatizációkat építek. Ismerd meg a WebDude mögött álló szakembert.",
    images: ["/assets/personal/webdude-kep.webp"],
  },
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Főoldal", url: "/" },
  { name: "Szia, Norbi vagyok", url: "/szia-norbi-vagyok" },
]);

// JSON-LD: ProfilePage + Person séma az E-E-A-T és a Tudásgráf (Knowledge Graph) integrációhoz XSS védelemmel
const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://webdude.hu/szia-norbi-vagyok#profile",
  name: "Balog Norbert – WebDude | 26 év tapasztalat",
  description:
    "Grafikai tervezésből indultam, ma már komplex Next.js rendszereket és AI automatizációkat építek. Ismerd meg a WebDude mögött álló szakembert.",
  url: "https://webdude.hu/szia-norbi-vagyok",
  mainEntity: {
    "@type": "Person",
    "@id": "https://webdude.hu/#person",
    name: "Balog Norbert",
    alternateName: ["Balog Norbi", "WebDude"],
    jobTitle:
      "Full-Stack Webfejlesztő, Art Director & AI Automatizációs Szakértő",
    description:
      "Balog Norbert (WebDude) — 26 év grafikai és 16 év webfejlesztői tapasztalattal rendelkező digitális szakember. Next.js, React, WordPress és AI automatizációs rendszerek építője.",
    image: "https://webdude.hu/assets/personal/webdude-kep.webp",
    url: "https://webdude.hu/szia-norbi-vagyok",
    sameAs: [
      "https://github.com/BKNori",
      "https://www.facebook.com/webdude.hu",
      "https://www.linkedin.com/in/balognorbert",
      "https://twitter.com/webdude_hu",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kecskemét",
      addressCountry: "HU",
    },
    worksFor: {
      "@type": "Organization",
      "@id": "https://webdude.hu/#organization",
      name: "WebDude",
      url: "https://webdude.hu",
    },
    knowsAbout: [
      "Webfejlesztés",
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Firebase",
      "WordPress fejlesztés",
      "WordPress karbantartás",
      "WooCommerce webshop",
      "SEO optimalizálás",
      "AEO — AI Answer Engine Optimization",
      "GEO — Generative Engine Optimization",
      "AI Automatizáció & Workflow",
      "Prompt Engineering",
      "Grafikai tervezés",
      "Arculattervezés",
      "UI/UX Design",
    ],
  },
};

export default function SziaNorbiVagyokPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(profilePageSchema),
        }}
      />
      <AboutContentClient />
      <DirectAnswerBlock
        id="szia-norbi-direct-answer"
        question="Ki áll a WebDude mögött, és milyen tapasztalattal dolgozik?"
        answer="Balog Norbert (WebDude) egyéni webfejlesztő és art director vagyok, 26+ év tervezőgrafikai és 16+ év full-stack webfejlesztői tapasztalattal. Next.js 16, React 19, TypeScript, WordPress/WooCommerce és AI workflow rendszereket építek közvetlen kommunikációval — ügynökségi közvetítők nélkül, egyedi árajánlat alapján."
      />
    </>
  );
}
