import React from "react";
import Link from "next/link";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/molecules/ServiceCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Szolgáltatások – WebDude | Weboldal Készítés, SEO, AI Automatizáció",
  description:
    "26 év tapasztalattal: egyedi weboldal készítés, SEO optimalizálás, AI automatizáció és grafikai tervezés KKV-knak. Ingyenes konzultáció. Növelje az ügyfélszerzést!",
  keywords:
    "weboldal készítés, SEO optimalizálás, AI automatizáció, grafikai tervezés, WordPress fejlesztés, webshop készítés, marketing lead generálás, KKV digitális megoldások",
  alternates: {
    canonical: "https://webdude.hu/szolgaltatasok",
  },
  openGraph: {
    title:
      "Szolgáltatások – WebDude | Weboldal Készítés, SEO, AI Automatizáció",
    description:
      "26 év tapasztalattal: egyedi weboldal készítés, SEO optimalizálás, AI automatizáció és grafikai tervezés KKV-knak. Ingyenes konzultáció.",
    url: "https://webdude.hu/szolgaltatasok",
    type: "website",
    locale: "hu_HU",
    siteName: "WebDude",
    images: [
      {
        url: "/assets/banners/szeged-terkozeves.webp",
        width: 1920,
        height: 1080,
        alt: "WebDude Szolgáltatások",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Szolgáltatások – WebDude | Weboldal Készítés, SEO, AI Automatizáció",
    description:
      "26 év tapasztalattal: egyedi weboldal készítés, SEO optimalizálás, AI automatizáció és grafikai tervezés KKV-knak.",
    images: ["/assets/banners/szeged-terkozeves.webp"],
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

export default async function ServicesPage() {
  const services = [
    {
      title: "Weboldal Készítés",
      icon: "Globe",
      description:
        "KKV-k és magánvállalkozók számára tervezett egyedi weboldalak. WordPress, React, Next.js, Node.js, statikus HTML és landing page fejlesztés. Mobilbarát, SEO-optimalizált és gyors megoldások.",
      tags: [
        "WordPress",
        "React",
        "Next.js",
        "Node.js",
        "HTML",
        "Landing Page",
      ],
      link: "/szolgaltatasok/weboldal-keszites",
    },
    {
      title: "WordPress Webshop",
      icon: "ShoppingCart",
      description:
        "WooCommerce alapú webshopok készítése, amelyek növelik az online eladásokat és egyszerűsítik a vásárlói élményt. Biztonságos fizetési rendszerek és készletkezelés.",
      tags: ["E-commerce", "Sales", "WooCommerce"],
      link: "/szolgaltatasok/woocommerce-webshop-keszites",
    },
    {
      title: "Webshop Fejlesztés",
      icon: "ShoppingBag",
      description:
        "E-kereskedelmi platformok készítése (WooCommerce, Shopify, egyedi), amelyek növelik az online eladásokat. Modern UX, gyors betöltés és konverzió-fókuszú design.",
      tags: ["E-commerce", "Sales", "UX"],
      link: "/szolgaltatasok/webshop-fejlesztes",
    },

    {
      title: "SEO Optimalizálás",
      icon: "Target",
      description:
        "Keresőoptimalizálás és tartalomstratégia, amely növeli a Google helyezéseket és organikus forgalmat. Technikai SEO, on-page SEO és tartalommarketing.",
      tags: ["SEO", "Organikus", "Helyezés"],
      link: "/szolgaltatasok/seo-optimalizalas",
    },
    {
      title: "Marketing Lead Generálás",
      icon: "TrendingUp",
      description:
        "Stratégiai marketing eszközök és landing oldalak, amelyek automatizálják az ügyfélszerzést és növelik a lead-eket. CRO optimalizálás és konverzió növelés.",
      tags: ["Lead Gen", "Landing Page", "Automatizáció"],
      link: "/szolgaltatasok/marketing-lead-generalas",
    },
    {
      title: "Grafikai Tervezés",
      icon: "Palette",
      description:
        "Professzionális grafikai tervezés weboldalakhoz, marketing anyagokhoz és közösségi médiához. Vektoros logók, prospektusok és teljes arculati tervezés.",
      tags: ["Design", "Branding", "Marketing"],
      link: "/szolgaltatasok/grafikai-tervezes",
    },
    {
      title: "Egyedi Arculattervezés",
      icon: "PenTool",
      description:
        "Egyedi arculattervezés és logó tervezés, amelyek erősítik a márka identitást és növelik a felismerhetőséget. Brand guideline dokumentumok és vizuális identitás.",
      tags: ["Branding", "Logó", "Identitás"],
      link: "/szolgaltatasok/egyedi-arculattervezes-logo",
    },
    {
      title: "AI Workflow Kialakítás",
      icon: "Bot",
      description:
        "AI alapú automatizációs rendszerek és workflow kialakítás, amelyek időt és pénzt takarít meg a KKV-knak. ChatGPT és Claude integráció.",
      tags: ["AI", "Automatizáció", "Workflow"],
      link: "/szolgaltatasok/ai-workflow-kialakitas",
    },
    {
      title: "AI Kép- és Videógenerálás",
      icon: "Video",
      description:
        "AI alapú kép- és videógenerálás marketing anyagokhoz, social media tartalmakhoz és weboldalakhoz. Midjourney, DALL-E és Runway ML.",
      tags: ["AI Art", "Generálás", "Marketing"],
      link: "/szolgaltatasok/ai-kep-es-videogeneralas",
    },
    {
      title: "AI Prompt Engineering",
      icon: "Sparkles",
      description:
        "Professzionális prompt engineering szolgáltatás, amely optimalizálja az AI modellek teljesítményét és biztosítja a konzisztens kimeneteket.",
      tags: ["AI", "Prompt", "Optimalizálás"],
      link: "/szolgaltatasok/ai-prompt-engineering",
    },
    {
      title: "Vírusirtás & Biztonság",
      icon: "ShieldAlert",
      description:
        "WordPress vírusirtás, biztonsági mentések és havi karbantartás, hogy a weboldal mindig biztonságos és gyors legyen. SSL tanúsítvány és biztonsági audit.",
      tags: ["Biztonság", "Backup", "Support"],
      link: "/szolgaltatasok/wordpress-virusirtas-es-biztonsag",
    },
    {
      title: "Rendszerfejlesztés",
      icon: "Code",
      description:
        "Egyedi szoftverfejlesztés és alkalmazásfejlesztés, amelyek megoldják az üzleti problémákat és automatizálják a folyamatokat. Backend, frontend és API integrációk.",
      tags: ["Szoftver", "Backend", "Frontend"],
      link: "/szolgaltatasok/rendszerfejlesztes",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "WebDude Digitális Szolgáltatások",
    description:
      "Prémium digitális szolgáltatások: egyedi weboldal fejlesztés, profi grafikai tervezés, AI prompt engineering és SEO optimalizálás.",
    provider: {
      "@type": "Person",
      name: "Norbi (WebDude)",
      url: "https://webdude.hu",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digitális Szolgáltatások",
      itemListElement: services.map((service, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
        },
        position: index + 1,
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Mennyibe kerül egy weboldal?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Egyedi árazás a projekt igényei szerint. Ingyenes konzultáció a pontos árhoz.",
        },
      },
      {
        "@type": "Question",
        name: "Mennyi idő alatt készül el?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Egyszerű weboldal: 1-2 hét. Webshop: 2-4 hét. Egyedi projekt: egyedi időzítés. Minden projekt egyedi, de mindig határidőre.",
        },
      },
      {
        "@type": "Question",
        name: "Kell-e havidíjat fizetni?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nem. Kész projekt esetén egyszeri fizetés. Karbantartás és támogatás opcionális havidíjjal. Nincs rejtett költség.",
        },
      },
      {
        "@type": "Question",
        name: "Miért érdemes engem választani?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "26 év tapasztalat, közvetlen kommunikáció (nincs projektmenedzser), egyedi árazás, határidőre kész projektek, 95+ Lighthouse score.",
        },
      },

      {
        "@type": "Question",
        name: "Milyen technológiákat használok?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "WordPress, WooCommerce, Next.js, React, Node.js, Firebase. A technológia a projekthez igazodik. Minden projekt modern és biztonságos.",
        },
      },
    ],
  };

  return (
    <main className="bg-bg-base text-text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />
      <Hero
        label="KKV & Marketing Szolgáltatások"
        title={
          <>
            Növelje az{" "}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-brand-primary to-cta-to italic">
              Ügyfélszerzést
            </span>{" "}
            <br /> Weboldallal és AI-val
          </>
        }
        subtitle="Kis- és középvállalkozások számára tervezett digitális megoldások, amelyek automatizálják a marketinget és növelik a konverziót."
        cta1="Ingyenes konzultáció"
        cta1Link="/kapcsolat"
        cta2="Munkák megtekintése"
        cta2Link="/munkak"
        fullHeight={true}
        backgroundImage="/assets/banners/szeged-terkozeves.webp"
      />

      {/* Social Proof Section */}
      <section className="py-24 bg-bg-surface border-y border-slate-700">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="bg-bg-elevated border border-slate-600 rounded-2xl p-8 shadow-[0_8px_24px_rgba(15,23,42,0.3)] hover:border-brand-primary/50 hover:shadow-[0_20px_60px_rgba(0, 181, 241,0.2)] hover:-translate-y-1 transition-all duration-300 group">
              <span className="text-5xl font-black font-serif block mb-3 text-text-primary group-hover:text-brand-primary tracking-tight">
                26+
              </span>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400">
                Év Tapasztalat
              </p>
            </div>
            <div className="bg-bg-elevated border border-slate-600 rounded-2xl p-8 shadow-[0_8px_24px_rgba(15,23,42,0.3)] hover:border-brand-primary/50 hover:shadow-[0_20px_60px_rgba(0, 181, 241,0.2)] hover:-translate-y-1 transition-all duration-300 group">
              <span className="text-5xl font-black font-serif block mb-3 text-text-primary group-hover:text-brand-primary tracking-tight">
                200+
              </span>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400">
                Projekt Készítve
              </p>
            </div>
            <div className="bg-bg-elevated border border-slate-600 rounded-2xl p-8 shadow-[0_8px_24px_rgba(15,23,42,0.3)] hover:border-brand-primary/50 hover:shadow-[0_20px_60px_rgba(0, 181, 241,0.2)] hover:-translate-y-1 transition-all duration-300 group">
              <span className="text-5xl font-black font-serif block mb-3 text-text-primary group-hover:text-brand-primary tracking-tight">
                500+
              </span>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400">
                Lead Generált
              </p>
            </div>
            <div className="bg-bg-elevated border border-slate-600 rounded-2xl p-8 shadow-[0_8px_24px_rgba(15,23,42,0.3)] hover:border-brand-primary/50 hover:shadow-[0_20px_60px_rgba(0, 181, 241,0.2)] hover:-translate-y-1 transition-all duration-300 group">
              <span className="text-5xl font-black font-serif block mb-3 text-text-primary group-hover:text-brand-primary tracking-tight">
                95+
              </span>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400">
                Lighthouse Score
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-40 bg-bg-surface relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-32">
            <div className="inline-block relative pl-6 mb-8">
              <span className="text-xs uppercase font-black tracking-[0.3em] text-brand-primary mb-2 block">
                Digitális Szolgáltatásaink
              </span>
              <div className="absolute left-0 top-0 w-1 h-6 bg-brand-primary" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold font-sans text-text-primary leading-tight tracking-tight">
              Miben tudok{" "}
              <span className="text-brand-primary italic">segíteni</span>?
            </h2>
            <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed mx-auto tracking-wide font-medium">
              KKV-k és magánvállalkozók számára tervezett szolgáltatások,
              amelyek növelik az ügyfélszerzést, automatizálják a marketinget és
              erősítik a márka jelenlétét.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-20">
            {services.map((s, i) =>
              s.link ? (
                <Link key={i} href={s.link}>
                  <ServiceCard {...s} index={i} />
                </Link>
              ) : (
                <ServiceCard key={i} {...s} index={i} />
              )
            )}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-40 bg-bg-surface border-t border-slate-700">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-block relative pl-6 mb-8">
              <span className="text-xs uppercase font-black tracking-[0.3em] text-brand-primary mb-2 block">
                Folyamat
              </span>
              <div className="absolute left-0 top-0 w-1 h-6 bg-brand-primary" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold font-sans text-text-primary leading-tight tracking-tight">
              Hogyan <span className="text-brand-primary italic">dolgozom</span>?
            </h2>
            <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed mx-auto tracking-wide font-medium">
              Átlátható folyamat, eredményorientált megközelítés. Nincs
              projektmenedzser, közvetlen kommunikáció velem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Ingyenes Konzultáció",
                description:
                  "Ismerkedünk, megbeszéljük a célokat és a lehetőségeket.",
              },
              {
                step: "02",
                title: "Tervezés & Stratégia",
                description:
                  "Készítek egy részletes tervet, árazást és időzítést.",
              },
              {
                step: "03",
                title: "Fejlesztés & Implementáció",
                description: "Elkezdöm a munkát, rendszeres frissítésekkel.",
              },
              {
                step: "04",
                title: "Kézbesítés & Támogatás",
                description:
                  "Átadom a kész projektet, és biztosítom a támogatást.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-bg-elevated border border-slate-600 rounded-2xl p-8 shadow-[0_8px_24px_rgba(15,23,42,0.3)] hover:border-brand-primary/50 hover:shadow-[0_20px_60px_rgba(0, 181, 241,0.2)] hover:-translate-y-1 transition-all duration-300 group"
              >
                <span className="text-6xl font-black font-serif block mb-4 text-brand-primary/30 group-hover:text-brand-primary/50 transition-colors tracking-tight">
                  {item.step}
                </span>
                <h3 className="text-xl font-bold text-text-primary mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed tracking-wide font-medium">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-40 bg-bg-surface border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-block relative pl-6 mb-8">
              <span className="text-xs uppercase font-black tracking-[0.3em] text-brand-primary mb-2 block">
                Gyakori Kérdések
              </span>
              <div className="absolute left-0 top-0 w-1 h-6 bg-brand-primary" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold font-sans text-text-primary leading-tight tracking-tight">
              Mennyibe kerül{" "}
              <span className="text-brand-primary italic">egy weboldal</span>?
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "Mennyibe kerül egy weboldal?",
                answer:
                  "Egyedi árazás a projekt igényei szerint. Ingyenes konzultáció a pontos árhoz.",
              },
              {
                question: "Mennyi idő alatt készül el?",
                answer:
                  "Egyszerű weboldal: 1-2 hét. Webshop: 2-4 hét. Egyedi projekt: egyedi időzítés. Minden projekt egyedi, de mindig határidőre.",
              },
              {
                question: "Kell-e havidíjat fizetni?",
                answer:
                  "Nem. Kész projekt esetén egyszeri fizetés. Karbantartás és támogatás opcionális havidíjjal. Nincs rejtett költség.",
              },
              {
                question: "Miért érdemes engem választani?",
                answer:
                  "26 év tapasztalat, közvetlen kommunikáció (nincs projektmenedzser), egyedi árazás, határidőre kész projektek, 95+ Lighthouse score.",
              },

              {
                question: "Milyen technológiákat használok?",
                answer:
                  "WordPress, WooCommerce, Next.js, React, Node.js, Firebase. A technológia a projekthez igazodik. Minden projekt modern és biztonságos.",
              },
            ].map((faq, index) => (
              <details
                key={index}
                className="bg-slate-900/80 border border-slate-700 rounded-2xl overflow-hidden group hover:border-brand-primary/50 transition-colors"
              >
                <summary className="cursor-pointer p-6 flex items-center justify-between hover:bg-brand-primary/5 transition-colors">
                  <span className="text-lg font-bold text-text-primary tracking-tight">
                    {faq.question}
                  </span>
                  <span className="text-brand-primary text-2xl group-open:rotate-45 transition-transform duration-300">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-6 pt-0">
                  <p className="text-slate-400 leading-relaxed tracking-wide font-medium">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 text-center bg-bg-surface border-t border-slate-800 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto space-y-10">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold font-sans text-text-primary leading-tight tracking-tight">
              Készen állsz a{" "}
              <span className="text-brand-primary italic">következő</span>{" "}
              szintre?
            </h2>
            <p className="text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed mx-auto tracking-wide font-medium">
              Ingyenes konzultáció, átlátható árazás, határidőre kész projektek.
              Nincs projektmenedzser, közvetlen kommunikáció velem.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/kapcsolat"
                className="px-8 py-4 bg-linear-to-r from-brand-primary to-cta-to hover:from-cta-to hover:to-brand-primary text-slate-950 rounded-full font-bold hover:scale-105 active:scale-95 transition-transform duration-300 shadow-[0_8px_24px_rgba(0, 181, 241,0.3)] hover:shadow-[0_18px_40px_rgba(0, 181, 241,0.4)] min-h-11 min-w-11 inline-block tracking-wide"
              >
                Ingyenes Konzultáció
              </Link>
              <Link
                href="/munkak"
                className="px-8 py-4 border border-slate-700 text-text-primary font-semibold rounded-full hover:border-brand-primary/50 hover:text-brand-primary bg-slate-900/50 backdrop-blur-sm transition-all duration-300 tracking-wide"
              >
                Munkák megtekintése
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
