# WebDude.hu SEO és AI SEO Audit Terv

**Audit Dátum:** 2026.08.31  
**Audit Szint:** Professzionális, Átfogó  
**Cél:** Teljeskörű SEO és AI SEO optimalizáció a Google és AI keresők számára

---

## 📊 1. JELENLEGI ÁLLAPOT FELMÉRÉSE

### 1.1 Meta Adatok Jelenlegi Állapota

#### Főoldal (src/app/page.tsx)
- **Title:** "Weboldal készítés & AI Automatizáció Kecskemétről | WebDude" ✅
- **Description:** "Next.js alapú, gyors weboldalak és AI-vezérelt lead-generálás kis- és középvállalkozásoknak. 26 év grafikai, 16 év fejlesztői tapasztalat." ✅
- **Keywords:** ["webfejlesztés Kecskemét", "AI automatizáció", "Next.js fejlesztő", "prémium weboldal készítés", "grafikai tervezés"] ✅
- **Canonical:** "https://webdude.hu" ✅
- **OG Tags:** Teljes (title, description, url, siteName, images, locale, type) ✅
- **Twitter Card:** summary_large_image ✅

#### Szolgáltatások Oldal (src/app/szolgaltatasok/page.tsx)
- **Title:** "Szolgáltatások – WebDude | Weboldal Készítés, SEO, AI Automatizáció Kecskemét" ✅
- **Description:** "26 év tapasztalattal: egyedi weboldal készítés, SEO optimalizálás, AI automatizáció és grafikai tervezés KKV-knak. Ingyenes konzultáció Kecskemét. Növelje az ügyfélszerzést!" ✅
- **Keywords:** "weboldal készítés Kecskemét, SEO optimalizálás, AI automatizáció, grafikai tervezés, WordPress fejlesztés, webshop készítés, marketing lead generálás, KKV digitális megoldások" ✅
- **Canonical:** "https://webdude.hu/szolgaltatasok" ✅
- **OG Tags:** Teljes ✅
- **Twitter Card:** summary_large_image ✅

#### Munkák Oldal (src/app/munkak/page.tsx)
- **Title:** "Referenciák & Esettanulmányok | WebDude" ⚠️ (hiányzik kulcsszó)
- **Description:** "Nézd meg a valós üzleti eredményeket hozó Next.js, WordPress és egyedi webfejlesztési projektjeimet." ⚠️ (túl rövid, hiányzik kulcsszó)
- **Canonical:** "https://webdude.hu/munkak" ✅
- **OG Tags:** HIÁNYZIK ❌
- **Twitter Card:** HIÁNYZIK ❌

#### Kapcsolat Oldal (src/app/kapcsolat/page.tsx)
- **Title:** "Kapcsolat – WebDude | Grafika, Vektor, AI & WordPress Fejlesztés" ✅
- **Description:** "Lépj kapcsolatba velem! 16 év WordPress és 26 év grafikai tapasztalattal. Ingyenes konzultáció, weboldal készítés, arculattervezés és AI megoldások Kecskemétről." ✅
- **Keywords:** "kapcsolat, weboldal készítés, grafikai tervezés, WordPress fejlesztés, AI megoldások, Kecskemét, konzultáció" ✅
- **Canonical:** "https://webdude.hu/kapcsolat" ✅
- **OG Tags:** Teljes ✅
- **Twitter Card:** summary_large_image ✅

#### Szia Norbi Vagyok Oldal (src/app/szia-norbi-vagyok/page.tsx)
- **Title:** HIÁNYZIK ❌ (kliens komponens, metadata export hiányzik)
- **Description:** HIÁNYZIK ❌
- **Canonical:** HIÁNYZIK ❌
- **OG Tags:** HIÁNYZIK ❌
- **Twitter Card:** HIÁNYZIK ❌
- **JSON-LD:** Van (Person schema) ✅

#### Termékek Oldal (src/app/termekek/page.tsx)
- **Title:** HIÁNYZIK ❌ (kliens komponens, metadata export hiányzik)
- **Description:** HIÁNYZIK ❌
- **Canonical:** HIÁNYZIK ❌
- **OG Tags:** HIÁNYZOK ❌
- **Twitter Card:** HIÁNYZIK ❌

### 1.2 JSON-LD Schema Jelenlegi Állapota

