/**
 * Értesítés típusok (v7.0). A `kind` határozza meg a `PortalNotificationBell`
 * szemantikus ikonját, a `tone` a színét (success = emerald, error = red,
 * info = brand #00B5F1). A brand szín korlátozása miatt a badge (lila) nem
 * nő — az ikon-szinten jelenik meg a szemantika.
 */
export type NotificationKind =
  | "payment"
  | "delivery"
  | "approval"
  | "generation"
  | "vault"
  | "message";

export type NotificationTone = "success" | "error" | "info";

export interface NotifyUserInput {
  /** A címzett Firebase UID-ja. */
  userId: string;
  kind: NotificationKind;
  tone: NotificationTone;
  title: string;
  message: string;
  /** Opcionális belső link (pl. "/portal"), amelyre az értesítés mutat. */
  link?: string;
}

/**
 * Központi értesítés-író (Server Action / API route környezethez).
 *
 * A `users/{uid}/notifications/{id}` al-kollekcióba ír az **Admin SDK-val**
 * (Zero-Prompt szellemében: a kliens ezt a kollekciót csak olvasni tudja, a
 * `firestore.rules` `write: if false`-ra van állítva).
 *
 * **Best-effort:** belső `try/catch` — egy értesítési hiba SOHA nem ronthatja
 * el a hívó fő műveletét (fizetés / kézbesítés / jóváhagyás). Hibát naplózzuk,
 * de nem dobunk tovább.
 *
 * @param input - az értesítés adatai
 * @returns `true`, ha az írás sikeres volt; különben `false` (eldobva).
 */
export async function notifyUser(input: NotifyUserInput): Promise<boolean> {
  try {
    // Biztonsági őrszem: userId nélkül nincs címzett.
    if (!input.userId || typeof input.userId !== "string") {
      return false;
    }

    // Dinamikus import: az Admin SDK inicializálása CSAK futásidőben, a
    // szerveroldali hívásban történik meg. Így a `notify.ts` statikus
    // importálása (pl. `addons.ts`-ből, amit a publikus add-onok oldal is
    // behúz) nem inicializálja modul-szinten az Admin SDK-t — a build
    // időben (prerender, env nélkül) nem hasal el.
    const [{ FieldValue }, { adminDb }] = await Promise.all([
      import("firebase-admin/firestore"),
      import("@/lib/firebase-admin"),
    ]);

    await adminDb
      .collection("users")
      .doc(input.userId)
      .collection("notifications")
      .add({
        userId: input.userId,
        kind: input.kind,
        tone: input.tone,
        title: input.title,
        message: input.message,
        link: input.link ?? null,
        read: false,
        createdAt: FieldValue.serverTimestamp(),
      });

    return true;
  } catch (err) {
    // Best-effort: az értesítés-írás hibája nem szakíthatja meg a trigger
    // fő műveletét. Csak naplózzuk (szerveroldali diagnosztika).
    console.error("[notifyUser] Értesítés írása sikertelen (best-effort):", err);
    return false;
  }
}
