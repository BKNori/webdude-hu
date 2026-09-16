# Aktuális Kontextus (WebDude OS Enterprise)

> **AI DIREKTÍVA:** Ez a fájl a rendszer "élő" memóriája. A 03-workflow.md 5. lépése alapján KÖTELEZŐ ezt a fájlt frissítened minden feladat befejezésekor, vagy mielőtt átadod a vezérlést a felhasználónak (Norbinak). Szigorúan tilos új feladatba kezdened, ha az "Aktuális Munkaterület Állapota" szekcióban hibák vagy félbehagyott fájlok vannak!

## Aktuális állapot — 2026-09-16, 7.2.0 (Admin fix sprint)

- **QA:** TSC_EXIT=0; LINT_EXIT=0; BUILD_EXIT=0, 142/142 statikus oldal.
- **Statisztikák 404:** menü → `/admin/dashboard`; `src/app/admin/analytics/page.tsx` redirect elkészült.
- **Email sablonok:** `email-templates.ts` Admin SDK-ra átírva (`requireSuperadmin`); editor idTokent ad át minden műveletnek; `firestore.rules` email_templates tiltó blokk kiegészítve — **rules deploy szükséges**.
- **Portal Kezelő:** `updateClientToolsAction` (targetUid/allowedTools/hasPromptAccess, Admin SDK, hello@webdude.hu); kinyitható jogosultság-panel 9 AI modullal a Regisztrált Klienseknél; `listUsersAction` mostantól allowedTools + hasPromptAccess mezőket is visszaad.
- Következő lépés: Norbi `firestore.rules` deploy, admin spot-check, commit + deploy.bat.

- **Végső ellenőrzött eredmény:** TSC_EXIT=0; LINT_EXIT=0 (0 hiba / 0 figyelmeztetés); BUILD_EXIT=0, 141/141 statikus oldal.
- **Cycle 3160:** `PortalNotificationBell` bekötve a `PortalDashboard` fejlécébe; `NotificationCenter.tsx` (30 mp polling) archiválva: `_mentesek/20260916_cycle3160/`; `usePortalNotifications` átírva `onAuthStateChanged` + cleanup logikára; badge Kék-Lila v7.0 (`bg-[#5B21B6]` + `text-white`, AAA); `firestore.indexes.json` bővítve (user_generations, vault) — deploykor index-építés kell.
- **Token-lánc:** Cycle 3154 óta kész (`getIdToken(true)` → `createGeneration`), verifikálva, új kód nem kellett.
- Szinkron: CHANGELOG [7.1.0], ARCHITECTURE regiszter frissítve.
- Következő lépés: Norbi manuális spot-check (harang badge portálon bejelentkezve), Firestore-indexek deployja, kézi commit + deploy.bat.

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