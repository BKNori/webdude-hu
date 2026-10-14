import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";
import {
  PenTool,
  Layers,
  ArrowRight,
  CheckCircle,
  Star,
  Award,
} from "lucide-react";
import { buildBreadcrumbSchema, BreadcrumbItem } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: "Professzionális Logó Tervezés és Arculattervezés | WebDude",
  description:
    "Egyedi logó tervezés és teljes vizuális identitás építés. 26 év grafikai tapasztalat, vektoros forrásfájlok, nyomdai előkészítés. Emblém, ami megkülönböztet a versenytársaktól.",
  keywords:
    "logó tervezés, arculattervezés, brand identity, vizuális identitás, vektoros logo, céges emblém, marketing grafika, országos logó tervezés",
  alternates: {
    canonical: "https://webdude.hu/szolgaltatasok/logo-tervezes",
  },
  openGraph: {
    title: "Professzionális Logó Tervezés és Arculattervezés | WebDude",
    description:
      "Egyedi logó tervezés és teljes vizuális identitás építés. 26 év grafikai tapasztalat, vektoros forrásfájlok, nyomdai előkészítés.",
    type: "website",
    locale: "hu_HU",
    siteName: "WebDude",
    images: [
      {
        url: "/assets/portfolio/logo-tervezes/dr-nagy-albert-logo3-web-copy.webp",
        width: 1200,
        height: 630,
        alt: "Professzionális logó tervezés",
      },
    ],
  },
};

export const revalidate = 3600;

const logoProjects = [
  {
    id: "dr-nagy-albert",
    name: "Dr. Nagy Albert",
    category: "Orvosi branding",
    image: "/assets/portfolio/logo-tervezes/dr-nagy-albert-logo3-web-copy.webp",
    description:
      "Elegáns orvosi logó és teljes arculattervezés neurológus szakrendelő számára.",
  },
  {
    id: "bor-garnela",
    name: "Bor és Garnéla",
    category: "Food truck branding",
    image: "/assets/portfolio/logo-tervezes/bor-garnela-sult-garnela.webp",
    description: "Prémium food truck logó és fesztivál branding.",
  },
  {
    id: "delta-food",
    name: "Delta Food Admin",
    category: "Adminisztrációs szoftver",
    image: "/assets/portfolio/logo-tervezes/delta-food-admin-logo-2.webp",
    description: "Modern SaaS platform logó tervezés.",
  },
  {
    id: "farkas-nora",
    name: "Farkas Nora",
    category: "Személyes branding",
    image: "/assets/portfolio/logo-tervezes/farkas-nora.webp",
    description: "Egyedi személyes márka identitás.",
  },
  {
    id: "galvan",
    name: "Galvan",
    category: "Ipari branding",
    image: "/assets/portfolio/logo-tervezes/galvan-logo-120h-copy.webp",
    description: "Ipari vállalkozás modern logója.",
  },
  {
    id: "goprime",
    name: "GoPrime",
    category: "B2B szolgáltatás",
    image: "/assets/portfolio/logo-tervezes/goprime-logo.png",
    description: "B2B szolgáltatás logó tervezés.",
  },
  {
    id: "home-garden",
    name: "Home Garden",
    category: "Lifestyle márka",
    image: "/assets/portfolio/logo-tervezes/home-garden-logo.png",
    description: "Lifestyle és kertépítés márka.",
  },
  {
    id: "linett",
    name: "Linett",
    category: "Kereskedelmi márka",
    image: "/assets/portfolio/logo-tervezes/linett-uj-logok-b-60.png",
    description: "Kereskedelmi vállalkozás logó kollekció.",
  },
  {
    id: "notar-mssary",
    name: "Notár MSSARY",
    category: "Jogi szolgáltatás",
    image: "/assets/portfolio/logo-tervezes/notar-mssary-losgo.jpg",
    description: "Hivatalos jellegű, megbízható notári branding.",
  },
  {
    id: "prime",
    name: "Prime",
    category: "Technológiai márka",
    image: "/assets/portfolio/logo-tervezes/prime-logo-web.webp",
    description: "Tech startup modern logója.",
  },
  {
    id: "sdadas",
    name: "SDadas",
    category: "Egyedi márka",
    image: "/assets/portfolio/logo-tervezes/sdadas.webp",
    description: "Kreatív, egyedi márkaidentitás.",
  },
  {
    id: "vegleges-web3",
    name: "Végleges Web3",
    category: "Kripto/Web3",
    image: "/assets/portfolio/logo-tervezes/800x800-logo-vegleges-web3.png",
    description: "Web3 és kripto projekt modern logója.",
  },
];

