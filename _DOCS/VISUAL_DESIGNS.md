# WebDude Vizuális Tervek - Midjourney Promptok

> Ez a dokumentum a WebDude AI Vizuális Motor Rendszer által generált Midjourney promptokat tartalmazza a konverziófókuszú banner és ad tervezéshez.

## Színarány Szabály

- 90% #020617 (Cyber-Dark)
- 8% #e2e8f0 (Slate)
- Max 2% #f59e0b (Arany)

## Midjourney v6 Master Paraméterek

- `--v 6.0` (Midjourney v6)
- `--style raw` (stílus nyers, generikus szépítők nélkül)
- 85mm G-Master optika
- Chiaroscuro lighting (fény-árnyék kontraszt)

---

## Cycle 162: UX Roast Szolgáltatás Promóció

### Hero Banner (1920x600)

**Prompt:**

```
/imagine prompt: A high-end professional desk workspace, minimalist aesthetic, cinematic chiaroscuro lighting, subtle golden rim lighting on a sleek modern laptop showing a clean UI mockup, 85mm G-Master lens, soft bokeh, professional photography, hyper-realistic, Cyber-Dark background, premium atmosphere --ar 16:5 --v 6.0 --style raw
```

**Architect's Note:** A chiaroscuro lighting kulcsfontosságú a mélységérzet kialakításához. Az arany rim lighting a laptopon a "Cyber-Arany" identitást erősíti, miközben a bokeh a figyelmet a középpontba tereli.

### Facebook Hirdetés (1080x1080)

**Prompt:**

```
/imagine prompt: Close-up macro shot of a precision-engineered golden compass on a dark slate background, symbolic of direction and conversion optimization, dramatic professional lighting, 85mm G-Master lens, hyper-realistic, depth of field, minimalist composition, Cyber-Dark aesthetic --ar 1:1 --v 6.0 --style raw
```

**Architect's Note:** A compass szimbólum az irányt és a konverziós optimalizálást reprezentálja. A macro shot és a depth of field a precizitást és a szakértelmet sugározza.

---

## Tailwind v4 Implementáció

### BannerHero Komponens

```tsx
<section className="bg-bg-base p-24 flex items-center justify-between border-b-2 border-gold-primary">
  <div className="max-w-3xl">
    <h1 className="text-white text-6xl font-bold mb-6">
      Weboldalad lassú? A konverzió elmarad?
    </h1>
    <p className="text-text-primary text-xl mb-10">
      Ne hagyd, hogy az ügyfeleid a versenytársnál kössenek ki.
      <span className="font-bold text-gold-primary">
        26 év design tapasztalattal
      </span>
      és
      <span className="font-bold text-gold-primary">
        95+ Lighthouse score-ral
      </span>
      optimalizálom a webshopodat.
    </p>
    <button className="bg-gold-primary text-bg-base px-8 py-4 font-bold rounded-sm hover:opacity-90 transition-opacity">
      Kérem a UX Roast-ot
    </button>
  </div>
</section>
```

**Implementációs Megjegyzések:**

