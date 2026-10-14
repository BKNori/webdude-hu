import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";
import {
  Package,
  Layers,
  ArrowRight,
  CheckCircle,
  Star,
  Box,
} from "lucide-react";
import { buildBreadcrumbSchema, BreadcrumbItem } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: "Professzionális Csomagolás Tervezés és Termék Design | WebDude",
  description:
    "Egyedi csomagolás tervezés, termék design, label és doboz tervezés. 26 év grafikai tapasztalat, nyomdai előkészítés, mockup vizualizáció.",
  keywords:
    "csomagolás tervezés, termék design, label tervezés, doboz tervezés, csomagoltatás, termék vizualizáció, nyomdai előkészítés, mockup, országos grafikai tervezés",
  alternates: {
    canonical: "https://webdude.hu/szolgaltatasok/csomagolas-tervezes",
  },
  openGraph: {
    title: "Professzionális Csomagolás Tervezés és Termék Design | WebDude",
    description:
      "Egyedi csomagolás tervezés, termék design, label és doboz tervezés. 26 év grafikai tapasztalat.",
    type: "website",
    locale: "hu_HU",
    siteName: "WebDude",
    images: [
      {
        url: "/assets/portfolio/csomagolas-tervezes/stand-up-pouch-packaging-mockup-copy-2.webp",
        width: 1200,
        height: 630,
        alt: "Professzionális csomagolás tervezés",
      },
    ],
  },
};

export const revalidate = 3600;

const packagingProjects = [
  {
    id: "stand-up-pouch",
    name: "Stand-Up Pouch",
    category: "Élelmiszer csomagolás",
    image:
      "/assets/portfolio/csomagolas-tervezes/stand-up-pouch-packaging-mockup-copy-2.webp",
    description:
      "Modern, praktikus stand-up pouch csomagolás tervezés és mockup.",
  },
  {
    id: "dalle-packaging",
    name: "AI Generált Csomagolás",
    category: "Concept design",
    image: "/assets/portfolio/csomagolas-tervezes/dalle-2024-02-17-1914.webp",
    description: "AI-vezérelt csomagolás koncepció és vizualizáció.",
  },
];

const features = [
  {
    icon: Package,
    title: "Egyedi Design",
    description:
      "Nincs sablon megoldás. Minden csomagolás a márka identitását követi.",
  },
  {
    icon: Box,
    title: "Mockup Vizualizáció",
    description:
      "Valósághű 3D mockup készítése a végleges termék előnézetéhez.",
  },
  {
    icon: Layers,
    title: "Nyomdai Előkészítés",
    description: "CMYK színtér, kifutó tervezés, PDF/X-1a standard.",
  },
  {
    icon: Star,
    title: "Bármilyen Termék",
    description:
      "Élelmiszer, kozmetikum, elektronika, bármilyen termék kategória.",
  },
];

const pricingTiers = [
  {
    id: "label-only",
    name: "Label és Címke",
    description: "Kisebb termékekhez, egyszerű címke és label tervezés.",
    price: "Egyedi árajánlat alapján",
    features: [
      "Egyedi grafikai tervezés",
      "Nyomdai előkészítés (CMYK)",
      "Kifutó tervezés",
      "2-3 korrekciós kör",
      "Nyomdakész PDF átadás",
      "1 termék variáció",
    ],
    highlighted: false,
    ctaText: "Egyedi árajánlat kérése",
    ctaLink: "/kapcsolat",
  },
  {
    id: "full-packaging",
    name: "Teljes Csomagolás Design",
    description: "Doboz, pouch, vagy bármilyen csomagolás teljes tervezése.",
    price: "Egyedi árajánlat alapján",
    features: [
      "Minden a Label csomagban",
      "3D mockup vizualizáció",
      "Több termék variáció",
      "Színpaletta és design irányelvek",
      "Nyomdai specifikációk",
      "Brand consistency garantálás",
    ],
    highlighted: true,
    ctaText: "Kérj egyedi árajánlatot",
    ctaLink: "/kapcsolat",
  },
  {
    id: "enterprise",
    name: "Vállalati Termékcsalád",
    description: "Több termék csomagolásának egységes tervezése.",
    price: "Egyedi árajánlat alapján",
    features: [
      "Minden a Teljes Csomagolás csomagban",
      "5+ termék variáció",
      "Egységes termékcsalád design",
      "Shelf-ready mockupok",
      "Termék fotó kompozíciók",
      "Kampány anyagokkal együtt",
    ],
    highlighted: false,
    ctaText: "Kérj egyedi árajánlatot",
    ctaLink: "/kapcsolat",
  },
];

