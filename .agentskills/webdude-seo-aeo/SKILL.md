---
name: webdude-seo-aeo
version: 1.0.0
description: Enforces WebDude SEO, AEO, Next.js 16 metadata, and Schema.org JSON-LD standards. Use whenever creating or editing pages, layouts, schemas, or metadata.
---

# WebDude SEO & AEO Standard

When optimizing, editing, or creating routes in this Next.js 16 App Router project, always enforce the following:

## 1. Metadata & Server Boundary
- **Server vs Client:** If `page.tsx` contains `'use client'`, DO NOT place `metadata` in it. Extract `metadata` and canonical URLs into a dedicated server-side `layout.tsx`.
- **Requirements:** Every route must define `title`, `description` (150-160 characters), and `alternates.canonical` (`https://webdude.hu/...`).

## 2. JSON-LD Schemas (AEO / Answer Engine Optimization)
- **Placement:** Render JSON-LD via `<script type="application/ld+json">` inside server components (`layout.tsx` or server `page.tsx`).
- **XSS Protection Mandatory:** Always sanitize JSON-LD with `.replace(/</g, "\\u003c")`.
- **E-E-A-T Anchors:**
  - `Organization` / `LocalBusiness`: Location: Kecskemét, Phone: `+36 70 323 8003`, Email: `hello@webdude.hu`.
  - `Person`: "Balog Norbert", 26 years design + 16 years web development experience.
  - Schemas by route: `Service` on `/szolgaltatasok/*`, `Product` on `/termekek/*`, `TechArticle` on `/hirek/*`, `BreadcrumbList` on subpages.

## 3. Semantic Hierarchy
- Strictly **one `<h1>`** per page.
- Sequential headings: `<h2>` followed by `<h3>` (no skipping heading levels).
- FAQ sections must follow strict Q&A format.

## 4. Quality Gate
- After changes, always verify:
  `npx tsc --noEmit` and `npm run lint`
- Only 0-error code is accepted. Update _docs/CHANGELOG.md upon completion.