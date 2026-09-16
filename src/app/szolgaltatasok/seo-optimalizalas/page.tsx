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
    "SEO Optimalizálás – WebDude | Keresőoptimalizálás és Tartalomstratégia KKV-knak",
  description:
    "Professzionális SEO optimalizálás és tartalomstratégia kis- és középvállalkozásoknak. Növelje a Google helyezéseket és organikus forgalmat szakértői segítséggel.",
  keywords:
    "SEO optimalizálás, keresőoptimalizálás, tartalomstratégia, Google helyezés javítás, organikus forgalom növelés, KKV SEO, on-page SEO, off-page SEO",
  openGraph: {
    title:
      "SEO Optimalizálás – WebDude | Keresőoptimalizálás és Tartalomstratégia KKV-knak",
    description:
      "Professzionális SEO optimalizálás és tartalomstratégia kis- és középvállalkozásoknak. Növelje a Google helyezéseket és organikus forgalmat.",
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
      "Professzionális SEO optimalizálás és tartalomstratégia kis- és középvállalkozásoknak. Növelje a Google helyezéseket és organikus forgalmat szakértői segítséggel.",
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
      description:
        "Meta adatok, heading struktúra, URL optimalizálás és tartalom optimalizálás.",
      icon: "FileText",
    },
    {
      title: "Technikai SEO",
      description:
        "Weboldal sebesség optimalizálás, mobilbarát design és Core Web Vitals javítás.",
      icon: "Settings",
    },
    {
      title: "Kulcsszó kutatás",
      description:
        "Releváns kulcsszó kutatása és stratégiai elhelyezése a tartalomban.",
      icon: "Search",
    },
    {
      title: "Tartalomstratégia",
      description:
        "SEO-barát tartalom tervezése és optimalizálás a keresőmotorok számára.",
      icon: "BarChart3",
    },
    {
      title: "Linképítés",
      description: "Minőségi backlinkek építése és domain autoritás növelése.",
      icon: "Link2",
    },
    {
      title: "Analytics és reporting",
      description:
        "Részletes SEO analitika és havi jelentések a teljesítmény mérésére.",
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
            label="SEO Optimalizálás"
            title={
              <>
                Növelje a{" "}
                <span className="text-[#00B5F1] italic">
                  Google Helyezéseket
                </span>{" "}
                <br /> és Organikus Forgalmat
              </>
            }
            subtitle="Keresőoptimalizálás és tartalomstratégia, amely növeli a Google helyezéseket és organikus forgalmat."
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
                  SEO Optimalizálás Szolgáltatásaink
                </h2>
                <p className="text-xl text-slate-400">
                  Komplett keresőoptimalizálás KKV-knak
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
                    id: "basic",
                    name: "Basic",
                    description:
                      "Havi SEO optimalizálás csomag (specifikáció kialakítással)",
                    features: [
                      "Specifikáció kialakítás és konzultáció",
                      "On-page SEO audit",
                      "Kulcsszó kutatás",
                      "Meta adatok optimalizálása",
                      "Havi reporting",
                      "Email support",
                    ],
                    ctaText: "Basic csomag kérése",
                    ctaLink: "/kapcsolat",
                  },
                  {
                    id: "professional",
                    name: "Professional",
                    description:
                      "Komplett SEO optimalizálás havi (specifikáció kialakítással)",
                    features: [
                      "Specifikáció kialakítás és konzultáció",
                      "Teljes SEO audit",
                      "Kulcsszó kutatás",
                      "On-page és technikai SEO",
                      "Tartalomstratégia",
                      "Linképítés",
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
                      "Vállalati SEO stratégia havi (specifikáció kialakítással)",
                    features: [
                      "Specifikáció kialakítás és konzultáció",
                      "Komplett SEO stratégia",
                      "On-page és technikai SEO",
                      "Tartalomstratégia",
                      "Linképítés",
                      "Local SEO",
                      "Napi reporting",
                      "Dedikált SEO manager",
                      "24/7 support",
                    ],
                    ctaText: "Enterprise csomag kérése",
                    ctaLink: "/kapcsolat",
                  },
                ]}
                title="Válassza ki az Önnek megfelelő SEO csomagot"
                description="Komplett keresőoptimalizálás KKV-knak. Minden csomag tartalmazza a konzultációt, specifikáció kialakítást és SEO auditot. Kérjen személyre szabott árajánlatot."
              />
            </div>
          </div>
        </section>

        <section className="py-32 md:py-40 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#00B5F1]/5 to-transparent" />
          <div className="relative z-10">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-5xl md:text-7xl font-bold text-text-primary mb-8">
                Készen áll a{" "}
                <span className="text-brand-primary italic">
                  SEO optimalizálásra
                </span>
                ?
              </h2>
              <Link
                href="/kapcsolat"
                className="inline-block px-12 py-6 bg-[#00B5F1] hover:bg-[#5B21B6] text-bg-base font-bold rounded-xl uppercase tracking-wider transition-all duration-300"
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