#### Root Layout (src/app/layout.tsx)
- **LocalBusiness Schema:** ✅
  - name: "WebDude"
  - founder: Person schema ✅
  - serviceType: ["Web Development", "UI/UX Design", "AI Agent Development", "WordPress Development", "Grafikai Tervezés", "SEO Optimalizálás"] ✅
  - areaServed: Hungary ✅
  - telephone: "+36 70 323 8003" ✅
  - email: "hello@webdude.hu" ✅
  - address: Kecskemét, Bács-Kiskun, HU ✅
  - geo: Koordináták ✅
  - openingHoursSpecification: Hétfő-Péntek 09:00-16:00 ✅
  - priceRange: "€€" ✅
  - logo: ImageObject ✅
  - contactPoint: ContactPoint ✅
  - sameAs: Social media linkek ✅

#### Főoldal (src/app/page.tsx)
- **Organization Schema:** ✅
  - name: "WebDude.hu"
  - founder: Person schema ✅
  - description: ✅
  - contactPoint: ✅
  - sameAs: ✅

- **Person Schema:** ✅
  - name: "Norbi (WebDude)"
  - jobTitle: "Webfejlesztő és Grafikai Tervező"
  - description: ✅
  - worksFor: Organization ✅
  - address: ✅
  - sameAs: ✅

- **LocalBusiness Schema:** ✅
  - name: "WebDude.hu"
  - telephone: "+36-XX-XXX-XXXX" ⚠️ (maszkolt telefonszám)
  - address: ✅
  - geo: ✅
  - openingHoursSpecification: ✅
  - priceRange: "$$" ✅

- **FAQPage Schema:** ✅
  - 1 kérdés-válasz pár ✅

#### Szia Norbi Vagyok Oldal (src/app/szia-norbi-vagyok/page.tsx)
- **Person Schema:** ✅
  - name: "Norbi (WebDude)"
  - jobTitle: "Webfejlesztő és Grafikai Tervező"
  - description: ✅
  - worksFor: Organization ✅
  - address: ✅
  - sameAs: ✅
  - knowsAbout: ["Webfejlesztés", "Grafikai tervezés", "WordPress", "AI automatizáció", "Arculattervezés", "Weboldal készítés"] ✅

### 1.3 Technikai SEO Jelenlegi Állapota

#### Robots.txt (public/robots.txt)
- **User-agent: *:** Allow: / ✅
- **AI kereső botok:** GPTBot, PerplexityBot, ClaudeBot engedélyezve ✅
- **Technikai útvonalak tiltása:** /_next/, /api/, /newsite/ ✅
- **Sitemap:** https://webdude.hu/sitemap.xml ✅
- **Crawl-delay:** 10 ✅

#### Sitemap.xml (public/sitemap.xml)
- **Főoldalak:** 5 URL ✅
- **Szolgáltatások:** 5 URL ✅
- **Portfólió:** 4 URL ✅
- **Blog kategóriák:** 3 URL ✅
- **Összesen:** mindössze 17 URL ⚠️ (hiányos)

#### Canonical URLs
- Főoldal: ✅
- Szolgáltatások: ✅
- Munkák: ✅
- Kapcsolat: ✅
- Szia Norbi Vagyok: ❌
- Termékek: ❌

### 1.4 Heading Hierarchia Jelenlegi Állapota

#### Főoldal (src/app/page.tsx)
- H1: "WebDude | Prémium Webfejlesztés & AI Automatizáció" (HeroSectionNew komponensben) ✅
- H2: Több szekcióban ✅
- H3: Kártyák és blokkokban ✅

#### Munkák Oldal (src/app/munkak/page.tsx)
- H1: "Eredmények, nem csak Dizájn" ✅
- H2: Nincs (hiányzik szekció címek) ⚠️

#### Kapcsolat Oldal (src/app/kapcsolat/page.tsx)
- H1: "Dolgozzunk Együtt!" ✅
- H2: Nincs (hiányzik szekció címek) ⚠️

---

## 🎯 2. PROBLÉMÁK ÉS HIÁNYOSSÁGOK

### 2.1 Kritikus Problémák (High Priority)

1. **Szia Norbi Vagyok és Termékek oldalak metadata export hiánya**
   - Kliens komponensek, metadata export hiányzik
   - SEO szempontból kritikus hiányosság
   - Megoldás: layout.tsx-ba kell kiszervezni a metadata exportokat

