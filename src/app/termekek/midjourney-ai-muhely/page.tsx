import Link from "next/link";
import { Image as ImageIcon, Camera, Sun, Layers, ArrowRight, Sparkles } from "lucide-react";
import DirectAnswerBlock from "@/components/molecules/DirectAnswerBlock";
import ProductFaqSection from "@/components/molecules/ProductFaqSection";
import ProductPortalCta from "@/components/molecules/ProductPortalCta";
import ToolAccessGate from "@/components/molecules/ToolAccessGate";
import MidjourneyPromptGenerator from "@/components/organisms/MidjourneyPromptGenerator";

/**
 * /termekek/midjourney-ai-muhely — PUBLIKUS, statikusan prerenderelt SEO/AEO/GEO landing.
 * A generátor kizárólag `ToolAccessGate` mögött (allowedTools: "midjourney_ai_muhely"
 * vagy Szuperadmin) mountolódik.
 */

const features = [
  { icon: ImageIcon, title: "Midjourney v6 Integráció", description: "Naprakész paraméterezés fotórealisztikus és kreatív képekhez" },
  { icon: Camera, title: "85mm G-Master Optika", description: "Professzionális lencse- és mélységélesség-beállítások" },
  { icon: Sun, title: "Chiaroscuro Fényelés", description: "Stúdió- és természetes fény-árnyék kontroll" },
  { icon: Layers, title: "Prémium Vizuálok", description: "Egységes márkaesztétika webes és nyomdai felhasználásra" },
] as const;

const faqs = [
  {
    question: "Mit nyújt a Midjourney AI Műhely?",
    answer:
      "Fotórealisztikus termékfotókhoz, kampányképekhez és illusztrációkhoz állít össze pontosan paraméterezett Midjourney v6 promptokat optikai, fényelési és minőségi beállításokkal, elkerülve a tipikus mesterséges képhibákat.",
  },
  {
    question: "Ki férhet hozzá a Midjourney AI Műhely generátorhoz?",
    answer:
      "A generátor zárt prémium AI modul: kizárólag bejelentkezett, jóváhagyott ügyfeleim érhetik el, akiknek a fiókjához engedélyeztem a modult. Hozzáférést a kapcsolat oldalon igényelhetsz.",
  },
  {
    question: "Hogyan kérhetek hozzáférést vagy egyedi képgenerálást?",
    answer:
      "A kapcsolat oldalon kérhetsz egyedi árajánlatot a saját portál-hozzáférésre vagy kulcsrakész vizuális tartalomgyártásra — rejtett költségek és dobozos sablonok nélkül.",
  },
] as const;

export default function MidjourneyAIMuhelyPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] text-[#0F172A] dark:text-[#F8FAFC]">
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-[#0369A1]/5 dark:from-[#00B5F1]/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center space-y-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0369A1]/10 dark:bg-[#00B5F1]/10 border border-[#0369A1]/25 dark:border-[#00B5F1]/20">
              <Sparkles className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" aria-hidden="true" />
              <span className="text-xs font-bold text-[#0369A1] dark:text-[#00B5F1] uppercase tracking-[0.2em]">
                AI Műhely
              </span>
            </span>
            <h1 className="text-5xl md:text-7xl text-[#0F172A] dark:text-white tracking-tight">
              Midjourney AI{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0369A1] to-[#6D28D9] dark:from-[#00B5F1] dark:to-[#A78BFA]">
                Műhely
              </span>
            </h1>
            <p className="text-lg text-[#334155] dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Midjourney v6 prompt-rendszer prémium márkavizuálokhoz. 85mm G-Master optika, chiaroscuro fényelés
              és nagy felbontású marketing assetek egységes vizuális minőségben.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/kapcsolat"
                className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369A1] hover:to-[#6D28D9] text-white font-bold rounded-full uppercase tracking-wider text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                Egyedi árajánlat kérése
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <DirectAnswerBlock
        id="midjourney-ai-muhely-direct-answer"
        question="Mire való a Midjourney AI Műhely vállalati marketingben?"
        answer="A Midjourney AI Műhely egy professzionális képgeneráló prompt-stúdió, amely fotós optikai, fényelési és kompozíciós szabályokkal állít össze Midjourney v6 utasításokat. 26 év tervezőgrafikai és 16 év webfejlesztői tapasztalattal segít egyedi, stock-mentes kampányképeket készíteni — egyedi árajánlat alapján."
      />

      <section aria-labelledby="midjourney-generator-heading" className="py-16 border-t border-slate-200 dark:border-slate-800/80">
        <div className="max-w-6xl mx-auto px-6">
          <h2 id="midjourney-generator-heading" className="text-3xl md:text-4xl text-center mb-8 tracking-tight">
            AI Midjourney Generátor
          </h2>
          <ToolAccessGate toolId="midjourney_ai_muhely" toolName="Midjourney AI Műhely">
            <MidjourneyPromptGenerator />
          </ToolAccessGate>
        </div>
      </section>

      <section className="py-16 border-t border-slate-200 dark:border-slate-800/80 bg-[#F1F5F9] dark:bg-transparent">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl mb-8 text-center tracking-tight">Funkciók és Előnyök</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const FeatureIcon = feature.icon;
              return (
                <div key={feature.title} className="luminous-card rounded-3xl p-6">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#00B5F1]/10 to-[#5B21B6]/10 border border-[#0369A1]/25 dark:border-[#00B5F1]/20 flex items-center justify-center mb-4">
                    <FeatureIcon className="w-6 h-6 text-[#0369A1] dark:text-[#00B5F1]" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl text-[#0F172A] dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-[#334155] dark:text-slate-300">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ProductFaqSection id="midjourney-ai-muhely-faq" faqs={faqs} />

      <section className="py-16 border-t border-slate-200 dark:border-slate-800/80">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl mb-4 tracking-tight">Készen állsz a Vizuális Tervezésre?</h2>
          <p className="text-[#334155] dark:text-slate-300 mb-8">
            Igényelj hozzáférést a Midjourney AI Műhelyhez, vagy kérj egyedi árajánlatot márkád vizuális anyagaira.
          </p>
          <Link
            href="/kapcsolat"
            className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369A1] hover:to-[#6D28D9] text-white font-bold rounded-full uppercase tracking-wider text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            Hozzáférés igénylése
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <ProductPortalCta productName="Midjourney AI Műhely" />
    </div>
  );
}
