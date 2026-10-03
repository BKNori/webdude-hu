import Button from "@/components/atoms/Button";
import { Metadata } from "next";
import PricingTable from "@/components/molecules/PricingTable";
import { buildBreadcrumbSchema, BreadcrumbItem } from "@/lib/breadcrumb";
import DirectAnswerBlock from "@/components/molecules/DirectAnswerBlock";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "WordPress Webshop Készítés – WebDude",
    description:
      "Testreszabott WordPress webshopok, gyors checkout és SEO-optimalizált struktúra WooCommerce alapú e-kereskedelmi megoldásokhoz.",
    keywords:
      "WordPress webshop, WooCommerce fejlesztés, e-kereskedelmi rendszer, webshop készítés, WooCommerce optimalizálás",
    alternates: {
      canonical: "https://webdude.hu/szolgaltatasok/wordpress-webshop-keszites",
    },
    openGraph: {
      title: "WordPress Webshop Készítés – WebDude",
      description:
        "Testreszabott WordPress webshopok, gyors checkout és SEO-optimalizált struktúra WooCommerce alapú e-kereskedelmi megoldásokhoz.",
      url: "https://webdude.hu/szolgaltatasok/wordpress-webshop-keszites",
      type: "website",
      siteName: "WebDude",
      images: [
        {
          url: "/banners/wordpress-weboldalak-keszitese-grafikai-tervezes.webp",
          width: 1920,
          height: 1080,
          alt: "WordPress webshop készítés WebDude",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "WordPress Webshop Készítés – WebDude",
      description:
        "Testreszabott WordPress webshopok, gyors checkout és SEO-optimalizált struktúra WooCommerce alapú e-kereskedelmi megoldásokhoz.",
      images: [
        "/banners/wordpress-weboldalak-keszitese-grafikai-tervezes.webp",
      ],
    },
  };
}

export const revalidate = 3600;

