// DEPRECATED — Firebase Spark csomag: Cloud Functions nem hasznalhato.
// A generalas kozvetlen Next.js Server Action alapon mukodik:
//   src/app/actions/createGeneration.ts (Groq API, GROQ_API_KEY)
// Ez a fajl szandekosan nem exportal trigger-fuggvenyt, hogy
// `firebase deploy` soha ne probaljon Functions-t telepiteni.
// Blaze csomagra valtaskor visszaallithato git history-bol.
export {};
