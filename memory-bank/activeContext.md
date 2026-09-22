# Aktuális Kontextus (WebDude OS Enterprise)

> **AI DIREKTÍVA:** Ez a fájl a rendszer "élő" memóriája. A 03-workflow.md 5. lépése alapján KÖTELEZŐ ezt a fájlt frissítened minden feladat befejezésekor, vagy mielőtt átadod a vezérlést a felhasználónak (Norbinak). Szigorúan tilos új feladatba kezdened, ha az "Aktuális Munkaterület Állapota" szekcióban hibák vagy félbehagyott fájlok vannak!

## Aktuális állapot — 2026-09-21, WCAG AA akadálymentesítés (landmark + fókuszcsapda + kontraszt) lezárva

- **Fő eredmény (2026-09-21):** teljes körű WCAG AA a11y hardening. A kiinduló állapot **egy blokkoló TypeScript hibát** tartalmazott (`HeaderNavClient.tsx` duplikált `aria-label` → TS17001, `tsc` EXIT=2).
- **Landmark (WCAG 1.3.1/4.1.2):** **52 fájl** javítva — minden oldal-szintű beágyazott `<main>` → `<div>`, mert a `PageWrapper` már biztosítja az egyetlen `<main id="main-content">` landmarkot (a skip-link célpontját). 0 párosítási hiba, 0 maradék beágyazott `<main>`.
- **Új a11y hook:** `src/hooks/useFocusTrap.ts` (fókuszcsapda + ESC + fókusz-visszaállítás + opcionális `initialFocusRef`). Unit teszt: `src/hooks/__tests__/useFocusTrap.test.tsx` → **8/8 passed**.
- **Bekötés:** `HeaderNavClient.tsx` (mobil menü – a csapda a fejléc teljes sávjára került, így a **bezáró X gomb is elérhető** billentyűzettel), `DocumentPreviewModal.tsx` (valódi `role="dialog"` + `aria-modal` + `aria-labelledby` + fókuszcsapda).
- **Kontraszt:** új audit szkript `scripts/audit-contrast.js` → **0 probléma / 303 fájl** (a javítás előtt 8 valós hiba, pl. `hover:bg-[#5B21B6]` + `text-bg-base` = 2.25:1, `bg-sky-500` + `text-white` = 2.77:1, `bg-emerald-500` + `text-white` = 2.54:1).

- **7.4.0 Phase 1 (2026-09-18):** kiszervezve `src/types/portal.ts` (Workflow, PortalUser, PortalTab) és `src/lib/portalConfig.ts` (statusConfig, categoryMap, SUPERADMIN_TOOLS). PortalDashboard: **878 → 794 sor**. Workflow.status mostantól TimelinePhaseKey (közös SSOT a Gantt-tel). QA: TSC_EXIT=0, LINT_EXIT=0. **Következő: Phase 2** — 3 hook (usePortalSession, usePortalData, useStripePaymentVerification), utána portál login smoke test.

- **QA:** `npx tsc --noEmit` TSC_EXIT=0; working tree 100%-ban tiszta (`git status --porcelain -uall` = 0 sor).
- **1. commit `39bcc5c`:** `HeroSlider.tsx` (230 sor, kliens komponens, 3 diás hero diavetítés, spring physics, useReducedMotion) + `package.json` 0.1.135 + CHANGELOG + ARCHITECTURE (Organisms regiszter bővítve). A komponens **nincs page-be bekötve**.
- **2. commit `e227928`:** 135 fájl — portfólió mappanevek slugosítása (`bor és garnéla` → `bor-es-garnela`, `szorolapok,` → `szorolapok`, `névjegyanevjegykartyak` → `nevjegykartyak`); 46 törölt asset áthelyezése SHA256-tal igazolva (0 elveszett fájl); git-rename detektálás 100% (marina-lakopark, Hu-Mago-Kft).
- **Kód-hivatkozások frissítve:** `src/data/works.ts` (9 bor-es-garnela + 1 marina-lakopark), `src/data/projects.ts` (wordpress hero → `/assets/banners/`), `src/app/szolgaltatasok/grafikai-tervezes/page.tsx` (2 OG/Twitter kép).
- **Visszaállított assetek:** `2025/01/A-25-...AI-Art-Prompt-Ideas-copy.webp` és `2025/01/image-78.webp` (`git checkout HEAD --`), mert élő kód hivatkozik rájuk.
- **Következő lépés (Norbi):** `firestore.rules` + `firestore.indexes.json` deploy, admin/portál spot-check, majd `deploy.bat` (kizárólag Norbi futtatja).
- **7.3.1 (2026-09-18) — asset-hivatkozások javítva:** mind a 9 törött `/assets/` hivatkozás rendben, audit: **0 törött / 210 hivatkozás**. `PortfolioSectionNew.tsx` archiválva (`_mentesek/20260918_asset-fix/`): halott kód + világos téma, ARCHITECTURE regiszterben jelölve. Nyitott: az A-25 kép 4 projekten azonos placeholder hero a `projects.ts`-ben; a `btshop-*-placeholder.svg` fájlok még amber színt (`#f59e0b`) használnak (v7.0 szabálysértés).

