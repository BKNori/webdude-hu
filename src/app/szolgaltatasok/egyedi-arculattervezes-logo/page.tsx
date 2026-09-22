import SectionTitle from "@/components/atoms/SectionTitle";
import Button from "@/components/atoms/Button";
import { Metadata } from "next";
import Badge from "@/components/atoms/Badge";
import PricingTable from "@/components/molecules/PricingTable";
import { buildBreadcrumbSchema, BreadcrumbItem } from "@/lib/breadcrumb";
import Image from "next/image";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Egyedi Arculattervezés & Logó – Branding Szolgáltatás | WebDude",
    description:
      "Professzionális logó tervezés és teljes vállalati arculat kialakítása. 26 éves grafikai tapasztalattal, vektorgrafikus elemek, branding stratégia és konverzió-fókuszú dizájn. Esküvői dekoráció, orvosi arculat és kávézó branding referenciákkal.",
    keywords:
      "logó tervezés, arculattervezés, branding, vállalati arculat, vektorgrafika, vizuális identitás, grafikai tervezés, logo design, cégarculat, esküvői dekoráció branding, orvosi arculat, kávézó branding",
    alternates: {
      canonical:
        "https://webdude.hu/szolgaltatasok/egyedi-arculattervezes-logo",
    },
    openGraph: {
      title: "Egyedi Arculattervezés & Logó – Branding Szolgáltatás | WebDude",
      description:
        "Professzionális logó tervezés és teljes vállalati arculat kialakítása. 26 éves grafikai tapasztalattal, vektorgrafikus elemek, branding stratégia és konverzió-fókuszú dizájn.",
      type: "website",
      locale: "hu_HU",
      siteName: "WebDude",
      url: "https://webdude.hu/szolgaltatasok/egyedi-arculattervezes-logo",
      images: [
        {
          url: "/assets/banners/eskuvodekoracio_nejegykartya.webp",
          width: 1920,
          height: 1080,
          alt: "Esküvői dekoráció branding - WebDude",
        },
        {
          url: "/assets/banners/dr_nagy_albert_identity.webp",
          width: 1920,
          height: 1080,
          alt: "Dr Nagy Albert orvosi arculat - WebDude",
        },
        {
          url: "/assets/banners/ronch_caffe _Banner.webp",
          width: 1920,
          height: 1080,
          alt: "Ronch Caffé branding - WebDude",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Egyedi Arculattervezés & Logó – Branding Szolgáltatás | WebDude",
      description:
        "Professzionális logó tervezés és teljes vállalati arculat kialakítása. 26 éves grafikai tapasztalattal, vektorgrafikus elemek, branding stratégia és konverzió-fókuszú dizájn.",
      images: ["/assets/banners/eskuvodekoracio_nejegykartya.webp"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export const revalidate = 3600;

export default async function BrandingPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Főoldal", url: "/" },
    { name: "Szolgáltatások", url: "/szolgaltatasok" },
    {
      name: "Egyedi Arculattervezés & Logó",
      url: "/szolgaltatasok/egyedi-arculattervezes-logo",
    },
  ];

  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Egyedi Arculattervezés & Logó",
    description:
      "Professzionális logó tervezés és teljes vállalati arculat kialakítása. 26 éves grafikai tapasztalattal, vektorgrafikus elemek, branding stratégia és konverzió-fókuszú dizájn.",
    provider: {
      "@type": "Organization",
      "@id": "https://webdude.hu/#organization",
      name: "WebDude",
      url: "https://webdude.hu",
    },
    areaServed: { "@type": "Country", name: "Hungary" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="min-h-screen bg-transparent text-text-primary relative overflow-hidden">
        {/* Hero Section with 3 Banners */}
        <section className="relative w-full h-screen min-h-150 overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-3">
            <div className="relative h-full">
              <Image
                src="/assets/banners/eskuvodekoracio_nejegykartya.webp"
                alt="Esküvői dekoráció branding - WebDude"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/60" />
            </div>
            <div className="relative h-full">
              <Image
                src="/assets/banners/dr_nagy_albert_identity.webp"
                alt="Dr Nagy Albert orvosi arculat - WebDude"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/60" />
            </div>
            <div className="relative h-full">
              <Image
                src="/assets/banners/ronch_caffe _Banner.webp"
                alt="Ronch Caffé branding - WebDude"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/60" />
            </div>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex flex-col justify-center py-24">
            <SectionTitle
              center
              eyebrow="Szolgáltatás"
              title="Egyedi Arculattervezés & Logó"
              description="Branding és arculattervezés, amely megragadja a márka lényegét és konvertál az ügyfelek számára. 26 éves grafikai tapasztalattal, vektorgrafikus elemek és konverzió-fókuszú dizájn."
              className="mx-auto"
            />
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button variant="primary" href="/kapcsolat">
                Kérj ajánlatot
              </Button>
              <Button variant="secondary" href="/munkak">
                Portfólió megtekintése
              </Button>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-24 bg-bg-surface border-y border-bg-elevated">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="glass-card p-8 bg-transparent border border-bg-elevated rounded-2xl hover:border-[#00B5F1] transition-all duration-500 group">
                <span className="text-5xl font-black font-serif block mb-3 text-text-primary group-hover:text-[#00B5F1]">
                  26+
                </span>
                <p className="text-xs uppercase tracking-widest font-bold text-slate-400">
                  Év Tapasztalat
                </p>
              </div>
              <div className="glass-card p-8 bg-transparent border border-bg-elevated rounded-2xl hover:border-[#00B5F1] transition-all duration-500 group">
                <span className="text-5xl font-black font-serif block mb-3 text-text-primary group-hover:text-[#00B5F1]">
                  150+
                </span>
                <p className="text-xs uppercase tracking-widest font-bold text-slate-400">
                  Branding Projekt
                </p>
              </div>
              <div className="glass-card p-8 bg-transparent border border-bg-elevated rounded-2xl hover:border-[#00B5F1] transition-all duration-500 group">
                <span className="text-5xl font-black font-serif block mb-3 text-text-primary group-hover:text-[#00B5F1]">
                  100%
                </span>
                <p className="text-xs uppercase tracking-widest font-bold text-slate-400">
                  Vektor Fájlok
                </p>
              </div>
              <div className="glass-card p-8 bg-transparent border border-bg-elevated rounded-2xl hover:border-[#00B5F1] transition-all duration-500 group">
                <span className="text-5xl font-black font-serif block mb-3 text-text-primary group-hover:text-[#00B5F1]">
                  95+
                </span>
                <p className="text-xs uppercase tracking-widest font-bold text-slate-400">
                  Ügyfél Elégedettség
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Background gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-[#00B5F1]/5 via-transparent to-[#00B5F1]/5" />
        <div className="relative z-10">
          <div className="max-w-6xl mx-auto px-6 py-20">
            {/* Introduction Section */}
            <div className="grid gap-12 md:grid-cols-2 items-start max-w-4xl mx-auto mb-24">
              <div className="space-y-6">
                <Badge>Branding</Badge>
                <p className="text-xl text-slate-300 leading-relaxed">
                  26 éves grafikai tapasztalattal tervezek logókat és komplett
                  vállalati arculatokat, amelyek nemcsak szépek, hanem
                  konverzió-fókuszúak és támogatják az üzleti célokat. Esküvői
                  dekorációtól az orvosi arculatig, a kávézó brandingtől a
                  vállalati identitásig.
                </p>
              </div>
            </div>

            {/* Szolgáltatások szekció */}
            <section className="mt-24 max-w-6xl mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#00B5F1]/5 to-transparent" />
              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-text-primary mb-8">
                  Szolgáltatások
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-transparent border border-slate-700/60 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-[#00B5F1] mb-3">
                      Logó Tervezés
                    </h3>
                    <p className="text-slate-400">
                      Egyedi, vektorgrafikus logó tervezés, amely időtálló és
                      skálázható minden méretben
                    </p>
                  </div>
                  <div className="bg-transparent border border-slate-700/60 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-[#00B5F1] mb-3">
                      Vállalati Arculat
                    </h3>
                    <p className="text-slate-400">
                      Teljes vizuális identitás: színvilág, tipográfia,
                      ikonográfia és guideline dokumentáció
                    </p>
                  </div>
                  <div className="bg-transparent border border-slate-700/60 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-[#00B5F1] mb-3">
                      Branding Stratégia
                    </h3>
                    <p className="text-slate-400">
                      Márka pozicionálás, target audience elemzés és vizuális
                      stratégia fejlesztés
                    </p>
                  </div>
                  <div className="bg-transparent border border-slate-700/60 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-[#00B5F1] mb-3">
                      Print és Digitális
                    </h3>
                    <p className="text-slate-400">
                      Névjegykártya, levélpapír, weboldal, social media és
                      minden marketing anyag
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Előnyök szekció */}
            <section className="mt-24 max-w-4xl mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#00B5F1]/5 to-transparent" />
              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-text-primary mb-8">
                  Miért válassz engem?
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-8 h-8 bg-[#00B5F1] rounded-full flex items-center justify-center text-bg-base font-bold">
                      ✓
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">
                        26 éves grafikai tapasztalat
                      </h3>
                      <p className="text-slate-400">
                        Nyomdaipari és digitális grafikai rutinnal rendelkezem,
                        mindkét területet ismerem
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-8 h-8 bg-[#00B5F1] rounded-full flex items-center justify-center text-bg-base font-bold">
                      ✓
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">
                        Vektorgrafikus alapok
                      </h3>
                      <p className="text-slate-400">
                        Minden design vektor formátumban kerül átadásra, így
                        korlátlanul skálázható
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-8 h-8 bg-[#00B5F1] rounded-full flex items-center justify-center text-bg-base font-bold">
                      ✓
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">
                        Konverzió-fókuszú design
                      </h3>
                      <p className="text-slate-400">
                        Nem csak esztétikai, hanem üzleti szempontból is
                        optimalizált arculat tervezés
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Pricing Section */}
            <section className="mt-24 max-w-6xl mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#00B5F1]/5 to-transparent" />
              <div className="relative z-10">
                <PricingTable
                  tiers={[
                    {
                      id: "logo",
                      name: "Logó Tervezés",
                      description:
                        "Egyedi logó tervezés 3-5 munkanap alatt (specifikáció kialakítással)",
                      features: [
                        "Specifikáció kialakítás és konzultáció",
                        "3 logó koncept vázlat",
                        "Vektoros fájlok (AI, SVG, EPS)",
                        "RGB és CMYK formátumok",
                        "2 korrekciós kör",
                        "Használati útmutató",
                      ],
                      ctaText: "Egyedi árajánlat kérése",
                      ctaLink: "/kapcsolat",
                    },
                    {
                      id: "branding",
                      name: "Vállalati Arculat",
                      description:
                        "Komplett arculati tervezés 1-2 hét alatt (specifikáció kialakítással)",
                      features: [
                        "Specifikáció kialakítás és konzultáció",
                        "Logó és vizuális identitás",
                        "Színvilág és tipográfia",
                        "Brand guideline dokumentum",
                        "Weboldal design elemek",
                        "3 korrekciós kör",
                        "1 hónap support",
                      ],
                      highlighted: true,
                      ctaText: "Egyedi árajánlat kérése",
                      ctaLink: "/kapcsolat",
                    },
                    {
                      id: "premium",
                      name: "Premium Branding",
                      description:
                        "Teljes branding stratégia 2-3 hét alatt (specifikáció kialakítással)",
                      features: [
                        "Specifikáció kialakítás és konzultáció",
                        "Komplett vizuális identitás",
                        "Branding stratégia",
                        "Marketing anyagok",
                        "Social media template-ek",
                        "Print és digitális anyagok",
                        "5 korrekciós kör",
                        "3 hónap support",
                      ],
                      ctaText: "Egyedi árajánlat kérése",
                      ctaLink: "/kapcsolat",
                    },
                  ]}
                  title="Egyedi árajánlat kérése"
                  description="Minden projekt egyedi igények alapján kerül árazásra. Ingyenes konzultáció a pontos árhoz és a specifikáció kialakításához."
                />
              </div>
            </section>

            {/* Process Section */}
            <section className="mt-24 max-w-4xl mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#00B5F1]/5 to-transparent" />
              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-text-primary mb-8">
                  Hogyan dolgozom?
                </h2>
                <div className="space-y-6">
                  <div className="bg-transparent border border-slate-700/60 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-[#00B5F1] mb-2">
                      1. Konzultáció és brief
                    </h3>
                    <p className="text-slate-400">
                      Konzultáció a célokról, target audience-ről és vizuális
                      preferenciákról. Specifikáció kialakítása.
                    </p>
                  </div>
                  <div className="bg-transparent border border-slate-700/60 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-[#00B5F1] mb-2">
                      2. Vázlat és konceptek
                    </h3>
                    <p className="text-slate-400">
                      Több koncept vázlata a választáshoz és korrekciós körök.
                      Iteratív fejlesztés.
                    </p>
                  </div>
                  <div className="bg-transparent border border-slate-700/60 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-[#00B5F1] mb-2">
                      3. Végső kivitelezés
                    </h3>
                    <p className="text-slate-400">
                      Véglegesítés, vektoros formátumok átadása, brand guideline
                      dokumentum és nyomdai előkészítés.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ szekció */}
            <section className="mt-24 max-w-4xl mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#00B5F1]/5 to-transparent" />
              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-text-primary mb-8">
                  Gyakran Kérdezett Kérdések
                </h2>
                <div className="space-y-4">
                  <details className="bg-transparent border border-slate-700/60 p-6 rounded-lg group">
                    <summary className="cursor-pointer font-semibold text-text-primary group-hover:text-[#00B5F1] transition-colors">
                      Mennyi idő a logó tervezése?
                    </summary>
                    <p className="mt-4 text-slate-400">
                      Egyszerű logó 3-5 munkanap, komplett arculat 1-2 hét attól
                      függően, hogy milyen komplexitást igényel.
                    </p>
                  </details>
                  <details className="bg-transparent border border-slate-700/60 p-6 rounded-lg group">
                    <summary className="cursor-pointer font-semibold text-text-primary group-hover:text-[#00B5F1] transition-colors">
                      Milyen formátumokban kapom meg?
                    </summary>
                    <p className="mt-4 text-slate-400">
                      Vektor formátumok (AI, SVG, EPS), nagy felbontású PNG, és
                      minden szükséges digitális és print formátum.
                    </p>
                  </details>
                  <details className="bg-transparent border border-slate-700/60 p-6 rounded-lg group">
                    <summary className="cursor-pointer font-semibold text-text-primary group-hover:text-[#00B5F1] transition-colors">
                      Módosíthatom később a logót?
                    </summary>
                    <p className="mt-4 text-slate-400">
                      Igen, a vektor fájlok lehetővé teszik a korlátlan
                      módosítást és skálázást jövőbeli igények szerint.
                    </p>
                  </details>
                  <details className="bg-transparent border border-slate-700/60 p-6 rounded-lg group">
                    <summary className="cursor-pointer font-semibold text-text-primary group-hover:text-[#00B5F1] transition-colors">
                      Milyen referenciáid vannak?
                    </summary>
                    <p className="mt-4 text-slate-400">
                      Esküvői dekoráció branding, Dr Nagy Albert orvosi arculat,
                      Ronch Caffé branding és több mint 150 sikeres projekt
                      különböző iparágakban.
                    </p>
                  </details>
                  <details className="bg-transparent border border-[#00B5F1]/30 p-6 rounded-lg group">
                    <summary className="cursor-pointer font-semibold text-text-primary group-hover:text-[#00B5F1] transition-colors">
                      Mennyibe kerül egy arculattervezés projekt?
                    </summary>
                    <p className="mt-4 text-slate-400">
                      Egyedi árajánlat kérése a projekt igényei szerint.
                      Ingyenes konzultáció a pontos árhoz.
                    </p>
                  </details>
                  <details className="bg-transparent border border-slate-700/60 p-6 rounded-lg group">
                    <summary className="cursor-pointer font-semibold text-text-primary group-hover:text-[#00B5F1] transition-colors">
                      Mire kell figyelni az árajánlatkérésnél?
                    </summary>
                    <p className="mt-4 text-slate-400">
                      Minél pontosabb specifikációt adsz meg, annál pontosabb
                      árajánlatot tudok adni. Ha nincs design specifikációd,
                      akkor konzultációra van szükség, ami időigényes. A
                      konzultáció során feltérzem az üzleti igényeket, vizuális
                      preferenciákat, és kalkulálom a szükséges munkaórákat. Ez
                      a folyamat biztosítja, hogy a végső ár reális és a projekt
                      sikeres legyen.
                    </p>
                  </details>
                </div>
              </div>
            </section>

            {/* Final CTA */}
            <section className="mt-24 py-40 text-center bg-transparent border-t border-slate-700/60 relative overflow-hidden">
              <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="max-w-3xl mx-auto space-y-10">
                  <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold font-sans text-text-primary leading-tight tracking-tight">
                    Készen állsz a{" "}
                    <span className="text-[#00B5F1] italic">következő</span>{" "}
                    szintre?
                  </h2>
                  <p className="text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed mx-auto">
                    Ingyenes konzultáció, átlátható árazás, határidőre kész
                    projektek. Nincs projektmenedzser, közvetlen kommunikáció
                    velem.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Button
                      variant="primary"
                      href="/kapcsolat"
                      className="text-lg px-8 py-4"
                    >
                      Ingyenes Konzultáció
                    </Button>
                    <Button
                      variant="secondary"
                      href="/munkak"
                      className="text-lg px-8 py-4"
                    >
                      Munkák megtekintése
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
