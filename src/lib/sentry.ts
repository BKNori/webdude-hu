import type { ErrorEvent, EventHint } from "@sentry/nextjs";

/** Érzékeny mezőnevek, amelyeket soha nem szabad a Sentry eseményekben továbbítani. */
const SENSITIVE_KEY_PATTERN =
  /(?:token|secret|password|passwd|api[-_]?key|auth(?:orization)?|cookie|set-cookie|credential|private[-_]?key|session|jwt|bearer|signature|email|phone|ssn)/i;

/** Érzékeny HTTP fejlécek kisbetűs nevei. */
const SENSITIVE_HEADER_KEYS = new Set([
  "authorization",
  "cookie",
  "set-cookie",
  "x-api-key",
  "x-auth-token",
  "x-forwarded-for",
  "x-real-ip",
  "proxy-authorization",
]);

/** Zajos, nem cselekvésképes böngésző/hálózati hibaminták kiszűrése. */
const NOISY_ERROR_PATTERNS = [
  /ResizeObserver loop limit exceeded/i,
  /ResizeObserver loop completed with undelivered notifications/i,
  /Non-Error promise rejection captured with value:\s*(?:undefined|null|""|Object Not Found Matching Id)/i,
  /The user aborted a request/i,
  /AbortError/i,
];

/** Harmadik féltől származó böngésző-bővítmény stack frame-ek azonosítása. */
const EXTENSION_FRAME_PATTERN =
  /^(?:chrome|moz|safari|webkit)-extension:\/\//i;

/**
 * Visszaadja az aktív Sentry DSN értéket, vagy `undefined`-ot, ha nincs konfigurálva.
 * Üres vagy hiányzó env esetén a Sentry csendesen inaktív (`enabled: false`).
 */
export function getSentryDsn(isServer = false): string | undefined {
  const raw = isServer
    ? process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN
    : process.env.NEXT_PUBLIC_SENTRY_DSN;
  const trimmed = raw?.trim();
  return trimmed ? trimmed : undefined;
}

/**
 * Érzékeny tokenek, API kulcsok és email címek kimaszkolása szövegből.
 */
export function scrubSensitiveString(value: string): string {
  return value
    .replace(/Bearer\s+[A-Za-z0-9\-._~+/]+=*/gi, "Bearer [REDACTED]")
    .replace(/\bAIza[0-9A-Za-z_-]{20,}\b/g, "[REDACTED_FIREBASE_KEY]")
    .replace(/\b(?:sk|gsk|tvly|whsec|pk|rk)_[A-Za-z0-9_-]{12,}\b/g, "[REDACTED_KEY]")
    .replace(/\bsk-[A-Za-z0-9_-]{16,}\b/g, "[REDACTED_KEY]")
    .replace(
      /([?&](?:token|key|api_key|apikey|secret|auth|password|sig)=)[^&\s]+/gi,
      "$1[REDACTED]"
    )
    .replace(
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
      "[REDACTED_EMAIL]"
    );
}

/**
 * Rekurzív PII- és titokszűrő struktúrált objektumokhoz (mélységkorláttal).
 */
export function sanitizeRecord(
  input: Record<string, unknown>,
  depth = 0
): Record<string, unknown> {
  if (depth > 4) return {};
  const result: Record<string, unknown> = {};

  for (const [key, val] of Object.entries(input)) {
    if (SENSITIVE_KEY_PATTERN.test(key)) {
      result[key] = "[REDACTED]";
      continue;
    }

    if (typeof val === "string") {
      result[key] = scrubSensitiveString(val);
    } else if (Array.isArray(val)) {
      result[key] = val.map((item) => {
        if (typeof item === "string") return scrubSensitiveString(item);
        if (item !== null && typeof item === "object" && !Array.isArray(item)) {
          return sanitizeRecord(item as Record<string, unknown>, depth + 1);
        }
        return item;
      });
    } else if (val !== null && typeof val === "object") {
      result[key] = sanitizeRecord(val as Record<string, unknown>, depth + 1);
    } else {
      result[key] = val;
    }
  }

  return result;
}

