import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import Script from "next/script";
import Hero from "@/components/Hero";
import PricingTable from "@/components/molecules/PricingTable";
import { buildBreadcrumbSchema, BreadcrumbItem } from "@/lib/breadcrumb";
import LucideIcon from "@/components/atoms/LucideIcon";

export const metadata: Metadata = {
  title: "Webshop Fejlesztés | WebDude | Prémium E-kereskedelmi Platformok",
  description:
    "Prémium webshop fejlesztés kis- és középvállalkozásoknak. Next.js alapú, konverzió-optimalizált e-kereskedelmi rendszerek WooCommerce és egyedi platformokon.",
  keywords:
    "webshop fejlesztés, e-kereskedelmi platform, prémium webshop készítés, WooCommerce fejlesztés, Shopify fejlesztés, online bolt készítés, e-commerce megoldások",
  alternates: {
    canonical: "https://webdude.hu/szolgaltatasok/webshop-fejlesztes",
  },
  openGraph: {
    title: "Webshop Fejlesztés | WebDude | Prémium E-kereskedelmi Platformok",
    description:
      "Prémium webshop fejlesztés kis- és középvállalkozásoknak. Next.js alapú, konverzió-optimalizált e-kereskedelmi rendszerek WooCommerce és egyedi platformokon.",
    url: "https://webdude.hu/szolgaltatasok/webshop-fejlesztes",
    type: "website",
    locale: "hu_HU",
    siteName: "WebDude",
  },
};

export const revalidate = 3600;

export default async function WebshopDevelopmentPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Főoldal", url: "/" },
    { name: "Szolgáltatások", url: "/szolgaltatasok" },
    { name: "Webshop Fejlesztés", url: "/szolgaltatasok/webshop-fejlesztes" },
  ];

  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Webshop Fejlesztés",
    url: "https://webdude.hu/szolgaltatasok/webshop-fejlesztes",
    description:
      "Prémium webshop fejlesztés kis- és középvállalkozásoknak. Next.js alapú, konverzió-optimalizált e-kereskedelmi rendszerek WooCommerce és egyedi platformokon.",
    provider: {
      "@id": "https://webdude.hu/#organization",
      "@type": "Organization",
      name: "WebDude",
      url: "https://webdude.hu",
    },
    areaServed: { "@type": "Country", name: "Hungary" },
  };

  const features = [
    {
      title: "WooCommerce fejlesztés",
      description:
        "WordPress alapú WooCommerce webshopok testreszabása és optimalizálása.",
      icon: "ShoppingCart",
    },
    {
      title: "Shopify fejlesztés",
      description:
        "Shopify platformon alapuló webshopok tervezése és fejlesztése.",
      icon: "Store",
    },
    {
      title: "Egyedi e-kereskedelmi platform",
      description: "Egyedi fejlesztésű webshopok specifikus igények szerint.",
      icon: "Zap",
    },
    {
      title: "Fizetési gateway integráció",
      description:
        "Biztonságos fizetési rendszerek integrálása (Stripe, PayPal, Barion).",
      icon: "CreditCard",
    },
    {
      title: "Rendeléskezelés",
      description: "Automatizált rendeléskezelés és készletnyilvántartás.",
      icon: "Package",
    },
    {
      title: "Mobil optimalizálás",
      description: "Reszponzív design és mobil app integráció.",
      icon: "Smartphone",
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
            label="Webshop Fejlesztés"
            title={
              <>
                Növelje az{" "}
                <span className="text-[#00B5F1] italic">Online Eladásokat</span>{" "}
                <br /> Professzionális Webshoppal
              </>
            }
            subtitle="E-kereskedelmi platformok készítése, amelyek növelik az online eladásokat és egyszerűsítik a vásárlói élményt."
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
                  Webshop Fejlesztés Szolgáltatásaink
                </h2>
                <p className="text-xl text-slate-400">
                  Komplett e-kereskedelmi megoldások KKV-knak
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-bg-card/60 backdrop-blur-md p-8 rounded-2xl border border-slate-700 hover:border-[#00B5F1]/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#00B5F1]/5 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-bg-card border border-[#00B5F1]/10 flex items-center justify-center mb-6">
                      <LucideIcon
                        name={feature.icon}
                        className="w-5 h-5 text-[#00B5F1]"
                      />
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
                    description: "WooCommerce alapú webshop induló csomag",
                    features: [
                      "WooCommerce alapú webshop",
                      "Alap termékkezelés",
                      "Fizetési gateway integráció",
                      "Mobil optimalizált design",
                      "Email support",
                    ],
                    ctaText: "Egyedi árajánlat kérése",
                    ctaLink: "/kapcsolat",
                  },
                  {
                    id: "professional",
                    name: "Professional",
                    description: "Komplett webshop rendszer",
                    features: [
                      "WooCommerce vagy Shopify",
                      "Fejlett termékkezelés",
                      "Fizetési gateway integráció",
                      "Rendeléskezelés",
                      "Készletnyilvántartás",
                      "SEO optimalizálás",
                      "Prioritás support",
                    ],
                    highlighted: true,
                    ctaText: "Egyedi árajánlat kérése",
                    ctaLink: "/kapcsolat",
                  },
                  {
                    id: "enterprise",
                    name: "Enterprise",
                    description: "Egyedi e-kereskedelmi platform",
                    features: [
                      "Egyedi e-kereskedelmi platform",
                      "Komplex termékkezelés",
                      "Fizetési gateway integráció",
                      "Rendeléskezelés",
                      "Készletnyilvántartás",
                      "API integrációk",
                      "Dedikált support",
                      "24/7 monitoring",
                    ],
                    ctaText: "Egyedi árajánlat kérése",
                    ctaLink: "/kapcsolat",
                  },
                ]}
                title="Egyedi árajánlat kérése"
                description="Komplett, prémium e-kereskedelmi megoldások egyedi igényekre szabva. Kérj személyre szabott árajánlatot."
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
                <span className="text-brand-primary italic">webshop</span>{" "}
                fejlesztésére?
              </h2>
              <Link
                href="/kapcsolat"
                className="inline-block px-12 py-6 bg-sky-500 hover:bg-violet-700 text-bg-base font-bold rounded-xl uppercase tracking-wider transition-all duration-300"
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
