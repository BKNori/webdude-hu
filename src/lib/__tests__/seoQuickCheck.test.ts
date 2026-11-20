import {
  analyzeRobotsAiAccess,
  analyzeSeoAeoHtml,
  isPrivateOrReservedIp,
  SsrfValidationError,
  validatePublicUrl,
} from "@/lib/seoQuickCheck";

describe("seoQuickCheck — SSRF protection", () => {
  it("blocks private, loopback, link-local, and reserved IPv4/IPv6 ranges", () => {
    const blockedIps = [
      "127.0.0.1",
      "127.0.53.53",
      "10.0.0.1",
      "172.16.0.1",
      "172.31.255.254",
      "192.168.1.1",
      "169.254.169.254",
      "0.0.0.0",
      "::1",
      "::",
      "::ffff:127.0.0.1",
      "::ffff:192.168.0.10",
      "fc00::1",
      "fd12:3456:789a::1",
      "fe80::1",
    ];

    for (const ip of blockedIps) {
      expect(isPrivateOrReservedIp(ip)).toBe(true);
    }
  });

  it("allows valid public IPv4 and IPv6 addresses", () => {
    expect(isPrivateOrReservedIp("8.8.8.8")).toBe(false);
    expect(isPrivateOrReservedIp("1.1.1.1")).toBe(false);
    expect(isPrivateOrReservedIp("172.32.0.1")).toBe(false);
    expect(isPrivateOrReservedIp("2606:4700:4700::1111")).toBe(false);
  });

  it("blocks localhost, private IPs, .local/.internal, and non-HTTP schemes in validatePublicUrl", () => {
    const maliciousInputs = [
      "http://127.0.0.1",
      "http://127.0.0.1:3000/admin",
      "http://192.168.1.1",
      "http://10.0.0.5",
      "http://169.254.169.254/latest/meta-data/",
      "http://localhost",
      "http://localhost:3000",
      "http://sub.localhost/test",
      "http://service.internal",
      "http://printer.local",
      "file:///etc/passwd",
      "ftp://example.com",
      "javascript:alert(1)",
      "http://[::1]:3000",
      "https://user:pass@webdude.hu",
    ];

    for (const raw of maliciousInputs) {
      expect(() => validatePublicUrl(raw)).toThrow(SsrfValidationError);
    }
  });

  it("normalizes public domain inputs without explicit protocol to https://", () => {
    const parsed = validatePublicUrl("webdude.hu");
    expect(parsed.toString()).toBe("https://webdude.hu/");
  });
});

describe("seoQuickCheck — deterministic scoring & HTML/robots analysis", () => {
  it("awards 100/100 for a complete SEO + AEO + GEO page", () => {
    const perfectHtml = `
      <!doctype html>
      <html lang="hu">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>WebDude | Prémium Next.js Webfejlesztés &amp; AI Automatizáció</title>
          <meta name="description" content="Prémium Next.js weboldal készítés, WordPress karbantartás, technikai SEO és vállalati AI workflow automatizáció 26 év tapasztalattal közvetlenül tőlem." />
          <link rel="canonical" href="https://webdude.hu/" />
          <meta property="og:title" content="WebDude" />
          <meta property="og:description" content="Next.js & AI Automatizáció" />
          <meta property="og:image" content="https://webdude.hu/og/webdude-og.jpg" />
          <script type="application/ld+json">
            {"@context":"https://schema.org","@type":"Organization","name":"WebDude"}
          </script>
          <script type="application/ld+json">
            {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[]}
          </script>
        </head>
        <body>
          <h1>Prémium Weboldal Készítés és AI Automatizáció</h1>
        </body>
      </html>
    `;

    const report = analyzeSeoAeoHtml({
      checkedUrl: "https://webdude.hu/",
      finalUrl: "https://webdude.hu/",
      ttfbMs: 180,
      html: perfectHtml,
      robotsTxt: "User-agent: *\nAllow: /\n\nUser-agent: GPTBot\nAllow: /\n",
      llmsTxt: "# WebDude\n> Balog Norbert (WebDude) AI discovery context.",
      locale: "hu",
    });

    expect(report.totalScore).toBe(100);
    expect(report.grade).toBe("excellent");
    expect(report.categoryScores.seo.score).toBe(60);
    expect(report.categoryScores.aeo.score).toBe(20);
    expect(report.categoryScores.geo.score).toBe(20);
    expect(report.checks).toHaveLength(10);
    expect(report.meta.h1Count).toBe(1);
    expect(report.meta.jsonLdTypes).toEqual(
      expect.arrayContaining(["Organization", "FAQPage"])
    );
  });

  it("detects blocked AI bots in robots.txt and missing SEO/AEO signals", () => {
    const robots = analyzeRobotsAiAccess(
      "User-agent: GPTBot\nDisallow: /\n\nUser-agent: PerplexityBot\nDisallow: /\n"
    );
    expect(robots.hasRobotsTxt).toBe(true);
    expect(robots.blockedBots).toEqual(["GPTBot", "PerplexityBot"]);

    const poorReport = analyzeSeoAeoHtml({
      checkedUrl: "http://example.com/",
      finalUrl: "http://example.com/",
      ttfbMs: 2200,
      html: "<html><head></head><body><p>Hello</p></body></html>",
      robotsTxt: "User-agent: GPTBot\nDisallow: /\n",
      llmsTxt: "<!doctype html><html><body>404</body></html>",
      locale: "en",
    });

    expect(poorReport.totalScore).toBe(0);
    expect(poorReport.grade).toBe("critical");
    expect(poorReport.meta.blockedAiBots).toEqual(["GPTBot"]);
    expect(poorReport.meta.hasLlmsTxt).toBe(false);
  });
});
