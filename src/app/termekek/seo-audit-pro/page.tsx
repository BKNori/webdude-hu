import ProductPortalCta from "@/components/molecules/ProductPortalCta";
import DirectAnswerBlock from "@/components/molecules/DirectAnswerBlock";
import ProductFaqSection from "@/components/molecules/ProductFaqSection";
import SEOAuditHeroBanner from "@/components/organisms/SEOAuditHeroBanner";
import ProofBarSection from "@/components/organisms/ProofBarSection";
import AEOImpactSection from "@/components/organisms/AEOImpactSection";
import LeadGenerationForm from "@/components/organisms/LeadGenerationForm";

const faqs = [
  {
    question: "Mit vizsgál az SEO & AEO Audit Pro?",
    answer:
      "A Core Web Vitals teljesítményt, a technikai crawlability-t, a Schema.org JSON-LD entitásokat és az AI válaszmotorokban (ChatGPT, Perplexity, Gemini) való idézhetőséget.",
  },
  {
    question: "Milyen gyorsan készül el az audit?",
    answer:
      "Általában 3–5 munkanapon belül kézhez kapod a priorizált technikai és tartalmi javítási tervet — egyedi árajánlat alapján.",
  },
] as const;

export default function SEOAuditProPage() {
  return (
    <div className="min-h-screen bg-bg-base">
      <SEOAuditHeroBanner />

      <DirectAnswerBlock
        id="seo-audit-pro-direct-answer"
        question="Mit nyújt az SEO & AEO Audit Pro vállalkozásoknak?"
        answer="Teljes körű technikai SEO, Core Web Vitals és AEO (Answer Engine Optimization) diagnosztika 26 év grafikai és 16 év webfejlesztői tapasztalattal. Nem sablonos automatikus exportot kapsz, hanem kézzel ellenőrzött Schema.org, indexelési és konverziós akciótervet egyedi árajánlat alapján."
      />

      <ProofBarSection />

      <AEOImpactSection />

      <section className="py-16 border-t border-slate-200 dark:border-[#00B5F1]/10 bg-[#F1F5F9] dark:bg-bg-elevated/30">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl text-[#0F172A] dark:text-white mb-6 text-center">
            Miért a WebDude.hu?
          </h2>
          <div className="space-y-6 text-[#334155] dark:text-slate-300">
            <p className="text-lg leading-relaxed">
              <strong className="text-[#0369A1] dark:text-[#00B5F1]">
                26 év grafikai és 16 év webfejlesztői rutin
              </strong>{" "}
              — minden auditom a gyakorlati tapasztalatomon alapul. Nem
              automatizált export, hanem szakértői elemzés.
            </p>
            <p className="text-lg leading-relaxed">
              A hagyományos SEO halott. Az entitás-alapú keresőoptimalizálás
              és az AEO (Answer Engine Optimization) a jövő. Én nem csak
              rangsorolok, hanem dominálom a válaszokat.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-8">
              <div className="luminous-card rounded-2xl p-5">
                <h3 className="text-xl text-[#0F172A] dark:text-white mb-2">
                  95+ Lighthouse score
                </h3>
                <p className="text-sm text-[#475569] dark:text-slate-400">
                  Mérnöki szintű technikai alapok
                </p>
              </div>
              <div className="luminous-card rounded-2xl p-5">
                <h3 className="text-xl text-[#0F172A] dark:text-white mb-2">
                  16 év CMS szakértelem
                </h3>
                <p className="text-sm text-[#475569] dark:text-slate-400">
                  Next.js, WordPress & WooCommerce
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductFaqSection id="seo-audit-pro-faq" faqs={faqs} />

      <section className="py-16 border-t border-slate-200 dark:border-[#00B5F1]/10">
        <div className="max-w-4xl mx-auto px-6">
          <LeadGenerationForm />
        </div>
      </section>

      <ProductPortalCta productName="SEO Audit Pro" />
    </div>
  );
}
