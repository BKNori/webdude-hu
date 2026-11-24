/**
 * @jest-environment node
 */
import { lookup } from "dns/promises";
import {
  safeFetchText,
  isBlockedIp,
  parseIPv4,
  parseIPv6,
  isBlockedIPv6,
} from "../safe-fetch";

jest.mock("dns/promises", () => ({ lookup: jest.fn() }));

const lookupMock = lookup as unknown as jest.Mock;
const fetchMock = jest.fn();

beforeEach(() => {
  lookupMock.mockReset();
  fetchMock.mockReset();
  global.fetch = fetchMock as unknown as typeof fetch;
  lookupMock.mockResolvedValue([{ address: "93.184.216.34", family: 4 }]);
});

describe("IP parsing edge cases", () => {
  it("parseIPv4 rejects malformed input", () => {
    expect(parseIPv4("1.2.3")).toBeNull();
    expect(parseIPv4("1.2.3.999")).toBeNull();
    expect(parseIPv4("a.b.c.d")).toBeNull();
    expect(parseIPv4("1.2.3.4")).toBe(0x01020304);
  });

  it("parseIPv6 handles zones, embedded IPv4 and malformed input", () => {
    expect(parseIPv6("1.2.3.4")).toBeNull();
    expect(parseIPv6("::1%eth0")).toBe(BigInt(1));
    expect(parseIPv6("::ffff:1.2.3.999")).toBeNull();
    expect(parseIPv6("1::2::3")).toBeNull();
    expect(parseIPv6("1:2:3:4:5:6:7")).toBeNull();
    expect(parseIPv6("1:2:3:4:5:6:7:8:9")).toBeNull();
    expect(parseIPv6("1:2:3:4::5:6:7:8")).toBeNull();
    expect(parseIPv6("zzzz::1")).toBeNull();
    expect(parseIPv6("1:2:3:4:5:6:7:8")).not.toBeNull();
  });

  it("isBlockedIp covers NAT64, mapped public and unparsable addresses", () => {
    expect(isBlockedIp("64:ff9b::7f00:1")).toBe(true);
    expect(isBlockedIp("64:ff9b::808:808")).toBe(false);
    expect(isBlockedIp("::ffff:8.8.8.8")).toBe(false);
    expect(isBlockedIp("not-an-ip")).toBe(true);
    const v6 = parseIPv6("2001:db8::1");
    expect(v6 !== null && isBlockedIPv6(v6)).toBe(false);
  });
});

describe("safeFetchText edge cases", () => {
  it("rejects invalid URLs and empty DNS results", async () => {
    await expect(safeFetchText("not a url")).rejects.toThrow();
    lookupMock.mockResolvedValue([]);
    await expect(safeFetchText("https://example.com/")).rejects.toThrow();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects trailing-dot and subdomain local hostnames", async () => {
    await expect(safeFetchText("http://foo.localhost./")).rejects.toThrow();
    await expect(safeFetchText("http://x.local./")).rejects.toThrow();
  });

  it("rejects a redirect without Location", async () => {
    fetchMock.mockResolvedValueOnce(new Response(null, { status: 301 }));
    await expect(safeFetchText("https://example.com/")).rejects.toThrow(
      /Location/
    );
  });

  it("returns an empty string for a bodyless 204 and forwards headers", async () => {
    fetchMock.mockResolvedValueOnce(new Response(null, { status: 204 }));
    await expect(
      safeFetchText("https://example.com/", {
        headers: { "User-Agent": "t" },
        timeoutMs: 1000,
        maxBytes: 10,
        maxRedirects: 1,
      })
    ).resolves.toBe("");
    expect(fetchMock.mock.calls[0][1]).toMatchObject({
      headers: { "User-Agent": "t" },
    });
  });

  it("honours a custom maxBytes limit and multi-chunk bodies", async () => {
    const encoder = new TextEncoder();
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(encoder.encode("abc"));
        controller.enqueue(encoder.encode("def"));
        controller.close();
      },
    });
    fetchMock.mockResolvedValueOnce(new Response(stream, { status: 200 }));
    await expect(safeFetchText("https://example.com/")).resolves.toBe("abcdef");

    fetchMock.mockResolvedValueOnce(new Response("abcdefghij", { status: 200 }));
    await expect(
      safeFetchText("https://example.com/", { maxBytes: 5 })
    ).rejects.toThrow(/limit/i);
  });

  it("resolves a relative redirect Location against the current URL", async () => {
    fetchMock
      .mockResolvedValueOnce(
        new Response(null, { status: 307, headers: { location: "/next" } })
      )
      .mockResolvedValueOnce(new Response("done", { status: 200 }));
    await expect(safeFetchText("https://example.com/a")).resolves.toBe("done");
    expect(fetchMock.mock.calls[1][0]).toBe("https://example.com/next");
  });
});
