/**
 * AI Tools Utility Library
 * Centralized logic for AI-powered SEO audit, content planning, and competitor analysis tools.
 */

export interface SEOAuditResult {
  url: string;
  score: number;
  metaTags: {
    title: string;
    description: string;
    keywords: string[];
  };
  headingStructure: {
    h1: string[];
    h2: string[];
    h3: string[];
  };
  contentAnalysis: {
    wordCount: number;
    readabilityScore: number;
    keywordDensity: Record<string, number>;
  };
  jsonLdSchema: {
    hasSchema: boolean;
    schemaTypes: string[];
    schemaCount: number;
    missingTypes: string[];
  };
  recommendations: string[];
  gapAnalysis: {
    missingKeywords: string[];
    competitorAdvantage: string[];
  };
}

export interface ContentPlanResult {
  industry: string;
  targetAudience: string;
  mainProduct: string;
  contentCalendar: {
    blogTopics: string[];
    linkedinPosts: string[];
    newsletterTopics: string[];
  };
  suggestedKeywords: string[];
}

export interface CompetitorAnalysisResult {
  targetUrl: string;
  competitors: string[];
  visualStyleComparison: string;
  valuePropositionClarity: number;
  ctaAnalysis: {
    count: number;
    placement: string[];
    effectiveness: string;
  };
  recommendations: string[];
  upsellOpportunity: string;
}

/**
 * Fetch and parse HTML content from a URL
 * Note: This requires server-side execution due to CORS restrictions
 */
export async function fetchUrlContent(url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status}`);
    }

    return await response.text();
  } catch (error) {
    throw new Error(
      `URL fetch error: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Extract meta tags from HTML content
 */
