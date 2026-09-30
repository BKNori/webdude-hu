/**
 * Reszponzív kép betöltése statikus, build-time generált derivatívumokkal.
 *
 * MIÉRT NEM `next/image`: a `next.config.js` `unoptimized: true` beállítása a
 * cPanel shared hosting (Phusion Passenger) memóriakorlátja miatt globálisan
 * megmarad, így a `next/image` NEM generál reszponzív srcset-et. Ez a
 * komponens a `scripts/generate-responsive-images.js` által előállított
 * AVIF/WebP variánsokat adja át a böngeszőnek `<picture>` + srcSet formában —
 * ez a Next.js optimalizáló nélküli egyetlen reszponzív megoldás.
 *
 * - AVIF → WebP → eredeti kép sorrend (`<picture>` fallback lánc).
 * - Ha nincs generált derivatívum (pl. dinamikus vagy kézi megadott útvonal),
 *   csendben visszaesik a nyers `<img>`-re — semmi nem törik el.
 *
 * A szülőnek `relative` pozicionált konténert kell adnia (ez a `fill`
 * megfelelője): a komponens maga abszolúton kitölti azt.
 */

import { getResponsiveImageVariants } from "@/data/responsiveImages";

interface ResponsiveImageProps {
  /** Az eredeti kép útvonala (a manifestum kulcsa). */
  src: string;
  alt: string;
  /** CSS `sizes` — a böngésző ebből választja ki a letöltendő variánst. */
  sizes: string;
  /** A fold felötti (LCP) kép: `eager` + `fetchPriority="high"`. */
  priority?: boolean;
  /** Az <img> vizuális osztályai (pl. "object-cover opacity-65"). */
  className?: string;
}

export default function ResponsiveImage({
  src,
  alt,
  sizes,
  priority = false,
  className = "",
}: ResponsiveImageProps) {
  const variants = getResponsiveImageVariants(src);

  return (
    <picture className="absolute inset-0 block">
      {variants ? (
        <>
          <source type="image/avif" srcSet={variants.avif} sizes={sizes} />
          {/* Nem minden kép-csoport készít WebP-t (a galéria AVIF-only) */}
          {variants.webp ? (
            <source type="image/webp" srcSet={variants.webp} sizes={sizes} />
          ) : null}
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