export default async function WebshopPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Főoldal", url: "/" },
    { name: "Szolgáltatások", url: "/szolgaltatasok" },
    {
      name: "WordPress Webshop Készítés",
      url: "/szolgaltatasok/wordpress-webshop-keszites",
    },
  ];

  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://webdude.hu/szolgaltatasok/wordpress-webshop-keszites#service",
    name: "WordPress Webshop Készítés",
    description:
      "Testreszabott WordPress webshopok, gyors checkout és SEO-optimalizált struktúra WooCommerce alapú e-kereskedelmi megoldásokhoz.",
    provider: {
      "@type": "Organization",
      "@id": "https://webdude.hu/#organization",
      name: "WebDude",
      url: "https://webdude.hu",
    },
    category: "E-commerce",
    alternateName: [
      "WordPress webshop készítés",
      "egyedi webshop",
      "WordPress WooCommerce",
      "webshop gyorsítás",
    ],
    audience: {
      "@type": "BusinessAudience",
      name: "Vállalkozások, amelyek WordPress alapú online áruházat szeretnének",
    },
    // A WebDude kizárólag egyedi árajánlatot ad — nincs fix árkatalógus.
    offers: {
      "@type": "Offer",
      priceCurrency: "HUF",
      description: "Egyedi árajánlat kérése — a projekt terjedelmétől függően.",
      availability: "https://schema.org/InStock",
    },
  };

  const faqs = [
    {
      question:
        "Mennyi idő alatt készül el egy WordPress alapú webshop?",
      answer:
        "Egy egyszerűbb, néhány száz termékes WooCommerce áruház 3–4 hét alatt elkészül. Komplexebb, több fizetési és szállítási integrációval, illetve egyedi funkciókkal 4–6 hét, nagyobb, teljesen automatizált e-kereskedelmi rendszer pedig 6–10 hét. A pontos határidőt az egyedi árajánlatban rögzítjük.",
    },
    {
      question: "Miben különbözik a WordPress webshop egy kész sablonos megoldástól?",
      answer:
        "Egy kész sablon tele van olyan pluginekkel és kóddal, amikre a te webshopodnak nincs szüksége. Ezek lassítják az oldalt, növelik a biztonsági kockázatot, és minden WordPress frissítésnél új hibákat okozhatnak. Az általam készített egyedi megoldás kizárólag a te folyamataidhoz szükséges funkciókat tartalmazza, így gyors, stabil és könnyen bővíthető.",
    },
    {
      question:
        "Milyen fizetési és szállítási módokat tudsz integrálni a webshopba?",
      answer:
        "A magyar és nemzetközi fizetési szolgáltatók (bankkártya, banki átvezetés, SimplePay, Stripe, Barion, COD) mellett a hazai logisztikai partnerek — Magyar Posta, MPL, Foxpost, DPD — automatikus csomagkövetését is bekötöm. A rendelés beérkezése után a készlet, a státusz és az értesítés automatikusan szinkronizálódik.",
    },
    {
      question: "Hogyan biztosítod a webshop biztonságát és gyorsaságát?",
      answer:
        "Minden webshopot a fejlesztés elején biztonsági keményítéssel és Core Web Vitals-optimalizálással indítok: nincs felesleges bővítmény, a frissítések automatizáltak, a fizetési adatok tokenizáltak, a teljesítmény pedig 90 feletti Google PageSpeed pontszám céljával kerül kiadásra. Minden projekthez tartozik a projekt átadását követő karbantartási időszak is.",
    },
    {
      question: "Mennyibe kerül egy WordPress webshop elkészítése?",
      answer:
        "Az ár a projekt terjedelmétől függ: a termékek számától, a szükséges integrációktól és az egyedi funkcióktól. WebDude-nál nem fix ársorokkal dolgozunk, hanem minden projektre egyedi árajánlatot készítünk. az ajánlatot ingyenesen kérhetod.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
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
      />
      <div className="min-h-screen pt-40 pb-20 bg-bg-base text-text-primary relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-brand-primary/5 via-transparent to-brand-primary/5" />
        <div className="relative z-10">
          {/* A nyitó szekció címsora H1 — az oldal egyetlen elsődleges
              címsora. A `SectionTitle` atom `h2`-t renderel, ezért itt
              kézzel kell a hero-szintű `h1` (AGENTS.md 5. §: egy oldalon
              pontosan egy `h1`). A `as` prop nincs a komponensben, így
              ez a hero-blokk szándékosan kézi markup. */}
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center">
              <span className="inline-block text-sm font-semibold tracking-[0.2em] uppercase text-brand-primary mb-4">
                Szolgáltatás
              </span>
              <h1 className="text-[clamp(1.5rem,4vw,2.5rem)] sm:text-[clamp(1.875rem,5vw,3rem)] md:text-[clamp(2rem,5.5vw,3.5rem)] lg:text-[clamp(2.25rem,6vw,4rem)] font-extrabold tracking-tight text-text-primary mb-6 leading-tight wrap-break-word">
                WordPress Webshop Készítés
              </h1>
              <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
                Skálázható, konverzió-vezérelt WooCommerce és headless shop
                megoldások gyorsan és megbízhatóan.
              </p>
            </div>
            <div className="mt-12 max-w-3xl mx-auto">
              <p className="text-xl text-slate-400 leading-relaxed mb-8">
                16 éves WordPress tapasztalattal olyan e-kereskedelmi
                rendszereket építek, amelyek nem csak termékeket árulnak, hanem
                ügyfeleket szereznek automatizált folyamattal.
              </p>
              <ul className="space-y-4 mb-8 text-slate-400">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-brand-primary rounded-full" />
                  <span>WooCommerce fejlesztés és optimalizálás</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-brand-primary rounded-full" />
                  <span>Gyors checkout és fizetési integráció</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-brand-primary rounded-full" />
                  <span>SEO és konverzió-optimalizált struktúra</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-brand-primary rounded-full" />
                  <span>Automatizált készletkezelés</span>
                </li>
              </ul>
              <div className="mt-8">
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
                      ctaText: "Alap webshop kérése",
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
                      ctaText: "Komplett webshop kérése",
                      ctaLink: "/kapcsolat",
                    },
                    {
                      id: "enterprise",
                      name: "E-kereskedelmi Rendszer",
                      description:
                        "Komplex e-kereskedelmi rendszer 6-10 hét alatt",
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
                      ctaText: "E-kereskedelmi rendszer kérése",
                      ctaLink: "/kapcsolat",
                    },
                  ]}
                  title="Válassza ki a megfelelő WordPress webshop csomagot"
                  description="Skálázható, konverzió-vezérelt WooCommerce és headless shop megoldások. Kérjen személyre szabott árajánlatot."
                />
              </div>
              <Button variant="primary" href="/kapcsolat">
                Árajánlat kérése
              </Button>
            </div>

            <DirectAnswerBlock
            id="wp-webshop"
            question="Mennyibe kerül egy WordPress webshop elkészítése?"
            answer="Egy WordPress webshop ára a projekt terjedelmétől függ: a termékek számától, a szükséges fizetési és szállítási integrációktól és az egyedi funkcióktól. A WebDude-nál nincs fix ársor, minden webshophoz egyedi árajánlat készül. 16 év tapasztalattal építek WooCommerce alapú, gyors és konverzió-optimalizált online áruházakat."
            facts={[
              { label: "Tapasztalat", value: "16 év" },
              { label: "Átadás", value: "3–10 hét" },
              { label: "Árazás", value: "Egyedi árajánlat" },
            ]}
          />

            {/* GYIK — AEO-barát direkt kérdés-válasz struktúra.
                A látható szöveg emberi és premium; a schema maga a fenti
                FAQPage blokk. A ketto tartalmi egyezese biztositja, hogy az
                AI keresok (Perplexity, ChatGPT) a keresesi valaszukban
                pontosan ezt a tartalmat Cite-aljak. */}
            <section
              className="mt-24 pt-16 border-t border-slate-800/80"
              aria-labelledby="wp-webshop-faq-heading"
            >
              <h2
                id="wp-webshop-faq-heading"
                className="text-3xl lg:text-4xl font-bold text-slate-100 text-center mb-4"
              >
                Gyakori kérdések a WordPress webshopokról
              </h2>
              <p className="text-sm text-slate-400 text-center max-w-2xl mx-auto mb-12">
                A leggyakrabban feltett kérdések az egyedi WordPress
                webshopfejlesztésről — a válaszokat 16 éves tapasztalattal
                adtam.
              </p>
              <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="group bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 hover:border-brand-primary/40 rounded-2xl transition-colors"
                  >
                    <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-2xl">
                      <h3 className="text-xl font-bold text-slate-100">
                        {faq.question}
                      </h3>
                      <span
                        className="flex-shrink-0 w-8 h-8 rounded-full border border-brand-primary/30 flex items-center justify-center text-brand-primary transition-transform duration-300 group-open:rotate-45"
                        aria-hidden="true"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        >
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </span>
                    </summary>
                    <p className="px-6 pb-6 text-sm text-slate-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