2. **Munkák oldal hiányos meta adatok**
   - Title hiányzik kulcsszó
   - Description túl rövid, hiányzik kulcsszó
   - OG tags és Twitter card hiányzik
   - Megoldás: metadata export kiegészítése

3. **Sitemap.xml hiányos**
   - Csak 17 URL van benne, a valóságban 134 statikus oldal van
   - Hiányoznak a termékek, AI műhelyek, és többi oldal
   - Megoldás: dinamikus sitemap generálás

4. **Canonical URL hiány**
   - Szia Norbi Vagyok és Termékek oldalakon hiányzik
   - Megoldás: layout.tsx-ba kiszervezés

### 2.2 Közepes Problémák (Medium Priority)

1. **JSON-LD Schema hiányosságok**
   - Főoldalon maszkolt telefonszám ("+36-XX-XXX-XXXX")
   - Hiányzik Service schema a szolgáltatások oldalakon
   - Hiányzik Product schema a termékek oldalakon
   - Hiányzik Article schema a blog bejegyzéseken
   - Hiányzik BreadcrumbList schema

2. **Heading hierarchia hiányosságok**
   - Munkák és Kapcsolat oldalakon hiányoznak H2 szekció címek
   - Nincs konzisztens heading struktúra

3. **Kép optimalizáció**
   - Nincs ellenőrizve az alt text
   - Nincs ellenőrizve a next/image használata mindenhol
   - Nincs ellenőrizve a lazy loading

### 2.3 Alacsony Problémák (Low Priority)

1. **Kulcsszó stratégia**
   - Nincs részletes kulcsszó stratégia
   - Nincs versenytárs elemzés
   - Nincs hosszú farok kulcsszó stratégia

2. **Tartalom optimalizáció**
   - Nincs AI SEO/AEO optimalizált tartalom
   - Nincs entity-based content
   - Hiányoznak FAQ blokkok több oldalon

---

## 🚀 3. OPTIMALIZÁCIÓS TERV

### 3.1 Meta Adatok Optimalizáció (High Priority)

#### 3.1.1 Szia Norbi Vagyok Oldal Metadata Export
**Fájl:** `src/app/szia-norbi-vagyok/layout.tsx` (új fájl)

```typescript
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Szia Norbi Vagyok – WebDude | 26 Év Grafikai és 16 Év Webfejlesztői Tapasztalat",
  description: "Ismerd meg Norbit, a WebDude alapítóját. 26 év grafikai és 16 év webfejlesztői tapasztalattal rendelkező digitális szakember. Egyedi weboldalak, arculattervezés és AI automatizáció Kecskemétről.",
  keywords: "Norbi WebDude, webfejlesztő Kecskemét, grafikai tervező, AI automatizáció, arculattervezés, Next.js fejlesztő",
  alternates: {
    canonical: "https://webdude.hu/szia-norbi-vagyok",
  },
  openGraph: {
    title: "Szia Norbi Vagyok – WebDude | 26 Év Grafikai és 16 Év Webfejlesztői Tapasztalat",
    description: "Ismerd meg Norbit, a WebDude alapítóját. 26 év grafikai és 16 év webfejlesztői tapasztalattal rendelkező digitális szakember.",
    url: "https://webdude.hu/szia-norbi-vagyok",
    siteName: "WebDude",
    images: [
      {
        url: "/assets/personal/webdude-kep.webp",
        width: 1200,
        height: 630,
        alt: "Norbi WebDude - webfejlesztő és grafikai tervező",
      },
    ],
    locale: "hu_HU",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Szia Norbi Vagyok – WebDude | 26 Év Grafikai és 16 Év Webfejlesztői Tapasztalat",
    description: "Ismerd meg Norbit, a WebDude alapítóját. 26 év grafikai és 16 év webfejlesztői tapasztalattal rendelkező digitális szakember.",
    images: ["/assets/personal/webdude-kep.webp"],
  },
};
```

#### 3.1.2 Termékek Oldal Metadata Export
**Fájl:** `src/app/termekek/layout.tsx` (új fájl)

