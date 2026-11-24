import Link from "next/link";
import { Image as ImageIcon, Palette, Camera, Zap, ArrowRight, Sparkles } from "lucide-react";
import DirectAnswerBlock from "@/components/molecules/DirectAnswerBlock";
import ProductFaqSection from "@/components/molecules/ProductFaqSection";
import ProductPortalCta from "@/components/molecules/ProductPortalCta";
import ToolAccessGate from "@/components/molecules/ToolAccessGate";
import BannerPromptGenerator from "@/components/organisms/BannerPromptGenerator";

/**
 * /termekek/banner-ai-muhely — PUBLIKUS, statikusan prerenderelt SEO/AEO/GEO landing.
 * A generátor kizárólag `ToolAccessGate` mögött (allowedTools: "banner_ai_muhely"
 * vagy Szuperadmin) mountolódik; a landing tartalom bejelentkezés nélkül indexelhető.
 */

const features = [
  { icon: ImageIcon, title: "Midjourney v6 Master", description: "Prémium prompt sablonok a tűéles kampányvizuálokhoz" },
  { icon: Palette, title: "90/8/2 Színarány", description: "Kék-Lila vizuális hierarchia a konverzió támogatásához" },
  { icon: Camera, title: "85mm G-Master Optika", description: "Professzionális fotós mélységélesség és optikai karakter" },
  { icon: Zap, title: "Chiaroscuro Fényelés", description: "Tudatos fény-árnyék kontraszt az olvasási fókuszért" },
] as const;

const faqs = [
  {
    question: "Mire használható a Banner AI Műhely?",
    answer:
      "Konverziófókuszú webes hero-, display- és social hirdetési bannerekhez állít össze Midjourney v6 Master promptokat pontos képaránnyal, színpalettával és copy-space iránymutatással, 26 év tervezőgrafikai tapasztalattal felépítve.",
  },
  {
    question: "Ki férhet hozzá a Banner AI Műhely generátorhoz?",
    answer:
      "A generátor zárt prémium AI modul: kizárólag bejelentkezett, jóváhagyott ügyfeleim használhatják, akiknek a fiókjához engedélyeztem a modult. Hozzáférést a kapcsolat oldalon igényelhetsz.",
  },
  {
    question: "Mennyibe kerül a Banner AI Műhely használata?",
    answer:
      "Minden együttműködés és modul-hozzáférés egyedi árajánlat alapján történik a kampányok számához és a szükséges grafikai utómunkához igazítva.",
  },
] as const;

export default function BannerAIMuhelyPage() {
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
              Banner AI{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0369A1] to-[#6D28D9] dark:from-[#00B5F1] dark:to-[#A78BFA]">
                Műhely
              </span>
            </h1>
            <p className="text-lg text-[#334155] dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Konverziófókuszú banner tervezés Midjourney v6 Master promptokkal. Tudatos 90/8/2 színarány,
              prémium optikai beállítások és 4K felbontású kampányvizuálok webes és social felületekre.
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
        id="banner-ai-muhely-direct-answer"
        question="Hogyan segít a Banner AI Műhely a hirdetési kreatívok tervezésében?"
        answer="A Banner AI Műhely egy prémium AI kampánybanner-tervező modul, amely képarány, színpaletta és üzenet alapján Midjourney v6 Master promptokat készít. 26 év tervezőgrafikai és 16 év webfejlesztői tapasztalatra építve segít nagy átkattintású, 4K-s webes és social kreatívokat előállítani — egyedi árajánlat alapján."
      />

      <section aria-labelledby="banner-generator-heading" className="py-16 border-t border-slate-200 dark:border-slate-800/80">
        <div className="max-w-6xl mx-auto px-6">
          <h2 id="banner-generator-heading" className="text-3xl md:text-4xl text-center mb-8 tracking-tight">
            AI Banner Generátor
          </h2>
          <ToolAccessGate toolId="banner_ai_muhely" toolName="Banner AI Műhely">
            <BannerPromptGenerator />
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

      <ProductFaqSection id="banner-ai-muhely-faq" faqs={faqs} />

      <section className="py-16 border-t border-slate-200 dark:border-slate-800/80">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl mb-4 tracking-tight">Készen állsz a Banner Tervezésre?</h2>
          <p className="text-[#334155] dark:text-slate-300 mb-8">
            Igényelj hozzáférést a Banner AI Műhelyhez, vagy kérj egyedi árajánlatot teljes kampánykreatív-csomagra.
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

      <ProductPortalCta productName="Banner AI Műhely" />
    </div>
  );
}
