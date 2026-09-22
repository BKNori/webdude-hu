import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { FileText, Settings, Search, BarChart3, Link2, TrendingUp, ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import { buildBreadcrumbSchema, BreadcrumbItem } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: "SEO szakember Kecskemét | Technikai SEO és tartalom | WebDude",
  description:
    "Technikai SEO audit, kulcsszókutatás, tartalomstratégia és helyi SEO vállalkozásoknak. Tudd meg, mi akadályozza a weboldalad jobb Google-helyezését.",
  keywords:
    "SEO optimalizálás, keresőoptimalizálás, technikai SEO, tartalomstratégia, Google helyezés javítás, SEO szakember Kecskemét, organikus forgalom",
  openGraph: {
    title: "SEO szakember Kecskemét | Technikai SEO és tartalom | WebDude",
    description:
      "Technikai SEO audit, kulcsszókutatás, tartalomstratégia és helyi SEO vállalkozásoknak.",
    type: "website",
    locale: "hu_HU",
    siteName: "WebDude",
  },
  alternates: {
    canonical: "https://webdude.hu/szolgaltatasok/seo-optimalizalas",
  },
};

export const revalidate = 3600;

export default async function SEOOptimizationPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Főoldal", url: "/" },
    { name: "Szolgáltatások", url: "/szolgaltatasok" },
    { name: "SEO Optimalizálás", url: "/szolgaltatasok/seo-optimalizalas" },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "SEO Optimalizálás",
    description:
      "Technikai SEO audit, kulcsszókutatás, tartalomstratégia és helyi SEO vállalkozásoknak.",
    provider: {
      "@type": "Organization",
      "@id": "https://webdude.hu/#organization",
      name: "WebDude",
      url: "https://webdude.hu",
    },
    areaServed: { "@type": "Country", name: "Hungary" },
  };

  const features = [
    {
      title: "On-page SEO",
      description: "Meta adatok, heading struktúra, URL és tartalom optimalizálás.",
      icon: FileText,
    },
    {
      title: "Technikai SEO",
      description: "Sebesség optimalizálás, mobilbarát design és Core Web Vitals javítás.",
      icon: Settings,
    },
    {
      title: "Kulcsszó kutatás",
      description: "Releváns keresési szándék elemzés és stratégiai kulcsszótervezés.",
      icon: Search,
    },
    {
      title: "Tartalomstratégia",
      description: "SEO-barát tartalom tervezése keresőknek és látogatóknak.",
      icon: BarChart3,
    },
    {
      title: "Helyi SEO (Local)",
      description: "Google Cégem (GMB) optimalizálás, hogy a környékbeliek rád találjanak.",
      icon: Link2,
    },
    {
      title: "Analytics és reporting",
      description: "Részletes SEO analitika és átlátható teljesítmény-mérés.",
      icon: TrendingUp,
    },
  ];

  const faqs = [
    {
      question: "Miért nem jönnek érdeklődők a weboldalamról?",
      answer: "A legtöbb weboldal nem a felhasználó keresési szándékára (search intent) épül, vagy súlyos technikai SEO hibái vannak (pl. rossz sebesség, hibás indexelés). Az audit során pontosan kiderítem az okokat."
    },
    {
      question: "Mit tartalmaz a SEO audit?",
      answer: "Egy több mint 40 pontos technikai vizsgálatot, kulcsszó- és konkurencia elemzést, valamint a tartalom minőségének értékelését. Az eredmény egy átlátható, priorizált feladatlista, ami lépésről-lépésre javítja a helyezésed."
    },
    {
      question: "Mennyi idő alatt lesz eredménye a SEO-nak?",
      answer: "A technikai hibák (pl. sebesség, indexelési gondok) javítása azonnali ugrást eredményezhet. A tartalmi optimalizálás és a stabil, új organikus forgalom kiépítése jellemzően 3-6 hónap folyamatos, tudatos munkát igényel."
    }
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
            label="SEO Optimalizálás"
            title={
              <>
                SEO, ami nem csak látogatókat, hanem{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#5B21B6] italic">
                  releváns érdeklődőket
                </span>{" "}
                hoz
              </>
            }
            subtitle="A SEO nem néhány kulcsszó elhelyezését jelenti. Megvizsgálom a weboldalad technikai állapotát, tartalmi szerkezetét, keresési szándékait és konverziós útvonalait, majd priorizált javítási tervet készítek."
            cta1="Ingyenes SEO konzultáció"
            cta1Link="/kapcsolat"
            cta2="Munkák megtekintése"
            cta2Link="/munkak"
            fullHeight={false}
          />
        </div>

        <section className="py-24 relative overflow-hidden z-10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                SEO Szolgáltatásaim KKV-knak
              </h2>
              <p className="text-lg text-slate-400">
                Mindent egy kézben: a technikai beállításoktól a tartalmi stratégiáig.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="bg-slate-900/60 backdrop-blur-md p-8 rounded-2xl border border-slate-800 hover:border-[#00B5F1]/40 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-950 border border-[#00B5F1]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-[#00B5F1]" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 text-sm">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Mikro-GYIK (AEO) ── */}
        <section className="py-24 bg-slate-900/40 border-t border-slate-800 relative z-10">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Gyakori kérdések (AEO)</h2>
              <p className="text-slate-400">Közvetlen válaszok a legfontosabb SEO kérdésekre.</p>
            </div>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-slate-900/80 border border-white/5 rounded-2xl p-6 hover:border-[#00B5F1]/20 transition-colors">
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

        <section className="py-32 text-center relative z-10">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Nézzük meg a <span className="text-[#00B5F1] italic">Te</span> weboldaladat is?
            </h2>
            <p className="text-slate-400 mb-10 text-lg">
              Kérj egy SEO audiot, és derítsük ki, miért nem hoz elég érdeklődőt az oldalad.
            </p>
            <Link
              href="/kapcsolat"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-slate-950 bg-linear-to-r from-[#00B5F1] to-[#5B21B6] hover:shadow-[0_8px_32px_rgba(0,181,241,0.35)] transition-all duration-300"
            >
              Kapcsolat <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
