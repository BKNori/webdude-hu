/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Determinisztikus `public/llms-full.txt` generátor (0 AI-token költség).
 *
 * Források (SSOT):
 *  - src/dictionaries/hu.json & en.json (fő szolgáltatások + AEO FAQ)
 *  - src/data/works.ts (kiemelt esettanulmányok és mérhető eredmények)
 *  - src/content/blog/*.mdx (indexelhető cikkek TL;DR kivonata + kulcs-GYIK)
 *
 * Szabályok: UTF-8 kódolás, Zéró Fix Ár, E-E-A-T (26+ év grafika, 16+ év dev).
 */

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const matter = require("gray-matter");

const ROOT = path.resolve(__dirname, "..");
const SITE_URL = "https://webdude.hu";

function stripMarkdown(text) {
  return String(text || "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[`*_~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function loadWorks() {
  const raw = fs.readFileSync(path.join(ROOT, "src/data/works.ts"), "utf8");
  const jsSource = raw
    .replace(/^\s*import\s+[\s\S]*?from\s+["'][^"']+["'];?\s*/gm, "")
    .replace(/export\s+const\s+works:\s*Work\[\]\s*=/, "works =");
  const sandbox = { works: [] };
  vm.runInNewContext(jsSource, sandbox);
  return Array.isArray(sandbox.works) ? sandbox.works : [];
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

function loadIndexablePosts() {
  const blogDir = path.join(ROOT, "src/content/blog");
  const files = fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith(".mdx"))
    .sort();
  const posts = [];

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(blogDir, file), "utf8");
    const { data, content } = matter(raw);
    if (data.noindex === true || data.noindex === "true") continue;

    posts.push({
      slug,
      title: String(data.title || slug),
      date: data.date ? String(data.date).split("T")[0] : "",
      updatedAt: data.updatedAt ? String(data.updatedAt).split("T")[0] : "",
      category: String(data.category || "Szakmai cikk"),
      tldr: stripMarkdown(data.tldr || data.excerpt || data.description || ""),
      faqs: extractFaqFromMdx(data.faq, content),
    });
  }

  return posts.sort((a, b) => (b.date > a.date ? 1 : -1));
}

