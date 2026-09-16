import SectionTitle from "@/components/atoms/SectionTitle";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Image from "next/image";
import { Metadata } from "next";
import { buildBreadcrumbSchema, BreadcrumbItem } from "@/lib/breadcrumb";
import HeroCarousel from "@/components/molecules/HeroCarousel";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "AI Kép és Videógenerálás Automatizálás | WebDude Kecskemét",
    description:
      "Generatív AI megoldások marketing assetek automatikus előállításához: képek, videók, grafikák és kreatív anyagok skálázható, gyors és költséghatékony folyamatokkal.",
    keywords:
      "AI kép generálás, AI videó generálás, generatív AI, marketing automatizálás, asset pipeline, Midjourney, DALL-E, Stable Diffusion, Kecskemét",
    openGraph: {
      title: "AI Kép és Videógenerálás Automatizálás | WebDude",
      description:
        "Generatív AI megoldások marketing assetek automatikus előállításához: képek, videók, grafikák és kreatív anyagok skálázható, gyors és költséghatékony folyamatokkal.",
      type: "website",
    },
  };
}

const FAQ = [
  {
    q: "Mennyi idő egy AI asset létrehozása?",
    a: "Hagyományos grafikai tervezéshez képest 60-90% gyorsabb. Egyedi AI képek 2-5 perc, videók 10-20 perc alatt elkészülnek automatizált folyamatokkal.",
  },
  {
    q: "Milyen AI eszközöket használtok?",
    a: "A legmodernebb generatív AI eszközöket: Midjourney, DALL-E 3, Stable Diffusion képekhez, Runway, Pika, Sora videókhoz. Plusz egyedi automatizált pipeline-eket építek.",
  },
  {
    q: "Hogyan biztosítjátok a márkakonzisztenciát?",
    a: "Egyedi márkai training modelleket építek, amelyek garantálják a vizuális konzisztenciát minden asseten. Brand guide alapján automatizált stílus-beállítások.",
  },
  {
    q: "Mennyibe kerül egy AI projekt?",
    a: "Egyedi pricing a projekt komplexitásától függően. Ingyenes konzultáció a pontos árhozhoz.",
  },
  {
    q: "Miért nem adok fix árat az oldalon?",
    a: "Minden AI projekt egyedi, és az ügyfelek többsége nem hoz pontos specifikációt az AI asset generáláshoz. Én kell utána nyomoznom, kiderítenem az üzleti igényeket, ajánlatot adok, ajánlom a megoldást, és elmagyarázom az AI eszközök működését. Ez rengeteg írás és óra alapú munka, amit bele kell kalkulálni az árba. Magyarországon a piaci óradíjak AI/ML területen 15.000-40.000 Ft között mozognak, és a specifikáció hiánya miatt a konzultáció és tervezés fázis 5-15 óráig is eltarthat.",
  },
  {
    q: "Mire kell figyelni az árajánlatkérésnél?",
    a: "Minél pontosabb specifikációt adsz meg az AI asset generáláshoz, annál pontosabb árajánlatot tudok adni. Ha nincs AI specifikációd, akkor konzultációra van szükség, ami időigényes. A konzultáció során feltérzem az üzleti igényeket, vizuális preferenciákat, és kalkulálom a szükséges munkaórákat. Ez a folyamat biztosítja, hogy a végső ár reális és a projekt sikeres legyen.",
  },
];

export const revalidate = 3600;

