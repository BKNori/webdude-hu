import ContactFormWrapper from "@/components/organisms/ContactFormWrapper";
import Hero from "@/components/Hero";
import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Kapcsolat & Konzultáció | WebDude | Közvetlen Megbeszélés",
  description:
    "Kérj ajánlatot közvetlenül Norbitól! Nincs projektmenedzseri réteg: 26 év tapasztalattal tervezek és fejlesztek Next.js rendszereket országosan.",
  alternates: {
    canonical: "https://webdude.hu/kapcsolat",
  },
  openGraph: {
    title: "Kapcsolat & Konzultáció | WebDude | Közvetlen Megbeszélés",
    description:
      "Kérj ajánlatot közvetlenül Norbitól! Nincs projektmenedzseri réteg: 26 év tapasztalattal tervezek és fejlesztek Next.js rendszereket országosan.",
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
};

// JSON-LD: ContactPage + ProfessionalService sémák (Answer Engine Optimization)
const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Kapcsolat & Konzultáció | WebDude",
  description: "Kérj ajánlatot közvetlenül Norbitól! Nincs projektmenedzseri réteg: 26 év tapasztalattal tervezek és fejlesztek Next.js rendszereket országosan.",
  url: "https://webdude.hu/kapcsolat",
  mainEntity: {
    "@type": "ProfessionalService",
    name: "WebDude",
    url: "https://webdude.hu",
    email: "hello@webdude.hu",
    telephone: "+36 70 323 8003",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kecskemét",
      postalCode: "6000",
      addressCountry: "HU",
    },
    founder: {
      "@type": "Person",
      name: "Balog Norbert",
      jobTitle: "Vezető Fejlesztő és Tervező",
      url: "https://webdude.hu/szia-norbi-vagyok",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+36 70 323 8003",
      contactType: "customer service",
      email: "hello@webdude.hu",
      availableLanguage: ["Hungarian", "English"],
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactPageSchema).replace(/</g, "\\u003c"),
        }}
      />

      <div className="min-h-screen bg-slate-950 text-slate-100">
        <Hero
          label="Kapcsolat"
          title={
            <>
              Indítsuk el a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B5F1] to-[#5B21B6] italic">projektedet!</span>
            </>
          }
          subtitle="Minden projekt egy egyszerű üzenettel kezdődik. Hétköznapokon 9:00 és 17:00 között vagyok elérhető, de az emailekre gyakran hétvégén is válaszolok."
          cta1="Írj emailt"
          cta1Link="mailto:hello@webdude.hu"
          fullHeight={true}
          backgroundImage="/assets/banners/wordpress-weboldalak-keszitese-grafikai-tervezes.webp"
        />

        <section className="max-w-6xl mx-auto px-6 relative z-10 py-24 bg-slate-950">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Bal oldal: Címsor és elérhetőségek */}
            <div className="space-y-12">
              <div>
                <div className="inline-block relative pl-6 mb-6">
                  <span className="text-xs uppercase font-black tracking-[0.3em] text-[#00B5F1] mb-2 block">
                    Elérhetőségek
                  </span>
                  <div className="absolute left-0 top-0 w-1 h-6 bg-gradient-to-b from-[#00B5F1] to-[#5B21B6]" />
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-sans text-white leading-tight tracking-tight mb-6">
                  Indítsuk el a{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B5F1] to-[#5B21B6] italic pr-4">
                    projektedet!
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed tracking-wide font-medium">
                  Válassz a kapcsolattartási lehetőségek közül, és beszéljük át az elképzeléseidet közvetlenül velem!
                </p>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Közvetlen kapcsolati csatornák
                </h2>
                <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-6 flex items-center gap-6 group hover:border-[#00B5F1]/50 hover:shadow-[0_10px_30px_rgba(0,181,241,0.15)] transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center text-[#00B5F1] group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-[0.2em] font-bold block mb-1 text-slate-400">
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
                <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-6 flex items-center gap-6 group hover:border-[#00B5F1]/50 hover:shadow-[0_10px_30px_rgba(0,181,241,0.15)] transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center text-[#00B5F1] group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-[0.2em] font-bold block mb-1 text-slate-400">
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
                <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-6 flex items-center gap-6 group hover:border-[#00B5F1]/50 hover:shadow-[0_10px_30px_rgba(0,181,241,0.15)] transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center text-[#00B5F1] group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-[0.2em] font-bold block mb-1 text-slate-400">
                      Székhely & Elérhetőség
                    </span>
                    <span className="text-lg font-bold text-white tracking-tight">
                      Kecskemét (személyesen) & Országos online kiszolgálás
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Jobb oldal: ContactFormWrapper */}
            <div className="lg:sticky lg:top-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Küldj üzenetet
                </h3>
                <p className="text-slate-400">
                  Töltsd ki az űrlapot, és 24 órán belül személyesen válaszolok!
                </p>
              </div>
              <ContactFormWrapper />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}