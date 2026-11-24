import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";
import DirectAnswerBlock from "@/components/molecules/DirectAnswerBlock";
import HeroBackdrop from "@/components/molecules/HeroBackdrop";
import ProductFaqSection from "@/components/molecules/ProductFaqSection";
import ProductsCatalogClient from "@/components/organisms/ProductsCatalogClient";
import {
  CATALOG_PRODUCTS,
  PRODUCT_CATEGORIES,
} from "@/data/products-catalog";
import { buildBreadcrumbSchema } from "@/lib/breadcrumb";

const BASE_URL = "https://webdude.hu";

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${BASE_URL}/termekek#itemlist`,
  name: "WebDude Prémium AI Megoldások és AI Műhely Katalógus",
  description:
    "Vállalati AI munkafolyamatok, SEO/AEO audit rendszerek, CRO csomagok és jogosultsághoz kötött AI Műhely generátorok magyar vállalkozásoknak.",
  numberOfItems: CATALOG_PRODUCTS.length,
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  itemListElement: CATALOG_PRODUCTS.map((product, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `${BASE_URL}${product.href}`,
    name: product.name,
    description: product.description,
  })),
} as const;

const collectionPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${BASE_URL}/termekek#collection`,
  name: "Prémium AI Eszközök, Műhelyek & Automatizáció",
  description:
    "Prémium AI munkafolyamatok, automatizációs eszközök, CRO megoldások és AI műhely modulok KKV-knak. Egyedi árajánlat kérése a projekted igényei szerint.",
  url: `${BASE_URL}/termekek`,
  inLanguage: "hu-HU",
  mainEntity: {
    "@id": `${BASE_URL}/termekek#itemlist`,
  },
  publisher: {
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "WebDude",
    url: BASE_URL,
    foundingDate: "2009",
    telephone: "+36 70 323 8003",
    email: "hello@webdude.hu",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kecskemét",
      addressRegion: "Bács-Kiskun",
      postalCode: "6000",
      addressCountry: "HU",
    },
    founder: {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "Balog Norbert",
      alternateName: ["Balog Norbi", "WebDude"],
      jobTitle:
        "Full-Stack Webfejlesztő, Art Director & AI Automatizációs Szakértő",
      description: "26 év tervezőgrafikai és 16 év webfejlesztői tapasztalat",
    },
  },
  about: {
    "@type": "Thing",
    name: "Vállalati AI Automatizáció, SEO/AEO és Kreatív AI Műhelyek",
  },
} as const;

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Főoldal", url: "/" },
  { name: "Termékek", url: "/termekek" },
]);

const faqs = [
  {
    question: "Milyen termékeket és AI modulokat találok a WebDude katalógusban?",
    answer:
      "A katalógus 14 dedikált megoldást foglal magában: kulcsrakész vállalati AI munkafolyamatokat, magyar nyelvű AI chatbotot, SEO & AEO Audit Pro diagnosztikát, CRO konverziós csomagot, valamint 9 specializált AI Műhely generátort arculat-, banner-, tartalom-, UI/UX- és versenytárs-elemzési feladatokra.",
  },
  {
    question: "Hogyan működik a hozzáférés a WebDude AI Műhely generátorokhoz?",
    answer:
      "Minden termékoldal leírása nyilvánosan elérhető, az interaktív AI generátorok viszont zárt prémium modulok: bejelentkezés után kizárólag a fiókodhoz engedélyezett eszközöket indíthatod el az ügyfélportálon.",
  },
  {
    question: "Hogyan kérhetek árajánlatot vagy portál-hozzáférést?",
    answer:
      "Nincs sablonos dobozos árazás: minden rendszert és modul-hozzáférést a vállalkozásod folyamataihoz szabok. A kapcsolat oldalon kérhetsz egyedi árajánlatot, amelyre 24 órán belül személyesen válaszolok.",
  },
] as const;

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] text-[#0F172A] dark:text-[#F8FAFC]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />

      {/* Hero Section (egyetlen H1) */}
      <section className="relative py-24 overflow-hidden bg-[#F8FAFC] dark:bg-bg-surface">
        <HeroBackdrop
          src="/assets/banners/hero-termekek.webp"
          alt="Prémium AI Eszközök, Műhelyek és Automatizációs Megoldások"
        />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0369A1]/10 dark:bg-[#00B5F1]/10 border border-[#0369A1]/25 dark:border-[#00B5F1]/20">
              <ShoppingBag
                className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]"
                aria-hidden="true"
              />
              <span className="text-xs font-bold text-[#0369A1] dark:text-[#00B5F1] uppercase tracking-[0.2em]">
                AI & Automatizáció
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl text-[#0F172A] dark:text-text-primary tracking-tight">
              Prémium AI &{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0369A1] to-[#6D28D9] dark:from-[#00B5F1] dark:to-[#A78BFA]">
                Automatizációs Megoldások
              </span>
            </h1>
            <p className="text-lg text-[#334155] dark:text-slate-300 max-w-2xl mx-auto tracking-wide font-medium">
              Országosan elérhető, azonnal integrálható vállalati AI
              munkafolyamatok, technikai SEO/AEO rendszerek és prémium AI Műhely
              modulok — egyedi árajánlat alapján.
            </p>
          </div>
        </div>
      </section>

      {/* AEO / GEO Direct Answer blokk — pontosan 48 szavas, tényalapú válasz */}
      <DirectAnswerBlock
        id="termekek-direct-answer"
        question="Milyen prémium AI és automatizációs megoldásokat kínál a WebDude vállalkozásoknak?"
        answer="A WebDude tizennégy dedikált digitális terméket és zárt AI Műhely modult kínál magyar KKV-knak: vállalati workflow-automatizációt, saját tudásbázisú chatbotot, technikai SEO és AEO auditot, konverzió-optimalizálást, valamint arculat-, banner-, tartalom- és UI/UX-tervező generátorokat. Minden megoldás huszonhat év tervezőgrafikai és tizenhat év webfejlesztői tapasztalatra épül, online, egyedi árajánlat alapján."
      />

      {/* Kategóriaszűrő (H2) és 14 termékkártya (H3 -> /termekek/<slug>) */}
      <ProductsCatalogClient
        products={CATALOG_PRODUCTS}
        categories={PRODUCT_CATEGORIES}
      />

      {/* AEO GYIK + FAQPage JSON-LD */}
      <ProductFaqSection id="termekek-faq" faqs={faqs} />

      {/* Záró CTA */}
      <section className="py-16 border-t border-slate-200 dark:border-slate-800 bg-[#F1F5F9] dark:bg-bg-surface">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl text-[#0F172A] dark:text-text-primary mb-4">
            Keresel egyedi megoldást?
          </h2>
          <p className="text-[#334155] dark:text-slate-300 mb-8">
            Egyedi AI workflow vagy saját vállalati eszköz fejlesztésére van
            szükséged? Lépj velem kapcsolatba, és megtalálom a vállalkozásodhoz
            illő megoldást!
          </p>
          <Link
            href="/kapcsolat"
            className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369A1] hover:to-[#6D28D9] text-white font-bold rounded-full uppercase tracking-wider text-sm hover:shadow-[0_8px_24px_rgba(3,105,161,0.3)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            Egyedi árajánlat kérése
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
