# DESIGN_SYSTEM.md — WebDude Kék-Lila v7.0

**webdude.hu | Tailwind CSS 4 · Next.js 16 · React 19 · Motion**

> Ez a dokumentum a vizuális identitás és UI konvenciók **egyedüli forrása (SSOT)**. Bármilyen vizuális módosítás vagy új komponens létrehozása előtt a megismerése és betartása KÖTELEZŐ.

---

## 1. Dizájn Alapfilozófia & Vizuális Identitás

A **WebDude Kék-Lila v7.0 (Cyber-Cyan & Violet Dark Studio)** stílus egy prémium, sötét alapú, futurisztikus digitális stúdió vizuális rendszer, amely a Cyberpunk és Soft-Premium esztétikát követi kék-lila (sky/violet) akcentusokkal.

> **v7.0 színmigrációs megjegyzés (2026-09-16):** A Cyber-Arany (#f59e0b = amber-500) paletta teljes egészében lecserélődött a kék-lila palettára. Az `amber-*` Tailwind osztályok és a `gold-*` tokenek eltávolítva, helyettük `brand-primary` / `cta-from` / `cta-to` tokenek és `sky-*` / `violet-*` paletta él. **Arany/amber használata brand akcentusként SZIGORÚAN TILOS.** CTA gombokon a szöveg KÖTELEZŐEN `text-white`.

- **SÖTÉT STÚDIÓ:** 90% sötét alap, 8% Luminous Glassmorphism / slate felület, legfeljebb 2% kék-lila brand kiemelés (CTA és hover).
- **KONTRAST & LEGIBILITY:** Kék-lila akcentusok a sötét háttéren, WCAG AA (min 4.5:1) kontrasztarány betartásával; CTA feliratokon AAA cél.
- **KÉK-LILA BRAND:** Brand akcentus színek: `#00B5F1` (cyan akcentus), `#075985` → `#5B21B6` (CTA gradiens), `#7C3AED` (akcentus, fehér szöveggel AAA).

**Szigorú Tiltólista:**

- Világos háttér fő oldalfelületként (#F8FAFC, #FFFFFF).
- Arany/amber (#f59e0b, #d97706, #fbbf24, #b45309) akcentusok brand színként — TILOS.
- Sötét szöveg (`text-slate-950`) kék-lila CTA háttéren — a fehér szöveg a kötelező.
- Élénk, telített színek (piros, zöld, narancs) használata brand akcentusként.
- Serif (talpas) betűtípusok a UI elemeken.
- Nagyméretű, túlzott drop shadow-k.
- Zsúfolt, szellőtelen elrendezések.

---

## 2. Színpaletta (Color Tokens)

### 2.1 Alap Háttérszínek (Z-tengely Hierarchia)

| Token neve    | Hex          | Tailwind class    | Használat                                       |
| ------------- | ------------ | ----------------- | ----------------------------------------------- |
| `bg-base`     | `#020617`    | `bg-[#020617]`    | (Level 0) Teljes oldal háttér, fő canvas.       |
| `bg-surface`  | `#0f172a`    | `bg-[#0f172a]`    | (Level 1) Kártyák, panelek, formok.             |
| `bg-elevated` | `#1e293b`    | `bg-[#1e293b]`    | (Level 2) Hover állapotok, dropdownok, modálok. |
| `bg-overlay`  | `#020617/60` | `bg-[#020617]/60` | Backdrop blur alapja, fókuszt elzáró réteg.     |

### 2.2 Szövegszínek (Olvashatósági Hierarchia)

| Token neve       | Hex       | Tailwind class   | WCAG Szint  | Használat                                     |
| ---------------- | --------- | ---------------- | ----------- | --------------------------------------------- |
| `text-primary`   | `#e2e8f0` | `text-[#e2e8f0]` | AAA         | Fő szövegtartalom, heading-ek.                |
| `text-secondary` | `#94a3b8` | `text-slate-400` | AA          | Alcímek, hosszú olvasmányok, meta adatok.     |
| `text-muted`     | `#64748b` | `text-slate-500` | AA (Large)  | Placeholder, disabled text, kiegészítő label. |
| `text-inverted`  | `#020617` | `text-slate-950` | AAA (8.5:1) | Tömör cián (brand-primary) háttér feliratai.  |

### 2.3 Brand Akcentus Színek (Kék-Lila)

| Token neve      | Hex       | Tailwind class                            | Használat                                                        |
| --------------- | --------- | ----------------------------------------- | ---------------------------------------------------------------- |
| `brand-primary` | `#00B5F1` | `bg-brand-primary` / `text-brand-primary` | Elsődleges CTA gombok, aktív állapotok, ikonok.                  |
| `cta-from`      | `#075985` | `from-cta-from` / `bg-cta-from`           | CTA gradiens kezdőpont (sky-800); fehér felirattal AAA (7.56:1). |
| `cta-to`        | `#5B21B6` | `to-cta-to`                               | Gradiens végpont (violet-800); fehér felirattal AAA (8.98:1).    |
| `cta-hover`     | `#6d28d9` | `hover:bg-cta-hover`                      | Hover háttér (violet-700); fehér felirattal AAA (7.1:1).         |
| `brand-glow`    | `#00B5F1` | `shadow-[0_0_40px_rgba(0, 181, 241,0.3)]` | Cián glow hatások.                                               |
| `border-color`  | `#334155` | `border-slate-700`                        | Szegélyek, keretek, elválasztók.                                 |

---

## 3. Tipográfia

**Prémium Duál Tipográfiai Rendszer (Bebas Neue + Plus Jakarta Sans):**

> **Szigorú Betűsúly és Faux-Bold Szabály (Weight Restriction & Anti-Faux-Bold):**
> A `Bebas Neue` betűtípusból **KIZÁRÓLAG a 400-as (Regular) súly létezik**. A böngésző általi szintetikus vastagítás (faux-bold / font-bold / 700) összemossa a karaktereket és az ékezeteket, ezért a `globals.css`-ben a `h1..h6` elemekre globálisan kötelező a `font-weight: 400 !important;`.
> A folyószöveghez és UI elemekhez alkalmazott **`Plus Jakarta Sans`** ezzel szemben gazdag súlykészlettel rendelkezik (`400`, `500`, `600`), így a menüpontok, gombok és szövegek tűélesen, elegánsan és valódi optikai súlyokkal jelennek meg!

- **Címsorok (H1–H6 & Display Headings):** `Bebas Neue` (Google Fonts – karakteres, magas, keskeny display betűtípus, szigorúan `font-weight: 400 !important`). All-caps megjelenés, feszes sormagasság (`line-height: 1.08` – `1.12`), kötelező `text-wrap: balance;`. Mobilon `clamp(2rem, 8vw, 2.75rem)` védelem a túllógás ellen.
  - **H1, H2 Betűköz:** `letter-spacing: 0.03em;` a tágas és elegáns olvasási élményért.
  - **H3–H6 Betűköz (Kártyacímek):** `letter-spacing: 0.06em;` (tracking-wider), megakadályozva a keskeny betűk egymásra torlódását kis méretben.
  - **Kártyacímek Kontrasztja:** Kártyákon a H3/H4 címek színe kötelezően tűéles hófehér (`text-white`) vagy nagyon világos akcentus (`text-cyan-300` / `text-purple-300`), text-shadow és blur nélkül, legalább `text-xl` vagy `text-2xl` (22–24px) méretben.
- **Folyószöveg és UI (Body/Text/UI elemek):** `Plus Jakarta Sans` (Google Fonts – modern, geometrikus neo-groteszk sans-serif, weights: `400`, `500`, `600`, `subsets: ['latin', 'latin-ext']`). Kristálytiszta olvashatóság kis méretekben (14–16px) is, töredezés és elvékonyodás nélkül.
  - **Kártyák és szekciók folyószövege:** Sötétszürke (`text-slate-400` / `text-slate-500`) helyett világosabb, tiszta `text-slate-300` szín és `font-normal` (400) súly.
- **Interaktív UI elemek (Gombok, Navigáció, Badge-ek):** `Plus Jakarta Sans` 500/600 súlyokkal a határozott, elegáns gombfeliratokért és menüpontokért, natív `-webkit-font-smoothing: antialiased` és `-moz-osx-font-smoothing: grayscale` simítással.
- **Fallback:** `system-ui`, `-apple-system`, `sans-serif`.
- **Betöltés:** `next/font/google` modulon keresztül (Zero-CLS / FOUT védelem, `--font-heading` és `--font-sans` CSS változókkal a `layout.tsx`-ben).

### 3.1 Skála és Vonalvezetés (Line Height)

| Szint   | Font család         | Tailwind               | Méret   | Betűköz (Tracking) | Használat                               |
| ------- | ------------------- | ---------------------- | ------- | ------------------ | --------------------------------------- |
| Display | `Bebas Neue`        | `text-5xl md:text-7xl` | 48–72px | `0.03em`           | Hero szekciók, kritikus állítások.      |
| H1      | `Bebas Neue`        | `text-4xl md:text-5xl` | 36–48px | `0.03em`           | Oldal főcím (mobilon clamp védett).     |
| H2      | `Bebas Neue`        | `text-3xl md:text-4xl` | 30–36px | `0.03em`           | Szekció címek.                          |
| H3      | `Bebas Neue`        | `text-xl md:text-2xl`  | 22–24px | `0.06em`           | Kártya címek, kiemelt előnyök.          |
| H4      | `Bebas Neue`        | `text-lg md:text-xl`   | 18–20px | `0.06em`           | Al-kártyacímek, lépéscímek.             |
| Body L  | `Plus Jakarta Sans` | `text-lg`              | 18px    | Normal             | Bevezető szövegek (Lead paragrafus).    |
| Body    | `Plus Jakarta Sans` | `text-base`            | 16px    | Normal             | Általános folyószöveg (`text-slate-300`).|
| Small   | `Plus Jakarta Sans` | `text-sm`              | 14px    | Normal / Wide      | Form labelek, navigáció, kártya leírás. |

### 3.2 Betűvastagság és Transzformáció

- **Uppercase + Tracking Wider:** Minden badge, gombfelirat (CTA) és kategória label kötelezően `uppercase tracking-wider` osztályokat kap a kristálytiszta olvashatóságért.
- **Heading Styling:** A címsorok a Bebas Neue natív karakterkészletét használják `font-heading`, kötelezően `font-weight: 400 !important;` szabállyal, kiküszöbölve a böngésző szintetikus vastagítását. A hangsúly a méretarányon, a szellős betűközön és a tiszta kontraszton van.

---

## 4. Térközök és Layout Architektúra

**Grid System:** 1440px max-width container, 12 oszlop, 32px gutter, 96px margin.
Szigorú 8px-es bázis rácsrendszer. A `margin` és `padding` értékek nem lehetnek ad-hoc jellegűek.

### 4.1 Szekció Ritmus (Vertical Rhythm)

- **Szekciók közötti távolság:** `py-24 md:py-32` (Nagyszabású lélegzetvétel a tartalmak között).
- **Címsor és tartalom között:** `mb-12 md:mb-16`.
- **Kártyák és rácsok (Grid) közötti távolság:** `gap-6 lg:gap-8`.

### 4.2 Z-Index Skála

Kerüljük a random z-index értékeket. Szigorú hierarchia:

- `z-0`: Alap dokumentum réteg.
- `z-10`: Fix navigációs elemek, lebegő badge-ek a kártyákon.
- `z-40`: Overlay-ek, Backdrop blurok.
- `z-50`: Modálok, Pop-upok, Toast értesítések.

---

## 5. Border Radius Szabályok

| Méret  | Tailwind class | Használat                    |
| ------ | -------------- | ---------------------------- |
| 8px    | `rounded-lg`   | Kis badge-ek, címkék         |
| 16px   | `rounded-2xl`  | Input mezők, kis elemek      |
| 24px   | `rounded-3xl`  | Kártyák, konténerek, modálok |
| 9999px | `rounded-full` | Gombok (CTA)                 |

---

## 6. Lágy Árnyékok (Shadows) - Kék-Lila Elevation System

| Token neve    | CSS érték                           | Tailwind class                               | Használat                |
| ------------- | ----------------------------------- | -------------------------------------------- | ------------------------ |
| `elevation-1` | `0 4px 12px rgba(0, 181, 241,.04)`  | `shadow-[0_4px_12px_rgba(0, 181, 241,.04)]`  | Kis elemek, badge-ek     |
| `elevation-2` | `0 8px 24px rgba(0, 181, 241,.06)`  | `shadow-[0_8px_24px_rgba(0, 181, 241,.06)]`  | Kártyák, konténerek      |
| `elevation-3` | `0 18px 40px rgba(0, 181, 241,.08)` | `shadow-[0_18px_40px_rgba(0, 181, 241,.08)]` | Hover állapotok, modálok |

**Megjegyzés:** A Kék-Lila v7.0 rendszerben a három szintű elevation rendszert használjuk a térbeliség létrehozására. A régi shadow-soft, shadow-medium, shadow-large tokeneket felváltották az elevation-1, elevation-2, elevation-3 tokenek.

---

## 7. UI Komponens Stílusminták

### 7.1 Kártyák (Cards - kék-lila technika)

```typescript
<div className="
  bg-bg-surface
  border border-slate-700
  rounded-3xl
  p-8
  shadow-[0_4px_12px_rgba(0, 181, 241,.04)]
  hover:shadow-[0_8px_24px_rgba(0, 181, 241,.06)]
  hover:-translate-y-1
  transition-all duration-300
">
```

### 7.2 Konverziós Gombok (CTA)

> **Tipográfiai szabály (Gombok vs. Címsorok):** Minden CTA és UI gomb kötelezően a `Plus Jakarta Sans` (`font-sans font-semibold`) betűtípust használja a tűéles olvashatóság érdekében. A `Bebas Neue` (`font-heading font-normal`) kizárólag a `H1–H6` címsorokra vonatkozik!

```typescript
// Elsődleges (Brand) - A figyelem mágnes
// CIÁN háttér: sötét felirat (8.4:1 AAA); HOVER lila háttér: FEHÉR felirat (8.9:1 AAA)
<button className="
  bg-[#00B5F1] hover:bg-[#5B21B6]
  text-slate-950 hover:text-white font-sans font-semibold
  px-8 py-4 rounded-full
  uppercase tracking-wider text-sm
  transition-all duration-300 hover:scale-[1.02] active:scale-95
  shadow-[0_8px_24px_rgba(0, 181, 241,.3)]
">

// Másodlagos (Secondary - Outline)
<button className="
  border border-slate-700 hover:border-[#00B5F1]
  text-text-primary hover:text-[#00B5F1]
  bg-transparent font-sans font-semibold
  px-8 py-4 rounded-full
  transition-all duration-300
">

// Akcentus (violet-600, fehér szöveg — WCAG AA 5.7:1; hover violet-700: AAA 7.1:1)
<button className="
  bg-[#7C3AED] hover:bg-[#6d28d9]
  text-white font-sans font-semibold
  px-8 py-4 rounded-full
  uppercase tracking-wider text-sm
  transition-all duration-300 hover:scale-[1.02] active:scale-95
  shadow-[0_0_40px_rgba(124, 58, 237,0.3)]
">

// Konverziós Gradiens (Fő CTA - a v7.0 szabványos értékesítési gomb)
// from-cta-from (#075985) → to-cta-to (#5B21B6): FEHÉR felirat KÖTELEZŐ (7.56–8.98:1 AAA)
<button className="
  bg-linear-to-r from-cta-from to-cta-to
  hover:from-[#0369a1] hover:to-[#6d28d9]
  text-white font-sans font-semibold
  px-8 py-4 rounded-xl
  transition-all duration-300 hover:scale-[1.02] active:scale-95
  shadow-lg shadow-purple-950/50
">
```

### 7.3 Űrlapok és Validáció (Forms)

Minden inputnak rendelkeznie kell fókusz- és hibaállapottal.

```typescript
<input className="
  w-full bg-bg-surface
  border border-slate-700
  focus:border-[#00B5F1] focus:ring-1 focus:ring-[#00B5F1]
  text-text-primary placeholder:text-slate-500
  px-5 py-4 rounded-2xl
  outline-none transition-all duration-200
  aria-invalid:border-red-500 aria-invalid:ring-red-500
" />
```

---

## 8. Animációk és Mikrointerakciók

**Átmenetek:** `300ms – 500ms ease-out`
**Hover effekt:** `translateY(-4px)` és `scale(1.02)`

```typescript
// Framer Motion alapértelmezett transition objektum
const softTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 0.8,
};

// Példa egy elegáns fade-up animációra (Hero szekciókhoz)
const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: softTransition },
};
```

---

## 9. Glassmorphism (Üveg Hatás)

Csak a Hero dashboard / kiemelt előnézeti kártyákon használható:

- **Blur:** `backdrop-blur-md` vagy `backdrop-blur-lg`
- **Opacity:** `bg-[#0f172a]/90` vagy `bg-[#0f172a]/95`
- **Háttér:** Sötét overlay a sötét háttér felett

```typescript
<div className="
  backdrop-blur-md bg-bg-surface/90
  border border-slate-700
  rounded-3xl
  shadow-[0_8px_24px_rgba(0, 181, 241,.06)]
">
```

---

## 10. Ikonográfia és Képi Elemek

Ikon Készlet: lucide-react. Kifejező, vékony vonalvezetésű, skálázható vektorok. Stroke width: szigorúan 1.5 vagy 2.

Képkezelés: Minden fotónak vagy mockuponak tiszta, világos esztétikát kell tükröznie. Képek sarkai rounded-3xl (vagy éles szögek, de azt következetesen).

---

## 11. Dizájn Döntési Napló (DDR)

**DDR-001 (Sötét Téma):** A Kék-Lila v7.0 rendszer kizárólag sötét témát használ (`bg-bg-base`).

**DDR-002 (Fényhatás / glow):** Visszafogott kék-lila árnyékok támogatják a térbeliséget. A glow kizárólag brand kiemeléseknél használható.

**DDR-003 (Kontraszt):** Tömör `brand-primary` (cián) háttéren a felirat `text-slate-950` (8.5:1 AAA); a sötét kék-lila CTA gradiensen (`cta-from` → `cta-to`) és `cta-hover` háttéren a felirat KÖTELEZŐEN `text-white` (7.1–8.98:1 AAA). A kontrasztot színpáronként kell mérni: az áttetsző hátterek, gradiensek és hover állapotok külön ellenőrzést igényelnek. A sikeres build nem WCAG-tanúsítás.

**DDR-004 (Bebas Neue + Plus Jakarta Sans Prémium Duál Tipográfia — Faux-Bold Mentesség & Tűéles UI):** A projekt a határozott, modern és elegáns duál tipográfiai rendszert alkalmazza. Címsorok (H1–H6): `Bebas Neue` (szigorúan 400-as súly, faux-bold tiltása `font-weight: 400 !important;` szabállyal). Betűköz: H1–H2 esetén `0.03em`, míg a kisebb kártyacímeknél (H3–H6) szellős `0.06em` (tracking-wider). Folyószöveg és UI: `Plus Jakarta Sans` (`400`, `500`, `600`, latin + latin-ext) modern, tiszta geometrikus sans-serif, amely 14–16px méretben is tökéletesen olvasható, megszüntetve a töredezettséget és a vékonyságot. A kártyákon a folyószöveg tiszta `text-slate-300`, a kártyacímek pedig tűéles `text-white` vagy világos akcentus megjelenésűek. A betűtípusok betöltése a Next.js `next/font/google` modulján keresztül történik a `--font-heading` és `--font-sans` CSS változók segítségével.

**DDR-005 (90-8-2 Szabály):** 90% sötét alap, 8% üveg / slate felület és legfeljebb 2% kék-lila kiemelés. Szekciónként egyetlen elsődleges CTA.

---

DESIGN_SYSTEM.md v7.0 — webdude.hu | AI Agent direktíva: Ez a fájl az igazság egyedüli forrása a vizuális implementációhoz.
