import dns from "node:dns";
import net from "node:net";

export type AuditLocale = "hu" | "en";
export type CheckCategory = "seo" | "aeo" | "geo";
export type CheckStatus = "pass" | "warn" | "fail";

export interface SeoCheckItem {
  id: string;
  category: CheckCategory;
  status: CheckStatus;
  score: number;
  maxScore: 10;
  title: string;
  summary: string;
  recommendation: string;
}

export interface SeoQuickCheckReport {
  checkedUrl: string;
  finalUrl: string;
  ttfbMs: number;
  totalScore: number;
  maxScore: 100;
  grade: "excellent" | "good" | "needs_work" | "critical";
  categoryScores: {
    seo: { score: number; max: number };
    aeo: { score: number; max: number };
    geo: { score: number; max: number };
  };
  checks: SeoCheckItem[];
  meta: {
    title: string;
    description: string;
    h1Count: number;
    jsonLdTypes: string[];
    blockedAiBots: string[];
    hasRobotsTxt: boolean;
    hasLlmsTxt: boolean;
  };
}

export class SsrfValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SsrfValidationError";
  }
}

export class UpstreamFetchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UpstreamFetchError";
  }
}

const MAX_HTML_BYTES = 1_048_576; // 1 MB
const MAX_AUX_BYTES = 262_144; // 256 KB (robots.txt / llms.txt)
const FETCH_TIMEOUT_MS = 6_000;
const MAX_REDIRECTS = 3;

const AI_BOT_NAMES = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "ClaudeBot",
] as const;

const BLOCKED_HOSTNAMES = new Set([
  "localhost",
  "localhost.localdomain",
  "ip6-localhost",
  "ip6-loopback",
  "metadata.google.internal",
  "metadata.goog",
]);

function normalizeIpv4(ip: string): number[] | null {
  const parts = ip.split(".");
  if (parts.length !== 4) return null;
  const nums = parts.map((p) => Number(p));
  if (nums.some((n) => !Number.isInteger(n) || n < 0 || n > 255)) return null;
  return nums;
}

function expandIpv6(rawIp: string): number[] | null {
  const ip = rawIp.split("%")[0].toLowerCase();
  if (!ip.includes(":")) return null;

  // Handle IPv4-mapped IPv6 suffix (e.g. ::ffff:127.0.0.1)
  const lastColon = ip.lastIndexOf(":");
  const tail = ip.slice(lastColon + 1);
  let normalized = ip;
  if (tail.includes(".")) {
    const ipv4 = normalizeIpv4(tail);
    if (!ipv4) return null;
    const hex1 = ((ipv4[0] << 8) | ipv4[1]).toString(16);
    const hex2 = ((ipv4[2] << 8) | ipv4[3]).toString(16);
    normalized = `${ip.slice(0, lastColon)}:${hex1}:${hex2}`;
  }

  const halves = normalized.split("::");
  if (halves.length > 2) return null;

  const left = halves[0] ? halves[0].split(":").filter(Boolean) : [];
  const right =
    halves.length === 2 && halves[1] ? halves[1].split(":").filter(Boolean) : [];

  if (halves.length === 1 && left.length !== 8) return null;
  const missing = 8 - (left.length + right.length);
  if (missing < 0) return null;

  const fullParts =
    halves.length === 2
      ? [...left, ...Array<string>(missing).fill("0"), ...right]
      : left;

  if (fullParts.length !== 8) return null;

  const hextets = fullParts.map((h) => parseInt(h, 16));
  if (hextets.some((n) => !Number.isInteger(n) || n < 0 || n > 0xffff)) {
    return null;
  }
  return hextets;
}

/**
 * Checks whether an IPv4 or IPv6 literal belongs to a private, loopback,
 * link-local, carrier-grade NAT, multicast or otherwise reserved address block.
 */
