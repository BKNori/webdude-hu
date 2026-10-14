/**
 * Leanperial — „Quiet Luxury" Bento Grid (WebDude OS v7.0 / Kék-Lila).
 *
 * A `LeanperialCaseStudy` 5. folyamat-szekciójába kibontott, önálló TISZTA
 * React Server Component (RSC). Indoklás (Atomic Design): a szülő komponens
 * egy fájlban tartásával a „~300 sor/komponens" határt lépte volna át; a
 * grid adatait és JSX-ét ezért külön organismusba szerveztük. Nincs
 * `"use client"`, nincs `motion` — a hover/glow/glass effektek CSS-only.
 *
 * Színek: kizárólag Kék-Lila v7.0 tokenek; arany/amber/sárga TILOS.
 */

import ResponsiveImage from "@/components/molecules/ResponsiveImage";
import {
  ShieldCheck,
  Palette,
  Mail,
  Search,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

/** Az illusztrációs háttérképek (a szülő `hero` képe ebben a gridben nincs). */
const IMG = {
  banner: "/assets/portfolio/leanperial/K-Leanperial_banner.webp",
  banner2: "/assets/portfolio/leanperial/K-Leanperial_banner2.webp",
  questioning: "/assets/portfolio/leanperial/K-Mastering_questioning_bg.webp",
  executive: "/assets/portfolio/leanperial/K-Executive_Search-bg.webp",
};

/** Egy Bento kártya adatszerkezete. */
interface ProcessStep {
  icon: LucideIcon;
  title: string;
  lead: string;
  body: string;
  tech: string[];
  /** Opcionális háttérkép áttetsző rétegként. */
  bg?: string;
  /** Aszimmetrikus oszlop-felosztás (md+). */
  span: string;
}

/**
 * Az öt folyamat. A `bg` a kártya háttérképe (ha van), `span` az
 * aszimmetrikus oszlop-felosztás (md+), `icon` a lucide komponens.
 */
const PROCESS: ProcessStep[] = [
  {
    icon: ShieldCheck,
    title: "Válságkezelés & Kártevőirtás",
    lead: "Egy kompromittálódott, kártevőtől fertőzött, lassú örökségi weboldalt örököltem.",
    body: "Teljes kártevőirtás és fertőtlenítés, a sérült DNS-zóna és a rekordok szakmai újjáépítése. Friss Let's Encrypt tanúsítvány, majd a teljes környezet megerősítése — hogy a luxusmárka neve soha többé ne jelenjen meg „nem biztonságos” figyelmeztetés mellett.",
    tech: ["Malware eltávolítás", "DNS menedzsment", "Let's Encrypt SSL"],
    bg: IMG.executive,
    span: "md:col-span-3",
  },
  {
    icon: Palette,
    title: "Prémium UI/UX (Quiet Luxury)",
    lead: "A „halk luxus” esztétikáját fordítottam le digitális felületre.",
    body: "Visszafogott tipográfia, bőséges negatív tér, csendes, de öntudatos mozdulatok. A Kadence témára épülő egyedi blokkokkal egy olyan élményt terveztem, ami a tanácsadói szintű diszkréciót közvetíti az első pillanattól.",
    tech: ["Kadence blokkok", "Sötét prémium UI", "Konverzió-fókusz"],
    bg: IMG.banner,
    span: "md:col-span-3",
  },
  {
    icon: Sparkles,
    title: "Grafikai utómunka",
    lead: "A nyersanyagok arculathű, kifinomult vizuális rendszerbe rendezése.",
    body: "Minden illusztráció és banner kézi retus, színkorrekció és WebP-váltás után készült, így a prémium képi minőség és a villámgyors betöltés egyszerre valósult meg.",
    tech: ["Retus & színkorrekció", "WebP optimalizálás"],
    bg: IMG.banner2,
    span: "md:col-span-2",
  },
  {
    icon: Mail,
    title: "Funkcionalitás & SMTP",
    lead: "A kapcsolatfelvételi csatorna megbízható, hitelesített alépítménye.",
    body: "SMTP-hitelesítéssel (SPF/DKIM) konfigurált levélküldés, hogy az ügyfélfogó űrlapok üzenetei garantáltan, a Promóciós mappába nem kerülve érkezzenek meg.",
    tech: ["SMTP hitelesítés", "SPF / DKIM", "Megbízható levélforgalom"],
    bg: IMG.questioning,
    span: "md:col-span-2",
  },
  {
    icon: Search,
    title: "Keresőoptimalizálás (SEO)",
    lead: "Technikai SEO-tökéletesítés a teljesítmény és a metaadatok síkján.",
    body: "Schema Markup, kanonikus URL-ek, strukturált fejlécek és a teljesítmény finomhangolása után az oldal a prémium, 100/100 SEO pontszámot érte el.",
    tech: ["Schema Markup", "Kanonikus URL", "100/100 SEO"],
    span: "md:col-span-2",
  },
];

export default function LeanperialProcessGrid() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-3xl">
          <h2 className="text-3xl font-bold md:text-5xl">
            A folyamat{" "}
            <span className="text-brand-secondary">öt mozdulata</span>
          </h2>
          <p className="mt-4 text-lg font-light leading-relaxed text-slate-400">
            A káosztól a diszkrét tökéleteségig — minden lépés a biztonságot,
            a teljesítményt és a prémium élményt szolgálta.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-6">
          {PROCESS.map((step) => {
            const Icon = step.icon;
            return (
              <article
                key={step.title}
                className={`group relative flex flex-col justify-end overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/50 hover:shadow-[0_0_40px_-10px_rgba(0,181,241,0.35)] ${step.span}`}
              >
                {/* Háttérkép áttetsző rétegként (hover-nél erősödik) */}
                {step.bg ? (
                  <div className="absolute inset-0 z-0">
                    <ResponsiveImage
                      src={step.bg}
                      alt={`${step.title} — Leanperial illusztráció`}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover opacity-15 transition-opacity duration-500 group-hover:opacity-30"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-bg-base via-bg-base/70 to-transparent" />
                  </div>
                ) : (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-0 bg-linear-to-br from-cta-from/20 to-cta-to/20"
                  />
                )}

                <div className="relative z-10">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-brand-primary/30 bg-brand-primary/10">
                    <Icon className="h-6 w-6 text-brand-primary" aria-hidden />
                  </div>

                  <h3 className="text-xl font-bold md:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 font-light text-slate-200">
                    {step.lead}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {step.body}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {step.tech.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