const faqs = [
  {
    question: "Milyen típusú csomagolásokat tervezel?",
    answer:
      "Bármilyen típusú csomagolást: dobozok, pouch-ok, tégelyek, flakonok, tubusok, tasakok, stand-up pouch, roll-stock, téglalap, auto. Élelmiszer, kozmetikum, gyógyszer, elektronika, bármilyen termék kategória.",
  },
  {
    question: "Mennyi időbe telik egy csomagolás tervezése?",
    answer:
      "Egy egyszerű label vagy címke tervezése 1-2 munkanap, míg komplex doboz vagy pouch tervezés 3-5 munkanapot. Sürgős projektek esetén expressz szolgáltatást is tudok biztosítani.",
  },
  {
    question: "Kapsz mockupokat a tervezéshez?",
    answer:
      "Igen. A csomagolás tervezés átadásakor nemcsak a forrásfájlokat (AI, PSD) kapod meg, hanem valósághű 3D mockupokat is, amelyek segítenek vizualizálni a végleges terméket a polcon. Shelf-ready rendererek is készíthetők.",
  },
  {
    question:
      "Mi a különbség a nyomdai előkészítés és a digitális tervezés között?",
    answer:
      "A nyomdai előkészítés CMYK színtérben történik, kifutókkal, nyomtatott fáklya átadással és PDF/X-1a standard szerint. A digitális verziók RGB színtérben, weboldalra és közösségi médiára optimalizálva készülnek. Mindkettőt átadom.",
  },
  {
    question: "Mennyibe kerül egy csomagolás tervezés?",
    answer:
      "A pontos díjtételt az ingyenes konzultáció keretében készített egyedi árajánlat határozza meg a projekt komplexitásától függően.",
  },
];

