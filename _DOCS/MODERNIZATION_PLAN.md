# MODERNIZATION_PLAN.md — WebDude Modernizációs és Átállási Terv
**webdude.hu | Next.js 16.x · React 19 · motion/react · Tailwind CSS 4**

Ez a dokumentum a senior szakértői audit alapján szigorított irányelveket és a meglévő aloldalak refaktorálási ütemtervét rögzíti.

---

## 1. Szigorított Technológiai Irányelvek

### 1.1 WebGL ShaderBackground Halasztása & CSS Alternatíva
- **Probléma:** A WebGL/Three.js-alapú `ShaderBackground.js` növeli a TTI (Time to Interactive) mutatót, rontja a mobil LCP (Largest Contentful Paint) értéket és hidratációs hibákhoz vezethet.
- **Döntés:** A WebGL hátteret ideiglenesen eltávolítjuk a főoldalról.
- **Megoldás:** Helyette egy rendkívül elegáns, performáns, tiszta CSS `@keyframes` alapú háttér-glow animációt és egy SVG rácshálót (mesh grid) vezetünk be.
  - A stílusokat a [globals.css](file:///c:/CLI-PROJECTS/webdude-hu/src/app/globals.css) fájlban definiáljuk.
  - A háttérelemeket közvetlenül a [layout.tsx](file:///c:/CLI-PROJECTS/webdude-hu/src/app/layout.tsx) body szintjén rendereljük, így globálisan és azonnal (SSR/SEO kompatibilis módon) megjelennek.

### 1.2 RSC Component Boundary & Animációs Határok (motion/react)
- **Csomag:** A Framer Motion v12+ használatával az importokat átállítjuk a hivatalos `"motion/react"` csomagra.
- **Szerveroldali prioritás:** A `Header.tsx` és `Footer.tsx` (organisms), valamint az összes aloldal (`page.tsx`) szigorúan tiszta **React Server Component (RSC)** marad.
- **Kliens-szerver határvonal:** Az interaktív állapotokat (pl. menü megnyitás, dropdown) és az animációkat kizárólag a legkisebb interaktív levelű (leaf) **Molecule** vagy **Atom** komponensekbe zárjuk (pl. `MobileMenuClient.tsx`, `AnimatedCard.tsx`).
- **Natív CSS előnyben részesítése:** Ahol nem szükséges komplex fizikai szimuláció (pl. görgetés-alapú beúszások), ott a JavaScript-alapú hookok helyett natív CSS `view-timeline` és `scroll-driven` animációkat alkalmazunk.

### 1.3 UI Primitívek (Radix & shadcn/ui)
- Nem telepítünk redundáns, különálló Radix csomagokat. Minden Radix-alapú funkciót a már meglévő `shadcn/ui` struktúrán és konfiguráción keresztül vezetünk be.

---

## 2. Aloldalak Tartalmi és Szerkezeti Auditja

Jelenleg az `src/app/` könyvtárban található aloldalak auditja:

| Oldal / Útvonal | Jelenlegi fájlformátum | Kliens/Szerver státusz | Főbb észrevételek, javítandó pontok |
|---|---|---|---|
| **Hírek** `/hirek` | [page.js](file:///c:/CLI-PROJECTS/webdude-hu/src/app/hirek/page.js) | `"use client"` (Kliens) | Teljes oldal kliensként fut a kártyák elrendezése és a Framer Motion miatt. RSC-vé kell alakítani, az animált rácsot pedig ki kell szervezni egy `BlogGrid.tsx` kliens molekulába. |
| **Hír cikk** `/hirek/[slug]` | [page.js](file:///c:/CLI-PROJECTS/webdude-hu/src/app/hirek/[slug]/page.js) | Server (RSC) | Jó szerkezet, statikus paraméter-generálással és React 19 kompatibilis Promise-alapú paraméter-kezeléssel. Átnevezendő `page.tsx`-re strict típusokkal. |
| **Kapcsolat** `/kapcsolat` | [page.js](file:///c:/CLI-PROJECTS/webdude-hu/src/app/kapcsolat/page.js) | Server (RSC) | A `Hero` használata miatt átmenetileg jól működik, de a kapcsolati form jelenleg nem működik és nem validál. A formot ki kell szervezni egy `ContactForm.tsx` (React Hook Form + Zod) kliens molekulába. |
| **Munkák** `/munkak` | [page.js](file:///c:/CLI-PROJECTS/webdude-hu/src/app/munkak/page.js) | Server (RSC) | A [PortfolioGrid.js](file:///c:/CLI-PROJECTS/webdude-hu/src/components/PortfolioGrid.js) kliens komponenst használja. A lapot `.tsx`-re konvertáljuk, a rácsot átírjuk `"motion/react"` alapra. |
| **Munka cikk** `/munkak/[slug]` | [page.js](file:///c:/CLI-PROJECTS/webdude-hu/src/app/munkak/[slug]/page.js) | Server (RSC) | Jó felépítésű esettanulmány oldal. A benne lévő videós mockupokat tiszta CSS-szel kell formázni, a lapot pedig `.tsx`-re írni. |
| **Rólam** `/szia-norbi-vagyok` | [page.js](file:///c:/CLI-PROJECTS/webdude-hu/src/app/szia-norbi-vagyok/page.js) | `"use client"` (Kliens) | Hibásan teljes kliensként fut. Át kell alakítani RSC-vé, a statisztikák beúszását és a [Timeline.js](file:///c:/CLI-PROJECTS/webdude-hu/src/components/Timeline.js) idővonalat külön-külön animált klienskomponensekbe szervezve. |
| **Szolgáltatások** `/szolgaltatasok` | [page.js](file:///c:/CLI-PROJECTS/webdude-hu/src/app/szolgaltatasok/page.js) | `"use client"` (Kliens) | Kliensoldali a `ServiceCard` animációk miatt. Átállítjuk RSC-vé, a kártyákat egyéni animált csomagolással látjuk el. |
| **Egyedi Szolgáltatások** `/szolgaltatasok/[slug]` (6 db aloldal) | [page.js](file:///c:/CLI-PROJECTS/webdude-hu/src/app/szolgaltatasok/wordpress-webshop-keszites/page.js) stb. | Server (RSC) | Statikus, SEO-optimalizált bemutató oldalak. A `Hero` komponens leváltásával és strict TypeScript típusokkal kell átírni `.tsx` formátumba őket. |

---

## 3. Refaktorálási és Átállási Ütemterv

### 3.1 Első Fázis: Globális Stílusok és RSC Keretrendszer
1. **[globals.css](file:///c:/CLI-PROJECTS/webdude-hu/src/app/globals.css) & [layout.tsx](file:///c:/CLI-PROJECTS/webdude-hu/src/app/layout.tsx):**
   - A WebGL hátteret kikapcsoljuk.
   - Bevezetjük a tiszta CSS SVG mesh grid hátteret és az animált, elmosódott Cyber-Arany és lila fénygömböket a háttérben.
2. **Organisms Tisztítás (`Header.tsx` és `Footer.tsx`):**
   - Eltávolítjuk a kliensoldali állapotokat a `Header.tsx`-ből. A mobil menüt és a dropdown-t kiszervezzük egy különálló, apró [MobileMenuClient.tsx](file:///c:/CLI-PROJECTS/webdude-hu/src/components/molecules/MobileMenuClient.tsx) klienskomponensbe.

### 3.2 Második Fázis: Egyszerűbb Aloldalak Migrációja (.js -> .tsx)
1. **Kapcsolat (`/kapcsolat`):**
   - [page.tsx](file:///c:/CLI-PROJECTS/webdude-hu/src/app/kapcsolat/page.tsx) létrehozása (RSC).
   - [ContactForm.tsx](file:///c:/CLI-PROJECTS/webdude-hu/src/components/molecules/ContactForm.tsx) (use client) integrációja React Hook Form és Zod segítségével.
2. **Hír Cikkek és Munka Cikkek (`/[slug]`):**
   - A dinamikus útvonalas oldalak átírása típusbiztos `.tsx` formátumba.

### 3.3 Harmadik Fázis: Összetett és Animált Aloldalak Refaktorálása
1. **Hírek (`/hirek`):**
   - RSC-vé alakítás, a bejegyzések listázásának és szűrésének kiszervezése a `BlogGrid.tsx` kliens molekulába, `"motion/react"` használatával.
2. **Munkák (`/munkak`):**
   - RSC-vé alakítás, a [PortfolioGrid.tsx](file:///c:/CLI-PROJECTS/webdude-hu/src/components/molecules/PortfolioGrid.tsx) refaktorálása `"motion/react"` animációval.
3. **Rólam (`/szia-norbi-vagyok`) & Szolgáltatások (`/szolgaltatasok`):**
   - Futtatás RSC-ként. A [Timeline.tsx](file:///c:/CLI-PROJECTS/webdude-hu/src/components/molecules/Timeline.tsx) és [ServiceCard.tsx](file:///c:/CLI-PROJECTS/webdude-hu/src/components/molecules/ServiceCard.tsx) átírása `"motion/react"` animált elemekre.

---

## 4. Nyomonkövetés és Jóváhagyás

Minden fázis befejeztével a tesztek futtatása (`npx tsc --noEmit` és `npm run lint`) garantálja, hogy a kódbázis megőrzi a hibátlan állapotát.
*Terv karbantartója: Norbi (WebDude) és az AI Lead Architect*
