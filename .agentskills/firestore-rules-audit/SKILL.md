---
name: firestore-rules-audit
version: 1.0.0
description: Enforces WebDude Zero-Prompt Policy, Zod validation, and secure Server Action usage for Firestore.
---

# WebDude Backend & Security Standards

### 1. Anti-Drain Policy
- **Minimize Reads:** Direct client-side Firestore queries are heavily restricted.
- **No Infinite Loops:** `useEffect` hooks causing continuous reads are strictly forbidden.
- Use Server Actions, `getDoc` (one-time fetch), or ISR (`revalidate: 3600`) instead of live `onSnapshot` listeners unless real-time is the core feature.

### 2. Zero-Prompt Policy (Security)
- Sensitive collections (e.g., `private_prompts`, `users`) MUST NEVER be queried from frontend client components.
- Access these strictly via Server Actions using the Firebase Admin SDK.

### 3. Zod & Action Validation
- **Strict Typing:** ALL Server Action inputs must be validated using a Zod schema before execution.
- Forms must use `react-hook-form` coupled with `@hookform/resolvers/zod`.
- No `any` types allowed. Ensure `tsc --noEmit` passes with 0 errors.