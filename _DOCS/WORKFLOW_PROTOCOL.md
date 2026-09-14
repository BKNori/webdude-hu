# WORKFLOW_PROTOCOL.md — WebDude Enterprise Fejlesztési Protokoll v1.0
(AI-Asszisztált Next.js & Firebase Munkafolyamat Szabályzat)

> Ez a dokumentum a WebDude.hu projekt hivatalos fejlesztési, tesztelési és élesítési protokollja. Célja a zéró-hibás kódbázis fenntartása, az AI ügynökök determinisztikus irányítása és az automatizált adminisztráció garantálása.

---

## 🔄 1. Az AI-Fejlesztő Együttműködési Ciklus (A "WebDude Loop")

Minden új funkció, hibajavítás vagy refaktorálás szigorúan az alábbi 5 lépéses fázisban történhet. Az AI ügynök nem ugorhat át lépéseket.

### Fázis 1: Konzisztencia Audit (Deep Read)
*   **Aktivitás:** Mielőtt az AI egyetlen sort is kódolna, köteles elolvasni a kéréshez kapcsolódó meglévő fájlokat, valamint referenciaként használni az SSOT (Single Source of Truth) dokumentumokat (`_docs/ARCHITECTURE.md`, `_docs/DESIGN_SYSTEM.md`).
*   **Cél:** A spagettikód és a duplikált atomi/organikus komponensek megelőzése.

### Fázis 2: Tervezés és Jóváhagyás
*   **Aktivitás:** Komplexebb logika (pl. új Firebase kollekció, Server Action bevezetése, globális layout módosítás) esetén az AI először egy rövid vázlatot/tervet ad a fejlesztőnek.
*   **Szabály:** Csak a megbízó (Norbi) jóváhagyása után kezdődhet meg a kódgenerálás.

### Fázis 3: Atomi Kódolás (Atomic Implementation)
*   **Aktivitás:** A kódírás. Az AI soha nem adhat vissza csonkított kódot (`// ... a többi változatlan`). A teljes, futtatható kódfájlt kell prezentálnia.
*   **Fókusz:** Strict TypeScript, Tailwind v4 optimalizáció, Server Component elsőbbség.

### Fázis 4: Lokális Validáció (QA)
*   **Aktivitás:** A kód beillesztése után kötelező a lokális ellenőrzés.
*   **Parancsok:** 
    1. `npx tsc --noEmit` (Zéró TypeScript hiba elvárás)
    2. `npm run lint` (ESLint hibák kiszűrése)
    3. `npm run build` (Szerveroldali renderelési és Hydration hibák szűrése)

### Fázis 5: Naplózás és Szinkronizáció
*   **Aktivitás:** Sikeres validáció után az AI javaslatot tesz a `_docs/` mappa frissítésére (lásd 2. pont).

---

## 📝 2. Automatizált Dokumentációs Protokoll

A magas minőségű projektvezetés alapja a naprakész dokumentáció. Az AI ügynök az alábbi szabályok szerint köteles karbantartani a `_docs/` mappát:

*   **`CHANGELOG.md`:** Minden logikai mérföldkő, sikeres új funkció vagy kritikus hibajavítás után azonnal frissíteni kell. Formátum: Dátum, Modul megnevezése, Változás leírása.
*   **`ARCHITECTURE.md`:** Ha új UI komponens jön létre (Atoms, Molecules, Organisms), vagy új `page.tsx` útvonal (Route) készül, az AI felvezeti a komponens-regiszterbe.
*   **`DESIGN_SYSTEM.md`:** Ha új, többször használatos szín, animációs görbe (Framer Motion) vagy tipográfiai elem kerül jóváhagyásra, azt itt rögzíteni kell.

---

## 🚀 3. Deployment (Élesítési) Protokoll

A cPanelről Firebase Hostingra való átállás miatt az élesítés folyamata drasztikusan leegyszerűsödött, de szigorúbb előtesztelést igényel.

### A "Pre-Flight" Ellenőrzőlista (AI és Fejlesztő közös feladata)
Mielőtt a fejlesztő lefuttatná a `deploy.bat` fájlt, az alábbiaknak teljesülniük kell:
1.  **Nincs `console.log`:** A produkciós kódból minden debug log eltávolítva.
2.  **Környezeti változók:** Minden szükséges Firebase kulcs szerepel a produkciós `.env` környezetben.
3.  **Build sikeres:** Az `npm run build` lefutott hiba nélkül (nincs Route konfliktus vagy hiányzó statikus asset).
4.  **SEO/AEO csekk:** A főbb oldalak `metadata` objektumai be vannak állítva.

### Az Élesítés Lépése
*   **Kizárólag a fejlesztő végzi** a gyökérkönyvtárban található `deploy.bat` parancsfájl futtatásával. Az AI ügynök soha nem kezdeményezhet önálló deploy műveletet.

---

## 🚨 4. Incident Response (Hibaelhárítási Protokoll)

Next.js és Firebase környezetben a leggyakoribb kritikus hibák kezelése:

*   **Hydration Error (Kliens vs. Szerver DOM eltérés):** 
    *   *Tünet:* A UI szétesik vagy villan egyet betöltéskor, a konzolban Hydration hiba látható.
    *   *Megoldás:* Az AI azonnal ellenőrzi az aszinkron adatokat, a dátumformázásokat, és a harmadik féltől származó script-eket. Ha szükséges, bevezeti a `next/dynamic` ssr: false beállítást, vagy `useEffect`-be szervezi a kliens-specifikus renderelést.
*   **Firebase Quota / Read Spike (Költségtúllépés veszély):**
    *   *Tünet:* Váratlanul magas adatbázis-olvasás (Firestore reads).
    *   *Megoldás:* Az AI auditálja a `useEffect` hookokat végtelen ciklusok (dependency array hibák) után kutatva, és megszünteti a felesleges `onSnapshot` listenereket.

---
*Dokumentum karbantartója: Norbi (WebDude) | AI Agent direktíva: KÖTELEZŐ ÉRVÉNYŰ*