export default async function AiMediaPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Főoldal", url: "/" },
    { name: "Szolgáltatások", url: "/szolgaltatasok" },
    {
      name: "AI Kép- és Videógenerálás",
      url: "/szolgaltatasok/ai-kep-es-videogeneralas",
    },
  ];

  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Kép és Videógenerálás Automatizálás",
    description:
      "Generatív AI megoldások marketing assetek automatikus előállításához: képek, videók, grafikák és kreatív anyagok skálázható, gyors és költséghatékony folyamatokkal.",
    provider: {
      "@type": "LocalBusiness",
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
      <main className="min-h-screen bg-transparent text-text-primary relative overflow-hidden">
        {/* Hero Section with Carousel */}
        <HeroCarousel
          images={[
            {
              src: "/assets/banners/Einstein_Dude.webp",
              alt: "AI Kép Generálás - Einstein Dude projekt",
            },
            {
              src: "/assets/banners/webdude_ai_grafikak.webp",
              alt: "AI Grafikák - WebDude AI projekt",
            },
            {
              src: "/assets/banners/Charli-chaplin-darth-copsssy.webp",
              alt: "AI Videó Generálás - Charli Chaplin Darth projekt",
            },
          ]}
        >
          <SectionTitle
            center
            eyebrow="Szolgáltatás"
            title="AI Kép- és Videógenerálás"
            description="Generatív AI megoldások marketing assetek automatikus előállításához: képek, videók, grafikák és kreatív anyagok skálázható, gyors és költséghatékony folyamatokkal."
            className="mx-auto"
          />
        </HeroCarousel>

        {/* Background gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-purple-500/5 via-transparent to-cyan-500/5" />
        <div className="relative z-10">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <div className="mt-12 grid gap-12 md:grid-cols-2 items-start max-w-4xl mx-auto">
              <div className="space-y-6">
                <Badge>Generatív AI</Badge>
                <p className="text-xl text-slate-700 leading-relaxed">
                  A hagyományos grafikai tervezés helyett AI-vezérelt asset
                  pipeline-eket építek, amelyek automatikusan előállítanak
                  marketing anyagokat: termékképek, bannerek, szociális média
                  tartalmak, videó hirdetések és több. A folyamat 60-90%
                  gyorsabb és költséghatékonyabb, mint a manuális tervezés.
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

              <div className="rounded-2xl overflow-hidden border border-slate-200">
                <Image
                  src="/assets/banners/Smileing_Joker-Jesus.webp"
                  alt="AI Asset Pipeline Demo - Smileing Joker Jesus projekt"
                  width={1200}
                  height={800}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Services Section */}
            <section className="mt-24 max-w-6xl mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-500/5 to-transparent" />
              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-text-primary mb-8">
                  Szolgáltatások
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 p-6 rounded-lg hover:border-purple-500/50 transition-colors">
                    <h3 className="text-xl font-semibold text-purple-500 mb-3">
                      AI Kép Generálás
                    </h3>
                    <p className="text-slate-400">
                      Termékképek, bannerek, szociális média grafikák, blog
                      képek és minden vizuális asset automatizálva
                    </p>
                  </div>
                  <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 p-6 rounded-lg hover:border-purple-500/50 transition-colors">
                    <h3 className="text-xl font-semibold text-purple-500 mb-3">
                      AI Videó Generálás
                    </h3>
                    <p className="text-slate-400">
                      Hirdetési videók, termékvideók, animációk és sztori
                      tartalmak automatikusan generálva
                    </p>
                  </div>
                  <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 p-6 rounded-lg hover:border-purple-500/50 transition-colors">
                    <h3 className="text-xl font-semibold text-purple-500 mb-3">
                      Asset Pipeline Automatizálás
                    </h3>
                    <p className="text-slate-400">
                      Teljes workflow automatizálás: prompt engineering,
                      generálás, utómunka és változatok készítése
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Pricing Section - Egyedi árajánlat CTA */}
            <section className="mt-24 max-w-6xl mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-500/5 to-transparent" />
              <div className="relative z-10">
                <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 p-12 rounded-3xl text-center">
                  <h2 className="text-4xl font-bold text-text-primary mb-4">
                    Egyedi AI Workflow Tervezés
                  </h2>
                  <p className="text-lg text-slate-400 mb-8">
                    Minden AI projekt egyedi. Ingyenes konzultáció és személyre
                    szabott árajánlat a pontos specifikáció alapján.
                  </p>
                  <Button
                    variant="primary"
                    href="/kapcsolat"
                    className="px-8 py-4 bg-linear-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white rounded-full font-bold hover:scale-105 active:scale-95 transition-transform duration-300 shadow-[0_8px_24px_rgba(168,85,247,0.3)] hover:shadow-[0_18px_40px_rgba(168,85,247,0.4)] min-h-11 min-w-11 inline-block"
                  >
                    Egyedi árajánlat kérése
                  </Button>
                </div>
              </div>
            </section>

            {/* Benefits Section */}
            <section className="mt-24 max-w-4xl mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-500/5 to-transparent" />
              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-text-primary mb-8">
                  Miért AI Asset Pipeline?
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-8 h-8 bg-linear-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                      ✓
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">
                        60-90% gyorsabb előállítás
                      </h3>
                      <p className="text-slate-400">
                        Hagyományos tervezés helyett AI-vezérelt folyamatokkal
                        asseteket készítek percek helyett napok alatt
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-8 h-8 bg-linear-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                      ✓
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">
                        Költséghatékony skálázás
                      </h3>
                      <p className="text-slate-400">
                        Heti 5-10 asset helyett 50-100 assetet állíthatok elő
                        ugyanabban a költségkeretben
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-8 h-8 bg-linear-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                      ✓
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">
                        Márkakonzisztencia garantálva
                      </h3>
                      <p className="text-slate-400">
                        Egyedi márkai training modellekkel biztosítom, hogy
                        minden asset vizuálisan illeszkedjen a brand
                        identity-hez
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-8 h-8 bg-linear-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                      ✓
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">
                        A/B tesztelés támogatott
                      </h3>
                      <p className="text-slate-400">
                        Automatikus változatok készítése, hogy A/B teszteléssel
                        optimalizálhassa a konverziót
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-8 h-8 bg-linear-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                      ✓
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">
                        Teljes kontroll és minőség
                      </h3>
                      <p className="text-slate-400">
                        A generálás mellett kézi review és utómunka garantálja a
                        professzionális minőséget
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Process Section */}
            <section className="mt-24 max-w-4xl mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-500/5 to-transparent" />
              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-text-primary mb-8">
                  Működési folyamat
                </h2>
                <div className="space-y-6">
                  <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 p-6 rounded-lg hover:border-purple-500/50 transition-colors">
                    <h3 className="text-lg font-semibold text-purple-500 mb-2">
                      1. Konfiguráció és Prompt Engineering
                    </h3>
                    <p className="text-slate-400">
                      Brand guide alapján egyedi promptokat és
                      stílus-beállítások készítése, márkai training modellek
                      építése
                    </p>
                  </div>
                  <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 p-6 rounded-lg hover:border-purple-500/50 transition-colors">
                    <h3 className="text-lg font-semibold text-purple-500 mb-2">
                      2. Generálás és Pipeline Automatizálás
                    </h3>
                    <p className="text-slate-400">
                      AI eszközökkel automatikus asset előállítás, változatok
                      készítése és skálázható folyamatok kiépítése
                    </p>
                  </div>
                  <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 p-6 rounded-lg hover:border-purple-500/50 transition-colors">
                    <h3 className="text-lg font-semibold text-purple-500 mb-2">
                      3. Review, Utómunka és Átadás
                    </h3>
                    <p className="text-slate-400">
                      Kézi review, retusálás, utómunka és a kész assetek átadása
                      webes felhasználásra és nyomdai anyagokhoz
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Tools Section */}
            <section className="mt-24 max-w-4xl mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-500/5 to-transparent" />
              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-text-primary mb-8">
                  Használt AI Eszközök
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 p-6 rounded-lg hover:border-purple-500/50 transition-colors">
                    <h3 className="text-xl font-semibold text-purple-500 mb-3">
                      Kép Generálás
                    </h3>
                    <ul className="text-slate-400 space-y-2">
                      <li>• Midjourney (V6)</li>
                      <li>• DALL-E 3</li>
                      <li>• Stable Diffusion XL</li>
                      <li>• Adobe Firefly</li>
                    </ul>
                  </div>
                  <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 p-6 rounded-lg hover:border-purple-500/50 transition-colors">
                    <h3 className="text-xl font-semibold text-purple-500 mb-3">
                      Videó Generálás
                    </h3>
                    <ul className="text-slate-400 space-y-2">
                      <li>• Runway (Gen-2)</li>
                      <li>• Pika Labs</li>
                      <li>• Sora (Google)</li>
                      <li>• HeyGen (avatarok)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="mt-24 max-w-4xl mx-auto px-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-500/5 to-transparent" />
              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-text-primary mb-8">
                  Gyakori kérdések
                </h2>
                <div className="space-y-4">
                  {FAQ.map((f, index) => (
                    <details
                      key={index}
                      className="bg-slate-900/80 backdrop-blur-md border border-slate-700 p-6 rounded-lg group hover:border-purple-500/50 transition-colors"
                    >
                      <summary className="font-semibold text-text-primary cursor-pointer group-hover:text-purple-500 transition-colors">
                        {f.q}
                      </summary>
                      <p className="mt-3 text-slate-400">{f.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="mt-24 bg-linear-to-r from-purple-500/10 to-cyan-500/5 border border-purple-500/30 p-12 rounded-3xl text-center max-w-4xl mx-auto relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-5xl font-bold text-text-primary mb-4">
                  Kész automatizálni a marketing asseteket?
                </h2>
                <p className="text-lg text-slate-400 mb-8">
                  Ingyenes konzultáció és személyre szabott AI workflow tervezés
                </p>
                <Button
                  variant="primary"
                  href="/kapcsolat"
                  className="text-lg px-8 py-4 bg-linear-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600"
                >
                  Kérj ingyenes konzultációt
                </Button>
              </div>
            </section>

            {/* Related Services */}
            <section className="mt-24 max-w-4xl mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-500/5 to-transparent" />
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-text-primary mb-6">
                  Kapcsolódó szolgáltatások
                </h2>
                <div className="flex flex-wrap gap-4">
                  <Button
                    variant="secondary"
                    href="/szolgaltatasok/grafikai-tervezes"
                    className="border-slate-700 text-slate-400 hover:text-purple-500 hover:border-purple-500/50"
                  >
                    Grafikai Tervezés
                  </Button>
                  <Button
                    variant="secondary"
                    href="/szolgaltatasok/wordpress-webshop-keszites"
                    className="border-slate-700 text-slate-400 hover:text-purple-500 hover:border-purple-500/50"
                  >
                    WordPress Webshop Készítés
                  </Button>
                  <Button
                    variant="secondary"
                    href="/munkak"
                    className="border-slate-700 text-slate-400 hover:text-purple-500 hover:border-purple-500/50"
                  >
                    Portfólió
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