export function extractMetaTags(html: string) {
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
  const descriptionMatch = html.match(
    /<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i
  );
  const keywordsMatch = html.match(
    /<meta[^>]*name=["']keywords["'][^>]*content=["']([^"']*)["'][^>]*>/i
  );

  const keywords = keywordsMatch?.[1]
    ? keywordsMatch[1]
        .split(",")
        .map((k) => k.trim())
        .filter((k) => k.length > 0)
    : [];

  return {
    title: titleMatch?.[1] || "",
    description: descriptionMatch?.[1] || "",
    keywords,
  };
}

/**
 * Extract heading structure from HTML content
 */
export function extractHeadingStructure(html: string) {
  const h1Matches = html.match(/<h1[^>]*>(.*?)<\/h1>/gi) || [];
  const h2Matches = html.match(/<h2[^>]*>(.*?)<\/h2>/gi) || [];
  const h3Matches = html.match(/<h3[^>]*>(.*?)<\/h3>/gi) || [];

  const cleanText = (text: string) => text.replace(/<[^>]*>/g, "").trim();

  return {
    h1: h1Matches.map(cleanText),
    h2: h2Matches.map(cleanText),
    h3: h3Matches.map(cleanText),
  };
}

/**
 * Extract JSON-LD schemas from HTML content
 * AEO critical: Analyzes structured data for AI search engines
 */
export function extractJsonLdSchema(html: string) {
  const schemaRegex =
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/gi;
  const matches = html.match(schemaRegex) || [];

  const schemaTypes: string[] = [];
  const missingTypes: string[] = [];

  // Recommended AEO schema types for local businesses
  const recommendedTypes = [
    "LocalBusiness",
    "Person",
    "Organization",
    "FAQPage",
    "Service",
    "Product",
    "Article",
    "BlogPosting",
    "WebSite",
  ];

  interface SchemaObject {
    "@type"?: string;
    "@graph"?: SchemaObject[];
  }

  matches.forEach((match) => {
    try {
      const jsonMatch = match.match(/<script[^>]*>(.*?)<\/script>/i);
      if (jsonMatch) {
        const schema = JSON.parse(jsonMatch[1]) as SchemaObject;
        const extractTypes = (obj: SchemaObject): string[] => {
          const types: string[] = [];
          if (obj["@type"]) {
            types.push(obj["@type"]);
          }
          if (Array.isArray(obj["@graph"])) {
            obj["@graph"].forEach((item: SchemaObject) => {
              if (item["@type"]) {
                types.push(item["@type"]);
              }
            });
          }
          return types;
        };
        schemaTypes.push(...extractTypes(schema));
      }
    } catch {
      // Invalid JSON, skip
    }
  });

  // Identify missing recommended types
  const foundTypes = new Set(schemaTypes);
  recommendedTypes.forEach((type) => {
    if (!foundTypes.has(type)) {
      missingTypes.push(type);
    }
  });

  return {
    hasSchema: matches.length > 0,
    schemaTypes: [...new Set(schemaTypes)],
    schemaCount: matches.length,
    missingTypes,
  };
}

/**
 * Calculate basic content metrics
 */
export function analyzeContent(html: string) {
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const words = text.split(" ").filter((w) => w.length > 0);
  const wordCount = words.length;

  // Simple readability score (average word length)
  const avgWordLength =
    words.reduce((sum, word) => sum + word.length, 0) / (wordCount || 1);
  const readabilityScore = Math.max(
    0,
    Math.min(100, 100 - (avgWordLength - 4) * 10)
  );

  // Basic keyword density
  const keywordDensity: Record<string, number> = {};
  const stopWords = [
    "a",
    "az",
    "a",
    "és",
    "is",
    "nem",
    "vagy",
    "de",
    "hogy",
    "mint",
    "egy",
    "van",
    "lesz",
  ];

  words.forEach((word) => {
    const lowerWord = word.toLowerCase();
    if (lowerWord.length > 3 && !stopWords.includes(lowerWord)) {
      keywordDensity[lowerWord] = (keywordDensity[lowerWord] || 0) + 1;
    }
  });

  return {
    wordCount,
    readabilityScore,
    keywordDensity,
  };
}

/**
 * Generate SEO audit prompt for AI
 */
export function generateSEOAuditPrompt(
  url: string,
  metaTags: ReturnType<typeof extractMetaTags>,
  headings: ReturnType<typeof extractHeadingStructure>,
  contentAnalysis: ReturnType<typeof analyzeContent>,
  jsonLdSchema: ReturnType<typeof extractJsonLdSchema>
): string {
  return `
Analizáld az alábbi weboldal SEO szempontjából és adj részletes auditot:

URL: ${url}

META TAGOK:
- Title: ${metaTags.title}
- Description: ${metaTags.description}
- Keywords: ${metaTags.keywords.join(", ")}

FEJLÉC STRUKTÚRA:
- H1 (${headings.h1.length} db): ${headings.h1.join(", ") || "Nincs"}
- H2 (${headings.h2.length} db): ${headings.h2.slice(0, 5).join(", ") || "Nincs"}
- H3 (${headings.h3.length} db): ${headings.h3.slice(0, 5).join(", ") || "Nincs"}

TARTALM ANALÍZIS:
- Szószám: ${contentAnalysis.wordCount}
- Olvashatósági pontszám: ${contentAnalysis.readabilityScore.toFixed(1)}/100
- Legfontosabb kulcsszavak: ${Object.entries(contentAnalysis.keywordDensity)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([k, v]) => `${k} (${v})`)
    .join(", ")}

JSON-LD SCHEMA (AEO kritikus):
- Van schema: ${jsonLdSchema.hasSchema ? "Igen" : "Nem"}
- Schema típusok: ${jsonLdSchema.schemaTypes.join(", ") || "Nincsenek"}
- Hiányzó ajánlott típusok: ${jsonLdSchema.missingTypes.join(", ") || "Nincsenek"}

Kérlek, adj:
1. SEO pontszámot 0-100 között (figyelembe véve az AEO-t is)
2. 5 konkrét javaslatot a javításra (fókuszálj a JSON-LD hiányosságokra)
3. Gap Analysis-t: milyen kulcsszavak hiányoznak a versenytársakhoz képest
4. Prioritási listát a javítandó területekről (AEO fókusszal)

Válaszodat strukturált JSON formátumban add meg:
{
  "score": 0-100,
  "recommendations": ["javaslat1", "javaslat2", ...],
  "gapAnalysis": {
    "missingKeywords": ["kulcsszó1", ...],
    "competitorAdvantage": ["előny1", ...]
  }
}
`;
}

/**
 * Generate content planning prompt for AI
 */
export function generateContentPlanPrompt(
  industry: string,
  targetAudience: string,
  mainProduct: string
): string {
  return `
Készíts egy 3 hónapos tartalomtervet az alábbi paraméterek alapján:

IPARÁG: ${industry}
CÉLCÉLCSOPORT: ${targetAudience}
FŐ TERMÉK/SZOLGÁLTATÁS: ${mainProduct}

Kérlek, adj:
1. 10 blog témát, ami SEO-optimalizált és vonzó a célcsoportnak
2. 8 LinkedIn poszt ötletet (magyarul, emojikkal)
3. 5 hírlevél témát, ami konverzióra optimalizált
4. 10 kulcsszó javaslatot a tartalomgyártáshoz

Válaszodat strukturált JSON formátumban add meg:
{
  "blogTopics": ["téma1", ...],
  "linkedinPosts": ["poszt1", ...],
  "newsletterTopics": ["téma1", ...],
  "suggestedKeywords": ["kulcsszó1", ...]
}

A tartalmak legyenek a "Cyber-Arany" stílusban: prémium, szakmai, de közvetlen hangnemben.
`;
}

/**
 * Generate competitor analysis prompt for AI
 */
export function generateCompetitorAnalysisPrompt(
  targetUrl: string,
  competitors: string[]
): string {
  return `
Végezz versenytárs-elemzést az alábbi oldalak között:

CÉL OLDAL: ${targetUrl}
VERSENYTÁRSAK: ${competitors.join(", ")}

Kérlek, elemezd:
1. Vizuális stílus összehasonlítása (leírás alapján)
2. Értékajánlat egyértelműsége (0-10 pont)
3. CTA elemek elemzése (szám, elhelyezkedés, hatékonyság)
4. Konverziós lehetőségek azonosítása

Válaszodat strukturált JSON formátumban add meg:
{
  "visualStyleComparison": "részletes leírás",
  "valuePropositionClarity": 0-10,
  "ctaAnalysis": {
    "count": szám,
    "placement": ["hely1", ...],
    "effectiveness": "leírás"
  },
  "recommendations": ["javaslat1", ...],
  "upsellOpportunity": "WebDude UX Roast ajánlat szövege"
}

Ha a pontszám alacsony (<6), az upsellOpportunity-ban promotáld a WebDude 'UX Roast' audit szolgáltatást.
`;
}

/**
 * Extract CTA buttons from HTML content
 */
export function extractCTAButtons(html: string): string[] {
  const buttonMatches = html.match(/<button[^>]*>(.*?)<\/button>/gi) || [];
  const linkMatches =
    html.match(/<a[^>]*class="[^"]*btn[^"]*"[^>]*>(.*?)<\/a>/gi) || [];

  const cleanText = (text: string) => text.replace(/<[^>]*>/g, "").trim();

  const buttons = [
    ...buttonMatches.map(cleanText),
    ...linkMatches.map(cleanText),
  ].filter((btn) => btn.length > 0 && btn.length < 100);

  return buttons;
}

/**
 * Generate comprehensive competitor analysis prompt
 */
export function generateCompetitorAnalysisPromptComprehensive(
  targetUrl: string,
  targetMeta: ReturnType<typeof extractMetaTags>,
  targetHeadings: ReturnType<typeof extractHeadingStructure>,
  targetCTAs: string[],
  competitors: Array<{
    url: string;
    meta: ReturnType<typeof extractMetaTags>;
    headings: ReturnType<typeof extractHeadingStructure>;
    ctas: string[];
  }>
): string {
  return `
Végezz részletes versenytárs-elemzést és adj konverziós pontszámokat:

CÉL OLDAL: ${targetUrl}
- Title: ${targetMeta.title}
- Description: ${targetMeta.description}
- H1 (${targetHeadings.h1.length}): ${targetHeadings.h1.join(", ") || "Nincs"}
- H2 (${targetHeadings.h2.length}): ${targetHeadings.h2.slice(0, 3).join(", ") || "Nincs"}
- CTA-k (${targetCTAs.length}): ${targetCTAs.slice(0, 3).join(", ") || "Nincs"}

VERSENYTÁRSAK:
${competitors
  .map(
    (comp, i) => `
${i + 1}. ${comp.url}
- Title: ${comp.meta.title}
- Description: ${comp.meta.description}
- H1 (${comp.headings.h1.length}): ${comp.headings.h1.join(", ") || "Nincs"}
- H2 (${comp.headings.h2.length}): ${comp.headings.h2.slice(0, 3).join(", ") || "Nincs"}
- CTA-k (${comp.ctas.length}): ${comp.ctas.slice(0, 3).join(", ") || "Nincs"}
`
  )
  .join("")}

Kérlek, értékeld 1-100 ponton:
1. Értékajánlat tisztasága (Clarity)
2. Konverziós elemek minősége (CTA Quality)
3. Átfogó UX/CRO pontszám (Overall UX/CRO)

Válaszodat strukturált JSON formátumban add meg:
{
  "targetScore": {
    "clarity": 0-100,
    "ctaQuality": 0-100,
    "overallUX": 0-100
  },
  "competitorScores": [
    {
      "url": "versenytárs URL",
      "clarity": 0-100,
      "ctaQuality": 0-100,
      "overallUX": 0-100
    }
  ],
  "analysis": {
    "visualStyleComparison": "részletes leírás",
    "ctaComparison": "CTA elemek összehasonlítása",
    "valuePropComparison": "Értékajánlat összehasonlítása"
  },
  "recommendations": ["javaslat1", ...],
  "upsellOpportunity": "WebDude UX Roast ajánlat szövege"
}

Ha a céloldal overallUX pontszáma alacsonyabb, mint a legjobb versenytársé, az upsellOpportunity-ban promotáld a WebDude 'UX Roast' audit szolgáltatást.
`;
}

export function generateKristofkaPitchPrompt(
  fileUrl: string,
  fileName: string,
  targetAudience: string,
  narrative: string,
  tone: string,
  energetikaiBesorolas?: string
): string {
  return `
Te egy veterán ingatlanbefektető és storytelling szakértő vagy. A felhasználó nyers adatokat (alaprajz, leírás) adott meg. A feladatod egy professzionális, meggyőző befektetői pitch (World Class Pitch Deck szövegezés) írása.

Használj "property-as-an-asset" narratívát, emeld ki az értéknövelési potenciált (value-add). A kimenet legyen strukturált JSON formátumban a következő mezőkkel:

{
  "legacy": "Az épület története és öröksége - miért különleges ez az ingatlan?",
  "vision": "A konverziós vízió - hogyan alakul át az épület a választott narratíva szerint?",
  "financial": "Pénzügyi potenciál - értéknövelési lehetőségek, konverziós költségek, hozamprémium",
  "roi": "Befektetői megtérülési kilátások - IRR, exit stratégia, kockázatkezelés"
}

PARAMÉTEREK:
- Fájl: ${fileName} (${fileUrl})
- Célcsoport: ${targetAudience}
- Narratíva: ${narrative}
- Hangvétel: ${tone}
- Energetikai besorolás: ${energetikaiBesorolas || "unknown"}

${energetikaiBesorolas === "Felújítandó" ? "KÜLÖNÖS FOKUSZ: Mivel az épület energetikai besorolása 'Felújítandó', a pitch-ben kiemelten emeld ki a PÁLYÁZATI ENERGETIKAI KORSZERŰSÍTÉSI LEHETŐSÉGEKET (szigetelés, napelem-integráció, hőszivattyús fűtés, EU-s pályázati megfelelés)." : energetikaiBesorolas === "Modernizált" ? "KÜLÖNÖS FOKUSZ: Mivel az épület energetikai besorolása 'Modernizált', a pitch-ben hangsúlyozd a FENNTARTHATÓSÁGI ÉRTÉKEKET és ALACSONYABB ÜZEMELTETÉSI KÖLTSÉGEKET (OPEX), mint értéknövelési tényezőt." : ""}

KÜLÖNÖS FIGYELEM: MAGYARORSZÁGI KKV-PIAC ÉS FENNTARTHATÓSÁG
1. EU-s pályázati megfelelés: Építsd be a leírásba, hogy az ingatlan hogyan tehető alkalmassá energetikai korszerűsítési pályázatokra (pl. szigetelés, napelem-integráció, hőszivattyús fűtés).
2. Helyi gazdasági relevancia: Érvelj a lokáció mellett (pl. logisztikai közelség, munkaerő-piaci elérhetőség).
3. Hozam-kockázat elemzés: A pénzügyi szekcióban említsd meg a bérbeadhatóságot a jelenlegi ipari kereslet függvényében.
4. Professzionális hangvétel: Használj üzleti magyar nyelvezetet, legyél tárgyilagos, mégis vizionárius.

CÉLCSOPORT ALAPJÁN ADAPTÁLJ:
- Venture Capital: Fókuszálj a skálázhatóságra, exit stratégiára és IRR-re
- Magánbefektető: Emeld ki a prémium élményt, exkluzivitást és hosszú távú értéknövelést
- Banki hitelbíráló: Koncentrálj a cash-flow-ra, kockázatkezelésre és fedezeti értékre
- Városi városfejlesztési pályázat: Hangsúlyozd a közösségi hasznot, fenntarthatóságot és városfejlesztési célokat

HANGVÉTEL ALAPJÁN:
- Szakmai/Analitikus: Használj iparági terminológiát (IRR, cap rate, NOI, cash-on-cash return)
- Inspiráló/Vizionárius: Emeld ki a transzformációs potenciált és jövőbeli értéket
- Rövid/Direkt: Legyenes és lényegre törő, a legfontosabb pénzügyi mutatókra fókuszálva

A generált szöveg legyen üzletileg kifogástalan, használjon iparági terminológiát és legyen meggyőző a választott célcsoport számára.
`;
}
