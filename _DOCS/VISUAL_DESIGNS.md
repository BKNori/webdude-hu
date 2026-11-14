# VISUAL_DESIGNS.md — WebDude Vizuális Tervek & Multi-Engine Prompt Könyvtár (v7.0)

**webdude.hu | Kék-Lila v7.0 · Next.js 16 · React 19 · Tailwind CSS v4 · Motion**
**Utolsó frissítés: 2026-11-14 | Tulajdonos: Balog Norbert (WebDude)**

> Ez a dokumentum a WebDude AI Vizuális Motor Rendszer által használt produkciós promptokat (Midjourney v6.1/v7, Flux.1 Pro, Ideogram 2.0, Recraft v3) és a hozzájuk tartozó referenciakomponenseket tartalmazza a konverziófókuszú banner-, UI- és kampánytervezéshez.

---

## 1. Vizuális Alapszabályok & Multi-Engine Paraméterek

### 1.1 Színarány Szabály (90-8-2 Dark Studio — Kék-Lila v7.0)
- **90% `#020617` (`bg-bg-base`):** Mélysötét Cyber-Dark stúdió alap.
- **8% `#0f172a` (`bg-bg-surface`) & `#e2e8f0` (`text-text-primary`):** Luminous Glassmorphism panelek és tűéles világos tipográfia.
- **Max 2% `#00B5F1` (`brand-primary`) & `#075985` → `#5B21B6` (`cta-from` → `cta-to`):** Electric Cyan és Deep Violet (Kék-Lila) biolumineszcens élfények és CTA kiemelések (`#7C3AED` akcentus, `#6d28d9` `cta-hover`, CTA gombokon kötelezően `text-white` felirat a WCAG AAA kontrasztért).
- **SZIGORÚ TILTÁS:** Arany, sárga, amber (`#f59e0b`, `amber-*`, `gold-*`) vagy narancs tónusok használata a promptokban és a kódban SZIGORÚAN TILOS!

### 1.2 2026 Multi-Engine Master Paraméterek
- **Fotórealisztikus & 3D Hero Vizuálok (Midjourney v6.1 / Flux.1 Pro):**
  - Midjourney: `--v 6.1 --style raw --stylize 250` (v7 kompatibilis promptstruktúra)
  - Flux.1 Pro: `guidance_scale: 3.5`, `steps: 28`, hex-pontos színvezérlés (`#020617`, `#00B5F1`, `#5B21B6`)
  - Optika: `85mm Sony G-Master lens, f/1.8 aperture, shallow depth of field`
  - Fényfizika: `cinematic chiaroscuro lighting, volumetric atmosphere, electric cyan (#00B5F1) and deep violet (#5B21B6) rim lighting`
- **UI Mockupok & Feliratos Bannerek (Ideogram 2.0 / Flux.1 Dev):**
  - `style_type: DESIGN` / `REALISTIC`, `magic_prompt: OFF`
  - Tűéles UI szöveg renderelés, `Bebas Neue` (címsorok) + `Plus Jakarta Sans` (UI és folyószöveg) karakterisztika, sötét Bento Grid dashboardok.
- **Logók & Ikonok (Recraft v3 SVG / Midjourney Flat Vector):**
  - `style: vector_illustration`, szigorú 8px grid, skálázható SVG, tiszta negatív tér, arany/meleg sárga árnyalatok kizárása.

---

## 2. UX Roast & Konverziós Szolgáltatás Promóció (Cycle 162–163)

### 2.1 Hero Banner (1920x600 / 16:5)

**Multi-Engine Prompt (Midjourney v6.1 / Flux.1 Pro):**

```text
/imagine prompt: A high-end minimalist tech studio desk workspace in a dark environment, cinematic chiaroscuro lighting, subtle electric cyan (#00B5F1) and deep violet (#5B21B6) rim lighting on a sleek matte black laptop displaying a dark-mode Next.js Bento Grid UI dashboard, 85mm G-Master lens, f/1.8, soft bokeh, hyper-realistic commercial photography, deep slate background (#020617), Soft-Premium futuristic atmosphere, no gold, no warm yellow tones --ar 16:5 --v 6.1 --style raw
```

