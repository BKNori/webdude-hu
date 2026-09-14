import SectionTitle from "@/components/atoms/SectionTitle";
import PricingTable from "@/components/molecules/PricingTable";
import { Metadata } from "next";
import { buildBreadcrumbSchema, BreadcrumbItem } from "@/lib/breadcrumb";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "WordPress Vírusírtás & Biztonság – WebDude",
    description:
      "Gyors víruseltávolítás, patching és folyamatos karbantartás WordPress rendszerekre.",
    keywords:
      "WordPress vírusírtás, WordPress biztonság, WordPress karbantartás, víruseltávolítás, biztonsági audit, Kecskemét",
    openGraph: {
      title: "WordPress Vírusírtás & Biztonság – WebDude",
      description:
        "Gyors víruseltávolítás, patching és folyamatos karbantartás WordPress rendszerekre.",
      type: "website",
    },
  };
}

export const revalidate = 3600;

export default async function SecurityPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Főoldal", url: "/" },
    { name: "Szolgáltatások", url: "/szolgaltatasok" },
    {
      name: "WordPress Vírusírtás & Biztonság",
      url: "/szolgaltatasok/wordpress-virusirtas-es-biztonsag",
    },
  ];

  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "WordPress Vírusírtás & Biztonság",
    description:
      "Gyors víruseltávolítás, patching és folyamatos karbantartás WordPress rendszerekre.",
    provider: {
      "@type": "LocalBusiness",
      name: "WebDude",
      url: "https://webdude.hu",
    },
    areaServed: { "@type": "Country", name: "Hungary" },
    offers: {
      "@type": "Offer",
      price: "30.000",
      priceCurrency: "HUF",
      availability: "https://schema.org/InStock",
    },
  };

  const pricingTiers = [
    {
      id: "basic",
      name: "Vírusirtás",
      price: "30.000",
      description: "Egy alkalmas víruseltávolítás és biztonsági audit",
      features: [
        "Teljes víruseltávolítás és tisztítás",
        "Biztonsági audit és javítások",
        "Biztonsági mentés készítése",
        "SSL certifikátus ellenőrzés",
        "Plugins és téma frissítése",
      ],
      ctaText: "Vírusirtás kérése",
      ctaLink: "/kapcsolat",
    },
    {
      id: "maintenance",
      name: "Havi Karbantartás",
      price: "15.000",
      description: "Folyamatos védelem és optimalizáció",
      features: [
        "Napi biztonsági mentések",
        "Havi biztonsági audit",
        "Automatikus plugin és frissítések",
        "Teljesítmény optimalizálás",
        "24 órás hibajelentés",
        "Prioritási támogatás",
      ],
      highlighted: true,
      ctaText: "Karbantartás igénylése",
      ctaLink: "/kapcsolat",
    },
    {
      id: "enterprise",
      name: "Prémium Csomag",
      price: "25.000",
      description: "Teljes körű biztonsági és teljesítmény szolgáltatás",
      features: [
        "Minden havi karbantartás funkció",
        "Vírusirtás és biztonsági audit",
        "SEO optimalizálás",
        "Tartalom frissítések",
        "WordPress optimalizálás",
        "Personalizált konzultáció",
      ],
      ctaText: "Prémium csomag",
      ctaLink: "/kapcsolat",
    },
  ];

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
      <main className="py-24 bg-transparent text-text-primary relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-[#00B5F1]/5 via-transparent to-[#00B5F1]/5" />
        <div className="relative z-10">
          <div className="max-w-6xl mx-auto px-6">
            <SectionTitle
              center
              eyebrow="Szolgáltatások"
              title="Vírusírtás & Biztonság"
              description="Gyors beavatkozás és folyamatos védelem WordPress oldalaknak. Rendszeres biztonsági audit és automatikus frissítések a maximális biztonságért."
              className="mx-auto"
            />

            <div className="mt-20">
              <PricingTable
                tiers={pricingTiers}
                title="Válassza ki a megfelelő biztonsági szintet"
                description="Havi vagy egyedi szolgáltatások, minden csomag garantált védelmet és optimalizált teljesítményt biztosít"
                currency="Ft"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
