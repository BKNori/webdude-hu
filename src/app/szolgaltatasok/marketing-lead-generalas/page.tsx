import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import Script from "next/script";
import Hero from "@/components/Hero";
import PricingTable from "@/components/molecules/PricingTable";
import { buildBreadcrumbSchema, BreadcrumbItem } from "@/lib/breadcrumb";
import LucideIcon from "@/components/atoms/LucideIcon";

export const metadata: Metadata = {
  title:
    "Marketing Lead Generálás – WebDude | Ügyfélszerzés Automatizálása KKV-knak",
  description:
    "Stratégiai marketing lead generálás és landing oldalak kis- és középvállalkozásoknak. Automatizált ügyfélszerzés, konverzió-optimalizált landing oldalak és marketing eszközök.",
  keywords:
    "marketing lead generálás, ügyfélszerzés automatizálás, landing oldal készítés, KKV marketing, konverzió optimalizálás, lead magnet, marketing funnel",
  openGraph: {
    title:
      "Marketing Lead Generálás – WebDude | Ügyfélszerzés Automatizálása KKV-knak",
    description:
      "Stratégiai marketing lead generálás és landing oldalak kis- és középvállalkozásoknak. Automatizált ügyfélszerzés és konverzió optimalizálás.",
    type: "website",
    locale: "hu_HU",
    siteName: "WebDude",
  },
};

export const revalidate = 3600;

export default async function MarketingLeadGenerationPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Főoldal", url: "/" },
    { name: "Szolgáltatások", url: "/szolgaltatasok" },
    {
      name: "Marketing Lead Generálás",
      url: "/szolgaltatasok/marketing-lead-generalas",
    },
  ];

  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Marketing Lead Generálás",
    description:
      "Stratégiai marketing lead generálás és landing oldalak kis- és középvállalkozásoknak. Automatizált ügyfélszerzés, konverzió-optimalizált landing oldalak és marketing eszközök.",
    provider: {
      "@type": "LocalBusiness",
      name: "WebDude",
      url: "https://webdude.hu",
    },
    areaServed: { "@type": "Country", name: "Hungary" },
  };

  const features = [
    {
      title: "Landing oldal tervezés",
      description:
        "Konverzió-optimalizált landing oldalak, amelyek kifejezetten az ügyfélszerzésre vannak tervezve.",
      icon: "Target",
    },
    {
      title: "Lead magnet stratégia",
      description:
        "Ingyenes tartalmak és ajánlatok tervezése, amelyek vonzzák a potenciális ügyfeleket.",
      icon: "Magnet",
    },
    {
      title: "Marketing funnel építés",
      description:
        "Teljes ügyfélszerzési folyamat tervezése a tudatosítástól a konverzióig.",
      icon: "BarChart3",
    },
    {
      title: "A/B tesztelés",
      description:
        "Folyamatos optimalizálás A/B teszteléssel a maximális konverzió érdekében.",
      icon: "FlaskConical",
    },
    {
      title: "Email marketing automatizáció",
      description:
        "Automatizált email kampányok, amelyek növelik az ügyfélmegtartást.",
      icon: "Mail",
    },
    {
      title: "Analytics és reporting",
      description:
        "Részletes analitika és jelentések a marketing teljesítmény mérésére.",
      icon: "TrendingUp",
    },
  ];

  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c"),
        }}
      />
      <main className="bg-bg-base text-text-primary relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-[#00B5F1]/5 via-transparent to-[#00B5F1]/5" />
        <div className="relative z-10">
          <Hero
            label="Marketing Lead Generálás"
            title={
              <>
                Automatizált{" "}
                <span className="text-[#00B5F1] italic">Ügyfélszerzés</span>{" "}
                <br /> KKV-knak
              </>
            }
            subtitle="Stratégiai marketing eszközök és landing oldalak, amelyek automatizálják az ügyfélszerzést és növelik a konverziót."
            cta1="Ingyenes konzultáció"
            cta1Link="/kapcsolat"
            cta2="Munkák megtekintése"
            cta2Link="/munkak"
            fullHeight={true}
          />
        </div>

        <section className="py-32 md:py-40 relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#00B5F1]/5 to-transparent" />
          <div className="relative z-10">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-5xl md:text-6xl font-bold text-text-primary mb-6">
                  Marketing Lead Generálás Szolgáltatásaink
                </h2>
                <p className="text-xl text-slate-400">
                  Komplett megoldások az ügyfélszerzés automatizálására
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-transparent/60 backdrop-blur-md p-8 rounded-2xl border border-slate-700/60 hover:border-[#00B5F1]/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#00B5F1]/5 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-transparent border border-[#00B5F1]/10 flex items-center justify-center mb-6">
                      <LucideIcon name={feature.icon} className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-text-primary mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 md:py-40 bg-transparent relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#00B5F1]/5 to-transparent" />
          <div className="relative z-10">
            <div className="max-w-6xl mx-auto px-6">
              <PricingTable
                tiers={[
                  {
                    id: "starter",
                    name: "Starter",
                    description:
                      "Havi lead generálás csomag (specifikáció kialakítással)",
                    features: [
                      "Specifikáció kialakítás és konzultáció",
                      "1 landing oldal",
                      "Lead magnet stratégia",
                      "Email marketing automatizáció",
                      "Havi reporting",
                      "Email support",
                    ],
                    ctaText: "Starter csomag kérése",
                    ctaLink: "/kapcsolat",
                  },
                  {
                    id: "professional",
                    name: "Professional",
                    description:
                      "Komplett lead generálás havi (specifikáció kialakítással)",
                    features: [
                      "Specifikáció kialakítás és konzultáció",
                      "3 landing oldal",
                      "Lead magnet stratégia",
                      "Marketing funnel építés",
                      "A/B tesztelés",
                      "Email marketing automatizáció",
                      "Heti reporting",
                      "Prioritás support",
                    ],
                    highlighted: true,
                    ctaText: "Professional csomag kérése",
                    ctaLink: "/kapcsolat",
                  },
                  {
                    id: "enterprise",
                    name: "Enterprise",
                    description:
                      "Vállalati lead generálás havi (specifikáció kialakítással)",
                    features: [
                      "Specifikáció kialakítás és konzultáció",
                      "Korlátlan landing oldalak",
                      "Teljes marketing funnel",
                      "A/B tesztelés",
                      "Email marketing automatizáció",
                      "Napi reporting",
                      "Dedikált account manager",
                      "24/7 support",
                    ],
                    ctaText: "Enterprise csomag kérése",
                    ctaLink: "/kapcsolat",
                  },
                ]}
                title="Válassza ki az Önnek megfelelő csomagot"
                description="Komplett megoldások az ügyfélszerzés automatizálására. Minden csomag tartalmazza a konzultációt, specifikáció kialakítást és marketing auditot. Kérjen személyre szabott árajánlatot."
              />
            </div>
          </div>
        </section>

        <section className="py-32 md:py-40 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#00B5F1]/5 to-transparent" />
          <div className="relative z-10">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-5xl md:text-7xl font-bold text-text-primary mb-8">
                Készen áll az{" "}
                <span className="text-[#00B5F1] italic">ügyfélszerzés</span>{" "}
                automatizálására?
              </h2>
              <Link
                href="/kapcsolat"
                className="inline-block px-12 py-6 bg-[#00B5F1] hover:bg-[#0095C7] text-bg-base font-bold rounded-xl uppercase tracking-wider transition-all duration-300"
              >
                Ingyenes Konzultáció
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
