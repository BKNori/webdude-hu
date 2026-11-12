import ProductPortalCta from "@/components/molecules/ProductPortalCta";
import SEOAuditHeroBanner from "@/components/organisms/SEOAuditHeroBanner";
import ProofBarSection from "@/components/organisms/ProofBarSection";
import AEOImpactSection from "@/components/organisms/AEOImpactSection";
import LeadGenerationForm from "@/components/organisms/LeadGenerationForm";

export default function SEOAuditProPage() {
  return (
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
  );
}
