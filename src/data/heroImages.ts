// AUTO-GENERATED FILE — NE SORKÖZZÖL KÉZZEL!
// Forrás: scripts/generate-responsive-images.js
// A cPanel memóriakorlát miatt a next.config.js unoptimized: true marad,
// ezért a reszponzív srcset-ek build-time generált statikus fájlokból jönnek.

export interface HeroImageVariants {
  /** AVIF srcSet: "url 640w, url 1024w, ..." */
  avif: string;
  /** WebP srcSet AVIF-et nem támogató böngészőknek. */
  webp: string;
  /** Az eredeti, teljes méretű kép (régi böngésző / nem-generált slide). */
  fallback: string;
}

/** Kulcs: a hero slide eredeti /assets/banners/... útvonala. */
export const heroImageManifest: Record<string, HeroImageVariants> = {
  "/assets/banners/webdude-hero.webp": {
    "fallback": "/assets/banners/webdude-hero.webp",
    "avif": "/assets/banners/responsive/webdude-hero-640w.avif 640w, /assets/banners/responsive/webdude-hero-1024w.avif 1024w, /assets/banners/responsive/webdude-hero-1600w.avif 1600w",
    "webp": "/assets/banners/responsive/webdude-hero-640w.webp 640w, /assets/banners/responsive/webdude-hero-1024w.webp 1024w, /assets/banners/responsive/webdude-hero-1600w.webp 1600w"
  },
  "/assets/banners/ronch caffe adris nagybanner 20221005c copy 2.webp": {
    "fallback": "/assets/banners/ronch%20caffe%20adris%20nagybanner%2020221005c%20copy%202.webp",
    "avif": "/assets/banners/responsive/ronch%20caffe%20adris%20nagybanner%2020221005c%20copy%202-640w.avif 640w, /assets/banners/responsive/ronch%20caffe%20adris%20nagybanner%2020221005c%20copy%202-1024w.avif 1024w, /assets/banners/responsive/ronch%20caffe%20adris%20nagybanner%2020221005c%20copy%202-1600w.avif 1600w, /assets/banners/responsive/ronch%20caffe%20adris%20nagybanner%2020221005c%20copy%202-2000w.avif 2000w",
    "webp": "/assets/banners/responsive/ronch%20caffe%20adris%20nagybanner%2020221005c%20copy%202-640w.webp 640w, /assets/banners/responsive/ronch%20caffe%20adris%20nagybanner%2020221005c%20copy%202-1024w.webp 1024w, /assets/banners/responsive/ronch%20caffe%20adris%20nagybanner%2020221005c%20copy%202-1600w.webp 1600w, /assets/banners/responsive/ronch%20caffe%20adris%20nagybanner%2020221005c%20copy%202-2000w.webp 2000w"
  },
  "/assets/banners/webdude banner 2000x1000.webp": {
    "fallback": "/assets/banners/webdude%20banner%202000x1000.webp",
    "avif": "/assets/banners/responsive/webdude%20banner%202000x1000-640w.avif 640w, /assets/banners/responsive/webdude%20banner%202000x1000-1024w.avif 1024w, /assets/banners/responsive/webdude%20banner%202000x1000-1600w.avif 1600w, /assets/banners/responsive/webdude%20banner%202000x1000-2000w.avif 2000w",
    "webp": "/assets/banners/responsive/webdude%20banner%202000x1000-640w.webp 640w, /assets/banners/responsive/webdude%20banner%202000x1000-1024w.webp 1024w, /assets/banners/responsive/webdude%20banner%202000x1000-1600w.webp 1600w, /assets/banners/responsive/webdude%20banner%202000x1000-2000w.webp 2000w"
  }
};

/** Egy slide háttérképének variánsai, vagy undefined ha nincs generált derivatívum. */
export function getHeroImageVariants(
  src: string
): HeroImageVariants | undefined {
  return heroImageManifest[src];
}