**Multi-Engine Paraméterek:** `MJ: --v 6.1 --style raw --ar 16:5` | `Flux.1 Pro: 1920x600, guidance 3.5, steps 28` | `Ideogram 2.0: REALISTIC, 16:5`

**Architect's Note:** A chiaroscuro lighting kulcsfontosságú a mélységérzet kialakításához. Az electric cyan (`#00B5F1`) és deep violet (`#5B21B6`) rim lighting a laptopon a **Kék-Lila v7.0** identitást erősíti, miközben a bokeh a figyelmet a középpontba tereli.

### 2.2 Facebook / Közösségi Hirdetés (1080x1080 / 1:1)

**Multi-Engine Prompt (Midjourney v6.1 / Flux.1 Pro):**

```text
/imagine prompt: Close-up macro shot of a precision-engineered brushed dark titanium compass with electric cyan (#00B5F1) and deep violet (#5B21B6) rim lighting on a dark slate surface (#020617), symbolic of strategic direction and conversion optimization, dramatic chiaroscuro studio lighting, 85mm G-Master lens, f/1.8, hyper-realistic, shallow depth of field, minimalist composition, no gold, no warm yellow tones --ar 1:1 --v 6.1 --style raw
```

**Multi-Engine Paraméterek:** `MJ: --v 6.1 --style raw --ar 1:1` | `Flux.1 Pro: 1080x1080, guidance 3.5` | `Ideogram 2.0: REALISTIC, 1:1`

**Architect's Note:** A precíziós iránytű a mérhető irányt és a konverzióoptimalizálást reprezentálja. A makró fókusz és a hideg kék-lila élfény a műszaki precizitást és a szakértelmet sugározza.

### 2.3 UX Roast Landing Page UI Mockup (16:9)

**Multi-Engine Prompt (Ideogram 2.0 / Flux.1 Pro / Midjourney v6.1):**

```text
/imagine prompt: High-fidelity landing page UI design for a senior web performance and UX audit service, dark mode (#020617), clean Bento Grid layout (#0f172a glass panels), sophisticated use of electric cyan (#00B5F1) and deep violet (#5B21B6) rim lighting and gradient CTA buttons, displaying a Lighthouse 95+ score gauge visualization, bold condensed display headings, clean geometric sans-serif body typography, Figma production design style, no gold, no warm yellow tones --ar 16:9 --v 6.1 --style raw
```

**Multi-Engine Paraméterek:** `Ideogram 2.0: DESIGN, 16:9, magic_prompt OFF` | `Flux.1 Pro: 1920x1080, guidance 3.5` | `MJ: --v 6.1 --style raw --ar 16:9`

**Kötelező Landing Struktúra (CRO Sorrend — Zéró Fix Ár):**
1. **Hero:** Egyértelmű value proposition, 26 év grafikai és 16 év webfejlesztői tapasztalat kiemelve, azonnali CTA (*„Egyedi árajánlat kérése”*).
2. **Social Proof:** Hitelesített ügyfélvélemények, 95+ Lighthouse és mért konverziós esettanulmány-számok.
3. **Kínálat & Fájdalompontok:** „A lassú oldal ügyfeleket veszít” → Next.js 16 + React 19 + Firebase + Tailwind v4 megoldás.
4. **FAQ (AEO):** Kérdés-válasz blokkok `FAQPage` JSON-LD sémával, fix árak nélkül.
5. **Erős CTA:** Egyetlen félreérthetetlen gomb: *„Egyedi árajánlat kérése”* (`from-cta-from to-cta-to text-white`).

### 2.4 Tailwind v4 & React 19 Referencia Komponensek

#### `BannerHero` Komponens (Duál Tipográfia + Kék-Lila v7.0 CTA)