const features = [
  {
    icon: PenTool,
    title: "Egyedi Koncepció",
    description:
      "Nincs sablon megoldás. Minden logó a márka személyiségét és értékeit tükrözi.",
  },
  {
    icon: Layers,
    title: "Vektoros Forrásfájlok",
    description:
      "AI, EPS, SVG, PDF formátumok - óriásplakátára is nyomtatható minőségromlás nélkül.",
  },
  {
    icon: Star,
    title: "Nyomdai Előkészítés",
    description:
      "26 év tapasztalattal pontosan tudom, milyen kifutókra és beállításokra van szükség.",
  },
  {
    icon: Award,
    title: "Arculati Rendszer",
    description:
      "Logó + színpaletta + betűtípus + vizuális irányelvek egy egységes rendszerben.",
  },
];

const pricingTiers = [
  {
    id: "logo-only",
    name: "Logó & Arculati Alapok",
    description:
      "Induló vállalkozásoknak, akik egy profi és felismerhető emblémára vágynak.",
    price: "Egyedi árajánlat alapján",
    features: [
      "2-3 db egyedi logó koncepció",
      "Színpaletta és betűtípus meghatározása",
      "Korrektúrakörök a finomhangoláshoz",
      "Vektoros forrásfájlok (SVG, PDF, EPS)",
      "Közösségi média profilképek",
      "Favicon a weboldalhoz",
    ],
    highlighted: false,
    ctaText: "Egyedi árajánlat kérése",
    ctaLink: "/kapcsolat",
  },
  {
    id: "full-branding",
    name: "Teljes Arculattervezés",
    description:
      "Komplett vizuális identitás: logó, arculat, marketing anyagok és alkalmazás.",
    price: "Egyedi árajánlat alapján",
    features: [
      "Minden a Logo csomagban",
      "Teljes arculati tervezés",
      "Névjegykártya és levélpap",
      "Marketing anyagok (bannerek, poszterek)",
      "Weboldal UI elemek",
      "Brand book és irányelvek",
    ],
    highlighted: true,
    ctaText: "Kérj egyedi árajánlatot",
    ctaLink: "/kapcsolat",
  },
  {
    id: "enterprise",
    name: "Vállalati Identitás",
    description:
      "Nagyvállalatok teljes vállalati identitás felépítése több csomagban.",
    price: "Egyedi árajánlat alapján",
    features: [
      "Minden a Teljes Arculattervezés csomagban",
      "Vállalati arculati stratégiá",
      "Több márka és al márka kezelés",
      "Dolgozói uniform tervezés",
      "Jármű és flotta branding",
      "Rollout kampány",
    ],
    highlighted: false,
    ctaText: "Kérj egyedi árajánlatot",
    ctaLink: "/kapcsolat",
  },
];

