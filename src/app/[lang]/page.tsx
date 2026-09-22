import HeroSectionNew from "@/components/organisms/HeroSectionNew";
import SocialProofStrip from "@/components/organisms/SocialProofStrip";
import SystemShowcase from "@/components/organisms/SystemShowcase";
import FeaturedServicesNew from "@/components/organisms/FeaturedServicesNew";
import CaseStudiesBento from "@/components/organisms/CaseStudiesBento";
import WhyChooseMeSection from "@/components/organisms/WhyChooseMeSection";
import FaqSectionAEO from "@/components/organisms/FaqSectionAEO";
import FinalCta from "@/components/organisms/FinalCta";
import { Metadata } from "next";
import { getDictionary } from "@/lib/dictionary";
import { Language } from "@/types/dictionary";
import { Award, Cpu, Clock } from "lucide-react";

interface LangPageProps {
  params: {
    lang: Language;
  };
}

export async function generateMetadata({
  params,
}: LangPageProps): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang);

  return {
    title: `${dictionary.common.title} | ${dictionary.hero.title}`,
    description: dictionary.common.description,
    alternates: {
      canonical: "https://webdude.hu",
      languages: {
        "hu-HU": "https://webdude.hu",
        "en-US": "https://webdude.hu/en",
      },
    },
    openGraph: {
      title: `${dictionary.common.title} | ${dictionary.hero.title}`,
      description: dictionary.common.description,
      url:
        params.lang === "en" ? "https://webdude.hu/en" : "https://webdude.hu",
      siteName: dictionary.common.title,
      images: [
        {
          url: "https://webdude.hu/og/webdude-og.jpg",
          width: 1200,
          height: 630,
        },
      ],
      locale: params.lang === "en" ? "en_US" : "hu_HU",
      type: "website",
    },
  };
}

export default async function LangPage({ params }: LangPageProps) {
  const dictionary = await getDictionary(params.lang);

  return (
    <>
      {/* ── Főoldal szekciók ───────────────────────────────────────────────── */}
      <div className="grow">
        {/* 1. Hero — kétoszlopos, Bento Dashboard, stagger animáció */}
        <HeroSectionNew />

        {/* 1.5 Direct Answer Bento Grid — AEO optimalizált "Műszaki & Szolgáltatási Snapshot" */}
        <section
          aria-label="Rendszer áttekintés és specifikáció"
          className="max-w-7xl mx-auto px-4 py-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Kártya - Szakértői Háttér */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 hover:border-amber-500/30 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Award className="w-8 h-8 text-amber-400" />
                  <h3 className="text-amber-400 font-semibold text-lg">
                    {dictionary.bentoGrid.expertise.title}
                  </h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {dictionary.bentoGrid.expertise.content}
                </p>
              </div>
            </div>

            {/* 2. Kártya - Technológiai Stack */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 hover:border-[#00B5F1]/30 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Cpu className="w-8 h-8 text-[#00B5F1]" />
                  <h3 className="text-[#00B5F1] font-semibold text-lg">
                    {dictionary.bentoGrid.techStack.title}
                  </h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {dictionary.bentoGrid.techStack.content}
                </p>
              </div>
            </div>

            {/* 3. Kártya - Projekt Időzítés & Garancia */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 hover:border-emerald-500/30 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-8 h-8 text-emerald-400" />
                  <h3 className="text-emerald-400 font-semibold text-lg">
                    {dictionary.bentoGrid.timeline.title}
                  </h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {dictionary.bentoGrid.timeline.content}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Social Proof Strip — KPI statisztikák + scroll-velocity marquee */}
        <SocialProofStrip />

        {/* 3. System Showcase — scroll-bound animated folyamatábra */}
        <SystemShowcase />

        {/* 4. Featured Services — aszimmetrikus Bento Grid */}
        <FeaturedServicesNew />

        {/* 5. Case Studies — 2 kiemelt esettanulmány KPI számokkal */}
        <CaseStudiesBento />

        {/* 6. Why Choose Me — összehasonlítás, előnyök */}
        <WhyChooseMeSection />

        {/* 7. FAQ AEO — accordion + FAQPage JSON-LD */}
        <FaqSectionAEO />

        {/* 8. Final CTA */}
        <FinalCta />
      </div>
    </>
  );
}
