import ContactFormWrapper from "@/components/organisms/ContactFormWrapper";
import Hero from "@/components/Hero";
import Surface from "@/components/atoms/Surface";
import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { buildBreadcrumbSchema } from "@/lib/breadcrumb";
import { serializeJsonLd } from "@/lib/structuredData";

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
        url: "/assets/banners/wordpress-weboldalak-keszitese-grafikai-tervezes.webp",
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
    title: "Kapcsolat & Konzultáció | WebDude | Közvetlen Megbeszélés",
    description:
      "Kérj ajánlatot közvetlenül Norbitól! Nincs projektmenedzseri réteg: 26 év tapasztalattal tervezek és fejlesztek Next.js rendszereket országosan.",
    images: ["/assets/banners/wordpress-weboldalak-keszitese-grafikai-tervezes.webp"],
  },
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Főoldal", url: "/" },
  { name: "Kapcsolat", url: "/kapcsolat" },
]);

// JSON-LD: ContactPage + ProfessionalService sémák (Answer Engine Optimization)
const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Kapcsolat & Konzultáció | WebDude",
  description:
    "Kérj ajánlatot közvetlenül Norbitól! Nincs projektmenedzseri réteg: 26 év tapasztalattal tervezek és fejlesztek Next.js rendszereket országosan.",
  url: "https://webdude.hu/kapcsolat",
  // SSOT horgony: a teljes NAP/geo az /#localbusiness node-on él (layout.tsx).
  mainEntity: {
    "@type": "LocalBusiness",
    "@id": "https://webdude.hu/#localbusiness",
    name: "WebDude",
    url: "https://webdude.hu",
    telephone: "+36 70 323 8003",
    email: "hello@webdude.hu",
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
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(contactPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] text-[#0F172A] dark:text-[#F8FAFC]">
        <Hero
          label="Kapcsolat"
          title={
            <>
              Indítsd el a{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0369A1] to-[#6D28D9] dark:from-[#00B5F1] dark:to-[#A78BFA] italic">
                projektedet!
              </span>
            </>
          }
          subtitle="Minden projekt egy egyszerű üzenettel kezdődik. Hétköznapokon 9:00 és 17:00 között vagyok elérhető, de az emailekre gyakran hétvégén is válaszolok."
          cta1="Írj emailt"
          cta1Link="mailto:hello@webdude.hu"
          fullHeight={true}
          backgroundImage="/assets/banners/hero-kapcsolat.webp"
        />

        <Surface tone="night-lift" aurora grid className="py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Bal oldal: Címsor és elérhetőségek */}
              <div className="space-y-12">
                <div>
                  <div className="inline-block relative pl-6 mb-6">
                    <span className="eyebrow-badge text-[#0369A1] dark:text-[#00B5F1] mb-2 block">
                      Elérhetőségek
                    </span>
                    <div className="absolute left-0 top-0 w-1 h-6 bg-linear-to-b from-[#0369A1] to-[#6D28D9] dark:from-[#00B5F1] dark:to-[#5B21B6]" />
                  </div>
                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading text-[#0F172A] dark:text-white leading-tight tracking-tight mb-6">
                    Indítsd el a{" "}
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0369A1] to-[#6D28D9] dark:from-[#00B5F1] dark:to-[#A78BFA] italic">
                      projektedet!
                    </span>
                  </h2>
                  <p className="text-lg md:text-xl text-[#334155] dark:text-slate-300 max-w-lg leading-relaxed tracking-wide font-medium">
                    Válassz a kapcsolattartási lehetőségek közül, és beszéljük át
                    az elképzeléseidet közvetlenül velem!
                  </p>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-bold font-heading text-[#0F172A] dark:text-white mb-4">
                    Közvetlen kapcsolati csatornák
                  </h3>
                  <div className="luminous-card p-6 flex items-center gap-6 group">
                    <div className="w-12 h-12 rounded-xl bg-[#0369A1]/10 dark:bg-[#00B5F1]/12 border border-[#0369A1]/25 dark:border-[#00B5F1]/25 flex items-center justify-center text-[#0369A1] dark:text-[#00B5F1] group-hover:scale-110 transition-transform">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-[0.2em] font-bold block mb-1 text-[#475569] dark:text-slate-300">
                        Email cím
                      </span>
                      <a
                        href="mailto:hello@webdude.hu"
                        className="text-lg font-black text-[#0369A1] dark:text-[#00B5F1] hover:text-[#6D28D9] dark:hover:text-[#A78BFA] transition-colors tracking-tight"
                      >
                        hello@webdude.hu
                      </a>
                    </div>
                  </div>
                  <div className="luminous-card p-6 flex items-center gap-6 group">
                    <div className="w-12 h-12 rounded-xl bg-[#0369A1]/10 dark:bg-[#00B5F1]/12 border border-[#0369A1]/25 dark:border-[#00B5F1]/25 flex items-center justify-center text-[#0369A1] dark:text-[#00B5F1] group-hover:scale-110 transition-transform">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-[0.2em] font-bold block mb-1 text-[#475569] dark:text-slate-300">
                        Telefonszám
                      </span>
                      <a
                        href="tel:+36703238003"
                        className="text-lg font-black text-[#0369A1] dark:text-[#00B5F1] hover:text-[#6D28D9] dark:hover:text-[#A78BFA] transition-colors tracking-tight"
                      >
                        +36 70 323 8003
                      </a>
                    </div>
                  </div>
                  <div className="luminous-card p-6 flex items-center gap-6 group">
                    <div className="w-12 h-12 rounded-xl bg-[#0369A1]/10 dark:bg-[#00B5F1]/12 border border-[#0369A1]/25 dark:border-[#00B5F1]/25 flex items-center justify-center text-[#0369A1] dark:text-[#00B5F1] group-hover:scale-110 transition-transform">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-[0.2em] font-bold block mb-1 text-[#475569] dark:text-slate-300">
                        Székhely & Elérhetőség
                      </span>
                      <span className="text-lg font-bold text-[#0F172A] dark:text-white tracking-tight">
                        Kecskemét (személyesen) & Országos online kiszolgálás
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Jobb oldal: ContactFormWrapper */}
              <div className="lg:sticky lg:top-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white mb-2">
                    Küldj üzenetet
                  </h3>
                  <p className="text-[#334155] dark:text-slate-300">
                    Töltsd ki az űrlapot, és 24 órán belül személyesen válaszolok!
                  </p>
                </div>
                <ContactFormWrapper />
              </div>
            </div>
          </div>
        </Surface>
      </div>
    </>
  );
}
