import HeroSectionNew from "@/components/organisms/HeroSectionNew";
import SocialProofStrip from "@/components/organisms/SocialProofStrip";
import SystemShowcase from "@/components/organisms/SystemShowcase";
import FeaturedServicesNew from "@/components/organisms/FeaturedServicesNew";
import CaseStudiesBento from "@/components/organisms/CaseStudiesBento";
import WhyChooseMeSection from "@/components/organisms/WhyChooseMeSection";
import FaqSectionAEO from "@/components/organisms/FaqSectionAEO";
import FinalCta from "@/components/organisms/FinalCta";
import { Award, Cpu, Clock } from "lucide-react";
import { getDictionary } from "@/lib/dictionary";

/**
 * English homepage (/en) — Server Component.
 *
 * Metadata and JSON-LD live in `src/app/en/layout.tsx`.
 * CRO rules: zero fixed prices, single primary CTA per section,
 * no "Kecskemét" in user-facing copy (international positioning).
 */
export default async function EnHomePage() {
  const dictionary = await getDictionary("en");
  const snapshotCards = [
    { icon: Award, ...dictionary.bentoGrid.expertise },
    { icon: Cpu, ...dictionary.bentoGrid.techStack },
    { icon: Clock, ...dictionary.bentoGrid.timeline },
  ];

  return (
    <div className="grow">
      {/* 1. Hero — conversion H1, CTA hierarchy */}
      <HeroSectionNew content={dictionary.home.hero} />

      {/* 1.5 Direct Answer Bento Grid — AEO optimized professional snapshot */}
      {/* DESIGN NOTE: v7.0 — amber/gold FORBIDDEN, blue-violet only (#00B5F1/#5B21B6) */}
      <section
        aria-label={dictionary.home.snapshot.ariaLabel}
        className="max-w-7xl mx-auto px-4 py-12"
      >
        {/* Hidden H2 — maintains the H1 → H2 → H3 heading hierarchy */}
        <h2 className="sr-only">{dictionary.home.snapshot.heading}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {snapshotCards.map(({ icon: Icon, title, content }) => (
            <div
              key={title}
              className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 hover:border-[#00B5F1]/30 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-8 h-8 text-[#00B5F1]" aria-hidden="true" />
                  <h3 className="text-[#00B5F1] font-semibold text-lg">
                    {title}
                  </h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Social Proof Strip — KPI statistics + scroll-velocity marquee */}
      <SocialProofStrip content={dictionary.home.proof} />

      {/* 3. System Showcase — scroll-bound animated process diagram */}
      <SystemShowcase content={dictionary.home.system} />

      {/* 4. Featured Services — 4 core + AI secondary (40–60 word Direct Answers) */}
      <FeaturedServicesNew content={dictionary.home.services} />

      {/* 5. Case Studies — 2 featured cases with KPI numbers */}
      <CaseStudiesBento content={dictionary.home.cases} />

      {/* 6. Why Choose Me — Balog Norbert E-E-A-T advantages */}
      <WhyChooseMeSection content={dictionary.home.why} />

      {/* 7. FAQ AEO — accordion; JSON-LD rendered server-side in en/layout.tsx */}
      <FaqSectionAEO content={dictionary.home.faq} renderSchema={false} />

      {/* 8. Final CTA */}
      <FinalCta content={dictionary.home.finalCta} />
    </div>
  );
}
