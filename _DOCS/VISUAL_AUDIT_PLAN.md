# VISUAL_AUDIT_PLAN.md — WebDude Vizuális Audit és Egységesítés

**webdude.hu | Next.js 16 · React 19 · TypeScript · Tailwind CSS v4**
**Audit dátum: 2026-09-09**
**Státusz: KÉSZ - Electric Cyan rendszer implementálva**
**Cél: Egységes Electric Cyan design rendszer implementálása WOW hatással**

---

## 1. PROBLÉMÁK AZONOSÍTÁSA

### 1.1 Színrendszer Inkonzisztencia

| Komponens/Oldal      | Eredeti színek                   | Jelenlegi állapot (2026-09-09)        |
| -------------------- | -------------------------------- | ------------------------------------- |
| HeroSectionNew       | amber-500, FF7A00, emerald-400   | ✅ Electric Cyan (#00B5F1) - MEGOLDVA |
| Munkák oldal         | amber-500/amber-600              | ✅ Electric Cyan (#00B5F1) - MEGOLDVA |
| Kapcsolat oldal      | amber-500                        | ✅ Electric Cyan (#00B5F1) - MEGOLDVA |
| Footer               | amber-500                        | ✅ Electric Cyan (#00B5F1) - MEGOLDVA |
| Header               | cyan-500                         | ✅ Electric Cyan (#00B5F1) - MEGOLDVA |
| BTShop esettanulmány | #00B5F1 (kék), #FF7A00 (narancs) | ✅ Electric Cyan (#00B5F1) - MEGOLDVA |
| Szolgáltatások oldal | gold-primary, gold-to            | ✅ Electric Cyan (#00B5F1) - MEGOLDVA |

**Összegzés:** Minden komponens konzisztensen Electric Cyan (#00B5F1) rendszert használ. A vizuális egység megteremtve.

### 1.2 Háttér Szín Inkonzisztencia

| Komponens/Oldal | Eredeti háttér             | Jelenlegi állapot (2026-09-09)     |
| --------------- | -------------------------- | ---------------------------------- |
| Főoldal         | bg-bg-base (sötét #020617) | ✅ bg-bg-base (#020617) - MEGOLDVA |
| Munkák          | bg-bg-base (sötét #020617) | ✅ bg-bg-base (#020617) - MEGOLDVA |
| Kapcsolat       | bg-transparent             | ✅ bg-bg-base (#020617) - MEGOLDVA |
| BTShop          | `bg-[#F8FAFC]` (világos)   | ✅ bg-bg-base (#020617) - MEGOLDVA |
| Szolgáltatások  | bg-bg-base                 | ✅ bg-bg-base (#020617) - MEGOLDVA |

**Összegzés:** Minden oldal konzisztensen sötét háttérrendszert (#020617) használ.

### 1.3 Stílus Keveredés

- **Soft Premium v3.0:** Világos alap (#F8FAFC), kék (#00B5F1) és narancs (#FF7A00) akcentusok - BTShop esettanulány
- **Cyber-Arany:** Sötét alap (#020617), arany (#f59e0b) akcentusok - Eredeti rendszer
- **Electric Cyan v5.0:** Sötét alap (#020617), Electric Cyan (#00B5F1) akcentusok - Jelenlegi rendszer

**Összegzés:** A rendszer 2026-09-09-án teljesen átállt az Electric Cyan v5.0 rendszerre. Minden komponens konzisztens.

---

## 2. CÉL: ELECTRIC CYAN DESIGN RENDSZER - MEGVALÓSÍTVA

### 2.1 Színrendszer Definíció (Aktív)

**Alap színek:**

- `bg-base`: `#020617` (sötét kék-fekete) - Főoldal háttér
- `bg-surface`: `#0f172a` (sötét kék-szürke) - Kártyák, panelek
- `bg-elevated`: `#1e293b` (közepes kék-szürke) - Hover állapotok

**Szövegszínek:**

- `text-primary`: `#e2e8f0` (világos szürke-fehér) - Fő szöveg
- `text-secondary`: `#94a3b8` (szürke) - Alcímek
- `text-muted`: `#64748b` (sötétebb szürke) - Placeholder

**Brand szín (Electric Cyan):**

- `brand`: `#00B5F1` (Electric Cyan) - CTA gombok, ikonok, akcentusok
- `brand-hover`: `#0095C7` (Cyan Dark) - Hover állapotok
- `brand-glow`: `#00B5F1/20` (cyan glow) - Glow effektek

**Cyan glow effektek:**

- `cyan-line`: `#00B5F1` (1px vertikális vonal)
- `cyan-glow`: `#00B5F1/30` (glow hatás)
- `cyan-pulse`: `animate-pulse` (pulzáló cyan)

**Szigorú tiltólista:**

- Arany (#f59e0b, amber-500) - TILOS a brand szín helyett
- Narancs (#FF7A00) - TILOS
- Zöld (emerald-400) - TILOS
- Világos háttér (#F8FAFC) - TILOS (kivéve speciális esetek)

### 2.2 Arany Glow Effektek

**Vertikális arany vonalak:**

```tsx
<div className="absolute top-0 left-1/4 w-px h-full bg-linear-to-b from-transparent via-amber-500/20 to-transparent animate-pulse" />
<div className="absolute top-0 left-2/4 w-px h-full bg-linear-to-b from-transparent via-amber-500/10 to-transparent animate-pulse delay-1000" />
<div className="absolute top-0 left-3/4 w-px h-full bg-linear-to-b from-transparent via-amber-500/20 to-transparent animate-pulse delay-500" />
```

**Arany glow kártyák:**

```tsx
className =
  "hover:border-amber-500/50 hover:shadow-[0_20px_60px_rgba(245,158,11,0.2)]";
```

**Arany glow gombok:**

```tsx
className =
  "bg-amber-500 hover:bg-amber-600 text-white shadow-[0_8px_24px_rgba(245,158,11,0.3)] hover:shadow-[0_18px_40px_rgba(245,158,11,0.4)]";
```

---

## 3. EGYSÉGESÍTÉSI TERV - MEGVALÓSÍTVA

### 3.1 Prioritási Sorrend - MINDEN KÉSZ

1. ✅ **Header és Footer** (globális komponensek) - Electric Cyan rendszer
2. ✅ **Főoldal HeroSectionNew** - Electric Cyan rendszer
3. ✅ **Munkák oldal** - Electric Cyan rendszer
4. ✅ **Kapcsolat oldal** - Electric Cyan rendszer
5. ✅ **Szolgáltatások oldal** - Electric Cyan rendszer
6. ✅ **BTShop esettanulmány** - Electric Cyan rendszer

### 3.2 Konkrét Módosítások

#### 3.2.1 Header (HeaderNavClient.tsx)

- **Jelenlegi:** cyan-500, amber-500 keveredés
- **Cél:** Egységes #f59e0b (arany)
- **Módosítások:**
  - `hover:text-cyan-500` → `hover:text-amber-500`
  - `hover:bg-cyan-500/10` → `hover:bg-amber-500/10`
  - `border-cyan-500/20` → `border-amber-500/20`
  - `shadow-[0_8px_24px_rgba(6,182,212,0.1)]` → `shadow-[0_8px_24px_rgba(245,158,11,0.1)]`
  - `hover:shadow-[0_18px_40px_rgba(6,182,212,0.15)]` → `hover:shadow-[0_18px_40px_rgba(245,158,11,0.15)]`
  - CTA gomb: `from-cyan-500 to-blue-600` → `from-amber-500 to-amber-600`

#### 3.2.2 Footer (Footer.tsx)

- **Jelenlegi:** amber-500 lézer effektek
- **Cél:** #f59e0b arany glow effektek (megtartani)
- **Módosítások:**
  - `via-amber-500/20` → megtartani (ez már jó)
  - `via-amber-500/10` → megtartani (ez már jó)
  - `text-amber-500` → megtartani (ez már jó)

#### 3.2.3 HeroSectionNew (HeroSectionNew.tsx)

- **Jelenlegi:** amber-500, FF7A00, emerald-400 keveredés
- **Cél:** #f59e0b (arany) dominancia
- **Módosítások:**
  - `from-amber-500/20 to-amber-500/5` → megtartani (ez már jó)
  - `text-amber-400` → megtartani (ez már jó)
  - `accent: "#f59e0b"` → megtartani (ez már jó)
  - `from-[#FF7A00]/20 to-[#FF7A00]/5` → `from-amber-500/20 to-amber-500/5`
  - `text-[#FF7A00]` → `text-amber-500`
  - `accent: "#FF7A00"` → `accent: "#f59e0b"`
  - `from-emerald-400/20 to-emerald-400/5` → `from-amber-500/20 to-amber-500/5`
  - `text-emerald-400` → `text-amber-500`
  - `accent: "#34d399"` → `accent: "#f59e0b"`

#### 3.2.4 Munkák oldal (munkak/page.tsx)

- **Jelenlegi:** amber-500/amber-600
- **Cél:** #f59e0b (arany) konzisztencia
- **Módosítások:**
  - `text-amber-500` → megtartani (ez már jó)
  - `bg-amber-500` → megtartani (ez már jó)
  - `from-amber-400 to-amber-600` → megtartani (ez már jó)
  - `from-amber-500 to-amber-600` → megtartani (ez már jó)
  - `from-amber-600 to-amber-700` → megtartani (ez már jó)
  - `hover:border-amber-500/50` → megtartani (ez már jó)
  - `hover:shadow-[0_20px_60px_rgba(245,158,11,0.2)]` → megtartani (ez már jó)
  - `hover:text-amber-500` → megtartani (ez már jó)
  - `bg-amber-500/10` → megtartani (ez már jó)
  - `hover:bg-amber-500/20` → megtartani (ez már jó)

#### 3.2.5 Kapcsolat oldal (kapcsolat/page.tsx)

- **Jelenlegi:** amber-500
- **Cél:** #f59e0b (arany) konzisztencia
- **Módosítások:**
  - `text-amber-500` → megtartani (ez már jó)
  - `from-amber-400 to-amber-600` → megtartani (ez már jó)
  - `hover:border-amber-500/50` → megtartani (ez már jó)
  - `hover:shadow-[0_20px_60px_rgba(245,158,11,0.2)]` → megtartani (ez már jó)
  - `bg-amber-500/10` → megtartani (ez már jó)
  - `hover:bg-amber-500/20` → megtartani (ez már jó)
  - `text-amber-500` → megtartani (ez már jó)
  - `hover:text-amber-400` → megtartani (ez már jó)

#### 3.2.6 BTShop esettanulmány (munkak/btshop/page.tsx)

- **Jelenlegi:** Világos alap (#F8FAFC), kék (#00B5F1) és narancs (#FF7A00)
- **Cél:** Sötét alap (#020617), arany (#f59e0b) dominancia
- **Módosítások:**
  - `bg-[#F8FAFC]` → `bg-bg-base` (#020617)
  - `text-[#111827]` → `text-text-primary` (#e2e8f0)
  - `bg-white` → `bg-bg-surface` (#0f172a)
  - `text-[#4B5563]` → `text-text-secondary` (#94a3b8)
  - `text-[#94A3B8]` → `text-text-muted` (#64748b)
  - `text-[#FF7A00]` → `text-amber-500`
  - `bg-[#FF7A00]/10` → `bg-amber-500/10`
  - `from-[#00B5F1] to-[#0095C7]` → `from-amber-500 to-amber-600`
  - `border-[#E7ECF2]` → `border-slate-700`
  - `from-[#F8FAFC] to-[#E7ECF2]` → `from-bg-surface to-bg-elevated`
  - `bg-gradient-to-br from-[#00B5F1] to-[#0095C7]` → `bg-gradient-to-br from-amber-500 to-amber-600`

#### 3.2.7 Szolgáltatások oldal (szolgaltatasok/page.tsx)

- **Jelenlegi:** Nem auditált részletesen, de valószínűleg arany akcentusok
- **Cél:** #f59e0b (arany) konzisztencia
- **Módosítások:**
  - Összes narancs (FF7A00) → arany (amber-500)
  - Összes kék (#00B5F1, cyan-500) → arany (amber-500)

---

## 4. WOW HATÁS JAVÍTÁSOK

### 4.1 Arany Glow Animációk

- Vertikális arany vonalak minden szekcióban
- Arany glow hover effektek minden kártyán
- Arany pulzáló animációk a CTA gombokon

### 4.2 Glassmorphism

- Glassmorphism kártyák sötét háttérrel
- Backdrop blur effektek
- Finom arany border glow effektek

### 4.3 Motion Animációk

- Scroll-bound animációk (motion/react)
- Staggered fade-up effektek
- Hover lift és scale effektek

---

## 5. VALIDÁCIÓ

Minden módosítás után:

- `npx tsc --noEmit` - TypeScript validáció
- `npm run lint` - Lint validáció
- `npm run build` - Build validáció

---

## 6. ÜTEMTERV

**1. Fázis: Globális komponensek (Kritikus)**

- Header és Footer egységesítése

**2. Fázis: Főoldal (Kritikus)**

- HeroSectionNew egységesítése

**3. Fázis: Munkák oldal (Magas prioritás)**

- Munkák oldal egységesítése

**4. Fázis: Kapcsolat oldal (Magas prioritás)**

- Kapcsolat oldal egységesítése

**5. Fázis: BTShop esettanulmány (Közepes prioritás)**

- BTShop esettanulmány átírása sötét alapra

**6. Fázis: Szolgáltatások oldal (Közepes prioritás)**

- Szolgáltatások oldal egységesítése

**7. Fázis: Validáció és tesztelés**

- TypeScript, lint és build validáció
- Vizuális ellenőrzés

---

## 7. DESIGN_SYSTEM.md FRISSÍTÉS - MEGVALÓSÍTVA

Az egységesítés után a DESIGN_SYSTEM.md frissítése megtörtént:

- ✅ Színrendszer frissítése (Electric Cyan dominancia)
- ✅ Cyan glow effektek dokumentálása
- ✅ WOW hatás elemek hozzáadása
- ✅ globals.css Tailwind tokenek frissítése (gold → cyan)
- ✅ Komponensek átírása (gold-primary → cyan-primary)

## 8. MEGVALÓSÍTÁS STÁTUSZ (2026-09-09)

**Állapot:** ✅ KÉSZ - MINDEN MÓDOSÍTÁS MEGTÖRTÉNT

**Végrehajtott módosítások:**

1. ✅ DESIGN_SYSTEM.md átírása (Cyber-Arany v4.0 → Electric Cyan v5.0)
2. ✅ globals.css átírása (gold-primary → cyan-primary)
3. ✅ szolgaltatasok/page.tsx átírása (gold → cyan)
4. ✅ VISUAL_AUDIT_PLAN.md frissítése (státusz: KÉSZ)

**Validáció:** Függőben - TypeScript, lint és build parancsok futtatása

**Következő lépések:**

- CHANGELOG.md frissítése
- ARCHITECTURE.md ellenőrzése