export function isPrivateOrReservedIp(ipInput: string): boolean {
  const clean = ipInput.trim().replace(/^\[|\]$/g, "").split("%")[0];
  const ipVersion = net.isIP(clean);
  if (ipVersion === 0) return true;

  if (ipVersion === 4) {
    const octets = normalizeIpv4(clean);
    if (!octets) return true;
    const [a, b, c] = octets;

    if (a === 0) return true; // 0.0.0.0/8 ("this network")
    if (a === 10) return true; // 10.0.0.0/8 (RFC1918)
    if (a === 100 && b >= 64 && b <= 127) return true; // 100.64.0.0/10 (CGNAT)
    if (a === 127) return true; // 127.0.0.0/8 (loopback)
    if (a === 169 && b === 254) return true; // 169.254.0.0/16 (link-local / cloud metadata)
    if (a === 172 && b >= 16 && b <= 31) return true; // 172.16.0.0/12 (RFC1918)
    if (a === 192 && b === 0 && c === 0) return true; // 192.0.0.0/24
    if (a === 192 && b === 0 && c === 2) return true; // 192.0.2.0/24 (TEST-NET-1)
    if (a === 192 && b === 168) return true; // 192.168.0.0/16 (RFC1918)
    if (a === 198 && (b === 18 || b === 19)) return true; // 198.18.0.0/15 (benchmark)
    if (a === 198 && b === 51 && c === 100) return true; // 198.51.100.0/24
    if (a === 203 && b === 0 && c === 113) return true; // 203.0.113.0/24
    if (a >= 224) return true; // multicast & reserved (224.0.0.0/4+)
    return false;
  }

  // IPv6 checks
  const hextets = expandIpv6(clean);
  if (!hextets) return true;

  const isAllZero = hextets.every((h) => h === 0);
  if (isAllZero) return true; // ::

  const isLoopback =
    hextets.slice(0, 7).every((h) => h === 0) && hextets[7] === 1;
  if (isLoopback) return true; // ::1

  // IPv4-mapped ::ffff:0:0/96
  const isV4Mapped =
    hextets[0] === 0 &&
    hextets[1] === 0 &&
    hextets[2] === 0 &&
    hextets[3] === 0 &&
    hextets[4] === 0 &&
    hextets[5] === 0xffff;
  if (isV4Mapped) {
    const a = (hextets[6] >> 8) & 0xff;
    const b = hextets[6] & 0xff;
    const c = (hextets[7] >> 8) & 0xff;
    const d = hextets[7] & 0xff;
    return isPrivateOrReservedIp(`${a}.${b}.${c}.${d}`);
  }

  // fc00::/7 (Unique Local Address)
  if ((hextets[0] & 0xfe00) === 0xfc00) return true;
  // fe80::/10 (Link-local)
  if ((hextets[0] & 0xffc0) === 0xfe80) return true;
  // ff00::/8 (Multicast)
  if ((hextets[0] & 0xff00) === 0xff00) return true;

  return false;
}

/**
 * Validates and normalizes user-supplied URL input for SSRF safety.
 * Does NOT perform DNS lookup (use `assertPublicHostResolvesSafely` for DNS verification).
 */
export function validatePublicUrl(rawInput: string): URL {
  const trimmed = rawInput.trim();
  if (!trimmed || trimmed.length > 2048) {
    throw new SsrfValidationError("Invalid or empty URL.");
  }

  const withScheme = /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  let parsed: URL;
  try {
    parsed = new URL(withScheme);
  } catch {
    throw new SsrfValidationError("Malformed URL format.");
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new SsrfValidationError("Only http and https URLs are supported.");
  }

  if (parsed.username || parsed.password) {
    throw new SsrfValidationError("Credentials inside URL are not allowed.");
  }

  const hostname = parsed.hostname.toLowerCase().replace(/^\[|\]$/g, "");
  if (
    !hostname ||
    BLOCKED_HOSTNAMES.has(hostname) ||
    hostname.endsWith(".localhost") ||
    hostname.endsWith(".local") ||
    hostname.endsWith(".internal") ||
    hostname.endsWith(".arpa")
  ) {
    throw new SsrfValidationError("Local or internal hostnames are blocked.");
  }

  if (net.isIP(hostname) !== 0) {
    if (isPrivateOrReservedIp(hostname)) {
      throw new SsrfValidationError("Private or reserved IP addresses are blocked.");
    }
  } else if (!hostname.includes(".")) {
    throw new SsrfValidationError("Public domain name is required.");
  }

  return parsed;
}

/**
 * Resolves the target hostname via DNS and verifies every returned IP is public.
 */
