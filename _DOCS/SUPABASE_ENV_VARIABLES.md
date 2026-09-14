# Supabase Környezeti Változók
> **Verzió:** v1.0  
> **Dátum:** 2026-08-09  
> **Leírás:** Supabase migrációhoz szükséges környezeti változók dokumentációja

---

## 🔐 KÖTELEZŐ KÖRNYEZETI VÁLTOZÓK

A webdude.hu Supabase migrációjához a következő környezeti változókat kell beállítani a `.env.local` fájlban:

### Supabase Alapbeállítások

```bash
# Supabase URL és Anon Key (publikus, kliensoldal)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Supabase Service Role Key (KIZÁRÓLAG szerveroldalon, SOHA nem kerül git-be!)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### LLM API Kulcsok (6-Ágensű Multi-Agent Pipeline)

```bash
# Gemini 1.5 Pro (B2B Client Persona Simulator)
GEMINI_API_KEY=your-gemini-api-key-here

# Anthropic Claude 3.5 Sonnet (Copywriter, Creative Director, Programmer)
ANTHROPIC_API_KEY=your-anthropic-api-key-here

# OpenAI GPT-4o (SEO/AEO Optimizer, Auditor)
OPENAI_API_KEY=your-openai-api-key-here
```

---

## 📋 BESZERZÉSI UTASÍTÁSOK

### 1. Supabase Kulcsok Beszerzése

1. Lépj be a [Supabase Dashboard](https://supabase.com/dashboard)-ra
2. Válaszd ki a projektet
3. Menj a **Settings > API** oldalra
4. Másold ki a következőket:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

### 2. LLM API Kulcsok Beszerzése

**Gemini API Key:**
1. Lépj be a [Google AI Studio](https://makersuite.google.com/)-ba
2. Hozz létre új API kulcsot
3. Másold ki → `GEMINI_API_KEY`

**Anthropic API Key:**
1. Lépj be az [Anthropic Console](https://console.anthropic.com/)-ba
2. Hozz létre új API kulcsot
3. Másold ki → `ANTHROPIC_API_KEY`

**OpenAI API Key:**
1. Lépj be az [OpenAI Platform](https://platform.openai.com/)-ra
2. Hozz létre új API kulcsot
3. Másold ki → `OPENAI_API_KEY`

---

## ⚠️ BIZTONSÁGI FIGYELMEZTETÉSEK

- **SUPABASE_SERVICE_ROLE_KEY:** SOHA nem kerülhet git-be, SOHA nem kerülhet frontend kódba
- **LLM API Kulcsok:** SOHA nem kerülhetnek git-be, kizárólag szerveroldalon használhatók
- **.env.local:** Mindig a `.gitignore` fájlban legyen

---

## 🚀 DEPLOY ELŐTTI CHECKLIST

- [ ] `.env.local` fájl létrehozva és kitöltve
- [ ] Minden szükséges API kulcs hozzáadva
- [ ] Supabase projekt létrehozva és konfigurálva
- [ ] SQL migrációs szkriptek lefuttatva a Supabase-ben
- [ ] Edge Functions deploy-olva a Supabase-ben
- [ ] `.env.local` nem került git-be

---

## 📝 MIGRÁCIÓS UTASÍTÁSOK

### 1. SQL Migrációk Lefuttatása

```bash
# Supabase CLI telepítése (ha még nincs)
npm install -g supabase

# Supabase projekt inicializálása
supabase init

# SQL migrációk lefuttatása
supabase db push
```

### 2. Edge Functions Deploy

```bash
# Edge Functions deploy
supabase functions deploy multi-agent-chaining-v2
```

### 3. Környezeti Változók Beállítása Supabase-ben

```bash
# Edge Functions környezeti változók beállítása
supabase secrets set GEMINI_API_KEY your-gemini-api-key-here
supabase secrets set ANTHROPIC_API_KEY your-anthropic-api-key-here
supabase secrets set OPENAI_API_KEY your-openai-api-key-here
```

---

*SUPABASE_ENV_VARIABLES.md v1.0 — webdude.hu | Karbantartó: Norbi (WebDude)*
