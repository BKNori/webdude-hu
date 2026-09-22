import Hero from "@/components/Hero";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import { Metadata } from "next";
import BentoCard from "@/components/molecules/BentoCard";
import AnimatedSystemFlow from "@/components/molecules/AnimatedSystemFlow";
import CaseStudyCard from "@/components/molecules/CaseStudyCard";
import AiChatMockup from "@/components/molecules/AiChatMockup";
import PricingTable from "@/components/molecules/PricingTable";
import { buildBreadcrumbSchema, BreadcrumbItem } from "@/lib/breadcrumb";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "AI Prompt Engineering | WebDude",
    description:
      "AI prompt engineering szolgáltatás: ChatGPT és Claude promptok fejlesztése, optimalizálása és tesztelése. Megbízható AI rendszerek egyedi igényekre.",
    keywords:
      "AI prompt engineering, ChatGPT prompt, Claude prompt, prompt fejlesztés, AI konfiguráció, ChatGPT optimalizálás, prompt szakértő",
    alternates: {
      canonical: "https://webdude.hu/szolgaltatasok/ai-prompt-engineering",
    },
  };
}

const FAQ = [
  {
    q: "Mi az a prompt engineering?",
    a: "Prompt engineering az AI modellekkel való kommunikáció tudománya — a megfelelő utasítások megírása, hogy az AI megbízható és konzisztens eredményeket adjon vissza.",
  },
  {
    q: "Milyen AI modellekkel dolgozom?",
    a: "ChatGPT (GPT-4), Claude (Anthropic), és egyéb modern AI modellekkel. Az ügyfél igénye szerint választom ki a legmegfelelőbbet.",
  },
  {
    q: "Mennyi idő egy prompt rendszer kiépítése?",
    a: "Egyszerű prompt template-ek 1-2 nap, komplex prompt rendszerek 1-2 hét attól függően, hogy mennyi tesztelés és optimalizálás szükséges.",
  },
  {
    q: "Mennyibe kerül a prompt engineering?",
    a: "Egyedi árajánlat kérése a projekt igényei szerint. Ingyenes konzultáció a pontos árhoz.",
  },
  {
    q: "Mire kell figyelni az árajánlatkérésnél?",
    a: "Minél pontosabb specifikációt adsz meg az AI eszközök használatához, annál pontosabb árajánlatot tudok adni. Ha nincs AI specifikációd, akkor konzultációra van szükség, ami időigényes. A konzultáció során feltérzem az üzleti igényeket, AI eszköz preferenciákat, és kalkulálom a szükséges munkaórákat. Ez a folyamat biztosítja, hogy a végső ár reális és a projekt sikeres legyen.",
  },
];

export const revalidate = 3600;

