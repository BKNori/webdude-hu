# Projekt Haladás és Állapotjelentés (WebDude OS Enterprise)

> **AI DIREKTÍVA:** Ez a dokumentum a projekt makro-szintű állapotát (Roadmap) és a minőségbiztosítási (QA) státuszt rögzíti. Ezt a fájlt minden sikeres ciklus (Sprint) lezárása után kötelezően frissítened kell a legújabb validációs eredményekkel és az áthelyezett backlog elemekkel.

## 1. Minőségbiztosítási Státusz (QA Gates) — frissítve: 2026-09-30 (7.8.0 lezárva)

- **7.8.0 QA (2026-09-30):** `npx tsc --noEmit` TSC_EXIT=0; `npm run lint` LINT_EXIT=0 (0 hiba, 2 előre meglévő `react-hooks/exhaustive-deps` warning `HeroSectionNew.tsx`); `npm run build` BUILD_EXIT=0. Tartalom: `PortalDashboard.tsx` 793 → 194 sor, 6 új `portal/*` szekció-komponens, Phase 2 hookok (`usePortalSession` + `usePortalData`) életbe léptetése, `usePortalData` idToken-guard bugfix.
- **7.7.0 QA (2026-09-29):** `npx tsc --noEmit` TSC_EXIT=0; `npm run lint` LINT_EXIT=0 (0 hiba, 2 előre meglévő `react-hooks/exhaustive-deps` warning `HeroSectionNew.tsx`); `npm run build` BUILD_EXIT=0. Tartalom: hero háttérkép-láthatóság (`opacity-65`, `bg-slate-950/60`, bal-oldali WCAG AA scrim), Esettanulmány #2 kép bekötve (HU/EN/defaults), hero 3. dia mockup-kártya eltávolítva, „Nulláról 3 hónap alatt a piac élére" állítás visszavonva (élő forrásból 0 találat).
- **I18N / EN főoldal QA (2026-09-24):** `[lang]` dinamikus route megszüntetve, natív `/en` route (`src/app/en/page.tsx` + `layout.tsx`) bevezetve; JSON-LD SSOT (`src/lib/structuredData.ts`); locale-aware navigáció; hreflang; új `not-found.tsx` konverziós 404.
- **7.6.0 QA (2026-09-20):** TSC_EXIT=0; LINT_EXIT=0; BUILD_EXIT=0; 142 útvonal. PortfolioGrid Bento Grid + Electric Cyan, 8/8 `/munkak/[slug]` prerenderelve → 0 regresszió.
- **7.5.2 QA (2026-09-20):** TSC_EXIT=0 — rich `Work` interfész visszaállítva, `GeneralCaseStudy.tsx` TS1381 javítva.
- **7.5.0 QA (2026-09-19):** TSC_EXIT=0; LINT_EXIT=0; `next.config.js` 301 redirect aktív; 5 audit-oldal teljes SEO/AEO optimalizálva (metaadatok, FAQPage/Service/CollectionPage/ContactPage schema, XSS-védelem).
- **7.4.0 Phase 1 QA (2026-09-18):** TSC_EXIT=0; LINT_EXIT=0; `PortalDashboard.tsx` 878 → 794 sor (`src/types/portal.ts` + `src/lib/portalConfig.ts` kiszervezve).
- **7.3.0 QA (2026-09-18):** TSC_EXIT=0; 2 commit: `39bcc5c` (HeroSlider) + `e227928` (asset-struktúra, 135 fájl); 46/46 törölt asset megőrizve (SHA256); 9 törött asset-hivatkozás külön migrációs ciklusra maradt.
- **Cycle 3160 QA:** TSC_EXIT=0, LINT_EXIT=0 (0 hiba, 0 figyelmeztetés), BUILD_EXIT=0, 141/141 statikus oldal. PortalNotificationBell bekötve; NotificationCenter polling archiválva; `firestore.indexes.json` bővítve (deploykor index-építés kell).
- **WCAG AA a11y QA (2026-09-21):** `useFocusTrap` 8/8 unit teszt; `scripts/audit-contrast.js` → 0 probléma / 303 fájl; 52 fájl landmark javítás; TS17001 blokkoló hiba megszüntetve.
- **7.0.0 Kék-Lila migráció (2026-09-16):** arany/amber tiltva, CTA `#075985` → `#5B21B6`, akcentus `#7C3AED` fehér szöveggel AAA; záró audit: 0 váratlan cyan-találat (riport: `_mentesek/20260916_amber-migration/_zaras-audit.txt`).

## 2. Kész / Lezárt Mérföldkövek (Legutóbbiak)
- ✅ **[7.8.0] (2026-09-30):** `PortalDashboard.tsx` 793 → 194 sor (6 új `portal/*` szekció-komponens) + Phase 2 hookok (`usePortalSession`, `usePortalData`) életbe léptetése; `usePortalData` idToken-guard bugfix.
- ✅ **[7.7.0] (2026-09-29):** Hero háttérkép-láthatóság + WCAG AA szövegvédelmi scrim; Esettanulmány #2 valós kép; „AI Prompt Platform" állítás-visszavonás.
- ✅ **[I18N] (2026-09-24):** Angol `/en` főoldal, locale-aware navigáció, JSON-LD SSOT, konverziós 404 (`not-found.tsx`).
- ✅ **[Phase 5 / Batch 1+2] (2026-09-22):** 8 fájdalompont-fókuszú landing oldal Kék-Lila v7.0-zel, zéró fix ár.
- ✅ **WCAG AA a11y kör (2026-09-21):** 52 fájl landmark, `useFocusTrap` (+8 teszt), 0 kontraszt-probléma / 303 fájl.
- ✅ **[7.6.0] (2026-09-20):** PortfolioGrid Bento & Electric Cyan (200 sor), 8/8 slug-route 0 regresszióval.
- ✅ **[7.5.0–7.5.2] (2026-09-19/20):** SEO/AEO audit, 301 redirect, TypeScript helyreállítás.
- ✅ **Cycle 3151:** Portál Dokumentum Előnéző & Széf (Document Vault & Preview Modal) integráció Luminous Glassmorphism dizájnnal.
- ✅ **Cycle 3152:** Projekt Idővonal & Gantt Chart (`ProjectTimelineGantt`), determinisztikus UTC-alapú dátumlogikával.
- ✅ **Cycle 3155:** Esettanulmányok (btshop) és portfólió adatok dinamikus bekötése E-E-A-T + high-ticket CTA elemekkel.

