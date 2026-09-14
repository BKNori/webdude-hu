# Firebase Cloud Functions Deploy Utasítások
> **Verzió:** v1.0  
> **Dátum:** 2026-08-12  
> **Leírás:** Cloud Functions Queue Processor deploy előkészítése

---

## 🚀 DEPLOY UTASÍTÁSOK

### 1. Firebase CLI telepítése (ha még nincs)
```bash
npm install -g firebase-tools
```

### 2. Firebase login
```bash
firebase login
```

### 3. Firestore Security Rules deploy
```bash
firebase deploy --only firestore:rules
```

### 4. Cloud Functions deploy
```bash
firebase deploy --only functions
```

---

## 📋 ELŐFELTÉTELEK

- Firebase projekt létrehozva és konfigurálva
- `firebase.json` fájl konfigurálva
- `functions/` mappa inicializálva és build-elve
- Firestore Security Rules frissítve

---

## 🔧 KONFIGURÁCIÓ

### firebase.json
```json
{
  "functions": {
    "source": "functions",
    "runtime": "nodejs18"
  },
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  }
}
```

---

## ✅ VALIDÁCIÓ

Deploy után ellenőrizd:
1. Cloud Functions konzolban a `processGenerationQueue` függvény aktív-e
2. Firestore Security Rules frissítve-e
3. Trigger működik-e (új user_generations dokumentum létrehozásakor)

---

## 🐛 HIBAELHÁRÍTÁS

### Build hiba
```bash
cd functions
npm run build
```

### Deploy hiba
```bash
firebase deploy --only functions --debug
```

### Logs ellenőrzés
```bash
firebase functions:log
```

---

## 📝 CHANGELOG

- **v1.0 (2026-08-12):** Queue Processor implementáció és deploy előkészítés
