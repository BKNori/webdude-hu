"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { db } from "@/lib/firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { LighthouseMetrics, AuditResponse } from "@/types/lighthouse";
import { verifyUserToken } from "@/actions/portal";
import { checkRateLimit, getClientIdentifier } from "@/lib/rate-limit";

const lighthouseInputSchema = z.object({
  url: z
    .string()
    .trim()
    .min(8, "Kérlek, adj meg egy érvényes URL-t!")
    .max(2048, "Az URL túl hosszú."),
  clientId: z.string().trim().max(128).optional(),
});

function isPrivateOrLocalHostname(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/^\[|\]$/g, "");
  if (
    host === "localhost" ||
    host.endsWith(".localhost") ||
    host.endsWith(".local") ||
    host.endsWith(".internal") ||
    host === "0.0.0.0" ||
    host === "::" ||
    host === "::1"
  ) {
    return true;
  }

  // IPv4-mapped IPv6 (pl. ::ffff:127.0.0.1)
  const ipv4Candidate = host.startsWith("::ffff:") ? host.slice(7) : host;

  // IPv4 privát és fenntartott tartományok
  const ipv4Match = ipv4Candidate.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (ipv4Match) {
    const [, aStr, bStr, cStr, dStr] = ipv4Match;
    const [a, b, c, d] = [Number(aStr), Number(bStr), Number(cStr), Number(dStr)];
    if ([a, b, c, d].some((n) => n < 0 || n > 255)) return true;
    if (a === 10 || a === 127 || a === 0) return true;
    if (a === 169 && b === 254) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    if (a === 100 && b >= 64 && b <= 127) return true;
    return false;
  }

  // IPv6 ULA (fc00::/7) és link-local (fe80::/10)
  if (host.includes(":")) {
    if (/^(fc|fd|fe8|fe9|fea|feb)/i.test(host)) return true;
    return false;
  }

  // Nyilvános domain név követelmény (tartalmazzon legalább egy pontot)
  return !host.includes(".");
}

function validateSafePublicHttpUrl(rawUrl: string): string | null {
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return null;
    }
    if (parsed.username || parsed.password) {
      return null;
    }
    if (!parsed.hostname || isPrivateOrLocalHostname(parsed.hostname)) {
      return null;
    }
    return parsed.toString();
  } catch {
    return null;
  }
}

export async function runLighthouseAuditAction(
  url: string,
  clientId: string,
  idToken?: string
): Promise<AuditResponse> {
  // 1. Autentikáció
  const headersList = await headers();
  const authHeader = headersList.get("authorization");
  const token =
    idToken?.trim() ||
    (authHeader?.startsWith("Bearer ") ? authHeader.slice(7).trim() : "");

  if (!token) {
    return {
      success: false,
      error: "401 Unauthorized: Hitelesítés szükséges az audit futtatásához.",
    };
  }

  const user = await verifyUserToken(token);
  if (!user) {
    return {
      success: false,
      error: "401 Unauthorized: Érvénytelen vagy lejárt munkamenet.",
    };
  }

  // 2. Rate limit védelem
  const req = { headers: headersList } as unknown as Request;
  const identifier = getClientIdentifier(req);
  const rateLimitResult = checkRateLimit(
    `lighthouse:${user.uid}:${identifier}`,
    10,
    3600000
  );
  if (!rateLimitResult.success) {
    return {
      success: false,
      error: "429 Too Many Requests: Túl sok audit kérés. Kérlek, várj egy órát!",
    };
  }

  // 3. Zod + SSRF-biztos URL validáció
  const validation = lighthouseInputSchema.safeParse({ url, clientId });
  if (!validation.success) {
    return {
      success: false,
      error:
        validation.error.issues[0]?.message ||
        "Érvénytelen bemeneti paraméterek.",
    };
  }

  const safeUrl = validateSafePublicHttpUrl(validation.data.url);
  if (!safeUrl) {
    return {
      success: false,
      error:
        "Kérlek, érvényes, nyilvánosan elérhető HTTP/HTTPS URL-t adj meg (pl. https://pelda.hu)!",
    };
  }

  // 4. Firestore clientId védelem (csak superadmin írhat más ügyfél nevében)
  if (
    validation.data.clientId &&
    validation.data.clientId !== user.uid &&
    !user.isAdmin
  ) {
    return {
      success: false,
      error: "403 Forbidden: Nincs jogosultságod más ügyfélhez menteni.",
    };
  }
  const targetClientId =
    user.isAdmin && validation.data.clientId
      ? validation.data.clientId
      : user.uid;

  const apiKey = process.env.PAGESPEED_API_KEY;
  if (!apiKey) {
    return {
      success: false,
      error: "A Google PageSpeed API kulcs nincs beállítva a szerveren!",
    };
  }

  try {
    // 5. Google PageSpeed Insights API meghívása Desktop stratégiával
    const psiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
      safeUrl
    )}&category=performance&category=accessibility&category=best-practices&category=seo&strategy=desktop&key=${apiKey}`;

    // 1 órás Cache a visszaélések ellen (Anti-Drain Policy)
    const response = await fetch(psiUrl, { next: { revalidate: 3600 } });

    if (!response.ok) {
      throw new Error(`A PageSpeed API hibát jelzett: ${response.statusText}`);
    }

    const json = (await response.json()) as {
      lighthouseResult?: {
        categories?: {
          performance?: { score?: number };
          accessibility?: { score?: number };
          "best-practices"?: { score?: number };
          seo?: { score?: number };
        };
      };
    };
    const categories = json.lighthouseResult?.categories;

    if (!categories) {
      throw new Error("Sikertelen Lighthouse adatextrakció.");
    }

    // Adatok normalizálása 0-100-as skálára
    const metrics: LighthouseMetrics = {
      url: safeUrl,
      performance: Math.round((categories.performance?.score || 0) * 100),
      accessibility: Math.round((categories.accessibility?.score || 0) * 100),
      bestPractices: Math.round(
        (categories["best-practices"]?.score || 0) * 100
      ),
      seo: Math.round((categories.seo?.score || 0) * 100),
    };

    // 6. Mentés az ai_generations Firestore kollekcióba hitelesített clientId-val
    if (!db) {
      return { success: true, data: metrics };
    }

    await addDoc(collection(db, "ai_generations"), {
      clientId: targetClientId,
      toolId: "lighthouse_audit",
      toolName: "Lighthouse Weboldal Audit",
      inputValues: JSON.stringify({ url: safeUrl }),
      outputText: JSON.stringify(metrics),
      createdAt: Timestamp.now(),
    });

    return { success: true, data: metrics };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Váratlan hiba történt az audit futtatása során.";
    return {
      success: false,
      error: errorMessage,
    };
  }
}
