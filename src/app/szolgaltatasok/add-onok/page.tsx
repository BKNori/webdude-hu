// src/app/szolgaltatasok/add-onok/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import {
  ShoppingBag,
  Sparkles,
  Cpu,
  Palette,
  Check,
  ArrowDown,
  HelpCircle,
  Clock,
  Code,
} from "lucide-react";
import { getAddonsAction } from "@/actions/addons";
import { Addon } from "@/types/addon";

export const metadata: Metadata = {
  title: "Azonnali Kiegészítő Szolgáltatások (Add-onok) | WebDude",
  description:
    "Fix áras, termékesített mikro-szolgáltatások a 26 éves tervezőgrafikusi és 16 éves webfejlesztői tapasztalatomra építve. Nincs hosszas egyeztetés, garantált szállítási határidő.",
  openGraph: {
    title: "Azonnali Kiegészítő Szolgáltatások (Add-onok) | WebDude",
    description:
      "Fix áras mikromegoldások azonnali indítással. Weboldal audit, SEO cikk, Lighthouse gyorsítás, banner csomag és Schema integráció.",
    images: [{ url: "/og/webdude-og.jpg", width: 1200, height: 630 }],
  },
};

interface LocalAddon {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  features: string[];
  icon: typeof Cpu;
}

const FALLBACK_ADDONS: LocalAddon[] = [
  {
    id: "ux-ui-roast",
    title: "15 perces Videós UX/UI Roast (Audit)",
    description:
      "Videós képernyőfelvétel-elemzés a weboldalad legkritikusabb használhatósági és konverziós hibáiról. Azonnali, gyakorlati javaslatok a konverzió növelésére.",
    price: 19900,
    category: "CRO & UX",
    features: [
      "15 perces rögzített videó",
      "3 azonnali dizájn javaslat",
      "Mobil-fókuszú elemzés",
      "Garantált 3 munkanapos határidő",
    ],
    icon: Palette,
  },
  {
    id: "ai-blog-package",
    title: "AI + Emberi Blogcikk Csomag",
    description:
      "Profi SEO szakcikk, ami optimalizálva van mind a Google, mind az AI válaszgépek (AEO) számára. AI-asszisztált kutatás, emberi finomhangolás és copywriting.",
    price: 49900,
    category: "SEO & AEO",
    features: [
      "Kulcsszókutatás",
      "1500+ szó terjedelem",
      "AEO optimalizált struktúra",
      "Egyedi illusztráció/kép",
    ],
    icon: Cpu,
  },
  {
    id: "lighthouse-speed-up",
    title: "Lighthouse Sebesség-optimalizálás",
    description:
      "A betöltési idő minimalizálása és a Google Core Web Vitals pontok feljavítása. Gyorsabb oldal, elégedettebb látogatók, jobb konverzió és SEO.",
    price: 59900,
    category: "Technikai",
    features: [
      "Lighthouse Mobil pontszám javítás",
      "Képtömörítés & WebP konverzió",
      "Kódminőség & CSS/JS optimalizálás",
      "Betöltés < 1.5s alatt",
    ],
    icon: Sparkles,
  },
  {
    id: "seasonal-banner-package",
    title: "Szezonális Webshop Banner Csomag (3 db)",
    description:
      "Profi, konverzióra optimalizált banner tervek a webshopod főoldalára, közösségi médiára vagy hirdetésekhez. Kiemelkedő vizuális minőség.",
    price: 39900,
    category: "Grafikai tervezés",
    features: [
      "3 db egyedi méretű banner design",
      "Arculathoz igazított megjelenés",
      "Konverziós fókuszú copywriting",
      "Web-kész formátumok (WebP, PNG)",
    ],
    icon: ShoppingBag,
  },
  {
    id: "schema-aeo-integration",
    title: "Strukturált Adat (Schema.org & AEO) Integráció",
    description:
      "Bonyolult JSON-LD strukturált adatok beágyazása a weboldalad kódjába, hogy a keresőrobotok és az AI (ChatGPT, Gemini, Perplexity) tökéletesen megértsék a vállalkozásodat.",
    price: 29900,
    category: "Modern SEO",
    features: [
      "Entity-based JSON-LD integráció",
      "FAQ, LocalBusiness és Service sémák",
      "AI válasz optimalizálás (AEO)",
      "Google Rich Snippet ellenőrzés",
    ],
    icon: Code,
  },
  {
    id: "ai-seo-audit",
    title: "AI SEO Audit & Optimalizáció",
    description:
      "AI‑vezérelt SEO audit, kulcsszóelemzés és struktúra javítás egyetlen csomagban.",
    price: 44900,
    category: "SEO & AEO",
    features: [
      "AI elemzés",
      "Komplett audit riport",
      "Keresőoptimalizált tartalom",
      "Gyors implementáció",
    ],
    icon: Sparkles,
  },
  {
    id: "branding-package",
    title: "Prémium Brandépítési Csomag",
    description:
      "Logó, színpaletta, tipográfia és brand kézikönyv egy teljes körű csomagban.",
    price: 69900,
    category: "Grafikai tervezés",
    features: [
      "Logó tervezés",
      "Vizuális irányelvek",
      "Kártya- és sablon design",
      "Kézikönyv PDF",
    ],
    icon: Palette,
  },
  {
    id: "performance-boost",
    title: "Teljesítmény‑Boost Csomag",
    description:
      "Weboldalad gyorsítása, kódoptimalizálás, képtömörítés és CDN beállítás.",
    price: 54900,
    category: "Technikai",
    features: [
      "Lighthouse pontszám növelés",
      "Képek optimalizálása",
      "JS/CSS minifikáció",
      "CDN integráció",
    ],
    icon: Cpu,
  },
  {
    id: "content-creation",
    title: "AI Tartalomkészítő Csomag",
    description:
      "AI‑alapú tartalomgenerálás, blogcikkek, social media posztok egy hónapra.",
    price: 39900,
    category: "AI & Content",
    features: [
      "AI‑cikk generálás",
      "SEO‑optimalizált szöveg",
      "Képek és illusztrációk",
      "Szerkesztői átvizsgálás",
    ],
    icon: Code,
  },
  {
    id: "custom-analytics",
    title: "Egyedi Analitika Dashboard",
    description: "Testreszabott analitika dashboard a vállalkozásod KPI‑inak.",
    price: 79900,
    category: "Tech",
    features: [
      "Google Analytics integráció",
      "Egyedi grafikonok",
      "Valós idejű adatok",
      "Exportálás CSV‑be",
    ],
    icon: Check,
  },
];

