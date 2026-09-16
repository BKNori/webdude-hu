import Hero from "@/components/Hero";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import { Metadata } from "next";
import PricingTable from "@/components/molecules/PricingTable";
import { buildBreadcrumbSchema, BreadcrumbItem } from "@/lib/breadcrumb";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "WooCommerce Webshop Készítés és Fejlesztés | WebDude",
    description:
      "16 év tapasztalattal WooCommerce webshop készítés, fejlesztés és optimalizálás. Konverzió-fókuszú e-kereskedelmi rendszerek, fizetési integrációk és teljes körű támogatás.",
    keywords:
      "WooCommerce webshop, WooCommerce fejlesztés, e-kereskedelmi rendszer, webshop készítés, WooCommerce optimalizálás, WordPress webshop",
    openGraph: {
      title: "WooCommerce Webshop Készítés és Fejlesztés | WebDude",
      description:
        "16 év tapasztalattal WooCommerce webshop készítés, fejlesztés és optimalizálás. Konverzió-fókuszú e-kereskedelmi rendszerek, fizetési integrációk és teljes körű támogatás.",
      type: "website",
    },
  };
}

const FAQ = [
  {
    q: "Mennyi idő egy WooCommerce webshop elkészítése?",
    a: "Egyszerű webshop 2-3 hét, komplex e-kereskedelmi rendszer 4-8 hét attól függően, hogy hány termék és funkció van.",
  },
  {
    q: "Milyen fizetési módokat integráltok?",
    a: "Barion, SimplePay, Stripe, PayPal, bankkártyás fizetés, utánvét és SZÉP kártya. Minden fizetési szolgáltató whichet nem. és teljes körű compliance.",
  },
  {
    q: "Biztosítod a webshop biztonságát?",
    a: "Igen, SSL tanúsítvány, GDPR-kompatibilis rendszerek, biztonsági frissítések és folyamatos monitoring garantálja a webshop biztonságát.",
  },
  {
    q: "Mennyibe kerül egy WooCommerce webshop?",
    a: "Egyedi árajánlat kérése a projekt igényei szerint. Ingyenes konzultáció a pontos árhoz.",
  },
];

export const revalidate = 3600;

