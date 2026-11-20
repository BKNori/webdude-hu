import Link from "next/link";
import HeroBackdrop from "@/components/molecules/HeroBackdrop";

interface SubpageHeroProps {
  /** Felső badge/eyebrow szöveg. */
  badge?: string;
  /** Főcím (H1). */
  title: React.ReactNode;
  /** Alcím / leírás. */
  subtitle?: string;
  /** Háttérkép útvonala (`/assets/banners/hero-*.webp`). */
  backgroundImage: string;
  /** Háttérkép alt szöveg. */
  backgroundAlt?: string;
  /** Elsődleges CTA gomb szövege és linkje. */
  cta1Text?: string;
  cta1Href?: string;
  /** Másodlagos CTA gomb szövege és linkje. */
  cta2Text?: string;
  cta2Href?: string;
  /** Kompakt elrendezés pl. jogi vagy információs aloldalakhoz. */
  compact?: boolean;
}

/**
 * Tiszta Server Component aloldali Hero szekció (0 extra kliens JS).
 * Kék-Lila v7.2 Dual Theme + ResponsiveImage + CSS Scroll-Driven Parallax.
 */
export default function SubpageHero({
  badge,
  title,
  subtitle,
  backgroundImage,
  backgroundAlt = "",
  cta1Text,
  cta1Href,
  cta2Text,
  cta2Href,
  compact = false,
}: SubpageHeroProps) {
  return (
    <section
      className={`relative overflow-hidden bg-[#F8FAFC] dark:bg-[#0B1120] border-b border-slate-200/80 dark:border-white/10 ${
        compact ? "pt-28 pb-16 md:pt-32 md:pb-20" : "pt-32 pb-24 md:pt-36 md:pb-28"
      }`}
    >
      <HeroBackdrop src={backgroundImage} alt={backgroundAlt} priority />

      {/* Finom CSS mesh grid & Kék-Lila aurora fényfolt */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-mesh opacity-30 z-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-45 dark:opacity-80 z-0"
      >
        <div className="absolute -top-24 right-1/4 w-96 h-96 bg-[#00B5F1]/16 rounded-full blur-[110px]" />
        <div className="absolute -bottom-24 left-1/4 w-96 h-96 bg-[#7C3AED]/14 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl space-y-6">
          {badge ? (
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 border border-slate-200/90 shadow-2xs dark:shadow-none dark:bg-white/6 dark:border-white/15 dark:border-t-white/25 backdrop-blur-md">
              <span
                className="w-2 h-2 rounded-full bg-[#0369A1] dark:bg-[#00B5F1]"
                aria-hidden="true"
              />
              <span className="eyebrow-badge text-[#0369A1] dark:text-[#00B5F1]">
                {badge}
              </span>
            </div>
          ) : null}

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading leading-tight text-[#0F172A] dark:text-white text-balance">
            {title}
          </h1>

          {subtitle ? (
            <p className="text-lg md:text-xl text-[#334155] dark:text-slate-200 leading-relaxed max-w-2xl text-balance">
              {subtitle}
            </p>
          ) : null}

          {(cta1Text && cta1Href) || (cta2Text && cta2Href) ? (
            <div className="flex flex-wrap gap-4 pt-2">
              {cta1Text && cta1Href ? (
                <Link
                  href={cta1Href}
                  className="px-8 py-4 bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369A1] hover:to-[#6D28D9] text-white rounded-full font-semibold uppercase tracking-wider text-sm hover:scale-[1.03] active:scale-95 transition-[transform,box-shadow,background-color] duration-300 shadow-[0_8px_28px_rgba(7,89,133,0.4)] min-h-11 inline-flex items-center"
                >
                  {cta1Text}
                </Link>
              ) : null}
              {cta2Text && cta2Href ? (
                <Link
                  href={cta2Href}
                  className="px-8 py-4 bg-white/90 border border-slate-300 text-slate-800 hover:border-[#0369A1]/60 hover:text-[#0369A1] hover:bg-sky-500/8 dark:bg-white/5 dark:border-white/15 dark:hover:border-[#00B5F1]/60 dark:text-slate-200 dark:hover:text-[#00B5F1] dark:hover:bg-[#00B5F1]/10 rounded-full font-semibold active:scale-95 transition-[background-color,border-color,color,transform] duration-300 min-h-11 inline-flex items-center"
                >
                  {cta2Text}
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