export async function assertPublicHostResolvesSafely(url: URL): Promise<void> {
  const hostname = url.hostname.replace(/^\[|\]$/g, "");
  if (net.isIP(hostname) !== 0) {
    if (isPrivateOrReservedIp(hostname)) {
      throw new SsrfValidationError("Private or reserved IP address blocked.");
    }
    return;
  }

  let records: dns.LookupAddress[];
  try {
    records = await dns.promises.lookup(hostname, { all: true });
  } catch {
    throw new UpstreamFetchError("Could not resolve domain DNS record.");
  }

  if (!records || records.length === 0) {
    throw new UpstreamFetchError("Domain DNS resolution returned no addresses.");
  }

  for (const rec of records) {
    if (isPrivateOrReservedIp(rec.address)) {
      throw new SsrfValidationError(
        "Resolved IP belongs to a private or reserved network."
      );
    }
  }
}

async function readResponseUpToLimit(
  response: Response,
  maxBytes: number
): Promise<string> {
  if (!response.body) return "";
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (!value) continue;

    if (totalBytes + value.byteLength > maxBytes) {
      const remaining = maxBytes - totalBytes;
      if (remaining > 0) {
        chunks.push(value.subarray(0, remaining));
      }
      await reader.cancel().catch(() => undefined);
      break;
    }

    chunks.push(value);
    totalBytes += value.byteLength;
  }

  const merged = new Uint8Array(
    chunks.reduce((acc, chunk) => acc + chunk.byteLength, 0)
  );
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return new TextDecoder("utf-8", { fatal: false }).decode(merged);
}

interface SafeFetchResult {
  finalUrl: string;
  status: number;
  body: string;
  ttfbMs: number;
}

async function safeFetchWithRedirects(
  initialUrl: URL,
  maxBytes: number,
  acceptHeader: string
): Promise<SafeFetchResult> {
  let currentUrl = initialUrl;
  const start = Date.now();

  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    await assertPublicHostResolvesSafely(currentUrl);

    let response: Response;
    try {
      response = await fetch(currentUrl.toString(), {
        method: "GET",
        redirect: "manual",
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
        headers: {
          "User-Agent":
            "WebDude-SEO-AEO-Checker/1.0 (+https://webdude.hu/ingyenes-seo-aeo-elemzes)",
          Accept: acceptHeader,
        },
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Network error";
      throw new UpstreamFetchError(`Target unreachable: ${msg}`);
    }

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      await response.body?.cancel().catch(() => undefined);
      if (!location) {
        throw new UpstreamFetchError("Redirect missing Location header.");
      }
      if (hop === MAX_REDIRECTS) {
        throw new UpstreamFetchError("Too many redirects (max 3 hops).");
      }
      currentUrl = validatePublicUrl(new URL(location, currentUrl).toString());
      continue;
    }

    const ttfbMs = Date.now() - start;
    const body = await readResponseUpToLimit(response, maxBytes);
    return {
      finalUrl: currentUrl.toString(),
      status: response.status,
      body,
      ttfbMs,
    };
  }

  throw new UpstreamFetchError("Too many redirects.");
}

function decodeHtmlEntities(input: string): string {
  return input
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stripTags(input: string): string {
  return decodeHtmlEntities(input.replace(/<[^>]+>/g, " "));
}

function getAttr(tag: string, attrName: string): string | null {
  const re = new RegExp(
    `\\b${attrName}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`,
    "i"
  );
  const m = tag.match(re);
  if (!m) return null;
  return decodeHtmlEntities(m[1] ?? m[2] ?? m[3] ?? "");
}

function extractMetaContent(html: string, attr: "name" | "property", value: string): string | null {
  const metaTags = html.match(/<meta\b[^>]*>/gi) ?? [];
  const targetLower = value.toLowerCase();
  for (const tag of metaTags) {
    const attrVal = getAttr(tag, attr);
    if (attrVal && attrVal.toLowerCase() === targetLower) {
      return getAttr(tag, "content");
    }
  }
  return null;
}

function extractCanonical(html: string): string | null {
  const linkTags = html.match(/<link\b[^>]*>/gi) ?? [];
  for (const tag of linkTags) {
    const rel = getAttr(tag, "rel");
    if (rel && rel.toLowerCase().split(/\s+/).includes("canonical")) {
      return getAttr(tag, "href");
    }
  }
  return null;
}

function collectJsonLdTypes(node: unknown, out: Set<string>): void {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    for (const item of node) collectJsonLdTypes(item, out);
    return;
  }
  const obj = node as Record<string, unknown>;
  const rawType = obj["@type"];
  if (typeof rawType === "string" && rawType.trim()) {
    out.add(rawType.trim());
  } else if (Array.isArray(rawType)) {
    for (const t of rawType) {
      if (typeof t === "string" && t.trim()) out.add(t.trim());
    }
  }
  for (const val of Object.values(obj)) {
    if (val && typeof val === "object") {
      collectJsonLdTypes(val, out);
    }
  }
}

