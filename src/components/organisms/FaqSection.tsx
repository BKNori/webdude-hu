import SectionTitle from "@/components/atoms/SectionTitle";
import GeometricIcon from "@/components/atoms/GeometricIcon";

export default function FaqSection() {
  const faqs = [
    {
      q: "Mennyi idő alatt készül el egy oldal?",
      a: "Egy egyszerű bemutatkozó oldal 1–3 hét, egy komplexebb webshop 4–12 hét.",
    },
    {
      q: "Mennyibe kerül egy weboldal vagy webshop?",
      a: "Az árak projekt-specifikusak — a feladat összetettségétől és a funkcionalitások méretétől függően alakulnak. Minden szerződés előtt egy személyre szabott árajánlatot készítek a konkrét igényeid alapján, így mindig tudni fogod, mire számíthatsz. Kérj egyedi árajánlatot!",
    },
    {
      q: "Segít a WebDude a szövegírásban is?",
      a: "Igen — AI-asszisztensünk képes előszűrni és javaslatot tenni SEO-barát szövegekre, emellett profi copywriter partnereink is állnak rendelkezésre.",
    },
    {
      q: "Hogyan működik a havi karbantartás?",
      a: "Automatizált frissítések, napi biztonsági mentések és havi audit jelentés. Opcionális SLA szintű támogatási csomagokat is kínálunk.",
    },
    {
      q: "Milyen garanciát vállaltok?",
      a: "Átadást követően 30 napos hibajavítási garanciát biztosítunk és opcionális havi támogatási csomagokat a hosszú távú stabilitásért.",
    },
    {
      q: "Milyen technológiákat használsz?",
      a: "Next.js 16, React 19, TypeScript, Tailwind CSS v4, Firebase és AI automatizáció. Modern, skálázható és jövőálló technológiák.",
    },
    {
      q: "Van-e referencia munkád?",
      a: "Igen, a /munkak oldalon megtekintheted a legfrissebb projekteket és ügyfélvéleményeket. B2B logisztika, webshopok, arculattervezés.",
    },
    {
      q: "Milyen fizetési módok elfogadottak?",
      a: "Elfogadunk banki átutalást, és Stripe integrációval bankkártyás fizetést is biztosítunk a projekt előlegekhez.",
    },
    {
      q: "Segítesz a domain regisztrációban és hostingban?",
      a: "Igen, segítünk a domain kiválasztásban és regisztrációban, valamint ajánlunk megbízható hosting szolgáltatókat vagy teljes körű üzemeltetést vállalunk.",
    },
    {
      q: "Milyen SEO szolgáltatásokat nyújtasz?",
      a: "Technikai SEO audit, Lighthouse optimalizálás, Schema.org JSON-LD implementáció, kulcsszó kutatás és tartalomstratégia tervezés.",
    },
    {
      q: "Van-e utánkövetés az átadás után?",
      a: "Igen, átadás után is elérhető vagyunk kérdésekre, és opcionális havi karbantartási csomagokat kínálunk a folyamatos fejlesztéshez.",
    },
    {
      q: "Milyen AI technológiákat használsz a webfejlesztésben?",
      a: "OpenAI GPT-4, Groq API, és egyedi LLM integrációkat használunk tartalomgeneráláshoz, automatizációhoz és ügyfélszolgálathoz. AI-asszisztensünk 24/7 elérhető a weboldalakon.",
    },
    {
      q: "Hogyan segíti az AI a lead generálást?",
      a: "AI-vezérelt chatbotok, automatizált űrlapfeldolgozás, személyre szabott ajánlatok és intelligens lead scoring növeli az ügyfélszerzés hatékonyságát akár 300%-kal.",
    },
    {
      q: "Milyen előnyei vannak a Next.js alapú weboldalaknak a SEO szempontjából?",
      a: "Next.js 16 Server Side Rendering (SSR) és Static Site Generation (SSG) biztosítja a gyors betöltést, automatikus képek optimalizálását, és tökéletes Core Web Vitals értékeket a Google rangsoroláshoz.",
    },
    {
      q: "Hogyan működik a ChatGPT és egyéb AI eszközök integrációja?",
      a: "Egyedi API integrációval kötjük össze a weboldalakat az AI eszközökkel, így automatizált tartalomgyártás, ügyfélszolgálat és adatelemzés valósítható meg emberi beavatkozás nélkül.",
    },
    {
      q: "Milyen automatizációs lehetőségeket kínálsz KKV-knak?",
      a: "E-mail marketing automatizáció, social media posztolás, CRM integráció, invoice generálás, és ügyfélszolgálati chatbot - mind AI-vezérelt, hogy időt és pénzt takaríts meg.",
    },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24" aria-labelledby="faq-title">
      <div className="px-6 max-w-4xl mx-auto">
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-center gap-2">
            <GeometricIcon
              type="hexagon"
              size={24}
              color="text-[#00B5F1]"
              aria-hidden="true"
            />
            <span className="text-xs font-mono font-black uppercase tracking-widest text-[#00B5F1]">
              GYIK
            </span>
          </div>
          <SectionTitle
            title="Gyakori kérdések a közös munkáról"
            description="Válaszok a leggyakoribb kérdésekre, hogy gyorsabban dönthess."
          />
        </div>

        <div
          className="mt-8 space-y-4"
          role="region"
          aria-label="Gyakran Ismételt Kérdések"
        >
          {faqs.map((f) => (
            <details
              key={f.q}
              className="bg-bg-surface/90 backdrop-blur-md border border-slate-700/80 rounded-xl overflow-hidden group hover:border-[#00B5F1]/40 transition-colors"
            >
              <summary className="w-full p-4 text-left cursor-pointer font-semibold text-text-primary hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#00B5F1] transition-colors list-none">
                <div className="flex items-center justify-between">
                  <span>{f.q}</span>
                  <span
                    aria-hidden="true"
                    className="text-[#00B5F1] text-xl group-open:rotate-180 transition-transform duration-200"
                  >
                    +
                  </span>
                </div>
              </summary>
              <div className="p-4 text-slate-400 border-t border-slate-700/60 leading-relaxed">
                {f.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
