import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import AIFeatureCard from "@/components/molecules/AIFeatureCard";
import AIFAQSection from "@/components/organisms/AIFAQSection";
import AIBenefitsGrid from "@/components/molecules/AIBenefitsGrid";

export const metadata: Metadata = {
  title: "Vállalati AI Automatizáció és Egyedi Prompt Tervezés | WebDude",
  description:
    "Weboldal, ami dolgozik helyetted — vállalati AI automatizáció, webfejlesztés és grafikai tervezés Kecskemétről, országosan. 26 év grafikai és 16 év webfejlesztői tapasztalat.",
  alternates: {
    canonical: "https://webdude.hu/ai-megoldasok",
  },
  openGraph: {
    title: "Vállalati AI Automatizáció és Egyedi Prompt Tervezés | WebDude",
    description:
      "Weboldal, ami dolgozik helyetted — vállalati AI automatizáció, webfejlesztés és grafikai tervezés Kecskemétről, országosan.",
    url: "https://webdude.hu/ai-megoldasok",
    siteName: "WebDude",
    images: [
      {
        url: "https://webdude.hu/assets/portfolio/ai-promt-hu/ai-promt-hi-banner.webp",
        width: 1536,
        height: 857,
      },
    ],
    locale: "hu_HU",
    type: "website",
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
      "Az árazás a projekt komplexitásától függ. Egy egyszerű AI workflow automatizáció 200-500 ezer forint között indul, míg komplex, több rendszerre kiterjedő AI integrációk 1-3 millió forint között mozognak. Ingyenes konzultáció keretében pontos árajánlatot készítek.",
  },
  {
    question: "Hogyan integrálhatom az AI megoldásokat a meglévő rendszerembe?",
    answer:
      "A legtöbb AI megoldás kompatibilis a meglévő technológiákkal. WordPress, WooCommerce, Shopify, és egyedi Next.js rendszerek esetén API integrációkat használok, amelyek zökkenőmentes csatlakozást biztosítanak. Rendszerköri függetlenség garancia.",
  },
];

export default function AIMSolutionsPage() {
  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      {/* JSON-LD Sémák */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://webdude.hu/#organization",
            name: "WebDude.hu",
            url: "https://webdude.hu",
            description:
              "Weboldal, ami dolgozik helyetted — vállalati AI automatizáció, webfejlesztés és grafikai tervezés Kecskemétről, országosan.",
            founder: {
              "@type": "Person",
              name: "Norbi (WebDude)",
              jobTitle: "Webfejlesztő és Grafikai Tervező",
              description:
                "26 éves grafikai és 16 éves webfejlesztői tapasztalattal rendelkező szakértő.",
              url: "https://webdude.hu/szia-norbi-vagyok",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+36 70 323 8003",
              contactType: "customer service",
              availableLanguage: "Hungarian",
            },
            sameAs: [
              "https://www.facebook.com/webdude.hu",
              "https://www.linkedin.com/company/webdude-hu",
            ],
          }).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://webdude.hu/#localbusiness",
            name: "WebDude.hu",
            image:
              "https://webdude.hu/assets/portfolio/ai-promt-hu/ai-promt-hi-banner.webp",
            url: "https://webdude.hu",
            telephone: "+36 70 323 8003",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Kecskemét",
              addressCountry: "HU",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 46.9069,
              longitude: 19.6897,
            },
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
              ],
              opens: "09:00",
              closes: "18:00",
            },
            priceRange: "$$",
            description:
              "Weboldal, ami dolgozik helyetted — vállalati AI automatizáció, webfejlesztés és grafikai tervezés Kecskemétről, országosan.",
          }).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": "https://webdude.hu/#person",
            name: "Norbi (WebDude)",
            jobTitle: "Webfejlesztő és Grafikai Tervező",
            description:
              "26 éves grafikai és 16 éves webfejlesztői tapasztalattal rendelkező szakértő. Next.js 16, React 19, TypeScript és AI automatizáció specialista.",
            url: "https://webdude.hu/szia-norbi-vagyok",
            worksFor: {
              "@type": "Organization",
              name: "WebDude.hu",
              url: "https://webdude.hu",
            },
            address: {
              "@type": "PostalAddress",
              addressLocality: "Kecskemét",
              addressCountry: "HU",
            },
            sameAs: [
              "https://www.facebook.com/webdude.hu",
              "https://www.linkedin.com/company/webdude-hu",
            ],
          }).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Vállalati AI Automatizáció és Egyedi Prompt Tervezés",
            description:
              "Weboldal, ami dolgozik helyetted — vállalati AI automatizáció, webfejlesztés és grafikai tervezés Kecskemétről, országosan. 26 év grafikai és 16 év webfejlesztői tapasztalat.",
            provider: {
              "@type": "Person",
              name: "Norbi (WebDude)",
              jobTitle: "Webfejlesztő és Grafikai Tervező",
              description:
                "26 éves grafikai és 16 éves webfejlesztői tapasztalattal rendelkező szakértő.",
              url: "https://webdude.hu/szia-norbi-vagyok",
            },
            url: "https://webdude.hu/ai-megoldasok",
            priceRange: "$$",
            serviceType: "AI Automatizáció",
          }).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          }).replace(/</g, "\\u003c"),
        }}
      />

      {/* Hero Section with Banner */}
      <section className="relative min-h-150 md:min-h-175 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/portfolio/ai-promt-hu/ai-promt-hi-banner.webp"
            alt="Vállalati AI Automatizáció és Egyedi Prompt Tervezés"
            fill
            priority
            className="object-cover object-center -z-20"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-bg-base/70" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Vállalati AI Automatizáció és
              <span className="text-[#00B5F1]"> Egyedi Prompt Tervezés</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
              26 év grafikai és 16 év webfejlesztői tapasztalat. Egyedi AI
              munkafolyamatok, amelyek skálázhatóvá teszik a vállalkozásodat.
            </p>
            <Link
              href="/kapcsolat"
              className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-[#075985] to-[#5B21B6] text-white font-bold rounded-full transition-all hover:scale-[1.02] shadow-[0_8px_24px_rgba(0,181,241,0.3)]"
            >
              Kérek egy ingyenes AI Konzultációt
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section - Bento Grid */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Miért <span className="text-[#00B5F1]">AI Automatizáció</span>?
            </h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto">
              Üzleti előnyök, amelyek komoly mérhető eredményeket hoznak
            </p>
          </div>

          <AIBenefitsGrid benefits={benefits} />
        </div>
      </section>

      {/* AI Solutions Grid */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-linear-to-b from-bg-base to-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              AI <span className="text-[#00B5F1]">Megoldások</span>
            </h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto">
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
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-[#00B5F1]">Gyakori</span> Kérdések
            </h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto">
              Minden, amit tudnod kell az AI automatizációról
            </p>
          </div>

          <AIFAQSection faqData={faqData} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold">
              Készen áll az <span className="text-[#00B5F1]">AI</span>{" "}
              automatizációra?
            </h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto">
              Ingyenes konzultáció keretében együtt találjuk meg a legjobb AI
              megoldást az Ön üzleti igényeire.
            </p>
            <Link
              href="/kapcsolat"
              className="inline-flex items-center gap-2 px-10 py-5 bg-linear-to-r from-[#075985] to-[#5B21B6] text-white font-bold rounded-2xl transition-all hover:scale-[1.02] shadow-[0_8px_24px_rgba(0,181,241,0.3)]"
            >
              Ingyenes Konzultáció
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
