import type { Metadata } from "next";
import PortfolioGrid from "@/components/molecules/PortfolioGrid";
import PortfolioHero from "@/components/molecules/PortfolioHero";
import { works as staticWorks } from "@/data/works";

export const revalidate = 3600; // 1 órás ISR gyorsítótárazás

export const metadata: Metadata = {
  title: "Referenciák & Esettanulmányok | WebDude | Prémium Webfejlesztés",
  description:
    "Valós ügyféleredmények, konverzió-optimalizált Next.js weboldalak és egyedi digitális rendszerek. 26 év tapasztalat, mérhető növekedés.",
  keywords:
    "webfejlesztő referenciák, esettanulmányok, Next.js projektek, WordPress fejlesztés, prémium weboldal készítés, grafikai tervezés, arculattervezés",
  alternates: {
    canonical: "https://webdude.hu/munkak",
  },
  openGraph: {
    title: "Referenciák & Esettanulmányok | WebDude | Prémium Webfejlesztés",
    description:
      "Nézd meg a valós üzleti eredményeket hozó Next.js, WordPress és egyedi webfejlesztési projektjeimet.",
    url: "https://webdude.hu/munkak",
    siteName: "WebDude",
    images: [
      {
        url: "/og/webdude-portfolio-og.jpg",
        width: 1200,
        height: 630,
        alt: "WebDude referenciák és esettanulmányok",
      },
    ],
    locale: "hu_HU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Referenciák & Esettanulmányok | WebDude | Prémium Webfejlesztés",
    description:
      "Nézd meg a valós üzleti eredményeket hozó Next.js, WordPress és egyedi webfejlesztési projektjeimet.",
    images: ["/og/webdude-portfolio-og.jpg"],
  },
};

// JSON-LD: CollectionPage + ItemList az AEO (Answer Engine Optimization) szamara
const portfolioSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Referenciák & Esettanulmányok | WebDude",
  description: "Valós ügyféleredmények, konverzió-optimalizált Next.js weboldalak és egyedi digitális rendszerek. 26+ év grafikai és 16+ év webfejlesztői tapasztalat.",
  url: "https://webdude.hu/munkak",
  isPartOf: { "@id": "https://webdude.hu/#organization" },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: staticWorks.map((work, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: work.title,
      url: `https://webdude.hu${work.slug}`,
    })),
  },
};

export default async function MunkakPage() {
  return (
    <main className="min-h-screen bg-bg-base text-text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(portfolioSchema).replace(/</g, "\\u003c"),
        }}
      />

      {/* Scroll Video Hero Section - Kliens molekula */}
      <PortfolioHero />

      {/* Text Content Below Video */}
      <section className="py-20 bg-bg-surface">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block relative pl-6 mb-8">
            <span className="text-xs uppercase font-black tracking-[0.3em] text-[#00B5F1] mb-2 block">
              Referenciák
            </span>
            <div className="absolute left-0 top-0 w-1 h-6 bg-[#00B5F1]" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-sans text-text-primary leading-tight tracking-tight mb-6">
            Eredmények, nem csak{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#5B21B6] italic pr-4">
              Dizájn
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed mb-8 mx-auto tracking-wide font-medium">
            Minden projekt egy egyedi kihívás, amire kreatív és technológiai
            választ adtam. Nézd meg a sikertörténeteket!
          </p>

          <a
            href="/kapcsolat"
            className="px-8 py-4 bg-linear-to-r from-[#00B5F1] to-[#5B21B6] hover:from-[#5B21B6] hover:to-[#5B21B6] text-slate-950 rounded-full font-bold hover:scale-105 active:scale-95 transition-transform duration-300 shadow-[0_8px_24px_rgba(0, 181, 241,0.3)] hover:shadow-[0_18px_40px_rgba(0, 181, 241,0.4)] min-h-11 min-w-11 inline-block tracking-wide"
          >
            Kapcsolat
          </a>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-bg-surface border-y border-slate-800 relative overflow-hidden">
        {/* Cyber-Arany mesh grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0, 181, 241,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 181, 241,0.07) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-sans text-text-primary leading-tight tracking-tight mb-4">
              Számok, amik{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#5B21B6] italic">
                számítanak
              </span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Valós üzleti eredmények, amiket a projektekkel értünk el
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 backdrop-blur-2xl p-10 transition-colors duration-300 hover:border-sky-500/40 hover:shadow-[0_0_60px_-14px_rgba(0, 181, 241,0.55)]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-[#00B5F1]/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <span className="relative text-6xl font-black font-serif block mb-4 text-text-primary group-hover:text-[#00B5F1] tracking-tight transition-colors duration-300">
                200+
              </span>
              <p className="relative text-sm uppercase tracking-[0.2em] font-bold text-slate-400">
                Projekt Készítve
              </p>
            </div>
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 backdrop-blur-2xl p-10 transition-colors duration-300 hover:border-sky-500/40 hover:shadow-[0_0_60px_-14px_rgba(0, 181, 241,0.55)]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-[#00B5F1]/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <span className="relative text-6xl font-black font-serif block mb-4 text-text-primary group-hover:text-[#00B5F1] tracking-tight transition-colors duration-300">
                500+
              </span>
              <p className="relative text-sm uppercase tracking-[0.2em] font-bold text-slate-400">
                Lead Generált
              </p>
            </div>
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 backdrop-blur-2xl p-10 transition-colors duration-300 hover:border-sky-500/40 hover:shadow-[0_0_60px_-14px_rgba(0, 181, 241,0.55)]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-[#00B5F1]/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <span className="relative text-6xl font-black font-serif block mb-4 text-text-primary group-hover:text-[#00B5F1] tracking-tight transition-colors duration-300">
                +150%
              </span>
              <p className="relative text-sm uppercase tracking-[0.2em] font-bold text-slate-400">
                Konverzió Növekedés
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 relative z-10 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-sans text-text-primary leading-tight tracking-tight mb-4">
            Kiemelt{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#5B21B6] italic">
              Projektek
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Válogatás a legfrissebb és legérdekesebb munkáimból
          </p>
        </div>
        <PortfolioGrid projects={staticWorks} />

        {/* CTA Section */}
        <section className="mt-20 text-center bg-bg-surface border-t border-slate-800 py-40 relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto space-y-10">
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold font-sans text-text-primary leading-tight tracking-tight">
                Készen állsz a{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#5B21B6] italic pr-4">
                  következő
                </span>{" "}
                szintre?
              </h2>
              <p className="text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed mx-auto tracking-wide font-medium">
                Hogyan tudnám a te vállalkozásodat is a digitális élvonalba
                repíteni? Beszéljük meg a részleteket!
              </p>
              <a
                href="/kapcsolat"
                className="inline-block px-10 py-5 bg-linear-to-r from-[#00B5F1] to-[#5B21B6] hover:from-[#5B21B6] hover:to-[#5B21B6] text-slate-950 rounded-full font-bold text-lg shadow-[0_8px_24px_rgba(0, 181, 241,0.3)] hover:shadow-[0_18px_40px_rgba(0, 181, 241,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 tracking-wide"
              >
                Ajánlatot kérek →
              </a>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
