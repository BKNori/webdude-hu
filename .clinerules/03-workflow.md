# 03 – A WEBDUDE LOOP ÉS FEJLESZTÉSI PROTOKOLL (WebDude OS Enterprise)

Minden fejlesztési feladatot, hibajavítást vagy refaktorálást szigorúan az alábbi 5 lépéses fázisban (WebDude Loop) KÖTELEZŐ végrehajtanod. Lépéseket átugorni, vagy a sorrendet megcserélni SZIGORÚAN TILOS[cite: 12, 32].

## 1. OLVASÁS ÉS AUDIT (Deep Read & Context)
- Mielőtt bármilyen kódolásba kezdenél, KÖTELEZŐEN olvasd be az érintett fájlokat, a `memory-bank/` teljes tartalmát, és a `_docs/` SSOT fájlokat (`ARCHITECTURE.md`, `DESIGN_SYSTEM.md`, `WORKFLOW_PROTOCOL.md`)[cite: 12, 33, 41].
- Ha ellentmondást találsz a meglévő kód és a dokumentáció között, azonnal jelezd (lásd 01-general.md Hierarchia), és kérj megerősítést[cite: 33]. Ne találgass!

## 2. TERVEZÉS ÉS ARCHITEKTÚRA (Plan Phase)
- Írd le röviden (2–4 mondatban) a tervezett megoldást a kódolás ELŐTT[cite: 12].
- Határozd meg:
  - RSC (Server Component) vagy Client Component lesz?[cite: 12]
  - Szükséges-e Firestore séma vagy `firestore.rules` módosítás?[cite: 12]
  - Vannak-e biztonsági kockázatok (Zero-Prompt Policy)?
- Ha a feladat több logikai lépésből áll (pl. új oldal + új adatbázis tábla), javasolj "Plan" módot, és csak jóváhagyás után válts "Act" módba[cite: 12].

## 3. KÓDOLÁS (Atomi Megvalósítás & Zéró Csonkítás)
- **Zéró Csonkítás:** Mindig a **TELJES, futtatható kódfájlt** írd ki! A `// ... a többi változatlan` vagy hasonló rövidítések használata azonnali kritikus hiba.
- **Atomic Design:** Max ~300 soros fájlok. Tartsd be a könyvtárstruktúrát (`atoms/`, `molecules/`, `organisms/`)[cite: 16, 21].
- **Kódolás (UTF-8):** Minden fájl szigorúan UTF-8 kódolású legyen (magyar ékezetek miatt). 

## 4. KÖTELEZŐ VALIDÁLÁS ÉS QA (Pre-Flight Check)
Egyetlen iterációt sem jelenthetsz késznek anélkül, hogy az alábbiakat lefuttatnád a terminálban[cite: 12, 13, 20]:
1. `npx tsc --noEmit` (Zéró TypeScript hiba kötelező!)
2. `npm run lint` (ESLint figyelmeztetések javítása, pl. Tailwind v4 class-ok)
3. `npm run build` (Statikus oldalak hiba nélküli renderelése)
- Ha a teszt elbukik: Javítsd a hibát, és futtasd újra. Soha ne add át a hibás állapotot "majd te javítod" felkiáltással[cite: 12]!

## 5. DOKUMENTÁLÁS ÉS NAPLÓZÁS (Sync Phase)
Sikeres build után kötelezően javaslatot kell tenned az adminisztrációra[cite: 12, 33]:
- `_docs/CHANGELOG.md`: Rövid, dátumozott, verziózott bejegyzés (pl. `[6.1.0] - Új funkció`).
- `_docs/ARCHITECTURE.md`: Új komponens (Organism, Page) vagy Route regisztrálása.
- `memory-bank/` fájlok frissítése az aktuális kontextussal.

## 6. ÉLESÍTÉS (Deployment)
- **TILTOTT MŰVELET:** Az AI ügynök SOHA nem kezdeményezhet élesítést (deploy) vagy futtathatja a `deploy.bat` / `deploy.ps1` fájlokat. Ez kizárólag a fejlesztő (Norbi) hatásköre!