## 3. Aktuális Sprint (Lezárva: 7.7.0 — 2026-09-29)
- ✅ **Hero háttérkép-láthatóság:** `opacity-35 mix-blend-luminosity` → `opacity-65`, overlay `bg-slate-950/75` → `/60`, mesh `opacity-60` → `35`, új bal-oldali gradient scrim (WCAG AA megtartva).
- ✅ **Esettanulmány #2 kép:** `image: null` → `/assets/portfolio/ai-promt-hu/ai-promt-hi-banner-2.webp` (HU, EN, komponens-alapérték).
- ✅ **Állítás-visszavonás:** „Nulláról 3 hónap alatt a piac élére" eltávolítva minden élő forrásból; a 3. dia címe: „AI Prompt Platform"; a hero mockup-kártya eltávolítva (egységes `HeroDashboardMockup`).
- ✅ **Dokumentációs szinkron:** `_docs/CHANGELOG.md` `[7.7.0]`, `memory-bank/activeContext.md`, `memory-bank/progress.md`; a 7.5.2–7.7.0 munka commitolva (steril working tree).

- **Korábbi (Cycle 3160):** Portál Értesítési Rendszer (`PortalNotificationBell` bekötve, 2× onSnapshot: user_generations + vault, localStorage lastSeen badge; a 30 mp-es `NotificationCenter` polling archiválva: `_mentesek/20260916_cycle3160/`); Token Átadás verifikálva (Cycle 3154 óta: `getIdToken(true)` → `createGeneration(input, idToken)`).

## 4. Backlog / Tervezett Feladatok (Roadmap)
- ⏳ **`PortalDashboard.tsx` (793 sor) szétbontása** → `src/components/organisms/portal/*` szekciók (Rendelések, WorkflowChat, Projekt idővonal, Vault) + Phase 2 hookok (`usePortalSession`, `usePortalData`, `useStripePaymentVerification`). **Ez a KÖVETKEZŐ ATOMI LÉPÉS** (részlet: `activeContext.md` 5. pont).
- ⏳ **`next.config.js` `unoptimized: true` felülvizsgálata:** globálisan ki van kapcsolva a képoptimalizálás (eredeti indok: cPanel memóriakorlát; ma már Firebase Hosting) → a hero 2000×1000 banner nyersen megy ki, LCP-kockázat.
- ⏳ **Firestore deploy (kizárólag Norbi):** `firestore.indexes.json` + `firestore.rules` élesítése → `firebase deploy --only firestore:indexes`.
- ⏳ **Admin Felület (Középtávú):** Részletesebb KPI dashboard bővítés (Revenue, Churn rate, LTV), valamint PDF export funkciók implementálása a meglévő CSV exportok mellé.
- ⏳ **AI Eszközök:** További AI műhelyek (pl. Tartalomtervező, Versenytárs-elemző) vizuális felturbózása a "WOW-hatás" (Spring Physics) jegyében.
- ⏳ **I18N folytatása:** a `/en` főoldal elkészült (2026-09-24); az aloldak teljes fordítása hátra van.
- ⏳ **CI/CD Pipeline:** A `deploy.bat` kiváltása automatizált GitHub Actions workflow-val (Hosszútávú technikai cél).

## 5. Ismert Technikai Adósságok (Tech Debt)
Ezekhez a fájlokhoz csak célzott technikai sprint keretében szabad hozzányúlni:
- ✅ **PortalDashboard.tsx (7.8.0-ban MEGOLDVA):** a 300 soros limit megsértése megszűnt — 194 sor, 6 `src/components/organisms/portal/*` szekció-komponensre bontva; az eredeti 793 soros fájl archívumban (`_mentesek/20260929_portalSplit/PortalDashboard.tsx.793.bak`).
- ⚠️ **PortfolioGrid.tsx:** `unoptimized` flag felülvizsgálata (a `next.config.js` globális `unoptimized: true`-ja miatt jelenleg minden kép nyersen töltődik); fájlnevek slugosítása a 7.3.0-ban megtörtént.
- ⚠️ **btshop placeholder SVG-k:** még amber (`#f59e0b`) színt használnak → v7.0 szabálysértés (arany/amber tiltva).
- ⚠️ **HeroSectionNew.tsx:** 2 db `react-hooks/exhaustive-deps` warning (`SLIDES.length`) — a 0-warning QA-hoz javítandó.
- ⚠️ **HeroSlider.tsx (230 sor):** 0 helyen bekötve és a diavetítést a `HeroSectionNew.tsx` már lefedi → bekötés vs. archiválás döntés szükséges (duplikáció).
- ⚠️ **Jest konfig:** `_mentesek/**` + `e2e/**` kizárása a `testMatch`-ből, stale `Footer`/`HeroSection`/`Button` tesztek frissítése (hamis negatívok).