export default async function AiPromptEngineeringPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Főoldal", url: "/" },
    { name: "Szolgáltatások", url: "/szolgaltatasok" },
    {
      name: "AI Prompt Engineering",
      url: "/szolgaltatasok/ai-prompt-engineering",
    },
  ];

  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Prompt Engineering",
    url: "https://webdude.hu/szolgaltatasok/ai-prompt-engineering",
    description:
      "AI prompt engineering szolgáltatás: ChatGPT és Claude promptok fejlesztése, optimalizálása és tesztelése. Megbízható AI rendszerek egyedi igényekre.",
    provider: {
      "@type": "Organization",
      "@id": "https://webdude.hu/#organization",
      name: "WebDude",
      url: "https://webdude.hu",
    },
    areaServed: { "@type": "Country", name: "Hungary" },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />      <div className="min-h-screen bg-transparent text-text-primary relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-[#00B5F1]/5 via-transparent to-[#00B5F1]/5" />
        <div className="relative z-10">
          <Hero
            label="Szolgáltatás"
            title="AI Prompt Engineering"
            subtitle="Professzionális AI prompt engineering szolgáltatás: ChatGPT, Claude és egyedi AI modellek prompt fejlesztése, optimalizálása és konfigurációja a maximális hatékonyság és megbízhatóság érdekében."
            cta1="Kérj ingyenes konzultációt"
            cta1Link="/kapcsolat"
            cta2="Portfólió megtekintése"
            cta2Link="/munkak"
            fullHeight={true}
          />

          <div className="max-w-6xl mx-auto px-6">
            <div className="mt-12 grid gap-12 md:grid-cols-2 items-start max-w-4xl mx-auto">
              <div className="space-y-6">
                <Badge>AI Prompts</Badge>
                <p className="text-xl text-slate-300 leading-relaxed">
                  Nem csak promptokat írok — teljes prompt rendszereket építek,
                  amelyek biztosítják, hogy az AI megbízható, konzisztens és
                  üzleti értékkel bíró eredményeket adjon vissza, minimalizálva
                  a hallucinációt és maximalizálva a hatékonyságot.
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

              <AiChatMockup />
            </div>

            {/* Services Section */}
            <section className="mt-24 max-w-6xl mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#00B5F1]/5 to-transparent" />
              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-text-primary mb-8">
                  Szolgáltatások
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <BentoCard
                    title="ChatGPT Promptok"
                    description="GPT-4 optimalizált promptok, Custom GPT-k és vállalati prompt template-ek fejlesztése"
                    metric="GPT-4"
                    highlight="Custom GPT"
                  />
                  <BentoCard
                    title="Claude Promptok"
                    description="Anthropic Claude prompt fejlesztés, dokumentáció-elemzés és tartalomgenerálás optimalizálása"
                    metric="Claude"
                    highlight="Dokumentáció fókusz"
                  />
                  <BentoCard
                    title="Prompt Rendszerek"
                    description="Komplex prompt architektúrák, láncolt promptok és kontextus-kezelő rendszerek"
                    metric="Láncolt"
                    highlight="Komplex rendszerek"
                  />
                  <BentoCard
                    title="Prompt Tesztelés"
                    description="A/B tesztelés, mérés és optimalizálás a legjobb prompt teljesítmény érdekében"
                    metric="A/B"
                    highlight="Optimalizálás"
                  />
                  <BentoCard
                    title="Prompt Dokumentáció"
                    description="Prompt library-k, dokumentáció és training anyagok a csapat számára"
                    metric="Library"
                    highlight="Team training"
                  />
                  <BentoCard
                    title="AI Tanácsadás"
                    description="Stratégiai konzultáció az AI bevezetéshez és prompt folyamatokhoz"
                    metric="Strategy"
                    highlight="Konzultáció"
                  />
                </div>
              </div>
            </section>

            {/* Process Section */}
            <section className="mt-24 max-w-6xl mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#00B5F1]/5 to-transparent" />
              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-text-primary mb-8">
                  Prompt Fejlesztési Folyamat
                </h2>
                <AnimatedSystemFlow
                  steps={[
                    { id: 1, title: "Elemzés", label: "Követelmények & Célok" },
                    {
                      id: 2,
                      title: "Template",
                      label: "Prompt minták tervezése",
                    },
                    {
                      id: 3,
                      title: "Tesztelés",
                      label: "Iteráció & Optimalizálás",
                    },
                    {
                      id: 4,
                      title: "Rendszer",
                      label: "Dokumentáció & Deploy",
                    },
                  ]}
                />
              </div>
            </section>

            {/* Case Studies Section */}
            <section className="mt-24 max-w-6xl mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#00B5F1]/5 to-transparent" />
              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-text-primary mb-8">
                  Esettanulmányok
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <CaseStudyCard
                    title="Marketing Content"
                    client="E-commerce Brand"
                    description="Prompt rendszer fejlesztése marketing szövegek és social media tartalom generálásához"
                    metrics={[
                      { label: "Megbízhatóság", value: "+90%" },
                      { label: "Időmegtakarítás", value: "-70%" },
                    ]}
                  />
                  <CaseStudyCard
                    title="Ügyfélszolgálat AI"
                    client="SaaS Platform"
                    description="AI chatbot promptok fejlesztése ügyfél-kommunikációhoz és problémamegoldáshoz"
                    metrics={[
                      { label: "Válaszidő", value: "-80%" },
                      { label: "Elégedettség", value: "+65%" },
                    ]}
                  />
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
                <div className="grid md:grid-cols-2 gap-6">
                  <BentoCard
                    title="Tartalomgyártás"
                    description="Blog bejegyzések, marketing szövegek, social media posztok és weboldal tartalom generálása megbízható promptokkal"
                    metric="Content"
                    highlight="SEO-optimalizált"
                  />
                  <BentoCard
                    title="Ügyfélszolgálat"
                    description="AI chatbot promptok, válaszgenerálás és ügyfél-kommunikáció optimalizálása"
                    metric="Support"
                    highlight="24/7 elérhető"
                  />
                  <BentoCard
                    title="Kódolás és Fejlesztés"
                    description="Code generation, code review, documentation és debugging promptok a fejlesztők számára"
                    metric="Dev"
                    highlight="Code review"
                  />
                  <BentoCard
                    title="Adatfeldolgozás"
                    description="Adatelemzés, report generálás és adat-transzformáció promptok automatizált feldolgozáshoz"
                    metric="Data"
                    highlight="Automatizált"
                  />
                  <BentoCard
                    title="Kreatív Munka"
                    description="Képalkotás promptok, design asszisztencia és kreatív koncept fejlesztés AI-val"
                    metric="Creative"
                    highlight="AI design"
                  />
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
                      name: "Alap Prompt Fejlesztés",
                      description:
                        "Egyszerű prompt template-ek 1-2 nap alatt (specifikáció kialakítással)",
                      features: [
                        "Specifikáció kialakítás és konzultáció",
                        "ChatGPT és Claude promptok",
                        "3-5 prompt template",
                        "Dokumentáció és használati útmutató",
                        "1 korrekciós kör",
                        "Email support",
                      ],
                      ctaText: "Egyedi árajánlat kérése",
                      ctaLink: "/kapcsolat",
                    },
                    {
                      id: "professional",
                      name: "Prompt Rendszer",
                      description:
                        "Komplex prompt architektúra 3-5 nap alatt (specifikáció kialakítással)",
                      features: [
                        "Specifikáció kialakítás és konzultáció",
                        "Láncolt prompt rendszerek",
                        "Kontextus-kezelő megoldások",
                        "10-15 prompt template",
                        "A/B tesztelés és optimalizálás",
                        "Prompt library dokumentáció",
                        "2 korrekciós kör",
                        "Prioritás support",
                      ],
                      highlighted: true,
                      ctaText: "Egyedi árajánlat kérése",
                      ctaLink: "/kapcsolat",
                    },
                    {
                      id: "enterprise",
                      name: "Vállalati Prompt Infrastruktúra",
                      description:
                        "Teljes prompt rendszer 1-2 hét alatt (specifikáció kialakítással)",
                      features: [
                        "Specifikáció kialakítás és konzultáció",
                        "Komplex prompt architektúra",
                        "Custom GPT és Claude Projects",
                        "Prompt library és training anyagok",
                        "Csapat training és workshop",
                        "Folyamatos optimalizálás",
                        "Dedikált support",
                        "3 hónap karbantartás",
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

            {/* Benefits Section */}
            <section className="mt-24 max-w-4xl mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#00B5F1]/5 to-transparent" />
              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-text-primary mb-8">
                  Miért Prompt Engineering?
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-8 h-8 bg-[#00B5F1] rounded-full flex items-center justify-center text-bg-base font-bold">
                      ✓
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">
                        70-90% megbízhatóság növekedés
                      </h3>
                      <p className="text-slate-400">
                        Professzionális promptokkal az AI eredményei sokkal
                        konzisztensebbek és megbízhatóbbak
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-8 h-8 bg-[#00B5F1] rounded-full flex items-center justify-center text-bg-base font-bold">
                      ✓
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">
                        Hallucináció minimalizálása
                      </h3>
                      <p className="text-slate-400">
                        Strukturált promptokkal jelentősen csökkenthető az AI
                        téves információk generálása
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-8 h-8 bg-[#00B5F1] rounded-full flex items-center justify-center text-bg-base font-bold">
                      ✓
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">
                        Időmegtakarítás
                      </h3>
                      <p className="text-slate-400">
                        Jól megírt promptokkal 40-60% kevesebb idő töltődik a
                        prompt javítgatással és újrapróbálkozással
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-8 h-8 bg-[#00B5F1] rounded-full flex items-center justify-center text-bg-base font-bold">
                      ✓
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">
                        Üzleti érték
                      </h3>
                      <p className="text-slate-400">
                        Professzionális promptok konkrét üzleti céloknak
                        optimalizálva, nem általános megoldások
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-8 h-8 bg-[#00B5F1] rounded-full flex items-center justify-center text-bg-base font-bold">
                      ✓
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">
                        Skálázhatóság
                      </h3>
                      <p className="text-slate-400">
                        Prompt template-ek és rendszerek, amelyek egyszerűen
                        skálázhatók a csapat és a volumen növekedésével
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="mt-24 max-w-4xl mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#00B5F1]/5 to-transparent" />
              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-text-primary mb-8">
                  Gyakori kérdések
                </h2>
                <div className="space-y-6">
                  {FAQ.map((item, i) => (
                    <div
                      key={i}
                      className="bg-transparent border border-slate-700/60 p-6 rounded-lg"
                    >
                      <h3 className="text-lg font-semibold text-[#00B5F1] mb-2">
                        {item.q}
                      </h3>
                      <p className="text-slate-400">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="mt-24 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#00B5F1]/5 to-transparent" />
              <div className="relative z-10">
                <div className="bg-transparent border border-slate-700/60 p-16 rounded-2xl">
                  <h2 className="text-5xl font-bold text-text-primary mb-6">
                    Készen állsz az AI optimalizálásra?
                  </h2>
                  <p className="text-xl text-slate-400 mb-8">
                    Kérj ingyenes konzultációt, és együtt találjuk meg a
                    legmegfelelőbb prompt megoldásokat a te üzleti
                    folyamataidhoz.
                  </p>
                  <Button variant="primary" href="/kapcsolat">
                    Kérj ingyenes konzultációt
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
