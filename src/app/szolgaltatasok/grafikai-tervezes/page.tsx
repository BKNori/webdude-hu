import SectionTitle from "@/components/atoms/SectionTitle";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Image from "next/image";
import { Metadata } from "next";
import PricingTable from "@/components/molecules/PricingTable";
import { buildBreadcrumbSchema, BreadcrumbItem } from "@/lib/breadcrumb";
import HeroCarousel from "@/components/molecules/HeroCarousel";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Professzionális Grafikai Tervezés és Branding | WebDude",
    description:
      "26 év tapasztalattal: vektoros logók, prospektusok, marketing anyagok és teljes vizuális arculati tervezés. Értékesítés-fókuszú grafikák webshopok és vállalkozások számára.",
    keywords:
      "grafikai tervezés, logo tervezés, vektoros grafika, prospektus tervezés, vizuális arculat, marketing grafika",
    alternates: {
      canonical: "https://webdude.hu/szolgaltatasok/grafikai-tervezes",
    },
    openGraph: {
      title: "Professzionális Grafikai Tervezés és Branding | WebDude",
      description:
        "26 év tapasztalattal: vektoros logók, prospektusok, marketing anyagok és teljes vizuális arculati tervezés. Értékesítés-fókuszú grafikák webshopok és vállalkozások számára.",
      type: "website",
      url: "https://webdude.hu/szolgaltatasok/grafikai-tervezes",
      siteName: "WebDude",
      images: [
        {
          url: "https://webdude.hu/assets/portfolio/marina-lakopark/marina-nagytabla-copy-2.webp",
          width: 1920,
          height: 1280,
          alt: "Grafikai tervezési példa - Marina nagy tábla projekt",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Professzionális Grafikai Tervezés és Branding | WebDude",
      description:
        "26 év tapasztalattal: vektoros logók, prospektusok, marketing anyagok és teljes vizuális arculati tervezés. Értékesítés-fókuszú grafikák webshopok és vállalkozások számára.",
      images: [
        "https://webdude.hu/assets/portfolio/marina-lakopark/marina-nagytabla-copy-2.webp",
      ],
    },
  };
}

const FAQ = [
  {
    q: "Mennyi idő egy nyomdai anyag előkészítése?",
    a: "Egyszerű projektek esetén 3-5 munkanap, komplex arculati tervezésnél 7-14 munkanap. Sürgős igények esetén expressz szolgáltatás is elérhető.",
  },
  {
    q: "Készítetek vektoros logót is?",
    a: "Igen, minden logót vektoros (AI, EPS, SVG) formátumokban adunk át, így bármilyen méretben felhasználható weboldalra, nyomtatványra vagy promóciós anyagra.",
  },
  {
    q: "Milyen formátumokban kapom meg a grafikákat?",
    a: "Nyomdai anyagokat CMYK, 300 DPI minőségben, webes felhasználáshoz RGB, 72 DPI formátumban. Minden esetben vektoros és raster fájlokat is átadunk.",
  },
  {
    q: "Mennyibe kerül egy grafikai projekt?",
    a: "Egyedi árajánlat kérése a projekt igényei szerint. Ingyenes konzultáció a pontos árhoz.",
  },
  {
    q: "Mire kell figyelni az árajánlatkérésnél?",
    a: "Minél pontosabb specifikációt adsz meg, annál pontosabb árajánlatot tudok adni. Ha nincs design specifikációd, akkor konzultációra van szükség, ami időigényes. A konzultáció során feltérzem az üzleti igényeket, vizuális preferenciákat, és kalkulálom a szükséges munkaórákat. Ez a folyamat biztosítja, hogy a végső ár reális és a projekt sikeres legyen.",
  },
];

export const revalidate = 3600;

