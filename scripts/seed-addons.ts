import fs from 'fs';
import path from 'path';
import { initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// 1. Manually parse .env.local to load configuration variables
function loadEnvLocal() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    console.log('Loading configuration from .env.local...');
    const content = fs.readFileSync(envPath, 'utf8');
    content.split('\n').forEach(line => {
      const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)$/);
      if (match) {
        const key = match[1].trim();
        let val = match[2].trim();
        if (val.startsWith('"') && val.endsWith('"')) {
          val = val.substring(1, val.length - 1);
        } else if (val.startsWith("'") && val.endsWith("'")) {
          val = val.substring(1, val.length - 1);
        }
        process.env[key] = val;
      }
    });
  } else {
    console.warn('.env.local file not found at project root.');
  }
}

loadEnvLocal();

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
if (!projectId) {
  console.error('CRITICAL: NEXT_PUBLIC_FIREBASE_PROJECT_ID is not configured.');
  process.exit(1);
}

// 2. Initialize Firebase Admin SDK
const apps = getApps();
if (!apps.length) {
  console.log(`Initializing Firebase Admin for project: ${projectId}`);
  initializeApp({
    projectId: projectId,
  });
}

const db = getFirestore();

// 3. Define the products catalog (5 core items + 1 bonus premium assistant)
const ADDONS_CATALOG = [
  {
    id: 'addon_ux_roast',
    title: '15 perces UX/UI Roast & Konverziós Diagnosztika',
    description: 'Személyre szabott, kíméletlenül őszinte videós elemzés a weboldalad legkritikusabb dizájn-, használhatósági és eladási hibáiról, amelyek elüldözik a látogatóidat.',
    price: 25000,
    type: 'one-time',
    category: 'design',
    features: [
      '15+ perc tömény, gyakorlatias videós elemzés',
      '3 azonnal végrehajtható konverzió-növelő javaslat',
      'Mobil- és reszponzivitás audit (UX/UI)',
      'Friction-point és kosárelhagyási pontok azonosítása',
      'Írott összefoglaló akciótervvel a videó mellé'
    ],
    stripePriceId: process.env.STRIPE_PRICE_UX_ROAST || 'price_ux_roast_mock',
  },
  {
    id: 'addon_speed_opt',
    title: 'Lighthouse Google Speed & Core Web Vitals Optimalizálás',
    description: 'A betöltési sebesség drasztikus növelése és a Google PageSpeed Insights pontok feltornázása a 90-95+ tartományba a jobb keresőoptimalizálási helyezésekért.',
    price: 49000,
    type: 'one-time',
    category: 'tech',
    features: [
      'Betöltési idő leszorítása 1.5 másodperc alá',
      'Core Web Vitals (LCP, FID, CLS, INP) zöld zónába állítása',
      'Képtömörítés, modern WebP/AVIF konverzió',
      'CSS/JS kódminőség tisztítás és deferálás',
      'Szerveroldali gyorsítótárazás és adatbázis optimalizálás'
    ],
    stripePriceId: process.env.STRIPE_PRICE_SPEED_OPT || 'price_speed_opt_mock',
  },
  {
    id: 'addon_seo_article',
    title: 'Prémium AI + Emberi Hibrid SEO Szakcikk & AEO Optimalizálás',
    description: 'Olyan mélyreható iparági szakcikk, amely a legújabb keresési trendek alapján készül, és kiválóan rangsorol mind a Google-ben, mind a modern AI válaszgépeken (AEO).',
    price: 15000,
    type: 'one-time',
    category: 'ai',
    features: [
      'Részletes versenytárs- és kulcsszókutatás',
      '1500-2000 szó közötti szakmai terjedelem',
      'AI válaszgépek (Gemini, ChatGPT) számára optimalizált szerkezet',
      'SEO-barát meta tagok, alt szövegek és belső linkstruktúra',
      'Jogtiszta, prémium illusztráció a cikkhez'
    ],
    stripePriceId: process.env.STRIPE_PRICE_SEO_ARTICLE || 'price_seo_article_mock',
  },
  {
    id: 'addon_cro_audit',
    title: 'Landing Page Konverziós Audit & Copywriting Finomhangolás',
    description: 'Átfogó CRO (Conversion Rate Optimization) elemzés, amely során átvilágítjuk a szövegezést, a CTA gombokat és az elrendezést a maximális értékesítés eléréséhez.',
    price: 35000,
    type: 'one-time',
    category: 'cro',
    features: [
      'Hőtérképes és egérkövetési elemzési terv',
      'CRO Copywriting - az értékesítési szöveg újraírása',
      'A/B tesztelési stratégia kidolgozása a főoldalra',
      'CTA (Call-to-Action) elhelyezések optimalizálása',
      'Konverziós tölcsér és űrlapok egyszerűsítése'
    ],
    stripePriceId: process.env.STRIPE_PRICE_CRO_AUDIT || 'price_cro_audit_mock',
  },
  {
    id: 'addon_security_pack',
    title: '🛡️ WebDude Prémium Biztonsági Csomag & Kiber-páncél (1 év)',
    description: 'Komplex védelmi rendszer weboldalad számára: automata tűzfal, napi kártevő-vizsgálat, brute-force védelem és heti biztonsági mentések külső szerverre.',
    price: 60000,
    type: 'one-time',
    category: 'tech',
    features: [
      'Aktív, valós idejű biztonsági tűzfal (WAF)',
      'Napi automatikus malware és vírus scannelés',
      'Brute-force és XML-RPC támadások blokkolása',
      'Heti rendszeres mentés titkosított felhőtárhelyre',
      'Azonnali helyreállítási garancia fertőzés esetén'
    ],
    stripePriceId: process.env.STRIPE_PRICE_SECURITY_PACK || 'price_security_pack_mock',
  },
  {
    id: 'addon_ai_chatbot',
    title: '🤖 Egyedi AI Chatbot Asszisztens & Lead Minősítő Integráció',
    description: 'Egyedi stílusú, saját tudásbázisodra (szolgáltatásaid, áraid, FAQ) betanított mesterséges intelligencia alapú chatbot, amely 24/7-ben kiszolgálja a látogatókat.',
    price: 120000,
    type: 'one-time',
    category: 'ai',
    features: [
      'Saját céges tudásbázisra betanított GPT-modell',
      'Weboldaladba simuló, egyedi márkázott chat widget',
      'Automata lead-generálás és kapcsolati adatok gyűjtése',
      'Integrált válaszadási stílus és hangnem beállítás',
      'Havi statisztika a chat beszélgetésekről és leadekről'
    ],
    stripePriceId: process.env.STRIPE_PRICE_AI_CHATBOT || 'price_ai_chatbot_mock',
  }
];

async function seed() {
  console.log('Starting Firestore Add-ons seeding...');
  
  for (const item of ADDONS_CATALOG) {
    try {
      const docRef = db.collection('addons').doc(item.id);
      await docRef.set(item);
      console.log(`Successfully seeded Add-on: ${item.id} (${item.title})`);
    } catch (err) {
      console.error(`Failed to seed Add-on ${item.id}:`, err);
    }
  }
  
  console.log('Seeding completed successfully.');
}

seed();
