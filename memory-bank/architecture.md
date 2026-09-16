# Architektúra és Komponens Regiszter (WebDude OS Enterprise)

> **AI DIREKTÍVA:** Ez a dokumentum a projekt architektúrális döntéseinek egyedüli forrása (SSOT)[cite: 20]. Minden új UI komponens (Organism, Molecule), Firestore kollekció vagy Route létrehozásakor KÖTELEZŐ ezt a fájlt frissítened, hogy a tudásbázis naprakész maradjon[cite: 20].

## 1. Mappastruktúra (Next.js 16 App Router)
A projekt szigorúan a `src/` könyvtárra épül. A Pages Router használata tilos. Dizájn SSOT: `_docs/DESIGN_SYSTEM.md` v7.0 (Kék-Lila, arany tiltva).

```text
src/
├── app/                  # App Router (Route-ok, Layoutok, API végpontok)
│   ├── (marketing)/      # Publikus oldalak (Főoldal, Szolgáltatások, Hírek)
│   ├── portal/           # Zárt ügyfélportál és AI Műhelyek
│   └── api/              # Webhookok (pl. Stripe) és külső végpontok
├── components/           # KIZÁRÓLAG Atomic Design struktúrában!
│   ├── atoms/            # Alapelemek (Gombok, Inputok, Badge-ek)
│   ├── molecules/        # Összetett elemek (Kártyák, Form mezők)
│   └── organisms/        # Teljes szekciók (Hero, Footer, Grid rendszerek)
├── lib/                  # Segédfüggvények (Logger, Firebase Config, Timeline)
├── actions/              # Next.js Server Actions (Adatbázis írás/olvasás)
├── types/                # TypeScript Interface-ek és Típusok
└── content/              # MDX Blog bejegyzések