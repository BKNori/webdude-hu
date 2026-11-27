/**
 * @jest-environment node
 */
import fs from "fs";
import path from "path";
import { buildEnJsonLd, buildHuJsonLd } from "@/lib/structuredData";
import { getDictionary } from "@/lib/dictionary";

const ROOT = process.cwd();

function walkTsFiles(dir: string, acc: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkTsFiles(full, acc);
    else if (/\.(ts|tsx)$/.test(entry.name)) acc.push(full);
  }
  return acc;
}

describe("Technikai SEO, JSON-LD & GSC regressziós audit", () => {
  const appFiles = walkTsFiles(path.join(ROOT, "src/app"));

  it("a gyökér layout.tsx nem tartalmaz hardcoded canonical vagy languages öröklést", () => {
    const rootLayout = fs.readFileSync(
      path.join(ROOT, "src/app/layout.tsx"),
      "utf8"
    );
    expect(rootLayout).not.toMatch(/canonical\s*:/);
    expect(rootLayout).not.toMatch(/languages\s*:/);
    expect(rootLayout).toContain("buildGaConsentInitScript");
  });

  it("az /admin/layout.tsx Server Component és noindex, nofollow direktívát exportál", () => {
    const adminLayout = fs.readFileSync(
      path.join(ROOT, "src/app/admin/layout.tsx"),
      "utf8"
    );
    expect(adminLayout).not.toMatch(/^["']use client["']/m);
    expect(adminLayout).toMatch(/index\s*:\s*false/);
    expect(adminLayout).toMatch(/follow\s*:\s*false/);
  });

  it("egyetlen /en/**/layout.tsx sem renderel buildEnJsonLd főoldali sémát (0 duplikált séma aloldalakon)", () => {
    const enLayouts = appFiles.filter(
      (f) =>
        f.includes(`${path.sep}en${path.sep}`) &&
        f.endsWith(`${path.sep}layout.tsx`)
    );
    expect(enLayouts.length).toBeGreaterThanOrEqual(8);
    for (const layoutFile of enLayouts) {
      const content = fs.readFileSync(layoutFile, "utf8");
      expect(content).not.toContain("buildEnJsonLd");
    }
  });

  it("buildHuJsonLd és buildEnJsonLd érvényes sémákat generál Zéró Fix Árral és nyelvhelyes adatokkal", async () => {
    const [huDict, enDict] = await Promise.all([
      getDictionary("hu"),
      getDictionary("en"),
    ]);

    const huSchemas = buildHuJsonLd(huDict);
    const enSchemas = buildEnJsonLd(enDict);

    for (const schemas of [huSchemas, enSchemas]) {
      const types = schemas.map((s) => s["@type"]);
      expect(types).toContain("Organization");
      expect(types).toContain("Person");
      expect(types).toContain("Service");
      expect(types).toContain("BreadcrumbList");
      expect(types).toContain("FAQPage");
      const serialized = JSON.stringify(schemas);
      expect(serialized).not.toMatch(/priceRange|\bFt\b|\bHUF\b|\bEUR\b/i);
    }

    const enPerson = enSchemas.find((s) => s["@type"] === "Person");
    const enOrg = enSchemas.find((s) => s["@type"] === "Organization");
    expect(enPerson?.url).toBe("https://webdude.hu/en/about");
    expect(
      (enOrg?.founder as Record<string, unknown> | undefined)?.jobTitle
    ).toBe("Full-Stack Web Developer, Art Director & AI Automation Specialist");
  });

  it("minden /szolgaltatasok/* oldal tartalmaz Service, FAQPage és BreadcrumbList/BreadcrumbSchema jelölést", () => {
    const svcDir = path.join(ROOT, "src/app/szolgaltatasok");
    const dirs = fs
      .readdirSync(svcDir, { withFileTypes: true })
      .filter((d) => d.isDirectory());

    expect(dirs.length).toBe(24);
    for (const dir of dirs) {
      const pageFile = path.join(svcDir, dir.name, "page.tsx");
      const content = fs.readFileSync(pageFile, "utf8");
      expect(content).toMatch(/"@type"\s*:\s*"Service"/);
      expect(content).toMatch(/"@type"\s*:\s*"FAQPage"/);
      expect(content).toMatch(
        /BreadcrumbList|buildBreadcrumbSchema|BreadcrumbSchema/
      );
    }
  });

  it("0 nem létező /og/* vagy /banners/* hivatkozás, 0 hibás belső link és 0 felesleges VideoObject", () => {
    for (const file of appFiles) {
      const content = fs.readFileSync(file, "utf8");
      expect(content).not.toContain("/og/ai-muhely.jpg");
      expect(content).not.toContain("/og/webdude-portfolio-og.jpg");
      expect(content).not.toContain(
        '"/banners/wordpress-weboldalak-keszitese-grafikai-tervezes.webp"'
      );
      expect(content).not.toContain('href="/bejelentkezes"');
      expect(content).not.toContain('href="/regisztracio"');
      expect(content).not.toContain(
        'href="/szolgaltatasok/wordpress-virusirtas-es-biztonsag"'
      );
      expect(content).not.toContain('"@type": "VideoObject"');
      expect(content).not.toContain('"@type":"VideoObject"');
    }
  });
});
