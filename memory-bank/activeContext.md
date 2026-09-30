# Aktuális Kontextus (WebDude OS Enterprise)

> **AI DIREKTÍVA:** Ez a fájl a rendszer "élő" memóriája. A 03-workflow.md 5. lépése alapján KÖTELEZŐ ezt a fájlt frissítened minden feladat befejezésekor, vagy mielőtt átadod a vezérlést a felhasználónak (Norbinak). Szigorúan tilos új feladatba kezdened, ha az "Aktuális Munkaterület Állapota" szekcióban hibák vagy félbehagyott fájlok vannak!

## Aktuális állapot — 2026-09-30, essettanulmány-galéria reszponzív képek (7.11.0) lezárva

- **Fő eredmény:** a `works.ts` `gallery[]` képei is reszponzív betöltést kaptak → **78 kép a manifestumban, 468 derivatívum**. A galéria a repó legnagyobb képtömege (75 kép, 46,5 MB, átlag 621 KB) → a böngésző átlagosan **~40 KB AVIF-ot** tölt le (−94%).
- **UI:** `GeneralCaseStudy` (hero + galéria) és `ClassiCoCaseStudy` (galéria) a `ResponsiveImage` komponenst használja.
- **Talált és javított hiba:** a classi-co `gallery[]`-ben két **`.webm` videó** szerepelt, amelyek `<img>`-ként soha nem jelentek meg, és a `sharp`-et is megbuktatták. A videók a dedikált `<video>` elemeikben megmaradtak; a generátor pedig immár hibatűrő erre az esetre.
- **QA:** `npx tsc --noEmit` → TSC_EXIT=0; `npm run lint -- --max-warnings 0` → LINT_CI_EXIT=0; `npm run build` → BUILD_EXIT=0.
- **⚠️ Tárhely-megjegyzés (Norbinak):** a 468 derivatívum ≈ **18 MB**-ot ad a `public/`-hez. Ez a látogatói adatforalom szempontjából nagy nyereség, de ha a repó mérete gond, a galéria-csoport szűkíthető (pl. csak `[320, 640]`, vagy csak AVIF) a `scripts/generate-responsive-images.js` `GROUPS` definíciójában.
- **Nyitott:** a `munkak/[slug]`-hoz tartozó dedikált esettanulmány-komponensek (`BtshopCaseStudy`, `RimaiCaseStudy`, `GoBoxCaseStudy`, `LengyelHelgaCaseStudy`, `HuMagoCaseStudy`, `BorGarnelaCaseStudy`, `AiPromptCaseStudy`, `DrNagyAlbertCaseStudy`) hero/saját képei még `next/image`-t használnak — ezekhez a generátorba új forráscsoport (a komponensekben hardcode-olt `/assets/...` útvonalakból) kellene.

## Aktuális állapot — 2026-09-30, CI élesítés + reszponzív képek a kártyákon (7.10.0) lezárva

- **CI élesítve:** a `.github/workflows/ci.yml` a `main` branchre figyeltek, a projekt `master` → **a pipeline soha nem futott**. Javítva mindkét trigger, és a lint lépés most `npm run lint -- --max-warnings 0` (a 7.9.0 óta 0/0 a lint, így a szigorú kapu is átmegy — ellenőrizve: `LINT_CI_EXIT=0`).
- **Kép-optimalizálás kiterjesztve:** a `HeroBackgroundImage` speciális komponens helyett **általános `ResponsiveImage`** molekula szolgálja ki mind az 5 helyet (`HeroSectionNew`, `PortfolioGrid`, `WorkCard`, `CaseStudiesBento`, `BlogGrid`). A generátor a forrásokat most **automatikusan gyűjti** (`works.ts`, szótárak, blog frontmatter) → **16 kép, 106 derivatívum**; a manifestum `src/data/responsiveImages.ts`.
- **Előre nem látott törött kép-hivatkozás javítva (6 helyen):** `/assets/portfolio/btshop/btshop-banner.webp` nem létezik a lemezen → `btshop-banner-2.webp` lett (btshop hero, essettanulmány-oldal, portfolio-kártya, galéria, szótárak). A generátor `[WARN]` sora találta meg.
- **QA:** `npx tsc --noEmit` → TSC_EXIT=0; `npm run lint -- --max-warnings 0` → LINT_CI_EXIT=0; `npm run build` → BUILD_EXIT=0.
- **Archívum (nem törölt fájl):** `_mentesek/20260930_responsiveImages/HeroBackgroundImage.tsx.specializalt`.
- **Nyitott (Norbi):** a portfólió/essettanulmány **galéria** képei (`GeneralCaseStudy` galéria + `munkak/[slug]` hero) még nyers betöltésűek — a generátorhoz új forráscsoportként lehetne kötni (`works.ts` `gallery[]`).