## 1. Jelenlegi Sprint / Fókusz
- **Aktív Ciklus:** **WCAG AA akadálymentesítési kör — LEZÁRVA (2026-09-21)**. A token-átadás (Cycle 3154) és a portál értesítési rendszer (Cycle 3160) szintén **készen van és verifikált** — lásd 3. pont.
- **Aktív Ciklus (korábbi):** Cycle 3157 → **TÁRGYTALAN (már lezárva Cycle 3160 / v7.1.0 alatt)**.
- **Fő célkitűzés:** a 7.6.0 (PortfolioGrid Bento & Electric Cyan) lezárása után a valós nyitott tételek: Firestore index/rules deploy (Norbi), `HeroSlider` page-be kötése, `PortalDashboard.tsx` (793 sor) szétbontása.

## 2. Aktuális Munkaterület Állapota (Git & QA)
- **TypeScript & Build:** ✅ `npx tsc --noEmit` → TSC_EXIT=0; `npm run lint -- --max-warnings 0` → LINT_EXIT=0 (a `_apply-seo.js` gyökér-stub felvéve az `eslint.config.mjs` ignores listájára); `npm run build` → exit 0, 146 statikus oldal; `node scripts/audit-contrast.js` → 0 hiba / 303 fájl; `npx jest src/hooks/__tests__/useFocusTrap.test.tsx` → 8/8.
- **Ismert, ELŐZETESEN MEGLÉVŐ teszt-bukások (NEM ehhez a körhöz tartoznak):** `src/components/organisms/__tests__/Footer.test.tsx`, `HeroSection.test.tsx`, `src/components/atoms/__tests__/Button.test.tsx` és a `_mentesek/` archív másolataik — jsdom + `motion/react` + `next/image` renderelési `AggregateError`, illetve elavult osztály-elvárások. Bizonyíték: az **érintetlen archív** másolatok ugyanígy buknak. Az `e2e/*.spec.ts` Playwright teszteket a Jest `testMatch`-e felveszi (konfig-kérdés).
- **Módosított fájlok (Git Status):** a11y kör → `src/hooks/useFocusTrap.ts` (új), `src/hooks/index.ts`, `src/hooks/__tests__/useFocusTrap.test.tsx` (új), `src/components/molecules/HeaderNavClient.tsx`, `DocumentPreviewModal.tsx`, `SocialMediaIcons.tsx`, `TimelineMilestoneItem.tsx`, `src/components/organisms/AIWorkshopCollection.tsx`, `BtshopCaseStudy.tsx`, `SuperAdminDashboard.tsx`, `src/app/kapcsolat/page.tsx`, `src/app/termekek/page.tsx`, `src/app/szolgaltatasok/add-onok/page.tsx`, `src/app/munkafolyamatok/strategist-pro/kristofka-munkafolyamat/page.tsx` + a landmark-javított 52 fájl, `eslint.config.mjs`, `scripts/audit-contrast.js` (új), `scripts/fix-nested-main-landmarks.js` (új), `_docs/CHANGELOG.md`, `_docs/ARCHITECTURE.md`.
- **Félbehagyott fájl:** nincs. A munkamenet során keletkezett 3 segédfájl (`works.ts.bak`, `PortfolioGrid.tsx.bak`, `tsc_out.txt`) Norbi engedélyével törölve.
- **Commit / Deploy:** NEM történt — kizárólag Norbi hatásköre.