```tsx
import Link from "next/link";

export function BannerHero() {
  return (
    <section
      aria-labelledby="ux-roast-hero-heading"
      className="bg-bg-base py-24 px-6 md:px-16 lg:px-24 flex items-center justify-between border-b border-brand-primary/30"
    >
      <div className="max-w-3xl">
        <h1
          id="ux-roast-hero-heading"
          className="font-heading font-normal tracking-[0.03em] text-white text-5xl md:text-6xl mb-6"
        >
          Weboldalad lassú? A konverzió elmarad?
        </h1>
        <p className="font-sans text-text-primary text-lg md:text-xl mb-10 leading-relaxed">
          Ne hagyd, hogy a látogatóid a versenytársnál kössenek ki.{" "}
          <span className="font-semibold text-brand-primary">
            26 év grafikai és 16 év webfejlesztői tapasztalattal
          </span>{" "}
          és{" "}
          <span className="font-semibold text-brand-primary">
            95+ Lighthouse teljesítménnyel
          </span>{" "}
          személyesen alakítom át a digitális jelenlétedet egyedi igényekre szabva.
        </p>
        <Link
          href="/kapcsolat"
          className="inline-flex items-center justify-center font-sans font-semibold text-sm uppercase tracking-wider text-white bg-linear-to-r from-cta-from to-cta-to hover:from-[#0369a1] hover:to-cta-hover px-8 py-4 rounded-xl shadow-lg shadow-purple-950/50 transition-all duration-300 hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-bg-base"
        >
          Egyedi árajánlat kérése
        </Link>
      </div>
    </section>
  );
}
```

**Implementációs Megjegyzések:**
- **Duál Tipográfia:** A `H1` szigorúan `font-heading font-normal` (`Bebas Neue`, 400-as súly, `letter-spacing: 0.03em`), míg a folyószöveg és a CTA gomb `font-sans` (`Plus Jakarta Sans`) betűtípust használ.
- **WCAG AAA CTA:** A `from-cta-from` (`#075985`) → `to-cta-to` (`#5B21B6`) gradiensen kötelezően `text-white` felirat szerepel, fókuszállapotban látható `focus:ring-2 focus:ring-brand-primary` gyűrűvel.
- **Zéró Fix Ár & E/1 Hangnem:** A copy egyes szám első személyben szól Balog Norbert (WebDude) nevében, fix árak nélkül, közvetlen *„Egyedi árajánlat kérése”* konverziós céllal.

#### `LighthousePerformanceSection` Komponens (`useReducedMotion()` + A11y)