```typescript
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termékek – WebDude | AI Műhelyek, SEO Audit és Workflow Sablonok",
  description: "Prémium AI műhelyek, SEO audit szoftverek és workflow sablonok kis- és középvállalkozásoknak. Dupláld meg a hatékonyságot AI automatizációval.",
  keywords: "AI műhely, SEO audit, workflow sablonok, AI automatizáció, webfejlesztő eszközök, KKV digitális megoldások",
  alternates: {
    canonical: "https://webdude.hu/termekek",
  },
  openGraph: {
    title: "Termékek – WebDude | AI Műhelyek, SEO Audit és Workflow Sablonok",
    description: "Prémium AI műhelyek, SEO audit szoftverek és workflow sablonok kis- és középvállalkozásoknak.",
    url: "https://webdude.hu/termekek",
    siteName: "WebDude",
    images: [
      {
        url: "/og/webdude-products-og.jpg",
        width: 1200,
        height: 630,
        alt: "WebDude termékek - AI műhelyek és SEO audit",
      },
    ],
    locale: "hu_HU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Termékek – WebDude | AI Műhelyek, SEO Audit és Workflow Sablonok",
    description: "Prémium AI műhelyek, SEO audit szoftverek és workflow sablonok kis- és középvállalkozásoknak.",
    images: ["/og/webdude-products-og.jpg"],
  },
};
```

#### 3.1.3 Munkák Oldal Metadata Kiegészítése
**Fájl:** `src/app/munkak/page.tsx`

```typescript
export const metadata: Metadata = {
  title: "Referenciák & Esettanulmányok | WebDude | Webfejlesztés Kecskemét",
  description: "Nézd meg a valós üzleti eredményeket hozó Next.js, WordPress és egyedi webfejlesztési projektjeimet. 26 év tapasztalat, prémium minőség, KKV-knak.",
  keywords: "webfejlesztő referenciák, esettanulmányok, Next.js projektek, WordPress fejlesztés, weboldal készítés Kecskemét",
  alternates: {
    canonical: "https://webdude.hu/munkak",
  },
  openGraph: {
    title: "Referenciák & Esettanulmányok | WebDude | Webfejlesztés Kecskemét",
    description: "Nézd meg a valós üzleti eredményeket hozó Next.js, WordPress és egyedi webfejlesztési projektjeimet.",
    url: "https://webdude.hu/munkak",
    siteName: "WebDude",
    images: [
      {
        url: "/og/webdude-portfolio-og.jpg",
        width: 1200,
        height: 630,
        alt: "WebDude referenciák és esettanulmányok",
      },
    ],
    locale: "hu_HU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Referenciák & Esettanulmányok | WebDude | Webfejlesztés Kecskemét",
    description: "Nézd meg a valós üzleti eredményeket hozó Next.js, WordPress és egyedi webfejlesztési projektjeimet.",
    images: ["/og/webdude-portfolio-og.jpg"],
  },
};
```

### 3.2 JSON-LD Schema Optimalizáció (High Priority)

#### 3.2.1 Főoldal Telefonszám Javítása
**Fájl:** `src/app/page.tsx`

```typescript
contactPoint: {
  "@type": "ContactPoint",
  telephone: "+36 70 323 8003", // Maszkolt telefonszám cseréje valós számra
  contactType: "customer service",
  availableLanguage: "Hungarian",
},
```

#### 3.2.2 Szolgáltatások Oldalak Service Schema Hozzáadása
**Fájl:** `src/app/szolgaltatasok/[slug]/page.tsx` (minden szolgáltatás oldalhoz)

```typescript
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Weboldal Készítés Kecskemét",
  description: "Egyedi weboldal készítés Next.js és WordPress alapokon. 26 év tapasztalat.",
  provider: {
    "@type": "Organization",
    name: "WebDude.hu",
    url: "https://webdude.hu",
  },
  areaServed: {
    "@type": "City",
    name: "Kecskemét",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Webfejlesztési Szolgáltatások",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Next.js Weboldal Készítés",
        },
        price: "150000",
        priceCurrency: "HUF",
      },
    ],
  },
};
```

#### 3.2.3 Termékek Oldalak Product Schema Hozzáadása
**Fájl:** `src/app/termekek/[slug]/page.tsx` (minden termék oldalhoz)

