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
        <section className="py-16 border-t border-slate-200 dark:border-[#00B5F1]/10 bg-[#F1F5F9] dark:bg-bg-elevated/30">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-[#0F172A] dark:text-white mb-6 text-center">
              Miért a WebDude.hu?
            </h2>
            <div className="space-y-6 text-[#334155] dark:text-slate-300">
              <p className="text-lg leading-relaxed">
                <strong className="text-[#0369A1] dark:text-[#00B5F1]">
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
                <div className="luminous-card rounded-lg p-4">
                  <h3 className="text-lg font-bold text-[#0F172A] dark:text-white mb-2">
                    95+ Lighthouse score
                  </h3>
                  <p className="text-sm text-[#475569] dark:text-slate-400">
                    Alapú technikai alapok
                  </p>
                </div>
                <div className="luminous-card rounded-lg p-4">
                  <h3 className="text-lg font-bold text-[#0F172A] dark:text-white mb-2">
                    16 év CMS szakértelem
                  </h3>
                  <p className="text-sm text-[#475569] dark:text-slate-400">
                    WordPress & WooCommerce
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Generation Form */}
        <section className="py-16 border-t border-slate-200 dark:border-[#00B5F1]/10">
          <div className="max-w-4xl mx-auto px-6">
            <LeadGenerationForm />
          </div>
        </section>

        <ProductPortalCta productName="SEO Audit Pro" />
      </div>
  );
}
