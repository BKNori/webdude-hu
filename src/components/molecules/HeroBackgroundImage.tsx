/**
 * A hero háttérképének reszponzív betöltése.
 *
 * MIÉRT NEM `next/image`: a `next.config.js` `unoptimized: true` beállítása a
 * cPanel shared hosting memóriakorlátja miatt globálisan megmarad, így a
 * `next/image` NEM generál reszponzív srcset-et. Ez a komponens ezért
 * statikus, build-time generált AVIF/WebP derivatívumokat ad át a böngészőnek
 * `<picture>` + srcSet formában — ez a Next.js optimalizáló nélküli egyetlen
 * LCP-optimalizálási útja. Lásd: scripts/generate-responsive-images.js
 */

import { getHeroImageVariants } from "@/data/heroImages";

interface HeroBackgroundImageProps {
  /** Az eredeti kép útvonala (a manifestum kulcsa). */
  src: string;
  alt: string;
  /** Az első dia (LCP elem) kap `eager` + `fetchPriority="high"`. */
  priority?: boolean;
  /** Az <img> vizuális osztályai (pl. "object-cover opacity-65"). */
  className?: string;
}

/**
 * A hero háttérképének reszponzív betöltése.
 *
 * - AVIF → WebP → eredeti kép sorrend (`<picture>` fallback lánc).
 * - `sizes="100vw"`: a háttér mindig a teljes viewport szélessége.
 * - Ha nincs generált derivatívum (pl. szótárból felülírt `bgImage`),
 *   csendben visszaesik a nyers `<img>`-re — az /en oldal sem törik el.
 */
export default function HeroBackgroundImage({
  src,
  alt,
  priority = false,
  className = "",
}: HeroBackgroundImageProps) {
  const variants = getHeroImageVariants(src);

  return (
    <picture className="absolute inset-0 block">
      {variants ? (
        <>
          <source type="image/avif" srcSet={variants.avif} sizes="100vw" />
          <source type="image/webp" srcSet={variants.webp} sizes="100vw" />
        </>
      ) : null}
      <img
        src={variants ? variants.fallback : src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={`h-full w-full ${className}`}
      />
    </picture>
  );
}