export default async function WooCommercePage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Főoldal", url: "/" },
    { name: "Szolgáltatások", url: "/szolgaltatasok" },
    {
      name: "WooCommerce Webshop Készítés",
      url: "/szolgaltatasok/woocommerce-webshop-keszites",
    },
  ];

  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "WooCommerce Webshop Készítés és Fejlesztés",
    description:
      "16 év tapasztalattal WooCommerce webshop készítés, fejlesztés és optimalizálás. Konverzió-fókuszú e-kereskedelmi rendszerek, fizetési integrációk és teljes körű támogatás.",
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
        {/* Background gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-[#00B5F1]/5 via-transparent to-[#00B5F1]/5" />
        <div className="relative z-10">
          <Hero
            label="Szolgáltatás"
            title="WooCommerce Webshop Készítés"
            subtitle="16 év tapasztalattal WooCommerce webshop készítés és fejlesztés. Konverzió-fókuszú e-kereskedelmi rendszerek, fizetési integrációk és teljes körű támogatás az online értékesítéshez."
            cta1="Kérj ingyenes konzultációt"
            cta1Link="/kapcsolat"
            cta2="Portfólió megtekintése"
            cta2Link="/munkak"
            fullHeight={true}
          />

          <div className="max-w-6xl mx-auto px-6">
            <div className="mt-12 grid gap-12 md:grid-cols-2 items-start max-w-4xl mx-auto">
              <div className="space-y-6">
                <Badge>WooCommerce</Badge>
                <p className="text-xl text-slate-300 leading-relaxed">
                  Nem csak webshopot építek — olyan e-kereskedelmi rendszereket
                  készítek, amelyek konkrétan növelik a konverziót és
                  maximalizálják az online értékesítést. A WooCommerce erejével
                  és a WordPress rugalmasságával.
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
                <div className="bg-linear-to-br from-[#00B5F1]/20 to-[#00B5F1]/5 p-12 flex items-center justify-center min-h-100">
                  <p className="text-2xl text-[#00B5F1] font-semibold text-center">
                    WooCommerce Webshop Archetktúra
                  </p>
                </div>
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
                      Webshop Fejlesztés
                    </h3>
                    <p className="text-slate-400">
                      Teljes WooCommerce webshop építés, termékoldalak, kosár és
                      checkout rendszer konfiguráció
                    </p>
                  </div>
                  <div className="bg-transparent border border-slate-700/60 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-[#00B5F1] mb-3">
                      Fizetési Integráció
                    </h3>
                    <p className="text-slate-400">
                      Barion, SimplePay, Stripe, PayPal integrációk, bankkártyás
                      fizetés és utánvét beállítása
                    </p>
                  </div>
                  <div className="bg-transparent border border-slate-700/60 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-[#00B5F1] mb-3">
                      Performance Optimalizálás
                    </h3>
                    <p className="text-slate-400">
                      Betöltési sebesség optimalizálás, gyorsítótárazás és CDN
                      konfiguráció a max konverzióhoz
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
                      id: "basic",
                      name: "Alap Webshop",
                      description: "Egyszerű WooCommerce webshop 3-4 hét alatt",
                      features: [
                        "WooCommerce telepítés és konfiguráció",
                        "Alap termékkezelés",
                        "1 fizetési integráció",
                        "GDPR adatkezelési szabályzat",
                        "Adminfelület beállítás",
                        "Mobil optimalizált design",
                        "1 hónap karbantartás",
                      ],
                      ctaText: "WordPress árajánlat kérése",
                      ctaLink: "/kapcsolat",
                    },
                    {
                      id: "professional",
                      name: "Komplett Webshop",
                      description: "Komplex WooCommerce webshop 4-6 hét alatt",
                      features: [
                        "WooCommerce fejlett konfiguráció",
                        "Komplex termékkezelés",
                        "Több fizetési integráció",
                        "Szállítási módok beállítása",
                        "GDPR és adatkezelés",
                        "Adminfelület és szupport",
                        "SEO optimalizálás",
                        "3 hónap karbantartás",
                      ],
                      highlighted: true,
                      ctaText: "WordPress árajánlat kérése",
                      ctaLink: "/kapcsolat",
                    },
                    {
                      id: "enterprise",
                      name: "Vállalati Webshop",
                      description: "E-kereskedelmi rendszer 6-10 hét alatt",
                      features: [
                        "Komplex WooCommerce rendszer",
                        "API integrációk",
                        "Készletnyilvántartás",
                        "Automatikus rendeléskezelés",
                        "GDPR és adatbiztonság",
                        "Adminfelület és szupport nézőkör",
                        "Performance optimalizálás",
                        "6 hónap karbantartás",
                      ],
                      ctaText: "WordPress árajánlat kérése",
                      ctaLink: "/kapcsolat",
                    },
                  ]}
                  title="Egyedi árajánlat kérése"
                  description="Minden projekt egyedi igények alapján kerül árazásra. Ingyenes konzultáció a pontos árhoz és a specifikáció kialakításához."
                />
              </div>
            </section>

            {/* Benefits Section */}
            <section className="mt-24 max-w-4xl mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#00B5F1]/5 to-transparent" />
              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-text-primary mb-8">
                  Miért WooCommerce?
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-8 h-8 bg-[#00B5F1] rounded-full flex items-center justify-center text-bg-base font-bold">
                      ✓
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">
                        WordPress alapú rugalmasság
                      </h3>
                      <p className="text-slate-400">
                        A WooCommerce a WordPress erejét használja, így
                        bármilyen plugin és témával integrálható
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-8 h-8 bg-[#00B5F1] rounded-full flex items-center justify-center text-bg-base font-bold">
                      ✓
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">
                        Skálázható bármilyen méretre
                      </h3>
                      <p className="text-slate-400">
                        Kezdő webshoptól nagy e-kereskedelmi rendszerig, a
                        WooCommerce bármikor skálázható
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-8 h-8 bg-[#00B5F1] rounded-full flex items-center justify-center text-bg-base font-bold">
                      ✓
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">
                        Ökoszisztéma és plugin-ekosztéma
                      </h3>
                      <p className="text-slate-400">
                        Több ezer plugin és bővítmény áll rendelkezésre, minden
                        funkció könnyen kiegészíthető
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-8 h-8 bg-[#00B5F1] rounded-full flex items-center justify-center text-bg-base font-bold">
                      ✓
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">
                        Költséghatékony és jövedelmező
                      </h3>
                      <p className="text-slate-400">
                        Alacsony indulási költségek, nincsenek havi platform
                        díjak, csak a hosting és tranzakciós költségek
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-8 h-8 bg-[#00B5F1] rounded-full flex items-center justify-center text-bg-base font-bold">
                      ✓
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">
                        SEO-barát és gyors
                      </h3>
                      <p className="text-slate-400">
                        Beépített SEO funkciók, gyors betöltés és
                        keresőoptimalizált termékoldalak a Google rangsoroláshoz
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="mt-24 max-w-4xl mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#00B5F1]/5 to-transparent" />
              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-text-primary mb-8">
                  Főbb Funkciók
                </h2>
                <div className="space-y-6">
                  <div className="bg-transparent border border-slate-700/60 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-[#00B5F1] mb-2">
                      Termékkezelés és Változatok
                    </h3>
                    <p className="text-slate-400">
                      Komplex termékkezelés, változatok (méret, szín, stb.),
                      készletfigyelés és automatikus raktárkezelés
                    </p>
                  </div>
                  <div className="bg-transparent border border-slate-700/60 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-[#00B5F1] mb-2">
                      Kosár és Checkout Rendszer
                    </h3>
                    <p className="text-slate-400">
                      Optimalizált kosárrendszer, egyszerű checkout folyamat,
                      vendégrendelés és felhasználói fiókok
                    </p>
                  </div>
                  <div className="bg-transparent border border-slate-700/60 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-[#00B5F1] mb-2">
                      Szállítási és Fizetési Konfiguráció
                    </h3>
                    <p className="text-slate-400">
                      Szállítási módok, ingyenes szállítás küszöbök, több
                      fizetési mód és automatikus rendeléskezelés
                    </p>
                  </div>
                  <div className="bg-transparent border border-slate-700/60 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-[#00B5F1] mb-2">
                      Marketing és Akciók
                    </h3>
                    <p className="text-slate-400">
                      Kuponrendszer, akciók, bónusz pontok, hírlevél integráció
                      és remarketing eszközök
                    </p>
                  </div>
                  <div className="bg-transparent border border-slate-700/60 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-[#00B5F1] mb-2">
                      Analitika és RIporting
                    </h3>
                    <p className="text-slate-400">
                      Részletes eladási statisztikák, konverziókövetés, GA4
                      integráció és üzleti intelligencia funkciók
                    </p>
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
                      1. Konzultáció és Stratégia
                    </h3>
                    <p className="text-slate-400">
                      Üzleti célok meghatározása, termékkatalogus áttekintése és
                      webshop stratégia tervezés
                    </p>
                  </div>
                  <div className="bg-transparent border border-slate-700/60 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-[#00B5F1] mb-2">
                      2. Design és Fejlesztés
                    </h3>
                    <p className="text-slate-400">
                      UI/UX design, webshop fejlesztés, termékkatalógus
                      beállítás és checkout konfiguráció
                    </p>
                  </div>
                  <div className="bg-transparent border border-slate-700/60 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-[#00B5F1] mb-2">
                      3. Integráció és Tesztelés
                    </h3>
                    <p className="text-slate-400">
                      Fizetési integrációk, szállítási beállítások, teljes
                      tesztelés és biztonsági audit
                    </p>
                  </div>
                  <div className="bg-transparent border border-slate-700/60 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-[#00B5F1] mb-2">
                      4. Élesítés és Támogatás
                    </h3>
                    <p className="text-slate-400">
                      Webshop launch, bevezetési training és folyamatos support
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
                  {FAQ.map((f, index) => (
                    <details
                      key={index}
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
                  Kész elindítani az online értékesítést?
                </h2>
                <p className="text-lg text-slate-400 mb-8">
                  Ingyenes konzultáció és személyre szabott webshop stratégia
                  kérés
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
                    href="/szolgaltatasok/wordpress-webshop-keszites"
                  >
                    WordPress Webshop Készítés
                  </Button>
                  <Button
                    variant="secondary"
                    href="/szolgaltatasok/wordpress-virusirtas-es-biztonsag"
                  >
                    WordPress Biztonság és Karbantartás
                  </Button>
                  <Button variant="secondary" href="/munkak">
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