export default async function GraphicDesignPage() {
  const serviceName = "Grafikai Tervezés";
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Főoldal", url: "/" },
    { name: "Szolgáltatások", url: "/szolgaltatasok" },
    { name: serviceName, url: "/szolgaltatasok/grafikai-tervezes" },
  ];

  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Professzionális Grafikai Tervezés és Branding",
    description:
      "26 év tapasztalattal: vektoros logók, prospektusok, marketing anyagok és teljes vizuális arculati tervezés. Értékesítés-fókuszú grafikák webshopok és vállalkozások számára.",
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
          __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c"),
        }}
      />
      <div className="min-h-screen bg-bg-base text-text-primary relative overflow-hidden">
        {/* Hero Section with Carousel */}
        <HeroCarousel
          images={[
            {
              src: "/assets/banners/Hu-Mago-Magazin-mocdddkup-copy.webp",
              alt: "Grafikai tervezési példa - Hu Mago Magazin projekt",
            },
            {
              src: "/assets/banners/dr_nagy_albert_identity.webp",
              alt: "Grafikai tervezés - Dr. Nagy Albert identity projekt",
            },
          ]}
        >
          <SectionTitle
            center
            eyebrow="Szolgáltatás"
            title={serviceName}
            description="26 év tapasztalattal készítek értékesítés-fókuszú grafikákat: vektoros logók, prospektusok, marketing anyagok és teljes vizuális arculati tervezés vállalkozások számára."
            className="mx-auto"
          />
        </HeroCarousel>

        {/* Background gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-[#00B5F1]/5 via-transparent to-[#00B5F1]/5" />
        <div className="relative z-10">
          <div className="max-w-6xl mx-auto px-6 py-20">
            {/* Introduction Section */}
            <div className="grid gap-12 md:grid-cols-2 items-start max-w-4xl mx-auto mb-24">
              <div className="space-y-6">
                <Badge>Grafikai Tervezés</Badge>
                <p className="text-xl text-slate-400 leading-relaxed">
                  Nem csak szép grafikákat készítek — olyan vizuális elemeket,
                  amelyek konkrétan növelik a konverziót és erősítik a márkát. A
                  webshopoknál a termékképektől a bannerekig, az offline
                  marketingnél a prospektusoktól az esemény anyagokig.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="primary" href="/kapcsolat">
                    Kérj ingyenes konzultációt
                  </Button>
                  <Button variant="secondary" href="/munkak">
                    Portfólió megtekintése
                  </Button>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-slate-700/60">
                <Image
                  src="/assets/banners/webdue-branding_mockup_05-copy copy.webp"
                  alt="Grafikai tervezési példa - vektoros logók és marketing anyagok"
                  width={1200}
                  height={800}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Services Section */}
            <section className="mt-24 max-w-6xl mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#00B5F1]/5 to-transparent" />
              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-text-primary mb-8">
                  Szolgáltatások
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-transparent border border-slate-700/60 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-[#00B5F1] mb-3">
                      Logo és Branding
                    </h3>
                    <p className="text-slate-400">
                      Egyedi logó tervezés, teljes vizuális arculati rendszerek,
                      brand guideline dokumentumok
                    </p>
                  </div>
                  <div className="bg-transparent border border-slate-700/60 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-[#00B5F1] mb-3">
                      Marketing Anyagok
                    </h3>
                    <p className="text-slate-400">
                      Prospektusok, szórólapok, bannerek, social media grafikák,
                      hírlevelek és e-mail kampányok
                    </p>
                  </div>
                  <div className="bg-transparent border border-slate-700/60 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-[#00B5F1] mb-3">
                      Nyomdai Előkészítés
                    </h3>
                    <p className="text-slate-400">
                      Bármilyen nyomtatvány előkészítése: névjegykártyák,
                      kiadványok, csomagolás és POS anyagok
                    </p>
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
                      name: "Logo Tervezés",
                      description:
                        "Egyedi logó tervezés 3-5 munkanap alatt (specifikáció kialakítással)",
                      features: [
                        "Specifikáció kialakítás és konzultáció",
                        "3 logó koncept vázlat",
                        "Vektoros fájlok (AI, EPS, SVG)",
                        "RGB és CMYK formátumok",
                        "2 korrekciós kör",
                        "Használati útmutató",
                      ],
                      ctaText: "Logo tervezés kérése",
                      ctaLink: "/kapcsolat",
                    },
                    {
                      id: "marketing",
                      name: "Marketing Anyagok",
                      description:
                        "Marketing grafikák 5-7 munkanap alatt (specifikáció kialakítással)",
                      features: [
                        "Specifikáció kialakítás és konzultáció",
                        "Social media grafikák",
                        "Bannerek és hirdetés anyagok",
                        "Prospektus és szórólap",
                        "Email kampány grafikák",
                        "3 korrekciós kör",
                        "Nyomdai előkészítés",
                      ],
                      highlighted: true,
                      ctaText: "Marketing csomag kérése",
                      ctaLink: "/kapcsolat",
                    },
                    {
                      id: "branding",
                      name: "Teljes Arculat",
                      description:
                        "Komplett arculati tervezés 7-14 munkanap alatt (specifikáció kialakítással)",
                      features: [
                        "Specifikáció kialakítás és konzultáció",
                        "Logó és vizuális identitás",
                        "Brand guideline dokumentum",
                        "Marketing anyagok",
                        "Weboldal design elemek",
                        "Nyomdai anyagok",
                        "5 korrekciós kör",
                        "1 hónap support",
                      ],
                      ctaText: "Arculat csomag kérése",
                      ctaLink: "/kapcsolat",
                    },
                  ]}
                  title="Válassza ki a megfelelő grafikai csomagot"
                  description="Minden csomag tartalmazza a konzultációt, specifikáció kialakítást, tervezést, korrekciókat és a fájlok átadását. Kérjen személyre szabott árajánlatot."
                />
              </div>
            </section>

            {/* Benefits Section */}
            <section className="mt-24 max-w-4xl mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#00B5F1]/5 to-transparent" />
              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-text-primary mb-8">
                  Miért WebDude?
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-8 h-8 bg-[#00B5F1] rounded-full flex items-center justify-center text-bg-base font-bold">
                      ✓
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">
                        26 év szakmai tapasztalat
                      </h3>
                      <p className="text-slate-400">
                        Több mint két évtized alatt számos sikeres projektet
                        teljesítettem kisvállalkozásoktól nagy márkákig
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-8 h-8 bg-[#00B5F1] rounded-full flex items-center justify-center text-bg-base font-bold">
                      ✓
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">
                        Értékesítés-fókuszú megközelítés
                      </h3>
                      <p className="text-slate-400">
                        Nem csak &quot;szép&quot; grafikákat készítek — olyan
                        vizuális elemeket, amelyek konkrétan növelik a
                        konverziót
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-8 h-8 bg-[#00B5F1] rounded-full flex items-center justify-center text-bg-base font-bold">
                      ✓
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">
                        Vektoros és nyomdai minőség
                      </h3>
                      <p className="text-slate-400">
                        Minden grafikát vektoros formátumban és nyomdai
                        minőségben adok át, így bármilyen felhasználásra
                        alkalmas
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-8 h-8 bg-[#00B5F1] rounded-full flex items-center justify-center text-bg-base font-bold">
                      ✓
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">
                        Teljes körű együttműködés
                      </h3>
                      <p className="text-slate-400">
                        Az ötlettől a kivitelezésig: konzultáció, vázlatok,
                        korrekciók és végső anyagok átadása
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Process Section */}
            <section className="mt-24 max-w-4xl mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#00B5F1]/5 to-transparent" />
              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-text-primary mb-8">
                  Működési folyamat
                </h2>
                <div className="space-y-6">
                  <div className="bg-transparent border border-slate-700/60 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-[#00B5F1] mb-2">
                      1. Konzultáció és brief
                    </h3>
                    <p className="text-slate-400">
                      Konzultáció a célokról, target audience-ről és vizuális
                      preferenciákról
                    </p>
                  </div>
                  <div className="bg-transparent border border-slate-700/60 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-[#00B5F1] mb-2">
                      2. Vázlat és konceptek
                    </h3>
                    <p className="text-slate-400">
                      Több koncept vázlata a választáshoz és korrekciós körök
                    </p>
                  </div>
                  <div className="bg-transparent border border-slate-700/60 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-[#00B5F1] mb-2">
                      3. Végső kivitelezés
                    </h3>
                    <p className="text-slate-400">
                      Véglegesítés, vektoros formátumok átadása és nyomdai
                      előkészítés
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="mt-24 max-w-4xl mx-auto px-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#00B5F1]/5 to-transparent" />
              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-text-primary mb-8">
                  Gyakori kérdések
                </h2>
                <div className="space-y-4">
                  {FAQ.map((f) => (
                    <details
                      key={f.q}
                      className="bg-transparent border border-slate-700/60 p-6 rounded-lg group"
                    >
                      <summary className="font-semibold text-text-primary cursor-pointer group-hover:text-[#00B5F1] transition-colors">
                        {f.q}
                      </summary>
                      <p className="mt-3 text-slate-400">{f.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="mt-24 bg-linear-to-r from-[#00B5F1]/10 to-[#00B5F1]/5 border border-[#00B5F1]/30 p-12 rounded-3xl text-center max-w-4xl mx-auto relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-5xl font-bold text-text-primary mb-4">
                  Kész a projektje? Kezdjük el!
                </h2>
                <p className="text-lg text-slate-400 mb-8">
                  Ingyenes konzultáció és személyre szabott ajánlat kérése
                </p>
                <Button
                  variant="primary"
                  href="/kapcsolat"
                  className="text-lg px-8 py-4"
                >
                  Kérj ingyenes konzultációt
                </Button>
              </div>
            </section>

            {/* Related Services */}
            <section className="mt-24 max-w-4xl mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#00B5F1]/5 to-transparent" />
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-text-primary mb-6">
                  Kapcsolódó szolgáltatások
                </h2>
                <div className="flex flex-wrap gap-4">
                  <Button
                    variant="secondary"
                    href="/szolgaltatasok/egyedi-arculattervezes-logo"
                  >
                    Egyedi Arculattervezés és Logo
                  </Button>
                  <Button
                    variant="secondary"
                    href="/szolgaltatasok/weboldal-keszites"
                  >
                    Weboldal Készítés
                  </Button>
                  <Button
                    variant="secondary"
                    href="/szolgaltatasok/webshop-fejlesztes"
                  >
                    Webshop Fejlesztés
                  </Button>
                  <Button
                    variant="secondary"
                    href="/szolgaltatasok/seo-optimalizalas"
                  >
                    SEO Optimalizálás
                  </Button>
                  <Button
                    variant="secondary"
                    href="/szolgaltatasok/ai-kep-es-videogeneralas"
                  >
                    AI Kép és Videó Generálás
                  </Button>
                  <Button variant="secondary" href="/munkak">
                    Portfólió
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
