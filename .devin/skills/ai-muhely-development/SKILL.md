---
name: ai-muhely-development
description: AI Műhely Eszközök Fejlesztési Munkafolyamat
---

# AI Műhely Eszközök Fejlesztési Munkafolyamat

Ez a munkafolyamat a termékek oldalon lévő még nem fejlesztett AI Műhely eszközök implementálását határozza meg szakaszonként.

## Még Nem Fejlesztett AI Műhely Eszközök

### 1. Midjourney AI Műhely
- **Termék ID:** 8
- **Ár:** 129,000 Ft (eredeti: 179,000 Ft)
- **Leírás:** Midjourney v6 integráció prémium vizuálokhoz. 85mm G-Master optika, chiaroscuro lighting és Cyber-Dark aesthetic.
- **Jellemzők:** Midjourney v6 integráció, 85mm G-Master optika, Chiaroscuro lighting, Prémium vizuálok
- **Href:** `/termekek/midjourney-ai-muhely`
- **Route:** `/portal/ai-muhely/midjourney-ai-muhely`

### 2. SEO Audit AI Műhely
- **Termék ID:** 9
- **Ár:** 109,000 Ft (eredeti: 159,000 Ft)
- **Leírás:** SEO és AEO audit vizualizáció AI eszközökkel. Lighthouse score tracking, kulcsszó stratégia és AI válasz motor optimalizáció.
- **Jellemzők:** SEO audit vizualizáció, Lighthouse score tracking, Kulcsszó stratégia, AI válasz motor optimalizáció
- **Href:** `/termekek/seo-audit-ai-muhely`
- **Route:** `/portal/ai-muhely/seo-audit-ai-muhely`

### 3. Szezonalis AI Műhely
- **Termék ID:** 10
- **Ár:** 69,000 Ft (eredeti: 99,000 Ft)
- **Leírás:** Szezonalis grafikai kampányok AI eszközökkel. Ünnepi és szezonális vizuálok generálása Midjourney v6 Master promptokkal.
- **Jellemzők:** Szezonalis kampányok, Ünnepi vizuálok, Midjourney v6 Master promptok, Automatikus generálás
- **Href:** `/termekek/szezonalis-ai-muhely`
- **Route:** `/portal/ai-muhely/szezonalis-ai-muhely`

### 4. Tartalomtervező AI Műhely
- **Termék ID:** 11
- **Ár:** 89,000 Ft (eredeti: 129,000 Ft)
- **Leírás:** Tartalom és vizuális tervezés AI eszközökkel. Blog posztok, social media tartalmak és vizuálok generálása.
- **Jellemzők:** Tartalom generálás, Vizuális tervezés, Blog posztok, Social media tartalmak
- **Href:** `/termekek/tartalomtervezo-ai-muhely`
- **Route:** `/portal/ai-muhely/tartalomtervezo-ai-muhely`

### 5. UI/UX AI Műhely
- **Termék ID:** 12
- **Ár:** 149,000 Ft (eredeti: 199,000 Ft)
- **Leírás:** UI/UX design és wireframe generálás AI eszközökkel. Konverziófókuszú interface design és user experience optimalizáció.
- **Jellemzők:** UI/UX design generálás, Wireframe tervezés, Konverziófókuszú interface, User experience optimalizáció
- **Href:** `/termekek/ui-ux-ai-muhely`
- **Route:** `/portal/ai-muhely/ui-ux-ai-muhely`

### 6. Versenytárs Elemző AI Műhely
- **Termék ID:** 13
- **Ár:** 119,000 Ft (eredeti: 169,000 Ft)
- **Leírás:** Versenytárs vizuális elemzés AI eszközökkel. Design audit, trend elemzés és versenytárs stratégia kialakítás.
- **Jellemzők:** Versenytárs vizuális elemzés, Design audit, Trend elemzés, Versenytárs stratégia
- **Href:** `/termekek/versenytars-elemzo-ai-muhely`
- **Route:** `/portal/ai-muhely/versenytars-elemzo-ai-muhely`

## Fejlesztési Munkafolyamat (Minden Eszközre)

### 1. Fázis: Kutatás és Tervezés
- **Kutatás:** Utánanézni az adott témának (pl. Midjourney v6 promptok, SEO audit best practices, szezonális marketing trendek, tartalomtervezés, UI/UX design, versenytárs elemzés)
- **Specifikáció:** Részletes specifikáció megírása a prompt generátor számára
- **Típusdefiníciók:** TypeScript típusok tervezése (input, output, result, history)

### 2. Fázis: Backend Implementáció
- **TypeScript Típusdefiníciók:** `src/types/[eszköz-neve]-workshop.ts` létrehozása
- **Server Action:** `src/actions/[eszköz-neve]-workshop.ts` létrehozása Groq (Llama 3.3-70b) integrációval
- **System Prompt:** Norbi 26 éves szakértelme alapján rendszerprompt megírása
- **Firestore Mentés:** Generálási előzmények mentése az `ai_generations` kollekcióba

### 3. Fázis: Frontend Implementáció
- **Komponens:** `src/components/organisms/[Eszköz]WorkshopGenerator.tsx` létrehozása
- **React Hook Form + Zod:** Form validáció implementálása
- **Modern UI:** Bento Grid és Glassmorphism stílus, Cyber-Arany dizájn
- **Copy-to-Clipboard:** Másolási funkciók minden kimenethez
- **Superadmin Hozzáférés:** Autentikáció és jogosultság ellenőrzés

### 4. Fázis: Route és Terméklap
- **Route:** `/portal/ai-muhely/[eszköz-slug]` route létrehozása
- **Terméklap:** `/termekek/[eszköz-slug]` terméklap létrehozása (ha még nem létezik)
- **Metaadatok:** SEO optimalizált meta description és OpenGraph
- **JSON-LD Schema:** Strukturált adatok hozzáadása

### 5. Fázis: Validáció és Dokumentáció
- **TypeScript Validáció:** `npx tsc --noEmit` futtatása (0 hiba elvárás)
- **Linter Validáció:** `npm run lint` futtatása (0 hiba elvárás)
- **ARCHITECTURE.md Frissítés:** Komponens és route regisztrálása
- **CHANGELOG.md Frissítés:** Cycle bejegyzés hozzáadása

## Prioritási Sorrend

1. **Midjourney AI Műhely** - Legmagasabb prioritás (legnépszerűbb vizuális eszköz)
2. **SEO Audit AI Műhely** - Magas prioritás (SEO kereslet)
3. **Tartalomtervező AI Műhely** - Közepes prioritás (tartalom marketing)
4. **UI/UX AI Műhely** - Közepes prioritás (design eszköz)
5. **Szezonalis AI Műhely** - Alacsony prioritás (szezonális)
6. **Versenytárs Elemző AI Műhely** - Alacsony prioritás (niche eszköz)

## Megjegyzések

- Minden eszköznek ugyanazt a struktúrát kell követnie, mint a Banner AI Műhely és Logo AI Műhely
- A prompt generátornak professzionálisnak és kutatottnak kell lennie az adott témában
- Minden eszköznek Superadmin hozzáféréssel kell rendelkeznie
- A terméklapoknak SEO optimalizáltaknak kell lenniük
- Validáció és linter ellenőrzés kötelező minden eszköznél
