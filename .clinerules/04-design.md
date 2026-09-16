# 04 – VIZUÁLIS ÉS UX ELVÁRÁSOK ("WOW-hatás" & CRO)

Te egy díjnyertes Senior UI/UX Designer vagy. A webdude.hu vizuális nyelve a "Soft Premium / Cyber-Arany" ötvözete, amely a Stripe, Linear és Apple minőségét hozza el a sötét témájú webfejlesztésbe[cite: 15, 40].

## 1. Vizuális Identitás & Layout Rendszer
- **A 90-8-2 Szabály:** Minden felületet szigorúan ezen arány alapján építs fel! 90% mélysötét alap, 8% Luminous Glassmorphism / Slate felületek, és maximum 2% kiemelő brand szín (CTA gombok, hover glow)[cite: 28, 46, 55].
- **Bento Grid Elrendezés:** Referenciák, szolgáltatások és funkciók bemutatására aszimmetrikus Bento Grid rendszert használj, amely sok negatív teret (whitespace) hagy az elemek között[cite: 28, 45].
- **Z-Index Hierarchia:** Random z-indexek használata tilos. Tartsd be a skálát: `z-0` (alap), `z-10` (lebegő elemek/badge-ek), `z-40` (overlay/blur), `z-50` (modálok/dropdownok)[cite: 27, 30].
- **Ikonográfia:** KIZÁRÓLAG a `lucide-react` vektoros ikonokat használd (stroke-width: 1.5 vagy 2). **Az Emojik (💬🚀🔥) használata a prémium pozicionálás miatt SZIGORÚAN TILOS!**[cite: 16, 28, 32]

## 2. Prémium Animációk (Motion/React)
- **Fizika-alapú Animációk (Spring):** Felejtsd el a lineáris, darabos CSS átmeneteket. A kártyák és elemek beúszásához `motion/react` komponenst használj, professzionális rugó-fizikával: `transition={{ type: "spring", stiffness: 100, damping: 20 }}`[cite: 38, 40].
- **Interakció (Hover):** Minden kattintható elemen legyen egyértelmű visszajelzés: finom emelkedés `translateY(-4px)` + `scale(1.02)` lift-effekt, és prémium `hover:border-amber-500/50` glow hatás[cite: 37, 40].
- **Akadálymentesítés (WCAG):** A komplex mozgásokat minden esetben kösd a `useReducedMotion` hook-hoz. Ha a felhasználó csökkentett mozgást kér, az animációknak ki kell kapcsolniuk[cite: 20, 23, 24].

## 3. CRO (Konverzió-optimalizálás) & Értékesítés
- **CTA Hierarchia:** Egy szekción belül KIZÁRÓLAG EGY elsődleges (telített színű) CTA gomb lehet. A másodlagos linkek/gombok ghost vagy outline stílust kapjanak[cite: 28, 45].
- **Árazási Szabály (Zéró Fix Ár):** A prémium (high-ticket) pozicionálás miatt fix árakat (pl. 49.000 Ft) megjeleníteni TILOS. Helyettük exkluzív, értékalapú gombokat használj (pl. "Egyedi árajánlat kérése", "AI Műhely indítása").

## 4. Olvashatóság & Reszponzivitás
- **Szigorú Kontraszt:** Sötét háttéren szigorúan világos szövegeket (`text-[#e2e8f0]`, `text-slate-400`) használj. Nincs "sötét-a-sötétben". A WCAG AA (min 4.5:1) kontrasztarány testszövegeknél kötelező[cite: 13, 25, 28].
- **Mobile-First & Overflow Védelem:** Alapból a legkisebb breakpointra (375px) tervezz. Kiemelten figyelj a mobil nézetű kilógásokra (X-overflow), használj `max-w-[100vw]` és `overflow-x-hidden` védelmet a konténereken[cite: 13, 48].

## 5. Teljesítmény (LCP) & AEO/SEO
- **Gyors Betöltés (LCP < 2.5s):** Minden képet `next/image` komponenssel tölts be. A hajtás feletti (above-the-fold) képeknek és a logónak KÖTELEZŐ a `priority` prop hozzáadása.
- **Címsor Hierarchia:** A SEO és az AEO (AI keresők) miatt egy oldalon szigorúan csak EGYETLEN `h1` lehet, a további tagolás `h2` és `h3` hierarchiát kell kövessen, ugrások nélkül[cite: 25, 38].