export function analyzeRobotsAiAccess(robotsTxt: string | null): {
  hasRobotsTxt: boolean;
  blockedBots: string[];
} {
  if (!robotsTxt || !robotsTxt.trim()) {
    return { hasRobotsTxt: false, blockedBots: [] };
  }

  const groups: Array<{ agents: string[]; disallows: string[]; allows: string[] }> = [];
  let current: { agents: string[]; disallows: string[]; allows: string[] } | null = null;
  let seenDirectiveInGroup = false;

  for (const rawLine of robotsTxt.split(/\r?\n/)) {
    const line = rawLine.replace(/#.*$/, "").trim();
    if (!line) continue;

    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim().toLowerCase();
    const val = line.slice(colonIdx + 1).trim();

    if (key === "user-agent") {
      if (!current || seenDirectiveInGroup) {
        current = { agents: [], disallows: [], allows: [] };
        groups.push(current);
        seenDirectiveInGroup = false;
      }
      current.agents.push(val.toLowerCase());
    } else if (current) {
      seenDirectiveInGroup = true;
      if (key === "disallow" && val) {
        current.disallows.push(val);
      } else if (key === "allow" && val) {
        current.allows.push(val);
      }
    }
  }

  const blocked = new Set<string>();
  for (const bot of AI_BOT_NAMES) {
    const botLower = bot.toLowerCase();
    const specificGroups = groups.filter((g) => g.agents.includes(botLower));
    const wildcardGroups = groups.filter((g) => g.agents.includes("*"));
    const applicable = specificGroups.length > 0 ? specificGroups : wildcardGroups;

    for (const group of applicable) {
      const blocksRoot = group.disallows.some((rule) => rule === "/");
      const allowsRoot = group.allows.some((rule) => rule === "/");
      if (blocksRoot && !allowsRoot) {
        blocked.add(bot);
      }
    }
  }

  return {
    hasRobotsTxt: true,
    blockedBots: Array.from(blocked),
  };
}

export interface AnalyzeSeoAeoInput {
  checkedUrl: string;
  finalUrl: string;
  ttfbMs: number;
  html: string;
  robotsTxt: string | null;
  llmsTxt: string | null;
  locale?: AuditLocale;
}

const RICH_ENTITY_TYPES = new Set([
  "Organization",
  "LocalBusiness",
  "Person",
  "FAQPage",
  "Article",
  "TechArticle",
  "BlogPosting",
  "NewsArticle",
  "Product",
  "Service",
  "WebApplication",
  "SoftwareApplication",
  "HowTo",
  "BreadcrumbList",
]);

/**
 * Pure deterministic 10-check (0–100 pts) SEO + AEO + GEO HTML analyzer.
 */
export function analyzeSeoAeoHtml(input: AnalyzeSeoAeoInput): SeoQuickCheckReport {
  const locale: AuditLocale = input.locale === "en" ? "en" : "hu";
  const isEn = locale === "en";
  const html = input.html || "";

  // 1. HTTPS & Speed
  const isHttps = input.finalUrl.toLowerCase().startsWith("https://");
  const fastTtfb = input.ttfbMs < 1500;
  const httpsStatus: CheckStatus = !isHttps
    ? "fail"
    : fastTtfb
      ? "pass"
      : "warn";
  const httpsScore = !isHttps ? 0 : fastTtfb ? 10 : 6;

  // 2. Title
  const titleMatch = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  const titleText = titleMatch ? stripTags(titleMatch[1]) : "";
  const titleLen = titleText.length;
  const titleStatus: CheckStatus =
    titleLen === 0 ? "fail" : titleLen >= 30 && titleLen <= 65 ? "pass" : "warn";
  const titleScore = titleLen === 0 ? 0 : titleLen >= 30 && titleLen <= 65 ? 10 : 6;

  // 3. Meta Description
  const descText = extractMetaContent(html, "name", "description") ?? "";
  const descLen = descText.length;
  const descStatus: CheckStatus =
    descLen === 0 ? "fail" : descLen >= 100 && descLen <= 165 ? "pass" : "warn";
  const descScore = descLen === 0 ? 0 : descLen >= 100 && descLen <= 165 ? 10 : 6;

  // 4. H1 Count
  const h1Matches = Array.from(html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi));
  const nonEmptyH1s = h1Matches
    .map((m) => stripTags(m[1]))
    .filter((t) => t.length > 0);
  const h1Count = nonEmptyH1s.length;
  const h1Status: CheckStatus =
    h1Count === 1 ? "pass" : h1Count > 1 ? "warn" : "fail";
  const h1Score = h1Count === 1 ? 10 : h1Count > 1 ? 5 : 0;

  // 5. Canonical
  const canonicalHref = extractCanonical(html);
  const hasCanonical = Boolean(canonicalHref && canonicalHref.trim().length > 0);
  const canonicalStatus: CheckStatus = hasCanonical ? "pass" : "fail";
  const canonicalScore = hasCanonical ? 10 : 0;

  // 6. OpenGraph + Viewport
  const ogTitle = extractMetaContent(html, "property", "og:title");
  const ogDesc = extractMetaContent(html, "property", "og:description");
  const ogImg = extractMetaContent(html, "property", "og:image");
  const viewport = extractMetaContent(html, "name", "viewport");
  const socialParts = [ogTitle, ogDesc, ogImg, viewport].filter(
    (v) => Boolean(v && v.trim().length > 0)
  ).length;
  const ogStatus: CheckStatus =
    socialParts === 4 ? "pass" : socialParts >= 2 ? "warn" : "fail";
  const ogScore = socialParts === 4 ? 10 : socialParts >= 2 ? 5 : 0;

  // 7 & 8. JSON-LD & AEO Entities
  const ldJsonScripts = Array.from(
    html.matchAll(
      /<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
    )
  );
  let validJsonLdCount = 0;
  const foundTypes = new Set<string>();
  for (const match of ldJsonScripts) {
    const raw = (match[1] || "").trim();
    if (!raw) continue;
    try {
      const parsed: unknown = JSON.parse(raw);
      validJsonLdCount++;
      collectJsonLdTypes(parsed, foundTypes);
    } catch {
      // Malformed JSON-LD block
    }
  }

  const jsonLdTypes = Array.from(foundTypes);
  const jsonLdStatus: CheckStatus =
    validJsonLdCount > 0 ? "pass" : ldJsonScripts.length > 0 ? "warn" : "fail";
  const jsonLdScore =
    validJsonLdCount > 0 ? 10 : ldJsonScripts.length > 0 ? 3 : 0;

  const richCount = jsonLdTypes.filter((t) => RICH_ENTITY_TYPES.has(t)).length;
  const entityStatus: CheckStatus =
    richCount >= 2 ? "pass" : richCount === 1 ? "warn" : "fail";
  const entityScore = richCount >= 2 ? 10 : richCount === 1 ? 5 : 0;

  // 9. robots.txt AI-bot access
  const robotsInfo = analyzeRobotsAiAccess(input.robotsTxt);
  const robotsStatus: CheckStatus = !robotsInfo.hasRobotsTxt
    ? "warn"
    : robotsInfo.blockedBots.length === 0
      ? "pass"
      : "fail";
  const robotsScore = !robotsInfo.hasRobotsTxt
    ? 5
    : robotsInfo.blockedBots.length === 0
      ? 10
      : 0;

  // 10. llms.txt
  const llmsClean = (input.llmsTxt || "").trim();
  const looksLikeHtml = /^<!doctype\s+html|<html\b/i.test(llmsClean);
  const hasLlmsTxt = llmsClean.length >= 20 && !looksLikeHtml;
  const llmsStatus: CheckStatus = hasLlmsTxt ? "pass" : "fail";
  const llmsScore = hasLlmsTxt ? 10 : 0;

  const checks: SeoCheckItem[] = [
    {
      id: "https-speed",
      category: "seo",
      status: httpsStatus,
      score: httpsScore,
      maxScore: 10,
      title: isEn ? "HTTPS & Server TTFB Speed" : "HTTPS & Szerver válaszidő (TTFB)",
      summary: isEn
        ? `${isHttps ? "HTTPS active" : "Insecure HTTP"} · TTFB: ${input.ttfbMs} ms`
        : `${isHttps ? "Aktív HTTPS" : "Nem biztonságos HTTP"} · TTFB: ${input.ttfbMs} ms`,
      recommendation:
        httpsStatus === "pass"
          ? isEn
            ? "Strong TLS encryption and fast initial server response."
            : "Megfelelő HTTPS titkosítás és gyors első bájt válaszidő."
          : isEn
            ? "Enforce HTTPS and target TTFB under 1500 ms with SSR/caching."
            : "Kötelező az SSL/HTTPS használata és az 1500 ms alatti TTFB elérése gyorsítótárazással vagy Next.js SSR-rel.",
    },
    {
      id: "title-tag",
      category: "seo",
      status: titleStatus,
      score: titleScore,
      maxScore: 10,
      title: isEn ? "HTML <title> Tag" : "HTML <title> Címke",
      summary:
        titleLen > 0
          ? isEn
            ? `Found (${titleLen} chars): "${titleText.slice(0, 70)}"`
            : `Találat (${titleLen} karakter): „${titleText.slice(0, 70)}”`
          : isEn
            ? "No <title> element found."
            : "Hiányzik a <title> elem az oldalból.",
      recommendation:
        titleStatus === "pass"
          ? isEn
            ? "Optimal title length for Google SERP snippets."
            : "Optimális címsorhossz a Google találati listájához (30–65 karakter)."
          : isEn
            ? "Use a unique 30–65 character <title> containing your primary service and brand."
            : "Használj egyedi, 30–65 karakteres <title> címet a fő kulcsszóval és márkanévvel.",
    },
    {
      id: "meta-description",
      category: "seo",
      status: descStatus,
      score: descScore,
      maxScore: 10,
      title: isEn ? "Meta Description" : "Meta Leírás (Description)",
      summary:
        descLen > 0
          ? isEn
            ? `Found (${descLen} characters).`
            : `Megadva (${descLen} karakter).`
          : isEn
            ? "Missing <meta name='description'> tag."
            : "Hiányzik a <meta name='description'> címke.",
      recommendation:
        descStatus === "pass"
          ? isEn
            ? "Ideal length for search snippets and CTR."
            : "Ideális hosszúság az átkattintási arány (CTR) maximalizálásához."
          : isEn
            ? "Write a clear 100–165 character summary with a value proposition."
            : "Adj meg egy tömör, cselekvésre ösztönző 100–165 karakteres leírást.",
    },
    {
      id: "h1-heading",
      category: "seo",
      status: h1Status,
      score: h1Score,
      maxScore: 10,
      title: isEn ? "Single <h1> Heading Hierarchy" : "Egyetlen <h1> Címsor Hierarchia",
      summary: isEn
        ? `Detected ${h1Count} <h1> element(s).`
        : `Észlelt <h1> elemek száma: ${h1Count} db.`,
      recommendation:
        h1Status === "pass"
          ? isEn
            ? "Clean document outline with one primary <h1>."
            : "Tiszta HTML hierarchia: pontosan egy fő <h1> címsor van az oldalon."
          : isEn
            ? "Ensure each page renders exactly one descriptive <h1> heading."
            : "Gondoskodj róla, hogy oldalanként pontosan egy egyedi <h1> címsor szerepeljen.",
    },
    {
      id: "canonical-link",
      category: "seo",
      status: canonicalStatus,
      score: canonicalScore,
      maxScore: 10,
      title: isEn ? "Canonical URL (<link rel='canonical'>)" : "Kanonikus URL (<link rel='canonical'>)",
      summary: hasCanonical
        ? isEn
          ? `Canonical set: ${canonicalHref}`
          : `Beállítva: ${canonicalHref}`
        : isEn
          ? "No canonical tag found."
          : "Hiányzik a canonical hivatkozás.",
      recommendation:
        hasCanonical
          ? isEn
            ? "Duplicate URL indexing risk is mitigated."
            : "A duplikált URL-ek indexelési kockázata védve van."
          : isEn
            ? "Add an absolute self-referencing <link rel='canonical'> tag."
            : "Adj meg abszolút önmagára mutató <link rel='canonical'> címkét minden publikus oldalon.",
    },
    {
      id: "og-viewport",
      category: "seo",
      status: ogStatus,
      score: ogScore,
      maxScore: 10,
      title: isEn ? "OpenGraph & Mobile Viewport" : "OpenGraph & Mobil Viewport",
      summary: isEn
        ? `${socialParts}/4 signals present (og:title, og:description, og:image, viewport).`
        : `${socialParts}/4 jelzés megvan (og:title, og:description, og:image, viewport).`,
      recommendation:
        ogStatus === "pass"
          ? isEn
            ? "Complete social share preview and responsive viewport configuration."
            : "Teljes közösségi megosztási előnézet és mobil viewport beállítás."
          : isEn
            ? "Provide og:title, og:description, og:image (1200x630), and meta viewport."
            : "Pótold a hiányzó OpenGraph mezőket és a reszponzív viewport meta címkét.",
    },
    {
      id: "json-ld",
      category: "aeo",
      status: jsonLdStatus,
      score: jsonLdScore,
      maxScore: 10,
      title: isEn ? "Schema.org JSON-LD Structured Data" : "Schema.org JSON-LD Strukturált Adat",
      summary:
        validJsonLdCount > 0
          ? isEn
            ? `${validJsonLdCount} valid JSON-LD block(s) detected.`
            : `${validJsonLdCount} érvényes JSON-LD séma blokk észlelve.`
          : isEn
            ? "No valid JSON-LD structured data detected in server HTML."
            : "Nem található érvényes szerveroldali JSON-LD adat a HTML-ben.",
      recommendation:
        jsonLdStatus === "pass"
          ? isEn
            ? "Search engines and AI parsers can read machine-structured page metadata."
            : "A Google és az AI keresők gépileg feldolgozható adatokat kapnak."
          : isEn
            ? "Render valid JSON-LD <script type='application/ld+json'> blocks server-side."
            : "Renderelj szerveroldalon érvényes JSON-LD blokkokat a jobb AEO/Rich Result láthatóságért.",
    },
    {
      id: "aeo-entities",
      category: "aeo",
      status: entityStatus,
      score: entityScore,
      maxScore: 10,
      title: isEn ? "AI / AEO Rich Entity Knowledge Graph" : "AI / AEO Gazdag Entitás Tudásgráf",
      summary:
        jsonLdTypes.length > 0
          ? isEn
            ? `Types: ${jsonLdTypes.join(", ")}`
            : `Talált típusok: ${jsonLdTypes.join(", ")}`
          : isEn
            ? "No Organization, Person, FAQPage, or Article entities found."
            : "Nincs Organization, Person, FAQPage vagy Article entitás.",
      recommendation:
        entityStatus === "pass"
          ? isEn
            ? "Rich entity types improve E-E-A-T trust and answer-engine citations."
            : "A gazdag entitástípusok erősítik az E-E-A-T hitelességet és az AI idézettséget."
          : isEn
            ? "Connect Organization/Person, Service/Product, and FAQPage schemas with persistent @id anchors."
            : "Kapcsolj össze Organization/Person, Service és FAQPage sémákat tartós @id horgonyokkal.",
    },
    {
      id: "robots-ai-bots",
      category: "geo",
      status: robotsStatus,
      score: robotsScore,
      maxScore: 10,
      title: isEn ? "robots.txt & AI Crawler Access" : "robots.txt & AI-Bot Hozzáférés",
      summary: !robotsInfo.hasRobotsTxt
        ? isEn
          ? "No robots.txt file found at origin."
          : "Nem található robots.txt a domain gyökerében."
        : robotsInfo.blockedBots.length === 0
          ? isEn
            ? "GPTBot, PerplexityBot, ClaudeBot & OAI-SearchBot are permitted."
            : "A GPTBot, PerplexityBot, ClaudeBot és OAI-SearchBot robotok engedélyezve vannak."
          : isEn
            ? `Blocked AI bots: ${robotsInfo.blockedBots.join(", ")}`
            : `Tiltott AI robotok: ${robotsInfo.blockedBots.join(", ")}`,
      recommendation:
        robotsStatus === "pass"
          ? isEn
            ? "AI answer engines can crawl your public content without friction."
            : "Az AI keresőmotorok akadály nélkül indexelhetik a nyilvános tartalmaidat."
          : isEn
            ? "Serve a clean robots.txt allowing major AI search bots on public pages."
            : "Hozz létre tiszta robots.txt fájlt, amely engedélyezi a nyilvános tartalmakat az AI keresőbotoknak.",
    },
    {
      id: "llms-txt",
      category: "geo",
      status: llmsStatus,
      score: llmsScore,
      maxScore: 10,
      title: isEn ? "llms.txt AI Discovery File" : "llms.txt AI-Készségi Fájl (GEO)",
      summary: hasLlmsTxt
        ? isEn
          ? `/llms.txt found (${llmsClean.length} chars).`
          : `/llms.txt elérhető (${llmsClean.length} karakter).`
        : isEn
          ? "/llms.txt missing or returns HTML."
          : "A /llms.txt fájl hiányzik vagy HTML-t ad vissza.",
      recommendation:
        hasLlmsTxt
          ? isEn
            ? "Your domain exposes structured Markdown context for AI agents."
            : "A domained tiszta Markdown kontextust kínál az AI ügynökök számára."
          : isEn
            ? "Publish /llms.txt summarizing core services, authority proof, and canonical URLs."
            : "Készíts /llms.txt fájlt a fő szolgáltatásokkal, szakértői adatokkal és kanonikus linkekkel.",
    },
  ];

  const sumBy = (cat: CheckCategory) =>
    checks
      .filter((c) => c.category === cat)
      .reduce((acc, c) => acc + c.score, 0);

  const seoScore = sumBy("seo");
  const aeoScore = sumBy("aeo");
  const geoScore = sumBy("geo");
  const totalScore = seoScore + aeoScore + geoScore;

  const grade: SeoQuickCheckReport["grade"] =
    totalScore >= 85
      ? "excellent"
      : totalScore >= 65
        ? "good"
        : totalScore >= 40
          ? "needs_work"
          : "critical";

  return {
    checkedUrl: input.checkedUrl,
    finalUrl: input.finalUrl,
    ttfbMs: input.ttfbMs,
    totalScore,
    maxScore: 100,
    grade,
    categoryScores: {
      seo: { score: seoScore, max: 60 },
      aeo: { score: aeoScore, max: 20 },
      geo: { score: geoScore, max: 20 },
    },
    checks,
    meta: {
      title: titleText,
      description: descText,
      h1Count,
      jsonLdTypes,
      blockedAiBots: robotsInfo.blockedBots,
      hasRobotsTxt: robotsInfo.hasRobotsTxt,
      hasLlmsTxt,
    },
  };
}