## Aktuális állapot — 2026-09-30, Hero LCP statikus kép-derivatívumok (7.9.0) lezárva

- **INFRASTRUKTÚRA-ÁLLÍTÁS JAVÍTVA (a korábbi feltevés téves volt):** a hosting **NEM Firebase**. A valós deploy a `deploy.ps1` szerint: `npm run build` (standalone) → Phusion Passenger patch a `server.js`-en → Passenger wrapper (`// webdude.hu | cPanel deployment entry point`) → `.next/standalone` zippelése → `deploy-v0.1.XXX.zip` (~147 MB) → **manuális feltöltés cPanelre**. Ezért:
  - a `next.config.js` `unoptimized: true` **érvényes és szándékosan megmarad** (a futás közbeni Next.js képoptimalizálás a shared hosting memóriakorlátján OOM-ot okozna);
  - az `output: "standalone"` szükséges, nem elavult;
  - a `firebase.json` **csak a `hosting` blokkban elavult** (`"public": "out"` + `**`→`/index.html`; ilyen mappa sosem készült). A fájl a `firestore`/`storage` szabályok miatt megmarad.
- **Fő eredmény (7.9.0):** a hero háttérképek reszponzív betöltése statikus, build-time generált AVIF/WebP derivatívumokkal (`<picture>` + `srcSet` + `sizes="100vw"` + `fetchPriority="high"` az LCP dián). Mért nyereség: mobilon a 368 KB-os banner **17,7 KB (−95%)**, a 284 KB-os **36,1 KB (−87%)**. Nulla szerveroldali CPU/memóriaigény, nulla új dependency.
- **Új fájlok:** `scripts/generate-responsive-images.js` (sharp-alapú generátor, 22 derivatívumot állít elő), `src/data/heroImages.ts` (AUTO-GENERATED manifestum + `getHeroImageVariants()`), `src/components/molecules/HeroBackgroundImage.tsx` (57 sor), `public/assets/banners/responsive/*`.
- **QA:** `npx tsc --noEmit` → **TSC_EXIT=0**; `npm run lint` → **LINT_EXIT=0 (0 hiba, 0 figyelmeztetés — a projekt történetében először!)**; `npm run build` → **BUILD_EXIT=0**.
- **Nyitott (Norbi):** (1) hero vizuális ellenőrzés böngészőben (a `<picture>` lánc helyes betöltése a 3 dián); (2) a `.github/workflows/ci.yml` a **`main`** branchre figyel, a projekt viszont **`master`** → **a CI soha nem futott** (javítás: 1 sor); (3) ugyanez a kép-optimalizálás kiterjeszthető a portfólió/easettanulmány kártyákra.

## Aktuális állapot — 2026-09-30, PortalDashboard szétbontás (7.8.0) lezárva

