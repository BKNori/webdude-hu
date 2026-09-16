import { Metadata } from "next";
import ProductPortalCta from "@/components/molecules/ProductPortalCta";
import SEOAuditHeroBanner from "@/components/organisms/SEOAuditHeroBanner";
import ProofBarSection from "@/components/organisms/ProofBarSection";
import AEOImpactSection from "@/components/organisms/AEOImpactSection";
import LeadGenerationForm from "@/components/organisms/LeadGenerationForm";

export const metadata: Metadata = {
  title: "SEO & AEO Audit Pro - WebDude.hu",
  description:
    "SEO & AEO Audit Pro: A 26 éves tapasztalat erejével a találati listák élén. 95+ Lighthouse score alapú technikai alapok, 16 év WordPress & WooCommerce CMS szakértelem.",
  openGraph: {
    title: "SEO & AEO Audit Pro - WebDude.hu",
    description:
      "SEO & AEO Audit Pro: A 26 éves tapasztalat erejével a találati listák élén.",
    url: "https://webdude.hu/termekek/seo-audit-pro",
    siteName: "WebDude",
    images: [
      {
        url: "/og/webdude-og.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "hu_HU",
    type: "website",
  },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "SEO & AEO Audit Pro",
  description:
    "SEO & AEO Audit Pro: A 26 éves tapasztalat erejével a találati listák élén. 95+ Lighthouse score alapú technikai alapok, 16 év WordPress & WooCommerce CMS szakértelem.",
  image: "https://webdude.hu/og/webdude-og.jpg",
  brand: {
    "@type": "Brand",
    name: "WebDude",
  },
  offers: {
    "@type": "Offer",
    price: "149000",
    priceCurrency: "HUF",
    availability: "https://schema.org/InStock",
    url: "https://webdude.hu/termekek/seo-audit-pro",
    priceValidUntil: "2027-12-31",
    seller: {
      "@type": "Organization",
      name: "WebDude.hu",
    },
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "31",
  },
};

export default function SEOAuditProPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema).replace(/</g, "\\u003c"),
        }}
      />
      <div className="min-h-screen bg-bg-base">
        {/* Hero-Banner Section */}
        <SEOAuditHeroBanner />

        {/* Proof-Bar Section */}
        <ProofBarSection />

        {/* AEO Impact Section */}
        <AEOImpactSection />

        {/* Konverziós Copy Section */}
        <section className="py-16 border-t border-[#00B5F1]/10 bg-bg-elevated/30">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Miért a WebDude.hu?
            </h2>
            <div className="space-y-6 text-slate-300">
              <p className="text-lg leading-relaxed">
                <strong className="text-[#00B5F1]">
                  26 év grafikai és 16 év webfejlesztői rutin
                </strong>{" "}
                - minden auditunk a gyakorlati tapasztalatunkon alapul. Nem
                automatizált eszköz, hanem szakértői elemzés.
              </p>
              <p className="text-lg leading-relaxed">
                A hagyományos SEO halott. Az entitás-alapú keresőoptimalizálás
                és az AEO (Answer Engine Optimization) a jövő. Mi nem csak
                rangsorolunk, mi domináljuk a válaszokat.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-8">
                <div className="bg-bg-base/50 border border-[#00B5F1]/20 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-white mb-2">
                    95+ Lighthouse score
                  </h3>
                  <p className="text-sm text-slate-400">
                    Alapú technikai alapok
                  </p>
                </div>
                <div className="bg-bg-base/50 border border-[#00B5F1]/20 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-white mb-2">
                    16 év CMS szakértelem
                  </h3>
                  <p className="text-sm text-slate-400">
                    WordPress & WooCommerce
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Generation Form */}
        <section className="py-16 border-t border-[#00B5F1]/10">
          <div className="max-w-4xl mx-auto px-6">
            <LeadGenerationForm />
          </div>
        </section>

        <ProductPortalCta productName="SEO Audit Pro" />
      </div>
    </>
  );
}
