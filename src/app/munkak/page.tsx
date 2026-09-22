import type { Metadata } from "next";
import Link from "next/link";
import PortfolioGrid from "@/components/molecules/PortfolioGrid";
import PortfolioHero from "@/components/molecules/PortfolioHero";
import { works as staticWorks } from "@/data/works";

export const revalidate = 3600; // 1 órás ISR gyorsítótárazás

export const metadata: Metadata = {
  title: "Referenciák & Esettanulmányok | WebDude",
  description:
    "Valós ügyféleredmények, konverzió-optimalizált Next.js weboldalak és egyedi digitális rendszerek. 26 év tapasztalat, mérhető növekedés.",
  keywords:
    "webfejlesztő referenciák, esettanulmányok, Next.js projektek, WordPress fejlesztés, prémium weboldal készítés, grafikai tervezés, arculattervezés",
  alternates: {
    canonical: "https://webdude.hu/munkak",
  },
  openGraph: {
    title: "Referenciák & Esettanulmányok | WebDude",
    description:
      "Valós ügyféleredmények, konverzió-optimalizált Next.js weboldalak és egyedi digitális rendszerek. 26 év tapasztalat, mérhető növekedés.",
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
    title: "Referenciák & Esettanulmányok | WebDude",
    description:
      "Valós ügyféleredmények, konverzió-optimalizált Next.js weboldalak és egyedi digitális rendszerek. 26 év tapasztalat, mérhető növekedés.",
    images: ["/og/webdude-portfolio-og.jpg"],
  },
};

// JSON-LD: CollectionPage + ItemList sémák az AEO / keresők számára XSS védelemmel
const portfolioSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Referenciák & Esettanulmányok | WebDude",
  description:
    "Valós ügyféleredmények, konverzió-optimalizált Next.js weboldalak és egyedi digitális rendszerek. 26 év tapasztalat, mérhető növekedés.",
  url: "https://webdude.hu/munkak",
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: staticWorks.length,
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
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(portfolioSchema).replace(/</g, "\\u003c"),
        }}
      />

      {/* Scroll Video Hero Section */}
      <PortfolioHero />

      {/* Text Content Below Video */}
      <section className="py-20 bg-slate-950 border-b border-slate-800/80">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block relative pl-6 mb-8">
            <span className="text-xs uppercase font-black tracking-[0.3em] text-[#00B5F1] mb-2 block">
              Referenciák & Portfólió
            </span>
            <div className="absolute left-0 top-0 w-1 h-6 bg-linear-to-b from-[#00B5F1] to-[#5B21B6]" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-sans text-white leading-tight tracking-tight mb-6">
            Eredményorientált{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#5B21B6] italic pr-4">
              webes megoldások
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed mb-8 mx-auto tracking-wide font-medium">
            Minden projekt egy egyedi üzleti és vizuális kihívás. Nem sablonokat másolok: egyedi, konverzióra és sebességre tervezett felületeket építek.
          </p>

          <Link
            href="/kapcsolat"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369a1] hover:to-[#6d28d9] text-white rounded-xl font-bold transition-all duration-300 shadow-lg shadow-sky-950/50 hover:scale-105 active:scale-95"
          >
            Egyedi árajánlat kérése
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-slate-900/40 border-b border-slate-800/80 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40 mask-[radial-gradient(ellipse_at_center,black,transparent_78%)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0, 181, 241,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 181, 241,0.08) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-sans text-white leading-tight tracking-tight mb-4">
              Mérhető{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#5B21B6] italic">
                eredmények
              </span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Valós üzleti eredmények, amelyeket a partnereimmel közösen értünk el
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-10 transition-colors duration-300 hover:border-[#00B5F1]/50 hover:shadow-[0_0_40px_rgba(0,181,241,0.15)]">
              <span className="text-5xl sm:text-6xl font-black block mb-4 text-white group-hover:text-[#00B5F1] tracking-tight transition-colors duration-300">
                200+
              </span>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400">
                Sikeres Projekt
              </p>
            </div>
            <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-10 transition-colors duration-300 hover:border-[#00B5F1]/50 hover:shadow-[0_0_40px_rgba(0,181,241,0.15)]">
              <span className="text-5xl sm:text-6xl font-black block mb-4 text-white group-hover:text-[#00B5F1] tracking-tight transition-colors duration-300">
                26 Év
              </span>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400">
                Szakmai Tapasztalat
              </p>
            </div>
            <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-10 transition-colors duration-300 hover:border-[#00B5F1]/50 hover:shadow-[0_0_40px_rgba(0,181,241,0.15)]">
              <span className="text-5xl sm:text-6xl font-black block mb-4 text-white group-hover:text-[#00B5F1] tracking-tight transition-colors duration-300">
                90+
              </span>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400">
                Átlagos PageSpeed Pont
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid: Projects */}
      <section className="max-w-6xl mx-auto px-6 relative z-10 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-sans text-white leading-tight tracking-tight mb-4">
            Kiemelt{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#5B21B6] italic">
              munkák & esettanulmányok
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Válogatás a legfrissebb webfejlesztési, webshop és arculati projektjeimből
          </p>
        </div>
        <PortfolioGrid projects={staticWorks} />

        {/* CTA Section */}
        <section className="mt-24 text-center rounded-3xl bg-slate-900/60 border border-slate-800 py-24 px-6 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-linear-to-br from-[#00B5F1]/10 to-purple-600/10 blur-[120px] pointer-events-none" />
          <div className="max-w-3xl mx-auto space-y-8 relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Készen állsz egy modern, eladásorientált weboldalra?
            </h2>
            <p className="text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
              Beszéljük át az elképzeléseidet, és készítek számodra egy kötelezettségmentes, egyedi árajánlatot.
            </p>
            <Link
              href="/kapcsolat"
              className="inline-flex items-center justify-center px-10 py-4 bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369a1] hover:to-[#6d28d9] text-white rounded-xl font-bold text-base shadow-xl shadow-sky-950/60 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Egyedi árajánlat kérése
            </Link>
          </div>
        </section>
      </section>
    </div>
  );
}
