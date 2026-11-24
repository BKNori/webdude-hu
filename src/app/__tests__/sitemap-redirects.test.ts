/**
 * @jest-environment node
 */
import fs from "fs";
import path from "path";
import sitemap, { BASE_URL } from "../sitemap";

/** Offline: static 301 redirect sources are parsed from next.config.js. */
function staticRedirectSources(): string[] {
  const src = fs.readFileSync(
    path.join(__dirname, "..", "..", "..", "next.config.js"),
    "utf8"
  );
  const redirectsBlock = src.slice(src.indexOf("async redirects()"));
  const end = redirectsBlock.search(/\n  async \w+\(|\n  \},\n\};/);
  const block = end === -1 ? redirectsBlock : redirectsBlock.slice(0, end);
  return [...block.matchAll(/source:\s*"([^"]+)"/g)]
    .map((m) => m[1])
    .filter((s) => s.startsWith("/") && !/[:(*]/.test(s));
}

describe("sitemap vs next.config.js redirects", () => {
  it("contains no URL that is a 301 redirect source", async () => {
    const sources = new Set(staticRedirectSources());
    expect(sources.size).toBeGreaterThan(0);
    const clashes = (await sitemap())
      .map((e: { url: string }) => e.url.slice(BASE_URL.length) || "/")
      .filter((p: string) => sources.has(p));
    expect(clashes).toEqual([]);
  });
});
