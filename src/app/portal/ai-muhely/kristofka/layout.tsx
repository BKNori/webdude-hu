import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Kristófka Workflow: AI-alapú Stratégiai Tervezés Vállalkozásoknak | WebDude",
  description:
    "Maximalizáld üzleti hatékonyságodat a Kristófka Workflow-val. Személyre szabott AI-vezérelt stratégia, döntéstámogatás és automatizált munkafolyamatok a WebDude szakértelmével.",
  alternates: {
    canonical: "https://webdude.hu/portal/ai-muhely/kristofka",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
  },
  openGraph: {
    title:
      "Kristófka Workflow: AI-alapú Stratégiai Tervezés Vállalkozásoknak | WebDude",
    description:
      "Maximalizáld üzleti hatékonyságodat a Kristófka Workflow-val. Személyre szabott AI-vezérelt stratégia, döntéstámogatás és automatizált munkafolyamatok a WebDude szakértelmével.",
    url: "https://webdude.hu/portal/ai-muhely/kristofka",
    siteName: "WebDude",
    locale: "hu_HU",
    type: "website",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Milyen típusú cégeknek ajánlott a Kristófka Workflow?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Közép- és nagyvállalatoknak, akik automatizálni szeretnék döntéshozatali folyamataikat.",
      },
    },
    {
      "@type": "Question",
      name: "Hogyan integrálható a meglévő folyamatokba?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A workflow közvetlen támogatást nyújt a WebDude portálon keresztül, API-alapú vagy manuális konzultációs formában.",
      },
    },
    {
      "@type": "Question",
      name: "Biztonságos az üzleti adatok kezelése?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Igen, a WebDude szigorú adatvédelmi protokolljait követve, titkosított csatornákon keresztül.",
      },
    },
  ],
};

const workflowJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Kristófka Workflow",
  description:
    "AI-alapú ingatlanbefektetői pitch generálás PDF alaprajzokból és kontextus paraméterekből. A WebDude 26 éves szakmai tapasztalatát ötvözi a legmodernebb mesterséges intelligenciával.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "HUF",
  },
  provider: {
    "@type": "Organization",
    name: "WebDude.hu",
    url: "https://webdude.hu",
    description:
      "Prémium webfejlesztési és AI automatizációs ügynökség Kecskeméten.",
  },
  featureList: [
    "PDF alaprajz feltöltés és elemzés",
    "Célcsoport alapú pitch generálás (Venture Capital, Magánbefektető, Banki hitelbíráló, Városi városfejlesztési pályázat)",
    "Narratíva adaptáció (Indusztriális loft-átalakítás, Fenntartható öko-iroda, Mix-used közösségi tér, Luxus lakópark)",
    "Hangvétel beállítás (Szakmai/Analitikus, Inspiráló/Vizionárius, Rövid/Direkt)",
    "Energetikai besorolás figyelembevétele (Modernizált, Átlagos, Felújítandó)",
    "Professzionális PDF export",
    "NotebookLM adatcsomag export",
  ],
  input: {
    "@type": "PropertyValue",
    name: "Bemeneti paraméterek",
    value:
      "PDF alaprajz, célcsoport, narratíva, hangvétel, energetikai besorolás",
  },
  output: {
    "@type": "PropertyValue",
    name: "Kimeneti formátum",
    value:
      "Befektetői pitch (legacy, vision, financial, ROI szekciók), PDF export, NotebookLM Markdown export",
  },
  screenshot: "https://webdude.hu/banners/kristofka-workflow.png",
  softwareVersion: "1.0",
  datePublished: "2026-07-13",
  inLanguage: "hu-HU",
};

export default function KristofkaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workflowJsonLd) }}
      />
      {children}
    </>
  );
}
