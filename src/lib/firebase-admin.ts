import {
  getApps,
  initializeApp,
  cert,
  type App,
} from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { getStorage, type Storage } from "firebase-admin/storage";

/**
 * Firebase Admin SDK — biztonságos inicializálás.
 *
 * A cPanel/Passenger környezetben a Service Account env változók
 * (FIREBASE_ADMIN_CLIENT_EMAIL / FIREBASE_ADMIN_PRIVATE_KEY) hiányozhatnak.
 * Ilyenkor a korábbi top-level `initializeApp({ credential: cert(...) })`
 * MODULE-LOAD szinten dobott kivételt -> bármely szerver action, amely
 * (akár tranzitívan) importálta ezt a modult, 500-as HTTP hibával omlott
 * össze (pl. CaseStudyCarousel, email-templates, upload).
 *
 * Most: ha a hitelesítő adatok hiányoznak vagy érvénytelenek, az adminDb /
 * adminStorage `null`-t ad vissza. A hívók `if (!adminDb)` guardjaival
 * (már meglévő minta) tiszta `{ success: false }` választ kapnak, és a
 * kliensoldali Firestore SDK + firestore.rules (isHelloAdmin) a fallback.
 */
const serviceAccountKey = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

const hasCredentials = Boolean(
  serviceAccountKey.projectId &&
    serviceAccountKey.clientEmail &&
    serviceAccountKey.privateKey
);

let adminApp: App | undefined;

if (hasCredentials) {
  try {
    adminApp =
      getApps().length > 0
        ? getApps()[0]
        : initializeApp({
            credential: cert(serviceAccountKey as Parameters<typeof cert>[0]),
          });
  } catch (error) {
    // Érvénytelen kulcs-formátum: ne omoljon össze a modul betöltése.
    console.error(
      "[firebase-admin] Admin SDK inicializálás sikertelen:",
      error instanceof Error ? error.message : error
    );
    adminApp = undefined;
  }
} else {
  console.warn(
    "[firebase-admin] Service Account env változók hiányoznak — adminDb/adminStorage null. Kliens SDK + rules fallback aktív."
  );
}

// A típusokat szándékosan NEM-nullable-ként exporteduk: a meglévő
// `if (!adminDb)` guardok futásidőben így is működnek, a TypeScript
// pedig nem követel null-check-et a régi hívási helyeken.
const adminDb = (adminApp ? getFirestore(adminApp) : null) as Firestore;
const adminStorage = (adminApp ? getStorage(adminApp) : null) as Storage;

export { adminApp, adminDb, adminStorage };
