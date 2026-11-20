import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import AIFeatureCard from "@/components/molecules/AIFeatureCard";
import AIFAQSection from "@/components/organisms/AIFAQSection";
import AIBenefitsGrid from "@/components/molecules/AIBenefitsGrid";
import DirectAnswerBlock from "@/components/molecules/DirectAnswerBlock";
import HeroBackdrop from "@/components/molecules/HeroBackdrop";
import Surface from "@/components/atoms/Surface";
import { CANONICAL_PERSON_ENTITY, serializeJsonLd } from "@/lib/structuredData";

// ─── SEO Metadata — AI Megoldások oldal (K-01 fix) ─────────────────────────
export const metadata: Metadata = {
  title: "AI Automatizáció és Workflow Rendszerek KKV-knak | WebDude",
  description:
    "Vállalati AI automatizáció, egyedi prompt engineering és AI workflow rendszerek KKV-knak. 26 év tapasztalat, ChatGPT, Claude és Groq integráció. Egyedi árajánlat kérése.",
  alternates: {
    canonical: "https://webdude.hu/ai-megoldasok",
  },
  openGraph: {
    title: "AI Automatizáció és Workflow Rendszerek KKV-knak | WebDude",
    description:
      "Vállalati AI automatizáció, egyedi prompt engineering és AI workflow rendszerek KKV-knak. 26 év tapasztalat, egyedi árajánlat.",
    url: "https://webdude.hu/ai-megoldasok",
    siteName: "WebDude",
    images: [{ url: "https://webdude.hu/og/webdude-og.jpg", width: 1200, height: 630 }],
    locale: "hu_HU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Automatizáció és Workflow Rendszerek KKV-knak | WebDude",
    description:
      "Vállalati AI automatizáció, prompt engineering és AI workflow rendszerek KKV-knak. 26 év tapasztalat.",
    images: ["https://webdude.hu/og/webdude-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const aiSolutions = [
  {
    id: 1,
    name: "AI Workflow Kialakítás",
    category: "AI Automatizáció",
    description:
      "Egyedi AI workflow rendszerek tervezése és implementálása, amelyek automatizálják az üzleti folyamatokat és növelik a hatékonyságot.",
    color: "from-[#00B5F1] to-[#5B21B6]",
    features: [
      "Egyedi workflow tervezés",
      "ChatGPT és Claude integráció",
      "Automatikus feladat kiosztás",
      "Real-time monitoring",
    ],
    href: "/szolgaltatasok/ai-workflow-kialakitas",
  },
  {
    id: 2,
    name: "AI Kép és Videó Generálás",
    category: "AI Tartalomgyártás",
    description:
      "AI alapú kép és videó generálás marketing anyagokhoz, social media tartalmakhoz és weboldalakhoz. Midjourney, DALL-E, Runway ML.",
    color: "from-[#7C3AED] to-[#00B5F1]",
    features: [
      "AI képgenerálás (Midjourney, DALL-E)",
      "AI videó generálás (Runway ML)",
      "Social media tartalom",
      "Marketing anyagok",
    ],
    href: "/szolgaltatasok/ai-kep-es-videogeneralas",
  },
  {
    id: 3,
    name: "AI Prompt Engineering",
    category: "AI Fejlesztés",
    description:
      "Professzionális prompt engineering szolgáltatás, amely optimalizálja az AI modellek teljesítményét és biztosítja a konzisztens kimeneteket.",
    color: "from-[#5B21B6] to-[#7C3AED]",
    features: [
      "Prompt optimalizálás",
      "AI model tuning",
      "Kimenet minőségbiztosítás",
      "Batch processing",
    ],
    href: "/szolgaltatasok/ai-prompt-engineering",
  },
];

const benefits = [
  {
    title: "Hatékonyság Növelése",
    description:
      "Automatizálja az ismétlődő feladatokat és növelje a termelékenységet akár 300%-kal.",
  },
  {
    title: "Időmegtakarítás",
    description:
      "Csökkentse a manuális munkaidőt és fókuszáljon a stratégiai feladatokra.",
  },
  {
    title: "Hibamentes Működés",
    description:
      "AI rendszerek minimalizálják a hibákat és biztosítják a konzisztens minőséget.",
  },
  {
    title: "Skálázhatóság",
    description:
      "Növelje a kapacitást extra erőforrások nélkül, automatizált rendszerekkel.",
  },
];

const faqData = [
  {
    question: "Milyen AI technológiákat használsz az automatizációhoz?",
    answer:
      "ChatGPT, Claude, Groq LLM és egyedi AI modelleket integrálok a munkafolyamatokba. Az adatbázis szinkronizációhoz Firebase Firestore-t használom, ami lehetővé teszi a valós idejű adatkezelést és a zökkenőmentes AI válaszokat.",
  },
  {
    question: "Hogyan működik az AI workflow automatizáció?",
    answer:
      "A workflow tervezés során az üzleti folyamatokat elemzem, majd AI modellekkel automatizálom az ismétlődő feladatokat. Például: email marketing automatizáció, ügyfélszolgálati válaszgenerálás, tartalomgyártás és adatelemzés. Minden rendszer valós idejű monitorozással rendelkezik.",
  },
  {
    question: "Mennyibe kerül egy AI megoldás implementálása?",
    answer:
      "Az árazás a projekt komplexitásától és az igényeiktől függ. Egyedi munkafolyamat-tervezés, AI integrációk és automatizációs rendszerek — mindegyik egyedi árajánlat alapján. Ingyenes konzultáció keretében pontos költségbecslést készítek.",
  },
  {
    question: "Hogyan integrálhatom az AI megoldásokat a meglévő rendszerembe?",
    answer:
      "A legtöbb AI megoldás kompatibilis a meglévő technológiákkal. WordPress, WooCommerce, Shopify, és egyedi Next.js rendszerek esetén API integrációkat használok, amelyek zökkenőmentes csatlakozást biztosítanak. Rendszerköri függetlenség garancia.",
  },
];

export default function AIMSolutionsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] text-[#0F172A] dark:text-[#F8FAFC]">
      {/* ── JSON-LD Sémák — SSOT: structuredData.ts, XSS-védetten (K-01, K-03 fix) ── */}

      {/* BreadcrumbList — navigációs hierarchia AI-keresők számára */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Főoldal", item: "https://webdude.hu" },
              { "@type": "ListItem", position: 2, name: "AI Megoldások", item: "https://webdude.hu/ai-megoldasok" },
            ],
          }),
        }}
      />

      {/* Person — Balog Norbert E-E-A-T entitás (SSOT, /#person) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(CANONICAL_PERSON_ENTITY) }}
      />

      {/* Service — AI Automatizáció szolgáltatás (provider: Organization @id referencia) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd({
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": "https://webdude.hu/ai-megoldasok#service",
            name: "Vállalati AI Automatizáció és Egyedi Prompt Tervezés",
            description:
              "AI munkafolyamatok, egyedi AI ügynökök, üzleti automatizáció és prompt engineering KKV-knak a manuális adminisztráció kiváltására és a lead-generálás skálázására — 26 év tapasztalattal, egyedi árajánlat alapján.",
            provider: {
              "@type": "Organization",
              "@id": "https://webdude.hu/#organization",
            },
            url: "https://webdude.hu/ai-megoldasok",
            serviceType: ["AI Workflow Automatizáció", "Prompt Engineering", "AI Kép- és Videógenerálás"],
            areaServed: { "@type": "Country", name: "Hungary" },
          }),
        }}
      />

      {/* FAQPage — oldal-specifikus GYIK sémák (AEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqData.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      {/* Hero Section with Banner */}
      <section className="relative min-h-140 md:min-h-160 overflow-hidden bg-[#F8FAFC] dark:bg-[#0B1120] border-b border-slate-200/80 dark:border-white/10 flex items-center">
        <HeroBackdrop
          src="/assets/banners/hero-ai-megoldasok.webp"
          alt="Vállalati AI Automatizáció és Egyedi Prompt Tervezés"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-grid-mesh opacity-25 dark:opacity-35 z-0"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:py-32 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/85 dark:bg-white/6 border border-[#0369A1]/25 dark:border-white/15 dark:border-t-white/25 backdrop-blur-md mb-6 shadow-[0_6px_18px_rgba(3,105,161,0.08)] dark:shadow-none">
              <span
                className="w-2 h-2 rounded-full bg-[#0369A1] dark:bg-[#00B5F1]"
                aria-hidden="true"
              />
              <span className="eyebrow-badge text-[#0369A1] dark:text-[#00B5F1]">
                AI & Automatizáció
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-[#0F172A] dark:text-white">
              Vállalati AI Automatizáció és
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0369A1] to-[#6D28D9] dark:from-[#00B5F1] dark:to-[#A78BFA]"> Egyedi Prompt Tervezés</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#334155] dark:text-slate-300 mb-8 leading-relaxed">
              26 év grafikai és 16 év webfejlesztői tapasztalat. Egyedi AI
              munkafolyamatok, amelyek skálázhatóvá teszik a vállalkozásodat.
            </p>
            <Link
              href="/kapcsolat"
              className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369A1] hover:to-[#6D28D9] text-white font-semibold uppercase tracking-wider text-sm rounded-full transition-all hover:scale-[1.03] shadow-[0_8px_28px_rgba(7,89,133,0.4)]"
            >
              Egyedi árajánlat kérése
            </Link>
          </div>
        </div>
      </section>

      {/* GEO Direct Answer blokk — a Hero alá */}
      <Surface tone="night-lift" className="py-4">
        <DirectAnswerBlock
          id="ai-megoldasok-hero"
          question="Mit csinál a WebDude AI Megoldások oldalon, kinek és milyen eredménnyel?"
          answer="AI munkafolyamatok, egyedi AI ügynökök, üzleti automatizáció és prompt engineering KKV-knak a manuális adminisztráció kiváltására és a lead-generálás skálázására, egyedi árajánlat kérése mellett."
        />
      </Surface>

      {/* Benefits Section - Bento Grid */}
      <Surface tone="night" aurora className="py-24 md:py-28 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-[#0F172A] dark:text-white">
              Miért <span className="text-[#0369A1] dark:text-[#00B5F1]">AI Automatizáció</span>?
            </h2>
            <p className="text-[#334155] dark:text-slate-300 text-xl max-w-2xl mx-auto">
              Üzleti előnyök, amelyek komoly mérhető eredményeket hoznak
            </p>
          </div>

          <AIBenefitsGrid benefits={benefits} />
        </div>
      </Surface>

      {/* AI Solutions Grid */}
      <Surface tone="slate-lift" aurora grid className="py-24 md:py-28 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-[#0F172A] dark:text-white">
              AI <span className="text-[#0369A1] dark:text-[#00B5F1]">Megoldások</span>
            </h2>
            <p className="text-[#334155] dark:text-slate-300 text-xl max-w-2xl mx-auto">
              Automatizált AI rendszerek, amelyek időt és pénzt takarítanak meg
              a KKV-knak. ChatGPT, Claude és egyedi AI megoldások.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {aiSolutions.map((solution) => (
              <AIFeatureCard key={solution.id} {...solution} />
            ))}
          </div>
        </div>
      </Surface>

      {/* FAQ Section */}
      <Surface tone="night" aurora className="py-24 md:py-28 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-[#0F172A] dark:text-white">
              <span className="text-[#0369A1] dark:text-[#00B5F1]">Gyakori</span> Kérdések
            </h2>
            <p className="text-[#334155] dark:text-slate-300 text-xl max-w-2xl mx-auto">
              Minden, amit tudnod kell az AI automatizációról
            </p>
          </div>

          <AIFAQSection faqData={faqData} />
        </div>
      </Surface>

      {/* CTA Section */}
      <Surface tone="night-lift" aurora className="py-24 md:py-28 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center luminous-card p-10 md:p-14">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold text-[#0F172A] dark:text-white">
              Készen állsz az <span className="text-[#0369A1] dark:text-[#00B5F1]">AI</span>{" "}
              automatizációra?
            </h2>
            <p className="text-[#334155] dark:text-slate-300 text-xl max-w-2xl mx-auto">
              Ingyenes konzultáció keretében közösen találjuk meg a legjobb AI
              megoldást a vállalkozásod üzleti igényeire.
            </p>
            <Link
              href="/kapcsolat"
              className="inline-flex items-center gap-2 px-10 py-4 bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369A1] hover:to-[#6D28D9] text-white font-semibold uppercase tracking-wider text-sm rounded-full transition-all hover:scale-[1.03] shadow-[0_8px_28px_rgba(7,89,133,0.4)]"
            >
              Egyedi árajánlat kérése
            </Link>
          </div>
        </div>
      </Surface>
    </div>
  );
}