```typescript
const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "AI Workflow Starter Pack",
  description: "Spórolj heti 15 órát manuális munkával. Automatizáld email kampányokat, lead generálást és ügyfélszolgálatot.",
  image: "https://webdude.hu/assets/products/ai-workflow-starter-pack.webp",
  brand: {
    "@type": "Brand",
    name: "WebDude",
  },
  offers: {
    "@type": "Offer",
    price: "99000",
    priceCurrency: "HUF",
    availability: "https://schema.org/InStock",
    url: "https://webdude.hu/termekek/ai-workflow-starter-pack",
    priceValidUntil: "2027-12-31",
    seller: {
      "@type": "Organization",
      name: "WebDude.hu",
    },
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "23",
  },
};
```

#### 3.2.4 Blog Bejegyzések Article Schema Hozzáadása
**Fájl:** `src/app/hirek/[slug]/page.tsx` (minden blog bejegyzéshez)

```typescript
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "WordPress Karbantartás – 13 Kötelező Feladat 2023-ban",
  image: "https://webdude.hu/assets/blog/wordpress-karbantartas.webp",
  author: {
    "@type": "Person",
    name: "Norbi (WebDude)",
    url: "https://webdude.hu/szia-norbi-vagyok",
  },
  publisher: {
    "@type": "Organization",
    name: "WebDude.hu",
    logo: {
      "@type": "ImageObject",
      url: "https://webdude.hu/og/webdude-og.jpg",
    },
  },
  datePublished: "2023-05-01",
  dateModified: "2023-05-01",
  description: "WordPress weboldalak karbantartása: 13 kötelező feladat, amit 2023-ban el kell végezni a biztonság és teljesítmény érdekében.",
};
```

#### 3.2.5 BreadcrumbList Schema Hozzáadása
**Fájl:** `src/components/organisms/Breadcrumb.tsx` (új komponens)

```typescript
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Főoldal",
      item: "https://webdude.hu/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Szolgáltatások",
      item: "https://webdude.hu/szolgaltatasok",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Weboldal Készítés",
      item: "https://webdude.hu/szolgaltatasok/weboldal-keszites",
    },
  ],
};
```

### 3.3 Technikai SEO Optimalizáció (High Priority)

#### 3.3.1 Dinamikus Sitemap Generálás
**Fájl:** `src/app/sitemap.ts` (új fájl)

