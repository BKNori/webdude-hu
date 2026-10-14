"use client";

/**
 * Nedel Market — Technológiai vívmányok Bento Grid (WebDude OS v7.0 / Kék-Lila).
 *
 * A `NedelMarketCaseStudy` 4 vívmány-kártyájába kibontott, önálló Client
 * Component (Atomic Design: a szülő <300 sor marad). A kártyák glassmorphism
 * felületeken ülnek, rugó-fizikás (spring physics) belépéssel, `useReducedMotion`
 * figyelembevételével; az ikonok lucide-react, a képek `ResponsiveImage`.
 *
 * Színek: kizárólag Kék-Lila v7.0 tokenek; arany/amber/sárga TILOS.
 */

import ResponsiveImage from "@/components/molecules/ResponsiveImage";
import { motion, useReducedMotion } from "motion/react";
import {
  Server,
  ShieldCheck,
  Search,
  BarChart3,
  type LucideIcon,
} from "lucide-react";

/** A háttérképek (a hero a szülőben van; itt a kártya-illusztrációk). */
const IMG = {
  server: "/assets/portfolio/nedel-market/nedel_market_banner.webp",
  produce: "/assets/portfolio/nedel-market/fehér_spárga.webp",
  paprika: "/assets/portfolio/nedel-market/paprika_eladó_banner1.webp",
};

/** Egy Bento kártya adatszerkezete. */
interface TechWin {
  icon: LucideIcon;
  badge: string;
  title: string;
  body: string;
  tags: string[];
  bg?: string;
  span: string;
}

/** A négy technológiai vívmány blokk. */
const TECH_WINS: TechWin[] = [
  {
    icon: Server,
    badge: "A mérnöki csúcs",
    title: "Helyi Szerver és Valós Idejű Könyvelés",
    body: "A projekt legkomolyabb mérnöki kihívása egy saját irodai szerverkörnyezet kiépítése volt. A weboldal közvetlenül kommunikál a helyi szerveren futó könyvelőprogrammal. A folyamatos adatelérést és a maximális adatbiztonságot automatizált tükörmentések (RAID/Backup) garantálják. Nincs többé adatvesztés, csak tökéletes szinkron.",
    tags: ["Egyedi irodai szerver", "Valós idejű szinkron", "RAID / Backup"],
    bg: IMG.server,
    span: "md:col-span-3",
  },
  {
    icon: ShieldCheck,
    badge: "Érthetően, az ügyfélnek",
    title: "Áttörhetetlen Digitális Páncél (Wordfence)",
    body: "A webáruházak és katalógusok a hackerek első számú célpontjai. A beépített Wordfence technológiával egy professzionális, valós idejű tűzfalat húztam a rendszer köré. Védi a cég és a vásárlók adatait, automatikusan blokkolja a rosszindulatú támadásokat, így az üzlet 0-24 órában biztonságban üzemel.",
    tags: ["Valós idejű tűzfal", "Automatikus blokkolás", "0-24 órás védelem"],
    span: "md:col-span-3",
  },
  {
    icon: Search,
    badge: "Érthetően, az ügyfélnek",
    title: "SEO és AI-Kereső Láthatóság (RankMath)",
    body: "Nem elég, ha szép egy weboldal; a Google-nek és a mesterséges intelligenciának (ChatGPT, Perplexity) is tökéletesen értenie kell. A professzionális RankMath rendszerrel olyan AEO/SEO struktúrát építettem fel, ami „lefordítja” az oldal tartalmát a keresőrobotoknak, így mágnesként vonzza a releváns, organikus érdeklődőket és vásárlókat.",
    tags: ["RankMath", "AEO / AI-keresők", "Schema Markup"],
    bg: IMG.paprika,
    span: "md:col-span-3",
  },
  {
    icon: BarChart3,
    badge: "Mérhetőség",
    title: "Adatalapú Döntések",
    body: "A Google Analytics 4, a Google Search Console és a Bing Webmaster Tools precíz bekötésével a tulajdonosok kristálytisztán látják, honnan érkeznek a vevők, mik a legkeresettebb termékek, és hogyan maximalizálható a marketing megtérülése (ROI).",
    tags: ["Google Analytics 4", "Search Console", "Bing Webmaster Tools"],
    bg: IMG.produce,
    span: "md:col-span-3",
  },
];

export default function NedelMarketBentoGrid() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-3xl">
          <h2 className="text-3xl font-bold md:text-5xl">
            A rendszer{" "}
            <span className="text-brand-secondary">négy pillére</span>
          </h2>
          <p className="mt-4 text-lg font-light leading-relaxed text-slate-400">
            Egy valódi üzleti eszköz — ahol az integráció, a biztonság, a
            láthatóság és a mérhetőség egyetlen, összhangban működő egységet
            alkot.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-6">
          {TECH_WINS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={
                  shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: shouldReduceMotion ? 0 : index * 0.1,
                }}
                whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                className={`group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 p-8 backdrop-blur-xl transition-colors duration-300 hover:border-brand-primary/50 hover:shadow-[0_0_40px_-10px_rgba(0,181,241,0.35)] ${item.span}`}
              >
                {item.bg ? (
                  <div className="absolute inset-0 z-0">
                    <ResponsiveImage
                      src={item.bg}
                      alt={`${item.title} — Nedel Market illusztráció`}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover opacity-10 transition-opacity duration-500 group-hover:opacity-20"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-bg-base via-bg-base/80 to-transparent" />
                  </div>
                ) : (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-0 bg-linear-to-br from-cta-from/15 to-cta-to/15"
                  />
                )}

                <div className="relative z-10">
                  <div className="mb-5 flex items-center gap-4">
                    <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-brand-primary/30 bg-brand-primary/10">
                      <Icon className="h-6 w-6 text-brand-primary" aria-hidden />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-primary">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold md:text-2xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    {item.body}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

