import SectionTitle from "@/components/atoms/SectionTitle";
import Button from "@/components/atoms/Button";
import { Metadata } from "next";
import PricingTable from "@/components/molecules/PricingTable";
import { buildBreadcrumbSchema, BreadcrumbItem } from "@/lib/breadcrumb";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "WordPress Weboldal Készítés – WebDude (Kecskemét)",
    description:
      "Helyi vállalkozásoknak készült WordPress weboldalak, gyors betöltéssel és mobilbarát dizájnnal.",
    keywords:
      "WordPress weboldal készítés, Kecskemét weboldal, helyi SEO, WordPress fejlesztés, mobilbarát weboldal, Kecskemét",
    openGraph: {
      title: "WordPress Weboldal Készítés – WebDude (Kecskemét)",
      description:
        "Helyi vállalkozásoknak készült WordPress weboldalak, gyors betöltéssel és mobilbarát dizájnnal.",
      type: "website",
    },
  };
}

export const revalidate = 3600;

export default async function LocalWpPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Főoldal", url: "/" },
    { name: "Szolgáltatások", url: "/szolgaltatasok" },
    {
      name: "WordPress Weboldal Készítés — Kecskemét",
      url: "/szolgaltatasok/wordpress-weboldal-keszites-kecskemet",
    },
  ];

  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "WordPress Weboldal Készítés – Kecskemét",
    description:
      "Helyi vállalkozásoknak készült WordPress weboldalak, gyors betöltéssel és mobilbarát dizájnnal.",
    provider: {
      "@type": "LocalBusiness",
      name: "WebDude",
      url: "https://webdude.hu",
    },
    areaServed: { "@type": "City", name: "Kecskemét" },
    offers: {
      "@type": "Offer",
      price: "120.000",
      priceCurrency: "HUF",
      availability: "https://schema.org/InStock",
    },
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
      <main className="min-h-screen pt-40 pb-20 bg-transparent text-text-primary relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-[#00B5F1]/5 via-transparent to-[#00B5F1]/5" />
        <div className="relative z-10">
          <div className="max-w-6xl mx-auto px-6">
            <SectionTitle
              center
              eyebrow="Szolgáltatás"
              title="WordPress Weboldal Készítés — Kecskemét"
              description="Helyi vállalkozásoknak tervezett, SEO-barát WordPress oldalak gyors megvalósítással."
              className="mx-auto"
            />
            <div className="mt-12 max-w-3xl mx-auto">
              <p className="text-xl text-slate-700 leading-relaxed mb-8">
                16 éves WordPress tapasztalattal olyan weboldalakat építek a
                helyi vállalkozásoknak, amelyek nem csak informálnak, hanem
                ügyfeleket szereznek.
              </p>
              <ul className="space-y-4 mb-8 text-slate-600">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#00B5F1] rounded-full" />
                  <span>Helyi SEO optimalizáció és Google Térkép</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#00B5F1] rounded-full" />
                  <span>Gyors betöltés és mobilbarát dizájn</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#00B5F1] rounded-full" />
                  <span>Konverzió-optimalizált landing oldalak</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#00B5F1] rounded-full" />
                  <span>Személyes konzultáció és támogatás</span>
                </li>
              </ul>
              <div className="mt-8">
                <PricingTable
                  tiers={[
                    {
                      id: "basic",
                      name: "Egyszerű Weboldal",
                      price: "120.000",
                      description:
                        "Helyi vállalkozásoknak egyszerű weboldal 2-3 hét alatt",
                      features: [
                        "WordPress telepítés és konfiguráció",
                        "Reszponzív design",
                        "Helyi SEO optimalizáció",
                        "Google Térkép integráció",
                        "Adminfelület beállítás",
                        "1 hónap karbantartás",
                      ],
                      ctaText: "Egyszerű weboldal kérése",
                      ctaLink: "/kapcsolat",
                    },
                    {
                      id: "corporate",
                      name: "Vállalati Weboldal",
                      price: "200.000",
                      description: "Komplex vállalati oldal 3-4 hét alatt",
                      features: [
                        "WordPress fejlett konfiguráció",
                        "Egyedi design és branding",
                        "Több oldal és szekció",
                        "SEO és AEO optimalizálás",
                        "Adminfelület és szupport",
                        "3 hónap karbantartás",
                      ],
                      highlighted: true,
                      ctaText: "Vállalati weboldal kérése",
                      ctaLink: "/kapcsolat",
                    },
                    {
                      id: "premium",
                      name: "Prémium Weboldal",
                      price: "350.000",
                      description:
                        "Teljes körű weboldal rendszer 4-6 hét alatt",
                      features: [
                        "Komplex WordPress rendszer",
                        "Egyedi fejlesztés és integrációk",
                        "Performance optimalizálás",
                        "Biztonsági audit",
                        "Adminfelület és szupport nézőkör",
                        "6 hónap karbantartás",
                      ],
                      ctaText: "Prémium weboldal kérése",
                      ctaLink: "/kapcsolat",
                    },
                  ]}
                  title="Válassza ki a megfelelő WordPress csomagot"
                  description="Helyi vállalkozásoknak készült WordPress weboldalak gyors megvalósítással"
                  currency="Ft"
                />
              </div>
              <Button variant="primary" href="/kapcsolat">
                Ingyenes konzultáció
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