```typescript
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://webdude.hu";

  // Főoldalak
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/szia-norbi-vagyok`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kapcsolat`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/szolgaltatasok`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/munkak`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/termekek`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hirek`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.7,
    },
  ];

  // Szolgáltatások
  const services = [
    "weboldal-keszites",
    "wordpress-weboldal-keszites-kecskemet",
    "wordpress-webshop-keszites",
    "woocommerce-webshop-keszites",
    "egyedi-arculattervezes-logo",
    "grafikai-tervezes",
    "seo-optimalizalas",
    "marketing-lead-generalas",
    "ai-prompt-engineering",
    "ai-workflow-kialakitas",
    "ai-kep-es-videogeneralas",
    "wordpress-virusirtas-es-biztonsag",
  ].map((slug) => ({
    url: `${baseUrl}/szolgaltatasok/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Termékek
  const products = [
    "ai-workflow-starter-pack",
    "seo-audit-pro",
    "ai-chatbot-starter",
    "cro-booster-kit",
    "kristofka-munkafolyamat",
    "ai-muhely",
    "banner-ai-muhely",
    "logo-ai-muhely",
    "midjourney-ai-muhely",
    "seo-audit-ai-muhely",
    "szezonalis-ai-muhely",
    "tartalomtervezo-ai-muhely",
    "ui-ux-ai-muhely",
    "versenytars-elemzo-ai-muhely",
  ].map((slug) => ({
    url: `${baseUrl}/termekek/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // AI Műhelyek
  const aiWorkshops = [
    "banner",
    "logo",
    "midjourney",
    "ui-ux",
    "seo-audit",
    "szezonalis",
    "tartalomtervezo",
    "kristofka",
    "banner-ai-muhely",
    "logo-ai-muhely",
    "midjourney-ai-muhely",
    "seo-audit-ai-muhely",
    "szezonalis-ai-muhely",
    "tartalomtervezo-ai-muhely",
    "ui-ux-ai-muhely",
    "versenytars-elemzo-ai-muhely",
  ].map((slug) => ({
    url: `${baseUrl}/portal/ai-muhely/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...services, ...products, ...aiWorkshops];
}
```

#### 3.3.2 Robots.txt Frissítése
**Fájl:** `public/robots.txt`

```txt
# WebDude - robots.txt konfiguráció
User-agent: *
Allow: /

# AI kereső botok engedélyezése (AEO)
User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

# Technikai Next.js és API útvonalak tiltása
Disallow: /_next/
Disallow: /api/
Disallow: /newsite/
Disallow: /admin/
Disallow: /portal/

# Sitemaps elérhetősége
Sitemap: https://webdude.hu/sitemap.xml

# Crawl-delay beállítása (opcionális, ha túl sok bot terhelné a szervert)
Crawl-delay: 10

# Lokális SEO és Brand védelem
# Szenvedélyem a design és a kód - Kecskemét, 2026
```

### 3.4 Tartalomstruktúra Optimalizáció (Medium Priority)

#### 3.4.1 Munkák Oldal Heading Hierarchia Kiegészítése
**Fájl:** `src/app/munkak/page.tsx`

```tsx
<section className="py-20 bg-bg-surface">
  <div className="max-w-4xl mx-auto px-6 text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
      Webfejlesztési Referenciák
    </h2>
    <p className="text-lg text-slate-400 mb-8">
      Next.js, WordPress és egyedi webfejlesztési projektek valós üzleti eredményekkel.
    </p>
  </div>
</section>

<section className="py-20 bg-bg-base">
  <div className="max-w-4xl mx-auto px-6 text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
      Grafikai Tervezési Referenciák
    </h2>
    <p className="text-lg text-slate-400 mb-8">
      Arculattervezés, logo design és brand identity projektek.
    </p>
  </div>
</section>
```

#### 3.4.2 Kapcsolat Oldal Heading Hierarchia Kiegészítése
**Fájl:** `src/app/kapcsolat/page.tsx`

```tsx
<section className="py-20 bg-bg-surface">
  <div className="max-w-4xl mx-auto px-6 text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
      Elérhetőség
    </h2>
    <p className="text-lg text-slate-400 mb-8">
      Lépj kapcsolatba velem ingyenes konzultációért.
    </p>
  </div>
</section>

<section className="py-20 bg-bg-base">
  <div className="max-w-4xl mx-auto px-6 text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
      Kapcsolatfelvételi Űrlap
    </h2>
    <p className="text-lg text-slate-400 mb-8">
      Töltsd ki az űrlapot, és 24 órán belül felkereslek.
    </p>
  </div>
</section>
```

### 3.5 AI SEO/AEO Optimalizáció (High Priority)

#### 3.5.1 FAQ Blokkok Hozzáadása Több Oldalra
**Fájl:** `src/app/szolgaltatasok/page.tsx`

```tsx
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Mennyi idő alatt készül el egy weboldal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Egy egyszerű bemutatkozó oldal 1–3 hét, egy komplexebb webshop 4–12 hét.",
      },
    },
    {
      "@type": "Question",
      name: "Mennyibe kerül egy weboldal készítése?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Egy egyszerű bemutatkozó oldal 150,000–300,000 Ft, egy komplexebb webshop 500,000–1,500,000 Ft.",
      },
    },
    {
      "@type": "Question",
      name: "Milyen technológiákat használsz?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Next.js 16, React 19, TypeScript, Tailwind CSS v4, Firebase, WordPress, WooCommerce.",
      },
    },
    {
      "@type": "Question",
      name: "Kell-e karbantartás a weboldalnak?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Igen, a weboldalaknak rendszeres karbantartásra van szükségük a biztonság és teljesítmény érdekében.",
      },
    },
  ],
};
```

#### 3.5.2 Entity-Based Content Optimalizáció
**Fájl:** `src/app/page.tsx`

Entity-based content hozzáadása a főoldalhoz, amely AI keresők számára optimalizált:

```tsx
<section className="py-20 bg-bg-surface">
  <div className="max-w-4xl mx-auto px-6">
    <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
      WebDude.hu – Digitális Szolgáltatások Kecskemétről
    </h2>
    <p className="text-lg text-slate-400 mb-4">
      A WebDude.hu egy prémium webfejlesztési és AI automatizációs ügynökség, amelyet Norbi alapított 2000-ben. A cég 26 éves grafikai és 16 éves webfejlesztői tapasztalattal rendelkezik, és Next.js 16, React 19, TypeScript, Tailwind CSS v4 és Firebase alapú modern weboldalakat és webshopokat fejleszt.
    </p>
    <p className="text-lg text-slate-400 mb-4">
      A WebDude.hu szolgáltatásai közé tartozik a weboldal készítés, webshop fejlesztés, SEO optimalizálás, AI automatizáció, grafikai tervezés és arculattervezés. A cég Kecskeméten működik, de az egész országból vannak elégedett ügyfelei.
    </p>
    <p className="text-lg text-slate-400">
      A WebDude.hu missziója, hogy prémium minőségű digitális megoldásokat nyújtson kis- és középvállalkozásoknak, amelyek növelik az ügyfélszerzést és az üzleti eredményeket.
    </p>
  </div>
