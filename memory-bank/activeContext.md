# Aktuális Kontextus (WebDude OS Enterprise)

> **AI DIREKTÍVA:** Ez a fájl a rendszer "élő" memóriája. A 03-workflow.md 5. lépése alapján KÖTELEZŐ ezt a fájlt frissítened minden feladat befejezésekor, vagy mielőtt átadod a vezérlést a felhasználónak (Norbinak). Szigorúan tilos új feladatba kezdened, ha az "Aktuális Munkaterület Állapota" szekcióban hibák vagy félbehagyott fájlok vannak!

## Aktuális állapot — 2026-09-18, 7.4.0 (PortalDashboard refaktor — Phase 1 kész)

- **7.4.0 Phase 1 (2026-09-18):** kiszervezve `src/types/portal.ts` (Workflow, PortalUser, PortalTab) és `src/lib/portalConfig.ts` (statusConfig, categoryMap, SUPERADMIN_TOOLS). PortalDashboard: **878 → 794 sor**. Workflow.status mostantól TimelinePhaseKey (közös SSOT a Gantt-tel). QA: TSC_EXIT=0, LINT_EXIT=0. **Következő: Phase 2** — 3 hook (usePortalSession, usePortalData, useStripePaymentVerification), utána portál login smoke test.

- **QA:** `npx tsc --noEmit` TSC_EXIT=0; working tree 100%-ban tiszta (`git status --porcelain -uall` = 0 sor).
- **1. commit `39bcc5c`:** `HeroSlider.tsx` (230 sor, kliens komponens, 3 diás hero diavetítés, spring physics, useReducedMotion) + `package.json` 0.1.135 + CHANGELOG + ARCHITECTURE (Organisms regiszter bővítve). A komponens **nincs page-be bekötve**.
- **2. commit `e227928`:** 135 fájl — portfólió mappanevek slugosítása (`bor és garnéla` → `bor-es-garnela`, `szorolapok,` → `szorolapok`, `névjegyanevjegykartyak` → `nevjegykartyak`); 46 törölt asset áthelyezése SHA256-tal igazolva (0 elveszett fájl); git-rename detektálás 100% (marina-lakopark, Hu-Mago-Kft).
- **Kód-hivatkozások frissítve:** `src/data/works.ts` (9 bor-es-garnela + 1 marina-lakopark), `src/data/projects.ts` (wordpress hero → `/assets/banners/`), `src/app/szolgaltatasok/grafikai-tervezes/page.tsx` (2 OG/Twitter kép).
- **Visszaállított assetek:** `2025/01/A-25-...AI-Art-Prompt-Ideas-copy.webp` és `2025/01/image-78.webp` (`git checkout HEAD --`), mert élő kód hivatkozik rájuk.
- **Következő lépés (Norbi):** `firestore.rules` + `firestore.indexes.json` deploy, admin/portál spot-check, majd `deploy.bat` (kizárólag Norbi futtatja).
- **7.3.1 (2026-09-18) — asset-hivatkozások javítva:** mind a 9 törött `/assets/` hivatkozás rendben, audit: **0 törött / 210 hivatkozás**. `PortfolioSectionNew.tsx` archiválva (`_mentesek/20260918_asset-fix/`): halott kód + világos téma, ARCHITECTURE regiszterben jelölve. Nyitott: az A-25 kép 4 projekten azonos placeholder hero a `projects.ts`-ben; a `btshop-*-placeholder.svg` fájlok még amber színt (`#f59e0b`) használnak (v7.0 szabálysértés).

## Korábbi sablon (nem aktuális állapot)


## 1. Jelenlegi Sprint / Fókusz
- **Aktív Ciklus:** [pl. Cycle 3200]
- **Fő célkitűzés:** [pl. A Portál Vault értesítési rendszerének (Firebase Cloud Messaging) implementálása és a generálások UI-hoz kötése][cite: 31].

## 2. Aktuális Munkaterület Állapota (Git & QA)
- **TypeScript & Build:** [pl. ✅ TSC_EXIT=0, a kód zéró-hibás állapotban van][cite: 31].
- **Módosított / Félbehagyott fájlok (Git Status):** [pl. Tiszta working tree. Nincsenek stage-olatlan, félbehagyott fájlok.][cite: 22, 31]
- *Ha itt hiba vagy félbehagyott fájl van, az AI-nak ELŐSZÖR ezt kell tisztáznia!*

## 3. Legutóbbi Elvégzett Lépések (Sync)
- YYYY-MM-DD: [pl. A `PortalDashboard.tsx` refaktorálása, Gantt chart és dokumentum előnézet sikeresen implementálva és tesztelve.][cite: 31]

## 4. Nyitott Kérdések / Döntésre vár (Blockers)
- [pl. A `createGeneration` Server Action ID token átadása még hiányzik a kliensoldali formból. Hogyan oldjuk meg a token refresh-t?][cite: 31]
- [pl. Használjunk pollingot az értesítésekhez, vagy implementáljuk a natív FCM-et?][cite: 31]

## 5. KÖVETKEZŐ ATOMI LÉPÉS (Next Action)
- 🎯 **Feladat:** [pl. A `DynamicWorkflowForm` kliens komponens frissítése, hogy a submit gomb átadja az Auth tokent a `createGeneration` hívásnak.]
- 🛠️ **Érintett fájlok:** [pl. `src/components/organisms/DynamicWorkflowForm.tsx`, `src/actions/ai.ts`]
- 🧪 **Várt kimenet:** [pl. Zéró TS hiba, és a Groq API sikeresen válaszol a frontenden.]
