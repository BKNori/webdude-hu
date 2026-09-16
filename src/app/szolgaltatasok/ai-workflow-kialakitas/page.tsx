import Hero from "@/components/Hero";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import { Metadata } from "next";
import PricingTable from "@/components/molecules/PricingTable";
import { buildBreadcrumbSchema, BreadcrumbItem } from "@/lib/breadcrumb";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "AI Workflow Automatizálás és Kialakítás | WebDude",
    description:
      "AI-powered workflow automatizálás vállalkozások számára: ChatGPT, Claude, és egyedi AI eszközök integrációja, konfigurációja és testreszabása a hatékonyság növeléséhez.",
    keywords:
      "AI workflow automatizálás, ChatGPT integráció, Claude API, AI konfiguráció, munkafolyamat automatizálás, ChatGPT támogatás",
    alternates: {
      canonical: "https://webdude.hu/szolgaltatasok/ai-workflow-kialakitas",
    },
    openGraph: {
      title: "AI Workflow Automatizálás és Kialakítás | WebDude",
      description:
        "AI-powered workflow automatizálás vállalkozások számára: ChatGPT, Claude, és egyedi AI eszközök integrációja, konfigurációja és testreszabása a hatékonyság növeléséhez.",
      type: "website",
    },
  };
}

const FAQ = [
  {
    q: "Mennyi idő egy AI workflow bevezetése?",
    a: "Egyszerű workflow-konfiguráció 1-2 hét, komplex rendszerintegráció 4-8 hét attól függően, hogy hány rendszert kell összekötni.",
  },
  {
    q: "Milyen AI eszközöket használtok?",
    a: "ChatGPT (GPT-4), Claude (Anthropic), egyedi API integrációk, és iparágspecifikus AI eszközök a workflow optimalizáláshoz.",
  },
  {
    q: "Biztonságos az AI eszközök használata?",
    a: "Igen, minden integrációt titkosított kapcsolatokon keresztül végezek, és szigorú adatvédelmi protokollokat alkalmazok. Sensitív adatok nem kerülnek külső AI rendszerekbe engedély nélkül.",
  },
  {
    q: "Mennyibe kerül egy AI workflow projekt?",
    a: "Egyedi árajánlat kérése a projekt igényei szerint. Ingyenes konzultáció a pontos árhoz.",
  },
  {
    q: "Mire kell figyelni az árajánlatkérésnél?",
    a: "Minél pontosabb specifikációt adsz meg a vállalati folyamatok automatizálásához, annál pontosabb árajánlatot tudok adni. Ha nincs AI workflow specifikációd, akkor konzultációra van szükség, ami időigényes. A konzultáció során feltérzem az üzleti igényeket, folyamatokat, és kalkulálom a szükséges munkaórákat. Ez a folyamat biztosítja, hogy a végső ár reális és a projekt sikeres legyen.",
  },
];

export const revalidate = 3600;

