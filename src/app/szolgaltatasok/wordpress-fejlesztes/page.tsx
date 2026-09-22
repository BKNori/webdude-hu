import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ShieldCheck, Zap, Cog, ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import { buildBreadcrumbSchema, BreadcrumbItem } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: "WordPress fejlesztő vállalkozásoknak | WebDude",
  description:
    "WordPress hibajavítás, egyedi funkciók, sebességoptimalizálás, biztonság és meglévő weboldalak fejlesztése tapasztalt WordPress szakembertől.",
  keywords:
    "WordPress fejlesztés, WordPress hibajavítás, WordPress gyorsítás, WordPress biztonság, WooCommerce fejlesztés, WordPress szakember",
  alternates: {
    canonical: "https://webdude.hu/szolgaltatasok/wordpress-fejlesztes",
  },
  openGraph: {
    title: "WordPress fejlesztés és karbantartás | WebDude",
    description:
      "Meglévő WordPress oldalak és webshopok professzionális javítása, gyorsítása és fejlesztése.",
    type: "website",
    locale: "hu_HU",
    siteName: "WebDude",
  },
};

export const revalidate = 3600;

export default function WordPressDevPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Főoldal", url: "/" },
    { name: "Szolgáltatások", url: "/szolgaltatasok" },
    { name: "WordPress fejlesztés", url: "/szolgaltatasok/wordpress-fejlesztes" },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "WordPress fejlesztés és hibajavítás",
    description:
      "WordPress hibajavítás, egyedi funkciók, sebességoptimalizálás, biztonság és meglévő weboldalak fejlesztése.",
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
      question: "Miért lassú a WordPress weboldalam, és mit tehetünk ellene?",
      answer:
        "A leggyakoribb ok a túl sok felesleges plugin, optimalizálatlan képek és olcsó tárhely. Megvizsgálom az oldaladat, eltávolítom a felesleget, beállítok professzionális gyorsítótárazást (caching) és optimalizálom az adatbázist, hogy elérjük a Lighthouse 90+ pontszámot.",
    },
    {
      question: "Feltörték a weboldalamat. Tudsz segíteni?",
      answer:
        "Igen. Teljes malware- és vírusirtást végzek, visszaállítom a tiszta állapotot, és beállítok olyan biztonsági rétegeket (tűzfal, limitált belépések, sebezhetőség-ellenőrzés), ami megelőzi a jövőbeli támadásokat.",
    },
    {
      question: "Meglévő oldalhoz kell új funkció. Vállalod?",
      answer:
        "Abszolút. Legyen szó WooCommerce webshop integrációról, egyedi űrlapokról, fizetési kapuk (SimplePay, Barion) beépítéséről vagy API kapcsolatokról — stabilan és a meglévő kódbázist tiszteletben tartva fejlesztem le a kért funkciót.",
    },
    {
      question: "Mit tartalmaz a havi WordPress karbantartás?",
      answer:
        "A karbantartási csomag magában foglalja a core, a téma és a pluginok biztonságos frissítését havonta, a heti/napi biztonsági mentések ellenőrzését, a biztonsági naplók felülvizsgálatát, valamint havi 1-2 óra rendelkezésre állást tartalomfrissítésre vagy kisebb javításokra.",
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

  return (
    <>
      {/* ── JSON-LD Sémák (XSS Védett) ── */}
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

      <div className="bg-bg-base text-text-primary relative overflow-hidden">
        {/* Kék-Lila v7.0 háttér */}
        <div className="absolute inset-0 bg-linear-to-b from-[#00B5F1]/5 via-transparent to-[#5B21B6]/5" />
        
        <div className="relative z-10">
          <Hero
            label="WordPress Fejlesztés"
            title={
              <>
                WordPress{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#5B21B6] italic">
                  fejlesztés
                </span>{" "}
                és hibajavítás
              </>
            }
            subtitle="Nem kell új weboldalt készíteni, ha a jelenlegi javítható. Segítek egyedi funkciók fejlesztésében, sebességproblémák, hibák, biztonsági gondok és elavult megoldások kezelésében."
            cta1="Személyre szabott ajánlat"
            cta1Link="/kapcsolat"
            cta2="Szolgáltatások"
            cta2Link="/szolgaltatasok"
            fullHeight={false}
          />
        </div>

        {/* ── E-E-A-T Bento Grid ── */}
        <section className="py-24 relative z-10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Miért bízd rám a WordPress oldaladat?
              </h2>
              <p className="text-slate-400 text-lg">
                16 év webfejlesztői rutinnal (Balog Norbert) nem csak &quot;összekattintom&quot; a pluginokat, hanem értem a mögöttes kódot is.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 hover:border-[#00B5F1]/30 transition-all duration-300">
                <Cog className="w-10 h-10 text-[#00B5F1] mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">Egyedi Funkciók</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Ha a dobozos megoldások nem elegendőek, egyedi pluginokat, WooCommerce kiegészítőket és harmadik féltől származó API integrációkat fejlesztek az oldaladhoz.
                </p>
              </div>
              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 hover:border-[#00B5F1]/30 transition-all duration-300">
                <Zap className="w-10 h-10 text-[#00B5F1] mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">Sebesség (LCP)</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Tudományos megközelítéssel gyorsítom a WordPress-t. Képek optimalizálása, adatbázis tisztítás, fejlett caching és felesleges JS/CSS blokkolása a 90+ Lighthouse pontszámért.
                </p>
              </div>
              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 hover:border-[#00B5F1]/30 transition-all duration-300">
                <ShieldCheck className="w-10 h-10 text-[#00B5F1] mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">Szigorú Biztonság</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Malware irtás, sérülékenységvizsgálat, erősített jelszó-szabályzat, belépési limitálások és biztonsági naplózás. Megvédem az oldaladat a bruteforce és injektálásos támadásoktól.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Mikro-GYIK (AEO) ── */}
        <section className="py-24 bg-slate-900/40 border-t border-slate-800 relative z-10">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Gyakori kérdések (Gyors válaszok)</h2>
              <p className="text-slate-400">A leggyakrabban felmerülő WordPress problémák és megoldásaik.</p>
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

        {/* ── CTA ── */}
        <section className="py-32 text-center relative z-10">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Rendbe rakjuk a <span className="text-[#00B5F1] italic">WordPress</span> oldalad?
            </h2>
            <p className="text-slate-400 mb-10 text-lg">
              Kérj ingyenes projektfelmérést, és 24 órán belül megvizsgálom a weboldalad állapotát.
            </p>
            <Link
              href="/kapcsolat"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-slate-950 bg-linear-to-r from-[#00B5F1] to-[#5B21B6] hover:shadow-[0_8px_32px_rgba(0,181,241,0.35)] transition-all duration-300"
            >
              Kérj felmérést <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
