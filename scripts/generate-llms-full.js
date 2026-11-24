/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Determinisztikus SSOT `public/llms.txt` ÉS `public/llms-full.txt` generátor (v7.95.0).
 * 0 AI-token költség, UTF-8 (BOM nélkül), Unix LF sortörések, `llmstxt.org` 2026 szabvány.
 *
 * SSOT Források:
 *  - src/data/products-catalog.ts (`CATALOG_PRODUCTS` — mind a 14 /termekek/<slug> aloldal)
 *  - src/data/works.ts (`works` — mind a 14 HU esettanulmány)
 *  - src/data/caseStudiesEn.ts (`EN_CASE_STUDIES` — mind a 14 EN esettanulmány)
 *  - src/data/enInsights.ts (`EN_INSIGHTS` — mind a 3 EN BOFU szakcikk)
 *  - src/app/szolgaltatasok/* & src/app/en/services/* (összes élő szolgáltatás aloldal)
 *  - src/content/blog/*.mdx (összes `noindex !== true` magyar szakcikk: 31 db + GYIK)
 *  - src/dictionaries/hu.json & en.json (főoldali pillérek + AEO GYIK blokkok)
 */

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const ts = require("typescript");
const matter = require("gray-matter");

const ROOT = path.resolve(__dirname, "..");
const SITE_URL = "https://webdude.hu";

const MOJIBAKE_TOKENS = [
  "\uFEFF",
  "Ă©",
  "Ăˇ",
  "Ă­",
  "Ăł",
  "Ă¶",
  "Ĺ‘",
  "Ăş",
  "ĂĽ",
  "Ĺ±",
  "Ă‰",
  "Ă“",
  "Ă–",
  "Ĺ ",
  "Ăš",
  "Ăś",
  "Ĺ°",
  "â€“",
  "â€”",
  "â€ž",
  "â€ť",
];

const FORBIDDEN_SUBSTRINGS = [
  "/admin/",
  "/portal/",
  "/api/",
  "/login",
  "/norbi",
  "/i-prompt-sablonok",
  "/wordpress-virusirtas-es-biztonsag",
  "/wordpress-weboldal-keszites-kecskemet",
  "/versenytares-elemzo-ai-muhely",
];