function isNoisyEvent(event: ErrorEvent, hint?: EventHint): boolean {
  const candidates: string[] = [];
  if (event.message) candidates.push(event.message);
  if (hint?.originalException instanceof Error) {
    candidates.push(hint.originalException.name, hint.originalException.message);
  }
  for (const val of event.exception?.values ?? []) {
    if (val.type) candidates.push(val.type);
    if (val.value) candidates.push(val.value);
    const frames = val.stacktrace?.frames ?? [];
    if (
      frames.length > 0 &&
      frames.every(
        (f) => typeof f.filename === "string" && EXTENSION_FRAME_PATTERN.test(f.filename)
      )
    ) {
      return true;
    }
  }

  return candidates.some((text) =>
    NOISY_ERROR_PATTERNS.some((pattern) => pattern.test(text))
  );
}

/**
 * Közös `beforeSend` szűrő a kliens, Node.js szerver és Edge futtatókörnyezetekhez:
 * - eldobja a zajos böngésző-/bővítmény-hibákat,
 * - törli a személyes felhasználói adatokat (PII),
 * - eltávolítja az Auth/Cookie fejléceket és kimaszkolja a kulcsokat/tokeneket.
 */
export function sentryBeforeSend(
  event: ErrorEvent,
  hint: EventHint
): ErrorEvent | null {
  if (isNoisyEvent(event, hint)) {
    return null;
  }

  if (event.user) {
    const safeUser = { ...event.user };
    delete safeUser.email;
    delete safeUser.ip_address;
    delete safeUser.username;
    if (Object.keys(safeUser).length === 0) {
      delete event.user;
    } else {
      event.user = safeUser;
    }
  }

  if (event.message) {
    event.message = scrubSensitiveString(event.message);
  }

  if (event.exception?.values) {
    event.exception.values = event.exception.values.map((ex) => ({
      ...ex,
      value: ex.value ? scrubSensitiveString(ex.value) : ex.value,
    }));
  }

  if (event.request) {
    if (event.request.headers) {
      const cleanedHeaders: Record<string, string> = {};
      for (const [k, v] of Object.entries(event.request.headers)) {
        cleanedHeaders[k] = SENSITIVE_HEADER_KEYS.has(k.toLowerCase())
          ? "[REDACTED]"
          : scrubSensitiveString(v);
      }
      event.request.headers = cleanedHeaders;
    }

    if (typeof event.request.url === "string") {
      event.request.url = scrubSensitiveString(event.request.url);
    }

    if (typeof event.request.query_string === "string") {
      event.request.query_string = scrubSensitiveString(
        event.request.query_string
      );
    }

    if (event.request.data !== undefined) {
      event.request.data = "[REDACTED]";
    }
  }

  if (event.extra) {
    event.extra = sanitizeRecord(event.extra);
  }

  if (event.breadcrumbs) {
    event.breadcrumbs = event.breadcrumbs.map((bc) => ({
      ...bc,
      message: bc.message ? scrubSensitiveString(bc.message) : bc.message,
      data:
        bc.data && typeof bc.data === "object"
          ? sanitizeRecord(bc.data)
          : bc.data,
    }));
  }

  return event;
}

/** Közös Sentry init alapkonfiguráció Server, Edge és Client futtatókörnyezetekhez. */
export function buildBaseSentryOptions(options: { isServer?: boolean } = {}) {
  const dsn = getSentryDsn(options.isServer ?? false);
  const isProd = process.env.NODE_ENV === "production";

  return {
    dsn,
    enabled: Boolean(dsn),
    environment:
      process.env.NEXT_PUBLIC_VERCEL_ENV ||
      process.env.NODE_ENV ||
      "development",
    sendDefaultPii: false,
    tracesSampleRate: isProd ? 0.1 : 0,
    beforeSend: sentryBeforeSend,
  };
}
