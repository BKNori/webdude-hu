import SectionTitle from "@/components/atoms/SectionTitle";
import Button from "@/components/atoms/Button";
import { Metadata } from "next";
import PricingTable from "@/components/molecules/PricingTable";
import { buildBreadcrumbSchema, BreadcrumbItem } from "@/lib/breadcrumb";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "WordPress Webshop Készítés – WebDude",
    description:
      "Testreszabott WordPress webshopok, gyors checkout és SEO-optimalizált struktúra WooCommerce alapú e-kereskedelmi megoldásokhoz.",
    keywords:
      "WordPress webshop, WooCommerce fejlesztés, e-kereskedelmi rendszer, webshop készítés, WooCommerce optimalizálás, Kecskemét",
    openGraph: {
      title: "WordPress Webshop Készítés – WebDude",
      description:
        "Testreszabott WordPress webshopok, gyors checkout és SEO-optimalizált struktúra WooCommerce alapú e-kereskedelmi megoldásokhoz.",
      type: "website",
    },
  };
}

export const revalidate = 3600;

export default async function WebshopPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Főoldal", url: "/" },
    { name: "Szolgáltatások", url: "/szolgaltatasok" },
    {
      name: "WordPress Webshop Készítés",
      url: "/szolgaltatasok/wordpress-webshop-keszites",
    },
  ];

  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "WordPress Webshop Készítés",
    description:
      "Testreszabott WordPress webshopok, gyors checkout és SEO-optimalizált struktúra WooCommerce alapú e-kereskedelmi megoldásokhoz.",
    provider: {
      "@type": "LocalBusiness",
      name: "WebDude",
      url: "https://webdude.hu",
    },
    areaServed: { "@type": "Country", name: "Hungary" },
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
      <main className="min-h-screen pt-40 pb-20 bg-bg-base text-text-primary relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-[#00B5F1]/5 via-transparent to-[#00B5F1]/5" />
        <div className="relative z-10">
          <div className="max-w-6xl mx-auto px-6">
            <SectionTitle
              center
              eyebrow="Szolgáltatás"
              title="WordPress Webshop Készítés"
              description="Skálázható, konverzió-vezérelt WooCommerce és headless shop megoldások gyorsan és megbízhatóan."
              className="mx-auto"
            />
            <div className="mt-12 max-w-3xl mx-auto">
              <p className="text-xl text-slate-700 leading-relaxed mb-8">
                16 éves WordPress tapasztalattal olyan e-kereskedelmi
                rendszereket építek, amelyek nem csak termékeket árulnak, hanem
                ügyfeleket szereznek automatizált folyamattal.
              </p>
              <ul className="space-y-4 mb-8 text-slate-600">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#00B5F1] rounded-full" />
                  <span>WooCommerce fejlesztés és optimalizálás</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#00B5F1] rounded-full" />
                  <span>Gyors checkout és fizetési integráció</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#00B5F1] rounded-full" />
                  <span>SEO és konverzió-optimalizált struktúra</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#00B5F1] rounded-full" />
                  <span>Automatizált készletkezelés</span>
                </li>
              </ul>
              <div className="mt-8">
                <PricingTable
                  tiers={[
                    {
                      id: "basic",
                      name: "Alap Webshop",
                      description: "Egyszerű WooCommerce webshop 3-4 hét alatt",
                      features: [
                        "WooCommerce telepítés és konfiguráció",
                        "Alap termékkezelés",
                        "1 fizetési integráció",
                        "GDPR adatkezelési szabályzat",
                        "Adminfelület beállítás",
                        "Mobil optimalizált design",
                        "1 hónap karbantartás",
                      ],
                      ctaText: "Alap webshop kérése",
                      ctaLink: "/kapcsolat",
                    },
                    {
                      id: "professional",
                      name: "Komplett Webshop",
                      description: "Komplex WooCommerce webshop 4-6 hét alatt",
                      features: [
                        "WooCommerce fejlett konfiguráció",
                        "Komplex termékkezelés",
                        "Több fizetési integráció",
                        "Szállítási módok beállítása",
                        "GDPR és adatkezelés",
                        "Adminfelület és szupport",
                        "SEO optimalizálás",
                        "3 hónap karbantartás",
                      ],
                      highlighted: true,
                      ctaText: "Komplett webshop kérése",
                      ctaLink: "/kapcsolat",
                    },
                    {
                      id: "enterprise",
                      name: "E-kereskedelmi Rendszer",
                      description:
                        "Komplex e-kereskedelmi rendszer 6-10 hét alatt",
                      features: [
                        "Komplex WooCommerce rendszer",
                        "API integrációk",
                        "Készletnyilvántartás",
                        "Automatikus rendeléskezelés",
                        "GDPR és adatbiztonság",
                        "Adminfelület és szupport nézőkör",
                        "Performance optimalizálás",
                        "6 hónap karbantartás",
                      ],
                      ctaText: "E-kereskedelmi rendszer kérése",
                      ctaLink: "/kapcsolat",
                    },
                  ]}
                  title="Válassza ki a megfelelő WordPress webshop csomagot"
                  description="Skálázható, konverzió-vezérelt WooCommerce és headless shop megoldások. Kérjen személyre szabott árajánlatot."
                />
              </div>
              <Button variant="primary" href="/kapcsolat">
                Árajánlat kérése
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