export default function CsomagolasTervezesPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Főoldal", url: "/" },
    { name: "Szolgáltatások", url: "/szolgaltatasok" },
    { name: "Csomagolás Tervezés", url: "/szolgaltatasok/csomagolas-tervezes" },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Professzionális Csomagolás Tervezés és Termék Design",
    description:
      "Egyedi csomagolás tervezés, termék design, label és doboz tervezés. 26 év grafikai tapasztalat, nyomdai előkészítés.",
    provider: {
      "@type": "Organization",
      "@id": "https://webdude.hu/#organization",
      name: "WebDude",
      url: "https://webdude.hu",
    },
    areaServed: { "@type": "Country", name: "Hungary" },
  };

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
          __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />

      <div className="min-h-screen bg-bg-base text-text-primary">
        {/* Hero Section */}
        <section className="relative min-h-150 md:min-h-175 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/portfolio/csomagolas-tervezes/stand-up-pouch-packaging-mockup-copy-2.webp"
              alt="Professzionális csomagolás tervezés"
              fill
              priority
              className="object-cover object-center -z-20 opacity-20"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-bg-base/90" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:py-32">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                Professzionális{" "}
                <span className="text-[#00B5F1]">Csomagolás Tervezés</span> és
                Termék Design
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
                26 év grafikai tapasztalat. Egyedi csomagolás, termék design,
                label és doboz tervezés nyomdai előkészítéssel. Mockup
                vizualizáció, CMYK optimalizálás, shelf-ready rendererek.
              </p>
              <Link
                href="/kapcsolat"
                className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-cta-from to-cta-to text-white font-bold rounded-full transition-all hover:scale-[1.02] shadow-[0_8px_24px_rgba(0,181,241,0.3)]"
              >
                Kérek egy ingyenes Termék Design Konzultációt
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Miért <span className="text-[#00B5F1]">WebDude</span>{" "}
                Csomagolás?
              </h2>
              <p className="text-slate-400 text-xl max-w-2xl mx-auto">
                26 év grafikai és nyomdai tapasztalat, ami garantálja a
                minőséget és a professzionalizmust
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 bg-bg-surface border border-bg-elevated/80 rounded-2xl hover:border-[#00B5F1]/50 transition-all"
                >
                  <feature.icon className="w-12 h-12 text-[#00B5F1] mb-4" />
                  <h3 className="text-lg font-semibold mb-2 text-slate-200">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Packaging Showcase Gallery */}
        <section className="py-16 md:py-24 px-4 md:px-6 bg-linear-to-b from-bg-base to-slate-900/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Csomagolás <span className="text-[#00B5F1]">Portfólió</span>
              </h2>
              <p className="text-slate-400 text-xl max-w-2xl mx-auto">
                Készített csomagolás tervezések különböző formátumokban és
                kategóriákban
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {packagingProjects.map((project) => (
                <div
                  key={project.id}
                  className="group relative bg-bg-surface border border-bg-elevated/80 rounded-2xl overflow-hidden hover:border-[#00B5F1]/50 transition-all"
                >
                  <div className="aspect-video relative">
                    <Image
                      src={project.image}
                      alt={`${project.name} csomagolás tervezés`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-slate-200">
                        {project.name}
                      </h3>
                      <span className="text-xs text-[#00B5F1] font-medium bg-[#00B5F1]/10 px-2 py-1 rounded-full">
                        {project.category}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 md:py-24 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-[#00B5F1]">Árazás</span> és Csomagok
              </h2>
              <p className="text-slate-400 text-xl max-w-2xl mx-auto">
                Átlátható árazás, nincs rejtett költség. Ingyenes konzultáció
                minden csomaghoz.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingTiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`relative p-8 rounded-2xl border transition-all ${
                    tier.highlighted
                      ? "border-[#00B5F1] bg-[#00B5F1]/5 shadow-[0_8px_24px_rgba(0,181,241,0.2)]"
                      : "border-bg-elevated/80 bg-bg-surface"
                  }`}
                >
                  {tier.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-[#00B5F1] text-white text-xs font-bold px-3 py-1 rounded-full">
                        Népszerű
                      </span>
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2 text-slate-200">
                    {tier.name}
                  </h3>
                  <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                    {tier.description}
                  </p>
                  <div className="text-3xl font-bold text-[#00B5F1] mb-6">
                    {tier.price}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-slate-300 text-sm"
                      >
                        <CheckCircle className="w-5 h-5 text-[#00B5F1] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={tier.ctaLink}
                    className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                      tier.highlighted
                        ? "bg-[#00B5F1] text-white hover:bg-[#00B5F1]/90"
                        : "bg-bg-elevated text-slate-200 hover:bg-bg-elevated/80"
                    }`}
                  >
                    {tier.ctaText}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-[#00B5F1]">Gyakori</span> Kérdések
              </h2>
              <p className="text-slate-400 text-xl max-w-2xl mx-auto">
                Minden, amit tudnod kell a csomagolás tervezésről
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-bg-surface border border-bg-elevated/80 rounded-2xl p-6"
                >
                  <h3 className="text-lg font-semibold text-slate-200 mb-3">
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

        {/* CTA Section */}
        <section className="py-16 md:py-24 px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-bold">
                Készen áll az{" "}
                <span className="text-[#00B5F1]">egyedi csomagolásra</span>?
              </h2>
              <p className="text-slate-400 text-xl max-w-2xl mx-auto">
                Ingyenes konzultáció keretében együtt találjuk meg a legjobb
                vizuális megoldást az Ön termékéhez. 26 év grafikai tapasztalat
                a háttad.
              </p>
              <Link
                href="/kapcsolat"
                className="inline-flex items-center gap-2 px-10 py-5 bg-linear-to-r from-cta-from to-cta-to text-white font-bold rounded-2xl transition-all hover:scale-[1.02] shadow-[0_8px_24px_rgba(0,181,241,0.3)]"
              >
                Ingyenes Konzultáció
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
