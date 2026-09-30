import HeroSectionNew from "@/components/organisms/HeroSectionNew";
import SocialProofStrip from "@/components/organisms/SocialProofStrip";
import SystemShowcase from "@/components/organisms/SystemShowcase";
import FeaturedServicesNew from "@/components/organisms/FeaturedServicesNew";
import CaseStudiesBento from "@/components/organisms/CaseStudiesBento";
import WhyChooseMeSection from "@/components/organisms/WhyChooseMeSection";
import FaqSectionAEO from "@/components/organisms/FaqSectionAEO";
import FinalCta from "@/components/organisms/FinalCta";
import { Metadata } from "next";
import { Award, Cpu, Clock } from "lucide-react";
import { getDictionary } from "@/lib/dictionary";
import { buildHuJsonLd, serializeJsonLd } from "@/lib/structuredData";

// ─── SEO Metadata — Ügyfélszerző, problémamegoldó fókusz ────────────────────
export const metadata: Metadata = {
  title: "Weboldal készítés, SEO és WordPress fejlesztés | WebDude",
  description:
    "Weboldal készítés, WordPress fejlesztés, SEO optimalizálás és grafikai tervezés országosan — ügynökségi mellébeszélés nélkül. WebDude: 26 év kreatív és 16 év webfejlesztői tapasztalat online kiszolgálással.",
  keywords: [
    "weboldal készítés országosan",
    "weboldal készítés Magyarország",
    "WordPress fejlesztés",
    "SEO optimalizálás",
    "grafikai tervezés",
    "webshop készítés",
    "WordPress fejlesztő",
    "weboldal készítés ára",
    "SEO szakértő",
    "arculattervezés",
    "WooCommerce fejlesztés",
  ],
  alternates: {
    canonical: "https://webdude.hu",
    languages: {
      "hu-HU": "https://webdude.hu",
      "en-US": "https://webdude.hu/en",
      "x-default": "https://webdude.hu",
    },
  },
  openGraph: {
    title: "WebDude | Weboldal készítés, WordPress, SEO & Grafika",
    description:
      "Weboldal, ami ügyfeleket hoz. 26 év tapasztalat — egy emberrel, mellékesek nélkül. Országos szolgáltatás, online kiszolgálással.",
    url: "https://webdude.hu",
    siteName: "WebDude",
    images: [
      {
        url: "https://webdude.hu/og/webdude-og.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "hu_HU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WebDude | Weboldal készítés, WordPress, SEO & Grafika",
    description:
      "Weboldal, ami ügyfeleket hoz. 26 év tapasztalat — egy emberrel, mellékesek nélkül.",
    images: ["https://webdude.hu/og/webdude-og.jpg"],
  },
};

export default async function Home() {
  const dictionary = await getDictionary("hu");

  // ─── JSON-LD Sémák — SSOT: src/lib/structuredData.ts (Server Component) ────
  // XSS VÉDELEM: a serializeJsonLd alkalmazza a .replace(/</g, '\u003c') védelmet.
  const jsonLdSchemas = buildHuJsonLd(dictionary);

  // Organization, Service, HowTo, FAQPage sémák → src/lib/structuredData.ts

  return (
    <>
      {/* ── JSON-LD Sémák — SSOT: structuredData.ts, XSS-védetten serializálva ── */}
      {jsonLdSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
        />
      ))}

      {/* ── Főoldal szekciók ───────────────────────────────────────────────── */}
      <div className="grow">
        {/* 1. Hero — ügyfélszerző H1, CTA hierarchia */}
        <HeroSectionNew content={dictionary.home.hero} />

        {/* 1.5 Direct Answer Bento Grid — AEO optimalizált "Szakmai Snapshot" */}
        {/* DESIGN NOTE: v7.0 — amber/arany TILOS, kizárólag kék-lila (#00B5F1/#5B21B6) */}
        <section
          aria-label="Szakmai háttér és szakterületek"
          className="max-w-7xl mx-auto px-4 py-12"
        >
          {/* Rejtett H2 — a H1 → H2 → H3 heading-hierarchia fenntartásához */}
          <h2 className="sr-only">{dictionary.home.snapshot.heading}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Kártya — Szakértői Háttér (Balog Norbert E-E-A-T) */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 hover:border-[#00B5F1]/30 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Award
                    className="w-8 h-8 text-[#00B5F1]"
                    aria-hidden="true"
                  />
                  <h3 className="text-[#00B5F1] font-semibold text-lg">
                    {dictionary.bentoGrid.expertise.title}
                  </h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {dictionary.bentoGrid.expertise.content}
                </p>
              </div>
            </div>

            {/* 2. Kártya — Szakterületek (Weboldal, WordPress, SEO, Grafika) */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 hover:border-[#00B5F1]/30 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Cpu className="w-8 h-8 text-[#00B5F1]" aria-hidden="true" />
                  <h3 className="text-[#00B5F1] font-semibold text-lg">
                    {dictionary.bentoGrid.techStack.title}
                  </h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {dictionary.bentoGrid.techStack.content}
                </p>
              </div>
            </div>

            {/* 3. Kártya — Projekt Időzítés & Garancia */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 hover:border-[#00B5F1]/30 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Clock
                    className="w-8 h-8 text-[#00B5F1]"
                    aria-hidden="true"
                  />
                  <h3 className="text-[#00B5F1] font-semibold text-lg">
                    {dictionary.bentoGrid.timeline.title}
                  </h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {dictionary.bentoGrid.timeline.content}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Social Proof Strip — KPI statisztikák + scroll-velocity marquee */}
        <SocialProofStrip content={dictionary.home.proof} />

        {/* 3. System Showcase — scroll-bound animated folyamatábra */}
        <SystemShowcase content={dictionary.home.system} />

        {/* 4. Featured Services — 4 fő (Weboldal, WordPress, SEO, Grafika) + AI másodlagos */}
        <FeaturedServicesNew content={dictionary.home.services} />

        {/* 5. Case Studies — 2 kiemelt esettanulmány KPI számokkal */}
        <CaseStudiesBento content={dictionary.home.cases} />

        {/* 6. Why Choose Me — Balog Norbert E-E-A-T, előnyök */}
        <WhyChooseMeSection content={dictionary.home.why} />

        {/* 7. FAQ AEO — accordion; FAQPage JSON-LD szerveren (structuredData.ts) */}
        <FaqSectionAEO content={dictionary.home.faq} renderSchema={false} />

        {/* 8. Final CTA */}
        <FinalCta content={dictionary.home.finalCta} />
      </div>
    </>
  );
}
