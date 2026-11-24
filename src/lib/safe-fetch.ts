/**
 * SSRF-protected text fetcher (zero external dependencies).
 *
 * Every hop (initial request + each redirect) is fully validated:
 *  - protocol: http/https only, no credentials, no local hostnames
 *  - DNS: every resolved IPv4/IPv6 address must be public
 *  - redirects: `redirect: "manual"`, max `maxRedirects` hops
 *  - timeout: AbortSignal.timeout per hop
 *  - body: streamed, hard-capped (default 1 MiB), decoded to string
 */
import { lookup } from "dns/promises";

export interface SafeFetchOptions {
  maxRedirects?: number;
  timeoutMs?: number;
  maxBytes?: number;
  headers?: Record<string, string>;
}

const DEFAULT_MAX_REDIRECTS = 3;
const DEFAULT_TIMEOUT_MS = 8000;
const DEFAULT_MAX_BYTES = 1_048_576;
const REDIRECT_STATUSES = new Set([301, 302, 303, 307, 308]);

// ---------------------------------------------------------------- IPv4 ----

/** [base, prefixLength] blocked IPv4 ranges. */
const BLOCKED_IPV4: ReadonlyArray<readonly [number, number]> = [
  [0x00000000, 8], // 0.0.0.0/8
  [0x0a000000, 8], // 10.0.0.0/8
  [0x64400000, 10], // 100.64.0.0/10
  [0x7f000000, 8], // 127.0.0.0/8
  [0xa9fe0000, 16], // 169.254.0.0/16
  [0xac100000, 12], // 172.16.0.0/12
  [0xc0a80000, 16], // 192.168.0.0/16
  [0xe0000000, 4], // 224.0.0.0/4
  [0xf0000000, 4], // 240.0.0.0/4
];

export function parseIPv4(ip: string): number | null {
  const parts = ip.split(".");
  if (parts.length !== 4) return null;
  let result = 0;
  for (const part of parts) {
    if (!/^\d{1,3}$/.test(part)) return null;
    const octet = Number(part);
    if (octet > 255) return null;
    result = ((result << 8) | octet) >>> 0;
  }
  return result >>> 0;
}

export function isBlockedIPv4(value: number): boolean {
  const addr = value >>> 0;
  return BLOCKED_IPV4.some(([base, bits]) => {
    const mask = bits === 0 ? 0 : (0xffffffff << (32 - bits)) >>> 0;
    return ((addr & mask) >>> 0) === ((base & mask) >>> 0);
  });
}

// ---------------------------------------------------------------- IPv6 ----

/** Parse any textual IPv6 address (incl. `::` and embedded IPv4) to a 128-bit BigInt. */
const ZERO = BigInt(0);
const SIXTEEN = BigInt(16);
const THIRTY_TWO = BigInt(32);
const ONE_TWELVE = BigInt(112);
const TWO_POW_32 = BigInt(4294967296);
const MASK_32 = BigInt(4294967295);
const FFFF = BigInt(0xffff);
// 64:ff9b::/96 -> top 96 bits = 0x0064ff9b0000000000000000
const NAT64_HIGH96 = BigInt("0x0064ff9b0000000000000000");

export function parseIPv6(input: string): bigint | null {
  let ip = input.trim().toLowerCase();
  const zone = ip.indexOf("%");
  if (zone !== -1) ip = ip.slice(0, zone);
  if (!ip.includes(":")) return null;

  // Embedded IPv4 tail (e.g. ::ffff:127.0.0.1)
  const lastColon = ip.lastIndexOf(":");
  const tail = ip.slice(lastColon + 1);
  if (tail.includes(".")) {
    const v4 = parseIPv4(tail);
    if (v4 === null) return null;
    const hi = ((v4 >>> 16) & 0xffff).toString(16);
    const lo = (v4 & 0xffff).toString(16);
    ip = `${ip.slice(0, lastColon + 1)}${hi}:${lo}`;
  }

  const halves = ip.split("::");
  if (halves.length > 2) return null;

  const toGroups = (s: string): string[] => (s === "" ? [] : s.split(":"));
  const head = toGroups(halves[0]);
  const rest = halves.length === 2 ? toGroups(halves[1]) : [];

  let groups: string[];
  if (halves.length === 2) {
    const missing = 8 - head.length - rest.length;
    if (missing < 1) return null;
    groups = [...head, ...Array<string>(missing).fill("0"), ...rest];
  } else {
    groups = head;
  }
  if (groups.length !== 8) return null;

  let result = ZERO;
  for (const group of groups) {
    if (!/^[0-9a-f]{1,4}$/.test(group)) return null;
    result = (result << SIXTEEN) | BigInt(parseInt(group, 16));
  }
  return result;
}

