# 02 – TECHNOLÓGIAI STACK ÉS KORLÁTOK (WebDude OS Enterprise)

Ez a dokumentum határozza meg a projekt kódolási és technológiai alapelveit. Az itt leírtaktól eltérni SZIGORÚAN TILOS.

## 1. NEXT.JS 16 & ARCHITEKTÚRA
- **App Router Kizárólagosság:** Csak az `src/app/` könyvtárat használjuk. A Pages Router használata azonnali kritikus hiba[cite: 19, 28].
- **Server-First Elv:** Minden komponens alapértelmezetten React Server Component (RSC). A `use client` direktívát KIZÁRÓLAG a legkisebb, falevél (leaf) szintű komponensekben szabad használni (pl. gombok, űrlapok, interaktív widgetek)[cite: 15, 19, 36].
- **Hydration Hiba Védelem:** A `window`, `document` objektumok, illetve az időbélyegek (dátum formázások) SSR (Server-Side Rendering) alatti hivatkozása tilos! Interaktív vagy böngésző-függő elemeket `useEffect`-be kell szervezni, vagy a `next/dynamic` (`ssr: false`) funkcióval kell betölteni[cite: 13, 19].

## 2. TYPESCRIPT & VALIDÁCIÓ
- **Szigorú Típusosság:** `strict: true`. Az `any` típus használata szigorúan tiltott. Minden adatszerkezetet pontos interfésszel (vagy típussal) kell leírni[cite: 11, 15].
- **Zéró TS Hiba:** A kódnak hiba és figyelmeztetés nélkül át kell mennie az `npx tsc --noEmit` teszten[cite: 19, 24].
- **Zod Validáció:** Minden Server Action bemenetét és űrlap adatot `Zod` sémával (schema) KELL validálni a feldolgozás előtt[cite: 12, 15]. 

## 3. DESIGN RENDSZER (TAILWIND v4 & UI)
- **SSOT Irányelv:** A pontos színkódokat (Electric Cyan vagy Cyber-Arany) KIZÁRÓLAG a `_docs/DESIGN_SYSTEM.md` határozza meg. Hardkódolt hexadecimális értékek (pl. `bg-[#020617]`) helyett a Tailwind v4 design tokeneket (pl. `bg-bg-base`, `text-text-primary`) KELL használni[cite: 12, 16, 21].
- **A 90-8-2 Vizuális Szabály:** 90% mélysötét háttér, 8% Luminous Glassmorphism (`backdrop-blur-xl`), és szigorúan maximum 2% kiemelő brand szín az akciógombokon (CTA) és hover effekteken[cite: 12, 27].
- **Animációk (Motion):** A `motion/react` animációkat kizárólag izolált, `"use client"` direktívával ellátott fájlokban szabad implementálni. Használd a `useReducedMotion` hookot az akadálymentesítés érdekében[cite: 15, 27].

## 4. FIREBASE & BACKEND (KÖLTSÉGVÉDELEM)
- **Anti-Drain Policy:** A Firestore lekérdezéseket (reads) drasztikusan minimalizálni kell. A végtelen ciklust okozó `useEffect` hookok szigorúan tiltottak. Valós idejű `onSnapshot` helyett preferáld a szerveroldali egyszeri lekéréseket (`getDoc`), az ISR cache-t (`revalidate: 3600`), vagy a késleltetett pollingot[cite: 13, 19, 20].
- **Zero-Prompt Policy:** Biztonsági okokból a frontend kódból szigorúan tilos közvetlenül lekérdezni a szenzitív (pl. `private_prompts`, `users`) Firestore kollekciókat. Ezek kizárólag Server Action-ökből, a Firebase Admin SDK használatával érhetők el.
- **API Kulcsok:** Minden kulcsot kizárólag a `.env.local` fájlban tárolunk. Kódba égetésük azonnali kritikus hiba[cite: 19, 20].

## 5. AEO / SEO & TARTALOM
- **Metaadatok (Metadata):** Minden publikus útvonalon (`page.tsx`) kötelező a statikus vagy dinamikus (`generateMetadata`) metadata export (Title, Description, Canonical URL) a Server Component szintjén[cite: 15, 23]. Kliens komponensből tilos metadatát exportálni!
- **JSON-LD Sémák:** Minden oldal SEO optimalizálásához használd a megfelelő strukturált adatot (LocalBusiness, Person, Service, Product, FAQPage) a `layout.tsx` vagy `page.tsx` fájlokban. KÖTELEZŐ az XSS védelem alkalmazása: `.replace(/</g, '\\u003c')`[cite: 15, 23].
- **Konverziós Fókusz:** Termékeken és AI Műhelyeken fix árak helyett kizárólag exkluzív „Egyedi árajánlat kérése” CTA gombokat alkalmazz[cite: 11, 31].

## 6. KOMPONENS MÉRET ÉS KÓDMINŐSÉG
- **Atomic Design:** Minden elemet az atomok -> molekulák -> organizmusok hierarchiája szerint építs fel[cite: 19, 25].
- **Maximum 300 sor:** Egyetlen komponens sem haladhatja meg a ~300 sort. Ha ennél komplexebb, bontsd szét logikai al-komponensekre[cite: 11, 39].