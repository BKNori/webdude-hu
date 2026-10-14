import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";
import {
  FileText,
  Layers,
  ArrowRight,
  CheckCircle,
  Star,
  Printer,
} from "lucide-react";
import { buildBreadcrumbSchema, BreadcrumbItem } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: "Professzionális Szórólap Tervezés és Nyomdai Előkészítés | WebDude",
  description:
    "Egyedi szórólap tervezés, molinók, roll-up és marketing anyagok nyomdai előkészítéssel. 26 év grafikai tapasztalat, CMYK optimalizálás, kifutó-tervezés.",
  keywords:
    "szórólap tervezés, molinó tervezés, roll-up tervezés, marketing anyagok, nyomdai előkészítés, CMYK, kifutó, flyer tervezés, plakát tervezés, országos grafikai tervezés",
  alternates: {
    canonical: "https://webdude.hu/szolgaltatasok/szorolap-tervezes",
  },
  openGraph: {
    title: "Professzionális Szórólap Tervezés és Nyomdai Előkészítés | WebDude",
    description:
      "Egyedi szórólap tervezés, molinók, roll-up és marketing anyagok nyomdai előkészítéssel. 26 év grafikai tapasztalat.",
    type: "website",
    locale: "hu_HU",
    siteName: "WebDude",
    images: [
      {
        url: "/assets/portfolio/szorolapok/delta-food-flyer-a5.webp",
        width: 1200,
        height: 630,
        alt: "Professzionális szórólap tervezés",
      },
    ],
  },
};

export const revalidate = 3600;

const flyerProjects = [
  {
    id: "delta-food-flyer",
    name: "Delta Food Admin",
    category: "A5 Flyer",
    image: "/assets/portfolio/szorolapok/delta-food-flyer-a5.webp",
    description: "Promóciós flyer adminisztrációs szoftver bemutatására.",
  },
  {
    id: "delta-food-molino",
    name: "Delta Food Molinó",
    category: "350x190 cm Molinó",
    image: "/assets/portfolio/szorolapok/delta-food-molino2.webp",
    description: "Nagy formátumú molinó kültéri reklámcélra.",
  },
  {
    id: "dalta-food-molino",
    name: "Dalta Food Molinó",
    category: "350x190 cm Molinó",
    image:
      "/assets/portfolio/szorolapok/dalta-food-350x190-cm-molinlo-hasas-altq1.webp",
    description: "Hátsó megvilágítású molinó tervezés és nyomdai előkészítés.",
  },
  {
    id: "ktu-flyer",
    name: "KTU Flyer",
    category: "A6 Flyer",
    image: "/assets/portfolio/szorolapok/ktu-flyer-2-a6.webp",
    description: "Kompakt A6 formatű promóciós flyer.",
  },
];

const features = [
  {
    icon: FileText,
    title: "Egyedi Design",
    description:
      "Nincs sablon megoldás. Minden szórólap a márka identitását követi.",
  },
  {
    icon: Printer,
    title: "Nyomdai Előkészítés",
    description: "CMYK színtér, kifutó tervezés, PDF/X-1a standard.",
  },
  {
    icon: Layers,
    title: "Bármilyen Formátum",
    description: "A6, A5, A4, A3, roll-up, molinó, autódekoráció.",
  },
  {
    icon: Star,
    title: "Gyors Turnaround",
    description: "24-48 órás átfutás sürgős projektek esetén.",
  },
];

const pricingTiers = [
  {
    id: "flyer-only",
    name: "Egyedi Szórólap",
    description: "Kisebb kampányokhoz, promóciós eseményekre.",
    price: "Egyedi árajánlat alapján",
    features: [
      "Egyedi grafikai tervezés",
      "Nyomdai előkészítés (CMYK)",
      "Kifutó tervezés",
      "2-3 korrekciós kör",
      "Nyomdakész PDF átadás",
      "1 formátum (A6, A5, A4)",
    ],
    highlighted: false,
    ctaText: "Egyedi árajánlat kérése",
    ctaLink: "/kapcsolat",
  },
  {
    id: "full-marketing",
    name: "Teljes Marketing Csomag",
    description: "Kampányhoz szükséges összes marketing anyag egyben.",
    price: "Egyedi árajánlat alapján",
    features: [
      "Minden az Egyedi Szórólap csomagban",
      "3-5 különböző marketing anyag",
      "Molinó és roll-up tervezés",
      "Szociális média verziók",
      "Konzisztens vizuális identitás",
      "Brand guideline átadás",
    ],
    highlighted: true,
    ctaText: "Kérj egyedi árajánlatot",
    ctaLink: "/kapcsolat",
  },
  {
    id: "enterprise",
    name: "Vállalati Kampány",
    description: "Nagy léptékű kampányok teljeskörű grafikai támogatása.",
    price: "Egyedi árajánlat alapján",
    features: [
      "Minden a Teljes Marketing csomagban",
      "10+ marketing anyag",
      "Outoor és online verziók",
      "Jármű dekoráció tervezés",
      "Világító hirdetmények",
      "Kampánymenedzsment támogatás",
    ],
    highlighted: false,
    ctaText: "Kérj egyedi árajánlatot",
    ctaLink: "/kapcsolat",
  },
];

