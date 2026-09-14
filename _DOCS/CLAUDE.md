# CLAUDE.md — WebDude Enterprise Technikai Specifikáció & Fejlesztői Protokoll
webdude.hu | Next.js & Firebase Stack | Státusz: Szigorú Produkciós (Production-Ready) Környezet

Ez a dokumentum a platform alapvető technológiai architektúráját, a szigorú fejlesztési és biztonsági irányelveket (Guardrails), valamint a Firebase-specifikus üzemeltetési protokollokat rögzíti. Bármilyen kódmódosítás vagy új funkció implementálása során ezen szabályok betartása az AI és a fejlesztők számára is KÖTELEZŐ.

## 🛠️ 1. Technológiai Stack és Architektúra

A rendszer a maximális teljesítmény, az azonnali betöltődés (SEO/CRO) és az alacsony fenntartási költségek érdekében az alábbi architektúrára épül:
*   **Keretrendszer:** Next.js (Szigorúan App Router architektúra, az `src/` könyvtárban strukturálva).
*   **Nyelv és Típusbiztonság:** TypeScript. A kódbázis kötelezően zéró-hibás állapotú, az `npx tsc --noEmit` parancsnak figyelmeztetés nélkül, 0 hibával kell lefutnia.
*   **UI/UX Vizuális Réteg:** Tailwind CSS. A platform a "WebDude Cyber-Arany" stílust és színpalettát követi. Pixelpontos, prémium esztétika az elvárás.
*   **Adatbázis, Backend & Auth:** Firebase (Firestore, Firebase Auth). A rendszer aszinkron, valós idejű adatszinkronizációt használ.
*   **Architektúrális Minta:** Szigorú "Atomic Design" elv. Az atomi komponensek (UI elemek) építik fel az organikus komponenseket (pl. `Header`, `Hero`), amelyek végül a `page.tsx` fájlokban állnak össze.

## 🚀 2. Kritikus CLI Parancsok (Fejlesztés és Build)

A kódolási és élesítési folyamatok determinisztikus végrehajtása az alábbi parancsokkal történik:
*   **Helyi Fejlesztés:** `npm run dev`.
*   **Típus- és Szintaktikai Audit:** `npx tsc --noEmit`. Kötelező futtatni minden komplexebb refaktorálás után.
*   **Lokális Produkciós Build:** `npm run build`. Szigorúan tesztelni kell a build folyamatot a deploy előtt, hogy kiszűrjük az SSR (Server-Side Rendering) hibákat.
*   **Deploy Folyamat:** A gyökérkönyvtárban található `deploy.bat` szkript végzi. Az AI ügynök önállóan nem futtathatja, csak a fejlesztő hagyhatja jóvá a végleges élesítést.

## 📦 3. Kritikus Adatstruktúrák és SSOT (Single Source of Truth) Fájlok

A projekt adminisztrációja és konfigurációja a `_docs/` könyvtárból vezérelt. Az AI köteles ezeket naprakészen tartani és referenciaként használni:
*   **`_docs/DESIGN_SYSTEM.md`:** A UI/UX és a Tailwind konvenciók (Cyber-Arany paletta) egyedüli forrása. Vizuális módosítás előtt kötelező olvasmány.
*   **`_docs/ARCHITECTURE.md`:** Az Atomic Design fa és a komponensek regisztere. Új komponens létrehozásakor frissíteni kell.
*   **`_docs/CHANGELOG.md`:** A sikeres integrációk kötelező naplója.
*   **`firebase.json` & `.firebaserc`:** A szerverkörnyezet és a hosting útválasztásainak (routing) alapkövei.

## 🏗️ 4. Fejlesztési és Biztonsági Alaptörvények (Guardrails)

A Firebase/React környezet specifikus buktatóinak elkerülése végett az alábbiak betartása kritikus:
*   **Komponens Határvonalak (Server vs. Client):** Alapértelmezésben minden komponens Server Component (a SEO és a sebesség miatt). A `"use client"` direktívát kizárólag a legkisebb szükséges "falevél" (leaf) komponensekben szabad használni, ahol interaktivitás (onClick, useState) történik. TILOS a globális page fájlokat kliens komponenssé tenni.
*   **Firebase Költség-optimalizálás (Anti-Drain Policy):** A Firestore lekérdezéseket (reads) minimalizálni kell. A végtelen ciklusba futó `useEffect` hookok, amelyek folyamatosan olvassák az adatbázist, szigorúan tiltottak. Preferálandó az egyszeri adatlekérés, hacsak a valós idejű `onSnapshot` nem kifejezetten üzleti követelmény.
*   **Környezeti Változók (API Keys):** A Firebase konfigurációs kulcsok kizárólag a `.env.local` fájlban tárolhatók és a `process.env` (kliens oldalon `NEXT_PUBLIC_...`) objektumból hívhatók meg. Kódba égetésük (hardcoding) azonnali kritikus hiba.
*   **Állapotkezelés:** Felesleges globális állapot (Redux/Context) bevezetése tilos, amíg a lokális állapot vagy a szerveroldali adatáramlás elegendő.

## ⚠️ 5. Ismert Rendszerkorlátok és Hibaelhárítási Protokoll

*   **Hydration Hibák (A leggyakoribb buktató):** Különbség a szerver által generált HTML és a kliens első renderelése között. Szigorúan ügyelni kell arra, hogy az időbélyegek (dátumok), a `window` vagy `document` objektumra hivatkozó adatok ne renderelődjenek a szerveroldalon. Megoldás: `useEffect`-ig elhalasztott renderelés vagy dinamikus importálás SSR nélkül.
*   **Aszinkron Firebase Auth:** A felhasználói állapot (user state) ellenőrzésekor a Firebase Auth aszinkron módon tölt be. Kezelni kell a "loading" (töltés alatti) állapotot, hogy elkerüljük az üres képernyők felvillanását (FOUC) vagy a hibás átirányításokat.
*   **Hidegindítás (Cold Start):** Ha a jövőben Firebase Functions kerül bevezetésre, számolni kell a hidegindítási idővel.