const faqs = [
  {
    question: "Mennyi időbe telik egy logó tervezés?",
    answer:
      "Egy logó tervezés általában 3-5 munkanapot, a projekt komplexitásától függően. Teljes arculattervezés esetén 1-2 hét. Sürgős projektek esetén expressz szolgáltatást is tudok biztosítani.",
  },
  {
    question: "Kapsz vektoros forrásfájlokat a logóhoz?",
    answer:
      "Igen. A logó átadásakor nemcsak JPG vagy PNG formátumot kapsz, hanem teljes vektoros (AI, EPS, SVG, PDF) fájlcsomagot, így a jövőben óriásplakátra is nyomtatható lesz minőségromlás nélkül.",
  },
  {
    question: "Mi a különbség a logó és az arculat között?",
    answer:
      "A logó a márka vizuális jele (az emblém), míg az arculat a teljes vizuális rendszer: színek, betűtípusok, fotók, ikonok, stílusirányelvek. Egy sikeres márka mindkettőre szüksége, mert a logó az arculat része.",
  },
  {
    question: "Nyomdai előkészítést is vállalsz?",
    answer:
      "Igen, 26 év grafikai és nyomdai tapasztalattal a hátam mögött pontosan tudom, milyen kifutókra, CMYK színterekre és PDF beállításokra van szükség. Bármilyen szórólap, névjegykártya vagy molinó nyomdakész anyagát elkészítem.",
  },
  {
    question: "Mennyibe kerül egy logó tervezés?",
    answer:
      "A pontos díjtételt az ingyenes konzultáció keretében készített egyedi árajánlat határozza meg a projekt komplexitásától függően.",
  },
];

export default function LogoTervezesPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Főoldal", url: "/" },
    { name: "Szolgáltatások", url: "/szolgaltatasok" },
    { name: "Logó Tervezés", url: "/szolgaltatasok/logo-tervezes" },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Professzionális Logó Tervezés és Arculattervezés",
    description:
      "Egyedi logó tervezés és teljes vizuális identitás építés. 26 év grafikai tapasztalat, vektoros forrásfájlok, nyomdai előkészítés.",
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
              src="/assets/portfolio/logo-tervezes/dr-nagy-albert-logo3-web-copy.webp"
              alt="Professzionális logó tervezés"
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
                <span className="text-[#00B5F1]">Logó Tervezés</span> és
                Arculattervezés
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
                26 év grafikai tapasztalat. Egyedi emblém, ami megkülönböztet a
                versenytársaktól. Vektoros forrásfájlok, nyomdai előkészítés és
                teljes vizuális identitás építés.
              </p>
              <Link
                href="/kapcsolat"
                className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-cta-from to-[#5B21B6] text-white font-bold rounded-full transition-all hover:scale-[1.02] shadow-[0_8px_24px_rgba(0,181,241,0.3)]"
              >
                Kérek egy ingyenes Logó Konzultációt
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Miért <span className="text-[#00B5F1]">WebDude</span> Logó?
              </h2>
              <p className="text-slate-400 text-xl max-w-2xl mx-auto">
                26 év grafikai tapasztalat, ami garantálja a minőséget és a
                professzionalizmust
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

        {/* Logo Showcase Gallery */}
        <section className="py-16 md:py-24 px-4 md:px-6 bg-linear-to-b from-bg-base to-slate-900/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Logó <span className="text-[#00B5F1]">Portfólió</span>
              </h2>
              <p className="text-slate-400 text-xl max-w-2xl mx-auto">
                Készített munkák különböző iparágakból - orvostól gasztronóig
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {logoProjects.map((project) => (
                <div
                  key={project.id}
                  className="group relative bg-bg-surface border border-bg-elevated/80 rounded-2xl overflow-hidden hover:border-[#00B5F1]/50 transition-all"
                >
                  <div className="aspect-square relative">
                    <Image
                      src={project.image}
                      alt={`${project.name} logó tervezés`}
                      fill
                      className="object-contain p-8 group-hover:scale-105 transition-transform duration-300"
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
                Minden, amit tudnod kell a logó tervezésről
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
                <span className="text-[#00B5F1]">egyedi emblémre</span>?
              </h2>
              <p className="text-slate-400 text-xl max-w-2xl mx-auto">
                Ingyenes konzultáció keretében együtt találjuk meg a legjobb
                vizuális megoldást az Ön márkájának. 26 év grafikai tapasztalat
                a háttad.
              </p>
              <Link
                href="/kapcsolat"
                className="inline-flex items-center gap-2 px-10 py-5 bg-linear-to-r from-cta-from to-[#5B21B6] text-white font-bold rounded-2xl transition-all hover:scale-[1.02] shadow-[0_8px_24px_rgba(0,181,241,0.3)]"
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
