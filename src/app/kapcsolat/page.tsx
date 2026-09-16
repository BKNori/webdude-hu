import ContactFormWrapper from "@/components/organisms/ContactFormWrapper";
import Hero from "@/components/Hero";
import { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Kapcsolat & Konzultáció | WebDude | Közvetlen Megbeszélés",
  description:
    "Kérj ajánlatot közvetlenül Norbitól! Nincs projektmenedzseri réteg: 26 év tapasztalattal tervezünk és fejlesztünk Next.js rendszereket Kecskemétről.",
  keywords:
    "kapcsolat, weboldal készítés, grafikai tervezés, WordPress fejlesztés, AI megoldások, Kecskemét, konzultáció",
  alternates: {
    canonical: "https://webdude.hu/kapcsolat",
  },
  openGraph: {
    title: "Kapcsolat – WebDude | Grafika, Vektor, AI & WordPress Fejlesztés",
    description:
      "Lépj kapcsolatba velem! 16 év WordPress és 26 év grafikai tapasztalattal. Ingyenes konzultáció, weboldal készítés, arculattervezés és AI megoldások Kecskemétről.",
    url: "https://webdude.hu/kapcsolat",
    siteName: "WebDude",
    images: [
      {
        url: "/banners/wordpress-weboldalak-keszitese-grafikai-tervezes.webp",
        width: 1920,
        height: 1080,
        alt: "WebDude kapcsolat - weboldal készítés és grafikai tervezés",
      },
    ],
    locale: "hu_HU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kapcsolat – WebDude | Grafika, Vektor, AI & WordPress Fejlesztés",
    description:
      "Lépj kapcsolatba velem! 16 év WordPress és 26 év grafikai tapasztalattal. Ingyenes konzultáció, weboldal készítés, arculattervezés és AI megoldások Kecskemétről.",
    images: ["/banners/wordpress-weboldalak-keszitese-grafikai-tervezes.webp"],
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-transparent text-text-primary">
      <Hero
        label="Kapcsolat"
        title={
          <>
            Dolgozzunk <span className="text-[#00B5F1] italic">Együtt!</span>
          </>
        }
        subtitle="Minden projekt egy egyszerű üzenettel kezdődik. Hétköznapokon 9:00 és 17:00 között vagyok elérhető, de az emailekre gyakran hétvégén is válaszolok."
        cta1="Írj emailt"
        cta1Link="mailto:hello@webdude.hu"
        fullHeight={true}
        backgroundImage="/assets/banners/wordpress-weboldalak-keszitese-grafikai-tervezes.webp"
      />

      <section className="max-w-6xl mx-auto px-6 relative z-10 py-24 bg-bg-surface">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Bal oldal: Címsor és elérhetőségek */}
          <div className="space-y-12">
            <div>
              <div className="inline-block relative pl-6 mb-6">
                <span className="text-xs uppercase font-black tracking-[0.3em] text-[#00B5F1] mb-2 block">
                  Elérhetőségek
                </span>
                <div className="absolute left-0 top-0 w-1 h-6 bg-[#00B5F1]" />
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold font-sans text-text-primary leading-tight tracking-tight mb-6">
                Dolgozzunk{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#5B21B6] italic pr-4">
                  Együtt!
                </span>
              </h2>
              <p className="text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed tracking-wide font-medium">
                Válassz a lehetőségek közül, és beszéljük meg a projektedet!
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-text-primary mb-4">
                Kapcsolati lehetőségek
              </h3>
              <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-2xl p-6 flex items-center gap-6 group shadow-[0_8px_24px_rgba(15,23,42,0.3)] hover:border-[#00B5F1]/50 hover:shadow-[0_20px_60px_rgba(0, 181, 241,0.2)] hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#00B5F1]/10 flex items-center justify-center group-hover:bg-[#00B5F1]/20 transition-colors">
                  <Mail className="w-6 h-6 text-[#00B5F1] group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] font-bold opacity-50 block mb-1 text-slate-500">
                    Email cím
                  </span>
                  <a
                    href="mailto:hello@webdude.hu"
                    className="text-lg font-black text-[#00B5F1] hover:text-[#5B21B6] transition-colors tracking-tight"
                  >
                    hello@webdude.hu
                  </a>
                </div>
              </div>
              <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-2xl p-6 flex items-center gap-6 group shadow-[0_8px_24px_rgba(15,23,42,0.3)] hover:border-[#00B5F1]/50 hover:shadow-[0_20px_60px_rgba(0, 181, 241,0.2)] hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#00B5F1]/10 flex items-center justify-center group-hover:bg-[#00B5F1]/20 transition-colors">
                  <Phone className="w-6 h-6 text-[#00B5F1] group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] font-bold opacity-50 block mb-1 text-slate-500">
                    Telefonszám
                  </span>
                  <a
                    href="tel:+36703238003"
                    className="text-lg font-black text-[#00B5F1] hover:text-[#5B21B6] transition-colors tracking-tight"
                  >
                    +36 70 323 8003
                  </a>
                </div>
              </div>
              <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-2xl p-6 flex items-center gap-6 group shadow-[0_8px_24px_rgba(15,23,42,0.3)] hover:border-[#00B5F1]/50 hover:shadow-[0_20px_60px_rgba(0, 181, 241,0.2)] hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#00B5F1]/10 flex items-center justify-center group-hover:bg-[#00B5F1]/20 transition-colors">
                  <MapPin className="w-6 h-6 text-[#00B5F1] group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] font-bold opacity-50 block mb-1 text-slate-500">
                    Székhely
                  </span>
                  <span className="text-lg font-bold text-text-primary tracking-tight">
                    Kecskemét, Magyarország
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Jobb oldal: ContactFormWrapper */}
          <div className="lg:sticky lg:top-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-text-primary mb-2">
                Küldj üzenetet
              </h3>
              <p className="text-slate-400">
                Töltsd ki az űrlapot, és 24 órán belül válaszolok!
              </p>
            </div>
            <ContactFormWrapper />
          </div>
        </div>
      </section>
    </main>
  );
}
