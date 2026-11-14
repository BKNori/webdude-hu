import React from "react";
import EmphasizedText from "@/components/atoms/EmphasizedText";
import { HeroContent } from "@/types/dictionary";

export interface SlideData {
  id: string;
  badge: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  subtitle: React.ReactNode;
  highlights: string[];
  trustPoints: string[];
  cta1: {
    text: string;
    href: string;
    id: string;
  };
  cta2?: {
    text: string;
    href: string;
    id: string;
  };
  bgImage: string;
  bgAlt: string;
  ratingText: string;
}

export const SLIDE_DEFAULTS: SlideData[] = [
  {
    id: "web-dev",
    badge: "Kecskemét · Országos kiszolgálás · Távolról is",
    titlePrefix: "Weboldal, ami nemcsak ",
    titleHighlight: "szép, hanem ügyfeleket",
    titleSuffix: " is hoz.",
    subtitle: (
      <>
        Egy kézben kapod a{" "}
        <span className="text-text-primary font-semibold">
          weboldal készítést
        </span>
        ,{" "}
        <span className="text-text-primary font-semibold">
          WordPress fejlesztést
        </span>
        , <span className="text-text-primary font-semibold">SEO-t</span> és{" "}
        <span className="text-text-primary font-semibold">
          grafikai tervezést
        </span>{" "}
        – ügynökségi mellébeszélés nélkül,{" "}
        <span className="text-text-primary font-semibold">
          26 év kreatív és 16 év webfejlesztői tapasztalattal.
        </span>
      </>
    ),
    highlights: [
      "Weboldal készítés",
      "WordPress fejlesztés",
      "SEO optimalizálás",
      "Grafikai tervezés",
    ],
    trustPoints: [
      "Közvetlen kommunikáció — nincs közvetítő",
      "30 napos hibajavítási garancia",
      "Egyedi árazás, garantált határidők",
    ],
    cta1: {
      text: "Kérj projektfelmérést",
      href: "/kapcsolat",
      id: "hero-cta-1-primary",
    },
    cta2: {
      text: "Munkáim megtekintése",
      href: "/munkak",
      id: "hero-cta-1-secondary",
    },
    bgImage: "/assets/banners/webdude-hero.webp",
    bgAlt:
      "WebDude — Weboldal készítés, WordPress, SEO és grafikai tervezés Kecskemétről",
    ratingText: "47+ elégedett ügyfél",
  },
  {
    id: "client-magnet",
    badge: "Technikai Webfejlesztés · Konverziós Webshopok",
    titlePrefix: "Skálázható weboldalak és webshopok, amelyek ",
    titleHighlight: "valódi forgalmat és bevételt",
    titleSuffix: " termelnek.",
    subtitle: (
      <>
        Egyedi fejlesztésű, villámgyors{" "}
        <span className="text-text-primary font-semibold">
          WordPress, WooCommerce és Next.js webshopok
        </span>
        , amelyek zökkenőmentes vásárlási élményt nyújtanak és technikai hibák
        nélkül konvertálják a látogatóidat vásárlókká.
      </>
    ),
    highlights: [
      "Egyedi Webshop Fejlesztés",
      "Technikai Kódoptimalizálás",
      "Villámgyors Betöltés (LCP < 2s)",
      "Konverziófókuszú UI/UX",
    ],
    trustPoints: [
      "Automatizált fizetés és számlázás",
      "Mobil-első, akadálymentes design",
      "Biztonságos felhő architektúra",
    ],
    cta1: {
      text: "Egyedi árajánlat kérése",
      href: "/kapcsolat",
      id: "hero-cta-2-primary",
    },
    cta2: {
      text: "Webshop fejlesztés részletei",
      href: "/szolgaltatasok/webshop-fejlesztes",
      id: "hero-cta-2-secondary",
    },
    bgImage: "/assets/banners/ronch caffe adris nagybanner 20221005c copy 2.webp",
    bgAlt: "WebDude — Technikai webfejlesztés és konverziós webshop készítés",
    ratingText: "Kiemelkedő konverziós arány",
  },
  {
    id: "ai-prompt-platform",
    badge: "AI Prompt Platform · Kiemelt Esettanulmány",
    titlePrefix: "AI Prompt Platform",
    titleHighlight: "",
    titleSuffix: "",
    subtitle: (
      <>
        Teljes körű, skálázható AI architektúra és prompt-ökoszisztéma
        kivitelezése.{" "}
        <span className="text-text-primary font-semibold">Next.js 16</span> és
        modern mesterséges intelligencia munkafolyamatok integrációjával, amely
        automatizálja a tartalomkészítést és a feladatokat.
      </>
    ),
    highlights: [
      "AI Prompt Ökoszisztéma",
      "Next.js 16 & React 19",
      "3 Hónapos Piaci Bevezetés",
      "Automatizált Generálás",
    ],
    trustPoints: [
      "Élesben tesztelt AI rendszerek",
      "Azonnali produktivitási ugrás",
      "Modern, jövőbiztos infrastruktúra",
    ],
    cta1: {
      text: "AI Megoldások felfedezése",
      href: "/szolgaltatasok",
      id: "hero-cta-3-primary",
    },
    cta2: {
      text: "Prompt sablonok",
      href: "/portal/prompt-sablonok",
      id: "hero-cta-3-secondary",
    },
    bgImage: "/assets/banners/webdude banner 2000x1000.webp",
    bgAlt: "WebDude — AI Prompt Platform",
    ratingText: "100% egyedi AI integráció",
  },
];

export function buildHeroSlides(content: HeroContent): SlideData[] {
  return SLIDE_DEFAULTS.map((slide, index) => {
    const override = content.slides[index];
    if (!override) return slide;
    return {
      ...slide,
      badge: override.badge,
      titlePrefix: override.titlePrefix,
      titleHighlight: override.titleHighlight,
      titleSuffix: override.titleSuffix,
      subtitle: <EmphasizedText value={override.subtitle} />,
      highlights: override.highlights,
      trustPoints: override.trustPoints,
      cta1: {
        text: override.cta1.label,
        href: override.cta1.href,
        id: `hero-cta-${index + 1}-primary`,
      },
      cta2: {
        text: override.cta2.label,
        href: override.cta2.href,
        id: `hero-cta-${index + 1}-secondary`,
      },
      bgImage: override.bgImage,
      bgAlt: override.bgAlt,
      ratingText: override.ratingText,
    };
  });
}
