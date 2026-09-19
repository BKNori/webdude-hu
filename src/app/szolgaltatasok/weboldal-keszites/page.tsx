import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import { Metadata } from "next";
import BentoCard from "@/components/molecules/BentoCard";
import AnimatedSystemFlow from "@/components/molecules/AnimatedSystemFlow";
import CaseStudyCard from "@/components/molecules/CaseStudyCard";
import PricingTable from "@/components/molecules/PricingTable";
import { buildBreadcrumbSchema, BreadcrumbItem } from "@/lib/breadcrumb";
import Image from "next/image";
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Weboldal Készítés – React, Next.js, WordPress, Node.js | WebDude",
    description:
      "Egyedi weboldal fejlesztés React, Next.js, WordPress, Node.js, HTML, JavaScript technológiákkal. Mobilbarát, SEO-optimalizált és konverzió-fókuszú megoldások az ügyfél igénye szerint. Landing page, vállalati weboldal, webshop és alkalmazás fejlesztés.",
    keywords:
      "weboldal készítés, React fejlesztés, Next.js, WordPress, Node.js, HTML, JavaScript, egyedi weboldal, responsive design, landing page, vállalati weboldal, webshop fejlesztés, SaaS platform",
    alternates: {
      canonical: "https://webdude.hu/szolgaltatasok/weboldal-keszites",
    },
    openGraph: {
      title: "Weboldal Készítés – React, Next.js, WordPress, Node.js | WebDude",
      description:
        "Egyedi weboldal fejlesztés React, Next.js, WordPress, Node.js, HTML, JavaScript technológiákkal. Mobilbarát, SEO-optimalizált és konverzió-fókuszú megoldások az ügyfél igénye szerint.",
      url: "https://webdude.hu/szolgaltatasok/weboldal-keszites",
      type: "website",
      siteName: "WebDude",
      images: [
        {
          url: "/banners/wordpress-weboldalak-keszitese-grafikai-tervezes.webp",
          width: 1920,
          height: 1080,
          alt: "Weboldal készítés React, Next.js, WordPress technológiákkal",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Weboldal Készítés – React, Next.js, WordPress, Node.js | WebDude",
      description:
        "Egyedi weboldal fejlesztés React, Next.js, WordPress, Node.js, HTML, JavaScript technológiákkal. Mobilbarát, SEO-optimalizált és konverzió-fókuszú megoldások az ügyfél igénye szerint.",
      images: [
        "/banners/wordpress-weboldalak-keszitese-grafikai-tervezes.webp",
      ],
    },
  };
}

const FAQ = [
  {
    q: "Milyen technológiákkal fejlesztek weboldalakat?",
    a: "React, Next.js, WordPress, Node.js, HTML, JavaScript, TypeScript, Tailwind CSS. Az ügyfél igénye szerint választjuk a legmegfelelőbb technológiát: React/Next.js modern weboldalakhoz, WordPress CMS-hez, Node.js backend-hez, HTML/JavaScript egyszerűbb projektekhez.",
  },
  {
    q: "Mennyi idő egy weboldal elkészítése?",
    a: "Egyszerű landing page 1-2 hét, vállalati weboldal 2-4 hét, komplex webshop vagy alkalmazás 4-8 hét attól függően, hogy milyen funkciók szükségesek. A webspecifikáció kialakítása és konzultáció 3-5 munkanap.",
  },
  {
    q: "Biztonságos a weboldal fejlesztés?",
    a: "Igen, minden fejlesztésnél biztonsági auditot végzek, SSL titkosítást alkalmazok, követem a legújabb biztonsági best practice-eket, és rendszeres biztonsági frissítéseket biztosítok.",
  },
  {
    q: "Mennyibe kerül egy weboldal?",
    a: "Egyedi árajánlat kérése a projekt igényei szerint. Ingyenes konzultáció a pontos árhoz.",
  },
  {
    q: "Miért a WordPress a legjobb választás?",
    a: "WordPress 16+ éves tapasztalatom van, könnyen frissíthető, SEO-barát, hatalmas plugin ökoszisztéma, WooCommerce webshop integráció, és költséghatékony megoldás KKV-k számára.",
  },
  {
    q: "Miért válasszam React/Next.js-t?",
    a: "Next.js 16 a legmodernebb technológia, szerveroldali renderelés (SSR), kiváló SEO, gyors betöltés, skálázható, és ideális SaaS platformokhoz és komplex webalkalmazásokhoz.",
  },
  {
    q: "Karbantartást is biztosítasz?",
    a: "Igen, minden csomag tartalmaz karbantartást: landing page 1 hónap, vállalati weboldal 3 hónap, webshop 3 hónap prémium karbantartás. Utána havi karbantartási csomagok elérhetők.",
  },
];

