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
    4. `npm run test:e2e` (**Lásd: 4. pont — a 3000-es port előzetes ellenőrzése kötelező!**)

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

## 🧪 4. QA és E2E Tesztelési Szabályok

A `npm run lint` / `npm run build` után a Playwright E2E tesztek (`npm run test:e2e`) önálló validációs lépést alkotnak, saját buktatókkal. A következő szabályok a 2026-10-10-es [7.20.0] sprint során felmerült hibából származnak.

### 4.1 Előfeltétel: a 3000-es portnak SZABADNAK kell lennie

*   **Szabály:** E2E tesztek (Playwright) futtatása előtt **KÖTELEZŐ** ellenőrizni, hogy a 3000-es port szabad-e. A `playwright.config.ts` `webServer` blokkja `npm run start`-tal indít egy szervert, és ha a port foglalt, a tesztek **hamisan buknak**.
*   **Tünet (hamis bukás, NEM kódhiba):**

    ```
    Error: listen EADDRINUSE: address already in use :::3000
    Error: Process from config.webServer was not able to start. Exit code: 1
    ```

*   **Oka:** Egy korábbi, beragadt `next start` vagy `npm run dev` processz továbbra is figyel a 3000-es porton (pl. a hibásan befejeződött tesztfutás, vagy a kézi szerver után felejtett terminál után). A Playwright ezt új indításként értelmezi, és a portkonfliktus miatt egyetlen teszt sem indul el.

### 4.2 Megoldás: a beragadt processz kiölése (Windows / PowerShell)

A teszt futtatása **előtt** a beragadt processzt ki kell lőni. Mivel Windows / PowerShell környezetben dolgozunk:

**Opció A — PowerShell beépített parancsokkal (ajánlott, nincs szükség csomagra):**

```powershell
# 1. Kiírja a 3000-es portot figyelő processz PID-jét
Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue |
  Select-Object -ExpandProperty OwningProcess -Unique

# 2. Leköti, és azonnal megöli a beragadt processzt
Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue |
  Select-Object -ExpandProperty OwningProcess -Unique |
  ForEach-Object { Stop-Process -Id $_ -Force }

# 3. Ellenőrzés: a kimenet 0 legyen (szabad a port)
(Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue |
  Measure-Object).Count
```

**Opció B — `npx kill-port` alternatíva (ha a Node-os megoldást preferáljuk):**

```bash
npx kill-port 3000
```

*   **UTÓENGEDES:** A kiölés után a hálózati port felszabadulásához ~2-3 másodperc szükséges; érdemes `Start-Sleep -Seconds 3` szünetet beiktatni a teszt indítása előtt, különben egy gyors újrafuttatásnál is `EADDRINUSE`-t kaphatunk.

### 4.3 NE fussunk párhuzamos buildet / tesztet

*   **Szabály:** A `npm run build` (és a `npm run test:e2e`) **szekvenciálisan**, egyszerre egyetlen példányban futtatható. Soha ne indítsunk több buildet párhuzamosan.
*   **Oka:** A `npm run build` először `npm run clean`-t futtat, ami törli a teljes `.next` mappát (beleértve a webpack cache-t). Ha a törlés egy még futó build közben történik, a következő, tiszta fordítási hiba jelenik meg:

    ```
    <w> [webpack.cache.PackFileCacheStrategy] Caching failed for pack: Error: ENOENT:
      no such file or directory, rename '.next\cache\webpack\client-production\0.pack_'
    TypeError: Cannot read properties of undefined (reading 'call')
      at Object.k [as require] (.next\server\webpack-runtime.js:1:144)
    Export encountered an error on /portal/ai-muhely/.../page
    ```

*   **Elsődleges diagnózis:** Ha `webpack-runtime.js` vagy `Cannot read properties of undefined` hibát látunk, **első kérdésünk legyen, hogy fut-e éppen egy másik build/teszt**, és csak utána kezdjük a kódot hibáztatni. Egy magányos újrafuttatás általában zöld.

---

## 🚨 5. Incident Response (Hibaelhárítási Protokoll)

Next.js és Firebase környezetben a leggyakoribb kritikus hibák kezelése:

*   **Hydration Error (Kliens vs. Szerver DOM eltérés):** 
    *   *Tünet:* A UI szétesik vagy villan egyet betöltéskor, a konzolban Hydration hiba látható.
    *   *Megoldás:* Az AI azonnal ellenőrzi az aszinkron adatokat, a dátumformázásokat, és a harmadik féltől származó script-eket. Ha szükséges, bevezeti a `next/dynamic` ssr: false beállítást, vagy `useEffect`-be szervezi a kliens-specifikus renderelést.
*   **Firebase Quota / Read Spike (Költségtúllépés veszély):**
    *   *Tünet:* Váratlanul magas adatbázis-olvasás (Firestore reads).
    *   *Megoldás:* Az AI auditálja a `useEffect` hookokat végtelen ciklusok (dependency array hibák) után kutatva, és megszünteti a felesleges `onSnapshot` listenereket.

---
*Dokumentum karbantartója: Norbi (WebDude) | AI Agent direktíva: KÖTELEZŐ ÉRVÉNYŰ*