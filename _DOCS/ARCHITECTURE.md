# ARCHITECTURE.md — WebDude Rendszerarchitektúra

**webdude.hu | Next.js 16 · React 19 · TypeScript · Firebase**
**Utolsó frissítés: 2026-11-24 (7.93.0: Portalozott `AuthStatusBadge` Profil Menü + `/termekek` 14 Saját Aloldal Linkek & 2026 SEO/AIO/AEO/GEO Audit)**

> **7.74.0 (2026-11-20):** Additív SEO / AIO / AEO / GEO & Schema.org Tudásgráf Bővítés:
>
> - `SectionTitle` (`as?: "h1" | "h2"`) + `DirectAnswerBlock` (`badgeLabel?: string` EN támogatással); H1 hierarchia javítva az `ai-kep-es-videogeneralas` és `egyedi-arculattervezes-logo` oldalakon.
> - Kétirányú `hreflang` (`hu-HU ↔ en-US ↔ x-default`) + Twitter Card metaadatok pótolva a HU-EN oldalpárokon; duplikátum canonical (`/norbi` → `/szia-norbi-vagyok`, `/i-prompt-sablonok` → `/ai-megoldasok/ai-prompt-sablonok`); `src/app/sitemap.ts` szinkronizálva (`/ai-megoldasok/ai-muhely`, `/munkafolyamatok/strategist-pro/kristofka-munkafolyamat`).
> - Létrehozva a [public/llms.txt](file:///c:/CLI-PROJECTS/webdude-hu/public/llms.txt) AI keresőágenseknek (HU + EN szolgáltatások, esettanulmányok, tudásbázis cikkek, Zéró Fix Ár).
> - Egységesített `<DirectAnswerBlock />` + belső keresztlinkek (`munkak/*`, `hirek/*`, `szolgaltatasok/*`) az `/en/*` és kiemelt HU szolgáltatás- és termékoldalakon (`/termekek/*` `FAQPage` JSON-LD sémákkal kiegészítve).

> **7.72.0 (2026-11-20):** Publikus Hero Bannerek Egységesítése & CSS Scroll-Driven Parallax:
>
> - `scripts/generate-hero-placeholders.js`: `sharp` alapú `1920×1080` RGB WebP sablon-generátor `fs.existsSync()` felülírás-védelemmel (3 meglévő grafika átmásolva, 11 új sablon legenerálva), mind a 14 `hero-*.webp` kép felvéve a `scripts/generate-responsive-images.js` `hero` csoportjába (`17 kép → 136 fájl`).
> - `src/app/globals.css`: `.hero-parallax-img` tiszta CSS Scroll-Driven Animation (`@supports (animation-timeline: view())`, GPU-kompozitált `translate3d` + `scale(1.12)`, `prefers-reduced-motion` + `hover: none` védelem).
> - `HeroBackdrop` & `SubpageHero` (Server Componentek), `Hero.tsx` (`ResponsiveImage` + irányított scrim), `HeroBackgroundLayers.tsx` és `ScrollVideoHero.tsx` (blur eltávolítva, irányított scrim) + `*CaseStudy.tsx` finomítások.

> **7.67.0 (2026-11-17):** SEO/AIO/AEO/GEO & JSON-LD Tudásgráf Konszolidáció:
>
> - `src/lib/structuredData.ts`: `CANONICAL_FOUNDER_REF`, `CANONICAL_PERSON_ENTITY` (`@id: https://webdude.hu/#person`, `Balog Norbert`) és `CANONICAL_ORGANIZATION_ENTITY` (`@id: https://webdude.hu/#organization`, `WebDude`, `foundingDate: "2009"`) exportok; minden `src/app/**` route egységesítve.
> - `src/lib/mdx.ts`, `src/types/blog.ts` & `src/app/hirek/[slug]/page.tsx`: `extractFaqItems()` bevezetve a `faq` frontmatter és `## Gyakori kérdések` blokkok automatikus `FAQPage` JSON-LD generálásához a `TechArticle` séma mellett.
> - `src/app/robots.ts` & `public/robots.txt`: AI crawlerek (`GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`) szinkronizálva publikus útvonalakra, `/portal/`, `/admin/`, `/api/`, `/login` tiltva.
> - 3 új 2026-os high-converting MDX szakcikk + `generate-blog-covers.js` Kék-Lila v7.0 borítóképek + `generate-responsive-images.js` (117 kép / 776 fájl).

> **7.41.0 (2026-11-12):** Blog vizuális konszolidáció:
>
> - `scripts/generate-blog-covers.js`: Sharp-alapú SVG -> WebP 1200×630 generátor (Kék-Lila v7.0 / Cyber-Dark téma, kategória glow, automatikus címtördelés, E-E-A-T lábléc).
> - 25 db egyedi borítókép létrehozva a `public/assets/blog/covers/` könyvtárban.
> - Mind a 25 indexelhető MDX cikk frontmattere frissítve az egyedi borítóképekre (`image` és `coverImage`).
> - `scripts/generate-responsive-images.js --clean`: AVIF és WebP reszponzív derivatívumok legenerálva (320w–2000w), `src/data/responsiveImages.ts` manifestum frissítve.
> - Validáció: `npx tsc --noEmit` (0 hiba), `npm run lint` (0 hiba).

> **7.40.0 (2026-11-12):** Hírek archívum és cikkek teljes körű SEO/AEO/GEO modernizációja:
>
> - Új `tldr` frontmatter mező bevezetése mind a 25 indexelhető MDX cikkhez (40-60 szavas, tényalapú Direct Answer blokkok).
> - `src/app/hirek/[slug]/page.tsx`: TL;DR doboz megjelenítés `post.tldr || post.excerpt` prioritással, TechArticle séma `author` bővítés ("26 év grafikai és 16 év webfejlesztői tapasztalat") és `dateModified` kezelés.
> - XSS védelem (`.replace(/</g, '\\u003c')`), Zéró Fix Ár és Kék-Lila v7.0 vizuális sztenderdek 100%-os érvényesítése.
> - Validáció: `npx tsc --noEmit` (0 hiba), `npm run lint` (0 hiba).

> **7.37.0 (2026-10-28):** SEO / AIO / GEO audit és fejlesztés (Batch 1–5):
>
> - Meta description 145–160 karakter (`layout.tsx`, `page.tsx`, `szolgaltatasok/page.tsx`, `ai-megoldasok/layout.tsx`), `alternates` hreflang hu-HU/en-US/x-default, `robots` metaadatok
> - `ai-megoldasok/page.tsx` duplikált metadata eltávolítása (metadata kizárólag `layout.tsx`-ben, Next.js 16 App Router szabály)
> - Sitemap bővítése `/ai-megoldasok` oldallal
> - GEO Direct Answer blokkok (`szolgaltatasok/page.tsx`, `ai-megoldasok/page.tsx`, `weboldal-keszites/page.tsx` FAQ), 40–60 szó, AEO optimalizált
> - JSON-LD Service séma Organization provider-rel (`@id: "https://webdude.hu/#organization"`), Person/founder bővítése (Balog Norbert, 26 év grafikai + 16 év fejlesztői rutin)
> - Zéró Fix Ár végleges ellenőrzése (nincs `priceRange`, nincs konkrét Ft/EUR összeg a publikus oldalon)
> - Validáció: `npx tsc --noEmit` (0 hiba), `npm run lint -- --max-warnings 0` (0 hiba)

> **7.36.0 (2026-10-28):** Globális tipográfiai korrekció: Bebas Neue 400 faux-bold tiltása (`font-weight: 400 !important`), tágasabb tracking kártyacímeken (`letter-spacing: 0.06em`), hófehér címkontraszt és Plus Jakarta Sans 400/500/600 folyószöveg/UI bevezetése a Poiret One helyett. Validáció: `npx tsc --noEmit` (0 hiba), `npm run lint` (0 hiba).

> **7.28.1 (2026-10-14):** Benndfok képprobléma audit és brand konszolidáció. 13 fájl szép/Orange/Red-500 alapú gradiens-prop, color prop és hero overlay bg-black/60 → Kék-Lila v7.0 kompatibilis bg-slate-950/60 / brand-primary / brand-secondary tokenek. Szándékos kivételek megtartva (admin warning, szemantikus UI, funkcionális prompt kulcsok, WD AAA kontraszt, EmailTemplateEditor preview, HeaderNavClient dropdown spec). npx tsc --noEmit → TSC_EXIT=0; npm run lint -- --max-warnings 0 → LINT_EXIT=0; npm run build → BUILD_EXIT=0 (169 statikus oldal).

> **7.9.0 (2026-09-30):** Új `HeroBackgroundImage` molekula (`<picture>` + AVIF/WebP `srcSet` + `fetchPriority`) és a `scripts/generate-responsive-images.js` build-time generátor (`src/data/heroImages.ts` manifestum).
>
> ⚠️ **INFRASTRUKTÚRA-ÁLLÍTÁS:** a hosting **Phusion Passenger wrapperrel futó cPanel shared hosting** (`deploy.ps1`: standalone build → Passenger patch → `deploy-v0.1.XXX.zip` → manuális feltöltés), **nem Firebase**. A `next.config.js` `unoptimized: true` ezért **érvényes és szándékosan megmarad** (memóriakorlát); az `output: "standalone"` szükséges. A `firebase.json` **csak a `hosting` blokkja elavult** (`"public": "out"` sosem készült) — a `firestore`/`storage` szabályok miatt a fájl megmarad. Kontextus: a `remotePatterns` Firebase Storage hostname-ok admin-feltöltéshez továbbra is élnek.

> **6.3.0 (2026-09-24):** Új `/en` route (angol főoldal, natív JSON Dictionary i18n, hreflang) és JSON-LD SSOT (`src/lib/structuredData.ts`). A HU `/` route és a gyökér layout változatlan — zéró visszaesés.

> **6.2.0:** A vizuális rendszer Kék-Lila v7.0 (arany/amber tiltva). A színtokenek forrása a `src/app/globals.css`, az előírásokat a `DESIGN_SYSTEM.md` rögzíti. Új route, komponens, Firestore-séma vagy Server/Client határ nem keletkezett. A `MilestoneAccent` új alapértéke `neutral`; a `cyan` kizárólag visszafelé kompatibilis, semleges színű alias.

> Ez a dokumentum a projekt komponensstruktúrájának és architektúrális döntéseinek egyedüli forrása (SSOT). Minden új komponens létrehozásakor vagy módosításakor az AI ügynök köteles ezt a fájlt frissíteni.

---

## 1. Architektúrális Alapelv: Atomic Design

A projekt szigorúan az **Atomic Design** metodológiát követi (Brad Frost). Az UI egyszerű, újrafelhasználható egységekből épül fel, amelyek hierarchikusan összeállnak teljes oldalakká.

```
atoms  →  molecules  →  organisms  →  pages
```

| Szint         | Leírás                                           | Példák                                                 | Server/Client                    |
| ------------- | ------------------------------------------------ | ------------------------------------------------------ | -------------------------------- |
| **Atoms**     | Legkisebb, tovább nem bontható UI elemek         | Button, Input, Badge, Icon, Label, Spinner             | Többnyire Server                 |
| **Molecules** | 2–5 atom összekapcsolása funkcionális egységgé   | Card, FormField, NavItem, TestimonialItem, PricingCard | Vegyes                           |
| **Organisms** | Teljes oldalszekciókat alkotó, összetett blokkok | Header, Hero, Footer, PricingSection, ContactForm      | Többnyire Client (ha interaktív) |
| **Pages**     | `src/app/*/page.tsx` – organisms összeállítása   | page.tsx fájlok                                        | **Kizárólag Server Component**   |

---

## 2. Komponens Regiszter

> Az összes létező komponens nyilvántartása. Új komponens hozzáadásakor a megfelelő szekciót kell bővíteni.

### 2.1 Atoms

| Komponens        | Fájl                                            | Leírás                                                                                                                        | Direktíva        |
| ---------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `Button`         | `src/components/atoms/Button.tsx`               | Soft Premium gombok (primary/secondary/accent/ghost variáns, dual-theme támogatás, Link/button típus)                         | `"use client"`   |
| `ThemeToggle`    | `src/components/atoms/ThemeToggle.tsx`          | [7.70.0] Hydration-biztos Dual Theme kapcsoló (capsule / icon variáns, `localStorage` `webdude-theme`)                        | `"use client"`   |
| `Surface`        | `src/components/atoms/Surface.tsx`              | [7.70.0] Dual Theme szekció-konténer (`night` / `night-lift` / `slate` / `slate-lift`, opcionális aurora és grid rétegek)     | Server Component |
| `SectionTitle`   | `src/components/atoms/SectionTitle.tsx`         | Szekciók címsora (eyebrow, title, description)                                                                                | Server Component |
| `Badge`          | `src/components/atoms/Badge.tsx`                | Kiemelő badge/label (uppercase, tracking-wider)                                                                               | Server Component |
| `LoadingSpinner` | `src/components/atoms/LoadingSpinner.tsx`       | Triple spinning circles loading animáció (motion/react)                                                                       | `"use client"`   |
| `CopyButton`     | `src/app/portal/prompt-sablonok/CopyButton.tsx` | Vágólapra másoló gomb (navigator.clipboard.writeText)                                                                         | `"use client"`   |

### 2.2 Molecules

| Komponens                 | Fájl                                                       | Leírás                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Direktíva                     |
| ------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `MotionWrapper`           | `src/components/molecules/MotionWrapper.tsx`               | Motion animációk wrapper komponens (bundle size optimalizálás 34kb → 4.6kb)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `"use client"` (motion/react) |
| `BentoCard`               | `src/components/molecules/BentoCard.tsx`                   | Aszimmetrikus kártya (metric, title, description), soft shadow kerettel, motion animáció                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | `"use client"` (motion/react) |
| `StatItem`                | `src/components/molecules/StatItem.tsx`                    | Egy KPI statisztikai elem (value + label), Server Component                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Server Component              |
| `ComparisonCard`          | `src/components/molecules/ComparisonCard.tsx`              | Hagyományos vs Megoldás összehasonlító kártya (problem/solution)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Server Component              |
| `AnimatedSystemFlow`      | `src/components/molecules/AnimatedSystemFlow.tsx`          | Animált rendszerfolyam (Audit → AI Tervezés → Next.js Fejlesztés → Élesítés)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | "use client" (motion/react)   |
| `CaseStudyCard`           | `src/components/molecules/CaseStudyCard.tsx`               | KPI-fókuszált esettanulmány kártya (btshop.hu +40% KPI adatokkal)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | "use client" (motion/react)   |
| `AiChatMockup`            | `src/components/molecules/AiChatMockup.tsx`                | Interaktív AI chat mockup (animated AI response)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | "use client" (motion/react)   |
| `HeaderNavClient`         | `src/components/molecules/HeaderNavClient.tsx`             | [7.36.1 / 7.93.0] Interaktív navigációs sáv és mobil menü: dinamikus Top Bar scroll-hide (`scrollY > 20`, nyitott állapotban `overflow-visible` + `z-50`), sticky sötét üvegnavbar (`bg-slate-950/90`), Plus Jakarta Sans linkek, Mega Menü és mobil overlay | `"use client"` (motion/react) |
| `AuthStatusBadge`         | `src/components/molecules/AuthStatusBadge.tsx`             | [7.93.0] Dual Theme bejelentkezési / profil pill és `createPortal(..., document.body)` + `position: fixed` (`z-[120]`) lenyíló menü (`topbar` / `nav` / `mobile` variáns): közvetlen pill link (`/portal` ügyfélnek, `/admin/portal-kezelo` Szuperadminnak), automatikus felfelé nyitás a viewport alján, `Ügyfélportál (Vezérlőpult)`, `AI Műhely`, admin linkek és `Kijelentkezés` | `"use client"`                |
| `PortalNotificationBell`  | `src/components/molecules/PortalNotificationBell.tsx`      | [7.65.0] Spark-barát Anti-Drain portál harang: `usePortalNotifications` 60 mp-es láthatóság-érzékeny (`document.visibilityState === "visible"`) pollinggal (`getDocs` `limit(10)`, zéró `onSnapshot`), olvasatlan számláló badge-dzsel (`aria-live="polite"`), manuális frissítéssel (`RefreshCw`) és "Összes olvasottnak jelölése" (`CheckCheck`) funkcióval                                                                                                                                                                                                                                                                            | `"use client"` (motion/react) |
| `ContactForm`             | `src/components/molecules/ContactForm.tsx`                 | Validált kapcsolatfelvételi űrlap (Zod + React Hook Form)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `"use client"`                |
| `Timeline`                | `src/components/molecules/Timeline.tsx`                    | Animált szakmai idővonal                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | `"use client"` (motion/react) |
| `ServiceCard`             | `src/components/molecules/ServiceCard.tsx`                 | Szolgáltatás kártya (title, icon, description, tags)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | "use client" (motion/react)   |
| `PortfolioGrid`           | `src/components/molecules/PortfolioGrid.tsx`               | Animált referenciarács (Bento Grid, motion/react). **[7.28.0] Hézag-megszüntetés:** az `isHero` (index 0 + featured) kártya kap `md:col-span-2` + `md:w-1/2` + `md:border-r` + helyes `sizes` bontást, minden más kártya egységes `col-span-1` + `w-full grow` + `border-b` → 3 oszlopos rács zéró hézaggal, sértetlen sorrend; `grid-flow-row-dense` tartalék. A `projects` prop az `orderedWorks` (kért sorrend).                                                                                                                                                                                                                      | `"use client"`                |
| `BlogGrid`                | `src/components/molecules/BlogGrid.tsx`                    | Animált cikkrács a blogbejegyzésekhez (motion/react)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `"use client"`                |
| `PricingTable`            | `src/components/molecules/PricingTable.tsx`                | Prémium pricing táblázat (több szint, hover effektek, motion animációk)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `"use client"` (motion/react) |
| `ImageUploader`           | `src/components/molecules/ImageUploader.tsx`               | Drag-and-drop és kattintás alapú képfeltöltő Firebase Storage integrációval, haladási és hibakezeléssel                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `"use client"`                |
| `LeadKanbanCard`          | `src/components/molecules/LeadKanbanCard.tsx`              | Lead értékesítési kártya státuszváltó gombokkal és glassmorphism stílussal                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `"use client"` (motion/react) |
| `TemplateSelector`        | `src/components/molecules/TemplateSelector.tsx`            | UI template selector dropdown és apply gomb (client component)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `"use client"`                |
| `GraphicToolCard`         | `src/components/molecules/GraphicToolCard.tsx`             | Eszköz gomb kártya a grafikai AI eszközökhez (client component)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | `"use client"`                |
| `HistoryList`             | `src/components/molecules/HistoryList.tsx`                 | ClientAITools generáció-előzmények listája: betöltés/üres állapot, visszatöltés, másolás, törlés (props: generations, historyLoading, copiedGenId + onLoad/onCopy/onDelete)                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `"use client"`                |
| `GenerationOutput`        | `src/components/molecules/GenerationOutput.tsx`            | ClientAITools kimeneti oszlopa: gépelő szövegmegtekintés, Generálás/Másolás/Mentés/Reset akciók, mentési siker jelző (props: displayedText, loading, hasContent, copied, saveLoading, saveSuccess + handler propok)                                                                                                                                                                                                                                                                                                                                                                                                                      | `"use client"`                |
| `LighthouseAuditor`       | `src/components/molecules/LighthouseAuditor.tsx`           | Google PageSpeed API alapú interaktív audit vizualizáció (KPI mutatókkal)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `"use client"` (motion/react) |
| `OnboardingForm`          | `src/components/molecules/OnboardingForm.tsx`              | Kategória-specifikus dinamikus onboarding kérdőív (Zod + React Hook Form)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `"use client"`                |
| `ResponsiveImage`         | `src/components/molecules/ResponsiveImage.tsx`             | **7.9.0 / 7.10.0** – Általános reszponzív kép-betöltő: `<picture>` lánc (AVIF → WebP → eredeti) `srcSet` + `sizes` prop, `fetchPriority="high"` a fold feletti (LCP) képnél. A `next.config.js` `unoptimized: true` (cPanel/Passenger memóriakorlát) miatt a `next/image` nem ad reszponzív srcset-et, ezért statikus, build-time generált derivatívumokat használ (`scripts/generate-responsive-images.js` + `src/data/responsiveImages.ts` manifestum). **Graceful fallback:** ismeretlen kép esetén csendben nyers `<img>`-re esik vissza. Használják: `HeroSectionNew`, `PortfolioGrid`, `WorkCard`, `CaseStudiesBento`, `BlogGrid`. | Server Component (nincs hook) |
| `PerformanceGauge`        | `src/components/molecules/PerformanceGauge.tsx`            | Lebutított Lighthouse score gauge (statikus, vizuálisan lenyűgöző Performance Target grafikon)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `"use client"` (motion/react) |
| `PromptTemplatesClient`   | `src/app/portal/prompt-sablonok/PromptTemplatesClient.tsx` | AI Prompt Sablonok megjelenítése jogosultság ellenőrzéssel (superadmin automatikus hozzáférés, ügyfél csak ha hasPromptAccess: true)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `"use client"`                |
| `DocumentPreviewModal`    | `src/components/molecules/DocumentPreviewModal.tsx`        | Univerzális előnézeti modál PDF, képek és dokumentumok in-app megjelenítésére (iframe, <img>, letöltés, vágólap, új lapon megnyitás); Luminous Glassmorphism (`backdrop-blur-2xl`), `motion/react` nyitó/záró animációkkal, `useReducedMotion` támogatással, `useFocusTrap` (ESC + fókuszcsapda + fókusz-visszaállítás, WCAG 2.1.2/2.4.3) + Kék-Lila v7.0 tokenek. A `ClientVault` Eye-gombjához kötve. [7.26.0]: bubble-zárási hiba javítva (belső kattintás nem zárja be), nyers hex → tokenek.                                                                                                                                        | `"use client"` (motion/react) |
| `ProjectTimelineGantt`    | `src/components/molecules/ProjectTimelineGantt.tsx`        | Projekt idővonal & Gantt vizualizáció a portálhoz; dual-mode (`milestones` lista vagy `workflow` alapú automatikus 5 fázis generálás), KPI fejléc, összesített és fázis-szintű Gantt sávok, Kék-Lila v7.0 dizájn, `motion/react` + `useReducedMotion`                                                                                                                                                                                                                                                                                                                                                                                    | `"use client"` (motion/react) |
| `ProductPortalCta`        | `src/components/molecules/ProductPortalCta.tsx`            | Nyilvános termékoldali konverziós CTA - portál AI Műhely + egyedi árajánlat lánc, Kék-Lila v7.0 glassmorphism                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `"use client"` (motion/react) |
| `ToolAccessLock`          | `src/components/molecules/ToolAccessLock.tsx`              | Prémium Kék-Lila v7.0 zárolt panel az AI generátorok elé (`variant?: "guest" \| "denied"`): vendégeknek „Bejelentkezés” (`/portal`) + „Hozzáférés igénylése” (`/kapcsolat`), jogosultság nélküli ügyfeleknek „Zárolva” + „Hozzáférés igénylése” [7.54.0 / 7.92.0]                                                                                                                                      | `"use client"`                |
| `ToolAccessGate`          | `src/components/molecules/ToolAccessGate.tsx`              | [7.92.0] Granulált RBAC klienskapu az AI generátorok elé (`useToolAccess` + `src/lib/tool-access-policy.ts`): a generátor űrlapja kizárólag `granted` állapotban mountolódik (Szuperadmin vagy `users/{uid}.allowedTools` egyezés), így a publikus termékoldalak statikus HTML-jébe sem kerül ki űrlap                                                                                                    | `"use client"`                |
| `ProductFaqSection`       | `src/components/molecules/ProductFaqSection.tsx`           | [7.92.0] AEO-optimalizált látható `<details>` GYIK szekció + szinkronizált `FAQPage` JSON-LD (`serializeJsonLd` XSS védelemmel) a `/termekek/*` landing oldalakhoz                                                                                                                                                                                                                                        | Server Component              |
| `CopyButton` (megosztott) | `src/components/molecules/CopyButton.tsx`                  | Megosztott „Másolás/Másolva" gomb a PosterWorkshopGenerator szekcióihoz (7× deduplikált markup) [7.54.0] — NEM azonos a `app/portal/prompt-sablonok/CopyButton.tsx` legacy komponenssel                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Server Component              |
| `TimelineMilestoneItem`   | `src/components/molecules/TimelineMilestoneItem.tsx`       | Egyetlen mérföldkő az idővonalon: státusz-node (Kék-Lila v7.0 / cián / slate), fázis-ikon, státusz badge, dátum és mini Gantt haladássáv; akadálymentes `progressbar` ARIA szerepekkel                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `"use client"` (motion/react) |
| `AdminExportToolbar`      | `src/components/molecules/AdminExportToolbar.tsx`          | Egységesített Admin Export vezérlősáv (Leadek CSV, Projektek CSV, Tranzakciók CSV, KPI Riport PDF) `Loader2` töltésjelzővel, `aria-label` attribútumokkal és Kék-Lila v7.0 glassmorphism stílussal (`src/lib/admin-kpi-pdf.ts` dinamikus jsPDF helperrel) [7.64.0]                                                                                                                                                                                                                                                                                                                                                                       | `"use client"`                |
| `HeroBackdrop`            | `src/components/molecules/HeroBackdrop.tsx`                | [7.72.0] Egységes, 0 JS-es Hero háttérréteg (`ResponsiveImage` `sizes="100vw"` + `priority`, `.hero-parallax-img` CSS Scroll-Driven Parallax, `opacity-50 dark:opacity-60`, irányított balról-jobbra + alulról-felfelé Dual Theme scrim)                                                                                                                                                                                                                                                                                                                                                                                                     | Server Component              |
| `LivePromptPreviewCard`   | `src/components/molecules/LivePromptPreviewCard.tsx`       | [7.86.0] Megosztott Pro Prompt Stúdió élő előnézeti molekula (264 sor): Dual Theme + Kék-Lila v7.0 sticky panel, 0 ms-os karakter/szó/~token számláló, 1-kattintásos másolás (`aria-live="polite"`), negatív/guardrail blokk és opcionális Groq `refinePromptStudioAction` (1 mester-prompt + 3 variáció + magyar szakértői tippek) `useReducedMotion()` támogatással                                                                                                                                                                                                                                                                     | `"use client"` (motion/react) |

### 2.3 Organisms

| Komponens               | Fájl                                                 | Leírás                                                                                                                                                                                                                                                                                                                                                                                                                                            | Direktíva                     |
| ----------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `BtshopHero`            | `src/components/organisms/BtshopHero.tsx`            | btshop.hu esettanulmány hero - spring animált H1, glassmorphism statisztikák, mesh grid háttér, placeholder vizuál                                                                                                                                                                                                                                                                                                                                | `"use client"` (motion/react) |
| `BtshopEngineeringGrid` | `src/components/organisms/BtshopEngineeringGrid.tsx` | btshop.hu mérnöki Bento Grid - 4 integrációs doboz (Kulcs-Soft híd, Merchant feed, SEO plugin, logisztika), staggered spring animáció                                                                                                                                                                                                                                                                                                             | `"use client"` (motion/react) |
| `BtshopEeatSection`     | `src/components/organisms/BtshopEeatSection.tsx`     | btshop.hu E-E-A-T szekció - egyszemélyes szaktudás hitelesítés, 4 elv kártya, dashboard vizuál                                                                                                                                                                                                                                                                                                                                                    | `"use client"` (motion/react) |
| `BtshopFinalCta`        | `src/components/organisms/BtshopFinalCta.tsx`        | btshop.hu high-ticket CTA - egyedi árajánlat kérés nagyvállalati rendszerekre, Kék-Lila v7.0 glow, spring hover                                                                                                                                                                                                                                                                                                                                   | `"use client"` (motion/react) |
| `DrNagyAlbertCaseStudy` | `src/components/organisms/DrNagyAlbertCaseStudy.tsx` | Dr. Nagy Albert neurológus esettanulmány - WOW-hatás motion animációkkal, Kék-Lila v7.0, spring physics (stiffness: 100, damping: 20), Hero szekció: dr-nagy-albert-neurologus-2.webp, e-recept és távkonzultáció rendszer bemutatása                                                                                                                                                                                                             | `"use client"` (motion/react) |
| `AiPromptCaseStudy`     | `src/components/organisms/AiPromptCaseStudy.tsx`     | AI-Prompt.hu esettanulmány - saját fejlesztésű AI prompt optimalizáló platform, WOW-hatás motion animációkkal, Kék-Lila v7.0, spring physics (stiffness: 100, damping: 20), Hero szekció: ai-promt-hi-banner-2.webp, intelligens prompt engineering, struktúrált kimenetek (JSON, CSV, XML), API integráció (OpenAI, Anthropic, Google AI)                                                                                                        | `"use client"` (motion/react) |
| `GoBoxCaseStudy`        | `src/components/organisms/GoBoxCaseStudy.tsx`        | Go-Box Kft. doboxgyár esettanulmány - WOW-hatás motion animációkkal, Kék-Lila v7.0, spring physics (stiffness: 100, damping: 20), Hero szekció: repulo-dobozok.webp (2635×1200 high-res), logó és arculattervezés, weboldal, WooCommerce webshop, SEO/AEO optimalizáció, prémium ipari márkaidentitás                                                                                                                                             | `"use client"` (motion/react) |
| `LeanperialCaseStudy`   | `src/components/organisms/LeanperialCaseStudy.tsx`   | Leanperial „Quiet Luxury\" esettanulmány - TISZTA Server Component (RSC, CSS-only hover/glass/glow, nincs kliens JS), Kék-Lila v7.0, Hero: leanperial website mockup.webp, KPI áttekintő blokk (Ügyfél/Iparág/Megoldás/Eredmény), Zéró Fix Ár CTA; összeszerkeszti a LeanperialProcessGrid-et (Atomic Design <300 sor), lucide `Gauge` + ResponsiveImage                                                                                          | RSC (nincs direktíva)         |
| `LeanperialProcessGrid` | `src/components/organisms/LeanperialProcessGrid.tsx` | Leanperial „Quiet Luxury" 5 lépéses aszimmetrikus Bento Grid (kibontva a LeanperialCaseStudy-bol a ~300-sor hatar miatt) - TISZTA RSC, Kék-Lila v7.0, hatterkeppel (K-Leanperial_banner/banner2, K-Mastering_questioning_bg, K-Executive_Search-bg) atetszo/hover-effektes kartyak; technikai bravurok: DNS, Let's Encrypt, WebP, SMTP/SPF/DKIM, Schema Markup; ResponsiveImage + lucide (ShieldCheck, Palette, Mail, Search, Sparkles)           | RSC (nincs direktíva)         |
| `NedelMarketCaseStudy`  | `src/components/organisms/NedelMarketCaseStudy.tsx`  | Nedel Market esettanulmány - WooCommerce katalógus + irodai szerver integráció, Client Component (motion/react rugó-fizika stiffness: 100 damping: 20 + useReducedMotion), Kék-Lila v7.0, Hero: nedel_market_banner.webp, H1 + lead, KPI áttekintő (Megoldás/Biztonság/Láthatóság/Eredmény), összeszerkeszti a NedelMarketBentoGrid-et, Zéró Fix Ár CTA (/kapcsolat); lucide (Server, ShieldCheck, Search, BarChart3) + ResponsiveImage           | `"use client"` (motion/react) |
| `NedelMarketBentoGrid`  | `src/components/organisms/NedelMarketBentoGrid.tsx`  | Nedel Market 4 pilléres Bento Grid (kibontva a NedelMarketCaseStudy-bol a ~300-sor hatar miatt) - Client Component, Kék-Lila v7.0, glassmorphism + spring belépés, 4 vívmány-kártya: Helyi Szerver & Valós Idejű Könyvelés (RAID/Backup), Wordfence tűzfal, RankMath AEO/SEO, GA4/Search Console/Bing analitika; hatterképes kártyák (nedel_market_banner, fehér_spárga, paprika_eladó_banner1) + lucide (Server, ShieldCheck, Search, BarChart3) | `"use client"` (motion/react) |

| `HeroSectionNew` | `src/components/organisms/HeroSectionNew.tsx` | **252 sor (7.62.0)** – vékony karmester (orchestrator) komponens a főoldali Kék-Lila v7.0 Hero diavetítéshez: a slide-adatokat a `heroSlidesConfig.tsx` szolgáltatja, a háttérrétegeket (`ResponsiveImage` LCP `priority={currentSlide === 0}`, mesh grid, glow gömbök) a `HeroBackgroundLayers`, a vezérlőket (`tablist`, nyilak, scroll jelző) a `HeroSliderControls` rendereli; megőrzi az `isolate` kontextust és a `hero-cta-*-primary` E2E szelektorokat. | `"use client"` (motion/react) |
| `HeroBackgroundLayers` | `src/components/organisms/hero/HeroBackgroundLayers.tsx` | [7.62.0 / 7.72.0] A főoldali Hero háttérkép-rétege (`ResponsiveImage` `priority={currentSlide === 0}` LCP védelemmel, `.hero-parallax-img` CSS Scroll-Driven Parallax), irányított kontraszt-scrim, CSS mesh grid és Kék-Lila v7.0 radial glow gömbök (`hero-blob-1`, `hero-blob-2`). | `"use client"` (motion/react) |
| `SubpageHero` | `src/components/organisms/SubpageHero.tsx` | [7.72.0] Tiszta Server Component aloldali Hero szekció (0 extra kliens JS): `HeroBackdrop` (`ResponsiveImage` + `.hero-parallax-img` + irányított scrim), CSS mesh grid, eyebrow badge, H1, alcím és opcionális CTA gombok. | Server Component |
| `HeroSliderControls` | `src/components/organisms/hero/HeroSliderControls.tsx` | [7.62.0] A főoldali Hero diavetítés alsó vezérlősávja (`role="tablist"` pöttyök, `01 / 03` számláló, előző/következő nyilak) és a `HeroScrollHint` görgetésjelző (94 sor). | `"use client"` (motion/react) |
| `NavigationNew` | ~~`src/components/organisms/NavigationNew.tsx`~~ **ARCHIVÁLT** (`_mentesek/2026-09-21-legacy-cleanup/`) | Apple-style minimal navigáció, sticky, frosted glass (LEGACY — `HeaderNavClient` váltotta) | `"use client"` (motion/react) — archivált |
| `ServiceSectionNew` | `src/components/organisms/ServiceSectionNew.tsx` | Soft Premium szolgáltatás szekció - aszimmetrikus Bento Grid, 3D clay ikonok | `"use client"` (motion/react) |
| `PortfolioSectionNew` | ~~`src/components/organisms/PortfolioSectionNew.tsx`~~ **ARCHIVALT** (`_mentesek/20260918_asset-fix/`) | Soft Premium portfolio szekcio - nagy case study kartyak, MacBook mockupok. **Nem hasznalt:** sehol nincs importalva, vilagos tema (`bg-white`), a v7.0 sotet migraciobol kimaradt - archivalva a 2 torott asset-hivatkozassal egyutt (btshop.webp, solar-system-ai.webp) | - (archivalt) |
| `TrustSectionNew` | `src/components/organisms/TrustSectionNew.tsx` | Soft Premium trust szekció - prémium monochrome logo strip | `"use client"` (motion/react) |
| `HeroSection` | ~~`src/components/organisms/HeroSection.tsx`~~ **ARCHIVALT** (`_mentesek/2026-09-21-legacy-cleanup/`) | Lead engine forgó hero szekció 3 diával, nagyfelbontású háttérképekkel, nyíl/pötty navigációval (LEGACY — `HeroSectionNew` váltotta) | `"use client"` — archivált |
| `SocialProofStrip` | `src/components/organisms/SocialProofStrip.tsx` | Bizalomépítő sáv KPI statisztikákkal, scroll-velocity marquee logószalag (Soft Premium) | `"use client"` (motion/react) |
| `ProblemSolution` | `src/components/organisms/ProblemSolution.tsx` | Hagyomány vs Megoldás összehasonlító szekció (ComparisonCard molekulák) | Server Component |
| `ProblemSectionClient` | `src/components/organisms/ProblemSectionClient.tsx` | Üvegkártyás (glassmorphism) kihívásokat bemutató szekció CTA gombbal | `"use client"` |
| `FeaturedServices` | `src/components/organisms/FeaturedServices.tsx` | Kiemelt szolgáltatások aszimmetrikus Bento Gridben (LEGACY) | Server Component |
| `FeaturedServicesNew` | `src/components/organisms/FeaturedServicesNew.tsx` | Kiemelt szolgáltatások aszimmetrikus Bento Grid (2+1+1), hover lift effektek, feature listák (Soft Premium) | `"use client"` (motion/react) |
| `SystemShowcase` | `src/components/organisms/SystemShowcase.tsx` | Rendszerbemutató szekció — animált 4 lépéses folyamatábra scroll-bound vonallal, hover lift kártyákkal (Soft Premium) | `"use client"` (motion/react) |
| `CaseStudies` | `src/components/organisms/CaseStudies.tsx` | Esettanulmányok szekció (LEGACY) | Server Component |
| `CaseStudiesBento` | `src/components/organisms/CaseStudiesBento.tsx` | 2 kiemelt esettanulmány KPI számokkal, hover lift, DL/DT/DD szemantikával géppel olvasható formátumban (Soft Premium) | `"use client"` (motion/react) |
| `AiAssistantDemo` | `src/components/organisms/AiAssistantDemo.tsx` | AI Assistant demo szekció — interaktív chat mockup és CTA | Server Component |
| `AboutSection` | `src/components/organisms/AboutSection.tsx` | Személyes bemutatkozó szekció (portré + történet) | Server Component |
| `FaqSection` | `src/components/organisms/FaqSection.tsx` | GYIK / FAQ szekció natív details/summary harmonikával (LEGACY) | Server Component |
| `FaqSectionAEO` | `src/components/organisms/FaqSectionAEO.tsx` | AEO-optimalizált accordion GYIK FAQPage JSON-LD schemával, spring physics animációval (Soft Premium) | `"use client"` (motion/react) |
| `FinalCta` | `src/components/organisms/FinalCta.tsx` | Erőteljes záró CTA teljes képernyős szerű blokkal (Soft Premium) | Server Component |
| `Header` | ~~`src/components/organisms/Header.tsx`~~ **ARCHIVALT** (`_mentesek/2026-09-21-legacy-cleanup/`) | Navigáció, logo, mobilmenü (LEGACY - NavigationNew váltotta) | `"use client"` (mobilmenü toggle) |
| `Footer` | `src/components/organisms/Footer.tsx` | Oldallábléc, szerzői jogok, Soft Premium dizájn | Server Component (nincs direktíva) |
| `WebDudeChat` | `src/components/organisms/WebDudeChat.tsx` | Intelligens chat asszisztens és lead-minősítő widget | `"use client"` (Vercel AI SDK, motion) |
| `CookieConsent` | `src/components/organisms/CookieConsent.tsx` | GDPR kompatibilis cookie consent banner (localStorage alapú beleegyezés, dinamikus GA betöltés) | `"use client"` (motion/react) |
| `AdminSidebar` | `src/app/admin/layout.tsx` | Admin felület oldalsó navigáció (Dashboard, Leadek, Portfólió, Email Sablonok, Statisztikák, Beállítások menüpontok, Notification Center Bell ikonnal, dropdown menüvel, unread jelöléssel, kijelentkezés) | `"use client"` (Firebase Auth) |
| `QuoteRequestForm` | `src/components/organisms/QuoteRequestForm.tsx` | Több lépcsős interaktív ajánlatkérő űrlap (Bento grid, Zod validáció) | `"use client"` |
| `ContactFormWrapper` | `src/components/organisms/ContactFormWrapper.tsx` | Hibrid ajánlatkérő és gyors kapcsolatfelvételi űrlap wrapper | `"use client"` |
| `PortalDashboard` | `src/components/organisms/PortalDashboard.tsx` | **126 sor (7.56.0)** – vékony karmester komponens: a munkamenetet a `usePortalSession`, az adatokat és akciókat a `usePortalData` hook szolgáltatja, a megjelenítést pedig teljes egészében a `portal/*` al-komponensek (`PortalHeader`, `PortalHeroAndTabs`, `PortalAlerts`, `PortalClientWorkspace`, `PortalWorkflowGrid`, `PortalWorkflowCard`, `PortalOnboardingSection`, `PortalOrdersSection`) és az `AdminPanel` végzi. | `"use client"` |
| `PortalHeader` | `src/components/organisms/portal/PortalHeader.tsx` | Portál sticky fejléce: brand, navigáció (Projektek / Műhely / Sablonok), PortalNotificationBell, email chip, kijelentkezés. | `"use client"` (motion/react) |
| `PortalHeroAndTabs` | `src/components/organisms/portal/PortalHeroAndTabs.tsx` | [7.56.0] Portál belső címsor (`Aktív Projektek & Workflow`, `font-heading` H2) és szuperadmin nézetváltó fülek (`Kliens Nézet / Portál` vs. `Rendszer Admin`) WCAG AA `role="tablist"` / `role="tab"` / `aria-selected` / `focus-visible` attribútumokkal és Kék-Lila v7.0 tokenekkel. | `"use client"` |
| `PortalClientWorkspace` | `src/components/organisms/portal/PortalClientWorkspace.tsx` | [7.56.0] Ügyfélportál fő munkaterülete (`role="tabpanel"`): `PortalWorkflowGrid`, `PortalOnboardingSection`, `AddonStore`, `PortalOrdersSection`, `ProjectTimelineGantt`, 2 oszlopos `ClientVault` + `ClientAITools`, valamint `CaseStudyCarousel`. | `"use client"` |
| `PortalAlerts` | `src/components/organisms/portal/PortalAlerts.tsx` | Visszajelzések: hiba-sáv, siker-sáv és a Stripe tranzakció-ellenőrző full-screen overlay. | `"use client"` |
| `PortalWorkflowGrid` | `src/components/organisms/portal/PortalWorkflowGrid.tsx` | Workflow Bento Grid: üres állapot vagy a `PortalWorkflowCard` komponensek rácsa (2 oszlopos, reszponzív). | `"use client"` |
| `PortalWorkflowCard` | `src/components/organisms/portal/PortalWorkflowCard.tsx` | Egy workflow kártya: státusz-badge, animált haladás, leírás, jegyzetek, Stripe mérföldkő-fizetés, fázis-jóváhagyás, `WorkflowChat`, lábléc. | `"use client"` (motion/react) |
| `PortalOnboardingSection` | `src/components/organisms/portal/PortalOnboardingSection.tsx` | Onboarding adatlapok szekció: a kifizetett, kitöltetlen add-onokhoz `OnboardingForm`, kategóriánkénti sémával. | `"use client"` |
| `PortalOrdersSection` | `src/components/organisms/portal/PortalOrdersSection.tsx` | Megrendelések szekció (superadmin): `OrderStatusCard` rács kézbesítési akcióval. | `"use client"` |
| `ClientAITools` | `src/components/organisms/ClientAITools.tsx` | **288 sor (7.57.0)** – vékony karmester (orchestrator) komponens a portál interaktív AI generátorához: az eszközdefiníciókat és payload-építőket az `src/lib/aiToolsRegistry.ts` szolgáltatja, a megjelenítést az `ai-tools/*` al-komponensek (`AIToolsCategoryAndSelector`, `AIToolsMarketingForms`, `AIToolsGraphicsForms`), a `KristofkaWorkflow`, a `GenerationOutput` és a `HistoryList` végzi; megőrzi az `ai_generations` kliensoldali Firestore fallbacket. | `"use client"` |
| `AIToolsCategoryAndSelector` | `src/components/organisms/ai-tools/AIToolsCategoryAndSelector.tsx` | [7.57.0] Az Élő AI Generátor fejléce, kategória-fülei (`Marketing & Szövegírás`, `Grafika & Tervezés`, `Strategist Pro` — WCAG AA `role="tablist"` / `role="tab"` / `aria-selected`), az eszközválasztó `GraphicToolCard` kártyarács, az aktív eszköz leírása és a globális hibaüzenet. | `"use client"` |
| `AIToolsMarketingForms` | `src/components/organisms/ai-tools/AIToolsMarketingForms.tsx` | [7.57.0] A Marketing & Szövegírás kategória 4 eszközének (`product_desc`, `review_assistant`, `social_matrix`, `cart_recovery`) animált input űrlapjai (`AnimatePresence`). | `"use client"` (motion/react) |
| `AIToolsGraphicsForms` | `src/components/organisms/ai-tools/AIToolsGraphicsForms.tsx` | [7.57.0] A Grafika & Tervezés kategória 5 eszközének (`midjourney_prompt`, `banner_concept`, `logo_designer`, `ui_ux_designer`, `seasonal_campaign_designer`) animált input űrlapjai Kék-Lila v7.0 tokenekkel (`AnimatePresence`). | `"use client"` (motion/react) |
| `LeadKanbanBoard` | `src/components/organisms/LeadKanbanBoard.tsx` | CRM Kanban tábla tölcsér fázisokkal és optimistic UI frissítésekkel | `"use client"` |
| `AdminPanel` | `src/components/organisms/AdminPanel.tsx` | Cyber-Dark stílusú szuperadmin kezelőpanel ügyfél regisztrációs és add-on hozzárendelési funkciókkal | `"use client"` |
| `WorkflowChat` | `src/components/organisms/WorkflowChat.tsx` | Aszinkron direct megbeszélés chat kliens-admin között 30 másodperces anti-drain polling védelemmel | `"use client"` |
| `ServicesSection` | `src/components/organisms/ServicesSection.tsx` | Szolgáltatás‑szekció – grid + ServiceCard elemek | Server Component |
| `AdminDashboard` | `src/components/organisms/AdminDashboard.tsx` | Admin KPI Dashboard Bento Grid elrendezéssel, Top Cards Grid ikonokkal (Mail, FolderKanban, Brain, Activity) és trend indikátorokkal (+12%, +5%, +28%), Activity Feed szekcióval AI recentLogs alapján, Friss Tevékenység megjelenítéssel, Recharts grafikonokkal és CSV export funkcióval | `"use client"` |
| `ClientVault` | `src/components/organisms/ClientVault.tsx` | Ügyfélszéf és fájlmegosztó drag-and-drop feltöltéssel, előnézet modállal (PDF/JPG) és letöltéssel. [7.27.0]: a fájlkártyák (PDF/kép) teljes felülete kattintható az előnézetre (`role=\"button\"` + `tabIndex` + Enter/Space + `aria-label`, WCAG 2.1.1), a Letöltés/Törlés akciók `stopPropagation`-vel elszigetelve; `DocumentPreviewModal` bekötve. | `"use client"` |
| `KristofkaWorkflow` | `src/components/organisms/KristofkaWorkflow.tsx` | **220 sor (7.62.0)** – vékony karmester (orchestrator) komponens a Kristófka Munkafolyamat (Strategist-Pro) modulhoz: Firebase Auth + `ToolAccessLock` RBAC (`kristofka_workflow`), `generateKristofkaPitchAction` és hitelesített `saveToCaseStudyAction(..., idToken)` hívás; a megjelenítést a `KristofkaInputForm` és a `KristofkaPitchOutput` végzi. | `"use client"` (motion/react) |
| `KristofkaInputForm` | `src/components/organisms/kristofka/KristofkaInputForm.tsx` | [7.62.0] A Kristófka Munkafolyamat bemeneti űrlapja (163 sor): `UniversalFileUploader` PDF alaprajz-feltöltés, célcsoport-, narratíva-, hangvétel- és energetikai besorolás választók, valamint generáló CTA. | `"use client"` |
| `KristofkaPitchOutput` | `src/components/organisms/kristofka/KristofkaPitchOutput.tsx` | [7.62.0] A Kristófka Munkafolyamat eredmény-panelje (222 sor): 4 befektetői pitch szekció (örökség, vízió, pénzügy, ROI) másolással, TXT letöltés, dinamikus `await import("jspdf")` PDF export és NotebookLM Markdown adatcsomag export használati kisokossal. | `"use client"` |
| `MunkakFaqSection` | `src/components/organisms/MunkakFaqSection.tsx` | /munkak FAQ szekció — tiszta Server Component, 4 AI-kereső-barát konverziós kérdés-válasz + saját FAQPage JSON-LD séma (XSS-védve); Kék-Lila v7.0 glassmorphism. A grid és a záró CTA közé renderelve [7.28.0] | Server Component |
| `EmailTemplateEditor` | `src/components/organisms/EmailTemplateEditor.tsx` | **235 sor (7.62.0)** – vékony karmester (orchestrator) komponens az admin Email Template Editorhoz: Firebase Auth `idToken`, sablon CRUD (`getEmailTemplatesAction`, `saveEmailTemplateAction`, `deleteEmailTemplateAction`), változókezelés; a szerkesztőt/előnézetet az `EmailTemplateFormAndPreview`, a sablonlistát az `EmailTemplatesList` rendereli. | `"use client"` |
| `EmailTemplateFormAndPreview` | `src/components/organisms/email-editor/EmailTemplateFormAndPreview.tsx` | [7.62.0] Az Email Template Editor űrlap- és előnézeti panelje (232 sor): sablon mezők (`templateId`, `name`, `subject`, `category`, dinamikus `{{variable}}` chipek, HTML szerkesztő) és izolált `<iframe srcDoc={formData.htmlContent} sandbox="" />` előnézet. | `"use client"` (motion/react) |
| `EmailTemplatesList` | `src/components/organisms/email-editor/EmailTemplatesList.tsx` | [7.62.0] Az Email Template Editor sablonkártya-rácsa és üres állapota (121 sor): szerkesztés, duplikálás és törlés műveletekkel. | `"use client"` (motion/react) |
| `AIWorkshopCollection` | `src/components/organisms/AIWorkshopCollection.tsx` | **287 sor (7.62.0)** – az `/portal/ai-muhely` Kreatív Stúdió gyűjtemény-oldalának karmester komponense: Firebase Auth + `getClientUserProfileAction` jogosultság-ellenőrzés, kategóriaszűrő (`visual`, `web`, `seo`, `strategy`) és 18 kártyás generátor-rács; a statikus katalógus-adatokat az `src/data/ai-workshop-collection-config.ts` szolgáltatja. | `"use client"` |
| `BannerHero` | `src/components/organisms/BannerHero.tsx` | Konverziófókuszú hero banner (90/8/2 színarány, Motion animációk, E-E-A-T horgonyok) | `"use client"` (motion/react) |
| `LighthousePerformanceSection` | `src/components/organisms/LighthousePerformanceSection.tsx` | Scroll-trigger-elt Lighthouse score animáció (useScroll, useTransform, 0-95+ score counter) | `"use client"` (motion/react) |
| `SuperAdminDashboard` | `src/components/organisms/SuperAdminDashboard.tsx` | Szuperadmin Dashboard menüstruktúra (Vizuális Motor, Kreatív Motor, Product Optimizer, System Config), Audit & Deploy funkció, Workflow integráció táblázat | `"use client"` (motion/react) |
| `ArchitectViewSection` | `src/components/organisms/ArchitectViewSection.tsx` | Fix, minimális méretű sötét tónusú Audit-kártya a 95+ Lighthouse score mérnöki lépéseivel (WebDude Minőségbiztosítási Pecsét) | `"use client"` (motion/react) |
| `ProductLeadHero` | `src/components/organisms/ProductLeadHero.tsx` | Termékoldal Hero szekció Authority-Driven SEO horgonyokkal (26 év tapasztalat, Next.js/Supabase technológia) és "Ingyenes Weboldal Audit" CTA-val | `"use client"` (motion/react) |
| `TechnicalSpecSection` | `src/components/organisms/TechnicalSpecSection.tsx` | Technikai specifikáció szekció 6 ponttal (Fertőzésmentes Architektúra, Lighthouse 95+, Modern Tech Stack, Firebase Security, Entity-based SEO, GDPR) | `"use client"` (motion/react) |
| `LeadGenerationForm` | `src/components/organisms/LeadGenerationForm.tsx` | Lead-Magnet űrlap "Ingyenes Weboldal Audit" kéréshez (név, email, weboldal, üzenet) validációval és success/error state-ekkel | `"use client"` |
| `SEOAuditHeroBanner` | `src/components/organisms/SEOAuditHeroBanner.tsx` | SEO & AEO Audit Pro Hero szekció Midjourney v6 Master prompt alapján, Authority-Driven SEO horgonyokkal (26 év tapasztalat, 16 év CMS szakértelem) | `"use client"` (motion/react) |
| `ProofBarSection` | `src/components/organisms/ProofBarSection.tsx` | Proof-Bar szekció 26 év tapasztalat és 95+ Lighthouse score bemutatásával, statisztikákkal (47+ vélemény, 4.9 értékelés, 24h válaszidő, 100% garancia) | `"use client"` (motion/react) |
| `AEOImpactSection` | `src/components/organisms/AEOImpactSection.tsx` | AEO Impact animáció szekció dinamikus grafikonokkal (Audit Előtt vs Audit Után), Lighthouse score, Organikus Találat, AI Válasz Motor mutatókkal | `"use client"` (motion/react) |
| `BannerWorkshopGenerator` | `src/components/organisms/BannerWorkshopGenerator.tsx` | Banner AI Műhely generátor React Hook Form + Zod validációval, Groq (Llama 3.3-70b) integrációval, Kék-Lila v7.0 dizájnnal és copy-to-clipboard funkciókkal | `"use client"` (motion/react) |
| `LogoWorkshopGenerator` | `src/components/organisms/LogoWorkshopGenerator.tsx` | **191 sor (7.59.0)** – vékony karmester (orchestrator) komponens a Logó AI Műhelyhez: Firebase Auth + `ToolAccessLock` RBAC (`logo_ai_muhely`), React Hook Form + Zod (`logoFormSchema`), `addLogoGenerationAction` hívás; a megjelenítést a `LogoInputForm` és a `LogoOutputStudio` organizmusok végzik Kék-Lila v7.0 tokenekkel. | `"use client"` |
| `LogoInputForm` | `src/components/organisms/logo-workshop/LogoInputForm.tsx` | [7.59.0] A Logó AI Műhely bal oldali paraméterező űrlapja (264 sor): `logoFormSchema`, 1-kattintásos iparági presetek (`INDUSTRY_PRESETS`), márkanév/szlogen/iparág/célközönség, 7 logó archetípus (`ARCHETYPE_OPTIONS`), 5 konstrukciós rács (`GRID_OPTIONS`), vizuális stílus és színpaletta presetek, szimbólum-irányelvek és Kék-Lila v7.0 generáló CTA. | `"use client"` |
| `LogoOutputStudio` | `src/components/organisms/logo-workshop/LogoOutputStudio.tsx` | [7.59.0] A Logó AI Műhely eredmény-stúdiója (234 sor): 3 produkciós koncepció kártya (Illustrator/CorelDRAW rajz + Recraft v3 / Ideogram 2.0 / Midjourney v6.1 promptok `CopyButton`-nel), 4-elemes színrendszer swatch (HEX/CMYK/Pantone), tipográfiai párosítás, 4 arculati variáns és arculati szabályok. | `"use client"` (motion/react) |
| `MidjourneyWorkshopGenerator` | `src/components/organisms/MidjourneyWorkshopGenerator.tsx` | Midjourney AI Műhely generátor React Hook Form + Zod validációval, Groq (Llama 3.3-70b) integrációval, Kék-Lila v7.0 dizájnnal és copy-to-clipboard funkciókkal | `"use client"` (motion/react) |
| `SeoWorkshopGenerator` | `src/components/organisms/SeoWorkshopGenerator.tsx` | SEO Audit AI Műhely generátor React Hook Form + Zod validációval, Groq (Llama 3.3-70b) integrációval, Kék-Lila v7.0 dizájnnal és copy-to-clipboard funkciókkal | `"use client"` (motion/react) |
| `ContentWorkshopGenerator` | `src/components/organisms/ContentWorkshopGenerator.tsx` | Tartalomtervező AI Műhely generátor React Hook Form + Zod validációval, Groq (Llama 3.3-70b) integrációval, Kék-Lila v7.0 dizájnnal és copy-to-clipboard funkciókkal | `"use client"` (motion/react) |
| `UiUxWorkshopGenerator` | `src/components/organisms/UiUxWorkshopGenerator.tsx` | UI/UX AI Műhely generátor React Hook Form + Zod validációval, Groq (Llama 3.3-70b) integrációval, Kék-Lila v7.0 dizájnnal és copy-to-clipboard funkciókkal | `"use client"` (motion/react) |
| `SeasonalWorkshopGenerator` | `src/components/organisms/SeasonalWorkshopGenerator.tsx` | Szezonális AI Műhely generátor React Hook Form + Zod validációval, Groq (Llama 3.3-70b) integrációval, Kék-Lila v7.0 dizájnnal és copy-to-clipboard funkciókkal | `"use client"` (motion/react) |
| `PosterWorkshopGenerator` | `src/components/organisms/PosterWorkshopGenerator.tsx` | **214 sor (7.58.0)** – vékony karmester (orchestrator) komponens a Poster AI Műhelyhez: Firebase Auth + `ToolAccessLock` RBAC, React Hook Form + Zod (`posterFormSchema`), `addPosterGenerationAction` hívás; a megjelenítést a `PosterInputForm` és a `PosterOutputPanel` organizmusok végzik Kék-Lila v7.0 tokenekkel. | `"use client"` |
| `PosterInputForm` | `src/components/organisms/poster-workshop/PosterInputForm.tsx` | [7.58.0] A Poster AI Műhely bal oldali paraméterező űrlapja (292 sor): `posterFormSchema`, poszter célja, célközönség, méret (`A4–A1/custom`), stílus (8 opció), nyomdai specifikációk (4 opció), brand színek, kötelező szövegek és Kék-Lila v7.0 generáló CTA. | `"use client"` |
| `PosterOutputPanel` | `src/components/organisms/poster-workshop/PosterOutputPanel.tsx` | [7.58.0] A Poster AI Műhely jobb oldali eredmény-panelje (92 sor): üres várakozó állapot vagy a 10 nyomdai specifikációs eredmény-szekció (`PosterConcept`, `PrintSpecs`, `ColorPalette`, `Typography`, `PosterLayout`, `Copywriting`, `MidjourneyPrompts`, `PrintGuidelines`, `ExportFormats`, `PosterVariations`) animált összerendelése. | `"use client"` (motion/react) |
| `SocialMediaWorkshopGenerator` | `src/components/organisms/SocialMediaWorkshopGenerator.tsx` | Social Media AI Műhely generátor multi-platform támogatással (Instagram, Facebook, LinkedIn, TikTok), engagement-fókuszú copywriting és platform-specifikus irányelvekkel, Kék-Lila v7.0 dizájnnal | `"use client"` (motion/react) |
| `CipWorkshopGenerator` | `src/components/organisms/CipWorkshopGenerator.tsx` | CIP AI Műhely generátor vállalati arculati elemekkel (névjegykártya, levélpapír, arculati kézikönyv), nyomdai kész specifikációkkal és CMYK értékekkel, Kék-Lila v7.0 dizájnnal | `"use client"` (motion/react) |
| `PresentationWorkshopGenerator` | `src/components/organisms/PresentationWorkshopGenerator.tsx` | Presentation AI Műhely generátor pitch deck, sales prezentáció és investor deck narratív struktúrával, dia sablonokkal és vizuális hierarchiával, Kék-Lila v7.0 dizájnnal | `"use client"` (motion/react) |
| `IconWorkshopGenerator` | `src/components/organisms/IconWorkshopGenerator.tsx` | Icon Design AI Műhely generátor SVG vektor ikonokkal, icon szettekkel (15 stílus), minimalista szimbólumokkal és optimalizált SVG útvonalakkal, Kék-Lila v7.0 dizájnnal | `"use client"` (motion/react) |
| `DesignSystemWorkshopGenerator` | `src/components/organisms/DesignSystemWorkshopGenerator.tsx` | Design System AI Műhely generátor design tokens, komponens könyvtár, Tailwind CSS v4 integrációval és Zod validációval, Kék-Lila v7.0 dizájnnal | `"use client"` (motion/react) |
| `FlyerWorkshopGenerator` | `src/components/organisms/FlyerWorkshopGenerator.tsx` | **197 sor (7.60.0)** – vékony karmester (orchestrator) komponens a Szórólap & Prospektus AI Műhelyhez: Firebase Auth + `ToolAccessLock` RBAC (`flyer_ai_muhely`), React Hook Form + Zod (`flyerFormSchema`), `addFlyerGenerationAction` hívás; a megjelenítést a `FlyerInputForm` és a `FlyerOutputStudio` organizmusok végzik Kék-Lila v7.0 tokenekkel. | `"use client"` |
| `FlyerInputForm` | `src/components/organisms/flyer-workshop/FlyerInputForm.tsx` | [7.60.0] A Szórólap AI Műhely paraméterező űrlapja (280 sor): `flyerFormSchema`, 1-kattintásos kampány presetek (`FLYER_PRESETS`), 8 formátum és hajtás (`FORMAT_OPTIONS`), 5 papír/felületnemesítés (`PAPER_OPTIONS`), 4 terjesztési csatorna (`CHANNEL_OPTIONS`), stílus/színpaletta chipek és Kék-Lila v7.0 generáló CTA. | `"use client"` |
| `FlyerOutputStudio` | `src/components/organisms/flyer-workshop/FlyerOutputStudio.tsx` | [7.60.0] A Szórólap AI Műhely eredmény-stúdiója (289 sor): koncepció és tekintetvezetés, prepress és hajtási műszaki rajz (vágott/kifutós/safe zone/TAC/Rich Black), panelenkénti zónaterv és szöveg másolással, CMYK/Pantone/HEX swatch-ok, nyomdai tipográfiai skála, 3 AI prompt export és 8 pontos prepress checklist. | `"use client"` (motion/react) |
| `PackagingWorkshopGenerator` | `src/components/organisms/PackagingWorkshopGenerator.tsx` | **197 sor (7.60.0)** – vékony karmester (orchestrator) komponens a Csomagolás/Doboz/Címke AI Műhelyhez: Firebase Auth + `ToolAccessLock` RBAC (`packaging_ai_muhely`), React Hook Form + Zod (`packagingFormSchema`), `addPackagingGenerationAction` hívás; a megjelenítést a `PackagingInputForm` és a `PackagingOutputStudio` organizmusok végzik. | `"use client"` |
| `PackagingInputForm` | `src/components/organisms/packaging-workshop/PackagingInputForm.tsx` | [7.60.0] A Csomagolás AI Műhely paraméterező űrlapja (294 sor): `packagingFormSchema`, 1-kattintásos presetek (`PACKAGING_PRESETS`), 8 ipari struktúra (`STRUCTURE_OPTIONS`), 6 hordozó (`SUBSTRATE_OPTIONS`), 5 felületnemesítés (`FINISHING_OPTIONS`), USP-k, EU kötelező infók és Kék-Lila v7.0 generáló CTA. | `"use client"` |
| `PackagingOutputStudio` | `src/components/organisms/packaging-workshop/PackagingOutputStudio.tsx` | [7.60.0] A Csomagolás AI Műhely eredmény-stúdiója (289 sor): polcmegjelenés és unboxing koncepció, FEFCO stancrajz/dieline specifikáció (Cut/Crease/Glue flap/EAN-13), panelenkénti tervezés, hordozó-viselkedéses CMYK/Pantone swatch-ok, EU 1169/2011 compliance, 4 AI prompt export és 8 pontos prepress checklist. | `"use client"` (motion/react) |
| `ProjectScopeWorkshopGenerator` | `src/components/organisms/ProjectScopeWorkshopGenerator.tsx` | Brief->Architektúra/Sitemap/Árajánlat AI Műhely: 6 projekttípus, SEO/AEO oldaltérkép, 3 csomagszint (zéró fix ár), 5 fázisú roadmap és másolható ügyféllevél, Kék-Lila v7.0 dizájnnal [7.51.0] | `"use client"` (motion/react) |
| `SignageWorkshopGenerator` | `src/components/organisms/SignageWorkshopGenerator.tsx` | **197 sor (7.60.0)** – vékony karmester (orchestrator) komponens a Nagyformátumú Dekor/LFP AI Műhelyhez: Firebase Auth + `ToolAccessLock` RBAC (`signage_ai_muhely`), React Hook Form + Zod (`signageFormSchema`), `addSignageGenerationAction` hívás; a megjelenítést a `SignageInputForm` és a `SignageOutputStudio` organizmusok végzik. | `"use client"` |
| `SignageInputForm` | `src/components/organisms/signage-workshop/SignageInputForm.tsx` | [7.60.0] A Dekor/LFP AI Műhely paraméterező űrlapja (281 sor): `signageFormSchema`, 1-kattintásos presetek (`SIGNAGE_PRESETS`), 8 nagyformátumú struktúra (`FORMAT_OPTIONS`), 6 hordozó/fólia (`SUBSTRATE_OPTIONS`), 3 olvasási távolság (`DISTANCE_OPTIONS`), 3 másodperces CTA és Kék-Lila v7.0 generáló CTA. | `"use client"` |
| `SignageOutputStudio` | `src/components/organisms/signage-workshop/SignageOutputStudio.tsx` | [7.60.0] A Dekor/LFP AI Műhely eredmény-stúdiója (298 sor): 3 másodperces szabály és távolsági logika, LFP mérnöki specifikáció és holttér térkép (skálázott DPI, vágósík/fehér tinta), magassági zónaterv, CMYK + RAL/Pantone színek, 1:1 mm távolsági tipográfia, 3 AI prompt export és 8 pontos LFP prepress checklist. | `"use client"` (motion/react) |
| `HeroSlider` | ~~`src/components/organisms/HeroSlider.tsx`~~ **ARCHIVALT** (`_mentesek/20261008_techdebt-cleanup/`) | Kék-Lila v7.0 hero diavetítés 3 diával — **0 helyen bekötve**, a diavetítést a `HeroSectionNew` kezeli → dead code eltávolítva [7.20.4] | `"use client"` (motion/react) — archivált |
| `AIHeroSlider` | ~~`src/components/organisms/AIHeroSlider.tsx`~~ **ARCHIVALT** (`_mentesek/20261114_techdebt-cleanup/`) | Árva AI hero slider komponens — **0 helyen bekötve**, a `HeroSectionNew` és `HeroCarousel` kiváltotta → dead code archiválva [7.55.0] | `"use client"` (motion/react) — archivált |
| `HeroSectionClient` | ~~`src/components/organisms/HeroSectionClient.tsx`~~ **ARCHIVALT** (`_mentesek/20261114_techdebt-cleanup/`) | Árva kliens hero kártya — **0 helyen bekötve** → dead code archiválva [7.55.0] | `"use client"` (motion/react) — archivált |
| `HeroStaticBanner` | ~~`src/components/organisms/HeroStaticBanner.tsx`~~ **ARCHIVALT** (`_mentesek/20261114_techdebt-cleanup/`) | Árva statikus hero banner (nem létező `/hero_static_banner.png` hivatkozással) — **0 helyen bekötve** → dead code archiválva [7.55.0] | `"use client"` (motion/react) — archivált |
| `PosterConcept` | `src/components/organisms/PosterConcept.tsx` | PosterWorkshopGenerator eredményszekció — koncepció/kreatív irány (kibontva a monolitból) [7.54.0] | Server Component (motion markup) |
| `PrintSpecs` | `src/components/organisms/PrintSpecs.tsx` | Poster eredményszekció — nyomdai/prepress specifikációk [7.54.0] | Server Component |
| `ColorPalette` | `src/components/organisms/ColorPalette.tsx` | Poster eredményszekció — színpaletta swatch-ek [7.54.0] | Server Component |
| `Typography` | `src/components/organisms/Typography.tsx` | Poster eredményszekció — tipográfiai hierarchia [7.54.0] | Server Component |
| `PosterLayout` | `src/components/organisms/PosterLayout.tsx` | Poster eredményszekció — elrendezési struktúra [7.54.0] | Server Component |
| `Copywriting` | `src/components/organisms/Copywriting.tsx` | Poster eredményszekció — copy szekciók másolás-gombokkal [7.54.0] | `"use client"` |
| `MidjourneyPrompts` | `src/components/organisms/MidjourneyPrompts.tsx` | Poster eredményszekció — AI prompt export másolással [7.54.0] | `"use client"` |
| `PrintGuidelines` | `src/components/organisms/PrintGuidelines.tsx` | Poster eredményszekció — nyomdai útmutató/checklist [7.54.0] | Server Component |
| `ExportFormats` | `src/components/organisms/ExportFormats.tsx` | Poster eredményszekció — export formátumok [7.54.0] | Server Component |
| `PosterVariations` | `src/components/organisms/PosterVariations.tsx` | Poster eredményszekció — variációk [7.54.0] | Server Component |
| `OnlineGraphicsPromptStudio` | `src/components/organisms/OnlineGraphicsPromptStudio.tsx` | [7.87.0] Online Grafika & Kampány Pro Prompt Stúdió vékony karmester (<220 sor): Firebase Auth + `ToolAccessLock` (`online_graphics_prompt_studio`), `OnlineGraphicsForm` + `OnlineGraphicsEnginePanel` + `<LivePromptPreviewCard domain="online-graphics" />` | `"use client"` |
| `OnlineGraphicsForm` | `src/components/organisms/online-graphics-studio/OnlineGraphicsForm.tsx` | [7.87.0] Online Grafika Stúdió tervező űrlap (<285 sor): 6 kampány preset, 7 platform & safe-zone formátum (9:16 Reels UI safe-zone), copy-space, F/Z-pattern, optika, fényfizika, anyagtextúrák és HEX paletta-zár | `"use client"` |
| `OnlineGraphicsEnginePanel` | `src/components/organisms/online-graphics-studio/OnlineGraphicsEnginePanel.tsx` | [7.87.0] Online Grafika Stúdió motor-specifikus vezérlőpanel (<285 sor): 5 vizuális motor (`midjourney-v7`, `flux-1-1-pro`, `ideogram-3`, `recraft-v3-svg`, `video-motion`), haladó paraméterek és Anti-AI-Slop szűrő | `"use client"` |
| `OfflinePrintPromptStudio` | `src/components/organisms/OfflinePrintPromptStudio.tsx` | [7.88.0] Offline & Nyomdai Prepress Pro Prompt Stúdió vékony karmester (<220 sor): Firebase Auth + `ToolAccessLock` (`offline_print_prompt_studio`), élő másolható PDF/X-4 műszaki adatlap + `<LivePromptPreviewCard domain="offline-print" />` | `"use client"` |
| `OfflinePrintForm` | `src/components/organisms/offline-print-studio/OfflinePrintForm.tsx` | [7.88.0] Nyomdai Prepress Stúdió tervező űrlap (<280 sor): 6 nyomdai preset, dupla kimeneti mód (`2d-print-artwork` vs. `3d-print-mockup`), 10 kiadványtípus (göngyölt 97-100-100 mm, FEFCO, Roll-up 150 mm holttér) és paletta-zár | `"use client"` |
| `OfflinePrintTechPanel` | `src/components/organisms/offline-print-studio/OfflinePrintTechPanel.tsx` | [7.88.0] Nyomdai Prepress Stúdió műszaki panel (<280 sor): FOGRA39/51/52 ICC & TAC limit, Rich Black, 100% K Overprint, 6 hordozó, 6 finishing (0% arany/amber) és 7 technikai Spot réteg | `"use client"` |
| `ApparelPromptStudio` | `src/components/organisms/ApparelPromptStudio.tsx` | [7.89.0] Ruha Készítés, Divat, Textil & Merch Pro Prompt Stúdió vékony karmester (202 sor): Firebase Auth + `ToolAccessLock` (`apparel_merch_prompt_studio`), élő másolható Textil/Tech Pack BOM adatlap + `<LivePromptPreviewCard domain="apparel-merch" />` | `"use client"` |
| `ApparelForm` | `src/components/organisms/apparel-studio/ApparelForm.tsx` | [7.89.0] Ruha & Textil Stúdió tervező űrlap (270 sor): 6 textil preset, 3 mód (`print-artwork`, `garment-tech-pack`, `lookbook-mockup`), 10 ruhadarab, 6 GSM anyag, 5 mosás és sötét alapszövet white-underbase figyelmeztetés | `"use client"` |
| `ApparelTechPanel` | `src/components/organisms/apparel-studio/ApparelTechPanel.tsx` | [7.89.0] Ruha & Textil Stúdió technológiai panel (295 sor): 6 nyomtatási technológia (DTF halo-védelem, Szita 45–55 LPI + choke, 3D Hímzés, AOP `--tile`), 7 nyomati pozíció, 8 BOM trim és 4 mockup stílus | `"use client"` |
| `SoftwareArchPromptStudio` | `src/components/organisms/SoftwareArchPromptStudio.tsx` | [7.90.0] Webes & Szoftver-Architektúra Pro Prompt Stúdió vékony karmester (205 sor): Firebase Auth + `ToolAccessLock` (`software_arch_prompt_studio`), élő másolható Architektúra & QA Műszaki Adatlap + `<LivePromptPreviewCard domain="software-arch" />` | `"use client"` |
| `SoftwareArchForm` | `src/components/organisms/software-arch-studio/SoftwareArchForm.tsx` | [7.90.0] Szoftver-Architektúra Stúdió tervező űrlap (256 sor): 6 mérnöki preset, 7 architektúra fázis (C4 Mermaid, PRD/ADR, DB/RBAC, OWASP AISVS, CWV, Coding Agent Sprint, Migráció), SSOT fájlok és 14 stack chip | `"use client"` |
| `SoftwareArchTechPanel` | `src/components/organisms/software-arch-studio/SoftwareArchTechPanel.tsx` | [7.90.0] Szoftver-Architektúra Stúdió technológiai panel (239 sor): 4 cél-LLM szintaxis (`claude-xml`, `chatgpt-markdown`, `gemini-multimodal`, `perplexity-research`), 5 kimeneti formátum, 3 szigorúsági szint és 10 mérnöki guardrail | `"use client"` |
| `AnalysisPromptStudio` | `src/components/organisms/AnalysisPromptStudio.tsx` | [7.91.0] Profi Elemzés & Audit Pro Prompt Stúdió vékony karmester (<215 sor): Firebase Auth + `ToolAccessLock` (`analysis_audit_prompt_studio`), élő másolható Audit Specifikációs Adatlap + `<LivePromptPreviewCard domain="analysis-audit" />` | `"use client"` |
| `AnalysisForm` | `src/components/organisms/analysis-studio/AnalysisForm.tsx` | [7.91.0] Elemzés & Audit Stúdió tervező űrlap (<265 sor): 6 audit preset, 8 szakterület (SEO+AEO+GEO, 7-Layer UX/CRO Roast, Piaci Benchmark, OWASP/CWV, Funnel, Copy, GA4/GSC CSV), 5 bemeneti forrás és `<untrusted_audit_asset>` adatminta | `"use client"` |
| `AnalysisTechPanel` | `src/components/organisms/analysis-studio/AnalysisTechPanel.tsx` | [7.91.0] Elemzés & Audit Stúdió módszertani panel (<265 sor): 4 cél-LLM motor, 4 prioritási keretrendszer (`P0–P3`, `ICE`, `RICE`, `48h Quick Wins`), 4 workflow mód és 8 bizonyíték-kényszer / `[ELLENŐRIZENDŐ]` anti-hallucináció fék | `"use client"` |
| `LogoPromptGenerator` | `src/components/organisms/LogoPromptGenerator.tsx` | [7.92.0] Védett Midjourney v6 logó-prompt összeállító organizmus (`<ToolAccessGate toolId="logo_ai_muhely">`), Dual Theme Kék-Lila v7.2 stílussal (<220 sor) | `"use client"` |
| `BannerPromptGenerator` | `src/components/organisms/BannerPromptGenerator.tsx` | [7.92.0] Védett Midjourney v6 kampánybanner prompt-összeállító organizmus (`<ToolAccessGate toolId="banner_ai_muhely">`), 0% arany/amber (<230 sor) | `"use client"` |
| `MidjourneyPromptGenerator` | `src/components/organisms/MidjourneyPromptGenerator.tsx` | [7.92.0] Védett Midjourney v6 fotórealisztikus/kreatív prompt-összeállító organizmus (`<ToolAccessGate toolId="midjourney_ai_muhely">`, <225 sor) | `"use client"` |
| `SeoAuditPromptGenerator` | `src/components/organisms/SeoAuditPromptGenerator.tsx` | [7.92.0] Védett technikai SEO/AEO/GEO audit prompt-összeállító organizmus (`<ToolAccessGate toolId="seo_audit_ai_muhely">`, <225 sor) | `"use client"` |
| `SeasonalPromptGenerator` | `src/components/organisms/SeasonalPromptGenerator.tsx` | [7.92.0] Védett szezonális kampányprompt összeállító organizmus (`<ToolAccessGate toolId="szezonalis_ai_muhely">`, <225 sor) | `"use client"` |
| `ContentPlanPromptGenerator` | `src/components/organisms/ContentPlanPromptGenerator.tsx` | [7.92.0] Védett SEO/AEO tartalom-prompt összeállító organizmus (`<ToolAccessGate toolId="tartalomtervezo_ai_muhely">`, <225 sor) | `"use client"` |
| `UiUxPromptGenerator` | `src/components/organisms/UiUxPromptGenerator.tsx` | [7.92.0] Védett UI/UX wireframe és felületi prompt-összeállító organizmus (`<ToolAccessGate toolId="ui_ux_ai_muhely">`, <225 sor) | `"use client"` |
| `ProductsCatalogClient` | `src/components/organisms/ProductsCatalogClient.tsx` | [7.93.0] `/termekek` interaktív kategóriaszűrő és 14 kártyás termékrács (`H2 → H3` hierarchia): minden kártya ikonja, címe és elsődleges gradiens CTA-ja a saját `/termekek/<slug>` aloldalra mutat (`src/data/products-catalog.ts` SSOT alapján), másodlagos outline ajánlatkérő gombbal | `"use client"` (motion/react) |

### 2.4 Pages

| Route                                                     | Fájl                                                                      | Organisms                                                                                                                                                             | Leírás                                                                                                                                              |
| --------------------------------------------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                                                       | `src/app/page.tsx`                                                        | HeroSectionNew, SocialProofStrip, SystemShowcase, FeaturedServicesNew, CaseStudiesBento, WhyChooseMeSection, FaqSectionAEO, FinalCta                                  | Főoldal (Soft Premium Redesign 2026.09)                                                                                                             |
| `/en`                                                     | `src/app/en/page.tsx`                                                     | HeroSectionNew, SocialProofStrip, SystemShowcase, FeaturedServicesNew, CaseStudiesBento, WhyChooseMeSection, FaqSectionAEO, FinalCta                                  | Angol nyelvű főoldal — natív JSON Dictionary i18n, hreflang, EN JSON-LD a `en/layout.tsx`-ben (2026-09-24)                                          |
| `/en/about`                                               | `src/app/en/about/page.tsx`                                               | SubpageHero, DirectAnswerBlock, Surface                                                                                                                               | Angol nyelvű Rólam oldal (`ProfilePage` + `Person` JSON-LD, kétirányú `hreflang`, 26+ év E-E-A-T bemutatkozás) [7.76.0]                             |
| `/en/privacy-policy`                                      | `src/app/en/privacy-policy/page.tsx`                                      | SubpageHero, Surface                                                                                                                                                  | Angol nyelvű GDPR Adatvédelmi Szabályzat (`WebPage` + `BreadcrumbList` JSON-LD, kétirányú `hreflang`) [7.76.0]                                      |
| `/en/terms`                                               | `src/app/en/terms/page.tsx`                                               | SubpageHero, Surface                                                                                                                                                  | Angol nyelvű Felhasználási Feltételek (Zéró Fix Ár, `WebPage` + `BreadcrumbList` JSON-LD, kétirányú `hreflang`) [7.76.0]                            |
| `/ingyenes-seo-aeo-elemzes`                               | `src/app/ingyenes-seo-aeo-elemzes/page.tsx`                               | SubpageHero, DirectAnswerBlock, SeoQuickCheckTool, Surface                                                                                                            | Ingyenes 10 pontos SEO & AI-Készség (AEO/GEO) Gyorsellenőrző lead-mágnes (`WebApplication` + `FAQPage` JSON-LD, SSRF-védett API) [7.78.0]           |
| `/en/free-seo-aeo-checker`                                | `src/app/en/free-seo-aeo-checker/page.tsx`                                | SubpageHero, DirectAnswerBlock, SeoQuickCheckTool, Surface                                                                                                            | Angol SEO & AI Readiness Quick Checker kétirányú `hreflang`-gal és `WebApplication` JSON-LD sémával [7.78.0]                                        |
| `/ingyenes-weboldal-elemzes`                              | `src/app/ingyenes-weboldal-elemzes/page.tsx`                              | SubpageHero, DirectAnswerBlock, BentoCard, ContactForm, Surface                                                                                                       | Ingyenes 10 perces videós UX & SEO audit landing (`Service` + `FAQPage` + `BreadcrumbList` JSON-LD, előre kitöltött `ContactForm`) [7.81.0]        |
| `/en/free-website-audit`                                  | `src/app/en/free-website-audit/page.tsx`                                  | SubpageHero, DirectAnswerBlock, BentoCard, ContactForm, Surface                                                                                                       | Angol 10-minute video UX & SEO audit landing kétirányú `hreflang`-gal, `Service` + `FAQPage` + `BreadcrumbList` JSON-LD sémával [7.81.0]           |
| `/en/portfolio/[slug]`                                    | `src/app/en/portfolio/[slug]/page.tsx`                                    | ResponsiveImage, DirectAnswerBlock, Surface                                                                                                                           | Dinamikus angol esettanulmány oldal mind a 14 projekthez (`CreativeWork` + `FAQPage` + `BreadcrumbList`, kétirányú `hreflang`) [7.79.0]              |
| `/kapcsolat`                                              | `src/app/kapcsolat/page.tsx`                                              | Header, Hero, ContactFormWrapper, Footer                                                                                                                              | Kapcsolati oldal                                                                                                                                    |
| `/szia-norbi-vagyok`                                      | `src/app/szia-norbi-vagyok/page.tsx`                                      | Header, Timeline, Footer                                                                                                                                              | Személyes "Rólam" oldal                                                                                                                             |
| `/szolgaltatasok`                                         | `src/app/szolgaltatasok/page.tsx`                                         | Header, Hero, ServiceCard, Footer                                                                                                                                     | Szolgáltatások                                                                                                                                      |
| `/szolgaltatasok/weboldal-keszites`                       | `src/app/szolgaltatasok/weboldal-keszites/page.tsx`                       | SectionTitle, BentoCard, AnimatedSystemFlow, CaseStudyCard, AiChatMockup, Button, Badge                                                                               | Weboldal készítés (React, Next.js, WordPress, Node.js, HTML, JavaScript)                                                                            |
| `/szolgaltatasok/ai-prompt-engineering`                   | `src/app/szolgaltatasok/ai-prompt-engineering/page.tsx`                   | SectionTitle, BentoCard, AnimatedSystemFlow, CaseStudyCard, AiChatMockup, Button, Badge                                                                               | AI Prompt Engineering szolgáltatás                                                                                                                  |
| `/szolgaltatasok/add-onok`                                | `src/app/szolgaltatasok/add-onok/page.tsx`                                | Hero, Bento Grid, details/summary FAQ, JSON-LD Schemas                                                                                                                | Publikus Azonnali Kiegészítők (Add-onok) landing page                                                                                               |
| `/termekek`                                               | `src/app/termekek/page.tsx`                                               | DirectAnswerBlock, ProductsCatalogClient, ProductFaqSection                                                                                                           | Prémium Termékek & AI Műhelyek gyűjtőoldal: 14 saját `/termekek/<slug>` kártyalink, 48 szavas Direct Answer, `CollectionPage` + `ItemList` + `BreadcrumbList` + `FAQPage` JSON-LD (Zéró Fix Ár) [7.93.0] |
| `/munkak`                                                 | `src/app/munkak/page.tsx`                                                 | Header, Hero, PortfolioGrid (PORTFOLIO_ORDER + orderedWorks, isHero hézagmentes Bento, grid-flow-row-dense), MunkakFaqSection (FAQPage séma), kettős lead-CTA, Footer | Referenciák — dinamikus portfólió-sorrend, FAQ + konverziós CTA-k, CollectionPage/ItemList/BreadcrumbList JSON-LD, Zero-Prompt logika, ISR [7.28.0] |
| `/hirek`                                                  | `src/app/hirek/page.tsx`                                                  | Header, BlogGrid, Footer                                                                                                                                              | Hírek (MDX tudásbázis + `en-US` → `/en/insights` kétirányú `hreflang`)                                                                              |
| `/en/insights`                                            | `src/app/en/insights/page.tsx`                                            | SubpageHero, DirectAnswerBlock, ResponsiveImage, Surface                                                                                                              | Angol nyelvű Tudásbázis gyűjtőoldal 3 kiemelt BOFU/GEO cikkel (`CollectionPage` + `ItemList` + `BreadcrumbList` JSON-LD, kétirányú `hreflang`) [7.82.0] |
| `/en/insights/[slug]`                                     | `src/app/en/insights/[slug]/page.tsx`                                     | ResponsiveImage, DirectAnswerBlock, SeoQuickCheckBanner, Surface                                                                                                      | Statikusan generált angol BOFU/GEO szakcikk (`TechArticle` + `FAQPage` + `BreadcrumbList` JSON-LD, HTML táblázatok, SEO/Audit CTA) [7.82.0]        |
| `/felhasznalasi-feltetelek`                               | `src/app/felhasznalasi-feltetelek/page.tsx`                               | Header, Footer                                                                                                                                                        | Felhasználási feltételek (Jogi nyilatkozat)                                                                                                         |
| `/adatvedelmi-szabalyzat`                                 | `src/app/adatvedelmi-szabalyzat/page.tsx`                                 | Header, Footer                                                                                                                                                        | Adatvédelmi szabályzat és GDPR tájékoztató                                                                                                          |
| `/admin`                                                  | `src/app/admin/page.tsx`                                                  | AdminSidebar, DashboardStats                                                                                                                                          | Admin dashboard (Firebase Auth védett)                                                                                                              |
| `/admin/dashboard`                                        | `src/app/admin/dashboard/page.tsx`                                        | AdminDashboard                                                                                                                                                        | Admin KPI Dashboard (Firebase Auth védett, admin jogosultság ellenőrzés)                                                                            |
| `/admin/login`                                            | `src/app/admin/login/page.tsx`                                            | AdminLoginForm                                                                                                                                                        | Admin bejelentkezési oldal (Firebase Auth)                                                                                                          |
| `/admin/leadek`                                           | `src/app/admin/leadek/page.tsx`                                           | AdminSidebar, LeadsTable                                                                                                                                              | Legacy Admin Leadek oldal (Firebase Auth védett)                                                                                                    |
| `/admin/leads`                                            | `src/app/admin/leads/page.tsx`                                            | AdminSidebar                                                                                                                                                          | Új Kanban-board alapú CRM Leads kezelő felület                                                                                                      |
| `/admin/portfolio`                                        | `src/app/admin/portfolio/page.tsx`                                        | AdminSidebar                                                                                                                                                          | Admin Portfólió oldal (Firebase Auth védett, Firestore CRUD)                                                                                        |
| `/admin/portal-kezelo`                                    | `src/app/admin/portal-kezelo/page.tsx`                                    | AdminSidebar                                                                                                                                                          | Superadmin Workflow- és Felhasználókezelő; ügyfél AI-eszköz jogosultság-panel (v7.2.0)                                                              |
| `/admin/analytics`                                        | `src/app/admin/analytics/page.tsx`                                        | —                                                                                                                                                                     | Legacy redirect → `/admin/dashboard` (Server Component, v7.2.0)                                                                                     |
| `/portal`                                                 | `src/app/portal/page.tsx`                                                 | PortalDashboard                                                                                                                                                       | Zárt ügyfélportál főoldala                                                                                                                          |
| `/portal/vault`                                           | `src/app/portal/vault/page.tsx`                                           | ClientVault                                                                                                                                                           | Ügyfélszéf és dokumentumkezelő oldal (Firebase Auth védett, előnézet modállal)                                                                      |
| `/portal/ai-muhely/kristofka`                             | `src/app/portal/ai-muhely/kristofka/page.tsx`                             | KristofkaWorkflow                                                                                                                                                     | Kristófka Munkafolyamat (Strategist-Pro) - ingatlanbefektetői pitch generálás (Firebase Auth védett)                                                |
| `/portal/ai-muhely/banner-ai-muhely`                      | `src/app/portal/ai-muhely/banner-ai-muhely/page.tsx`                      | BannerWorkshopGenerator                                                                                                                                               | Banner AI Műhely generátor (Groq Llama 3.3-70b, React Hook Form + Zod, Kék-Lila v7.0 dizájn)                                                        |
| `/portal/ai-muhely/szezonalis-ai-muhely`                  | `src/app/portal/ai-muhely/szezonalis-ai-muhely/page.tsx`                  | SeasonalWorkshopGenerator                                                                                                                                             | Szezonális AI Műhely generátor (Groq Llama 3.3-70b, React Hook Form + Zod, Kék-Lila v7.0 dizájn)                                                    |
| `/portal/ai-muhely/ui-ux-ai-muhely`                       | `src/app/portal/ai-muhely/ui-ux-ai-muhely/page.tsx`                       | UiUxWorkshopGenerator                                                                                                                                                 | UI/UX AI Műhely generátor (Groq Llama 3.3-70b, React Hook Form + Zod, Kék-Lila v7.0 dizájn)                                                         |
| `/portal/ai-muhely/tartalomtervezo-ai-muhely`             | `src/app/portal/ai-muhely/tartalomtervezo-ai-muhely/page.tsx`             | ContentWorkshopGenerator                                                                                                                                              | Tartalomtervező AI Műhely generátor (Groq Llama 3.3-70b, React Hook Form + Zod, Kék-Lila v7.0 dizájn)                                               |
| `/portal/ai-muhely/seo-audit-ai-muhely`                   | `src/app/portal/ai-muhely/seo-audit-ai-muhely/page.tsx`                   | SeoWorkshopGenerator                                                                                                                                                  | SEO Audit AI Műhely generátor (Groq Llama 3.3-70b, React Hook Form + Zod, Kék-Lila v7.0 dizájn)                                                     |
| `/portal/ai-muhely/midjourney-ai-muhely`                  | `src/app/portal/ai-muhely/midjourney-ai-muhely/page.tsx`                  | MidjourneyWorkshopGenerator                                                                                                                                           | Midjourney AI Műhely generátor (Groq Llama 3.3-70b, React Hook Form + Zod, Kék-Lila v7.0 dizájn)                                                    |
| `/portal/ai-muhely/logo-ai-muhely`                        | `src/app/portal/ai-muhely/logo-ai-muhely/page.tsx`                        | LogoWorkshopGenerator, LogoInputForm, LogoOutputStudio                                                                                                                | Logó AI Műhely generátor (Groq Llama 3.3-70b, React Hook Form + Zod, Kék-Lila v7.0 dizájn)                                                          |
| `/portal/ai-muhely/poster-ai-muhely`                      | `src/app/portal/ai-muhely/poster-ai-muhely/page.tsx`                      | PosterWorkshopGenerator, PosterInputForm, PosterOutputPanel                                                                                                           | Poster AI Műhely generátor (Groq Llama 3.3-70b, React Hook Form + Zod, Kék-Lila v7.0 dizájn)                                                        |
| `/portal/ai-muhely/social-media-ai-muhely`                | `src/app/portal/ai-muhely/social-media-ai-muhely/page.tsx`                | SocialMediaWorkshopGenerator                                                                                                                                          | Social Media AI Műhely generátor (Groq Llama 3.3-70b, React Hook Form + Zod, Kék-Lila v7.0 dizájn)                                                  |
| `/portal/ai-muhely/cip-ai-muhely`                         | `src/app/portal/ai-muhely/cip-ai-muhely/page.tsx`                         | CipWorkshopGenerator                                                                                                                                                  | CIP AI Műhely generátor (Groq Llama 3.3-70b, React Hook Form + Zod, Kék-Lila v7.0 dizájn)                                                           |
| `/portal/ai-muhely/presentation-ai-muhely`                | `src/app/portal/ai-muhely/presentation-ai-muhely/page.tsx`                | PresentationWorkshopGenerator                                                                                                                                         | Presentation AI Műhely generátor (Groq Llama 3.3-70b, React Hook Form + Zod, Kék-Lila v7.0 dizájn)                                                  |
| `/portal/ai-muhely/icon-design-ai-muhely`                 | `src/app/portal/ai-muhely/icon-design-ai-muhely/page.tsx`                 | IconWorkshopGenerator                                                                                                                                                 | Icon Design AI Műhely generátor (Groq Llama 3.3-70b, React Hook Form + Zod, Kék-Lila v7.0 dizájn)                                                   |
| `/portal/ai-muhely/design-system-ai-muhely`               | `src/app/portal/ai-muhely/design-system-ai-muhely/page.tsx`               | DesignSystemWorkshopGenerator                                                                                                                                         | Design System AI Műhely generátor (Groq Llama 3.3-70b, React Hook Form + Zod, Kék-Lila v7.0 dizájn)                                                 |
| `/portal/ai-muhely/szorolap-ai-muhely`                    | `src/app/portal/ai-muhely/szorolap-ai-muhely/page.tsx`                    | FlyerWorkshopGenerator, FlyerInputForm, FlyerOutputStudio                                                                                                             | Szórólap & Prospektus AI Műhely generátor (Groq Llama 3.3-70b, React Hook Form + Zod, Kék-Lila v7.0 dizájn)                                         |
| `/portal/ai-muhely/csomagolas-ai-muhely`                  | `src/app/portal/ai-muhely/csomagolas-ai-muhely/page.tsx`                  | PackagingWorkshopGenerator, PackagingInputForm, PackagingOutputStudio                                                                                                 | Csomagolás, Doboz & Címke AI Műhely generátor (Groq Llama 3.3-70b, React Hook Form + Zod, Kék-Lila v7.0 dizájn)                                     |
| `/portal/ai-muhely/online-grafika-prompt-studio`          | `src/app/portal/ai-muhely/online-grafika-prompt-studio/page.tsx`          | OnlineGraphicsPromptStudio, OnlineGraphicsEnginePanel, OnlineGraphicsForm, LivePromptPreviewCard                                                                      | Online Grafika & Kampány Pro Prompt Stúdió (5 vizuális motor, 7 platform safe-zone, copy-space, WCAG kontraszt, Groq 3 variáció) [7.87.0]           |
| `/portal/ai-muhely/nyomda-prepress-prompt-studio`         | `src/app/portal/ai-muhely/nyomda-prepress-prompt-studio/page.tsx`         | OfflinePrintPromptStudio, OfflinePrintTechPanel, OfflinePrintForm, LivePromptPreviewCard                                                                              | Offline & Nyomdai Prepress Pro Prompt Stúdió (2D nyomdakész grafika vs. 3D print mockup, 10 kiadványtípus, FOGRA ICC/TAC, PDF/X-4 adatlap) [7.88.0] |
| `/portal/ai-muhely/ruha-ai-muhely`                        | `src/app/portal/ai-muhely/ruha-ai-muhely/page.tsx`                        | ApparelPromptStudio, ApparelForm, ApparelTechPanel, LivePromptPreviewCard                                                                                             | Ruha Készítés, Divat, Textil & Merch Pro Prompt Stúdió (DTF/Szita/Hímzés/AOP nyomat, 2D CAD Tech Pack + BOM, Ghost Mannequin/Lookbook) [7.89.0]     |
| `/portal/ai-muhely/szoftver-architektura-ai-muhely`       | `src/app/portal/ai-muhely/szoftver-architektura-ai-muhely/page.tsx`       | SoftwareArchPromptStudio, SoftwareArchForm, SoftwareArchTechPanel, LivePromptPreviewCard                                                                              | Webes & Szoftver-Architektúra Pro Prompt Stúdió (7 mérnöki fázis, C4 Mermaid, PRD/ADR, OWASP AISVS 2026, 5-pilléres Coding Agent Sprint) [7.90.0]   |
| `/portal/ai-muhely/elemzes-prompt-studio`                 | `src/app/portal/ai-muhely/elemzes-prompt-studio/page.tsx`                 | AnalysisPromptStudio, AnalysisForm, AnalysisTechPanel, LivePromptPreviewCard                                                                                          | Profi Elemzés & Audit Pro Prompt Stúdió (8 audit terület: SEO/AEO/GEO, 7-lépcsős UX/CRO Roast, Piaci Benchmark, OWASP/CWV, GA4/GSC CSV) [7.91.0]    |
| `/portal/ai-muhely/projekt-scope-ai-muhely`               | `src/app/portal/ai-muhely/projekt-scope-ai-muhely/page.tsx`               | ProjectScopeWorkshopGenerator                                                                                                                                         | Projekt Scope & Árajánlat AI Műhely generátor (Groq Llama 3.3-70b, React Hook Form + Zod, Kék-Lila v7.0 dizájn)                                     |
| `/portal/ai-muhely/dekor-ai-muhely`                       | `src/app/portal/ai-muhely/dekor-ai-muhely/page.tsx`                       | SignageWorkshopGenerator, SignageInputForm, SignageOutputStudio                                                                                                       | Nagyformátumú Dekor / LFP AI Műhely generátor (Groq Llama 3.3-70b, React Hook Form + Zod, Kék-Lila v7.0 dizájn)                                     |
| `/munkafolyamatok/strategist-pro/kristofka-munkafolyamat` | `src/app/munkafolyamatok/strategist-pro/kristofka-munkafolyamat/page.tsx` | —                                                                                                                                                                     | Kristófka Munkafolyamat SEO oldal (Server Component)                                                                                                |
| `/api/webhooks/stripe`                                    | `src/app/api/webhooks/stripe/route.ts`                                    | —                                                                                                                                                                     | Stripe Webhook API végpont (HMAC-SHA256 aláírás-ellenőrzéssel, Firestore `orders`, `users` és `workflows` frissítésekkel)                           |

### 2.5 Típusok és megjelenítési konfiguráció (SSOT)

| Fájl                                                 | Export                                                                                                                       | Leírás                                                                                                                                                                          |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/types/portal.ts`                                | `Workflow`, `PortalUser`, `PortalTab`                                                                                        | Az ügyfélportál domain-modellje. A `Workflow` a Firestore `workflows` kollekció teljes vetülete; a `status` mező a `TimelinePhaseKey` uniót használja (közös SSOT a Gantt-tel). |
| `src/lib/portalConfig.ts`                            | `statusConfig`, `categoryMap`, `SUPERADMIN_TOOLS`, `WorkflowStatusConfig`                                                    | JSX-mentes megjelenítési konfiguráció: az 5 szállítási fázis címkéje/színe/haladása/ikonja, add-on kategória-leképezés és a szuperadmin AI moduljai.                            |
| `src/components/organisms/hero/heroSlidesConfig.tsx` | `SlideData`, `SLIDE_DEFAULTS`, `buildHeroSlides`                                                                             | [7.62.0] A főoldali `HeroSectionNew` 3 diájának alapértelmezett konfigurációja és nyelvi szótár (`HeroContent`) összefésülő függvénye.                                          |
| `src/data/ai-workshop-collection-config.ts`          | `ToolType`, `ToolCategory`, `ToolItem`, `CATEGORY_LABELS`, `CATEGORY_ORDER`, `ADMIN_DEFAULT_ALLOWED_TOOLS`, `generatorTools` | [7.62.0] Az `AIWorkshopCollection` (`/portal/ai-muhely`) 18 generátorának statikus katalógus-konfigurációja és kategória-definíciói.                                            |
| `src/data/products-catalog.ts`                       | `CatalogProduct`, `ProductCategory`, `ProductIconName`, `CATALOG_PRODUCTS`, `PRODUCT_CATEGORIES`                             | [7.93.0] A `/termekek` gyűjtőoldal, az `ItemList` JSON-LD séma és az `src/app/sitemap.ts` 14 elemes SSOT termék-katalógusa (Zéró Fix Ár, saját `/termekek/<slug>` útvonalak).    |

### 2.6 Custom Hook-ok (`src/hooks/`)

| Hook                           | Fájl                                        | Leírás                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------------------------ | ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `useFocusTrap`                 | `src/hooks/useFocusTrap.ts`                 | **WCAG 2.1.2 / 2.4.3** – Fókuszcsapda modálokhoz és a teljes képernyős mobil menühöz. Megnyitáskor az `initialFocusRef` elemre (ha meg van adva) vagy az első látható interaktív elemre fókuszál; a `Tab`/`Shift+Tab` ciklikusan a konténeren belül marad; `Escape`-re meghívja az `onEscape` visszahívást; bezáráskor visszaállítja a fókuszt a kiváltó elemre. **A konténernek tartalmaznia kell a bezáró gombot**, különben az billentyűzettel elérhetetlen. |
| `usePortalSession`             | `src/hooks/usePortalSession.ts`             | Portál auth-munkamenet (Firebase Auth `onAuthStateChanged`), admin-státusz, `allowedTools` jogosultság, superadmin listák (users/addons), hiba/siker üzenet és kijelentkezés. A `PortalDashboard` ezt használja (7.8.0).                                                                                                                                                                                                                                        |
| `usePortalData`                | `src/hooks/usePortalData.ts`                | Portál adatbetöltés (workflow-k, megrendelések) szerveroldali egyszeri lekéréssel, `isMounted` cleanup-guarddal (Anti-Drain) **és csak érvényes `idToken` esetén**; Stripe mérföldkő-fizetés, fázis-jóváhagyás (optimistic UI + rollback), kézbesítés, `refreshOrders`, `formatDate`. A `PortalDashboard` ezt használja (7.8.0).                                                                                                                                |
| `useStripePaymentVerification` | `src/hooks/useStripePaymentVerification.ts` | Stripe fizetési visszaigazolás (URL paraméteres). **7.8.0: NEM használt** – a fizetés-visszaigazolás teljes logikája (verifying state, hiba/siker jelentés, workflow frissítés) a `usePortalData` belső effektje futtatja; ez a változat csak `onPaymentVerified` callback-et továbbít, így nem szabad a dashboardba kötni (duplikált verifikáció kockázat).                                                                                                    |
| `usePortalNotifications`       | `src/hooks/usePortalNotifications.ts`       | Portál értesítések (onSnapshot, cleanup-pal).                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `useMotionPreset`              | `src/hooks/useMotionPreset.ts`              | `useReducedMotion`-alapú animációs preset-ek (akadálymentesített Motion).                                                                                                                                                                                                                                                                                                                                                                                       |

> Az a11y hook-ok egységes exportja: `src/hooks/index.ts`.

### 2.7 Akadálymentesítési (WCAG AA) réteg

| Elem                    | Fájl                                    | Leírás                                                                                                                                                                                                               |
| ----------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `FocusRing` konvenció   | (osztály-string a komponensekben)       | Egységes látható fókusz: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]`. `outline-none` látható fókusz nélkül TILOS. |
| Landmark struktúra      | `src/components/layout/PageWrapper.tsx` | **Egyetlen** `<main id="main-content" tabIndex={-1}>` landmark, ami egyben a skip-link (`Ugrás a fő tartalomra`) célpontja. Az oldal-szintű komponensek `<div>`-et használnak, beágyazott `<main>` TILOS.            |
| Fókuszcsapda            | `src/hooks/useFocusTrap.ts`             | Lásd §2.6.                                                                                                                                                                                                           |
| Kontraszt-audit szkript | `scripts/audit-contrast.js`             | Statikus WCAG AA kontraszt-ellenőrzés: a `className`-en belüli `text-*`/`bg-*` párokra számolja a kontrasztarányt (küszöb 4.5:1). Kilépési kód jelzi a hibát.                                                        |
| Landmark-javító szkript | `scripts/fix-nested-main-landmarks.js`  | Egyszeri migrációs szkript a beágyazott `<main>` elemek `<div>`-re cseréléséhez (validálja a nyitó/záró tag párokat).                                                                                                |

---

## 3. Technológiai Stack

### 3.1 Frontend

```
Next.js 16.x       App Router architektúra, src/ könyvtárban strukturálva
React 19           Server Components alapértelmezett, Client Components "use client"-tel
TypeScript         strict mód, zero-error policy (npx tsc --noEmit = 0 hiba)
Tailwind CSS 4     Utility-first, "WebDude Kék-Lila v7.0" dizájn rendszer, config CSS-ben (@theme direktíva)
```

### 3.2 Backend és Infrastruktúra

```
Firebase Auth      Felhasználói hitelesítés (aszinkron, loading state kezeléssel)
Firestore          NoSQL adatbázis, optimalizált single-fetch vagy célzott onSnapshot
Server Actions     src/actions/portfolio.ts, src/actions/portal.ts, src/actions/ai.ts, src/actions/vault.ts (portfólió CRUD, zárt portál műveletek, élő AI generálás, ügyfélszéf fájlregisztráció)
Firebase Hosting   Statikus + SSR hosting, firebase.json routing
deploy.bat         Élesítési szkript – kizárólag a fejlesztő futtatja
```

### 3.3 Fejlesztői Eszközök

```
ESLint             eslint.config.mjs – linting szabályok
TypeScript         tsconfig.json – strict konfiguráció
npm                Csomagkezelő
```

---

## 4. Next.js App Router Struktúra

```
src/
├── app/
│   ├── layout.tsx          # Root layout – <html>, <body>, Space Grotesk & Inter font betöltés, globális metadata
│   ├── page.tsx            # Főoldal (/) – Server Component
│   ├── globals.css         # Tailwind base import, globális stílusok
│   └── [route]/
│       └── page.tsx        # Aloldal – Server Component
├── components/
│   ├── atoms/              # Újrafelhasználható, kontextustól független UI elemek
│   ├── molecules/          # Összetett UI blokkok, atom-kombinációk
│   └── organisms/          # Teljes szekciók, komplex logikával
│       └── Header.tsx
├── lib/
│   ├── firebase.ts         # Firebase app inicializáció (.env.local kulcsok)
│   ├── firebase-admin.ts   # Admin SDK safe-init (hiányzó Service Account esetén null — zero-500, 7.52.1)
│   ├── admin-dashboard-client.ts # Admin dashboard statisztika + CSV export kliens SDK fallback (7.52.1)
│   └── utils.ts            # cn() és egyéb utility segédfüggvények
├── hooks/                  # Custom React hookok (pl. useAuth, useFirestore)
├── types/                  # Globális TypeScript típusdefiníciók
└── styles/                 # Kiegészítő CSS, ha szükséges
```

---

## 5. Adatfolyam és Renderelési Stratégia

### 5.1 Server-side (alapértelmezett)

```
Firestore / statikus adat
        ↓
    page.tsx (Server Component – async fetch)
        ↓
    Organism komponensek (props-on keresztül)
        ↓
    Statikus HTML → gyors FCP, SEO-barát
```

### 5.2 Client-side (csak ha szükséges)

```
Firebase Auth / felhasználói interakció
        ↓
    "use client" organism/molecule
        ↓
    useState / useEffect / onAuthStateChanged
        ↓
    Optimistic UI frissítés
```

### 5.3 Döntési fa: mikor melyik?

```
Van onClick / useState / useEffect / böngésző API?
├── IGEN → "use client" + legkisebb lehetséges komponensbe zárva
└── NEM  → Server Component (alapértelmezett)

Kell valós idejű adat (chat, élő státusz)?
├── IGEN → onSnapshot (Client Component)
└── NEM  → egyszeri getDoc / fetch (Server Component)
```

---

## 6. Firebase Adatmodell

### 6.1 Kollekciók

| Kollekció                | Leírás                                                           | Mezők                                                                                                                                                                                                                               |
| ------------------------ | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `portfolio`              | A referenciák gyűjteménye kategóriák szerint csoportosítva.      | `category` (string: saas / wordpress / design / ai), `title` (string), `tag` (string), `description` (string), `slug` (string), `assets` (map), `keywords` (array)                                                                  |
| `leads`                  | Az asszisztens által előszűrt és elmentett érdeklődők adatai.    | `name` (string), `email` (string), `projectType` (string), `summary` (string), `createdAt` (string/timestamp)                                                                                                                       |
| `workflows`              | Az ügyfelekhez rendelt fejlesztési és AI munkafolyamatok adatai. | `title` (string), `description` (string), `clientId` (string), `status` (string), `content` (string), `createdAt` (timestamp), `approvedByClient` (boolean), `clientApprovedAt` (timestamp)                                         |
| `workflows/.../comments` | A workflow kártyákhoz kapcsolódó megbeszélések kommentjei.       | `authorId` (string), `authorName` (string), `text` (string), `createdAt` (timestamp)                                                                                                                                                |
| `users`                  | A rendszerben regisztrált ügyfelek profil adatai.                | `uid` (string), `email` (string), `name` (string), `role` (string)                                                                                                                                                                  |
| `notes`                  | Az ügyfelek által mentett AI generált jegyzetek és szövegek.     | `clientId` (string), `title` (string), `content` (string), `category` (string), `createdAt` (timestamp)                                                                                                                             |
| `vault`                  | Az ügyfélszéfben megosztott fájlok metaadat regisztere.          | `clientId` (string), `name` (string), `url` (string), `size` (integer/number), `uploadedBy` (string: client / admin), `uploadedByName` (string), `storagePath` (string), `createdAt` (timestamp)                                    |
| `ai_generations`         | Az AI segédeszközök használatának előzményei és naplói.          | `clientId` (string), `clientName` (string), `toolId` (string), `toolName` (string), `inputValues` (string/json), `outputText` (string), `createdAt` (string/timestamp)                                                              |
| `seo_audits`             | SEO audit eredmények és metaadatok.                              | `clientId` (string), `url` (string), `overallScore` (number), `clarityScore` (number), `ctaQualityScore` (number), `overallUXScore` (number), `recommendations` (array), `createdAt` (string/timestamp)                             |
| `competitor_analyses`    | Versenytárs-elemzés eredmények és összehasonlítások.             | `clientId` (string), `targetUrl` (string), `competitorUrls` (array), `targetScore` (number), `competitorScores` (array), `upsellOpportunity` (string), `createdAt` (string/timestamp)                                               |
| `content_plans`          | Tartalomtervezés eredmények és 3 hónapos naptárak.               | `clientId` (string), `industry` (string), `targetAudience` (string), `mainProduct` (string), `blogTopics` (array), `linkedinPosts` (array), `newsletterTopics` (array), `suggestedKeywords` (array), `createdAt` (string/timestamp) |
| `projects`               | Projektek és munkafolyamatok státuszai.                          | `clientId` (string), `title` (string), `status` (string: active / completed / onboarding), `description` (string), `createdAt` (timestamp)                                                                                          |
| `transactions`           | Stripe tranzakciók és bevételek naplója.                         | `clientId` (string), `amount` (number), `currency` (string), `status` (string), `stripePaymentIntentId` (string), `createdAt` (timestamp)                                                                                           |
| `email_templates`        | Email sablonok és értesítési template-ek.                        | `templateId` (string), `name` (string), `subject` (string), `htmlContent` (string), `variables` (array), `category` (string: onboarding / milestone / notification), `updatedAt` (timestamp)                                        |

### 6.2 Biztonsági Szabályok (Firestore Security Rules)

```
// Alap szabály – élesítés előtt finomítani kell
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## 7. Routing és Navigáció

```
/              → src/app/page.tsx          (Főoldal)
/en            → src/app/en/page.tsx       (Angol főoldal — natív JSON Dictionary i18n)
/[aloldal]     → src/app/[aloldal]/page.tsx (Bővítendő)
```

Firebase Hosting átirányítás a `firebase.json`-ban:

```json
{
  "hosting": {
    "source": ".",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"]
  }
}
```

---

## 8. Kritikus Architektúrális Döntések (ADR)

### ADR-001: App Router választása Pages Router helyett

- **Döntés:** Next.js App Router (`src/app/`)
- **Indok:** Jobb SEO (RSC alapú), streaming, beépített layout rendszer, React 19 kompatibilitás
- **Következmény:** Minden `page.tsx` alapértelmezetten Server Component

### ADR-002: Atomic Design bevezetése

- **Döntés:** `atoms/` → `molecules/` → `organisms/` komponens hierarchia
- **Indok:** Skálázható, újrafelhasználható komponens könyvtár, tiszta függőségi irány
- **Következmény:** Spagettikód és duplikált logika kizárva

### ADR-003: Firebase Hosting + Next.js standalone mód

- **Döntés:** Firebase Hosting a deploy célállomás
- **Indok:** Meglévő Firebase backend (Auth, Firestore) mellé egységes infrastruktúra
- **Következmény:** `deploy.bat` szkript kezeli az élesítést, CI/CD pipeline jövőbeni fejlesztés

### ADR-004: Tailwind CSS 4 globális styling réteg

- **Döntés:** Kizárólag Tailwind utility class-ok, sem CSS modul, sem inline style
- **Indok:** Egységes „Kék-Lila v7.0" dizájn rendszer, gyors iteráció, zero CSS drift
- **Következmény:** `_docs/DESIGN_SYSTEM.md` a vizuális igazság egyedüli forrása

### ADR-005: Állapotkezelés – minimális globális state

- **Döntés:** Redux/Zustand/Context tilos indoklás nélkül; lokális state + Server Components
- **Indok:** Felesleges komplexitás elkerülése, Next.js RSC optimális kihasználása
- **Következmény:** Globális state csak akkor vezethető be, ha server-side adatáramlás már nem elegendő

### ADR-006: Next.js 16 Cache Components rollback

- **Döntés:** Next.js 16 Cache Components kikapcsolása (cacheComponents: false)
- **Indok:** cacheLife() csak "use cache" függvényen belül hívható, new Date() hívások Server Component-ekben tiltottak, build hibák
- **Következmény:** 'use cache' direktíva és cacheLife() hívások eltávolítva minden fájlból, build sikeresen lefutott 42/42 oldallal

### ADR-007: `@sentry/nextjs` Eltávolítása & `/admin/login` `noindex` Megőrzése (`v7.85.0`)

- **Döntés:** A `@sentry/nextjs` csomag, az `src/instrumentation*.ts`, `sentry.*.config.ts`, `src/lib/sentry.ts` és a hibahatár-fájlok (`src/app/global-error.tsx`, `src/app/error.tsx`) eltávolítása; a `next.config.js`, `src/lib/logger.ts` és `.env.example` visszaállítása a Sentry előtti állapotra. A `src/app/admin/login/layout.tsx` (`robots: { index: false, follow: false }`) SEO védelem szándékosan megmarad.
- **Indok:** A Sentry hibakövetésre nincs szükség, a strukturált JSON naplózás (`src/lib/logger.ts`) és Firebase Analytics önmagában elegendő.

### ADR-008: Pro Prompt Stúdió Közös Motor & 5-Pilléres Katalógus (`v7.86.0`)

- **Döntés:** Moduláris, 0 ms-os determinisztikus prompt-fordító (`src/lib/prompt-engine/{types,builders,presets,index}.ts`), közös `<LivePromptPreviewCard />` (`src/components/molecules/LivePromptPreviewCard.tsx`) és Groq `openai/gpt-oss-120b` alapú `refinePromptStudioAction` (`src/actions/prompt-studio-refine.ts`) létrehozása `<untrusted_user_brief>` elhatárolással; a `/portal/ai-muhely` katalógus 5 szakmai pillérbe (`online-graphics`, `offline-print`, `apparel-merch`, `software-arch`, `analysis-seo`) rendezése a meglévő 18 generátor `ToolType` kulcsainak és útvonalainak törése nélkül.
- **Indok:** A tervezett 5 dedikált stúdióoldal közös determinisztikus motorra, token-előnézetre és egységes biztonságos finomító actionre épüljön kódduplikáció nélkül.

---

## 10. KPI Dashboard Aggregációk (Cycle 160-162)

### 10.1 Adatforrások és Aggregációs Logika

| KPI Mutató                          | Adatforrás (Kollekció)                                                 | Aggregációs Logika                                                             | Frissítési Frekvencia    |
| ----------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------ |
| **Havi Bevétel**                    | `transactions`                                                         | `amount` mező összegzése hónaponként, `status: 'completed'` szűréssel          | Napi (Server Action)     |
| **Aktív Projektek**                 | `projects`                                                             | `status: 'active'` vagy `status: 'in_progress'` dokumentek száma               | Valós idejű (onSnapshot) |
| **Befejezett Projektek**            | `projects`                                                             | `status: 'completed'` dokumentek száma                                         | Valós idejű (onSnapshot) |
| **AI Eszköz Használat**             | `ai_generations`, `seo_audits`, `competitor_analyses`, `content_plans` | Események száma eszközönként hónaponként                                       | Napi (Server Action)     |
| **Átlagos Projekt Teljesítési Idő** | `projects`                                                             | `createdAt` és `updatedAt` különbség átlaga `status: 'completed'` dokumentokon | Heti (Server Action)     |
| **Lead Konverziós Ráta**            | `leads` → `projects`                                                   | `leads` száma vs. `projects` száma (hány lead lett projekt)                    | Heti (Server Action)     |

### 10.2 Server Action Implementáció

**Fájl:** `src/actions/dashboard.ts`

```typescript
export async function getDashboardStatsAction(idToken: string) {
  // 1. Auth Verification (admin role check)
  // 2. Firestore aggregációk (Firebase Admin SDK szerveroldali)
  // 3. Strukturált válasz:
  //    - revenueTrend: Array<{ month: string, amount: number }>
  //    - activeProjects: number
  //    - completedProjects: number
  //    - aiToolUsage: Map<string, number>
  //    - avgCompletionTime: number (napokban)
  //    - leadConversionRate: number (százalék)
}
```

### 10.3 Vizuális Megjelenítés (Recharts)

**Komponens:** `src/components/organisms/AdminDashboard.tsx` (már létezik, bővíteni kell)

- **Bevételi Trendek:** `LineChart` vagy `AreaChart` - havi lebontású bevételek
- **Projekt Státuszok:** `PieChart` - aktív vs. befejezett projektek aránya
- **AI Eszköz Használat:** `BarChart` - eszközönkénti használati statisztikák
- **Teljesítési Idő:** `BarChart` - átlagos teljesítési idő hónaponként

### 10.4 Export Funkciók

**PDF Jelentések:**

- `src/actions/export-pdf.ts` - Server Action audit eredmények PDF exportjához (jsPDF vagy pdfkit)
- `src/components/molecules/PdfExportButton.tsx` - Export gomb komponens

**CSV Export:**

- `src/actions/export-csv.ts` - Server Action leadek és tranzakciók CSV exportjához
- `src/components/molecules/CsvExportButton.tsx` - Export gomb komponens

---

## 9. SEO/AEO Optimalizáció (AI Search Engine Optimization)

### 9.1 Implementált Sémák

| Oldal                                                   | JSON-LD Sémák                                                                | Direct Answer Blokkok                                   | Utolsó frissítés |
| ------------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------- | ---------------- |
| Főoldal (`/`)                                           | Person, Organization, Service, BreadcrumbList, HowTo, FAQPage                | 3 blokk (WebDude, Technológiai stack, Projekt időzítés) | 2026-09-21       |
| Angol főoldal (`/en`)                                   | BreadcrumbList, Person, Organization, LocalBusiness, Service, HowTo, FAQPage | 3 blokk (Expertise, Tech Stack, Timeline)               | 2026-09-24       |
| Szolgáltatások (`/szolgaltatasok`)                      | Person, Service, BreadcrumbList, FAQPage                                     | 1 blokk (Szolgáltatások áttekintése)                    | 2026-09-21       |
| Weboldal készítés (`/szolgaltatasok/weboldal-keszites`) | Service, BreadcrumbList, FAQPage                                             | 2 blokk (WebDude, Weboldal készítés folyamat)           | 2026-09-21       |
| AI workflow (`/szolgaltatasok/ai-workflow-kialakitas`)  | Service, BreadcrumbList                                                      | 1 blokk (AI workflow áttekintés)                        | 2026-09-21       |

A JSON-LD sémák központi forrása (SSOT): `src/lib/structuredData.ts` — `serializeJsonLd` (XSS-védett), `buildHuJsonLd`, `buildEnJsonLd` (`inLanguage: "en-US"`, LocalBusiness Kecskeméttel a sémában).

### 9.2 XSS Védelem

Minden JSON-LD séma kötelezően tartalmazza:

```typescript
dangerouslySetInnerHTML={{
  __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
}}
```

### 9.3 AEO Direct Answer Blokkok

- **Méret:** 40-60 szó, tömör, lényegretörő
- **Szövezés:** Mentes a marketing sallangoktól, entitás-gazdag
- **Cél:** ChatGPT, Perplexity, Gemini AI keresők könnyen ki tudják emelni

### 9.4 Person Entitás (Balog Norbert — E-E-A-T)

```json
{
  "@type": "Person",
  "@id": "https://webdude.hu/#person",
  "name": "Balog Norbert",
  "alternateName": ["Balog Norbi", "WebDude"],
  "jobTitle": "Full-Stack Webfejlesztő, Art Director & AI Automatizációs Szakértő",
  "knowsAbout": [
    "Next.js 16",
    "React 19",
    "TypeScript",
    "Tailwind CSS v4",
    "Firebase",
    "AI workflow automatizáció",
    "ChatGPT",
    "Claude",
    "SEO és AEO/GEO optimalizálás"
  ],
  "worksFor": {
    "@type": "Organization",
    "@id": "https://webdude.hu/#organization",
    "name": "WebDude"
  }
}
```

### 9.5 Organization Entitás (WebDude)

```json
{
  "@type": "Organization",
  "@id": "https://webdude.hu/#organization",
  "name": "WebDude",
  "foundingDate": "2009",
  "areaServed": { "@type": "Country", "name": "Hungary" },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+36 70 323 8003",
    "email": "hello@webdude.hu",
    "contactType": "customer service",
    "areaServed": "HU",
    "availableLanguage": "Hungarian"
  },
  "sameAs": [
    "https://www.facebook.com/webdude.hu",
    "https://www.linkedin.com/company/webdude",
    "https://twitter.com/webdude_hu"
  ]
}
```

---

## 10. Admin Felület Funkciók

### 10.1 KPI Dashboard Bővítések

| Metrika            | Leírás                                                    | Adatforrás                | Utolsó frissítés |
| ------------------ | --------------------------------------------------------- | ------------------------- | ---------------- |
| Churn Rate         | Ügyfél elvesztési arány (90 nap)                          | Firestore transactions    | 2026-09-21       |
| LTV                | Lifetime Value (átlagos bevétel ügyfelenként)             | Firestore transactions    | 2026-09-21       |
| CAC                | Customer Acquisition Cost (marketing spend / új ügyfelek) | Firestore marketing_spend | 2026-09-21       |
| Revenue by Service | Szolgáltatásonkénti bevétel                               | Firestore transactions    | 2026-09-21       |

### 10.2 Export Funkciók

| Export Típus    | Formátum | Képes Komponens                      | Utolsó frissítés |
| --------------- | -------- | ------------------------------------ | ---------------- |
| Leadek          | CSV      | Server Action (admin-dashboard.ts)   | -                |
| Tranzakciók     | CSV      | Server Action (admin-dashboard.ts)   | -                |
| Projektek       | CSV      | Server Action (admin-dashboard.ts)   | -                |
| Munkafolyamatok | PDF      | Client Component (work-log/page.tsx) | 2026-09-21       |

### 10.3 Email Template Editor

| Funkció            | Leírás                                                            | Utolsó frissítés |
| ------------------ | ----------------------------------------------------------------- | ---------------- |
| Sablon létrehozás  | Új email sablon létrehozása (onboarding, milestone, notification) | -                |
| Sablon szerkesztés | Tárgy, HTML tartalom, változók szerkesztése                       | -                |
| Sablon törlés      | Sablon törlése                                                    | -                |
| Sablon duplikálás  | Sablon másolása (új templateId)                                   | 2026-09-21       |
| Preview mód        | HTML előnézet                                                     | -                |

---

## 10. Frissítési Kötelezettség

Az ügynök az alábbi esetekben **automatikusan frissíti** ezt a fájlt:

| Esemény                                  | Szükséges frissítés                                |
| ---------------------------------------- | -------------------------------------------------- |
| Új atom / molecule / organism létrehozva | Komponens regiszter (2. szekció) bővítése          |
| Új route / page.tsx létrehozva           | Pages tábla (2.4) és Routing (7. szekció) bővítése |
| Új Firestore kollekció tervezve          | Adatmodell (6. szekció) frissítése                 |
| Új architektúrális döntés                | ADR hozzáadása (8. szekció)                        |
| Stack verzióváltás                       | Technológiai Stack (3. szekció) frissítése         |

---

_ARCHITECTURE.md v1.0 — webdude.hu | Karbantartó: Norbi (WebDude) | Szinkronban tartandó: AGENTS.md, DESIGN_SYSTEM.md, CHANGELOG.md, ROADMAP.md_