/**
 * Runs a full live deterministic SEO + AEO + GEO audit against a public URL
 * with strict SSRF protection, DNS verification, 6s timeouts and 1 MB body cap.
 */
export async function runLiveSeoQuickCheck(
  rawUrl: string,
  locale: AuditLocale = "hu"
): Promise<SeoQuickCheckReport> {
  const initialUrl = validatePublicUrl(rawUrl);
  const pageRes = await safeFetchWithRedirects(
    initialUrl,
    MAX_HTML_BYTES,
    "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8"
  );

  if (pageRes.status >= 400) {
    throw new UpstreamFetchError(
      `Target returned HTTP ${pageRes.status} status.`
    );
  }

  const origin = new URL(pageRes.finalUrl).origin;

  const [robotsResult, llmsResult] = await Promise.allSettled([
    safeFetchWithRedirects(
      validatePublicUrl(`${origin}/robots.txt`),
      MAX_AUX_BYTES,
      "text/plain,*/*;q=0.8"
    ),
    safeFetchWithRedirects(
      validatePublicUrl(`${origin}/llms.txt`),
      MAX_AUX_BYTES,
      "text/plain,text/markdown,*/*;q=0.8"
    ),
  ]);

  const robotsTxt =
    robotsResult.status === "fulfilled" && robotsResult.value.status < 400
      ? robotsResult.value.body
      : null;

  const llmsTxt =
    llmsResult.status === "fulfilled" && llmsResult.value.status < 400
      ? llmsResult.value.body
      : null;

  return analyzeSeoAeoHtml({
    checkedUrl: initialUrl.toString(),
    finalUrl: pageRes.finalUrl,
    ttfbMs: pageRes.ttfbMs,
    html: pageRes.body,
    robotsTxt,
    llmsTxt,
    locale,
  });
}
