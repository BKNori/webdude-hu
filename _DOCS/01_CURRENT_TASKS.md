# 01_CURRENT_TASKS.md — WebDude.hu Projekt

## Aktuális feladatok és állapot (2026-11-17 — v7.66.0)

### 🟢 Legutóbb lezárt sprintek (2026-11-17)

- ✅ **v7.66.0 — Teljes Playwright E2E Konszolidáció, `/en` i18n & SEO/hreflang Audit & CI Szinkron:**
  - **Teljes E2E Suite (`31/31 PASS`):** `e2e/hirek.spec.ts` frissítve a `CollectionPage` → `mainEntity.ItemList` sémára; `e2e/smoke.spec.ts` kiegészítve az angol `/en` útvonalak (`canonical`, `hreflang`, JSON-LD, Zéró Fix Ár) ellenőrzésével; mind a 9 spec fájl (31 teszt) 100% PASS.
  - **`/en` i18n & CTA Kontraszt:** `Hero.tsx` és a 4 `/en/services/*` aloldal CTA gombjai `text-slate-950`-ről Kék-Lila v7.0 `from-[#075985] to-[#5B21B6] text-white` WCAG AAA-ra javítva + `useReducedMotion()`; `PortfolioHero.tsx` lokalizált `/en/portfolio`-hoz; `en.json` egyes számú szöveghigiénia és `/en` snapshot tipográfia szinkron.
  - **CI Pipeline (`.github/workflows/ci.yml`):** kiegészítve a `npx jest --no-coverage` és `node scripts/audit-contrast.js` kapukkal.
  - **Teljes QA Gate:** `tsc` (0), `lint --max-warnings 0` (0), `jest` (51/51 PASS), `audit-contrast.js` (383 fájl, 0 hiba), `npm run build` (`176/176` oldal, `BUILD_EXIT=0`), `npx playwright test` (31/31 PASS).
- ✅ **v7.65.0 — Portál Értesítési Motor (Anti-Drain), Esettanulmány Higiéniák & E2E Smoke Kiterjesztés:**
  - **Anti-Drain Értesítések (`usePortalNotifications.ts` & `PortalNotificationBell.tsx`):** Folyamatos `onSnapshot` streamek megszüntetve; 60 mp-es `document.visibilityState === "visible"` alapú `getDocs(..., limit(10))` polling, manuális frissítés (`RefreshCw`), Kék-Lila v7.0 olvasatlan badge (`aria-live="polite"`) és `localStorage`-alapú `markAllAsRead()`.
  - **Esettanulmány Higiéniák (`RimaiCaseStudy.tsx`, `GeneralCaseStudy.tsx`):** 0 db `#f59e0b`/`amber-*`/`yellow-*` a `src/` és `public/` alatt, 0 árva komponens, teljes `useReducedMotion()` és Kék-Lila v7.0 CTA kontraszt (`text-white`).
  - **Playwright E2E Smoke (`e2e/smoke.spec.ts`):** Kiterjesztve `/munkak/rimai-utepito-kft-teljes-koru-digitalis-es-vizualis-arculatepites`, `/munkak/dr-danyi`, `/munkak/nem-letezik-xyz-404` (404) és `/portal` `noindex` ellenőrzésekkel (0 DB írás).
  - **QA Gate:** `tsc` (0), `lint --max-warnings 0` (0), `jest` (5/5 suite, 51/51 PASS), `audit-contrast.js` (383 fájl, 0 hiba).
- ✅ **v7.64.0 — Portál Vault Előnéző, Admin KPI Bővítés & Workflow Token Audit:**
  - **Portál Vault Előnéző (`ClientVault.tsx` & `DocumentPreviewModal.tsx`):** Kék-Lila v7.0 glassmorphism, akadálymentes **"Előnézet" (`Eye`)** gomb közvetlenül a letöltés mellett `aria-label` és `focus-visible` gyűrűvel, beágyazott interaktív elemek megszüntetve, `role="dialog"` / `aria-modal="true"` / `ESC` / `useReducedMotion()` végig érvényesítve.
  - **Admin KPI & Egységes Export (`getEnhancedKpiMetrics.ts`, `AdminExportToolbar.tsx`, `admin-kpi-pdf.ts`, `src/app/admin/page.tsx`, `AdminDashboard.tsx`):** `revenueByService` és `CAC` / `LTV` metrikák `NaN`-biztos `0` fallbackekkel, egységesített 4 gombos **CSV (Leadek, Projektek, Tranzakciók) + PDF (dinamikus jsPDF)** export vezérlősáv `Loader2` és `aria-label` támogatással.
  - **Aszinkron Generálás Token-Lánc (`DynamicWorkflowForm.tsx` → `useCreateGeneration.ts` → `createGeneration.ts`):** `setStarting(false)` beragadt-loading bug javítva, `createGenerationInputSchema` Zod validáció, `useReducedMotion()` és `text-white` WCAG AAA CTA.
  - **QA Gate:** `tsc` (0), `lint --max-warnings 0` (0), `jest` (5/5 suite, 51/51 PASS), `audit-contrast.js` (383 fájl, 0 hiba).
