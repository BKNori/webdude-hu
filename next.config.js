/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // Enable standalone build for deployment
  cacheComponents: false, // Disable Next.js 16 cache components for build stability
  turbopack: {}, // Enable Turbopack
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "firebasestorage.googleapis.com" },
      { protocol: "https", hostname: "aiprom.hu" },
      { protocol: "https", hostname: "webdude.hu" },
      { protocol: "https", hostname: "www.webdude.hu" },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // ⚠️ KRITIKUS — NE VÁLTOZTASD `false`-ra a hosting infrastruktúra
    // megváltozása nélkül!
    //
    // Az alkalmazás Phusion Passenger wrapperrel fut cPanel shared hostingon
    // (lásd: deploy.ps1 → .next/standalone Passenger patch + manuális zip
    // feltöltés; a `output: "standalone"` ezért szükséges). A futás közbeni
    // Next.js képoptimalizálás (sharp) a shared hosting memóriakorlátján
    // OOM-ot okozna, ezért GLOBÁLISAN ki van kapcsolva.
    //
    // Következmény: a `sizes` / `quality` attribútumok hatástalanok, és a
    // böngésző nyersen kapja a teljes méretű képet. A hero LCP-re a
    // megoldás: build-time generált statikus AVIF/WebP derivatívumok
    // (scripts/generate-responsive-images.js) + <picture> srcSet
    // (src/components/molecules/HeroBackgroundImage.tsx).
    unoptimized: true,
    minimumCacheTTL: 60,
    qualities: [75, 95],
  },
  compress: true,
  poweredByHeader: false,
  // Bundle analyzer fallback for server builds
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
  async redirects() {
    return [
      {
        source: "/adatvedelmi-nyilatkozat",
        destination: "/adatvedelmi-szabalyzat",
        permanent: true,
      },
      {
        source: "/szolgaltatasok/wordpress-weboldal-keszites-kecskemet",
        destination: "/szolgaltatasok/weboldal-keszites",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
