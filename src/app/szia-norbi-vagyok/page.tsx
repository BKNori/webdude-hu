import type { Metadata } from "next";
import AboutContentClient from "@/components/organisms/AboutContentClient";

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
};

// JSON-LD: ProfilePage + Person séma az E-E-A-T és a Tudásgráf (Knowledge Graph) integrációhoz XSS védelemmel
const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Balog Norbert – WebDude | 26 év tapasztalat",
  description:
    "Grafikai tervezésből indultam, ma már komplex Next.js rendszereket és AI automatizációkat építek. Ismerd meg a WebDude mögött álló szakembert.",
  url: "https://webdude.hu/szia-norbi-vagyok",
  mainEntity: {
    "@type": "Person",
    "@id": "https://webdude.hu/#person",
    name: "Balog Norbert",
    alternateName: ["Balog Norbi", "WebDude"],
    jobTitle: "Vezető Fejlesztő és Grafikus",
    description:
      "Balog Norbert (WebDude) — 26 év grafikai és 16 év webfejlesztői tapasztalattal rendelkező digitális szakember. Next.js, React, WordPress és AI automatizációs rendszerek építője.",
    image: "https://webdude.hu/assets/personal/webdude-kep.webp",
    url: "https://webdude.hu/szia-norbi-vagyok",
    sameAs: [
      "https://github.com/BKNori",
      "https://www.linkedin.com/in/balognorbert",
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
      "Web Development",
      "Next.js",
      "React",
      "TypeScript",
      "WordPress Development",
      "WordPress karbantartás",
      "WooCommerce webshop",
      "SEO optimalizálás",
      "Graphic Design",
      "Branding",
      "Search Engine Optimization (SEO)",
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
          __html: JSON.stringify(profilePageSchema).replace(/</g, "\\u003c"),
        }}
      />
      <AboutContentClient />
    </>
  );
}
