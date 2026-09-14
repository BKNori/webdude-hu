# WebDude Munka-Logoló Rendszer - Firestore Schema

## Tábla Struktúra

### 0. `incoming_tasks` - Bejövő feladatok tábla (Gyors-rögzítő)

```typescript
{
  id: string (auto-generated)
  client_id: string (referencia a users vagy clients kollekcióra)
  task_description: string
  status: 'pending' | 'in_progress' | 'done'
  email_url: string
  created_at: timestamp (Firebase serverTimestamp())
  due_date: timestamp (opcionális)
  is_critical: boolean (opcionális - sürgős feladat jelölés)
}
```

### 1. `clients` - Ügyfelek tábla

```typescript
{
  id: string (auto-generated)
  name: string (pl. "Műláb Műhely", "Hu-Mago Kft.")
  email: string (pl. "info@mulab.hu")
  phone: string (opcionális)
  notes: string (opcionális)
  created_at: timestamp
  updated_at: timestamp
}
```

### 2. `projects` - Projektek tábla

```typescript
{
  id: string (auto-generated)
  client_id: string (reference to clients)
  name: string (pl. "Weboldal fejlesztés", "Arculattervezés")
  description: string (opcionális)
  status: string ('pending', 'in-progress', 'completed', 'on-hold')
  priority: string ('low', 'medium', 'high', 'urgent')
  start_date: timestamp (opcionális)
  due_date: timestamp (opcionális)
  created_at: timestamp
  updated_at: timestamp
}
```

### 3. `work_logs` - Munka-logok tábla

```typescript
{
  id: string (auto-generated)
  project_id: string (reference to projects)
  client_id: string (reference to clients)
  task_description: string
  status: string ('pending', 'in-progress', 'done')
  email_reference: string (opcionális - e-mail URL)
  time_spent: number (opcionális - percben)
  notes: string (opcionális)
  created_at: timestamp
  updated_at: timestamp
  due_date: timestamp (opcionális)
  is_critical: boolean (opcionális - sürgős feladat jelölés)
}
```

### 4. `tasks` - Feladatok tábla (projekten belüli részfeladatok)

```typescript
{
  id: string (auto-generated)
  project_id: string (reference to projects)
  title: string
  description: string (opcionális)
  status: string ('todo', 'in-progress', 'done')
  priority: string ('low', 'medium', 'high')
  assigned_to: string (opcionális - user ID)
  due_date: timestamp (opcionális)
  created_at: timestamp
  updated_at: timestamp
}
```

## Firestore Indexek

### work_logs collection

- Composite index: `status` (ASC) + `due_date` (ASC) - "Mai határidős" szűréshez
- Composite index: `project_id` (ASC) + `created_at` (DESC) - projekten belüli munka-logokhoz
- Composite index: `client_id` (ASC) + `created_at` (DESC) - ügyfél alapú szűréshez

### projects collection

- Composite index: `client_id` (ASC) + `status` (ASC) - ügyfél projektjeihez
- Composite index: `status` (ASC) + `due_date` (ASC) - határidős projektekhez

## Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Csak hitelesített felhasználók
    match /{document=**} {
      allow read, write: if request.auth != null;
    }

    // Ügyfelek
    match /clients/{clientId} {
      allow read, write: if request.auth != null;
    }

    // Projektek
    match /projects/{projectId} {
      allow read, write: if request.auth != null;
    }

    // Munka-logok
    match /work_logs/{workLogId} {
      allow read, write: if request.auth != null;
    }

    // Feladatok
    match /tasks/{taskId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## AI Integráció Tervezés

### E-mail Feldolgozás

- AI prompt: "Írd ki az e-mailből a feladatot, az ügyfél nevét és linkeld be az e-mailt a Supabase táblámba"
- Context: WebDude specifikus folyamatok (projekt típusok, ügyfelek)
- Output: JSON formátumú adat work_logs táblába

### Bookmarklet/Trigger

- JavaScript script ami megnyitja a gyors-rögzítő oldalt
- Automatikusan kitölti az email_reference mezőt az aktuális URL-lel
- Integrálható a böngésző könyvjelzőibe

## Dashboard Funkciók

### 1. Gyors-rögzítő Form

- Ügyfél választó (legördülő a korábbi ügyfelekkel)
- Projekt választó (opcionális)
- Feladat leírása
- E-mail URL (opcionális)
- Határidő (opcionális)
- Sürgős jelölés (opcionális)

### 2. Státusz követés

- "Mai határidős" munkák szűrő
- "Folyamatban lévő" munkák táblázat
- "Kész" munkák archívum

### 3. Analytics

- Idő követés (time_spent)
- Projekt alapú statisztikák
- Ügyfél alapú statisztikák
