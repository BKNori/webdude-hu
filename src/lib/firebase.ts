import { initializeApp, getApps, getApp, setLogLevel } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Build fázisban csöndesítsük el a Firebase SDK belső gRPC logjait
// (NOT_FOUND logok zavarják a build kimenetet)
if (process.env.NEXT_PHASE === "phase-production-build") {
  setLogLevel("silent");
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Build fázisban (npm run build) ne inicializáljuk a Firestore-t —
// a gRPC kapcsolat NOT_FOUND hibát dob, ami felesleges logokat generál.
// ISR újrageneráláskor (runtime) a NEXT_PHASE már nem 'phase-production-build',
// így a Firestore normálisan elérhető marad.
const isBuildPhase = process.env.NEXT_PHASE === "phase-production-build";
const hasValidConfig =
  !isBuildPhase && firebaseConfig.apiKey && firebaseConfig.projectId;

const app =
  getApps().length > 0
    ? getApp()
    : hasValidConfig
      ? initializeApp(firebaseConfig)
      : null;

// Initialize Firestore (null build közben → statikus fallback aktiválódik)
const db = app ? getFirestore(app) : null;

// Initialize Auth (csak runtime-on, ha az app inicializálva van)
const auth = app ? getAuth(app) : null;

// Initialize Storage (csak runtime-on, ha az app inicializálva van)
const storage = app ? getStorage(app) : null;

export { app, db, auth, storage };