export const revalidate = 3600;

export default async function WeboldalKeszitesPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Főoldal", url: "/" },
    { name: "Szolgáltatások", url: "/szolgaltatasok" },
    { name: "Weboldal Készítés", url: "/szolgaltatasok/weboldal-keszites" },
  ];

  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Weboldal Készítés",
    description:
      "Egyedi weboldal fejlesztés React, Next.js, WordPress, Node.js, HTML, JavaScript technológiákkal. Mobilbarát, SEO-optimalizált és konverzió-fókuszú megoldások az ügyfél igénye szerint.",
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
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
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

      <main className="min-h-screen pt-32 pb-20 bg-bg-base text-text-primary relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-[#00B5F1]/5 via-transparent to-[#00B5F1]/5" />

        {/* Hero Section with Background Image - Full Width */}
        <section
          id="hero"
          className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/assets/banners/webdue-branding_mockup_05-copy copy.webp"
              alt="Weboldal Készítés Hero Banner"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-slate-900/60" />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
            <div className="space-y-8">
              <Badge>Webfejlesztés</Badge>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight">
                Weboldal Készítés
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Egyedi weboldal fejlesztés React, Next.js, WordPress, Node.js,
                HTML, JavaScript technológiákkal az ügyfél igénye szerint.
                Mobilbarát, SEO-optimalizált és konverzió-fókuszú megoldások.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  variant="primary"
                  href="/kapcsolat"
                  className="w-full sm:w-auto"
                >
                  Kérj ingyenes konzultációt
                </Button>
                <Button
                  variant="secondary"
                  href="/munkak"
                  className="w-full sm:w-auto"
                >
                  Portfólió megtekintése
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 max-w-4xl mx-auto">
                <div className="bg-slate-900/50 backdrop-blur-sm border border-[#00B5F1]/20 rounded-2xl p-6">
                  <div className="text-3xl md:text-4xl font-bold text-[#00B5F1] mb-2">
                    16+
                  </div>
                  <div className="text-sm text-slate-400">Éves tapasztalat</div>
                </div>
                <div className="bg-slate-900/50 backdrop-blur-sm border border-[#00B5F1]/20 rounded-2xl p-6">
                  <div className="text-3xl md:text-4xl font-bold text-[#00B5F1] mb-2">
                    200+
                  </div>
                  <div className="text-sm text-slate-400">Sikeres projekt</div>
                </div>
                <div className="bg-slate-900/50 backdrop-blur-sm border border-[#00B5F1]/20 rounded-2xl p-6">
                  <div className="text-3xl md:text-4xl font-bold text-[#00B5F1] mb-2">
                    +300%
                  </div>
                  <div className="text-sm text-slate-400">
                    Konverzió növekedés
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* Technologies Section */}
          <section
            id="technologies"
            className="mt-24 max-w-6xl mx-auto relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#00B5F1]/5 to-transparent" />
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-text-primary mb-8">
                Technológiák
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <BentoCard
                  title="React & Next.js"
                  description="Modern, gyors és skálázható front-end fejlesztés szerveroldali rendereléssel és optimalizált teljesítménnyel"
                  metric="SSR"
                  highlight="LCP < 2.5s"
                />
                <BentoCard
                  title="WordPress"
                  description="CMS-alapú weboldalak, WooCommerce webshopok és egyedi plugin fejlesztés"
                  metric="CMS"
                  highlight="16 év tapasztalat"
                />
                <BentoCard
                  title="Node.js"
                  description="Back-end fejlesztés, API integrációk és teljes stack alkalmazások építése"
                  metric="API"
                  highlight="Full Stack"
                />
                <BentoCard
                  title="HTML & JavaScript"
                  description="Hagyományos és modern front-end fejlesztés, responsive design és interaktív felületek"
                  metric="Vanilla"
                  highlight="Responsive"
                />
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section
            id="process"
            className="mt-24 max-w-6xl mx-auto relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#00B5F1]/5 to-transparent" />
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-text-primary mb-8">
                Fejlesztési Folyamat
              </h2>
              <AnimatedSystemFlow
                steps={[
                  {
                    id: 1,
                    title: "Elemzés",
                    label: "Követelmények & Stratégia",
                  },
                  {
                    id: 2,
                    title: "Technológia",
                    label: "Stack & Archtitektúra",
                  },
                  { id: 3, title: "Fejlesztés", label: "React, Node.js, WP" },
                  { id: 4, title: "Tesztelés", label: "QA & Performance" },
                  { id: 5, title: "Launch", label: "Deploy & Monitor" },
                ]}
              />
            </div>
          </section>

          {/* Case Studies Section */}
          <section
            id="case-studies"
            className="mt-24 max-w-6xl mx-auto relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#00B5F1]/5 to-transparent" />
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-text-primary mb-8">
                Esettanulmányok
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <CaseStudyCard
                  title="E-kereskedelmi Platform"
                  client="Fashion Brand"
                  description="WooCommerce webshop fejlesztés egyedi témával és API integrációkkal"
                  metrics={[
                    { label: "Konverzió", value: "+340%" },
                    { label: "LCP", value: "1.2s" },
                  ]}
                />
                <CaseStudyCard
                  title="SaaS Landing"
                  client="Tech Startup"
                  description="React alapú landing page optimalizált CRO és AEO elemekkel"
                  metrics={[
                    { label: "Lead Generálás", value: "+280%" },
                    { label: "SEO Score", value: "95/100" },
                  ]}
                />
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section
            id="services"
            className="mt-24 max-w-6xl mx-auto relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#00B5F1]/5 to-transparent" />
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-text-primary mb-8">
                Szolgáltatások
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <BentoCard
                  title="Landing Page"
                  description="Konverzió-fókuszú landing page-k, amelyek maximalizálják az ügyfélszerzést és a lead generálást"
                  metric="+300%"
                  highlight="Konverzió növekedés"
                />
                <BentoCard
                  title="Vállalati Weboldal"
                  description="Professzionális vállalati weboldalak CMS rendszerrel, amelyek könnyen frissíthetők és skálázhatók"
                  metric="CMS"
                  highlight="Könnyen frissíthető"
                />
                <BentoCard
                  title="Webshop"
                  description="E-kereskedelmi megoldások WooCommerce vagy egyedi fejlesztéssel, biztonságos fizetési integrációkkal"
                  metric="E-comm"
                  highlight="Biztonságos fizetés"
                />
                <BentoCard
                  title="Alkalmazás"
                  description="Web alapú alkalmazások és SaaS platformok fejlesztése modern technológiákkal"
                  metric="SaaS"
                  highlight="Skálázható"
                />
                <BentoCard
                  title="API Integráció"
                  description="Külső rendszerek összekapcsolása, API fejlesztés és adatszinkronizáció"
                  metric="REST"
                  highlight="Adatszinkronizáció"
                />
                <BentoCard
                  title="Karbantartás"
                  description="Folyamatos biztonsági frissítések, biztonsági mentések és technikai támogatás"
                  metric="24/7"
                  highlight="Biztonságos"
                />
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section
            id="pricing"
            className="mt-24 max-w-6xl mx-auto relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#00B5F1]/5 to-transparent" />
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-text-primary mb-8">
                Árazás
              </h2>
              <PricingTable
                tiers={[
                  {
                    id: "landing",
                    name: "Landing Page",
                    description:
                      "Konverzió-fókuszú landing page 1-2 hét alatt (webspecifikáció kialakítással)",
                    features: [
                      "Webspecifikáció kialakítás és konzultáció",
                      "Modern React/Next.js fejlesztés",
                      "Mobilbarát és SEO-optimalizált",
                      "Konverzió-optimalizált CTA elemek",
                      "Google Analytics és Search Console integráció",
                      "1 hónap karbantartás",
                    ],
                    ctaText: "Egyedi árajánlat kérése",
                    ctaLink: "/kapcsolat",
                  },
                  {
                    id: "corporate",
                    name: "Vállalati Weboldal",
                    description:
                      "Professzionális vállalati weboldal 2-4 hét alatt (webspecifikáció kialakítással)",
                    features: [
                      "Webspecifikáció kialakítás és konzultáció",
                      "CMS rendszer (WordPress vagy Next.js)",
                      "Testreszabott design és branding",
                      "Bővíthető és skálázható",
                      "Biztonsági optimalizálás",
                      "SEO és AEO beállítások",
                      "3 hónap karbantartás",
                    ],
                    highlighted: true,
                    ctaText: "Egyedi árajánlat kérése",
                    ctaLink: "/kapcsolat",
                  },
                  {
                    id: "ecommerce",
                    name: "Webshop",
                    description:
                      "E-kereskedelmi platform 4-8 hét alatt (webspecifikáció kialakítással)",
                    features: [
                      "Webspecifikáció kialakítás és konzultáció",
                      "WooCommerce vagy egyedi fejlesztés",
                      "Biztonságos fizetési integráció",
                      "Raktárkészlet kezelés",
                      "Automatikus rendelésfeldolgozás",
                      "SEO optimalizált termékoldalak",
                      "3 hónap prémium karbantartás",
                    ],
                    ctaText: "Egyedi árajánlat kérése",
                    ctaLink: "/kapcsolat",
                  },
                ]}
                title="Egyedi árajánlat kérése"
                description="Minden projekt egyedi igények alapján kerül árazásra. Kérj személyre szabott árajánlatot."
              />
            </div>
          </section>

          {/* Benefits Section */}
          <section
            id="benefits"
            className="mt-24 max-w-4xl mx-auto relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#00B5F1]/5 to-transparent" />
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-text-primary mb-8">
                Miért WebDude?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-8 h-8 bg-[#00B5F1] rounded-full flex items-center justify-center text-bg-base font-bold">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">
                      16 éves webfejlesztési tapasztalat
                    </h3>
                    <p className="text-slate-400">
                      WordPress-gyökerektől a modern React megoldásokig — minden
                      technológiát ismerek és alkalmazok
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-8 h-8 bg-[#00B5F1] rounded-full flex items-center justify-center text-bg-base font-bold">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">
                      Konverzió-fókuszú fejlesztés
                    </h3>
                    <p className="text-slate-400">
                      Nem csak szép weboldalakat készítek — olyan digitális
                      eszközöket, amelyek ügyfeleket szereznek
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-8 h-8 bg-[#00B5F1] rounded-full flex items-center justify-center text-bg-base font-bold">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">
                      SEO és AEO optimalizálás
                    </h3>
                    <p className="text-slate-400">
                      Minden weboldal strukturált adatokkal és optimalizált
                      metatagokkal kerül kiadásra
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-8 h-8 bg-[#00B5F1] rounded-full flex items-center justify-center text-bg-base font-bold">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">
                      Mobilbarát és reszponzív
                    </h3>
                    <p className="text-slate-400">
                      Minden weboldal optimalizált minden eszközre — mobil,
                      tablet és desktop
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-8 h-8 bg-[#00B5F1] rounded-full flex items-center justify-center text-bg-base font-bold">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">
                      Gyors és megbízható
                    </h3>
                    <p className="text-slate-400">
                      Core Web Vitals fókuszú fejlesztés, biztosított gyors
                      betöltési idő és megbízható működés
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section
            id="faq"
            className="mt-24 max-w-4xl mx-auto relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#00B5F1]/5 to-transparent" />
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-text-primary mb-8">
                Gyakori kérdések
              </h2>
              <div className="space-y-6">
                {FAQ.map((item, i) => (
                  <div
                    key={i}
                    className="bg-transparent border border-slate-700/60 p-6 rounded-lg"
                  >
                    <h3 className="text-lg font-semibold text-[#00B5F1] mb-2">
                      {item.q}
                    </h3>
                    <p className="text-slate-400">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section
            id="cta"
            className="mt-24 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#00B5F1]/5 to-transparent" />
            <div className="relative z-10">
              <div className="bg-transparent border border-slate-700/60 p-16 rounded-2xl">
                <h2 className="text-5xl font-bold text-text-primary mb-6">
                  Készen állsz a projekt kezdetére?
                </h2>
                <p className="text-xl text-slate-400 mb-8">
                  Kérj ingyenes konzultációt, és együtt találjuk meg a
                  legmegfelelőbb technológiai megoldást a te projektjeidhez.
                </p>
                <Button variant="primary" href="/kapcsolat">
                  Kérj ingyenes konzultációt
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
