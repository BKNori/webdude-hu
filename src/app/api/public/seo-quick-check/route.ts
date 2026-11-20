import { NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit, getClientIdentifier } from "@/lib/rate-limit";
import {
  runLiveSeoQuickCheck,
  SsrfValidationError,
  UpstreamFetchError,
} from "@/lib/seoQuickCheck";

const requestSchema = z.object({
  url: z.string().trim().min(3, "URL is required").max(2048, "URL too long"),
  locale: z.enum(["hu", "en"]).optional(),
});

const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

export async function POST(request: Request) {
  const clientId = `seo-quick-check:${getClientIdentifier(request)}`;
  const rate = checkRateLimit(clientId, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS);

  if (!rate.success) {
    return NextResponse.json(
      {
        error:
          "Túl sok ellenőrzési kérés érkezett. Kérlek, próbáld újra néhány perc múlva.",
        errorEn:
          "Too many audit requests from this IP. Please try again in a few minutes.",
      },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Érvénytelen JSON kérés." },
      { status: 400 }
    );
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error:
          parsed.error.issues[0]?.message ?? "Érvénytelen URL paraméter.",
      },
      { status: 400 }
    );
  }

  const locale = parsed.data.locale ?? "hu";

  try {
    const report = await runLiveSeoQuickCheck(parsed.data.url, locale);
    return NextResponse.json(report, { status: 200 });
  } catch (err) {
    if (err instanceof SsrfValidationError) {
      return NextResponse.json(
        {
          error:
            locale === "en"
              ? `Blocked or invalid URL: ${err.message}`
              : `Tiltott vagy érvénytelen URL: ${err.message}`,
        },
        { status: 400 }
      );
    }

    if (err instanceof UpstreamFetchError) {
      return NextResponse.json(
        {
          error:
            locale === "en"
              ? `Could not audit URL: ${err.message}`
              : `A céloldal nem érhető el vagy hibát adott: ${err.message}`,
        },
        { status: 422 }
      );
    }

    return NextResponse.json(
      {
        error:
          locale === "en"
            ? "Unexpected error during SEO/AEO analysis."
            : "Váratlan hiba történt az elemzés során.",
      },
      { status: 500 }
    );
  }
}
