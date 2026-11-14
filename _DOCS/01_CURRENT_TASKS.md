# 01_CURRENT_TASKS.md — WebDude.hu Projekt

## Aktuális feladatok és állapot (2026-11-14 — v7.58.0)

### 🟢 Legutóbb lezárt sprintek (2026-11-14)

- ✅ **v7.58.0 — PosterWorkshopGenerator (`<= 300` sor) Modularizálás & Teljes E2E Verifikáció:**
  - **`PosterWorkshopGenerator.tsx` Modularizálás (`606 → 214` sor):** 2 új alkomponens a `src/components/organisms/poster-workshop/` alatt (`PosterInputForm.tsx` 292 sor, `PosterOutputPanel.tsx` 92 sor); `ToolAccessLock` RBAC, `addPosterGenerationAction` és Kék-Lila v7.0 tokenek 100%-ban megőrizve.
  - **Teljes QA & E2E Verifikáció:** `tsc` (0), `lint` (0), `jest` (51/51 PASS), `playwright test e2e/smoke.spec.ts` (**5/5 PASS, 16.6s**).
- ✅ **v7.57.0 — ClientAITools Monolit Szétbontása (`<= 300` sor) & Smoke E2E Verifikáció:**
  - **`ClientAITools.tsx` Modularizálás (`1144 → 288` sor):** új központi regiszter (`src/lib/aiToolsRegistry.ts`, 280 sor) és 3 új alkomponens a `src/components/organisms/ai-tools/` alatt (`AIToolsCategoryAndSelector.tsx` 140 sor, `AIToolsMarketingForms.tsx` 176 sor, `AIToolsGraphicsForms.tsx` 288 sor); `ai_generations` kliens SDK fallback és `KristofkaWorkflow` integráció 100%-ban megőrizve.
  - **Playwright Smoke E2E Verifikáció:** `npx playwright test e2e/smoke.spec.ts` **5/5 PASS (`27.5s`, EXIT=0)**.
- ✅ **v7.56.0 — PortalDashboard Modularizálás & Playwright E2E Smoke Suite:**
  - **PortalDashboard Atomic Design szétbontás (`<= 300` sor):** `PortalDashboard.tsx` 126 soros karmesterré karcsúsítva; új `PortalHeroAndTabs.tsx` (WCAG AA `tablist`/`tab` + Kék-Lila v7.0) és `PortalClientWorkspace.tsx` organizmusok a `src/components/organisms/portal/` alatt; `_docs/ARCHITECTURE.md` regiszter frissítve.
  - **Playwright E2E Smoke Suite (`e2e/smoke.spec.ts`):** egyesített smoke teszt a `/`, `/szolgaltatasok`, `/munkak/btshop`, `/kapcsolat` (Zod kliensoldali validáció + Anti-Drain 0 Firestore írás) és `/portal` (auth-fal) útvonalakra.
- ✅ **v7.55.0 — Technikai Adósság & QA Higiénia Feloldása:**
  - **Kék-Lila v7.0 Szín-higiénia:** BTShop placeholder SVG-k (`btshop-hero-placeholder.svg`, `btshop-dashboard-placeholder.svg`), `FlyerWorkshopGenerator.tsx` és `workshop-presets.ts` megtisztítva — 0 db `#f59e0b` / `#d97706` / `#fbbf24` / `#b45309` maradt a teljes `src/` és `public/` alatt.
  - **Dead Code & Gyökér-higiénia:** Az árva `AIHeroSlider.tsx`, `HeroSectionClient.tsx`, `HeroStaticBanner.tsx` komponensek archiválva (`_mentesek/20261114_techdebt-cleanup/`), a gyökérbeli ideiglenes `.log` / `.txt` / segédszkriptek törölve, a `.gitignore` kiegészítve (`*.log`, `dev-server.log`, `_mentesek/`).
  - **Jest & Unit Tesztek:** `jest.config.js` kizárja a `_mentesek/**`, `_docs/**`, `e2e/**` mappákat; `jest.setup.ts` `next/link` mockkal 0 `console.error`; `Button.test.tsx` és `Footer.test.tsx` Kék-Lila v7.0 asserciókkal (51/51 PASS).
- ✅ **v7.54.1 — SSOT Dokumentációs Konszolidáció:** `AGENTS.md`, `_docs/AGENTS.md`, `_docs/DESIGN_SYSTEM.md`, `_docs/WEBDUDE_OS_KNOWLEDGE_BASE.md`, `_docs/VISUAL_AUDIT_PLAN.md` és `_docs/VISUAL_DESIGNS.md` teljes v7.0 szinkronizációja; lezárt recovery dokumentumok archiválva (`_docs/archive/`).
- ✅ **v7.54.0 — Nyilvános Termékkatalógus + Granulált Generátor-RBAC + Monolit Refaktorálás:** `/termekek` nyilvános konverziós katalógus, 20 generátoron `ToolAccessLock` RBAC, `ClientAITools` és `PosterWorkshopGenerator` moduláris refaktorálása.
- ✅ **v7.40.0–v7.44.0 — Teljes Körű SEO/AEO/GEO Konszolidáció:** `/hirek`, `/szolgaltatasok`, `/munkak` (14 esettanulmány), `/termekek` és `/ai-megoldasok` szerveroldali JSON-LD, E-E-A-T (`Balog Norbert`) és Zéró Fix Ár egységesítése.

---

### 🟢 Befejezve: Git History Cleanup — Tömeges tárhely felszabadítás