export default async function AddonsPage() {
  // Try fetching dynamic addons from DB (using empty token, will fallback to presets if unauthenticated)
  let addons = FALLBACK_ADDONS;
  try {
    const res = await getAddonsAction("");
    if (res.success && res.addons && res.addons.length > 0) {
      // Map Firestore addons to includes matching icons if present
      addons = (res.addons as Addon[]).map((a: Addon) => {
        const fallback = FALLBACK_ADDONS.find((f) => f.id === a.id);
        return {
          id: a.id,
          title: a.title,
          description: a.description,
          price: a.price,
          category:
            a.category === "design"
              ? "Grafikai tervezés"
              : a.category === "ai"
                ? "SEO & AEO"
                : a.category === "tech"
                  ? "Technikai"
                  : "CRO & UX",
          features: a.features || [],
          icon: fallback?.icon || Sparkles,
        };
      });
    }
  } catch {
    // Keep fallback presets
  }

  // Generate Schemas for AEO / SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://webdude.hu/#organization",
        name: "WebDude",
        url: "https://webdude.hu",
        logo: "https://webdude.hu/assets/logos/webdude-logo.webp",
        image: "https://webdude.hu/og/webdude-og.jpg",
        description:
          "Prémium webfejlesztési, grafikai és AI-automatizációs szolgáltatások Norbitól.",
        telephone: "+36703238003",
        email: "hello@webdude.hu",
        address: {
          "@type": "PostalAddress",
          addressCountry: "HU",
        },
        founder: {
          "@type": "Person",
          "@id": "https://webdude.hu/#person",
          name: "WebDude Norbi",
          jobTitle: "Lead Architect & Senior Developer",
          description: "26 év grafikai és 16 év programozási tapasztalat.",
        },
      },
      ...addons.map((addon) => ({
        "@type": "Service",
        name: addon.title,
        description: addon.description,
        provider: {
          "@type": "LocalBusiness",
          "@id": "https://webdude.hu/#organization",
        },
        offers: {
          "@type": "Offer",
          price: String(addon.price),
          priceCurrency: "HUF",
          availability: "https://schema.org/InStock",
        },
      })),
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Mi az az Add-on Áruház és hogyan működik?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Az Add-on Áruház fix áras, termékesített kiegészítő szolgáltatásokat tartalmaz. Nincs szükség hosszas árajánlatkérésre: kiválasztod a szolgáltatást, a Kliens Portálon keresztül kiegyenlíted, és azonnal megnyílik az aszinkron onboarding felület az adatok megadásához.",
            },
          },
          {
            "@type": "Question",
            name: "Hogyan történik az aszinkron onboarding és adatgyűjtés?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A fizetés után a portálodon megjelenik egy dedikált onboarding űrlap. Itt megadhatod a szükséges információkat (pl. weboldal URL, célközönség, arculati színek) a saját tempódban. Nincs szükség élő megbeszélésre, így azonnal indulhat a munka.",
            },
          },
          {
            "@type": "Question",
            name: "Mikor és hogyan kapom meg a kész teljesítést?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Minden add-onhoz fix szállítási határidő tartozik (pl. a videós roast 3 munkanapon belül készül el). A kész anyagokat és a hozzátartozó dokumentációt közvetlenül a Kliens Portálod széfjébe (Client Vault) töltöm fel, ahol bármikor biztonságosan letöltheted őket.",
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-300 relative overflow-hidden py-24 md:py-32">
      {/* JSON-LD Schemas injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Decorative ambient background glows */}
      <div className="absolute top-0 left-1/4 w-125 h-125 bg-[#00B5F1]/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-150 h-150 bg-purple-900/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* HERO SECTION */}
        <section className="text-center max-w-4xl mx-auto mb-20 md:mb-28 pt-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase font-mono tracking-widest font-bold text-[#00B5F1] bg-[#00B5F1]/5 border border-[#00B5F1]/20 mb-6 animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            FIX ÁRAS KIEGÉSZÍTŐK
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-8 font-sans">
            Azonnali Kiegészítő Szolgáltatások{" "}
            <br className="hidden md:inline" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1]/400 to-[#5B21B6]">
              Vállalkozásod Növekedéséért
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto">
            Nincs hosszas egyeztetés, nincsenek rejtett költségek. Fix áras,
            termékesített mikromegoldások a
            <strong> 26 éves tervezőgrafikusi</strong> és{" "}
            <strong>16 éves webfejlesztői</strong> tapasztalatomra építve,
            garantált szállítási határidővel.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#catalog"
              className="px-8 py-4 bg-[#00B5F1] hover:bg-[#5B21B6] text-bg-base font-bold rounded-xl uppercase tracking-wider text-xs transition-all duration-300 shadow-lg shadow-[#00B5F1]/10 hover:scale-102 flex items-center gap-2 cursor-pointer"
            >
              Böngéssz az Add-onok között
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </a>
            <Link
              href="/portal"
              className="px-8 py-4 bg-transparent border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-bold rounded-xl uppercase tracking-wider text-xs transition-all duration-300"
            >
              Belépés a Kliens Portálra
            </Link>
          </div>
        </section>

        {/* BENTO GRID PRODUCT CATALOG */}
        <section id="catalog" className="scroll-mt-28 mb-24 md:mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight font-mono">
                TERMÉKKATALÓGUS
              </h2>
              <p className="text-xs text-slate-500 font-mono mt-2 uppercase tracking-widest">
                Kattints a megrendelésre az indításhoz
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-2 text-xs font-mono text-slate-400 bg-transparent border border-white/5 px-4 py-2 rounded-xl">
              <Clock className="w-4 h-4 text-[#00B5F1]" />
              <span>Garantált aszinkron teljesítés</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addons.map((addon) => {
              const Icon = addon.icon;
              // Set column classes based on bento layouts
              let colSpan = "lg:col-span-1";
              if (
                addon.id === "ai-blog-package" ||
                addon.id === "lighthouse-speed-up"
              ) {
                colSpan = "lg:col-span-2";
              } else if (addon.id === "schema-aeo-integration") {
                colSpan = "lg:col-span-3";
              }

              return (
                <div
                  key={addon.id}
                  className={`glass-card glass-card-hover p-8 relative overflow-hidden group border border-white/5 flex flex-col justify-between ${colSpan}`}
                >
                  {/* Decorative faint glow on hover */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#00B5F1]/3 rounded-full blur-2xl group-hover:bg-[#00B5F1]/5 transition-all duration-300" />

                  <div>
                    {/* Category & Icon */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-[#00B5F1]/80 bg-[#00B5F1]/5 border border-[#00B5F1]/10 px-3 py-1 rounded-full">
                        {addon.category}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-transparent border border-white/5 flex items-center justify-center text-slate-400 group-hover:text-[#00B5F1] transition-colors">
                        <Icon className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* Title & Desc */}
                    <h3 className="text-xl font-bold text-white tracking-tight mt-6 font-mono">
                      {addon.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed mt-3">
                      {addon.description}
                    </p>

                    {/* Features list */}
                    <ul className="mt-6 space-y-2.5">
                      {addon.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs text-slate-400"
                        >
                          <Check
                            className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"
                            strokeWidth={2.5}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-mono block">
                        Egyszeri díj
                      </span>
                      <span className="text-2xl font-black text-[#00B5F1] font-mono tracking-wider">
                        {addon.price.toLocaleString("hu-HU")}{" "}
                        <span className="text-xs font-normal">Ft</span>
                      </span>
                    </div>
                    <Link
                      href="/portal"
                      className="px-6 py-3 bg-[#00B5F1] hover:bg-[#5B21B6] text-bg-base font-bold rounded-xl uppercase tracking-wider text-xs transition-all duration-300 text-center flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Megrendelés
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* AEO-OPTIMIZED FAQ SECTION */}
        <section className="max-w-4xl mx-auto border-t border-slate-800/60 pt-20">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase font-mono tracking-widest font-bold text-slate-500 bg-transparent border border-slate-800/80 mb-4">
              <HelpCircle className="w-3.5 h-3.5" />
              KÉRDÉSEK ÉS VÁLASZOK
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight font-mono">
              GYAKRAN ISMÉTELT KÉRDÉSEK
            </h2>
            <p className="text-xs text-slate-500 font-mono mt-2 uppercase tracking-widest">
              Minden, amit az azonnali kiegészítőkről tudni érdemes
            </p>
          </div>

          <div className="space-y-4">
            <details className="group border border-slate-800 bg-transparent rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer select-none text-slate-200 hover:text-white transition-colors">
                <span className="font-bold text-sm md:text-base font-mono">
                  Mi az az Add-on Áruház és hogyan működik?
                </span>
                <span className="transition-transform duration-300 group-open:-rotate-180 text-[#00B5F1]">
                  <ArrowDown className="w-4 h-4" />
                </span>
              </summary>
              <div className="px-6 pb-6 text-sm text-slate-400 leading-relaxed border-t border-slate-800/40 pt-4">
                <p>
                  Az Add-on Áruház fix áras, termékesített kiegészítő
                  szolgáltatásokat tartalmaz. Nincs szükség hosszas
                  egyeztetésekre és árajánlatkérésekre: kiválasztod a számodra
                  szükséges mikro-szolgáltatást, a Kliens Portálodon keresztül
                  kártyával kiegyenlíted, és azonnal elindul az aszinkron
                  onboarding folyamat.
                </p>
              </div>
            </details>

            <details className="group border border-slate-800 bg-transparent rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer select-none text-slate-200 hover:text-white transition-colors">
                <span className="font-bold text-sm md:text-base font-mono">
                  Hogyan történik az aszinkron onboarding és adatgyűjtés?
                </span>
                <span className="transition-transform duration-300 group-open:-rotate-180 text-[#00B5F1]">
                  <ArrowDown className="w-4 h-4" />
                </span>
              </summary>
              <div className="px-6 pb-6 text-sm text-slate-400 leading-relaxed border-t border-slate-800/40 pt-4">
                <p>
                  A megrendelés kifizetése után a Kliens Portálodban
                  automatikusan megjelenik egy dedikált onboarding adatlap. Itt
                  a saját időbeosztásod szerint megadhatod a szükséges bemeneti
                  adatokat (pl. a vizsgálandó weboldal linkjét, a banner
                  méreteit vagy a blogcikk célközönségét). Nem kell meetingeket
                  egyeztetnünk, így a munka azonnal elkezdődhet, amint elküldöd
                  az űrlapot.
                </p>
              </div>
            </details>

            <details className="group border border-slate-800 bg-transparent rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer select-none text-slate-200 hover:text-white transition-colors">
                <span className="font-bold text-sm md:text-base font-mono">
                  Mikor és hogyan kapom meg a kész teljesítést?
                </span>
                <span className="transition-transform duration-300 group-open:-rotate-180 text-[#00B5F1]">
                  <ArrowDown className="w-4 h-4" />
                </span>
              </summary>
              <div className="px-6 pb-6 text-sm text-slate-400 leading-relaxed border-t border-slate-800/40 pt-4">
                <p>
                  Minden kiegészítő szolgáltatáshoz fix, garantált teljesítési
                  határidő tartozik (pl. a videós roast esetében az adatok
                  leadásától számított 3 munkanap). A teljesített munkát, a
                  kapcsolódó linkeket és a leírásokat közvetlenül a Kliens
                  Portálod biztonságos széfjébe (Client Vault) töltöm fel,
                  amelyről e-mailben is értesítést kapsz.
                </p>
              </div>
            </details>
          </div>
        </section>
      </div>
    </div>
  );
}
