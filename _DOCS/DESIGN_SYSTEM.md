# DESIGN_SYSTEM.md — WebDude Electric Cyan v5.0

**webdude.hu | Tailwind CSS 4 · Next.js 16 · React 19 · Motion**

> Ez a dokumentum a vizuális identitás és UI konvenciók **egyedüli forrása (SSOT)**. Bármilyen vizuális módosítás vagy új komponens létrehozása előtt a megismerése és betartása KÖTELEZŐ.

---

## 1. Dizájn Alapfilozófia & Vizuális Identitás

A **„Electric Cyan 2026"** stílus egy prémium, sötét alapú, futurisztikus digitális stúdió vizuális rendszer, amely a Cyberpunk és High-Tech esztétikát követi elegáns cyan akcentusokkal.

- **SÖTÉT STÚDIÓ:** 90% sötét alap (#020617, #0f172a), 8% cyan akcentus (#00B5F1), 2% kiemelés (#e2e8f0).
- **KONTRAST & LEGIBILITY:** Fényes cyan akcentusok a sötét háttéren, maximális olvashatóság.
- **ELECTRIC CYAN:** Brand akcentus szín (#00B5F1, #0095C7) a modern, technológiai identitásért.

**Szigorú Tiltólista:**

- Világos háttér fő oldalfelületként (#F8FAFC, #FFFFFF).
- Arany (#f59e0b, amber-500) vagy narancs (#FF7A00) akcentusok a brand szín helyett.
- Élénk, telített színek (piros, zöld, lila) használata brand akcentusként.
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

| Token neve       | Hex       | Tailwind class   | WCAG Szint | Használat                                     |
| ---------------- | --------- | ---------------- | ---------- | --------------------------------------------- |
| `text-primary`   | `#e2e8f0` | `text-[#e2e8f0]` | AAA        | Fő szövegtartalom, heading-ek.                |
| `text-secondary` | `#94a3b8` | `text-slate-400` | AA         | Alcímek, hosszú olvasmányok, meta adatok.     |
| `text-muted`     | `#64748b` | `text-slate-500` | AA (Large) | Placeholder, disabled text, kiegészítő label. |
| `text-inverted`  | `#FFFFFF` | `text-white`     | AAA        | Primary gombokon belüli feliratok.            |

### 2.3 Brand Akcentus Színek (Electric Cyan)

| Token neve     | Hex       | Tailwind class                          | Használat                                       |
| -------------- | --------- | --------------------------------------- | ----------------------------------------------- |
| `brand`        | `#00B5F1` | `text-[#00B5F1]` / `bg-[#00B5F1]`       | Elsődleges CTA gombok, aktív állapotok, ikonok. |
| `brand-hover`  | `#0095C7` | `bg-[#0095C7]`                          | Interaktív brand elemek hover állapota.         |
| `brand-glow`   | `#00B5F1` | `shadow-[0_0_40px_rgba(0,181,241,0.3)]` | Cyan glow hatások.                              |
| `border-color` | `#334155` | `border-slate-700`                      | Szegélyek, keretek, elválasztók.                |

---

## 3. Tipográfia

**Címsorok (Headings):** Space Grotesk (Google Fonts – sans-serif, Font weight: 700)
**Folyószöveg / UI (Body/UI):** Inter (Google Fonts – sans-serif, Font weight: 400, 500, 600)
Fallback: system-ui, -apple-system, sans-serif
Betöltés: next/font/google modulon keresztül (FOUT/CLS elkerülése végett)

### 3.1 Skála és Vonalvezetés (Line Height)

| Szint   | Tailwind               | Méret   | Vonalvezetés (Line Height) | Használat                               |
| ------- | ---------------------- | ------- | -------------------------- | --------------------------------------- |
| Display | `text-5xl md:text-7xl` | 48–72px | `leading-tight`            | Hero szekciók, kritikus állítások.      |
| H1      | `text-4xl md:text-5xl` | 36–48px | `leading-tight`            | Oldal főcím.                            |
| H2      | `text-3xl`             | 30px    | `leading-snug`             | Szekció címek.                          |
| H3      | `text-2xl`             | 24px    | `leading-snug`             | Kártya címek, kiemelt előnyök.          |
| Body L  | `text-lg`              | 18px    | `leading-relaxed`          | Bevezető szövegek (Lead paragrafus).    |
| Body    | `text-base`            | 16px    | `leading-relaxed`          | Általános folyószöveg.                  |
| Small   | `text-sm`              | 14px    | `leading-normal`           | Form labelek, navigációs menük, gombok. |

### 3.2 Betűvastagság és Transzformáció

- **Uppercase + Tracking Wider:** Minden badge, gombfelirat (CTA) és felső label (kategória) kötelezően `uppercase tracking-wider text-xs md:text-sm` osztályokat kap.
- **Heading Weight:** A címsorok szigorúan `font-bold` (Space Grotesk 700), `tracking-tight` letter-spacinggel a prémium megjelenésért.

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

## 6. Lágy Árnyékok (Shadows) - Electric Cyan Elevation System

| Token neve    | CSS érték                         | Tailwind class                             | Használat                |
| ------------- | --------------------------------- | ------------------------------------------ | ------------------------ |
| `elevation-1` | `0 4px 12px rgba(0,181,241,.04)`  | `shadow-[0_4px_12px_rgba(0,181,241,.04)]`  | Kis elemek, badge-ek     |
| `elevation-2` | `0 8px 24px rgba(0,181,241,.06)`  | `shadow-[0_8px_24px_rgba(0,181,241,.06)]`  | Kártyák, konténerek      |
| `elevation-3` | `0 18px 40px rgba(0,181,241,.08)` | `shadow-[0_18px_40px_rgba(0,181,241,.08)]` | Hover állapotok, modálok |

**Megjegyzés:** Az Electric Cyan v5.0 rendszerben a három szintű elevation rendszert használjuk a térbeliség létrehozására. A régi shadow-soft, shadow-medium, shadow-large tokeneket felváltották az elevation-1, elevation-2, elevation-3 tokenek.

---

## 7. UI Komponens Stílusminták

### 7.1 Kártyák (Cards - Electric Cyan technika)

```typescript
<div className="
  bg-[#0f172a]
  border border-slate-700
  rounded-3xl
  p-8
  shadow-[0_4px_12px_rgba(0,181,241,.04)]
  hover:shadow-[0_8px_24px_rgba(0,181,241,.06)]
  hover:-translate-y-1
  transition-all duration-300
">
```

### 7.2 Konverziós Gombok (CTA)

```typescript
// Elsődleges (Brand) - A figyelem mágnes
<button className="
  bg-[#00B5F1] hover:bg-[#0095C7]
  text-white font-bold
  px-8 py-4 rounded-full
  uppercase tracking-wider text-sm
  transition-all duration-300 hover:scale-[1.02] active:scale-95
  shadow-[0_8px_24px_rgba(0,181,241,.3)]
">

// Másodlagos (Secondary - Outline)
<button className="
  border border-slate-700 hover:border-[#00B5F1]
  text-[#e2e8f0] hover:text-[#00B5F1]
  bg-transparent
  px-8 py-4 rounded-full
  font-medium
  transition-all duration-300
">

// Glow (Cyan glow)
<button className="
  bg-[#00B5F1] hover:bg-[#0095C7]
  text-white font-bold
  px-8 py-4 rounded-full
  uppercase tracking-wider text-sm
  transition-all duration-300 hover:scale-[1.02] active:scale-95
  shadow-[0_0_40px_rgba(0,181,241,0.3)]
">
```

### 7.3 Űrlapok és Validáció (Forms)

Minden inputnak rendelkeznie kell fókusz- és hibaállapottal.

```typescript
<input className="
  w-full bg-[#0f172a]
  border border-slate-700
  focus:border-[#00B5F1] focus:ring-1 focus:ring-[#00B5F1]
  text-[#e2e8f0] placeholder:text-slate-500
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
  backdrop-blur-md bg-[#0f172a]/90
  border border-slate-700
  rounded-3xl
  shadow-[0_8px_24px_rgba(0,181,241,.06)]
">
```

---

## 10. Ikonográfia és Képi Elemek

Ikon Készlet: lucide-react. Kifejező, vékony vonalvezetésű, skálázható vektorok. Stroke width: szigorúan 1.5 vagy 2.

Képkezelés: Minden fotónak vagy mockuponak tiszta, világos esztétikát kell tükröznie. Képek sarkai rounded-3xl (vagy éles szögek, de azt következetesen).

---

## 11. Dizájn Döntési Napló (DDR)

**DDR-001 (Sötét Téma):** Az Electric Cyan v5.0 rendszer kizárólag sötét témát használ (#020617 alap). A prémium vizuális identitás és a modern digitális stúdió esztétika sötét környezetben működik konverzió-optimalizáltan.

**DDR-002 (Cyan Glow alapú mélység):** A térbeliséget cyan árnyékokkal (elevation-1, elevation-2, elevation-3) oldjuk meg, nem border-alapú technikával. Glow effekt csak a brand (#00B5F1) kiemeléseknél engedélyezett.

**DDR-003 (Accessibility Focus):** A brand (#00B5F1) gombokon a fehér szöveg teljesíti a WCAG AA kontrasztarányt, ezért a felirat KÖTELEZŐEN text-white kell, hogy legyen.

**DDR-004 (Space Grotesk):** A címsorok kizárólag Space Grotesk betűtípust használhatnak (font-weight: 700). A folyószöveg és UI elemek Inter betűtípust (font-weight: 400, 500, 600).

**DDR-005 (90-8-2 Szabály):** A szín eloszlás szigorúan 90% sötét alap (#020617, #0f172a), 8% cyan akcentus (#00B5F1), 2% kiemelés (#e2e8f0) arányt követ.

---

DESIGN_SYSTEM.md v5.0 — webdude.hu | AI Agent direktíva: Ez a fájl az igazság egyedüli forrása a vizuális implementációhoz.
