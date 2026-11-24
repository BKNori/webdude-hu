/**
 * @jest-environment node
 */
import { lookup } from "dns/promises";
import { safeFetchText, isBlockedIp } from "../safe-fetch";

jest.mock("dns/promises", () => ({ lookup: jest.fn() }));

const lookupMock = lookup as unknown as jest.Mock;
const fetchMock = jest.fn();

function textResponse(body: string, status = 200): Response {
  return new Response(body, { status });
}

function redirectResponse(location: string): Response {
  return new Response(null, { status: 302, headers: { location } });
}

beforeEach(() => {
  lookupMock.mockReset();
  fetchMock.mockReset();
  global.fetch = fetchMock as unknown as typeof fetch;
  lookupMock.mockResolvedValue([{ address: "93.184.216.34", family: 4 }]);
});

describe("isBlockedIp", () => {
  it.each([
    "127.0.0.1",
    "10.0.0.1",
    "169.254.169.254",
    "172.16.5.4",
    "192.168.1.1",
    "100.64.0.1",
    "0.0.0.0",
    "224.0.0.1",
    "255.255.255.255",
    "::",
    "::1",
    "fd12::1",
    "fc00::1",
    "fe80::1",
    "ff02::1",
    "::ffff:127.0.0.1",
    "::ffff:7f00:1",
    "::ffff:10.0.0.1",
  ])("blocks %s", (ip) => {
    expect(isBlockedIp(ip)).toBe(true);
  });

  it.each(["93.184.216.34", "8.8.8.8", "2606:2800:220:1:248:1893:25c8:1946"])(
    "allows %s",
    (ip) => {
      expect(isBlockedIp(ip)).toBe(false);
    }
  );
});

describe("safeFetchText", () => {
  it("returns the body text of a public URL", async () => {
    fetchMock.mockResolvedValueOnce(textResponse("Szia világ — árvíztűrő"));
    await expect(safeFetchText("https://example.com/")).resolves.toBe(
      "Szia világ — árvíztűrő"
    );
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][1]).toMatchObject({ redirect: "manual" });
  });

  it.each([
    ["http://127.0.0.1/", "127.0.0.1"],
    ["http://10.0.0.1/", "10.0.0.1"],
    ["http://169.254.169.254/latest/meta-data", "169.254.169.254"],
    ["http://[::1]/", "::1"],
    ["http://[fd12::1]/", "fd12::1"],
    ["http://[::ffff:127.0.0.1]/", "::ffff:127.0.0.1"],
  ])("rejects %s", async (url, address) => {
    lookupMock.mockResolvedValue([
      { address, family: address.includes(":") ? 6 : 4 },
    ]);
    await expect(safeFetchText(url)).rejects.toThrow();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects localhost and local hostnames", async () => {
    await expect(safeFetchText("http://localhost/")).rejects.toThrow();
    await expect(safeFetchText("http://printer.local/")).rejects.toThrow();
    await expect(safeFetchText("http://db.internal/")).rejects.toThrow();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects non-http protocols and credentials", async () => {
    await expect(safeFetchText("file:///etc/passwd")).rejects.toThrow();
    await expect(safeFetchText("ftp://example.com/")).rejects.toThrow();
    await expect(
      safeFetchText("https://user:pass@example.com/")
    ).rejects.toThrow();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects a hostname that resolves to a private address", async () => {
    lookupMock.mockResolvedValue([{ address: "10.1.2.3", family: 4 }]);
    await expect(safeFetchText("https://evil.example/")).rejects.toThrow();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects a 302 redirect pointing to an internal IP", async () => {
    lookupMock.mockImplementation(async (host: string) =>
      host === "169.254.169.254"
        ? [{ address: "169.254.169.254", family: 4 }]
        : [{ address: "93.184.216.34", family: 4 }]
    );
    fetchMock.mockResolvedValueOnce(
      redirectResponse("http://169.254.169.254/latest/meta-data")
    );
    await expect(safeFetchText("https://example.com/")).rejects.toThrow();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("follows a safe redirect and enforces the redirect limit", async () => {
    fetchMock
      .mockResolvedValueOnce(redirectResponse("https://example.org/final"))
      .mockResolvedValueOnce(textResponse("ok"));
    await expect(safeFetchText("https://example.com/")).resolves.toBe("ok");

    fetchMock.mockReset();
    fetchMock.mockImplementation(async () =>
      redirectResponse("https://example.com/loop")
    );
    await expect(safeFetchText("https://example.com/")).rejects.toThrow(
      /átirányítás/i
    );
    expect(fetchMock).toHaveBeenCalledTimes(4); // initial + 3 hops
  });

  it("rejects bodies larger than the limit", async () => {
    fetchMock.mockResolvedValueOnce(textResponse("x".repeat(1_048_577)));
    await expect(safeFetchText("https://example.com/")).rejects.toThrow(
      /limit/i
    );
  });

  it("throws on non-2xx responses", async () => {
    fetchMock.mockResolvedValueOnce(textResponse("nope", 404));
    await expect(safeFetchText("https://example.com/")).rejects.toThrow(
      /404/
    );
  });
});
