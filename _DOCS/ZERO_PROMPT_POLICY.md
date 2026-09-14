# Zero-Prompt Policy és Szoftverpáncél - Firebase Implementáció
> **Rendszer:** webdude.hu B2B SaaS Platform  
> **Verzió:** v1.0  
> **Dátum:** 2026-08-09  
> **Prioritás:** P0 (Kritikus biztonsági intézkedés)

---

## 🎯 ZERO-PROMPT POLICY DEFINÍCIÓ

**Alapvető szabály:** A nyers promptok és rendszerutasítások soha nem kerülhetnek a frontend kódba. Csak a JSON bemeneti változókat kezeljük a kliensoldalon, a promptok összefűzése a háttérben, védett környezetben történik.

---

## 🏗️ ARCHITEKTÚRA

### 1. Firestore Kollekciók

**private_prompts Kollekció:**
- Rendszerutasítások és prompt sablonok tárolása
- Kizárólag service_role jogosultsággal olvasható
- Frontend számára elérhetetlen

**users Kollekció:**
- Felhasználói jogosultságok és token fogyasztás
- UPDATE jogok letiltva a frontend számára

---

## 📊 DATABASE SCHEMA

### private_prompts Kollekció

```typescript
interface PrivatePrompt {
  id: string;
  slug: string; // Egyedi azonosító (pl. "banner-ai-muhely-prompt")
  category: string; // "workflow", "system", "validation"
  prompt: string; // A nyers prompt tartalma
  version: number; // Verziókövetés
  isActive: boolean; // Aktív/inaktív státusz
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

---

## 🔧 TECHNIKAI IMPLEMENTÁCIÓ

### 1. Firestore Security Rules

**Fájl:** `firestore.rules`

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // private_prompts kollekció - KIZÁRÓLAG service_role
    match /private_prompts/{docId} {
      // Senki sem olvashatja a frontendből
      allow read: if false;
      // Senki sem írhatja a frontendből
      allow write: if false;
    }
    
    // users kollekció - Szigorú írásvédelem
    match /users/{userId} {
      // Olvasás: csak a saját profil
      allow read: if request.auth != null && 
                     request.auth.uid == userId;
      
      // Írás: KIZÁRÓLAG backend (Cloud Functions / Server Actions)
      allow write: if false;
    }
    
    // user_generations kollekció - Aszinkron generálások
    match /user_generations/{docId} {
      // Olvasás: csak a saját generálások
      allow read: if request.auth != null && 
                     request.auth.uid == resource.data.userId;
      
      // Írás: csak a saját generálások létrehozása
      allow create: if request.auth != null && 
                      request.auth.uid == request.resource.data.userId;
      
      // Frissítés: csak a rendszer (service role)
      allow update: if false;
      
      // Törlés: csak a saját generálások
      allow delete: if request.auth != null && 
                      request.auth.uid == resource.data.userId;
    }
  }
}
```

### 2. Server Action - Prompt Lekérés

**Fájl:** `src/app/actions/getPrivatePrompt.ts`

```typescript
'use server';

import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export async function getPrivatePrompt(slug: string) {
  try {
    if (!db) {
      throw new Error('Firebase nincs inicializálva');
    }

    const promptDoc = await getDoc(doc(db, 'private_prompts', slug));
    
    if (!promptDoc.exists()) {
      throw new Error('Prompt nem található');
    }

    const data = promptDoc.data();
    
    if (!data.isActive) {
      throw new Error('Prompt inaktív');
    }

    return {
      success: true,
      prompt: data.prompt,
      version: data.version,
    };
  } catch (error) {
    console.error('Hiba a prompt lekérésekor:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Ismeretlen hiba',
    };
  }
}
```

### 3. Prompt Builder Utility

**Fájl:** `src/lib/promptBuilder.ts`

```typescript
import { getPrivatePrompt } from '@/app/actions/getPrivatePrompt';

export async function buildPrompt(
  slug: string,
  variables: Record<string, string>
): Promise<string> {
  const result = await getPrivatePrompt(slug);
  
  if (!result.success) {
    throw new Error(result.error);
  }

  let prompt = result.prompt;
  
  // Változók behelyettesítése
  Object.entries(variables).forEach(([key, value]) => {
    prompt = prompt.replace(`{{${key}}}`, value);
  });

  return prompt;
}
```

---

## 🛡️ BIZTONSÁGI INTÉZKEDÉSEK

### 1. Input Sanitizáció

```typescript
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // XSS védelem
    .replace(/['"]/g, '') // SQL injection védelem
    .trim();
}
```

### 2. Rate Limiting

```typescript
export async function checkRateLimit(userId: string): Promise<boolean> {
  // Napi limit ellenőrzése
  const today = new Date().toISOString().split('T')[0];
  const userDoc = await getDoc(doc(db, 'users', userId));
  
  if (!userDoc.exists()) {
    return false;
  }

  const userData = userDoc.data();
  const dailyUsage = userData.dailyUsage || {};
  const todayUsage = dailyUsage[today] || 0;
  
  return todayUsage < 3; // Napi 3 ingyenes generálás
}
```

---

## 📈 PERFORMANCE MÉRIKÖK

- **Prompt Lekérés:** < 100ms
- **Prompt Build:** < 50ms
- **Rate Limit Check:** < 50ms
- **Összesített Latency:** < 200ms

---

## 🚀 DEPLOYMENT UTASÍTÁSOK

1. **Firestore Rules Deploy:**
   ```bash
   firebase deploy --only firestore:rules
   ```

2. **Initial Data Seed:**
   - private_prompts kollekció feltöltése
   - Rendszerutasítások importálása

---

## 📝 CHANGELOG

- **v1.0 (2026-08-09):** Zero-Prompt Policy architektúra tervezet és dokumentáció létrehozva
