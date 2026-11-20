import ResponsiveImage from "@/components/molecules/ResponsiveImage";

interface HeroBackdropProps {
  /** A hero kép útvonala (`/assets/banners/hero-*.webp`). */
  src: string;
  /** Akadálymentesítő alt szöveg (dekoratív háttérnél lehet üres). */
  alt?: string;
  /** LCP priorizálás (alapértelmezetten true a hero szekciókhoz). */
  priority?: boolean;
  /** Opcionális egyedi opacity osztályok. */
  imageOpacityClass?: string;
}

/**
 * Egységes, 0 JS-es Hero háttérréteg Server Component.
 * - ResponsiveImage (AVIF/WebP srcSet, sizes="100vw")
 * - Tiszta CSS Scroll-Driven Parallax (.hero-parallax-img)
 * - Irányított (balról jobbra + alulról felfelé) Dual Theme scrim, hogy a bal oldali
 *   H1 és szöveg alatt megmaradjon a WCAG AA/AAA kontraszt, a kép nagy része viszont látszódjon.
 */
export default function HeroBackdrop({
  src,
  alt = "",
  priority = true,
  imageOpacityClass = "opacity-50 dark:opacity-60",
}: HeroBackdropProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden={alt === "" ? "true" : undefined}
    >
      <ResponsiveImage
        src={src}
        alt={alt}
        sizes="100vw"
        priority={priority}
        className={`object-cover hero-parallax-img ${imageOpacityClass}`}
      />

      {/* Irányított balról-jobbra scrim (szövegvédelem bal oldalon, tiszta kép jobb oldalon) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-[#F8FAFC]/92 via-[#F8FAFC]/58 to-transparent dark:from-[#0B1120]/90 dark:via-[#0B1120]/50 dark:to-transparent"
      />

      {/* Alulról felfelé lágy átmenet a következő szekció alapszínébe */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-bg-base via-transparent to-[#F8FAFC]/40 dark:from-bg-base dark:via-transparent dark:to-[#0B1120]/45"
      />
    </div>
  );
}