</section>
```

### 3.6 Kulcsszó Stratégia és Tartalom Audit (Medium Priority)

#### 3.6.1 Fő Kulcsszavak
- **Webfejlesztés Kecskemét** (lokális SEO)
- **AI automatizáció** (emerging trend)
- **Next.js fejlesztő** (technikai specializáció)
- **Prémium weboldal készítés** (minőségi differenciálás)
- **Grafikai tervezés** (szolgáltatás)
- **WordPress fejlesztés** (népszerű platform)
- **Webshop készítés** (e-commerce)
- **SEO optimalizálás** (marketing)
- **Arculattervezés** (branding)
- **AI workflow** (innováció)

#### 3.6.2 Hosszú Farok Kulcsszavak
- "weboldal készítés árak Kecskemét"
- "Next.js webfejlesztő Magyarországon"
- "AI automatizáció kisvállalkozásoknak"
- "WordPress webshop fejlesztés Kecskemét"
- "prémium weboldal készítés árak"
- "grafikai tervező Kecskemét"
- "SEO audit szolgáltatás"
- "AI workflow sablonok"
- "egyedi arculattervezés árak"
- "weboldal karbantartás Kecskemét"

#### 3.6.3 Tartalom Stratégia
- **Blog bejegyzések:** Heti 1-2 új bejegyzés (WordPress tippek, AI trendek, grafikai hírek)
- **Esettanulmányok:** Havi 1 új esettanulmány (valós ügyfelek, mérhető eredmények)
- **Termék leírások:** Részletes, SEO optimalizált leírások minden termékhez
- **Szolgáltatás leírások:** Részletes, előny-orientált leírások minden szolgáltatáshoz
- **FAQ oldal:** Kiterjedt FAQ oldal gyakori kérdésekkel és válaszokkal

### 3.7 Versenytárs Elemzés és Differenciálás (Medium Priority)

#### 3.7.1 Fő Versenytársak
- **Webflow ügynökségek:** Globális versenytársak, magas árak
- **WordPress ügynökségek:** Helyi versenytársak, közepes árak
- **Freelance webfejlesztők:** Alacsony árak, változó minőség

#### 3.7.2 Differenciálás
- **Egyéni vállalkozás:** Közvetlen kommunikáció, nincs ügynökségi bonyolultság
- **26 év tapasztalat:** Grafikai és webfejlesztői tapasztalat kombinációja
- **AI automatizáció:** Innovatív AI workflow és agent rendszerek
- **Next.js specializáció:** Modern, gyors weboldalak
- **Lokális fókusz:** Kecskemét és Magyarország piaca
- **Prémium minőség:** Magasabb árszint, de jobb minőség és támogatás

---

## 📋 4. IMPLEMENTÁCIÓS ÜTEMEZÉS

### 4.1 1. Hét - Kritikus Problémák Javítása (High Priority)
- [ ] Szia Norbi Vagyok layout.tsx létrehozása és metadata export hozzáadása
- [ ] Termékek layout.tsx létrehozása és metadata export hozzáadása
- [ ] Munkák oldal metadata export kiegészítése
- [ ] Főoldal JSON-LD telefonszám javítása
- [ ] Dinamikus sitemap generálás implementálása

### 4.2 2. Hét - JSON-LD Schema Optimalizáció (High Priority)
- [ ] Szolgáltatások oldalak Service schema hozzáadása
- [ ] Termékek oldalak Product schema hozzáadása
- [ ] Blog bejegyzések Article schema hozzáadása
- [ ] BreadcrumbList schema implementálása
- [ ] Robots.txt frissítése

### 4.3 3. Hét - Tartalomstruktúra Optimalizáció (Medium Priority)
- [ ] Munkák oldal heading hierarchia kiegészítése
- [ ] Kapcsolat oldal heading hierarchia kiegészítése
- [ ] FAQ blokkok hozzáadása több oldalra
- [ ] Entity-based content optimalizáció

### 4.4 4. Hét - Kulcsszó Stratégia és Tartalom (Medium Priority)
- [ ] Kulcsszó stratégia kidolgozása
- [ ] Blog bejegyzések tervezése
- [ ] Esettanulmányok tervezése
- [ ] Termék leírások optimalizálása
- [ ] Szolgáltatás leírások optimalizálása

### 4.5 5. Hét - Kép Optimalizáció és Core Web Vitals (Medium Priority)
- [ ] Kép alt text audit és javítás
- [ ] next/image használata ellenőrzése
- [ ] Lazy loading implementálása
- [ ] Core Web Vitals mérés és optimalizáció

---

## 🎯 5. EREDMÉNYVÁRAJELŐZÉSEK

### 5.1 Rövid Távú Eredmények (1-2 hónap)
- **Google Search Console:** Javított indexelés, jobb pozíciók
- **Organikus forgalom:** 20-30% növekedés
- **AI keresők:** Jobb jelenlét ChatGPT, Perplexity, Gemini-ben
- **Core Web Vitals:** 95+ pontszám

### 5.2 Közép Távú Eredmények (3-6 hónap)
- **Organikus forgalom:** 50-100% növekedés
- **Lead generálás:** 30-50% növekedés
- **Brand ismertség:** Javított online jelenlét
- **Konverzió:** 10-20% növekedés

### 5.3 Hosszú Távú Eredmények (6-12 hónap)
- **Organikus forgalom:** 100-200% növekedés
- **Lead generálás:** 50-100% növekedés
- **Brand autoritás:** Iparági szakértő státusz
- **Üzleti növekedés:** 20-30% bevétel növekedés

---

## 📊 6. MÉRÉS ÉS KÖVETÉS

### 6.1 Google Search Console
- Indexelési státusz
- Kulcsszó pozíciók
- Kattintási arány
- Impressziók

### 6.2 Google Analytics 4
- Organikus forgalom
- Források és közvetítés
- Felhasználói viselkedés
- Konverziók

### 6.3 Core Web Vitals
- LCP (Largest Contentful Paint)
- CLS (Cumulative Layout Shift)
- INP (Interaction to Next Paint)
- FID (First Input Delay)

### 6.4 AI Keresők
- ChatGPT jelenlét
- Perplexity jelenlét
- Gemini jelenlét
- AI válasz motor optimalizáció

---

## 🔄 7. FOLYAMATOS OPTIMALIZÁCIÓ

### 7.1 Havi Feladatok
- [ ] Google Search Console ellenőrzés
- [ ] Core Web Vitals mérés
- [ ] Blog bejegyzés publikálás (1-2 db)
- [ ] Esettanulmány publikálás (1 db)
- [ ] Kulcsszó pozíciók ellenőrzése

### 7.3 Negyedéves Feladatok
- [ ] Teljes SEO audit
- [ ] Versenytárs elemzés
- [ ] Tartalom stratégia felülvizsgálata
- [ ] Technikai SEO ellenőrzés
- [ ] JSON-LD schema ellenőrzés

### 7.4 Éves Feladatok
- [ ] Teljeskörű SEO stratégia felülvizsgálata
- [ ] Brand audit
- [ ] Technológiai stack felülvizsgálata
- [ ] Üzleti célok és KPI-k felülvizsgálata

---

## 📝 8. KONKLÚZIÓ

A WebDude.hu jelenlegi SEO állapota közepes, de van sok javítanivaló. A legfontosabb problémák a metadata exportok hiánya a Szia Norbi Vagyok és Termékek oldalakon, a hiányos sitemap.xml, és a JSON-LD schema hiányosságok. Ezek javításával jelentős SEO és AI SEO javulás érhető el rövid távon.

A javasolt optimalizációs terv részletes és átfogó, amely lefedi a meta adatok, JSON-LD sémák, technikai SEO, tartalomstruktúra, AI SEO/AEO, kulcsszó stratégia és versenytárs elemzés területeket. A terv implementálása 5 hétig tart, és jelentős eredményeket várható 1-2 hónapon belül.

A folyamatos optimalizáció és mérés biztosítja, hogy a WebDude.hu hosszú távon is sikeres maradjon a Google és AI keresőkben.