## 3. Legutóbbi Elvégzett Lépések (Sync)
- **2026-09-21 — [WCAG AA a11y kör]:** 52 fájl landmark javítás (beágyazott `<main>` → `<div>`); új `useFocusTrap` hook (`initialFocusRef` támogatással) + 8 unit teszt; mobil menü és `DocumentPreviewModal` fókuszcsapda/ESC/ARIA; egységes Electric Cyan `focus-visible` gyűrűk; 8 kontraszt-hiba javítva; új kontraszt-audit szkript (0 hiba / 303 fájl); `eslint.config.mjs` — `_apply-seo.js` ignore, így a `--max-warnings 0` 0-ra jön ki; `tsc` blokkoló hiba (TS17001) javítva.
- **2026-09-20 — [7.6.0] PortfolioGrid Bento & Electric Cyan:** `PortfolioGrid.tsx` teljes átirat (200 sor, a 300-as limit alatt): Electric Cyan Luminous Glassmorphism Bento Grid, pointer-követő spotlight (`useMotionTemplate`), rugó-fizikás 3D dőlés (`useSpring`), `featured → md:col-span-2`, teljes `useReducedMotion` + `focus-visible` lefedettség. A `ProjectItem` köztes típus megszűnt. `works.ts`: mind a 8 projekt megőrizve, `featured` 5 → 2 (btshop, rimai), szövegek E/1. hangnemre. Mind a 8 `/munkak/[slug]` útvonal prerenderelve → **0 regresszió**.
- **2026-09-20 — [7.5.2] TypeScript helyreállítás:** rich `Work` interfész visszaállítva („Keep data richer"), `GeneralCaseStudy.tsx` TS1381 JSX-hiba javítva (hiányzó `{showChallenge && (` wrapper), `normalizeCategory()` type guard az admin portfólió oldalon.
- **2026-09-19 — [7.4.0 Phase 1 + 7.5.0]:** portal típusok/config kiszervezése; SEO/AEO audit (404 javítás, ár-tisztítás, JSON-LD).
- **Korábbi referenciák:** Cycle 3151 Vault & Document Preview · Cycle 3152 Gantt · **Cycle 3154 `createGeneration` token (`getIdToken(true)`)** · Cycle 3155 portfólió dinamizálás · **Cycle 3160 portál értesítések [7.1.0]**.

## 4. Nyitott Kérdések / Döntésre vár (Blockers)
- **(Norbi) Jest konfig-tisztítás (javaslat, nem blokkoló):** a `_mentesek/**` és `e2e/**` kizárása a `testMatch`-ből, illetve a stale `Footer`/`HeroSection`/`Button` tesztek frissítése — jelenleg hamis negatívot adnak minden QA futásnál (lásd 2. pont).
- **(Norbi) Firestore index-deploy:** a `firestore.indexes.json` már tartalmazza a szükséges kompozit indexeket (`user_generations`: userId ASC + createdAt DESC; `vault`: clientId ASC + createdAt DESC), de **éles deploy még nem történt**. Enélkül az értesítési `onSnapshot` lekérdezések produkcióban `failed-precondition` hibát adhatnak. Parancs: `firebase deploy --only firestore:indexes`.
- **(Norbi) `firestore.rules` deploy:** ugyancsak függőben.
- **`HeroSlider` bekötése:** a `HeroSlider.tsx` (230 sor, 7.3.0) elkészült, de **egyetlen `page.tsx`-be sincs bekötve** (ellenőrizve: 0 találat).
- **CI/CD:** a `deploy.bat` kiváltása GitHub Actions workflow-val (hosszú távú).

## 5. KÖVETKEZŐ ATOMI LÉPÉS (Next Action)
- 🎯 **Feladat:** `PortalDashboard.tsx` (jelenleg **793 sor**, sérti a 300 soros Atomic Design limitet) szétbontása al-komponensekre: Rendelések, WorkflowChat, Projekt idővonal (Gantt), Vault szekciók.
- 🛠️ **Érintett fájlok:** `src/components/organisms/PortalDashboard.tsx` → új `src/components/organisms/portal/*` szekció-komponensek; `_docs/ARCHITECTURE.md` regiszter bővítése.
- 🧪 **Várt kimenet:** Zéró TS hiba, `npm run build` EXIT=0, a portál funkcionalitás regressziómentes, és a `PortalDashboard.tsx` ≤300 sor.

> ⚠️ **JAVÍTÁS (2026-09-20):** ez a fájl korábban **sablon-placeholdereket** (`[pl. ...]`) tartalmazott, amelyek a már lezárt Cycle 3154/3160 munkát nyitott feladatként írták le — ez téves roadmap-irányt okozott. A placeholderek valós, verifikált adatokra cserélve.