function inPrefix6(addr: bigint, base: bigint, bits: number): boolean {
  const shift = BigInt(128 - bits);
  return addr >> shift === base >> shift;
}

export function isBlockedIPv6(addr: bigint): boolean {
  // ::/128 (unspecified), ::1/128 (loopback) and deprecated IPv4-compatible ::/96
  if (addr < TWO_POW_32) return true;
  const high96 = addr >> THIRTY_TWO;
  const low32 = Number(addr & MASK_32);
  // IPv4-mapped ::ffff:0:0/96 -> apply the IPv4 policy to the embedded address
  if (high96 === FFFF) return isBlockedIPv4(low32);
  // NAT64 64:ff9b::/96 -> apply the IPv4 policy to the embedded address
  if (high96 === NAT64_HIGH96) return isBlockedIPv4(low32);
  if (inPrefix6(addr, BigInt(0xfc00) << ONE_TWELVE, 7)) return true; // fc00::/7 (fc + fd)
  if (inPrefix6(addr, BigInt(0xfe80) << ONE_TWELVE, 10)) return true; // fe80::/10
  if (inPrefix6(addr, BigInt(0xff00) << ONE_TWELVE, 8)) return true; // ff00::/8
  return false;
}

/** Returns true when the textual IP address is non-public (or unparsable). */
export function isBlockedIp(ip: string): boolean {
  const v4 = parseIPv4(ip);
  if (v4 !== null) return isBlockedIPv4(v4);
  const v6 = parseIPv6(ip);
  if (v6 !== null) return isBlockedIPv6(v6);
  return true; // fail closed
}

// ------------------------------------------------------------ validation ---

function isBlockedHostname(hostname: string): boolean {
  const h = hostname.toLowerCase().replace(/\.$/, "");
  return (
    h === "localhost" ||
    h.endsWith(".localhost") ||
    h.endsWith(".local") ||
    h.endsWith(".internal")
  );
}

async function assertPublicUrl(rawUrl: string): Promise<URL> {
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    throw new Error("Érvénytelen URL.");
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("Csak http/https protokoll engedélyezett.");
  }
  if (url.username !== "" || url.password !== "") {
    throw new Error("Hitelesítő adatot tartalmazó URL nem engedélyezett.");
  }
  const hostname = url.hostname.replace(/^\[|\]$/g, "");
  if (hostname === "" || isBlockedHostname(hostname)) {
    throw new Error("Tiltott hostnév.");
  }

  const records = await lookup(hostname, { all: true });
  if (records.length === 0) throw new Error("A hostnév nem oldható fel.");
  for (const record of records) {
    if (isBlockedIp(record.address)) {
      throw new Error("A célcím nem nyilvános IP-tartományba mutat.");
    }
  }
  return url;
}

async function readLimitedText(
  response: Response,
  maxBytes: number
): Promise<string> {
  const body = response.body;
  if (!body) return "";
  const reader = body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxBytes) {
      await reader.cancel().catch(() => undefined);
      throw new Error("A válasz mérete meghaladja a megengedett limitet.");
    }
    chunks.push(value);
  }
  const merged = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder("utf-8").decode(merged);
}

/**
 * Fetches a public URL and returns its (size-limited) text body.
 * Single request chain – the returned value is a plain string, never a consumed Response.
 */
export async function safeFetchText(
  url: string,
  options: SafeFetchOptions = {}
): Promise<string> {
  const maxRedirects = options.maxRedirects ?? DEFAULT_MAX_REDIRECTS;
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const maxBytes = options.maxBytes ?? DEFAULT_MAX_BYTES;

  let currentUrl = url;
  for (let hop = 0; hop <= maxRedirects; hop++) {
    const validated = await assertPublicUrl(currentUrl);
    const response = await fetch(validated.toString(), {
      method: "GET",
      redirect: "manual",
      headers: options.headers,
      signal: AbortSignal.timeout(timeoutMs),
    });

    if (REDIRECT_STATUSES.has(response.status)) {
      const location = response.headers.get("location");
      await response.body?.cancel().catch(() => undefined);
      if (!location) throw new Error("Átirányítás Location nélkül.");
      currentUrl = new URL(location, validated).toString();
      continue;
    }

    if (response.status < 200 || response.status > 299) {
      await response.body?.cancel().catch(() => undefined);
      throw new Error(`Failed to fetch URL: ${response.status}`);
    }
    return readLimitedText(response, maxBytes);
  }
  throw new Error("Túl sok átirányítás.");
}
