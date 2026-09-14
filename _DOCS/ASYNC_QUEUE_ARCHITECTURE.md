# Aszinkron Queue Architektúra - Firebase Cloud Functions
> **Rendszer:** webdude.hu B2B SaaS Platform  
> **Verzió:** v1.0  
> **Dátum:** 2026-08-09  
> **Prioritás:** P0 (Kritikus infrastruktúra)

---

## 🎯 PROBLÉMA DEFINÍCIÓ

A jelenlegi szinkron HTTP hívások és AI modellek láncolása rendszeresen túllépi a Next.js API Routes és Firebase Cloud Functions időkorlátait (150s timeout limit), ami összeomláshoz és "zombi képernyőkhöz" vezet.

---

## 🏗️ MÉRNÖKI MEGOLDÁS

### 1. Firestore-alapú Aszinkron Queue

**Kollekciók:**
- `user_generations` - Generálási feladatok állapotkövetése
- `generation_queue` - Aszinkron feladat sor

**Státuszok:**
- `pending` - Feladat létrehozva, várakozik feldolgozásra
- `processing` - Feldolgozás alatt
- `completed` - Sikeresen befejezve
- `failed` - Hiba történt

---

## 📊 DATABASE SCHEMA

### user_generations Kollekció

```typescript
interface UserGeneration {
  id: string;
  userId: string;
  workflowId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  inputParams: Record<string, any>;
  outputResult?: any;
  errorMessage?: string;
  tokensUsed: number;
  estimatedCostUsd: number;
  executionTimeMs: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  completedAt?: Timestamp;
}
```

---

## 🔧 TECHNIKAI IMPLEMENTÁCIÓ

### 1. Firebase Cloud Functions - Queue Processor

**Fájl:** `functions/src/queueProcessor.ts`

```typescript
import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { Firestore } from 'firebase-admin/firestore';
import * as admin from 'firebase-admin';

export const processGenerationQueue = onDocumentCreated(
  'user_generations/{docId}',
  async (event) => {
    const snapshot = event.data;
    if (!snapshot) return;

    const data = snapshot.data();
    const db = admin.firestore();

    // Státusz frissítése: processing
    await snapshot.ref.update({
      status: 'processing',
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    try {
      // AI feldolgozás (6-ágensű láncolat)
      const result = await processAIWorkflow(data);
      
      // Státusz frissítése: completed
      await snapshot.ref.update({
        status: 'completed',
        outputResult: result,
        completedAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    } catch (error) {
      // Státusz frissítése: failed
      await snapshot.ref.update({
        status: 'failed',
        errorMessage: error.message,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    }
  }
);
```

### 2. React Fast Polling Hook

**Fájl:** `src/hooks/useGenerationPolling.ts`

```typescript
import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export function useGenerationPolling(generationId: string) {
  const [status, setStatus] = useState<'pending' | 'processing' | 'completed' | 'failed'>('pending');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, 'user_generations', generationId),
      (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setStatus(data.status);
          setResult(data.outputResult);
          setError(data.errorMessage);
        }
      }
    );

    return () => unsubscribe();
  }, [generationId]);

  return { status, result, error };
}
```

---

## 🎨 UX/UI KOMPONENSEK

### GenerationSkeleton Komponens

**Fájl:** `src/components/atoms/GenerationSkeleton.tsx`

```typescript
import { motion } from 'motion/react';

export function GenerationSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-bg-surface border border-bg-elevated rounded-2xl p-8"
    >
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-bg-elevated rounded w-3/4" />
        <div className="h-4 bg-bg-elevated rounded w-1/2" />
        <div className="h-4 bg-bg-elevated rounded w-5/6" />
      </div>
      <p className="text-text-secondary mt-4 text-sm">
        AI dolgozik...
      </p>
    </motion.div>
  );
}
```

---

## 📈 PERFORMANCE MÉRIKÖK

- **LCP (Largest Contentful Paint):** < 2.5s
- **CLS (Cumulative Layout Shift):** < 0.1
- **Polling Interval:** 1.5 másodperc
- **Timeout Limit:** 35 másodperc (kliensoldal)

---

## 🛡️ BIZTONSÁGI INTÉZKEDÉSEK

1. **Firestore Security Rules:**
   - `user_generations` kollekció RLS védelem
   - Csak a saját generálások olvashatók

2. **Rate Limiting:**
   - Napi 3 ingyenes generálás
   - Pro csomag: korlátlan

3. **Error Handling:**
   - Automatikus újrapróbálkozás (max 3x)
   - Human-readable hibaüzenetek

---

## 🚀 DEPLOYMENT UTASÍTÁSOK

1. **Firebase Functions inicializálása:**
   ```bash
   firebase init functions
   ```

2. **Dependencies telepítése:**
   ```bash
   cd functions
   npm install firebase-admin firebase-functions
   ```

3. **Deploy:**
   ```bash
   firebase deploy --only functions
   ```

---

## 📝 CHANGELOG

- **v1.0 (2026-08-09):** Architektúra tervezet és dokumentáció létrehozva