- ✅ **v7.63.0 — UI/UX & Animációs Konszolidáció:** Kék-Lila v7.0 gradiens- és prompt-tisztítás, nyers Unicode emojik eltávolítása (`stripe.ts`, `portal-kezelo`), főoldali és GoBox térköz-ritmus szinkron (`py-24 md:py-32`), `BentoCard` Luminous Glassmorphism, `transition-all` kivezetése és `motion/react` spring fizika (`useReducedMotion()`).
- ✅ **v7.62.0 — Főoldali Hero és Maradék Kliens Organizmusok Modularizálása (`<= 300` sor):**
  - **`HeroSectionNew.tsx` (`546 → 252` sor):** `heroSlidesConfig.tsx` (211 sor), `HeroBackgroundLayers.tsx` (81 sor, LCP `priority={currentSlide === 0}`) és `HeroSliderControls.tsx` (94 sor); `isolate` kontextus és `hero-cta-*-primary` E2E szelektorok 100%-ban megőrizve.
  - **`KristofkaWorkflow.tsx` (`637 → 220` sor):** `KristofkaInputForm.tsx` (163 sor) + `KristofkaPitchOutput.tsx` (222 sor, dinamikus `await import("jspdf")` PDF exporttal és NotebookLM Markdown exporttal).
  - **`AIWorkshopCollection.tsx` (`658 → 287` sor) & `EmailTemplateEditor.tsx` (`588 → 235` sor):** `src/data/ai-workshop-collection-config.ts` (292 sor), `EmailTemplateFormAndPreview.tsx` (232 sor, sandboxolt `<iframe srcDoc="..." sandbox="" />` előnézet) és `EmailTemplatesList.tsx` (121 sor).
  - **`firestore.rules` & `_docs/ARCHITECTURE.md`:** explicit `match /processed_stripe_events/{eventId} { allow read, write: if false; }` szabály és teljes komponens-regiszter szinkron.
  - **QA Gate & E2E:** `tsc` (0), `lint` (0), `jest` (51/51 PASS), `audit-contrast.js` (383 fájl, 0 hiba), `playwright test e2e/smoke.spec.ts` (5/5 PASS).
- ✅ **v7.61.0 — P0 Security Hardening, Sitemap/Noindex Fix & Dynamic Bundle Optimization:**
  - **P0 Szerveroldali Biztonság:** `getEnhancedKpiMetricsAction` (`src/app/actions/getEnhancedKpiMetrics.ts` + `src/app/admin/page.tsx`), `saveToCaseStudyAction` (`src/actions/case-study.ts` + `KristofkaWorkflow.tsx`) és `autoAssignTaskAction` / `autoAssignAllPendingTasksAction` (`src/actions/dispatcher.ts` + `src/app/admin/work-log/page.tsx`) ellátva szerveroldali Firebase ID token / admin jogosultság-ellenőrzéssel, Zod input validációval és cPanel-barát kliens SDK fallbackkel.
  - **P0 Stripe Webhook Hardening (`src/app/api/webhooks/stripe/route.ts`):** 300 másodperces (5 perces) replay-ablak ellenőrzés a `t=` időbélyegre és eseményszintű idempotencia (`processed_stripe_events/{event.id}` + `orderData.status === "paid"` védelem).
  - **P1 Sitemap & Portál `noindex`:** `/en/portfolio` és angol szolgáltatás/kapcsolat útvonalak felvéve a `src/app/sitemap.ts`-be; a zárt `/portal/ai-muhely/*` útvonalak eltávolítva a sitemapből; `src/app/portal/layout.tsx`, `src/app/portal/page.tsx` és `src/app/portal/ai-muhely/kristofka/layout.tsx` `robots: { index: false, follow: false }` védelemmel ellátva.
  - **P1 Dinamikus Bundle Optimalizáció & Hardening:** `jspdf` dinamikus `await import("jspdf")` betöltése (`KristofkaWorkflow.tsx`, `src/app/admin/page.tsx`), `KristofkaWorkflow` `next/dynamic` lazy-loading a `ClientAITools.tsx`-ben (296 sor), `HeroSectionNew.tsx` Zéró Fix Ár javítás (`"Egyedi árazás, garantált határidők"`), `/api/chat` Zod tömb- és hossz-validáció, valamint `EmailTemplateEditor.tsx` sandboxolt `<iframe srcDoc="..." sandbox="" />` előnézet.
  - **QA Gate:** `tsc` (0), `lint` (0), `jest` (51/51 PASS), `audit-contrast.js` (375 fájl, 0 hiba).