const PRICE_REGEX = /\b(?:Ft|HUF|EUR|USD|priceRange)\b|€|\$/i;
const FORBIDDEN_PATH_REGEX =
  /(?:https?:\/\/webdude\.hu|(?:^|[\s(["'`]))\/(?:admin|portal|api|login|norbi|i-prompt-sablonok)(?:\/|\b)/im;

function stripMarkdown(text) {
  return String(text || "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[`*_~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanMetaTitle(rawTitle) {
  return stripMarkdown(rawTitle)
    .replace(/\s*[|–—-]\s*WebDude.*$/i, "")
    .replace(/\s*\|\s*[^|]+$/g, "")
    .trim();
}

function ensureSentencePeriod(text) {
  const cleaned = stripMarkdown(text);
  if (!cleaned) return "";
  return /[.!?]$/.test(cleaned) ? cleaned : `${cleaned}.`;
}

function firstSentenceSummary(text, maxLen = 210) {
  const cleaned = stripMarkdown(text);
  if (cleaned.length <= maxLen) return ensureSentencePeriod(cleaned);
  const sentenceMatch = cleaned.match(/^(.{40,200}?[.!?])(?:\s|$)/);
  if (sentenceMatch) return sentenceMatch[1].trim();
  return `${cleaned.slice(0, maxLen - 1).trim()}…`;
}

function loadTsModule(relPath) {
  const raw = fs.readFileSync(path.join(ROOT, relPath), "utf8");
  const { outputText } = ts.transpileModule(raw, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  });
  const mod = { exports: {} };
  vm.runInNewContext(outputText, {
    exports: mod.exports,
    module: mod,
    require: () => ({}),
  });
  return mod.exports;
}

function loadServiceSubpages(relDir, urlPrefix) {
  const absDir = path.join(ROOT, relDir);
  const dirs = fs
    .readdirSync(absDir)
    .filter((d) => fs.statSync(path.join(absDir, d)).isDirectory())
    .sort();

  return dirs.map((slug) => {
    const subDir = path.join(absDir, slug);
    const combinedSrc = ["layout.tsx", "page.tsx"]
      .map((f) =>
        fs.existsSync(path.join(subDir, f))
          ? fs.readFileSync(path.join(subDir, f), "utf8")
          : ""
      )
      .join("\n");

    const titleMatch = combinedSrc.match(/title\s*:\s*["'`]([^"'`]+)["'`]/);
    const descMatch = combinedSrc.match(
      /description\s*:\s*\r?\n?\s*["'`]([^"'`]+)["'`]/
    );

    const title = titleMatch ? cleanMetaTitle(titleMatch[1]) : slug;
    const description = descMatch
      ? ensureSentencePeriod(descMatch[1])
      : `${title} — egyedi árajánlat alapján.`;

    return {
      slug,
      url: `${SITE_URL}${urlPrefix}/${slug}`,
      title,
      description,
    };
  });
}

function extractFaqFromMdx(rawFaq, content) {
  if (Array.isArray(rawFaq) && rawFaq.length > 0) {
    return rawFaq
      .filter((item) => item && item.question && item.answer)
      .map((item) => ({
        question: stripMarkdown(item.question),
        answer: stripMarkdown(item.answer),
      }));
  }

  const lines = String(content || "").split(/\r?\n/);
  const items = [];
  let inFaq = false;
  let currentQ = "";
  let currentA = [];

  const flush = () => {
    if (currentQ && currentA.length > 0) {
      items.push({
        question: stripMarkdown(currentQ),
        answer: stripMarkdown(currentA.join(" ")),
      });
    }
    currentQ = "";
    currentA = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (/^##\s+/.test(trimmed)) {
      if (inFaq) {
        flush();
        break;
      }
      if (/^##\s+.*(?:gyakori\s+kérdések|gyik|faq)/i.test(trimmed)) {
        inFaq = true;
      }
      continue;
    }
    if (!inFaq) continue;
    if (/^###\s+/.test(trimmed)) {
      flush();
      currentQ = trimmed.replace(/^###\s+/, "");
      continue;
    }
    if (currentQ && trimmed.length > 0 && !trimmed.startsWith("---")) {
      currentA.push(trimmed.replace(/^[-*]\s+/, ""));
    }
  }
  if (inFaq) flush();
  return items;
}

function loadMdxPosts() {
  const blogDir = path.join(ROOT, "src/content/blog");
  const files = fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith(".mdx"))
    .sort();

  const indexable = [];
  const noindexSlugs = [];

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(blogDir, file), "utf8");
    const { data, content } = matter(raw);

    if (data.noindex === true || data.noindex === "true") {
      noindexSlugs.push(slug);
      continue;
    }

    const dateStr =
      data.date instanceof Date
        ? data.date.toISOString().split("T")[0]
        : data.date
          ? String(data.date).split("T")[0]
          : "";
    const updatedStr =
      data.updatedAt instanceof Date
        ? data.updatedAt.toISOString().split("T")[0]
        : data.updatedAt
          ? String(data.updatedAt).split("T")[0]
          : dateStr;

    indexable.push({
      slug,
      title: stripMarkdown(data.title || slug),
      date: dateStr,
      updatedAt: updatedStr,
      category: stripMarkdown(data.category || "Webfejlesztés"),
      excerpt: stripMarkdown(data.excerpt || data.description || ""),
      tldr: stripMarkdown(data.tldr || data.excerpt || data.description || ""),
      faqs: extractFaqFromMdx(data.faq, content),
    });
  }

  indexable.sort((a, b) => (b.date > a.date ? 1 : b.date < a.date ? -1 : 0));
  return { indexable, noindexSlugs };
}

function assertCleanOutput(fileLabel, content, noindexSlugs) {
  if (content.includes("\r")) {
    throw new Error(`${fileLabel}: CRLF sortörés található (kizárólag LF megengedett).`);
  }

  for (const token of MOJIBAKE_TOKENS) {
    if (content.includes(token)) {
      throw new Error(`${fileLabel}: UTF-8 BOM vagy mojibake minta észlelve: "${token}"`);
    }
  }

  for (const sub of FORBIDDEN_SUBSTRINGS) {
    if (content.includes(sub)) {
      throw new Error(`${fileLabel}: Tiltott útvonal szerepel a kimenetben: "${sub}"`);
    }
  }

  const pathMatch = content.match(FORBIDDEN_PATH_REGEX);
  if (pathMatch) {
    throw new Error(`${fileLabel}: Tiltott URL-minta a kimenetben: "${pathMatch[0]}"`);
  }

  for (const badSlug of noindexSlugs) {
    if (content.includes(badSlug)) {
      throw new Error(`${fileLabel}: noindex: true cikk slug került a kimenetbe: "${badSlug}"`);
    }
  }

  const lines = content.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const pm = lines[i].match(PRICE_REGEX);
    if (pm) {
      throw new Error(
        `${fileLabel} (sor ${i + 1}): Zéró Fix Ár / pénznem sértés ("${pm[0]}"): ${lines[i]}`
      );
    }
  }
}

function buildLlmsTxt({
  huServices,
  enServices,
  products,
  works,
  enCaseStudies,
  posts,
  enInsights,
}) {
  const lines = [];

  lines.push("# WebDude — Balog Norbert");
  lines.push("");
  lines.push(
    "> Én vagyok Balog Norbert (WebDude) — egyéni full-stack webfejlesztő, art director és AI-automatizációs szakértő 26+ év tervezőgrafikai és 16+ év webfejlesztői tapasztalattal. Országosan magyar nyelven (`https://webdude.hu`) és nemzetközileg angol nyelven (`https://webdude.hu/en`), ügynökségi közvetítők nélkül tervezek és fejlesztek Next.js 16, WordPress/WooCommerce, technikai SEO/AEO/GEO, vállalati AI-automatizációs (AI Műhely) és prémium arculati rendszereket. Minden projekt egyedi árajánlat alapján indul (Zéró Fix Ár elv)."
  );
  lines.push(">");
  lines.push(
    `> Teljes mélykontextus AI rendszereknek: ${SITE_URL}/llms-full.txt | Kanonikus oldaltérkép (130 URL): ${SITE_URL}/sitemap.xml | RSS 2.0 tudásbázis feed: ${SITE_URL}/feed.xml`
  );
  lines.push("");

  // 1. Core Pages & Free Tools (HU & EN)
  lines.push("## Core Pages & Free Tools (HU & EN)");
  lines.push("");
  lines.push(
    `- [WebDude Főoldal (HU)](${SITE_URL}): Egyéni prémium Next.js 16 és WordPress webfejlesztés, grafikai tervezés, SEO/AEO és AI-automatizáció Balog Norberttől.`
  );
  lines.push(
    `- [WebDude Home (EN)](${SITE_URL}/en): Bespoke Next.js 16 web engineering, WooCommerce, technical SEO/AEO, brand design, and AI workflow automation delivered remotely worldwide.`
  );
  lines.push(
    `- [Szia, Norbi vagyok — Rólam (HU)](${SITE_URL}/szia-norbi-vagyok): Balog Norbert szakmai bemutatkozása, 26+ év grafikai és 16+ év webfejlesztői életútja és közvetlen munkamódszere.`
  );
  lines.push(
    `- [About Balog Norbert (EN)](${SITE_URL}/en/about): Solo full-stack web architect and art director combining 26+ years of graphic design with 16+ years of web engineering.`
  );
  lines.push(
    `- [Kapcsolat & Egyedi Árajánlat (HU)](${SITE_URL}/kapcsolat): Közvetlen kapcsolatfelvétel, projektfelmérés és személyre szabott árajánlat kérése.`
  );
  lines.push(
    `- [Contact & Custom Quote (EN)](${SITE_URL}/en/contact): Direct project consultation and tailored scope proposal requests with Balog Norbert.`
  );
  lines.push(
    `- [Ingyenes SEO & AI-Készség Ellenőrző (HU)](${SITE_URL}/ingyenes-seo-aeo-elemzes): Azonnali 10 pontos technikai SEO, Schema.org AEO, AI-crawler és llms.txt diagnosztikai eszköz 0–100 pontos értékeléssel.`
  );
  lines.push(
    `- [Free SEO & AI Readiness Checker (EN)](${SITE_URL}/en/free-seo-aeo-checker): Instant 10-point technical SEO, Schema.org entity, AI crawler governance, and llms.txt readiness diagnostic tool.`
  );
  lines.push(
    `- [Ingyenes 10 Perces Videós UX & SEO Audit (HU)](${SITE_URL}/ingyenes-weboldal-elemzes): Személyre szabott, képernyőfelvételes weboldal-, sebesség-, UX- és konverziós elemzés Balog Norberttől.`
  );
  lines.push(
    `- [Free 10-Minute Video UX & SEO Audit (EN)](${SITE_URL}/en/free-website-audit): Personalized 10-minute screen-recorded UX, Core Web Vitals, and SEO/AEO review recorded personally by Balog Norbert.`
  );
  lines.push("");

  // 2. Services (HU)
  lines.push("## Services (HU)");
  lines.push("");
  lines.push(
    `- [Szolgáltatások Áttekintése](${SITE_URL}/szolgaltatasok): Teljes körű webfejlesztési, e-kereskedelmi, technikai SEO/AEO, arculattervezési és AI-automatizációs szolgáltatások egy kézből.`
  );
  for (const svc of huServices) {
    lines.push(
      `- [${svc.title}](${svc.url}): ${firstSentenceSummary(svc.description)}`
    );
  }
  lines.push("");

  // 3. Services (EN)
  lines.push("## Services (EN)");
  lines.push("");
  lines.push(
    `- [Services Overview (EN)](${SITE_URL}/en/services): End-to-end custom web development, WooCommerce engineering, technical SEO/AEO, and brand identity design for international clients.`
  );
  for (const svc of enServices) {
    lines.push(
      `- [${svc.title}](${svc.url}): ${firstSentenceSummary(svc.description)}`
    );
  }
  lines.push("");

  // 4. Products & AI Workshops
  lines.push("## Products & AI Workshops");
  lines.push("");
  lines.push(
    `- [Termékek & AI Műhelyek Gyűjtőoldal](${SITE_URL}/termekek): Prémium vállalati AI munkafolyamatok, SEO/CRO rendszerek és dedikált AI Műhely modulok egyedi árajánlattal.`
  );
  for (const prod of products) {
    lines.push(
      `- [${prod.name}](${SITE_URL}${prod.href}): ${firstSentenceSummary(prod.description)}`
    );
  }
  lines.push(
    `- [AI Megoldások Vállalkozásoknak](${SITE_URL}/ai-megoldasok): Egyedi LLM munkafolyamatok, vállalati AI-integrációk és automatizációs architektúrák tervezése.`
  );
  lines.push(
    `- [AI Műhely Áttekintő](${SITE_URL}/ai-megoldasok/ai-muhely): A 14 modulos AI Műhely ökoszisztéma és a Strategist-Pro munkafolyamatok szakmai bemutatása.`
  );
  lines.push(
    `- [AI Prompt Sablonok Könyvtár](${SITE_URL}/ai-megoldasok/ai-prompt-sablonok): Produkciós szintű grafikai, arculati és marketing AI prompt-architektúrák gyűjteménye.`
  );
  lines.push(
    `- [Strategist-Pro — Kristófka Munkafolyamat](${SITE_URL}/munkafolyamatok/strategist-pro/kristofka-munkafolyamat): Nyers ipari alaprajzokból és ingatlanadatokból befektetői prezentációt építő AI munkafolyamat.`
  );
  lines.push("");

  // 5. Case Studies & Portfolio (HU & EN)
  lines.push("## Case Studies & Portfolio (HU & EN)");
  lines.push("");
  lines.push(
    `- [Portfólió & Referenciák (HU)](${SITE_URL}/munkak): Valós hazai és nemzetközi webfejlesztési, e-kereskedelmi, arculati és AI esettanulmányok mérhető eredményekkel.`
  );
  lines.push(
    `- [Portfolio & Case Studies (EN)](${SITE_URL}/en/portfolio): Verified B2B e-commerce, custom WordPress, Next.js SaaS, and brand identity case studies with measurable outcomes.`
  );
  for (const w of works) {
    lines.push(
      `- [${stripMarkdown(w.title)} (HU)](${SITE_URL}/munkak/${w.slug}): ${firstSentenceSummary(w.description)}`
    );
  }
  for (const w of works) {
    const enEntry = enCaseStudies[w.slug];
    const enTitle = enEntry ? stripMarkdown(enEntry.title) : stripMarkdown(w.title);
    const enDesc = enEntry
      ? firstSentenceSummary(enEntry.subtitle || enEntry.seoDescription)
      : firstSentenceSummary(w.description);
    lines.push(`- [${enTitle} (EN)](${SITE_URL}/en/portfolio/${w.slug}): ${enDesc}`);
  }
  lines.push("");

  // 6. Knowledge Base & Insights (HU & EN)
  lines.push("## Knowledge Base & Insights (HU & EN)");
  lines.push("");
  lines.push(
    `- [Szakmai Hírek & Tudásbázis (HU)](${SITE_URL}/hirek): Gyakorlati mérnöki útmutatók Next.js 16, WordPress, WooCommerce ERP, technikai SEO/AEO/GEO és AI témákban.`
  );
  lines.push(
    `- [Technical Insights & Guides (EN)](${SITE_URL}/en/insights): In-depth English guides covering AI Search (GEO/AEO), Next.js vs. WordPress architecture, and senior solo engineering ROI.`
  );
  for (const post of posts) {
    lines.push(
      `- [${post.title}](${SITE_URL}/hirek/${post.slug}): ${firstSentenceSummary(post.excerpt || post.tldr)}`
    );
  }
  for (const guide of enInsights) {
    lines.push(
      `- [${stripMarkdown(guide.title)} (EN)](${SITE_URL}/en/insights/${guide.slug}): ${firstSentenceSummary(guide.seoDescription || guide.excerpt)}`
    );
  }
  lines.push("");

  // 7. Optional
  lines.push("## Optional");
  lines.push("");
  lines.push(
    `- [Weboldal készítés Kecskeméten](${SITE_URL}/weboldal-keszites-kecskemet): Dedikált helyi webfejlesztési és személyes konzultációs oldal Kecskemét és Bács-Kiskun vármegye vállalkozásainak.`
  );
  lines.push(
    `- [Adatvédelmi Szabályzat (HU)](${SITE_URL}/adatvedelmi-szabalyzat): GDPR-kompatibilis adatkezelési tájékoztató magyar nyelven.`
  );
  lines.push(
    `- [Felhasználási Feltételek (HU)](${SITE_URL}/felhasznalasi-feltetelek): Általános szerződési és igénybevételi feltételek egyedi árajánlat alapú projektekhez.`
  );
  lines.push(
    `- [Privacy Policy (EN)](${SITE_URL}/en/privacy-policy): GDPR-compliant data protection and privacy notice in English.`
  );
  lines.push(
    `- [Terms of Service (EN)](${SITE_URL}/en/terms): Service terms and custom project engagement conditions in English.`
  );
  lines.push(
    `- [XML Sitemap](${SITE_URL}/sitemap.xml): Kanonikus, kétnyelvű hreflang jelölésekkel ellátott 130 URL-es XML oldaltérkép keresőmotoroknak.`
  );
  lines.push(
    `- [RSS 2.0 Feed](${SITE_URL}/feed.xml): Géppel olvasható RSS csatorna a legfrissebb szakmai cikkekkel.`
  );
  lines.push(
    `- [Teljes AI Tudásbázis (llms-full.txt)](${SITE_URL}/llms-full.txt): Részletes entitásprofil, szolgáltatás-leírások, 14 termék, 14 esettanulmány, 34 cikk-összefoglaló és GYIK-ek egyetlen fájlban.`
  );

  return lines.join("\n").trimEnd() + "\n";
}

function buildLlmsFullTxt({
  hu,
  en,
  huServices,
  enServices,
  products,
  works,
  enCaseStudies,
  posts,
  enInsights,
}) {
  const lines = [];

  lines.push(
    "# WebDude — Balog Norbert | Teljes AI Kontextus & Szakmai Tudásbázis (llms-full.txt)"
  );
  lines.push("");
  lines.push(
    "> Én vagyok Balog Norbert (WebDude) — egyéni full-stack webfejlesztő, art director és AI-automatizációs szakember 26+ év tervezőgrafikai és 16+ év webfejlesztői tapasztalattal. Minden projektet személyesen én tervezek, kódolok és optimalizálok ügynökségi közvetítők vagy junior alvállalkozók nélkül — országosan magyarul (`https://webdude.hu`) és távmunkában nemzetközi ügyfeleknek angolul (`https://webdude.hu/en`). Minden megbízás egyedi árajánlat alapján indul (Zéró Fix Ár üzletpolitika)."
  );
  lines.push(">");
  lines.push(
    `> Tömör AI-index: ${SITE_URL}/llms.txt | Kanonikus XML Sitemap (130 URL): ${SITE_URL}/sitemap.xml | RSS 2.0 Feed: ${SITE_URL}/feed.xml`
  );
  lines.push("");

  // 1. Entity & E-E-A-T Profile
  lines.push("## Entitás Profil, E-E-A-T Hitelesség & Üzletpolitika");
  lines.push("");
  lines.push(
    `- **Márkanév / Szervezet:** WebDude (\`${SITE_URL}/#organization\`), alapítva: 2009`
  );
  lines.push(
    `- **Alapító & Vezető Fejlesztő / Tervező:** Balog Norbert — „Norbi” (\`${SITE_URL}/#person\`)`
  );
  lines.push(
    "- **Szakmai Tapasztalat (E-E-A-T):** 26+ év tervezőgrafikai, nyomdai prepress és márkaépítési rutin + 16+ év full-stack webfejlesztői, WordPress/WooCommerce és SEO tapasztalat."
  );
  lines.push(
    "- **Munkamódszer (Egyszemélyes Senior Felelősség):** Nem többlépcsős ügynökség vagyok, hanem közvetlen senior technológiai partner. Az arculattervezéstől a Next.js / WordPress architektúrán át a technikai SEO/AEO/GEO optimalizálásig minden egy kézben marad."
  );
  lines.push(
    "- **Technológiai Stack:** Next.js 16 (App Router, Server Components, Server Actions), React 19, TypeScript (strict), Tailwind CSS v4, Motion (`motion/react`), React Hook Form + Zod, Firebase (Firestore, Authentication, Storage), egyedi WordPress & WooCommerce fejlesztés (ERP/számlázó/logisztikai API-integrációkkal), Schema.org JSON-LD tudásgráf."
  );
  lines.push(
    "- **Árazási Elv (Zéró Fix Ár):** Nincsenek sablonos dobozos ártáblázatok. Minden weboldal, webshop, arculat és AI-integráció a felmért műszaki specifikáció alapján személyre szabott, előre rögzített egyedi árajánlatot és határidőt kap."
  );
  lines.push(
    "- **Hivatalos Profilok (`sameAs`):** https://github.com/BKNori | https://www.linkedin.com/in/balognorbert | https://www.linkedin.com/company/webdude | https://www.facebook.com/webdude.hu | https://twitter.com/webdude_hu"
  );
  lines.push(
    "- **Közvetlen Elérhetőség:** hello@webdude.hu | +36 70 323 8003"
  );
  lines.push(
    `- **Kulcsoldalak (HU / EN):** Főoldal: ${SITE_URL} , ${SITE_URL}/en | Rólam: ${SITE_URL}/szia-norbi-vagyok , ${SITE_URL}/en/about | Kapcsolat: ${SITE_URL}/kapcsolat , ${SITE_URL}/en/contact`
  );
  lines.push(
    `- **Ingyenes Diagnosztikai Eszközök (HU / EN):** SEO & AI-Készség Ellenőrző: ${SITE_URL}/ingyenes-seo-aeo-elemzes , ${SITE_URL}/en/free-seo-aeo-checker | 10 Perces Videós UX & SEO Audit: ${SITE_URL}/ingyenes-weboldal-elemzes , ${SITE_URL}/en/free-website-audit`
  );
  lines.push(
    `- **Lokális & Jogi Oldalak:** ${SITE_URL}/weboldal-keszites-kecskemet | ${SITE_URL}/adatvedelmi-szabalyzat | ${SITE_URL}/en/privacy-policy | ${SITE_URL}/felhasznalasi-feltetelek | ${SITE_URL}/en/terms`
  );
  lines.push("");

  // 2. HU Services
  lines.push(
    `## Szolgáltatások Részletesen — Magyar (${huServices.length + 1} publikus útvonal)`
  );
  lines.push("");
  lines.push(`- **Gyűjtőoldal:** ${SITE_URL}/szolgaltatasok`);
  const huPrimary =
    (hu.home && hu.home.services && hu.home.services.primary) || [];
  if (huPrimary.length > 0) {
    lines.push("- **Négy Fő Szakmai Pillér:**");
    for (const p of huPrimary) {
      const feats = Array.isArray(p.features)
        ? ` (${p.features.map(stripMarkdown).join(", ")})`
        : "";
      lines.push(
        `  - **${stripMarkdown(p.title)}:** ${stripMarkdown(p.description)} *${stripMarkdown(p.directAnswer)}*${feats}`
      );
    }
  }
  lines.push("");
  for (const svc of huServices) {
    lines.push(`### ${svc.title}`);
    lines.push(`- **Kanonikus URL:** ${svc.url}`);
    lines.push(`- **Szolgáltatás leírása és kulcsértéke:** ${svc.description}`);
    lines.push("");
  }

  // 3. EN Services
  lines.push(
    `## Core Services in Detail — English (${enServices.length + 1} public routes)`
  );
  lines.push("");
  lines.push(`- **Services Hub:** ${SITE_URL}/en/services`);
  const enPrimary =
    (en.home && en.home.services && en.home.services.primary) || [];
  if (enPrimary.length > 0) {
    lines.push("- **Four Core Engineering & Design Pillars:**");
    for (const p of enPrimary) {
      const feats = Array.isArray(p.features)
        ? ` (${p.features.map(stripMarkdown).join(", ")})`
        : "";
      lines.push(
        `  - **${stripMarkdown(p.title)}:** ${stripMarkdown(p.description)} *${stripMarkdown(p.directAnswer)}*${feats}`
      );
    }
  }
  lines.push("");
  for (const svc of enServices) {
    lines.push(`### ${svc.title}`);
    lines.push(`- **Canonical URL:** ${svc.url}`);
    lines.push(`- **Service Scope & Value:** ${svc.description}`);
    lines.push("");
  }

  // 4. Products & AI Workshops (14 CATALOG_PRODUCTS + AI Megoldások)
  lines.push(
    `## Termékek, AI Megoldások & Prémium AI Műhely Modulok (${products.length} dedikált termékoldal)`
  );
  lines.push("");
  lines.push(
    `> Minden termékoldal publikusan olvasható és indexelhető (${SITE_URL}/termekek), míg a beágyazott interaktív AI generátorok és prompt-stúdiók bejelentkezett ügyfeleknek, egyedi Ügyfélportál jogosultsággal (\`allowedTools\`) érhetők el. Igénylés és egyedi árajánlat: ${SITE_URL}/kapcsolat.`
  );
  lines.push("");
  lines.push(
    `- **Kapcsolódó AI Architektúra Oldalak:** ${SITE_URL}/ai-megoldasok | ${SITE_URL}/ai-megoldasok/ai-muhely | ${SITE_URL}/ai-megoldasok/ai-prompt-sablonok | ${SITE_URL}/munkafolyamatok/strategist-pro/kristofka-munkafolyamat`
  );
  lines.push("");

  for (const prod of products) {
    lines.push(`### ${stripMarkdown(prod.name)}`);
    lines.push(
      `- **Kanonikus URL:** ${SITE_URL}${prod.href} | **Kategória:** ${stripMarkdown(prod.category)}`
    );
    lines.push(`- **Leírás:** ${stripMarkdown(prod.description)}`);
    if (Array.isArray(prod.features) && prod.features.length > 0) {
      lines.push(
        `- **Kulcsfunkciók:** ${prod.features.map(stripMarkdown).join(" · ")}`
      );
    }
    lines.push(
      `- **Hozzáférés & Árazás:** Publikus specifikációs oldal; az interaktív AI generátor Ügyfélportál modul-jogosultsággal használható, egyedi árajánlat alapján (${SITE_URL}/kapcsolat).`
    );
    lines.push("");
  }

  // 5. Case Studies (14 HU + 14 EN)
  lines.push(
    `## Kiemelt Ügyfél-esettanulmányok & Mérhető Eredmények (${works.length} HU + ${works.length} EN esettanulmány)`
  );
  lines.push("");
  lines.push(
    `- **Portfólió Gyűjtőoldalak:** ${SITE_URL}/munkak (HU) | ${SITE_URL}/en/portfolio (EN)`
  );
  lines.push("");

  for (const w of works) {
    const enEntry = enCaseStudies[w.slug];
    lines.push(`### ${stripMarkdown(w.title)}`);
    lines.push(
      `- **URL (HU):** ${SITE_URL}/munkak/${w.slug} | **URL (EN):** ${SITE_URL}/en/portfolio/${w.slug}`
    );
    lines.push(
      `- **Ügyfél:** ${stripMarkdown(w.client || w.title)} (${w.year || ""}) — **Iparág / Kategória:** ${stripMarkdown(w.category)}${enEntry ? ` / ${stripMarkdown(enEntry.category)}` : ""}`
    );
    lines.push(`- **Összefoglaló (HU):** ${stripMarkdown(w.description)}`);
    if (w.challenge) {
      lines.push(`- **Üzleti kihívás:** ${stripMarkdown(w.challenge)}`);
    }
    if (w.solution) {
      lines.push(`- **Mérnöki és tervezői megoldás:** ${stripMarkdown(w.solution)}`);
    }
    if (Array.isArray(w.results) && w.results.length > 0) {
      lines.push(
        `- **Mérhető eredmények:** ${w.results.map(stripMarkdown).join(" | ")}`
      );
    }
    if (enEntry) {
      lines.push(
        `- **English Executive Summary:** ${stripMarkdown(enEntry.directAnswer)}`
      );
    }
    lines.push("");
  }

  // 6. Hungarian Knowledge Base (31 indexable MDX articles)
  lines.push(
    `## Szakmai Tudásbázis & Magyar Szakcikkek (${posts.length} indexelhető cikk)`
  );
  lines.push("");
  lines.push(`- **Tudásbázis Gyűjtőoldal (HU):** ${SITE_URL}/hirek`);
  lines.push("");
  for (const post of posts) {
    lines.push(`### ${post.title}`);
    lines.push(
      `- **Kanonikus URL:** ${SITE_URL}/hirek/${post.slug} | **Kategória:** ${post.category} | **Közzétéve:** ${post.date}${post.updatedAt ? ` | **Frissítve:** ${post.updatedAt}` : ""}`
    );
    if (post.tldr) {
      lines.push(`- **TL;DR Összefoglaló:** ${post.tldr}`);
    }
    if (post.faqs.length > 0) {
      for (const f of post.faqs.slice(0, 4)) {
        lines.push(`  - *GYIK — ${f.question}* ${f.answer}`);
      }
    }
    lines.push("");
  }

  // 7. English Cornerstone Insights (3 BOFU guides)
  lines.push(
    `## English Cornerstone Insights & Technical Guides (${enInsights.length} guides)`
  );
  lines.push("");
  lines.push(`- **Insights Hub (EN):** ${SITE_URL}/en/insights`);
  lines.push("");
  for (const guide of enInsights) {
    lines.push(`### ${stripMarkdown(guide.title)}`);
    lines.push(
      `- **Canonical URL:** ${SITE_URL}/en/insights/${guide.slug} | **Category:** ${stripMarkdown(guide.category)} | **Updated:** ${guide.updatedAt || guide.date}`
    );
    lines.push(`- **TL;DR Summary:** ${stripMarkdown(guide.tldr)}`);
    if (Array.isArray(guide.checklist) && guide.checklist.length > 0) {
      lines.push(
        `- **Key Actionable Checklist:** ${guide.checklist.map(stripMarkdown).join(" | ")}`
      );
    }
    if (Array.isArray(guide.faq)) {
      for (const f of guide.faq) {
        lines.push(`  - *FAQ — ${stripMarkdown(f.q)}* ${stripMarkdown(f.a)}`);
      }
    }
    lines.push("");
  }

  // 8. Homepage FAQs (HU & EN)
  lines.push("## Gyakori Kérdések — Főoldal (HU)");
  lines.push("");
  const huFaqs = (hu.home && hu.home.faq && hu.home.faq.items) || [];
  for (const faq of huFaqs) {
    lines.push(
      `- **${stripMarkdown(faq.question)}** ${stripMarkdown(faq.answer)}`
    );
  }
  lines.push("");

  lines.push("## Frequently Asked Questions — Home (EN)");
  lines.push("");
  const enFaqs = (en.home && en.home.faq && en.home.faq.items) || [];
  for (const faq of enFaqs) {
    lines.push(
      `- **${stripMarkdown(faq.question)}** ${stripMarkdown(faq.answer)}`
    );
  }

  return lines.join("\n").trimEnd() + "\n";
}

function main() {
  const hu = JSON.parse(
    fs.readFileSync(path.join(ROOT, "src/dictionaries/hu.json"), "utf8")
  );
  const en = JSON.parse(
    fs.readFileSync(path.join(ROOT, "src/dictionaries/en.json"), "utf8")
  );

  const { CATALOG_PRODUCTS: products = [] } = loadTsModule(
    "src/data/products-catalog.ts"
  );
  const { works = [] } = loadTsModule("src/data/works.ts");
  const { EN_CASE_STUDIES: enCaseStudies = {} } = loadTsModule(
    "src/data/caseStudiesEn.ts"
  );
  const { EN_INSIGHTS: enInsights = [] } = loadTsModule(
    "src/data/enInsights.ts"
  );

  const huServices = loadServiceSubpages(
    "src/app/szolgaltatasok",
    "/szolgaltatasok"
  );
  const enServices = loadServiceSubpages("src/app/en/services", "/en/services");
  const { indexable: posts, noindexSlugs } = loadMdxPosts();

  const context = {
    hu,
    en,
    huServices,
    enServices,
    products,
    works,
    enCaseStudies,
    posts,
    enInsights,
  };

  const llmsTxt = buildLlmsTxt(context);
  const llmsFullTxt = buildLlmsFullTxt(context);

  assertCleanOutput("public/llms.txt", llmsTxt, noindexSlugs);
  assertCleanOutput("public/llms-full.txt", llmsFullTxt, noindexSlugs);

  const llmsPath = path.join(ROOT, "public/llms.txt");
  const llmsFullPath = path.join(ROOT, "public/llms-full.txt");

  fs.writeFileSync(llmsPath, llmsTxt, { encoding: "utf8" });
  fs.writeFileSync(llmsFullPath, llmsFullTxt, { encoding: "utf8" });

  console.log(
    `[OK] public/llms.txt legenerálva (${Buffer.byteLength(llmsTxt, "utf8")} bájt, ${llmsTxt.split("\n").length} sor).`
  );
  console.log(
    `[OK] public/llms-full.txt legenerálva (${Buffer.byteLength(llmsFullTxt, "utf8")} bájt, ${llmsFullTxt.split("\n").length} sor | ${huServices.length} HU + ${enServices.length} EN szolgáltatás, ${products.length} termék, ${works.length} HU+EN esettanulmány, ${posts.length} HU + ${enInsights.length} EN szakcikk).`
  );
}

main();