- **Fő eredmény (2026-09-30):** a `PortalDashboard.tsx` **793 → 194 sor** (300-as limit alá került) 6 új `src/components/organisms/portal/*` szekció-komponensre bontva (PortalHeader, PortalAlerts, PortalWorkflowGrid, PortalWorkflowCard, PortalOnboardingSection, PortalOrdersSection) — mindegyik ≤300 sor. A 7.4.0/7.4.1-ben előkészített, de soha be nem kötött `usePortalSession` + `usePortalData` hookok mostantól a dashboard adatszállítói. Bugfix: a `usePortalData` adatbetöltő effectje csak érvényes `idToken` esetén indul (különben üres tokennel ment egy felesleges Firestore-hívás és hamis hibaüzenet villantott a portál betöltésekor).
- **QA:** `npx tsc --noEmit` → TSC_EXIT=0; `npm run lint` → LINT_EXIT=0 (0 hiba, 2 előre meglévő warning `HeroSectionNew.tsx`); `npm run build` → BUILD_EXIT=0.
- **Dokumentáció:** `_DOCS/CHANGELOG.md` `[7.8.0]`, `_DOCS/ARCHITECTURE.md` (6 új organisms sor + hook-leírások), `memory-bank/progress.md`.
- **Archívum (nem törölt fájl):** `_mentesek/20260929_portalSplit/PortalDashboard.tsx.793.bak` — az eredeti 793 soros változat megőrzésre.
- **Nyitott (Norbi):** (1) `/portal` auth mögötti manuális smoke test (login, workflow betöltés, Stripe fizetés, jóváhagyás, onboarding, kézbesítés); (2) `useStripePaymentVerification` hook szándékosan nem bekötve (duplikált verifikáció miatt) — ARCHITECTURE-ban dokumentálva.

## Aktuális állapot — 2026-09-29, Hero háttérkép-láthatóság + Esettanulmány #2 kép + AI Prompt Platform állítás-visszavonás lezárva

- **Fő eredmény (2026-09-29):** a főoldali hero háttérképek jelentősen láthatóbbá téve (`opacity-65`, színvisszaállítás, `bg-slate-950/60` overlay, új bal-oldali szövegvédelmi gradient scrim a WCAG AA megtartásához); a „Nem ígéret — bizonyíték" szekció Esettanulmány #2 kártyája megkapta az `ai-promt-hi-banner-2.webp` képet (HU+EN+defaults); a hero 3. dia jobb oldali mockup-kártyája eltávolítva; a „Nulláról 3 hónap alatt a piac élére" szöveg kigyomlázva minden élő forrásból (3. dia címe: „AI Prompt Platform").
- **QA:** `npx tsc --noEmit` → TSC_EXIT=0; `npm run lint` → LINT_EXIT=0 (0 hiba, 2 előre meglévő `react-hooks/exhaustive-deps` warning `HeroSectionNew.tsx`); `npm run build` → BUILD_EXIT=0.
- **Nyitott (Norbinak):** a `CaseStudiesBento` #2 kártya címében még szerepel a „nulláról 3 hónap alatt" rész (külön kérés kell a törléséhez); manuális vizuális ellenőrzés a böngészőben (hero kontraszt + képelőnézetek).

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
- 🎯 **Feladat:** a **CI élesítése** — a `.github/workflows/ci.yml` a `main` branchre figyel, a projekt viszont `master` ágon van, így a pipeline **soha nem futott**. Két sor: (a) `branches: [ main ]` → `[ master ]`; (b) a `npm run lint` lépéshez `--max-warnings 0` hozzáadása — a 7.9.0 óta a projekt **0 figyelmeztetéssel** is átmegy, így ez a kapu is működőképes lesz.
- 🛠️ **Érintett fájlok:** `.github/workflows/ci.yml`.
- 🧪 **Várt kimenet:** a `master`-re pusholáskor lefut a TypeScript + ESLint (0/0) + build ellenőrzés.
- 📌 **Alternatíva / párhuzamos tételek:**
  - **Képderivatívumok kiterjesztése** ugyanezzel a mintával a portfólió- és essettanulmány-kártyákra (`PortfolioGrid`, `WorkCard`, `CaseStudiesBento`, `BlogGrid`) — a jelenlegi `unoptimized: true` mellett ezek is nyers, teljes méretű képeket szolgálnak ki.
  - `HeroSlider.tsx` archiválási döntés (duplikálja a `HeroSectionNew` diavetítését, 0 helyen bekötve).
  - Jest konfig-tisztítás (`_mentesek/**` + `e2e/**` kizárása a `testMatch`-ből).

> ⚠️ **JAVÍTÁS (2026-09-20):** ez a fájl korábban **sablon-placeholdereket** (`[pl. ...]`) tartalmazott, amelyek a már lezárt Cycle 3154/3160 munkát nyitott feladatként írták le — ez téves roadmap-irányt okozott. A placeholderek valós, verifikált adatokra cserélve.