```tsx
"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

export default function LighthousePerformanceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });
  const score = useTransform(scrollYProgress, [0, 1], [0, 95]);
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayScore(95);
      return;
    }

    const unsubscribe = score.on("change", (latest) => {
      setDisplayScore(Math.round(latest));
    });
    return unsubscribe;
  }, [score, shouldReduceMotion]);

  return (
    <section
      id="lighthouse-performance"
      ref={sectionRef}
      aria-labelledby="lighthouse-heading"
      className="bg-bg-base py-24 border-t border-brand-primary/20"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text side */}
          <div className="w-full md:w-1/2">
            <motion.h2
              id="lighthouse-heading"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.35 }}
              className="font-heading font-normal tracking-[0.03em] text-4xl text-white mb-6"
            >
              Technikai felsőbbrendűség
            </motion.h2>
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.35, delay: 0.15 }
              }
              className="font-sans text-text-primary leading-relaxed mb-8"
            >
              26 év grafikai és 16 év webfejlesztői tapasztalattal garantálom a
              kompromisszummentes sebességet. A görgetésre reagáló mutató jelzi,
              milyen Core Web Vitals szintet ér el a weboldalad az én mérnöki
              optimalizálásommal.
            </motion.p>
          </div>

          {/* Animation side */}
          <div className="w-full md:w-1/2 flex justify-center">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.92 }}
              whileInView={
                shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }
              }
              viewport={{ once: true }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.35, delay: 0.25 }
              }
              className="relative"
            >
              <div
                role="status"
                aria-label={`Lighthouse teljesítmény pontszám: ${displayScore} plusz`}
                className="w-64 h-64 border-8 border-brand-primary rounded-full flex items-center justify-center bg-bg-surface/90 shadow-[0_8px_24px_rgba(0,181,241,0.18)]"
              >
                <span className="font-heading font-normal text-6xl text-white tracking-[0.03em]">
                  {displayScore}+
                </span>
              </div>
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1 }}
                viewport={{ once: true }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.35, delay: 0.35 }
                }
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-center bg-bg-surface border border-brand-primary/40 px-4 py-1 rounded-full"
              >
                <span className="font-sans text-xs text-brand-primary font-semibold uppercase tracking-wider whitespace-nowrap">
                  Lighthouse Score
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Mikro-interakció & Akadálymentesítés:** A számláló `motion/react` `useScroll` és `useTransform` hookokra épül, és kötelező `useReducedMotion()` védelmet tartalmaz: csökkentett mozgásigény esetén azonnal `95+` értéket jelenít meg belépő animáció nélkül, betartva a `<= 400ms` átmeneti korlátot.

---

## 3. Logó & Brand Szimbólum — WebDude Identitás (Cycle 164)

### 3.1 Technológiai Minimalizmus (The Architect)

**Multi-Engine Prompt (Recraft v3 SVG / Midjourney v6.1 / Flux.1 Pro):**

```text
/imagine prompt: Minimalist geometric logo mark for a senior web engineering brand, 8px grid-based architectural precision, clean vector lines, flat vector style, interlocking modular geometric shapes representing Next.js and React component hierarchy, dark slate background (#020617) with electric cyan (#00B5F1) and deep violet (#5B21B6) rim lighting and clean accents, no gold, no warm yellow tones --ar 1:1 --v 6.1 --style raw
```

**Multi-Engine Paraméterek:** `Recraft v3: vector_illustration (SVG)` | `MJ: --v 6.1 --style raw --ar 1:1` | `Flux.1 Pro: 1024x1024, guidance 3.5`

**Architect's Note:** A rácsalapú geometriai formák a Next.js App Router és Atomic Design komponensfát szimbolizálják.

### 3.2 Absztrakt Dinamika (The Flow)

**Multi-Engine Prompt (Recraft v3 / Midjourney v6.1 / Flux.1 Pro):**

```text
/imagine prompt: Abstract dynamic emblem symbolizing continuous conversion optimization and ultra-fast web performance, flowing aerodynamic vector curves, flat vector style, clean geometry on deep dark slate background (#020617) with electric cyan (#00B5F1) and deep violet (#5B21B6) rim lighting and accent strokes, 8px grid alignment, minimalist tech brand identity, no gold, no warm yellow tones --ar 1:1 --v 6.1 --style raw
```

**Multi-Engine Paraméterek:** `Recraft v3: vector_illustration (SVG)` | `MJ: --v 6.1 --style raw --ar 1:1` | `Flux.1 Pro: 1024x1024, guidance 3.5`

**Architect's Note:** A folytonos ívek az AI-vezérelt munkafolyamatok sebességét és az akadálymentes felhasználói utat jelképezik.

### 3.3 Tipográfiai Fókusz (The Brand)

**Multi-Engine Prompt (Ideogram 2.0 / Recraft v3):**

```text
/imagine prompt: Modern typographic wordmark logo for "WebDude", tall condensed display letterforms inspired by Bebas Neue paired with clean geometric neo-grotesque subtext, crisp vector edges, dark slate background (#020617) with electric cyan (#00B5F1) and deep violet (#5B21B6) accents highlighting the letter "D", 8px grid alignment, flat minimal branding, no gold, no warm yellow tones --ar 1:1 --v 6.1 --style raw
```

**Multi-Engine Paraméterek:** `Ideogram 2.0: DESIGN, 1:1, magic_prompt OFF` | `Recraft v3: vector_illustration` | `MJ: --v 6.1 --style raw --ar 1:1`

**Architect's Note:** A „WebDude” márkanév vizuálisan is tükrözi a duál tipográfiát; a „D” betű kék-lila akcentusa a márkaidentitás fókuszpontja.

### 3.4 Vektorgrafikus Irányelvek (8px Rácsrendszer)
- **Grid & Arányok:** Minden elem 8px rácsrendszerhez illeszkedik; vonalvastagság `2px–8px`; sarokkerekítés `8px`, `16px`, `24px`, `32px`.
- **Színkiosztás:** 90% `#020617` alap, 8% `#0f172a` / `#e2e8f0` kontrasztfelület, max 2% `#00B5F1` és `#5B21B6` kiemelés (0% arany/amber).
- **Technikai Export:** Tiszta optimalizált SVG, `1:1` (ikon/logó) és `16:9` (fejléc/OG kép `1200x630`), sötét és átlátszó háttérváltozatokkal.

---

## 4. Antigravity AI 3D Kampány Látványvilág (Cycle 165)

### 4.1 Absztrakt 3D-s Renderelt Látványvilág

**Multi-Engine Prompt (Midjourney v6.1 / Flux.1 Pro):**

```text
/imagine prompt: Abstract 3D rendered visualization for enterprise AI automation, volumetric fog and electric cyan (#00B5F1) and deep violet (#5B21B6) rim lighting, weightless floating obsidian glass geometric monoliths symbolizing neural workflow orchestration, cinematic chiaroscuro lighting, 85mm G-Master lens, f/1.8, hyper-realistic, Cyber-Dark studio environment (#020617), shallow depth of field, futuristic tech aesthetic, no gold, no warm yellow tones --ar 16:9 --v 6.1 --style raw
```

**Multi-Engine Paraméterek:** `MJ: --v 6.1 --style raw --ar 16:9 --stylize 250` | `Flux.1 Pro: 1920x1080, guidance 3.5, steps 28`

**Architect's Note:** A lebegő obszidián üvegformák és a biolumineszcens kék-lila élfények fizikai térben fordítják le a Luminous Glassmorphism és a 90-8-2 arányrendszer esztétikáját.

### 4.2 Volumetrikus Környezet & Szezonális Kampány Specifikáció
- **Fényfizika:** Erős Chiaroscuro kontraszt, `electric cyan (#00B5F1) and deep violet (#5B21B6) rim lighting`, finom térfogatköd (`volumetric fog`), `85mm f/1.8` mélységélesség.
- **Szezonális Kampányelv („Scarcity of Electric Cyan & Violet”):** Akciók és kiemelt kampányok során is tilos a felületek túlszínezése — a `#00B5F1` és `#5B21B6` fények legfeljebb 2%-os arányban, fókuszirányítóként jelenhetnek meg a `#020617` sötét vásznon.

---

## 5. Add-on Áruház & AI Műhelyek Specifikáció (Cycle 167–172)

### 5.1 Zéró Fix Ár Portfólió & Műhely Áttekintés

> **Kritikus CRO & SEO Szabály:** Publikus oldalakon, promptokban és JSON-LD sémákban szigorúan tilos fix árakat („Ft”, „EUR”, „$”, `priceRange`) szerepeltetni. Minden modul egyedi igényfelmérés alapján, az **„Egyedi árajánlat kérése”** CTA-val igényelhető (jogosult ügyfeleknek Portál csomagként aktiválva).

| ID | Termék / Modul | Kategória | Konstrukció & CTA | Értékelés | Státusz |
| --- | --- | --- | --- | --- | --- |
| 1 | AI Workflow Starter Pack | AI Automatizáció | Egyedi árajánlat / Portál csomag | 4.9 (23) | Produkciós |
| 2 | SEO & AEO Audit Pro | SEO / AEO Optimalizálás | Egyedi árajánlat / Portál csomag | 4.8 (47) | Produkciós |
| 3 | CRO Booster Kit | Konverzió Optimalizálás | Egyedi árajánlat / Portál csomag | 4.7 (31) | Produkciós |
| 4 | AI Chatbot Starter | AI Megoldások | Egyedi árajánlat / Portál csomag | 4.9 (18) | Produkciós |

**Aktív AI Műhely Ökoszisztéma (`/termekek` és `/portal/ai-muhely`):**
- **Kristófka Munkafolyamat:** Ingatlanbefektetői pitch generálás PDF alaprajzokból.
- **Banner AI Műhely:** Konverziófókuszú banner tervezés 2026 Multi-Engine (Midjourney v6.1 / Flux.1 Pro / Ideogram 2.0) promptokkal.
- **Logó AI Műhely:** Egyedi arculattervezés és SVG vektorizáció (Recraft v3 / Midjourney).
- **Midjourney AI Műhely:** Fotórealisztikus és 3D kampányvizuál-tervezés Kék-Lila v7.0 paraméterezéssel.
- **SEO Audit AI Műhely:** Technikai SEO és AEO/GEO vizualizációs és sématervező modul.
- **Szezonális AI Műhely:** Időszakos kampány- és közösségi média kreatívok generálása.
- **Tartalomtervező AI Műhely:** E-E-A-T és AEO-kompatibilis tartalomstratégia-tervezés.
- **UI/UX AI Műhely:** Wireframe, Bento Grid és konverziós elrendezés tervezés.
- **Versenytárs Elemző AI Műhely:** Pozicionálási és vizuális versenytárs-audit (kanonikus útvonal: `/termekek/versenytars-elemzo-ai-muhely`).
- **Nyomdai & Architektúra Bővítmények:** Szórólap, Csomagolás, Nagyformátumú Dekor és Brief → Architektúra műhelyek.

### 5.2 Multi-Engine Hero Vizuál Sablon Termékoldalakhoz

```text
[TERMÉK NEVE] hero product visualization for WebDude.hu dark studio marketplace --v 6.1 --style raw --ar 16:9 --stylize 250
85mm G-Master lens, f/1.8 aperture, cinematic chiaroscuro lighting, volumetric fog, electric cyan (#00B5F1) and deep violet (#5B21B6) rim lighting
Cyber-Dark background (90%, #020617), Slate glass panels (8%, #0f172a), electric cyan (#00B5F1) and deep violet (#5B21B6) accents (max 2%)
High-end studio environment, hyper-realistic render, modular 3D glass geometric forms, no gold, no warm yellow tones
```

**Multi-Engine Paraméterek:** `MJ: --v 6.1 --style raw --ar 16:9` | `Flux.1 Pro: 1920x1080, guidance 3.5, steps 28` | `Ideogram 2.0: DESIGN / REALISTIC, 16:9`

### 5.3 Kiemelt Termék-Specifikus Promptok & Copy Irányelvek

#### 1. SEO & AEO Audit Pro (`src/app/termekek/seo-audit-pro`)
- **Prompt kiegészítő tárgy:** `Futuristic dark glass SEO dashboard hologram showing 95+ Lighthouse score ring, structured Schema.org JSON-LD entity graph nodes, electric cyan (#00B5F1) and deep violet (#5B21B6) rim lighting, no gold, no warm yellow tones`
- **E-E-A-T & AEO Copy Horgony:** *Balog Norbert (WebDude) — 26 év grafikai és 16 év webfejlesztői tapasztalat*; egyedi technikai SEO, Schema.org JSON-LD (`#organization`, `#person`) és válaszmotor-optimalizálás (országos elérés).
- **CTA:** *„Egyedi árajánlat kérése”* (`from-cta-from to-cta-to text-white`).

#### 2. CRO Booster Kit (`src/app/termekek/cro-booster-kit`)
- **Prompt kiegészítő tárgy:** `Minimalist 3D conversion funnel architecture crafted from smoked obsidian glass with electric cyan (#00B5F1) and deep violet (#5B21B6) rim lighting, subtle glowing data flow lines and UI heatmap overlay, no gold, no warm yellow tones`
- **CRO Fókusz:** A/B tesztelési keretrendszer, konverziós útvonal-elemzés, pszichológiai súrlódáscsökkentés.
- **CTA:** *„Egyedi árajánlat kérése”*.

#### 3. AI Workflow Starter Pack (`src/app/termekek/ai-workflow-starter-pack`)
- **Prompt kiegészítő tárgy:** `Interconnected modular neural workflow nodes suspended in dark obsidian space, electric cyan (#00B5F1) and deep violet (#5B21B6) rim lighting, crisp schematic data streams symbolizing automated lead qualification, no gold, no warm yellow tones`
- **Fókusz:** Kész, testreszabható AI munkafolyamat-sablonok, validált Zod + Server Action integrációk, karbantartott tudásbázis.
- **CTA:** *„Egyedi árajánlat kérése”*.

#### 4. AI Chatbot Starter (`src/app/termekek/ai-chatbot-starter`)
- **Prompt kiegészítő tárgy:** `Sleek dark-mode conversational AI interface floating inside a luminous slate glass frame (#0f172a), electric cyan (#00B5F1) and deep violet (#5B21B6) rim lighting, crisp Hungarian language UI bubbles, 24/7 digital concierge symbolism, no gold, no warm yellow tones`
- **Fókusz:** Magyar nyelvű tudásbázis-alapú asszisztens, WebDude OS kompatibilitás, beépített lead-kvalifikáció.
- **CTA:** *„Egyedi árajánlat kérése”*.

### 5.4 AEO/SEO & Kommunikációs Szabványok (Scale Ready)
- **JSON-LD (Szerveroldali `layout.tsx`, ADR-001):** Minden termékoldalon `Product` / `SoftwareApplication` és `BreadcrumbList` séma; `offers` blokk konkrét `price` érték nélkül, központi `"@id": "https://webdude.hu/#organization"` és `"@id": "https://webdude.hu/#person"` (`Balog Norbert`) horgonyokkal, valamint kötelező `.replace(/</g, "\\u003c")` XSS védelemmel.
- **Országos Pozicionálás & E/1 Hangnem:** A szövegezés kizárólag egyes szám első személyben („én”, „személyesen”, „tapasztalatom”) és országos pozicionálással készül; a helyi „Kecskemét” kulcsszó kizárólag a `/weboldal-keszites-kecskemet` oldalon megengedett.
- **Meta Description & Heading:** Egyedi 150–160 karakteres `description`, oldalanként pontosan egy `H1`, logikus `H1 → H2 → H3` hierarchia.

---

## 6. v7.44.0 QA Audit Protokoll

Minden vizuális terv, prompt és UI-implementáció kizárólag az alábbi kapuk teljesítése után kerülhet produkcióba:

| Audit Terület | WebDude v7.44.0 Szabvány | Ellenőrzési Mód |
| --- | --- | --- |
| **Színarány (90-8-2)** | 90% `#020617`, 8% `#0f172a` / `#e2e8f0`, max 2% `#00B5F1` & `#5B21B6`; **0% arany/amber/sárga** | Vizuális audit + kódbázis grep ellenőrzés |
| **Multi-Engine Promptok** | Midjourney v6.1 (`--v 6.1 --style raw`) / Flux.1 Pro / Ideogram 2.0 / Recraft v3 + `electric cyan (#00B5F1) and deep violet (#5B21B6) rim lighting` | Prompt könyvtár szintaxis- és negatívprompt-ellenőrzés |
| **Duál Tipográfia** | Címsorok (`H1–H6`): `Bebas Neue` (`font-heading font-normal`, faux-bold tilos); UI & Gombok: `Plus Jakarta Sans` (`font-sans`, `400`/`500`/`600`) | `globals.css` + komponens Tailwind osztályok auditja |
| **CTA & WCAG Kontraszt** | `from-cta-from` (`#075985`) → `to-cta-to` (`#5B21B6`) háttéren kötelezően `text-white` (WCAG AAA) + látható `focus:ring-brand-primary` | Kontrasztmérés + billentyűzet-navigációs teszt |
| **Akadálymentesítés (Motion)** | Kötelező `useReducedMotion()` (`motion/react`) + szemantikus `aria-*` és `role` attribútumok | `LighthousePerformanceSection` + komponens review |
| **Zéró Fix Ár & CRO** | 0 Ft/EUR/$ összeg és 0 `priceRange`; egységes **„Egyedi árajánlat kérése”** CTA + 5 lépcsős landing sorrend | Tartalmi és Schema.org JSON-LD ellenőrzés |
| **E-E-A-T & Biztonság** | **Balog Norbert (WebDude)** (26 év grafikai / 16 év webfejlesztői tapasztalat) + `.replace(/</g, "\\u003c")` JSON-LD XSS védelem | `layout.tsx` RSC + `structuredData.ts` ellenőrzés |
| **Validáció & Higiénia** | Érvényes Markdown, csonkításmentes kódblokkok, `npx tsc --noEmit` és `npm run lint -- --max-warnings 0` → **0 hiba** | Automatizált terminál és linter ellenőrzés |
