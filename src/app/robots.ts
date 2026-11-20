import type { MetadataRoute } from "next";

const DISALLOWED_PATHS = ["/api/", "/admin/", "/portal/", "/login"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Minden crawler — alapértelmezett szabályok
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOWED_PATHS,
      },
      // AI Answer Engine crawlerek — explicit engedélyezés publikus útvonalakra (AEO/GEO)
      { userAgent: "GPTBot", allow: "/", disallow: DISALLOWED_PATHS },
      { userAgent: "OAI-SearchBot", allow: "/", disallow: DISALLOWED_PATHS },
      { userAgent: "ChatGPT-User", allow: "/", disallow: DISALLOWED_PATHS },
      { userAgent: "PerplexityBot", allow: "/", disallow: DISALLOWED_PATHS },
      { userAgent: "ClaudeBot", allow: "/", disallow: DISALLOWED_PATHS },
      { userAgent: "anthropic-ai", allow: "/", disallow: DISALLOWED_PATHS },
      { userAgent: "Google-Extended", allow: "/", disallow: DISALLOWED_PATHS },
      {
        userAgent: "Googlebot-Extended",
        allow: "/",
        disallow: DISALLOWED_PATHS,
      },
      { userAgent: "cohere-ai", allow: "/", disallow: DISALLOWED_PATHS },
      { userAgent: "Amazonbot", allow: "/", disallow: DISALLOWED_PATHS },
      { userAgent: "CCBot", allow: "/", disallow: DISALLOWED_PATHS },
      { userAgent: "Bytespider", allow: "/", disallow: DISALLOWED_PATHS },
      { userAgent: "Applebot-Extended", allow: "/", disallow: DISALLOWED_PATHS },
      { userAgent: "FacebookBot", allow: "/", disallow: DISALLOWED_PATHS },
    ],
    sitemap: "https://webdude.hu/sitemap.xml",
  };
}