**Dátum:** 2026-09-19  
**Státusz:** ✅ COMPLETED

**Végrehajtott lépések:**

1. `.gitignore` frissítés (deploy_dist/, deploy*.zip kizárva)
2. `git filter-branch` — functions/node_modules törlése a history-ból
3. `git filter-branch` — .firebase/logs törlése a history-ból
4. `git gc --prune=now --aggressive` (refs/original törlés, GC)
5. `git push origin master --force` (GitHub.sync)

**Eredmény:**

- Git pack méret: 566,74 MB → 156,24 MB (**410 MB felszabadulva, 72% reduction**)
- TypeScript validáció: ✅ 0 hiba
- GitHub.remote: ✅ sikeres force push

**Felszabadult hely:** ~410 MB

---

### 🔵 Aktív / Várakozó

**Forrás:** `_docs/ROADMAP.md` — középtávú fejlesztések + technikai adósságok (2026-10-02-i állapot)

#### 🟠 1. Portál funkciók (ügyfél-elégedettség / transzparencia)

- ✅ **Valós idejű értesítések (badge) — LEZÁRVA [7.20.5]:** a `PortalNotificationBell` + `usePortalNotifications` (3× `onSnapshot` a Phase 2 [7.22.0] óta: user_generations + vault + users/{uid}/notifications, `limit(10)`, tiszta cleanup, error callback) él; a createGeneration `failed` státuszt is jelzi. A dead-end `portal-notifications.ts` **törölve** (YAGNI).
- ✅ **Vault dokumentum-előnézet — LEZÁRVA [Cycle 3151]:** a `DocumentPreviewModal` molekula (PDF-`iframe` + kép `<img>`, glassmorphism, `motion/react`, `useFocusTrap` ESC/fókuszcsapda, Bezárás/Megnyitás/Letöltés/Link-másolás) él és a `ClientVault` Eye-gombjához van bekötve. _(2026-10-14: a modal valódi buborék-zárási hiba javítva + a nyers hex színek a Kék-Lila v7.0 tokenekre cserélve.)_

#### 🟠 2. Admin UI (adat-alapú döntéshozatal)

- **KPI dashboard bővítése** — Revenue, Churn rate, LTV metrikák
  (`src/app/admin/dashboard/`, `src/app/actions/getEnhancedKpiMetrics.ts`).
- **Export funkciók egységesítése** — a `src/app/actions/exportLeads.ts` és `exportProjects.ts`
  különálló akciók; PDF (jspdf) + CSV formátumok egységes felületen, letöltés-dialógussal.

#### 🟡 3. Technikai adósság (stabilitás / hiba-észlelés)

- **Playwright E2E smoke suite** — ✅ **HIÁNY-PÓTLÁS LEZÁRVA [7.23.0]:** a meglévő infra (Playwright config, `test:e2e`, `smoke-helpers.ts`) mellé 3 új spec készült:
  - `e2e/stripe-webhook.spec.ts` — biztonsági őr: érvénytelen/hiányzó `stripe-signature` fejléccel a route elutasítja a kérést (**0 Firestore írás**, pozitív happy-path szándékosan nem fedett).
  - `e2e/munkak-slug.spec.ts` — dinamikus `GeneralCaseStudy` slug (200 + 1 H1 + JSON-LD) + ismeretlen slug → 404.
  - `e2e/pricing-zero-fixed.spec.ts` — a Zérő Fix Ár [7.21.0] takarítás regressziós őre (bolt nincs fix ár, `/termekek` JSON-LD nincs `price`).
  - **Eredmény:** 23/23 teszt PASSED, 0 flake; `tsc`/`lint`/`build` = 0. A `test-results/` + `playwright-report/` a `.gitignore`-ban van.
  - **Opcionális következő:** CI-bridge (`.github/workflows/` E2E lépés) — külön jóváhagyás.
- **Sentry monitoring** — production hibák láthatósága (jelenleg csak Firebase Analytics van).

---

### ✅ Lezárva: BTShop hero high-res csere (7.14.4)

- A `btshop-banner-highres.webp` (6675×3758) master a helyére került.
- `src/data/works.ts` (`image` + `bannerImage`) és `src/components/organisms/BtshopCaseStudy.tsx` (hero `src`, 46. sor) frissítve.
- A `gallery[]` tömb és a komponens galéria-blokkja (220. sor) szándékosan változatlan.
- `node scripts/generate-responsive-images.js --clean` → hero 3 kép / 24 fájl, `[CLEAN] nincs elavult`; összesen 78 kép / 434 derivatívum.
- Verifikálva `sharp`-pel: 1600w → 1600×901, 2000w → 2000×1126 px (**valódi downscale**).
- QA: `tsc`=0, `lint --max-warnings 0`=0, `build`=0 (164 oldal).
- **Ezzel a repóban nulla ismert felnagyítás maradt** — a portfólió hero-k vizuális adósságai lezárva.

### ⛔ Megszűnt blokkoló — BTShop hero (2026-10-02)

- A korábbi blokkoló feltétel (**a highres master nem létezett a repóban**) **lezárult**:
  Norbi biztosította a `btshop-banner-highres.webp` (6675×3758) forrást, és a 7.14.4
  sprintben a csere + generálás + mindhárom QA kapu zöld lett.
- A `btshop-banner-2.webp` (1376×768) **a galériában maradt** — ott szándékosan
  a szűk `[320, 640]` AVIF készlet renderelődik, ez nem adósság.