export default async function AiWorkflowPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Főoldal", url: "/" },
    { name: "Szolgáltatások", url: "/szolgaltatasok" },
    {
      name: "AI Workflow Automatizálás",
      url: "/szolgaltatasok/ai-workflow-kialakitas",
    },
  ];

  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Workflow Automatizálás",
    description:
      "AI-powered workflow automatizálás vállalkozások számára: ChatGPT, Claude, és egyedi AI eszközök integrációja, konfigurációja és testreszabása a hatékonyság növeléséhez.",
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
      <main className="min-h-screen bg-bg-base text-text-primary relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-[#00B5F1]/5 via-transparent to-[#00B5F1]/5" />
        <div className="relative z-10">
          <Hero
            label="Szolgáltatás"
            title="AI Workflow Automatizálás"
            subtitle="AI-powered workflow rendszer kialakítás és automatizálás vállalkozások számára: ChatGPT, Claude, és egyedi AI eszközök integrációja a hatékonyság maximalizálásához."
            cta1="Kérj ingyenes konzultációt"
            cta1Link="/kapcsolat"
            cta2="Portfólió megtekintése"
            cta2Link="/munkak"
            fullHeight={true}
          />

          <div className="max-w-6xl mx-auto px-6">
            <div className="mt-12 grid gap-12 md:grid-cols-2 items-start max-w-4xl mx-auto">
              <div className="space-y-6">
                <Badge>AI Automatizálás</Badge>
                <p className="text-xl text-slate-300 leading-relaxed">
                  Nem csak AI eszközöket telepítek — teljes workflow
                  rendszereket építek, amelyek automatizálják a megismétlődő
                  feladatokat, optimalizálják a döntéshozatalt, és 40-70%
                  időmegtakarítást eredményeznek a vállalkozás működésében.
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
                    AI Workflow Architektúra
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
                      ChatGPT Konfiguráció
                    </h3>
                    <p className="text-slate-400">
                      Custom GPT-k, API integrációk, prompt engineering és
                      vállalati rendszer összekapcsolás
                    </p>
                  </div>
                  <div className="bg-transparent border border-slate-700/60 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-[#00B5F1] mb-3">
                      Claude Integráció
                    </h3>
                    <p className="text-slate-400">
                      Anthropic Claude API integráció, dokumentáció-elemzés és
                      tartalomgenerálás automatizálása
                    </p>
                  </div>
                  <div className="bg-transparent border border-slate-700/60 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-[#00B5F1] mb-3">
                      Egyedi AI Pipeline
                    </h3>
                    <p className="text-slate-400">
                      Testreszabott AI workflow-ok automatikus
                      adatfeldolgozásra, elemzésre és döntéshozatalra
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
                      name: "Alap Workflow",
                      description:
                        "Egyszerű AI workflow automatizálás 1-2 hét alatt (specifikáció kialakítással)",
                      features: [
                        "Specifikáció kialakítás és konzultáció",
                        "ChatGPT konfiguráció",
                        "Egyedi prompt template-ek",
                        "API integráció",
                        "Dokumentáció",
                        "1 hónap support",
                      ],
                      ctaText: "Egyedi árajánlat kérése",
                      ctaLink: "/kapcsolat",
                    },
                    {
                      id: "professional",
                      name: "Komplex Rendszer",
                      description:
                        "Komplex AI workflow rendszer 2-4 hét alatt (specifikáció kialakítással)",
                      features: [
                        "Specifikáció kialakítás és konzultáció",
                        "ChatGPT és Claude integráció",
                        "Több workflow automatizálás",
                        "API integrációk",
                        "Csapat training",
                        "3 hónap support",
                      ],
                      highlighted: true,
                      ctaText: "Egyedi árajánlat kérése",
                      ctaLink: "/kapcsolat",
                    },
                    {
                      id: "enterprise",
                      name: "Vállalati AI Infrastruktúra",
                      description:
                        "Teljes vállalati AI rendszer 4-8 hét alatt (specifikáció kialakítással)",
                      features: [
                        "Specifikáció kialakítás és konzultáció",
                        "Komplex rendszerintegráció",
                        "Egyedi AI pipeline-ek",
                        "Adatvédelmi és biztonsági audit",
                        "Dedikált support",
                        "6 hónap karbantartás",
                      ],
                      ctaText: "Egyedi árajánlat kérése",
                      ctaLink: "/kapcsolat",
                    },
                  ]}
                  title="Válassza ki a megfelelő AI workflow csomagot"
                  description="Minden csomag tartalmazza a konzultációt, specifikáció kialakítást, konfigurációt, integrációt és support-ot. Kérjen személyre szabott árajánlatot."
                />
              </div>
            </section>

            {/* Benefits Section */}
            <section className="mt-24 max-w-4xl mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#00B5F1]/5 to-transparent" />
              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-text-primary mb-8">
                  Miért AI Workflow?
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-8 h-8 bg-[#00B5F1] rounded-full flex items-center justify-center text-bg-base font-bold">
                      ✓
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">
                        40-70% időmegtakarítás
                      </h3>
                      <p className="text-slate-400">
                        Megismétlődő feladatok automatizálása: dokumentáció,
                        email kezelés, adatbevitel, döntéshozatal
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-8 h-8 bg-[#00B5F1] rounded-full flex items-center justify-center text-bg-base font-bold">
                      ✓
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">
                        Skálázható és eredményorientált
                      </h3>
                      <p className="text-slate-400">
                        A workflow-k automatikusan skálázódnak a növekvő
                        igényekkel, megbízható és konzisztens eredményekkel
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-8 h-8 bg-[#00B5F1] rounded-full flex items-center justify-center text-bg-base font-bold">
                      ✓
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">
                        Költséghatékony integráció
                      </h3>
                      <p className="text-slate-400">
                        A meglévő rendszerekkel való zökkenőmentes
                        összekapcsolás minimális zavarással és gyors ROI-val
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-8 h-8 bg-[#00B5F1] rounded-full flex items-center justify-center text-bg-base font-bold">
                      ✓
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">
                        Adatvédelem és biztonság
                      </h3>
                      <p className="text-slate-400">
                        Titkosított kapcsolatok, szigorú access control és
                        GDPR-kompatibilis folyamatok
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-8 h-8 bg-[#00B5F1] rounded-full flex items-center justify-center text-bg-base font-bold">
                      ✓
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">
                        Folyamatos optimalizálás
                      </h3>
                      <p className="text-slate-400">
                        Figyelő és adaptív AI rendszerek, amelyek tanulnak és
                        optimalizálódnak a használat során
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Use Cases Section */}
            <section className="mt-24 max-w-4xl mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#00B5F1]/5 to-transparent" />
              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-text-primary mb-8">
                  Felhasználási esetek
                </h2>
                <div className="space-y-6">
                  <div className="bg-transparent border border-slate-700/60 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-[#00B5F1] mb-2">
                      Dokumentáció és Tartalom
                    </h3>
                    <p className="text-slate-400">
                      Automatikus dokumentációgenerálás, blog bejegyzések, email
                      sablonok és marketing szövegek AI-val
                    </p>
                  </div>
                  <div className="bg-transparent border border-slate-700/60 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-[#00B5F1] mb-2">
                      Ügyfélszolgálat és Kommunikáció
                    </h3>
                    <p className="text-slate-400">
                      AI-powered chatbot-k, automatikus válaszgenerálás, ticket
                      prioritizálás és ügyfél-kommunikáció
                    </p>
                  </div>
                  <div className="bg-transparent border border-slate-700/60 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-[#00B5F1] mb-2">
                      Adatfeldolgozás és Elemzés
                    </h3>
                    <p className="text-slate-400">
                      Automatikus adatbevitel, mintázatfelismerés,
                      riportgenerálás és döntéshozatali támogatás
                    </p>
                  </div>
                  <div className="bg-transparent border border-slate-700/60 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-[#00B5F1] mb-2">
                      Projektmenedzsment és Koordináció
                    </h3>
                    <p className="text-slate-400">
                      Feladatok automatikus hozzárendelése, haladás-követés és
                      erőforrás-optimalizálás AI-val
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
                      1. Követelményelemzés és Design
                    </h3>
                    <p className="text-slate-400">
                      Vállalati folyamatok átvizsgálása, automatizálási
                      lehetőségek azonosítása és workflow design tervezés
                    </p>
                  </div>
                  <div className="bg-transparent border border-slate-700/60 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-[#00B5F1] mb-2">
                      2. Konfiguráció és Integráció
                    </h3>
                    <p className="text-slate-400">
                      AI eszközök konfigurálása (ChatGPT, Claude), API
                      integrációk és meglévő rendszerek összekapcsolása
                    </p>
                  </div>
                  <div className="bg-transparent border border-slate-700/60 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-[#00B5F1] mb-2">
                      3. Tesztelés és Deploy
                    </h3>
                    <p className="text-slate-400">
                      Comprehensive tesztelés, felhasználói training és éles
                      rendszer bevezetés ütemezett launch-sal
                    </p>
                  </div>
                  <div className="bg-transparent border border-slate-700/60 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-[#00B5F1] mb-2">
                      4. Monitoring és Optimalizálás
                    </h3>
                    <p className="text-slate-400">
                      Folyamatos performance monitoring, finomhangolás és
                      skálázás az eredmények alapján
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
                  Kész automatizálni a vállalati folyamatokat?
                </h2>
                <p className="text-lg text-slate-400 mb-8">
                  Ingyenes konzultáció és személyre szabott AI workflow tervezés
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
                    href="/szolgaltatasok/ai-kep-es-videogeneralas"
                  >
                    AI Kép és Videógenerálás
                  </Button>
                  <Button
                    variant="secondary"
                    href="/szolgaltatasok/wordpress-webshop-keszites"
                  >
                    WordPress Webshop Készítés
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
