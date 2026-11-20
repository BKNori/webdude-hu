import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Gauge,
  ListChecks,
  MousePointerClick,
  Video,
} from "lucide-react";
import SubpageHero from "@/components/organisms/SubpageHero";
import DirectAnswerBlock from "@/components/molecules/DirectAnswerBlock";
import Surface from "@/components/atoms/Surface";
import ContactForm from "@/components/molecules/ContactForm";
import { buildBreadcrumbSchema } from "@/lib/breadcrumb";
import {
  CANONICAL_ORGANIZATION_ENTITY,
  CANONICAL_PERSON_ENTITY,
  serializeJsonLd,
} from "@/lib/structuredData";

export const metadata: Metadata = {
  title:
    "Ingyenes 10 Perces Videós UX & SEO Weboldal Elemzés | WebDude",
  description:
    "Nem sablonos PDF-et, hanem 10 perces névre szóló képernyővideót kapsz tőlem a weboldalad 3 legnagyobb konverziós, sebességi és SEO/AI hibájáról — díjmentesen.",
  alternates: {
    canonical: "https://webdude.hu/ingyenes-weboldal-elemzes",
    languages: {
      "hu-HU": "https://webdude.hu/ingyenes-weboldal-elemzes",
      "en-US": "https://webdude.hu/en/free-website-audit",
      "x-default": "https://webdude.hu/ingyenes-weboldal-elemzes",
    },
  },
  openGraph: {
    title: "Ingyenes 10 Perces Videós UX & SEO Weboldal Elemzés | WebDude",
    description:
      "Névre szóló 10 perces videós UX, sebesség és SEO/AEO audit Balog Norberttől (26+ év grafika, 16+ év webfejlesztés) — kötelezettség nélkül.",
    url: "https://webdude.hu/ingyenes-weboldal-elemzes",
    siteName: "WebDude",
    locale: "hu_HU",
    type: "website",
    images: [
      {
        url: "https://webdude.hu/og/webdude-og.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ingyenes 10 Perces Videós UX & SEO Weboldal Elemzés | WebDude",
    description:
      "Személyre szóló 10 perces videó a weboldalad 3 legnagyobb SEO, AI-keresős és konverziós hibájáról.",
    images: ["https://webdude.hu/og/webdude-og.jpg"],
  },
};

const VIDEO_TOPICS = [
  {
    icon: Gauge,
    title: "Sebesség & Core Web Vitals",
    desc: "Feltárom a lassú TTFB, a túl nagy képek, a blokkoló scriptek és a mobilos elrendezés-ugrálás (CLS/LCP) valódi okait.",
  },
  {
    icon: Bot,
    title: "Google SEO & AI-Kereső (AEO/GEO)",
    desc: "Megmutatom, mit látnak belőled a Google, a ChatGPT és a Perplexity botok — a Schema.org entitásoktól a robots.txt-ig.",
  },
  {
    icon: MousePointerClick,
    title: "UX & Konverziós Akadályok",
    desc: "Végigmegyek egy hideg látogató szemével a főoldaladon: miért bizonytalanodik el, és miért nem kér ajánlatot most.",
  },
  {
    icon: ListChecks,
    title: "Priorizált 3 Lépéses Akcióterv",
    desc: "Konkrét, fontossági sorrendbe állított javítási listát kapsz, amelyet házon belül is azonnal végrehajthattok.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Megadod az URL-t az űrlapon",
    desc: "Írd be a weboldalad címét és 1 mondatban a fő üzleti célodat az alábbi gyors űrlapon.",
  },
  {
    step: "02",
    title: "48 órán belül elkészítem a videót",
    desc: "26+ év grafikai és 16+ év fejlesztői rutin alapján személyesen rögzítem a 10 perces privát képernyővideót.",
  },
  {
    step: "03",
    title: "Te döntesz a folytatásról",
    desc: "Nincs nyomulós értékesítői hívás: a javaslatokat magad is megvalósíthatod, vagy kérhetsz tőlem egyedi árajánlatot.",
  },
];

const FAQ_ITEMS = [
  {
    q: "Miért készítek ingyen egy 10 perces névre szóló videós auditot?",
    a: "Hiszek abban, hogy a bizalmat gyakorlati értékkel érdemes megalapozni. A videóban élőben látod, hogyan gondolkodom UX, SEO és kódminőség terén — így kötelezettség nélkül tudod eldönteni, szeretnél-e velem dolgozni.",
  },
  {
    q: "Mennyi idő alatt kapom meg a videós elemzést?",
    a: "Munkanapokon jellemzően 48 órán belül elküldöm a privát videó linkjét az email címedre.",
  },
  {
    q: "Miben más ez, mint egy automatizált SEO PDF riport?",
    a: "Egy szoftver nem érti az iparágadat, a márkaüzenetedet és az ajánlatkérő folyamatod pszichológiáját. Én emberi szakértői szemmel nézem át a dizájnt, a szövegérthetőséget, a mobilos kattinthatóságot és a technikai SEO hátteret egyszerre.",
  },
  {
    q: "Kötelességem utána megrendelni a javítást?",
    a: "Egyáltalán nem. A videót szabadon átadhatod a saját fejlesztődnek vagy marketingesednek is; ha viszont szeretnéd, hogy én javítsam ki, egyedi árajánlat alapján szívesen segítek.",
  },
];

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Főoldal", url: "/" },
  {
    name: "Ingyenes 10 Perces Videós Audit",
    url: "/ingyenes-weboldal-elemzes",
  },
]);

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://webdude.hu/ingyenes-weboldal-elemzes#service",
  name: "Ingyenes 10 Perces Videós UX & SEO Weboldal Elemzés",
  description:
    "Személyre szóló 10 perces videós UX, Core Web Vitals, technikai SEO és AI-kereső (AEO/GEO) elemzés Balog Norberttől (WebDude), kötelezettség nélkül.",
  url: "https://webdude.hu/ingyenes-weboldal-elemzes",
  provider: CANONICAL_ORGANIZATION_ENTITY,
  areaServed: { "@type": "Country", name: "Hungary" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://webdude.hu/ingyenes-weboldal-elemzes#faq",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function IngyenesWeboldalElemzesPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] text-[#0F172A] dark:text-[#F8FAFC]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }}
      />

      <SubpageHero
        badge="Ingyenes · Névre Szóló · 48 Órán Belül"
        title={
          <>
            10 Perces Videós{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0369A1] to-[#6D28D9] dark:from-[#00B5F1] dark:to-[#A78BFA]">
              UX &amp; SEO Audit
            </span>
          </>
        }
        subtitle="Nem sablonos PDF-et, hanem egy 10 perces, névre szóló képernyővideót kapsz tőlem a weboldalad 3 legnagyobb konverziós és SEO/AI hibájáról — kötelezettség nélkül."
        backgroundImage="/assets/banners/hero-seo.webp"
        backgroundAlt="Ingyenes 10 perces videós UX és SEO elemzés"
        cta1Text="Kérem a videós elemzést ↓"
        cta1Href="#video-audit-form"
        cta2Text="10 mp-es automata teszt →"
        cta2Href="/ingyenes-seo-aeo-elemzes"
      />

      <Surface tone="night-lift" className="py-10">
        <DirectAnswerBlock
          id="video-audit-direct-answer"
          question="Mit tartalmaz az ingyenes 10 perces videós UX és SEO weboldal elemzés?"
          answer="Balog Norbert (WebDude) 26+ év grafikai és 16+ év webfejlesztői tapasztalattal személyesen vizsgálja meg a weboldalad sebességét (Core Web Vitals), technikai SEO és AI-kereső (AEO/GEO) felkészültségét, valamint ajánlatkérési UX útvonalát — és 48 órán belül elküld egy 10 perces privát videót a 3 legfontosabb javítási javaslattal."
        />
      </Surface>

      {/* Mit kapsz a 10 perces videóban? */}
      <Surface tone="night" aurora className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="eyebrow-badge text-[#0369A1] dark:text-[#00B5F1] inline-flex items-center gap-2">
              <Video className="w-3.5 h-3.5" aria-hidden="true" />
              Konkrét, Gyakorlati Visszajelzés
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-[#0F172A] dark:text-white">
              Mit kapsz a 10 perces videóban?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VIDEO_TOPICS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="luminous-card p-6 space-y-4">
                <div className="w-11 h-11 rounded-xl bg-[#0369A1]/10 dark:bg-[#00B5F1]/12 border border-[#0369A1]/25 dark:border-[#00B5F1]/25 flex items-center justify-center text-[#0369A1] dark:text-[#00B5F1]">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-heading text-[#0F172A] dark:text-white">
                  {title}
                </h3>
                <p className="text-sm text-[#334155] dark:text-slate-300 leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Surface>

      {/* Hogyan működik? */}
      <Surface tone="slate-lift" grid className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          <h2 className="text-3xl sm:text-4xl font-heading text-[#0F172A] dark:text-white text-center">
            Hogyan működik 3 egyszerű lépésben?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((s) => (
              <div key={s.step} className="luminous-card p-6 space-y-3">
                <span className="font-mono text-sm font-bold text-[#0369A1] dark:text-[#00B5F1] block">
                  {s.step}
                </span>
                <h3 className="text-xl font-heading text-[#0F172A] dark:text-white">
                  {s.title}
                </h3>
                <p className="text-sm text-[#334155] dark:text-slate-300 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Surface>

      {/* Beágyazott igénylő űrlap + link az automata ellenőrzőre */}
      <Surface tone="night" aurora className="py-16 md:py-24">
        <div
          id="video-audit-form"
          className="max-w-5xl mx-auto px-6 grid lg:grid-cols-12 gap-10 items-start"
        >
          <div className="lg:col-span-5 space-y-6">
            <span className="eyebrow-badge text-[#0369A1] dark:text-[#00B5F1] block">
              Videós Audit Igénylése
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading text-[#0F172A] dark:text-white">
              Add meg a weboldalad címét
            </h2>
            <p className="text-sm sm:text-base text-[#334155] dark:text-slate-300 leading-relaxed">
              Személyesen ({CANONICAL_PERSON_ENTITY.name}, WebDude) nézem át az
              oldaladat, és 48 órán belül elküldöm a videó linkjét. Semmilyen
              rejtett elköteleződés nincs.
            </p>
            <div className="luminous-card p-5 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#0369A1] dark:text-[#00B5F1]">
                Azonnali automata pontszámot is szeretnél?
              </p>
              <Link
                href="/ingyenes-seo-aeo-elemzes"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F172A] dark:text-white hover:text-[#0369A1] dark:hover:text-[#00B5F1] transition-colors"
              >
                10 másodperces SEO &amp; AI-készség teszt indítása
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactForm
              initialProjectType="webfejlesztes"
              initialMessage="Szeretném kérni az ingyenes, 10 perces videós UX & SEO weboldal elemzést. A weboldalam címe: https://"
            />
          </div>
        </div>
      </Surface>

      {/* 4 kérdéses GYIK */}
      <Surface tone="night-lift" className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <h2 className="text-3xl font-heading text-[#0F172A] dark:text-white text-center mb-8">
            Gyakori kérdések a videós auditról
          </h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item) => (
              <details key={item.q} className="luminous-card p-6">
                <summary className="font-semibold text-[#0F172A] dark:text-white cursor-pointer list-none flex items-center justify-between gap-4">
                  <span>{item.q}</span>
                  <span className="text-[#0369A1] dark:text-[#00B5F1]">+</span>
                </summary>
                <p className="mt-4 text-sm text-[#334155] dark:text-slate-300 leading-relaxed">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Surface>
    </div>
  );
}
