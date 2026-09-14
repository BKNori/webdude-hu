# Groq API Környezeti Változók
> **Verzió:** v1.0  
> **Dátum:** 2026-08-12  
> **Leírás:** Groq API integráció környezeti változók

---

## 🔑 KÖRNYEZETI VÁLTOZÓK

### GROQ_API_KEY
Groq API kulcs az AI generálásokhoz.

**Hol szerezhető:** https://console.groq.com/keys

**Hogyan kell beállítani:**
```bash
# .env.local fájlba
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Használat:**
- `src/app/actions/createGeneration.ts` — Server Action alapú AI generálás
- Groq Llama3-70B modell használata

---

## 📝 MEGJEGYZÉSEK

- Groq API jelenleg ingyenes (Spark csomag)
- Llama3-70B-8192 modell: gyors és ingyenes
- Nincs szükség Firebase Blaze csomagra
- Server Action alapú, nincs Cloud Functions timeout

---

## 🚀 DEPLOY UTASÍTÁSOK

1. **Környezeti változó beállítása:**
   ```bash
   # .env.local fájl létrehozása
   GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

2. **Build ellenőrzés:**
   ```bash
   npm run build
   ```

3. **Deploy:**
   ```bash
   firebase deploy --only hosting
   ```

---

## 📝 CHANGELOG

- **v1.0 (2026-08-12):** Groq API integráció dokumentáció
