import type { Metadata } from "next";
import SubpageHero from "@/components/organisms/SubpageHero";
import DirectAnswerBlock from "@/components/molecules/DirectAnswerBlock";
import SeoQuickCheckTool from "@/components/organisms/SeoQuickCheckTool";
import Surface from "@/components/atoms/Surface";
import { buildBreadcrumbSchema } from "@/lib/breadcrumb";
import {
  CANONICAL_ORGANIZATION_ENTITY,
  CANONICAL_PERSON_ENTITY,
  serializeJsonLd,
} from "@/lib/structuredData";

export const metadata: Metadata = {
  title:
    "Ingyenes Weboldal SEO & AI-Készség (AEO/GEO) Gyorsellenőrző | WebDude",
  description:
    "Azonnali, ingyenes 10 pontos SEO, Schema.org AEO és AI-kereső (llms.txt, GPTBot, PerplexityBot) technikai gyorsellenőrzés 0–100 pontos értékeléssel.",
  alternates: {
    canonical: "https://webdude.hu/ingyenes-seo-aeo-elemzes",
    languages: {
      "hu-HU": "https://webdude.hu/ingyenes-seo-aeo-elemzes",
      "en-US": "https://webdude.hu/en/free-seo-aeo-checker",
      "x-default": "https://webdude.hu/ingyenes-seo-aeo-elemzes",
    },
  },
  openGraph: {
    title:
      "Ingyenes Weboldal SEO & AI-Készség (AEO/GEO) Gyorsellenőrző | WebDude",
    description:
      "Teszteld másodpercek alatt, mennyire látják a weboldaladat a Google, a ChatGPT és a Perplexity válaszmotorok.",
    url: "https://webdude.hu/ingyenes-seo-aeo-elemzes",
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
    title: "Ingyenes SEO & AI-Készség (AEO/GEO) Gyorsellenőrző | WebDude",
    description:
      "10 pontos determinisztikus SEO, Schema.org és AI-kereső gyorsellenőrző eszköz regisztráció nélkül.",
    images: ["https://webdude.hu/og/webdude-og.jpg"],
  },
};

const FAQ_ITEMS = [
  {
    q: "Mit vizsgál az ingyenes SEO & AI-készség (AEO/GEO) gyorsellenőrző?",
    a: "10 kritikus technikai és keresőoptimalizálási pontot ellenőrzök: HTTPS és szerver válaszidő (TTFB), title és meta description hossza, egyetlen H1 hierarchia, kanonikus link, OpenGraph + mobil viewport, JSON-LD strukturált adat, AEO entitás-sémák, a robots.txt AI-bot hozzáférése és az llms.txt megléte.",
  },
  {
    q: "Valóban ingyenes és biztonságos a használata?",
    a: "Igen, az eszköz teljesen ingyenes, regisztráció nélkül használható, és kizárólag a nyilvánosan elérhető HTML fejlécet, robots.txt-t és llms.txt-t olvassa be biztonságos korlátokkal.",
  },
  {
    q: "Miért fontos ma az llms.txt és az AI-bot hozzáférés ellenőrzése?",
    a: "A ChatGPT (OAI-SearchBot, GPTBot), a PerplexityBot és a ClaudeBot válaszmotorok egyre gyakrabban a weboldalad nyers HTML kódjából és a /llms.txt fájlból idéznek cégeket és szakértőket — ha ezek hiányoznak vagy tiltva vannak, a versenytársaidat fogják ajánlani.",
  },
  {
    q: "Mit kapok, ha kérem a 10 perces videós UX & SEO elemzést?",
    a: "Személyesen, 26+ év grafikai és 16+ év webfejlesztői tapasztalattal átnézem az oldaladat, és küldök egy lényegre törő videós útmutatót arról, milyen javításokkal érhetsz el gyorsabban több ügyfelet — kötelezettség és rejtett díjak nélkül.",
  },
];

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Főoldal", url: "/" },
  {
    name: "Ingyenes SEO & AI-Készség Ellenőrző",
    url: "/ingyenes-seo-aeo-elemzes",
  },
]);

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": "https://webdude.hu/ingyenes-seo-aeo-elemzes#app",
  name: "WebDude Ingyenes SEO & AI-Készség (AEO/GEO) Gyorsellenőrző",
  description:
    "Determinisztikus 10 pontos weboldal SEO, Schema.org AEO, robots.txt AI-crawler és llms.txt gyorsellenőrző eszköz 0–100 pontos értékeléssel.",
  url: "https://webdude.hu/ingyenes-seo-aeo-elemzes",
  applicationCategory: "SEO & DeveloperApplication",
  operatingSystem: "Any (Web Browser)",
  inLanguage: "hu-HU",
  author: CANONICAL_PERSON_ENTITY,
  provider: CANONICAL_ORGANIZATION_ENTITY,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://webdude.hu/ingyenes-seo-aeo-elemzes#faq",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export default function IngyenesSeoAeoElemzesPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] text-[#0F172A] dark:text-[#F8FAFC]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }}
      />

      <SubpageHero
        badge="Ingyenes SEO & AEO / GEO Diagnosztika"
        title={
          <>
            Mennyire Látják a Weboldaladat a Google és az{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0369A1] to-[#6D28D9] dark:from-[#00B5F1] dark:to-[#A78BFA]">
              AI Keresők?
            </span>
          </>
        }
        subtitle="Add meg a domainedet, és azonnal 10 technikai szempont alapján (0–100 ponton) kielemzem a SEO, a Schema.org tudásgráf és az AI-készség állapotát."
        backgroundImage="/assets/banners/hero-seo.webp"
        backgroundAlt="Ingyenes SEO és AEO gyorsellenőrző eszköz"
      />

      <Surface tone="night-lift" className="py-10">
        <DirectAnswerBlock
          id="seo-quick-check-direct-answer"
          question="Hogyan ellenőrizhető gyorsan egy weboldal SEO és AI-kereső (AEO/GEO) felkészültsége?"
          answer="A WebDude ingyenes gyorsellenőrzője 10 mérhető technikai jelet vizsgál a szerveroldali HTML-ből, a robots.txt-ből és a /llms.txt fájlból (HTTPS/TTFB, title, description, H1, canonical, OpenGraph, JSON-LD entitások, AI-bot engedélyek), majd azonnal javítási listát és személyes videós elemzési lehetőséget ad."
        />
      </Surface>

      <Surface tone="night" aurora className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6">
          <SeoQuickCheckTool locale="hu" />
        </div>
      </Surface>

      <Surface tone="night-lift" className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <h2 className="text-3xl font-heading text-[#0F172A] dark:text-white text-center mb-8">
            Gyakori kérdések a gyorsellenőrzőről
          </h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item) => (
              <details
                key={item.q}
                className="luminous-card p-6 group"
              >
                <summary className="font-semibold text-[#0F172A] dark:text-white cursor-pointer list-none flex items-center justify-between gap-4">
                  <span>{item.q}</span>
                  <span className="text-[#0369A1] dark:text-[#00B5F1] text-lg leading-none">
                    +
                  </span>
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
