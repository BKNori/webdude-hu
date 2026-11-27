import ReactDOM from "react-dom";
import dynamic from "next/dynamic";
import HeroSectionNew from "@/components/organisms/HeroSectionNew";
import Surface from "@/components/atoms/Surface";
import { Award, Cpu, Clock } from "lucide-react";
import { getDictionary } from "@/lib/dictionary";
import { getResponsiveImageVariants } from "@/data/responsiveImages";
import { buildEnJsonLd, serializeJsonLd } from "@/lib/structuredData";

const SocialProofStrip = dynamic(
  () => import("@/components/organisms/SocialProofStrip")
);
const SystemShowcase = dynamic(
  () => import("@/components/organisms/SystemShowcase")
);
const FeaturedServicesNew = dynamic(
  () => import("@/components/organisms/FeaturedServicesNew")
);
const CaseStudiesBento = dynamic(
  () => import("@/components/organisms/CaseStudiesBento")
);
const WhyChooseMeSection = dynamic(
  () => import("@/components/organisms/WhyChooseMeSection")
);
const FaqSectionAEO = dynamic(
  () => import("@/components/organisms/FaqSectionAEO")
);
const FinalCta = dynamic(() => import("@/components/organisms/FinalCta"));

/**
 * English homepage (/en) — Server Component.
 *
 * Metadata and JSON-LD live in `src/app/en/layout.tsx`.
 * CRO rules: zero fixed prices, single primary CTA per section,
 * no "Kecskemét" in user-facing copy (international positioning).
 */
export default async function EnHomePage() {
  const dictionary = await getDictionary("en");
  const jsonLdSchemas = buildEnJsonLd(dictionary);
  const snapshotCards = [
    { icon: Award, ...dictionary.bentoGrid.expertise },
    { icon: Cpu, ...dictionary.bentoGrid.techStack },
    { icon: Clock, ...dictionary.bentoGrid.timeline },
  ];
  const heroBgSrc =
    dictionary.home.hero.slides[0]?.bgImage ??
    "/assets/banners/webdude-hero.webp";
  const heroVariants = getResponsiveImageVariants(heroBgSrc);
  if (heroVariants) {
    ReactDOM.preload(heroVariants.fallback, {
      as: "image",
      type: "image/avif",
      imageSrcSet: heroVariants.avif,
      imageSizes: "100vw",
      fetchPriority: "high",
    });
  }

  return (
    <>
      {/* EN JSON-LD schemas — serialized with XSS protection (AEO / E-E-A-T) */}
      {jsonLdSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
        />
      ))}

      <div className="grow">
      {/* 1. Hero — conversion H1, CTA hierarchy */}
      <HeroSectionNew content={dictionary.home.hero} />

      {/* 1.5 Direct Answer Bento Grid — AEO optimized professional snapshot (Luminous Night Lift) */}
      <Surface
        tone="night-lift"
        aurora
        ariaLabel={dictionary.home.snapshot.ariaLabel}
        className="py-20 md:py-28"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hidden H2 — maintains the H1 → H2 → H3 heading hierarchy */}
          <h2 className="sr-only">{dictionary.home.snapshot.heading}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {snapshotCards.map(({ icon: Icon, title, content }, idx) => (
              <div
                key={title}
                className="luminous-card p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-600/25 dark:bg-brand-primary/12 dark:border-brand-primary/25 flex items-center justify-center">
                        <Icon
                          className="w-5 h-5 text-[#0369A1] dark:text-[#00B5F1]"
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="text-xl md:text-2xl text-[#0F172A] dark:text-white tracking-wider">
                        {title}
                      </h3>
                    </div>
                    <span className="font-mono text-xs text-slate-600 dark:text-slate-400">
                      0{idx + 1}
                    </span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed font-normal">
                    {content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Surface>

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

      {/* 7. FAQ AEO — accordion; JSON-LD rendered server-side above */}
      <FaqSectionAEO content={dictionary.home.faq} renderSchema={false} />

      {/* 8. Final CTA */}
      <FinalCta content={dictionary.home.finalCta} />
      </div>
    </>
  );
}
