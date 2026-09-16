---
name: tailwind-v4-migrate
version: 1.0.0
description: Validates Tailwind CSS v4 syntax and enforces WebDude Cyber-Arany Design System rules.
---

# WebDude Design System Standards

### 1. The 90-8-2 Rule
- **90% Dark Base:** Backgrounds must use deep dark tones (e.g., `#020617`, `#0f172a`).
- **8% Glassmorphism:** Use `backdrop-blur-xl` and `bg-slate-950/80` for cards, modals, and sticky elements.
- **2% Accent (Cyber-Gold):** Use gold accents (`#f59e0b`, `text-amber-500`) STRICTLY for primary CTAs, hover effects, or micro-badges.

### 2. Tailwind v4 & Animation Rules
- **No Deprecated Classes:** Ensure absolute Tailwind v4 compliance.
- **Motion strictly via motion/react:** NEVER import from `framer-motion`. Always use `import { motion } from "motion/react"`.
- **Spring Physics:** Use spring animations for premium feel: `transition={{ type: "spring", stiffness: 100, damping: 20 }}`.

### 3. Readability & UI
- **Strict Contrast:** On dark backgrounds, ONLY use light text (`text-[#e2e8f0]`, `text-slate-400`).
- **Icons:** Use `lucide-react` exclusively. DO NOT use emojis for premium UI elements.