const faqs = [
  {
    question: "Milyen formátumú szórólapokat tervezel?",
    answer:
      "Bármilyen formátumot: A6 (postacédula méret), A5 (flyer standard), A4 (hagyományos szórólap), A3 (nagy formátumú poszter), roll-up, molinó, autódekoráció, busz dekáráció. A standard mellett egyedi méretekkel is dolgozom.",
  },
  {
    question: "Mennyi időbe telik egy szórólap tervezése?",
    answer:
      "Egy egyszerű szórólap tervezése 1-2 munkanap, míg komplex kampányanyagok 3-5 munkanapot. Sürgős projektek esetén expressz szolgáltatást is tudok biztosítani 24-48 órás átfutással.",
  },
  {
    question:
      "Mi a különbség a nyomdai előkészítés és a digitális tervezés között?",
    answer:
      "A nyomdai előkészítés CMYK színtérben történik, kifutókkal, nyomtatott fáklya átadással és PDF/X-1a standard szerint. A digitális verziók RGB színtérben, weboldalra és közösségi médiára optimalizálva készülnek. Mindkettőt átadom.",
  },
  {
    question: "Kapsz nyomdakész PDF fájlokat?",
    answer:
      "Igen. A szórólap átadásakor nemcsak a forrásfájlokat (AI, PSD) kapod meg, hanem teljesen nyomdakész PDF fájlokat is, amelyeket a nyomda azonnal fel tud használni. Címkézve, formátumként, kifutókkal ellátva.",
  },
  {
    question: "Mennyibe kerül egy szórólap tervezés?",
    answer:
      "A pontos díjtételt az ingyenes konzultáció keretében készített egyedi árajánlat határozza meg a formátumtól és a projekt komplexitásától függően.",
  },
];

export default function SzorolapTervezesPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Főoldal", url: "/" },
    { name: "Szolgáltatások", url: "/szolgaltatasok" },
    { name: "Szórólap Tervezés", url: "/szolgaltatasok/szorolap-tervezes" },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Professzionális Szórólap Tervezés és Nyomdai Előkészítés",
    description:
      "Egyedi szórólap tervezés, molinók, roll-up és marketing anyagok nyomdai előkészítéssel. 26 év grafikai tapasztalat, CMYK optimalizálás.",
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
              src="/assets/portfolio/szorolapok/delta-food-flyer-a5.webp"
              alt="Professzionális szórólap tervezés"
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
                <span className="text-[#00B5F1]">Szórólap Tervezés</span> és
                Nyomdai Előkészítés
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
                26 év grafikai tapasztalat. Egyedi szórólapok, molinók, roll-up
                és marketing anyagok nyomdai előkészítéssel. CMYK optimalizálás,
                kifutó tervezés, PDF/X-1a standard.
              </p>
              <Link
                href="/kapcsolat"
                className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-cta-from to-cta-to text-white font-bold rounded-full transition-all hover:scale-[1.02] shadow-[0_8px_24px_rgba(0,181,241,0.3)]"
              >
                Kérek egy ingyenes Grafikai Konzultációt
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Miért <span className="text-[#00B5F1]">WebDude</span> Szórólap?
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

        {/* Flyer Showcase Gallery */}
        <section className="py-16 md:py-24 px-4 md:px-6 bg-linear-to-b from-bg-base to-slate-900/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Szórólap <span className="text-[#00B5F1]">Portfólió</span>
              </h2>
              <p className="text-slate-400 text-xl max-w-2xl mx-auto">
                Készített marketing anyagok különböző formátumokban - A6-tól a
                350x190 cm molinóig
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {flyerProjects.map((project) => (
                <div
                  key={project.id}
                  className="group relative bg-bg-surface border border-bg-elevated/80 rounded-2xl overflow-hidden hover:border-[#00B5F1]/50 transition-all"
                >
                  <div className="aspect-video relative">
                    <Image
                      src={project.image}
                      alt={`${project.name} szórólap tervezés`}
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
                Minden, amit tudnod kell a szórólap tervezésről
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
                <span className="text-[#00B5F1]">
                  egyedi marketing anyagokra
                </span>
                ?
              </h2>
              <p className="text-slate-400 text-xl max-w-2xl mx-auto">
                Ingyenes konzultáció keretében együtt találjuk meg a legjobb
                vizuális megoldást az Ön kampányához. 26 év grafikai tapasztalat
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
