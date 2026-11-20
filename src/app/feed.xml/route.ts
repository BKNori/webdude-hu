import { getCombinedBlogPosts } from "@/lib/mdx";

const SITE_URL = "https://webdude.hu";

/** Escapes XML special characters inside attribute or text nodes. */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Prevents premature CDATA termination inside RSS XML payloads. */
function wrapCdata(value: string): string {
  return `<![CDATA[${value.replace(/\]\]>/g, "]]]]><![CDATA[>")}]]>`;
}

export const revalidate = 3600;

export async function GET() {
  const allPosts = await getCombinedBlogPosts();
  const indexablePosts = allPosts
    .filter((post) => post.noindex !== true)
    .sort((a, b) => {
      const timeA = new Date(a.date).getTime();
      const timeB = new Date(b.date).getTime();
      return (Number.isNaN(timeB) ? 0 : timeB) - (Number.isNaN(timeA) ? 0 : timeA);
    });

  const lastBuildDate =
    indexablePosts.length > 0
      ? new Date(
          indexablePosts[0].updatedAt || indexablePosts[0].date
        ).toUTCString()
      : new Date().toUTCString();

  const itemsXml = indexablePosts
    .map((post) => {
      const link = `${SITE_URL}/hirek/${post.slug}`;
      const pubDateObj = new Date(post.date);
      const pubDate = Number.isNaN(pubDateObj.getTime())
        ? new Date().toUTCString()
        : pubDateObj.toUTCString();
      const summary =
        post.tldr ||
        post.excerpt ||
        `${post.title} — Balog Norbert (WebDude) szakmai útmutatója.`;

      return [
        "    <item>",
        `      <title>${wrapCdata(post.title)}</title>`,
        `      <link>${escapeXml(link)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
        `      <pubDate>${pubDate}</pubDate>`,
        `      <author>hello@webdude.hu (${escapeXml(post.author || "Balog Norbert")})</author>`,
        post.category
          ? `      <category>${wrapCdata(post.category)}</category>`
          : "",
        `      <description>${wrapCdata(summary)}</description>`,
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const rssXml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    "    <title>WebDude — Szakmai Hírek, SEO, Next.js &amp; AI Tudásbázis</title>",
    `    <link>${SITE_URL}/hirek</link>`,
    `    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />`,
    `    <description>${wrapCdata("Gyakorlati esettanulmányok, Next.js 16, WordPress/WooCommerce, technikai SEO/AEO és vállalati AI automatizációs útmutatók Balog Norbert (WebDude) 26+ év tapasztalatával.")}</description>`,
    "    <language>hu</language>",
    `    <copyright>© ${new Date().getFullYear()} WebDude — Balog Norbert. Minden jog fenntartva.</copyright>`,
    `    <lastBuildDate>${lastBuildDate}</lastBuildDate>`,
    "    <ttl>60</ttl>",
    itemsXml,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
