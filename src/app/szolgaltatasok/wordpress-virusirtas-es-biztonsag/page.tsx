import SectionTitle from "@/components/atoms/SectionTitle";
import Button from "@/components/atoms/Button";
import { Metadata } from "next";
import { buildBreadcrumbSchema, BreadcrumbItem } from "@/lib/breadcrumb";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "WordPress Vírusírtás & Biztonság – WebDude",
    description:
      "Gyors víruseltávolítás, patching és folyamatos karbantartás WordPress rendszerekre.",
    keywords:
      "WordPress vírusírtás, WordPress biztonság, WordPress karbantartás, víruseltávolítás, biztonsági audit",
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
      <div className="py-24 bg-transparent text-text-primary relative overflow-hidden">
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
              <div className="bg-bg-elevated/30 border border-[#00B5F1]/30 rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-bold text-text-primary mb-4">
                  WordPress árajánlat kérése
                </h3>
                <p className="text-slate-400 mb-6">
                  Minden projekt egyedi igények alapján kerül árazásra. Ingyenes
                  konzultáció a pontos árhoz és a specifikáció kialakításához.
                </p>
                <Button variant="primary" href="/kapcsolat">
                  WordPress árajánlat kérése
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
