# WebDude.hu

WebDude.hu is a Next.js + Firebase-based marketing/platform project built for a premium web agency and AI automation workflow. The project combines a conversion-focused public website, a client portal, AI-powered workshop tools, Firebase-backed data processing, and an admin/CRM dashboard.

## Overview

This repository contains the production-oriented codebase for the WebDude platform, including:

- Premium marketing site and landing pages
- AI-assisted marketing and creative generator tools
- Lead capture and CRM workflow management
- Client portal with secure file vault and project tracking
- Firebase Authentication, Firestore, and Hosting integration
- Admin dashboard for operations, analytics, and content workflows

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Firebase Auth / Firestore / Hosting
- Firebase Cloud Functions
- Jest + Playwright for testing
- AI SDK integrations for OpenAI/Groq-style creative workflows

## Repository structure

```text
.
├── .github/
├── .clinerules/
├── .devin/
├── _DOCS/
├── __mocks__/
├── assets/
├── e2e/
├── firebase/
├── functions/
├── memory-bank/
├── public/
├── scripts/
├── src/
│   ├── actions/
│   ├── app/
│   ├── components/
│   ├── config/
│   ├── content/
│   ├── data/
│   ├── hooks/
│   ├── lib/
│   ├── types/
│   └── ...
├── .env.example
├── .firebaserc
├── Dockerfile
├── README.md
├── firebase.json
├── firestore.rules
├── firestore.indexes.json
├── package.json
├── next.config.js
├── postcss.config.mjs
├── tsconfig.json
├── jest.config.js
├── playwright.config.ts
├── storage.rules
└── docker-compose.yml
```

## Key features

### Public marketing website
The app includes premium landing pages and marketing sections built around a strong visual system, conversion-focused messaging, and service/product storytelling.

### AI workshop tools
A set of internal/portal-based generators help produce:

- promotional banners
- proposals and presentations
- SEO audits
- logos
- UX/UI concepts
- social media assets
- content plans
- design system directions

### Client portal
The portal includes:

- secure user access and project overview
- workflow dashboard
- document vault
- project status tracking
- communication and generation history

### Admin / CRM dashboard
The admin layer supports lead management, analytics, project monitoring, email templates, and operational workflow handling.

## Local development

### Prerequisites

- Node.js 18+ or 20+
- npm
- Firebase project access
- environment variables configured in `.env.local`

### Install dependencies

```bash
npm install
```

### Environment setup

Copy the example environment file and fill in the required values:

```bash
cp .env.example .env.local
```

Required values are centered around Firebase configuration and AI services, for example:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_GSC_VERIFICATION=
GROQ_API_KEY=
TAVILY_API_KEY=
```

Important: never hardcode secrets or Firebase credentials into source files. Use environment variables as specified in `.env.local` and access them via `process.env` / `NEXT_PUBLIC_...`.

### Run locally

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Available scripts

```bash
npm run dev          # Start the local Next.js dev server
npm run build        # Production build
npm run start        # Run the production server
npm run lint         # Run ESLint
npm run test         # Run Jest tests
npm run test:e2e     # Run Playwright E2E tests
npm run format       # Prettier format for src files
npm run format:check # Check formatting
```

## Type safety and quality checks

Before major refactors or deployment, use:

```bash
npx tsc --noEmit
npm run build
```

The project explicitly follows a zero-error TypeScript policy and production-ready verification workflow.

## Firebase configuration

This project uses Firebase for:

- Authentication
- Firestore data storage
- Hosting
- Cloud Functions (in the `functions/` directory)

Relevant configuration is managed via:

- `firebase.json`
- `.firebaserc`
- `firestore.rules`
- `firestore.indexes.json`
- `storage.rules`

## Deployment

This repo includes a deployment flow via Firebase and a platform-specific script (`deploy.bat` in the project root). Final production deployment should be approved and triggered by the developer in the appropriate environment.

For app deployment workflows, use the project’s Firebase setup and deployment documentation under `_DOCS/`.

## Documentation

The project includes an extensive internal documentation set in `_DOCS/`, including:

- `ARCHITECTURE.md`
- `DESIGN_SYSTEM.md`
- `CHANGELOG.md`
- `DEPLOYMENT_GUIDE.md`
- `WORKFLOW_PROTOCOL.md`
- various operational and AI workflow docs

These files are the source of truth for architecture, UI conventions, workflow decisions, and project operations.

## Architecture notes

The application follows a structured App Router architecture with a strong component hierarchy:

- `src/app` for routes and page composition
- `src/components` for atomic design components
- `src/actions` for server actions and backend logic
- `src/lib` for Firebase and utility integration
- `src/hooks` for reusable client logic
- `src/types` for shared TypeScript models

The implementation is designed around server-first rendering, minimal client-only logic, and optimizing for SEO and page speed.

## License

This project is currently treated as proprietary/internal work. Check repository ownership and any deployment/legal constraints before public reuse or distribution.

## Maintainer

WebDude / project maintainer: Norbi

For repository-specific operational details, refer to the documentation under `_DOCS/` and the project guardrail files such as `CLAUDE.md` and `AGENTS.md`.