- **Színkezelés:** A gomb (#f59e0b) a teljes banner legszembetűnőbb eleme, a 2%-os szabálynak megfelelően.
- **Hierarchia:** A "26 év" és "95+ score" a vizuális figyelem középpontjában van, a "UX Roast" gomb alatt.
- **Technikai elvárás:** A Tailwind v4 osztályok (pl. rounded-sm) a WebDude minimalista, mérnöki szemléletét tükrözik.

---

## Cycle 163: UI/UX Wireframe Mockup - UX Roast Landing Page

### Landing Page UI (16:9)

**Prompt:**

```
/imagine prompt: High-fidelity landing page UI design for a professional UX audit service, dark mode, clean minimalist aesthetic, grid layout, sophisticated use of gold accents on call-to-action buttons, showing a data visualization of a Lighthouse score dashboard, 85mm G-Master lens, cinematic lighting, sleek typography, Figma design style, professional, modern, minimalist dashboard, Cyber-Dark background --ar 16:9 --v 6.0 --style raw
```

**Architect's Note:** A grid layout és a gold accents a "Cyber-Arany" identitást erősítik. A Lighthouse score dashboard vizualizáció a technikai felsőbbrendűséget demonstrálja.

### Szekció-struktúra

**Hero:** Minimalista főcím, 26 éves tapasztalat kiemelve.

**Probléma-Fájdalompont:** "A lassú oldal pénzbe kerül." (Vizuál: absztrakt elmosódott konkurencia).

**Megoldás (Technikai stack):** Next.js 16 + Firebase + Tailwind v4 ikonok rácshálóban.

**Social Proof:** "26 év design tapasztalat" bizonyítékok és ügyfél logók (sötét tónusú).

**CTA:** "Kérem a UX Roast-ot" – Arany színű, 2%-os vizuális súly.

### Lighthouse Performance Section Komponens

```tsx
"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

export default function LighthousePerformanceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });
  const score = useTransform(scrollYProgress, [0, 1], [0, 95]);
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const unsubscribe = score.on("change", (latest) => {
      setDisplayScore(Math.round(latest));
    });
    return unsubscribe;
  }, [score]);

  return (
    <section
      id="lighthouse-performance"
      ref={sectionRef}
      className="bg-bg-base py-24 border-t border-gold-primary/20"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text side */}
          <div className="w-full md:w-1/2">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl text-white font-bold mb-6"
            >
              Technikai felsőbbrendűség
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-text-primary mb-8"
            >
              26 év tapasztalatával garantáljuk a gyorsaságot. A görgetés közben
              induló animáció mutatja, hol tartana a weboldalad a mi
              optimalizációnkkal.
            </motion.p>
          </div>

          {/* Animation side */}
          <div className="w-full md:w-1/2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative"
            >
              <div className="w-64 h-64 border-8 border-gold-primary rounded-full flex items-center justify-center bg-bg-elevated/50">
                <span className="text-6xl text-white font-mono font-bold">
                  {displayScore}+
                </span>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-center"
              >
                <span className="text-sm text-gold-primary font-bold uppercase tracking-wider">
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

**Mikro-interakció technikai megjegyzés:** A score-counter értékét a Framer Motion useScroll és animate hookjaival dinamikussá tettük, hogy a görgetés sebességével szinkronban "pörögjön" a score 0-ról 95+-ra.

---

## Cycle 164: Logo & Brand Szimbólum - WebDude Identitás

### 1. Technológiai Minimalizmus (The Architect)

**Prompt:**

```
/imagine prompt: Minimalist geometric logo design for a tech company, grid-based precision, clean lines, flat vector style, abstract rectangular forms representing Next.js/React structure, dark slate background with subtle gold accents, professional, modern, architectural precision, 8px grid alignment, minimalist metaphorical --ar 1:1 --v 6.0 --style raw
```

**Architect's Note:** A rács-alapú geometriai formák a Next.js/React komponens struktúrát szimbolizálják. A flat vector stílus a mérnöki pontosságot és a skálázhatóságot sugározza.

### 2. Absztrakt Dinamika (The Flow)

**Prompt:**

```
/imagine prompt: Abstract dynamic logo symbolizing continuous optimization and speed, flowing curved lines with motion blur effect, antigravity AI metaphor, flat vector style, clean lines, dark slate background with golden accent lines, professional, modern, minimalist, 8px grid alignment --ar 1:1 --v 6.0 --style raw
```

**Architect's Note:** A folyó görbe vonalak a folyamatos optimalizációt és az "Antigravity AI" sebességét reprezentálják. A motion blur hatás a dinamizmust és a technológiai haladást sugározza.

### 3. Typográfiai Fókusz (The Brand)

**Prompt:**

```
/imagine prompt: Modern typographic logo for "WebDude", custom high-performance font design, bold geometric letterforms, clean lines, flat vector style, dark slate background with golden accent on the "D" letter, professional, modern, minimalist, 8px grid alignment, brand identity focus --ar 1:1 --v 6.0 --style raw
```

**Architect's Note:** A "WebDude" név egyedileg tervezett, modern betűkészleten alapul. A "D" betű arany kiemelése a brand identitás középpontját jelöli.

### Vektorgrafikus Irányelvek (8px Rácsrendszer)

**Arányok és Grid:**

- Minden elem 8px rácsrendszerhez illeszkedik
- Minimális vonalvastagság: 2px
- Maximális vonalvastagság: 8px
- Körív sugara: 8px, 16px, 24px, 32px
- Téglalap méretek: 16x16, 24x24, 32x32, 48x48 pixel

**Színpaletta Audit:**

- **Cyber-Dark (#020617):** Háttér és elsődleges formák (90%)
- **Slate (#e2e8f0):** Szekunder elemek és szöveg (8%)
- **Arany (#f59e0b):** Brand kiemelések és CTA elemek (max 2%)

**Technikai Elvárások:**

- SVG formátum (skálázhatóság)
- 1:1 nézetarány (ikon és logó)
- 16:9 nézetarány (banner és fejléc)
- Transparent háttér (fehér és sötét módhoz)

---

## Cycle 165: Midjourney v6 Master - Antigravity AI Kampány Illusztráció

### Absztrakt 3D-s Renderelt Látványvilág

**Prompt:**

```
/imagine prompt: Abstract 3D rendered visualization for Antigravity AI technology, volumetric fog and golden rim lighting, floating geometric forms representing AI optimization, cinematic chiaroscuro lighting, 85mm G-Master lens f/1.8, hyper-realistic, premium digital environment, Cyber-Dark background with subtle gold accents, professional photography, depth of field, volumetric atmosphere, futuristic tech aesthetic --ar 16:9 --v 6.0 --style raw
```

**Architect's Note:** A volumetrikus köd és arany keretvilágítás (rim lighting) a "Cyber-Arany" identitást fizikai térben jeleníti meg. A lebegő geometriai formák az AI optimalizációt és az antigravitációs technológiát szimbolizálják. A 85mm f/1.8 optika és a chiaroscuro lighting a fotórealisztikus mélységet és a prémium minőséget garantálja.

### Volumetrikus Környezet Specifikáció

**Fényfizika:**

- **Chiaroscuro Lighting:** Erős kontraszt a fény és árnyék között
- **Golden Rim Lighting:** Arany keretvilágítás a formákon (2% arany szabály)
- **Volumetric Fog:** Térfogatköd a mélységérzetért
- **Depth of Field:** 85mm f/1.8 optika, fókusz a középpontban

**Környezet:**

- **Cyber-Dark Háttér:** #020617 alap (90%)
- **Slate Tónusok:** #e2e8f0 szekunder elemek (8%)
- **Arany Accents:** #f59e0b kiemelések (max 2%)
- **Prémium Digitális Tér:** High-end stúdió környezet

**Technikai Elvárások:**

- 16:9 nézetarány (kampány anyagokhoz)
- Hyper-realistic render minőség
- 3D-s geometriai formák
- Futurisztikus tech esztétika

---

## Jövőbeli Kampányok

### 2. UI/UX Wireframe Mockup

- Section-by-section landing wireframe leírás
- Midjourney UI mockup prompt (magas hűségű Figma-stílusú vizuálhoz)

### 3. Logo & Brand Szimbólum

- 3 különböző design koncepció promptja (flat vector, clean lines)

### 4. Szezonális Kampány Vizuál

- Black Friday, szezonális akciók
- "Scarcity of Gold" elv alkalmazása

---

## Cycle 167: Product-Optimizer Workflow - WebDude Add-on Áruház

### 4-Lépcsős Termék-fejlesztési Workflow

#### 1. Vizuális Audit (Midjourney v6)

**Hero Vizuál Prompt Sablon:**

```
[TERMÉK NEVE] hero product visualization for WebDude.hu add-on marketplace --v 6.0 --style raw --ar 16:9 --stylize 250
85mm G-Master lens, f/1.8 aperture, chiaroscuro lighting, volumetric fog, golden rim lighting
Cyber-Dark background (90%), Slate tones (8%), Gold accents (max 2%)
High-end studio environment, hyper-realistic render, 3D geometric forms
Futuristic tech aesthetic, premium digital space, AI optimization symbolism
```

**Audit Pontok:**

- 90/8/2 színarány szigorú betartása
- 85mm G-Master optika és f/1.8 rekesz
- Volumetrikus köd és arany keretvilágítás
- Fizikai optikai pontosság

#### 2. Konverziós Copy (AEO-Ready)

**Termékleírás Sablon:**

```markdown
# [TERMÉK NEVE]

## Miért a WebDude.hu?

**26 év grafikai és 16 év webfejlesztői rutin** - minden termékünk a gyakorlati tapasztalatunkon alapul. Nem sablon-megoldások, hanem konverzió-optimalizált eszközök.

## Lighthouse Teljesítmény Előny

A WebDude.hu termékei a **Lighthouse Performance Section** elvei szerint vannak optimalizálva:

- Scroll-trigger-elt animációk
- 95+ Lighthouse score
- Gyors betöltés és interakció

## Entity-based SEO

A termékleírások **AI Answer Engine optimalizáltak**:

- Strukturált adatok (JSON-LD)
- FAQ blokkok
- E-E-A-T horgonyok

## Konverzió Fókusz

- Egyértelmű value proposition
- Azonnali CTA
- Social proof elemek
```

**Audit Pontok:**

- 26 év tapasztalat horgonyok
- Lighthouse előnyek kiemelése
- Entity-based SEO struktúra
- E-E-A-T bizalom jelek

#### 3. UI/UX Wireframe

**Termékoldal Struktúra:**

```
1. Hero Section
   - Hero vizuál (Midjourney v6)
   - Value proposition
   - Azonnali CTA

2. Social Proof
   - Ügyfélvélemények
   - Statisztikák (Lighthouse score, konverzió ráta)

3. Kínálat
   - Fájdalompontok kezelése
   - Megoldás bemutatása
   - Árazás és csomagok

4. FAQ Section
   - AEO-optimalizált kérdés-válasz blokkok
   - JSON-LD Schema

5. Erős CTA
   - Egyetlen, félreérthetetlen következő lépés
```

**Audit Pontok:**

- Scroll-trigger animációk
- LighthousePerformanceSection elvek
- 90/8/2 színarány
- Motion/react animációk

#### 4. Admin Felület Validáció

**Validációs Pontok:**

- "Get Data From Package" vs "Add Custom Data" konfiguráció ellenőrzése
- Invertálási hibák elkerülése
- Termék adatok integritása
- Deploy előtti ellenőrzés

---

## Cycle 169: Termék Audit Terv - Teljes Portfolio Optimalizáció

### Jelenlegi Termékek és Eszközök

| Termék ID | Név                      | Kategória               | Ár         | Értékelés | Státusz         |
| --------- | ------------------------ | ----------------------- | ---------- | --------- | --------------- |
| 1         | AI Workflow Starter Pack | AI Automatizáció        | 149.000 Ft | 4.9 (23)  | Audit szükséges |
| 2         | SEO & AEO Audit Pro      | SEO Optimalizálás       | 89.000 Ft  | 4.8 (47)  | Audit szükséges |
| 3         | CRO Booster Kit          | Konverzió Optimalizálás | 119.000 Ft | 4.7 (31)  | Audit szükséges |
| 4         | AI Chatbot Starter       | AI Megoldások           | 179.000 Ft | 4.9 (18)  | Audit szükséges |

### Audit Prioritás Sorrend (Konverzió Fókusz alapján)

1. **SEO & AEO Audit Pro** (Legmagasabb konverziós potenciál - 47 review)
2. **CRO Booster Kit** (Közvetlen konverzió optimalizáció - 31 review)
3. **AI Workflow Starter Pack** (AI automatizáció trend - 23 review)
4. **AI Chatbot Starter** (Niche megoldás - 18 review)

### Termék-Specifikus Audit Tervek

#### 1. SEO & AEO Audit Pro (Priority: HIGH)

**Vizuális Audit (Midjourney v6):**

```
SEO Audit Pro hero visualization for WebDude.hu add-on marketplace --v 6.0 --style raw --ar 16:9 --stylize 250
85mm G-Master lens, f/1.8 aperture, chiaroscuro lighting, volumetric fog, golden rim lighting
Cyber-Dark background (90%), Slate tones (8%), Gold accents (max 2%)
SEO dashboard interface with Lighthouse score graphs, keyword analysis charts, and schema.org JSON-LD visualization
High-end studio environment, hyper-realistic render, 3D geometric forms
Futuristic tech aesthetic, premium digital space, AI optimization symbolism
```

**Konverziós Copy (AEO-Ready):**

```markdown
# SEO & AEO Audit Pro

## Miért a WebDude.hu?

**26 év grafikai és 16 év webfejlesztői rutin** - minden auditunk a gyakorlati tapasztalatunkon alapul. Nem automatizált eszköz, hanem szakértői elemzés.

## Lighthouse Teljesítmény Előny

A WebDude.hu SEO Audit Pro a **Lighthouse Performance Section** elvei szerint van optimalizálva:

- 95+ Lighthouse score garancia
- Entity-based SEO implementáció
- AI Answer Engine optimalizáció

## Entity-based SEO

A SEO Audit Pro **AI Answer Engine optimalizált**:

- JSON-LD Schema implementáció
- AEO (Answer Engine Optimization) stratégia
- E-E-A-T bizalom jelek

## Konverzió Fókusz

- Technikai SEO audit
- Kulcsszó stratégia
- Versenytárs elemzés
```

**UI/UX Wireframe Struktúra:**

1. Hero Section (SEO Audit dashboard vizuál)
2. Social Proof (47 ügyfélvélemény, 4.9 rating)
3. Kínálat (Technikai SEO, AEO optimalizáció, JSON-LD, Lighthouse)
4. FAQ Section (SEO kérdések-válaszok)
5. Erős CTA ("Ingyenes SEO Audit")

**Admin Validáció:**

- "Get Data From Package" vs "Add Custom Data" konfiguráció
- SEO audit eszközök integritása
- Lighthouse score tracking

#### 2. CRO Booster Kit (Priority: HIGH)

**Vizuális Audit (Midjourney v6):**

```
CRO Booster Kit hero visualization for WebDude.hu add-on marketplace --v 6.0 --style raw --ar 16:9 --stylize 250
85mm G-Master lens, f/1.8 aperture, chiaroscuro lighting, volumetric fog, golden rim lighting
Cyber-Dark background (90%), Slate tones (8%), Gold accents (max 2%)
Conversion funnel visualization with A/B testing graphs, heatmap overlays, and user journey flowcharts
High-end studio environment, hyper-realistic render, 3D geometric forms
Futuristic tech aesthetic, premium digital space, conversion optimization symbolism
```

**Konverziós Copy (AEO-Ready):**

```markdown
# CRO Booster Kit

## Miért a WebDude.hu?

**26 év grafikai és 16 év webfejlesztői rutin** - minden CRO eszközünk a gyakorlati konverziós tapasztalatunkon alapul.

## Lighthouse Teljesítmény Előny

A WebDude.hu CRO Booster Kit a **Lighthouse Performance Section** elvei szerint van optimalizálva:

- Scroll-trigger animációk
- Gyors betöltés és interakció
- Konverzió funnel optimalizáció

## Entity-based SEO

A CRO Booster Kit **AI Answer Engine optimalizált**:

- Konverzió optimalizáció stratégia
- A/B tesztelés best practices
- User journey mapping

## Konverzió Fókusz

- A/B tesztelés sablonok
- Heatmap elemzés
- User journey optimalizáció
- Konverzió funnel tervezés
```

**UI/UX Wireframe Struktúra:**

1. Hero Section (Konverzió funnel vizuál)
2. Social Proof (31 ügyfélvélemény, 4.7 rating)
3. Kínálat (A/B tesztelés, Heatmap, User journey, Funnel)
4. FAQ Section (CRO kérdések-válaszok)
5. Erős CTA ("Ingyenes Konverzió Audit")

**Admin Validáció:**

- "Get Data From Package" vs "Add Custom Data" konfiguráció
- CRO eszközök integritása
- Konverzió tracking

#### 3. AI Workflow Starter Pack (Priority: MEDIUM)

**Vizuális Audit (Midjourney v6):**

```
AI Workflow Starter Pack hero visualization for WebDude.hu add-on marketplace --v 6.0 --style raw --ar 16:9 --stylize 250
85mm G-Master lens, f/1.8 aperture, chiaroscuro lighting, volumetric fog, golden rim lighting
Cyber-Dark background (90%), Slate tones (8%), Gold accents (max 2%)
AI workflow automation visualization with GPT-4 and Claude integration, email automation, and lead generation flows
High-end studio environment, hyper-realistic render, 3D geometric forms
Futuristic tech aesthetic, premium digital space, AI automation symbolism
```

**Konverziós Copy (AEO-Ready):**

```markdown
# AI Workflow Starter Pack

## Miért a WebDude.hu?

**26 év grafikai és 16 év webfejlesztői rutin** - minden AI workflow sablonunk a gyakorlati tapasztalatunkon alapul.

## Lighthouse Teljesítmény Előny

A WebDude.hu AI Workflow Starter Pack a **Lighthouse Performance Section** elvei szerint van optimalizálva:

- 10+ kész AI workflow sablon
- GPT-4 és Claude integráció
- 1 év ingyenes frissítés

## Entity-based SEO

A AI Workflow Starter Pack **AI Answer Engine optimalizált**:

- Prompt engineering best practices
- AI automatizáció stratégia
- Lead generation workflow

## Konverzió Fókusz

- Email automatizáció
- Lead generálás
- Ügyfélszolgálat AI rendszerek
```

**UI/UX Wireframe Struktúra:**

1. Hero Section (AI workflow automatizáció vizuál)
2. Social Proof (23 ügyfélvélemény, 4.9 rating)
3. Kínálat (10+ workflow, GPT-4/Claude, Prompt engineering, 1 év frissítés)
4. FAQ Section (AI workflow kérdések-válaszok)
5. Erős CTA ("Ingyenes AI Workflow Audit")

**Admin Validáció:**

- "Get Data From Package" vs "Add Custom Data" konfiguráció
- AI workflow eszközök integritása
- Prompt engineering validáció

#### 4. AI Chatbot Starter (Priority: MEDIUM)

**Vizuális Audit (Midjourney v6):**

```
AI Chatbot Starter hero visualization for WebDude.hu add-on marketplace --v 6.0 --style raw --ar 16:9 --stylize 250
85mm G-Master lens, f/1.8 aperture, chiaroscuro lighting, volumetric fog, golden rim lighting
Cyber-Dark background (90%), Slate tones (8%), Gold accents (max 2%)
AI chatbot interface visualization with Hungarian language support, custom knowledge base, and 24/7 customer service
High-end studio environment, hyper-realistic render, 3D geometric forms
Futuristic tech aesthetic, premium digital space, AI chatbot symbolism
```

**Konverziós Copy (AEO-Ready):**

```markdown
# AI Chatbot Starter

## Miért a WebDude.hu?

**26 év grafikai és 16 év webfejlesztői rutin** - minden AI chatbot rendszerünk a gyakorlati tapasztalatunkon alapul.

## Lighthouse Teljesítmény Előny

A WebDude.hu AI Chatbot Starter a **Lighthouse Performance Section** elvei szerint van optimalizálva:

- Magyar nyelvű AI chatbot
- Egyedi knowledge base
- 24/7 ügyfélszolgálat

## Entity-based SEO

A AI Chatbot Starter **AI Answer Engine optimalizált**:

- Weboldal integráció
- AI chatbot stratégia
- Ügyfélszolgálat automatizáció

## Konverzió Fókusz

- Magyar nyelv támogatás
- Egyedi knowledge base
- 24/7 ügyfélszolgálat
- Weboldal integráció
```

**UI/UX Wireframe Struktúra:**

1. Hero Section (AI chatbot interface vizuál)
2. Social Proof (18 ügyfélvélemény, 4.9 rating)
3. Kínálat (Magyar nyelv, Knowledge base, 24/7, Weboldal integráció)
4. FAQ Section (AI chatbot kérdések-válaszok)
5. Erős CTA ("Ingyenes Chatbot Audit")

**Admin Validáció:**

- "Get Data From Package" vs "Add Custom Data" konfiguráció
- AI chatbot eszközök integritása
- Knowledge base validáció

### Implementálási Ütemterv

| Hét | Termék                   | Fázis                   | Státusz  |
| --- | ------------------------ | ----------------------- | -------- |
| 1   | SEO & AEO Audit Pro      | Vizuális Audit + Copy   | Tervezés |
| 2   | SEO & AEO Audit Pro      | UI/UX Wireframe + Admin | Tervezés |
| 3   | CRO Booster Kit          | Vizuális Audit + Copy   | Tervezés |
| 4   | CRO Booster Kit          | UI/UX Wireframe + Admin | Tervezés |
| 5   | AI Workflow Starter Pack | Vizuális Audit + Copy   | Tervezés |
| 6   | AI Workflow Starter Pack | UI/UX Wireframe + Admin | Tervezés |
| 7   | AI Chatbot Starter       | Vizuális Audit + Copy   | Tervezés |
| 8   | AI Chatbot Starter       | UI/UX Wireframe + Admin | Tervezés |

---

## Cycle 172: Marketingkommunikáció és AEO/SEO Finomhangolás - Scale Ready Fázis

### Marketingkommunikáció Stratégia

**Cél:** Az új AI Műhely modulok bevezetése és a WebDude.hu Scale Ready állapotának kommunikációja.

**Közönség Szegmens:**

1. **Egyéni vállalkozók és kisvállalkozások** - AI automatizáció iránt érdeklődők
2. **Marketing szakemberek** - Grafikai és vizuális tervezés igényekkel
3. **Webfejlesztők és ügynökségek** - SEO/AEO optimalizálás és konverzió növelés
4. **Ingatlanbefektetők** - Kristófka Munkafolyamat specifikus célközönség

**Kommunikációs Üzenet (Core Message):**
"A WebDude.hu mostanra teljes egészében Scale Ready állapotba került. 13 termék, 9 AI Műhely modul, és egy teljes ökoszisztéma a számlázástól az AI Copilotig. 26 év tapasztalat, 95+ Lighthouse score, és prémium Cyber-Arany identitás."

### Első Célzott Hírlevél Sablon

**Tárgy:** 🚀 WebDude.hu Scale Ready - 9 új AI Műhely modul bevezetése

**Hírlevél Struktúra:**

1. **Hero Szekció:** Scale Ready bejelentés + 26 év tapasztalat horgony
2. **Új Modulok Bemutatása:** 9 AI Műhely modul rövid leírása
3. **Kategória Szegmens:** AI Automatizáció, SEO Optimalizálás, Konverzió Optimalizálás, AI Megoldások, AI Műhely
4. **CTA:** "Ingyenes Weboldal Audit" + "AI Műhely Demo"
5. **Social Proof:** 47+ vélemény, 4.9 értékelés, 95+ Lighthouse score

**AEO-Ready Hírlevél Sablon:**

```markdown
## WebDude.hu Scale Ready - 9 új AI Műhely modul bevezetése

### Miért a WebDude.hu?

**26 év grafikai és 16 év webfejlesztői rutin** - minden megoldásunk a gyakorlati tapasztalatunkon alapul. Nem automatizált eszköz, hanem szakértői rendszer.

### Új AI Műhely Modulok

**Kristófka Munkafolyamat** - Ingatlanbefektetői pitch generálás PDF alaprajzokból
**Banner AI Műhely** - Konverziófókuszú banner tervezés Midjourney v6 Master promptokkal
**Logo AI Műhely** - Egyedi arculattervezés és logo generálás
**Midjourney AI Műhely** - Midjourney v6 integráció prémium vizuálokhoz
**SEO Audit AI Műhely** - SEO és AEO audit vizualizáció AI eszközökkel
**Szezonalis AI Műhely** - Szezonalis grafikai kampányok AI eszközökkel
**Tartalomtervező AI Műhely** - Tartalom és vizuális tervezés AI eszközökkel
**UI/UX AI Műhely** - UI/UX design és wireframe generálás AI eszközökkel
**Versenytárs Elemző AI Műhely** - Versenytárs vizuális elemzés AI eszközökkel

### Lighthouse Teljesítmény Előny

A WebDude.hu minden terméke a **95+ Lighthouse score** alapú technikai alapokon nyugszik. Garantált teljesítmény és SEO optimalizáció.

### CTA

[Ingyenes Weboldal Audit] - 24 órán belül megkapod a weboldalad Lighthouse-tervét.
[AI Műhely Demo] - Próbáld ki az új AI Műhely modulokat.
```

### AEO/SEO Struktúrák Finomhangolása

**JSON-LD Schema Implementáció:**

- `Product` típusú schema minden termékoldalhoz
- `Service` típusú schema minden AI Műhely modulhoz
- `LocalBusiness` típusú schema a főoldalhoz
- `Person` típusú schema Norbi profiljához

**Meta Description Optimalizáció:**

- Minden termékoldal: 150-160 karakter, kulcsszó-optimalizált
- AI Műhely modulok: "AI Műhely" + modul név + fő funkció
- Eredeti termékek: kategória + termék név + fő előny

**Heading Hierarchia:**

- H1: Termék név (egyedi minden oldalon)
- H2: Funkciók, Miért a WebDude.hu, CTA
- H3: Funkció elemek
- H4: Alfunkciók és részletek

**Entity-based SEO:**

- E-E-A-T bizalom jelek (26 év tapasztalat, 16 év webfejlesztői rutin)
- Lighthouse score horgonyok (95+ score)
- Social proof horgonyok (47+ vélemény, 4.9 értékelés)

### Implementálási Ütemterv

| Hét | Feladat                                     | Státusz  |
| --- | ------------------------------------------- | -------- |
| 1   | Marketingkommunikáció stratégia kidolgozása | Tervezés |
| 2   | Első célzott hírlevél sablon készítése      | Tervezés |
| 3   | AEO/SEO struktúrák finomhangolása           | Tervezés |
| 4   | JSON-LD Schema implementáció                | Tervezés |
| 5   | Meta Description optimalizáció              | Tervezés |
| 6   | Heading hierarchia ellenőrzés               | Tervezés |
| 7   | Entity-based SEO validáció                  | Tervezés |
| 8   | Hírlevél küldés és mérés                    | Tervezés |

---

## Audit Protokoll

Minden generált anyag az alábbi audit-folyamaton megy keresztül:

| Audit Pont | WebDude Szabvány                              |
| ---------- | --------------------------------------------- |
| Színarány  | Szigorú 90/8/2 elosztás (Arany limitált)      |
| Optika     | --style raw + fizikai optika (pl. 85mm f/1.8) |
| Struktúra  | Tailwind v4 (gap-8, p-12) kódblokkban         |
| E-E-A-T    | Bizalmi horgonyok (pl. "26 év tapasztalat")   |