- ✅ **v7.60.0 — Nyomdai AI Műhelyek Modularizálása (`<= 300` sor) & Regiszter Tisztítás:**
  - **`FlyerWorkshopGenerator` (`822 → 197` sor):** `FlyerInputForm.tsx` (280 sor) + `FlyerOutputStudio.tsx` (289 sor).
  - **`PackagingWorkshopGenerator` (`852 → 197` sor):** `PackagingInputForm.tsx` (294 sor) + `PackagingOutputStudio.tsx` (289 sor).
  - **`SignageWorkshopGenerator` (`820 → 197` sor):** `SignageInputForm.tsx` (281 sor) + `SignageOutputStudio.tsx` (298 sor).
  - **`_docs/ARCHITECTURE.md` Tisztítás:** 0 db `"Cyber-Arany"` említés maradt; mind a 6 új alkomponens és az összes `/portal/ai-muhely/*` útvonal regisztrálva.
  - **QA Gate:** `tsc` (0), `lint` (0), `jest` (51/51 PASS), `audit-contrast.js` (374 fájl, 0 hiba).
- ✅ **v7.59.0 — Architektúra, Design & SEO Polish Audit Javítások:**
  - **Dokumentáció & Meta Description (145–160 kar.):** `_docs/ARCHITECTURE.md` §3.1 frissítve `"WebDude Kék-Lila v7.0"`-ra; 11 oldal `metadata.description` mezője tömörítve 150–156 karakteres, SERP-csonkításmentes leírásra.
  - **Zéró Emoji & Szöveges Checkmark Tisztítás:** `AIBenefitsGrid.tsx`, `AboutSection.tsx`, `SingleAITool.tsx`, `PortalWorkflowCard.tsx`, `WorkflowApprovalPanel.tsx`, `WorkflowMilestonePayment.tsx` és `AIToolsMarketingForms.tsx` megtisztítva (`lucide-react` `CheckCircle2`, `Check`, `Zap`).
  - **`LogoWorkshopGenerator.tsx` Modularizálás (`717 → 191` sor):** 2 új alkomponens a `src/components/organisms/logo-workshop/` alatt (`LogoInputForm.tsx` 264 sor, `LogoOutputStudio.tsx` 234 sor).
  - **QA Gate:** `tsc` (0), `lint` (0), `jest` (51/51 PASS), `audit-contrast.js` (368 fájl, 0 hiba).
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

- ✅ **Értesítési rendszer (Anti-Drain) — LEZÁRVA [7.65.0]:** a `PortalNotificationBell` + `usePortalNotifications` 60 másodperces, láthatóság-érzékeny (`document.visibilityState === "visible"`) `getDocs(..., limit(10))` pollinggal működik (zéró folyamatos `onSnapshot`), manuális frissítéssel és `markAllAsRead()` támogatással.
- ✅ **Vault dokumentum-előnézet — LEZÁRVA [Cycle 3151]:** a `DocumentPreviewModal` molekula (PDF-`iframe` + kép `<img>`, glassmorphism, `motion/react`, `useFocusTrap` ESC/fókuszcsapda, Bezárás/Megnyitás/Letöltés/Link-másolás) él és a `ClientVault` Eye-gombjához van bekötve. _(2026-10-14: a modal valódi buborék-zárási hiba javítva + a nyers hex színek a Kék-Lila v7.0 tokenekre cserélve.)_

#### 🟠 2. Admin UI (adat-alapú döntéshozatal)

- ✅ **KPI dashboard bővítése — LEZÁRVA [7.64.0]:** MRR, összes bevétel, LTV, CAC (`marketing_spend`), Churn Rate és szolgáltatásonkénti bevétel-bontás (`revenueByService`) `0` / `[]` safe fallbackekkel (`src/app/actions/getEnhancedKpiMetrics.ts`, `src/app/admin/page.tsx`, `src/components/organisms/AdminDashboard.tsx`).
- ✅ **Export funkciók egységesítése — LEZÁRVA [7.64.0]:** egységes 4 gombos `AdminExportToolbar` molekula (Leadek CSV, Projektek CSV, Tranzakciók CSV, dinamikus jsPDF KPI Riport PDF) töltésjelzővel (`Loader2`) és `aria-label` attribútumokkal (`src/components/molecules/AdminExportToolbar.tsx`, `src/lib/admin-kpi-pdf.ts`).

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
