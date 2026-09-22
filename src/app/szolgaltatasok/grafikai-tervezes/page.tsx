import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { PenTool, Layers, ArrowRight, MousePointerClick } from "lucide-react";
import Hero from "@/components/Hero";
import PricingTable, { PricingTier } from "@/components/molecules/PricingTable";
import { buildBreadcrumbSchema, BreadcrumbItem } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: "Grafikai tervezés és arculattervezés Kecskemét | WebDude",
  description:
    "Logó, arculat, marketinganyagok és digitális grafikai tervezés egységes vizuális rendszerben. 26 év grafikai tapasztalat a WebDude-tól.",
  keywords:
    "grafikai tervezés, arculattervezés, logó tervezés, webdesign, UI/UX tervezés, marketing grafika, Kecskemét",
  alternates: {
    canonical: "https://webdude.hu/szolgaltatasok/grafikai-tervezes",
  },
  openGraph: {
    title: "Grafikai tervezés és arculattervezés Kecskemét | WebDude",
    description:
      "Logó, arculat, marketinganyagok és digitális grafikai tervezés egységes vizuális rendszerben.",
    type: "website",
    locale: "hu_HU",
    siteName: "WebDude",
  },
};

export const revalidate = 3600;

export default function GrafikaiTervezesPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Főoldal", url: "/" },
    { name: "Szolgáltatások", url: "/szolgaltatasok" },
    { name: "Grafikai tervezés", url: "/szolgaltatasok/grafikai-tervezes" },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Grafikai tervezés és arculattervezés",
    description:
      "Logó, arculat, marketinganyagok és digitális grafikai tervezés egységes vizuális rendszerben.",
    provider: {
      "@type": "Organization",
      "@id": "https://webdude.hu/#organization",
      name: "WebDude",
      url: "https://webdude.hu",
    },
    areaServed: { "@type": "Country", name: "Hungary" },
  };

  const faqs = [
    {
      question: "Miért fontos az egységes arculat egy vállalkozásnak?",
      answer: "Az egységes arculat (színek, tipográfia, logó) bizalmat épít és profizmust sugároz. Ha a weboldalad, a névjegykártyád és a Facebook posztjaid vizuálisan koherensek, a vásárlók könnyebben felismernek és megbízhatóbbnak tartanak.",
    },
    {
      question: "Kapsz vektoros forrásfájlokat a logóhoz?",
      answer: "Igen. A logó átadásakor nem csak JPG vagy PNG formátumot kapsz, hanem teljes vektoros (AI, EPS, SVG, PDF) fájlcsomagot, így a jövőben óriásplakátra is nyomtatható lesz minőségromlás nélkül.",
    },
    {
      question: "Nyomdai előkészítést is vállalsz?",
      answer: "26 év grafikai és nyomdai tapasztalattal a hátam mögött pontosan tudom, milyen kifutókra, CMYK színterekre és PDF beállításokra van szükség. Bármilyen szórólap, névjegykártya vagy molinó nyomdakész anyagát elkészítem.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const tiers: PricingTier[] = [
    {
      id: "logo-only",
      name: "Logó & Arculati Alapok",
      description: "Induló vállalkozásoknak, akik egy profi és felismerhető emblémára vágynak.",
      features: [
        "2-3 db egyedi logó koncepció",
        "Színpaletta és betűtípus meghatározása",
        "Korrektúrakörök a finomhangoláshoz",
        "Vektoros forrásfájlok (SVG, PDF, EPS)",
        "Közösségi média profilképek",
        "Favicon a weboldalhoz"
      ],
      highlighted: false,
      ctaText: "Egyedi árajánlat kérése",
      ctaLink: "/kapcsolat"
    },
    {
      id: "full-brand",
      name: "Teljes KisArculat",
      description: "Komplett vizuális identitás, amivel magabiztosan léphetsz a piacra.",
      features: [
        "Minden a Logó csomagból",
        "Névjegykártya tervezés (nyomdakész)",
        "Levélpapír és boríték dizájn",
        "Facebook / LinkedIn borítókép",
        "Arculati kézikönyv (Brand Guidelines)",
        "Social média poszt sablonok (3 db)"
      ],
      highlighted: true,
      ctaText: "Egyedi árajánlat kérése",
      ctaLink: "/kapcsolat"
    },
    {
      id: "ui-ux",
      name: "Webdesign & UI/UX",
      description: "Komplex felhasználói felületek és szoftverek vizuális tervezése (Figma).",
      features: [
        "Drótváz (Wireframe) tervezés",
        "Pixepontos UI/UX design (Figma)",
        "Prototípus és animációs tervek",
        "Reszponzív (mobil-tablet-desktop) nézetek",
        "Design System létrehozása fejlesztőknek",
        "Konverzió-optimalizált (CRO) felépítés"
      ],
      highlighted: false,
      ctaText: "Egyedi árajánlat kérése",
      ctaLink: "/kapcsolat"
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />

      <div className="bg-slate-950 text-text-primary relative overflow-hidden min-h-screen">
        <div className="absolute inset-0 bg-linear-to-b from-[#00B5F1]/5 via-transparent to-[#5B21B6]/5" />
        
        <div className="relative z-10">
          <Hero
            label="Grafikai Tervezés"
            title={
              <>
                Grafikai tervezés, amely{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#5B21B6] italic">
                  felismerhetővé
                </span>{" "}
                teszi a márkádat
              </>
            }
            subtitle="Egy jó arculat nemcsak szép, hanem következetes és könnyen felismerhető. Logót, színvilágot, tipográfiát, közösségi média grafikákat és webes vizuális elemeket tervezek egységes rendszerben."
            cta1="Egyedi árajánlat kérése"
            cta1Link="/kapcsolat"
            cta2="Portfólió"
            cta2Link="/munkak"
            fullHeight={false}
          />
        </div>

        {/* ── Miért a WebDude? (E-E-A-T) ── */}
        <section className="py-24 relative z-10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                26 év vizuális tapasztalat
              </h2>
              <p className="text-slate-400 text-lg">
                Nem most kezdtem ismerkedni a Photoshop-pal. A nyomdai előkészítéstől a modern Figma alapú UI/UX tervezésig minden területen naprakész vagyok.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 hover:border-[#00B5F1]/50 transition-all duration-300">
                <PenTool className="w-10 h-10 text-[#00B5F1] mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">Logó & Arculat</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Vektoros, letisztult logók, amik pólóra hímezve és óriásplakáton is ugyanúgy jól mutatnak.
                </p>
              </div>
              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 hover:border-[#5B21B6]/80 transition-all duration-300">
                <MousePointerClick className="w-10 h-10 text-[#00B5F1] mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">UI/UX Webdesign</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Figma alapú, fejlesztőbarát felülettervek. Design Systemek, drótvázak és animált prototípusok.
                </p>
              </div>
              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 hover:border-[#00B5F1]/50 transition-all duration-300">
                <Layers className="w-10 h-10 text-[#00B5F1] mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">Marketing Grafikák</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Facebook, Instagram posztok, hirdetési bannerek és nyomdakész (CMYK) szórólapok, molinók, névjegykártyák.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Csomagok (Zéró Fix Ár) ── */}
        <section className="py-24 bg-slate-900/40 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Arculat és Webdesign Csomagok
              </h2>
              <p className="text-slate-400 text-lg">
                Az egyszerű logófrissítéstől a komplett brand felépítéséig.
              </p>
            </div>
            
            <PricingTable tiers={tiers} />
          </div>
        </section>

        {/* ── Mikro-GYIK (AEO) ── */}
        <section className="py-24 border-t border-slate-800 relative z-10">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Gyakori kérdések (Design)</h2>
              <p className="text-slate-400">Amiket a legtöbbször kérdeznek a tervezés kapcsán.</p>
            </div>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-slate-900/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 hover:border-[#00B5F1]/30 transition-colors">
                  <h3 className="text-lg font-semibold text-[#00B5F1] mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-32 text-center relative z-10">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Legyen a márkád <span className="text-[#00B5F1] italic">felejthetetlen!</span>
            </h2>
            <p className="text-slate-400 mb-10 text-lg">
              Kérj árajánlatot, és tervezzük meg együtt a vállalkozásod új, profi arcát.
            </p>
            <Link
              href="/kapcsolat"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-slate-950 bg-linear-to-r from-[#00B5F1] to-[#5B21B6] hover:shadow-[0_8px_32px_rgba(0,181,241,0.35)] hover:scale-105 transition-all duration-300"
            >
              Egyedi árajánlat kérése <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