function main() {
  const hu = JSON.parse(
    fs.readFileSync(path.join(ROOT, "src/dictionaries/hu.json"), "utf8")
  );
  const en = JSON.parse(
    fs.readFileSync(path.join(ROOT, "src/dictionaries/en.json"), "utf8")
  );
  const works = loadWorks();
  const posts = loadIndexablePosts();

  const lines = [];
  lines.push("# WebDude — Teljes AI Kontextus & Szakmai Tudásbázis (llms-full.txt)");
  lines.push("");
  lines.push(
    "> Balog Norbert (WebDude) egyéni webfejlesztő, art director és AI automatizációs szakember: 26+ év tervezőgrafikai és 16+ év full-stack webfejlesztői tapasztalattal."
  );
  lines.push(
    "> Közvetlen kivitelezés ügynökségi közvetítők nélkül — országosan magyarul (`https://webdude.hu`) és távmunkában nemzetközi ügyfeleknek angolul (`https://webdude.hu/en`). Minden projekt egyedi árajánlat alapján indul (Zéró Fix Ár politika)."
  );
  lines.push("");
  lines.push("## Kapcsolat & Kanonikus Entitások");
  lines.push("");
  lines.push("- **Márkanév / Szervezet:** WebDude (`https://webdude.hu/#organization`)");
  lines.push("- **Szakértő / Alapító:** Balog Norbert (`https://webdude.hu/#person`)");
  lines.push("- **Alapítva:** 2009 (webfejlesztői gyakorlat), 26+ év grafikai tervezés, 16+ év webfejlesztés");
  lines.push("- **Weboldal (HU):** https://webdude.hu");
  lines.push("- **Weboldal (EN):** https://webdude.hu/en");
  lines.push("- **Rólam (HU / EN):** https://webdude.hu/szia-norbi-vagyok | https://webdude.hu/en/about");
  lines.push("- **Ingyenes SEO & AI-Készség Ellenőrző (HU / EN):** https://webdude.hu/ingyenes-seo-aeo-elemzes | https://webdude.hu/en/free-seo-aeo-checker");
  lines.push("- **Kapcsolat (HU / EN):** https://webdude.hu/kapcsolat | https://webdude.hu/en/contact");
  lines.push("- **Jogi oldalak (HU / EN):** https://webdude.hu/adatvedelmi-szabalyzat | https://webdude.hu/en/privacy-policy | https://webdude.hu/felhasznalasi-feltetelek | https://webdude.hu/en/terms");
  lines.push("- **Email:** hello@webdude.hu | **Telefon:** +36 70 323 8003");
  lines.push("- **RSS 2.0 Feed:** https://webdude.hu/feed.xml");
  lines.push("- **Rövid AI áttekintő:** https://webdude.hu/llms.txt");
  lines.push("");

  // HU + EN Szolgáltatások
  lines.push("## Szolgáltatások (Magyar — HU)");
  lines.push("");
  const huServices = (hu.home && hu.home.services && hu.home.services.items) || [];
  for (const item of huServices) {
    const href = item.href ? `${SITE_URL}${item.href}` : `${SITE_URL}/szolgaltatasok`;
    lines.push(`### ${item.title}`);
    lines.push(`- **URL:** ${href}`);
    lines.push(`- **Összefoglaló:** ${stripMarkdown(item.description)}`);
    if (Array.isArray(item.bullets) && item.bullets.length > 0) {
      lines.push(`- **Főbb jellemzők:** ${item.bullets.map(stripMarkdown).join(" · ")}`);
    }
    lines.push("");
  }

  lines.push("## Core Services (English — EN)");
  lines.push("");
  const enServices = (en.home && en.home.services && en.home.services.items) || [];
  for (const item of enServices) {
    const href = item.href ? `${SITE_URL}${item.href}` : `${SITE_URL}/en/services`;
    lines.push(`### ${item.title}`);
    lines.push(`- **URL:** ${href}`);
    lines.push(`- **Summary:** ${stripMarkdown(item.description)}`);
    if (Array.isArray(item.bullets) && item.bullets.length > 0) {
      lines.push(`- **Key deliverables:** ${item.bullets.map(stripMarkdown).join(" · ")}`);
    }
    lines.push("");
  }

  // Esettanulmányok
  lines.push("## Kiemelt Ügyfél-esettanulmányok & Mérhető Eredmények");
  lines.push("");
  for (const w of works) {
    lines.push(`### ${w.title}`);
    lines.push(`- **URL (HU):** ${SITE_URL}/munkak/${w.slug} | **URL (EN):** ${SITE_URL}/en/portfolio/${w.slug}`);
    lines.push(`- **Ügyfél:** ${w.client || w.title} (${w.year || ""}) — **Kategória:** ${w.category}`);
    lines.push(`- **Leírás:** ${stripMarkdown(w.description)}`);
    if (Array.isArray(w.results) && w.results.length > 0) {
      lines.push(`- **Eredmények:** ${w.results.map(stripMarkdown).join(" | ")}`);
    }
    lines.push("");
  }

  // Főoldali GYIK (HU + EN)
  lines.push("## Gyakori Kérdések — Főoldal (HU)");
  lines.push("");
  const huFaqs = (hu.home && hu.home.faq && hu.home.faq.items) || [];
  for (const faq of huFaqs) {
    lines.push(`- **${stripMarkdown(faq.question)}** ${stripMarkdown(faq.answer)}`);
  }
  lines.push("");

  lines.push("## Frequently Asked Questions — Home (EN)");
  lines.push("");
  const enFaqs = (en.home && en.home.faq && en.home.faq.items) || [];
  for (const faq of enFaqs) {
    lines.push(`- **${stripMarkdown(faq.question)}** ${stripMarkdown(faq.answer)}`);
  }
  lines.push("");

  // Blog cikkek (TL;DR + FAQ)
  lines.push(`## Szakmai Tudásbázis & Cikkek (${posts.length} indexelhető cikk)`);
  lines.push("");
  for (const post of posts) {
    lines.push(`### ${post.title}`);
    lines.push(
      `- **URL:** ${SITE_URL}/hirek/${post.slug} | **Kategória:** ${post.category} | **Dátum:** ${post.date}${post.updatedAt ? ` (frissítve: ${post.updatedAt})` : ""}`
    );
    if (post.tldr) {
      lines.push(`- **TL;DR:** ${post.tldr}`);
    }
    if (post.faqs.length > 0) {
      for (const f of post.faqs.slice(0, 3)) {
        lines.push(`  - *GYIK — ${f.question}* ${f.answer}`);
      }
    }
    lines.push("");
  }

  const output = lines.join("\n").trimEnd() + "\n";

  // Zéró Fix Ár ellenőrzés
  const priceMatch = output.match(/\b\d[\d\s.,]*\s*(?:Ft|HUF|EUR|USD|€|\$)\b/i);
  if (priceMatch) {
    throw new Error(
      `Zéró Fix Ár sértés az llms-full.txt kimenetben: "${priceMatch[0]}"`
    );
  }

  const outPath = path.join(ROOT, "public/llms-full.txt");
  fs.writeFileSync(outPath, output, "utf8");
  console.log(
    `[OK] public/llms-full.txt legenerálva (${posts.length} cikk, ${works.length} esettanulmány, ${Buffer.byteLength(output, "utf8")} bájt).`
  );
}

main();
