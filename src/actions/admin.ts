"use server";

import { z } from "zod";
import { verifyUserToken } from "./portal";
import { getAddonsAction } from "./addons";
import { getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// Initialize Firebase Admin SDK safely
const apps = getApps();
if (!apps.length) {
  try {
    initializeApp({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
  } catch (e) {
    console.warn("Firebase Admin SDK could not initialize automatically:", e);
  }
}

const registerSchema = z.object({
  name: z
    .string()
    .min(2, { message: "A névnek legalább 2 karakterből kell állnia!" }),
  email: z.string().email({ message: "Érvénytelen e-mail cím formátum!" }),
});

const assignAddonSchema = z.object({
  email: z.string().email({ message: "Érvénytelen e-mail cím formátum!" }),
  addonId: z.string().min(1, { message: "Válassz ki egy add-ont!" }),
});

const togglePromptAccessSchema = z.object({
  email: z.string().email({ message: "Érvénytelen e-mail cím formátum!" }),
  hasPromptAccess: z.boolean(),
});

const updateClientToolsSchema = z.object({
  targetUid: z.string().min(1, { message: "Érvénytelen ügyfél azonosító!" }),
  allowedTools: z.array(z.string()),
  hasPromptAccess: z.boolean(),
});

interface FirestoreQueryDocument {
  name: string;
  fields: {
    name?: {
      stringValue?: string;
    };
  };
}

export async function registerUserAction(
  data: z.infer<typeof registerSchema>,
  idToken: string
) {
  // 1. Verify superadmin access
  const adminUser = await verifyUserToken(idToken);
  if (
    !adminUser ||
    !adminUser.isAdmin ||
    adminUser.email !== "hello@webdude.hu"
  ) {
    return { success: false, error: "Jogosulatlan hozzáférés." };
  }

  // 2. Validate input
  const validation = registerSchema.safeParse(data);
  if (!validation.success) {
    return {
      success: false,
      error: "Validációs hiba.",
      details: validation.error.flatten(),
    };
  }

  const { name, email } = validation.data;
  const defaultPassword =
    "WebDude" + Math.floor(1000 + Math.random() * 9000) + "!";

  let uid = "";
  let usedAdminSdk = false;

  // 3. Register user in Firebase Auth
  try {
    const currentApps = getApps();
    if (currentApps.length > 0) {
      const userRecord = await getAuth().createUser({
        email,
        password: defaultPassword,
        displayName: name,
      });
      uid = userRecord.uid;
      usedAdminSdk = true;
    }
  } catch (err) {
    console.warn("Admin SDK createUser failed, trying REST API fallback:", err);
  }

  // If Admin SDK failed or wasn't initialized, fallback to REST API
  if (!uid) {
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    if (!apiKey) {
      return { success: false, error: "Firebase API kulcs hiányzik." };
    }

    try {
      const authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
      const authRes = await fetch(authUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password: defaultPassword,
          returnSecureToken: false,
        }),
      });

      if (!authRes.ok) {
        const errJson = (await authRes.json()) as {
          error?: { message?: string };
        };
        return {
          success: false,
          error:
            errJson.error?.message === "EMAIL_EXISTS"
              ? "Ez az e-mail cím már regisztrálva van!"
              : errJson.error?.message ||
                "Nem sikerült regisztrálni a felhasználót.",
        };
      }

      const authData = (await authRes.json()) as { localId: string };
      uid = authData.localId;
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      return {
        success: false,
        error: "Hálózati hiba a regisztráció során: " + errMsg,
      };
    }
  }

  // 4. Create user profile doc in 'users' collection
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId)
    return { success: false, error: "Hiányzó projekt konfiguráció." };

  try {
    const currentApps = getApps();
    if (usedAdminSdk && currentApps.length > 0) {
      await getFirestore().collection("users").doc(uid).set({
        uid,
        email,
        name,
        role: "client",
      });
    } else {
      const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/users/${uid}`;
      const firestoreRes = await fetch(firestoreUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          fields: {
            uid: { stringValue: uid },
            email: { stringValue: email },
            name: { stringValue: name },
            role: { stringValue: "client" },
          },
        }),
      });

      if (!firestoreRes.ok) {
        return {
          success: true,
          uid,
          password: defaultPassword,
          warning:
            "A felhasználó létrejött, de a Firestore profil mentése sikertelen volt.",
        };
      }
    }

    return {
      success: true,
      uid,
      password: defaultPassword,
      message: `Ügyfél sikeresen regisztrálva! Ideiglenes jelszó: ${defaultPassword}`,
    };
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    return {
      success: true,
      uid,
      password: defaultPassword,
      warning: "A felhasználó létrejött, de adatbázis hiba történt: " + errMsg,
    };
  }
}

export async function assignAddonToUserAction(
  data: z.infer<typeof assignAddonSchema>,
  idToken: string
) {
  // 1. Verify superadmin access
  const adminUser = await verifyUserToken(idToken);
  if (
    !adminUser ||
    !adminUser.isAdmin ||
    adminUser.email !== "hello@webdude.hu"
  ) {
    return { success: false, error: "Jogosulatlan hozzáférés." };
  }

  // 2. Validate input
  const validation = assignAddonSchema.safeParse(data);
  if (!validation.success) {
    return {
      success: false,
      error: "Validációs hiba.",
      details: validation.error.flatten(),
    };
  }

  const { email, addonId } = validation.data;

  // Find addon details
  const addonsRes = await getAddonsAction(idToken);
  if (!addonsRes.success || !addonsRes.addons) {
    return {
      success: false,
      error: "Nem sikerült letölteni a szolgáltatásokat.",
    };
  }
  const addon = addonsRes.addons.find((a) => a.id === addonId);
  if (!addon) {
    return { success: false, error: "A kiválasztott add-on nem létezik." };
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId)
    return { success: false, error: "Hiányzó projekt konfiguráció." };

  let clientUid = "";
  let clientName = "";

  // 3. Lookup user in Firestore by email
  try {
    let queryCompleted = false;
    const currentApps = getApps();

    if (currentApps.length > 0) {
      try {
        const userQuery = await getFirestore()
          .collection("users")
          .where("email", "==", email)
          .limit(1)
          .get();

        if (!userQuery.empty) {
          const userDoc = userQuery.docs[0];
          clientUid = userDoc.id;
          clientName = (userDoc.data().name as string) || "";
          queryCompleted = true;
        }
      } catch (err) {
        console.warn(
          "Admin SDK firestore query failed, falling back to REST:",
          err
        );
      }
    }

    if (!queryCompleted) {
      const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:runQuery`;
      const queryBody = {
        structuredQuery: {
          from: [{ collectionId: "users" }],
          where: {
            fieldFilter: {
              field: { fieldPath: "email" },
              op: "EQUAL",
              value: { stringValue: email },
            },
          },
          limit: 1,
        },
      };

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(queryBody),
      });

      if (res.ok) {
        const rawData = (await res.json()) as Array<{
          document?: FirestoreQueryDocument;
        }>;
        if (
          Array.isArray(rawData) &&
          rawData.length > 0 &&
          rawData[0].document
        ) {
          const doc = rawData[0].document;
          const parts = doc.name.split("/");
          clientUid = parts[parts.length - 1];
          clientName = doc.fields.name?.stringValue || "";
        }
      }
    }

    if (!clientUid) {
      return {
        success: false,
        error: "Nem található ügyfél ezzel az e-mail címmel.",
      };
    }

    // 4. Create document in 'orders' collection
    const orderData = {
      title: addon.title,
      addonId: addon.id,
      clientId: clientUid,
      status: "onboarding-pending",
      amount: addon.price,
      createdAt: new Date().toISOString(),
      deliveredAt: null,
    };

    let orderCreated = false;
    const finalApps = getApps();

    if (finalApps.length > 0) {
      try {
        await getFirestore().collection("orders").add(orderData);
        orderCreated = true;
      } catch (err) {
        console.warn(
          "Admin SDK firestore add order failed, falling back to REST:",
          err
        );
      }
    }

    if (!orderCreated) {
      const createUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/orders`;
      const createRes = await fetch(createUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          fields: {
            title: { stringValue: orderData.title },
            addonId: { stringValue: orderData.addonId },
            clientId: { stringValue: orderData.clientId },
            status: { stringValue: orderData.status },
            amount: { integerValue: String(orderData.amount) },
            createdAt: { stringValue: orderData.createdAt },
            deliveredAt: { nullValue: null },
          },
        }),
      });

      if (!createRes.ok) {
        return {
          success: false,
          error: "Sikertelen megrendelés mentés az adatbázisban.",
        };
      }
    }

    return {
      success: true,
      message: `Az add-on (${addon.title}) sikeresen hozzárendelve ${clientName} (${email}) fiókjához!`,
    };
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      error: "Adatbázis hiba a hozzárendelés során: " + errMsg,
    };
  }
}

export async function togglePromptAccessAction(
  data: z.infer<typeof togglePromptAccessSchema>,
  idToken: string
) {
  // 1. Verify superadmin access
  const adminUser = await verifyUserToken(idToken);
  if (
    !adminUser ||
    !adminUser.isAdmin ||
    adminUser.email !== "hello@webdude.hu"
  ) {
    return { success: false, error: "Jogosulatlan hozzáférés." };
  }

  // 2. Validate input
  const validation = togglePromptAccessSchema.safeParse(data);
  if (!validation.success) {
    return {
      success: false,
      error: "Validációs hiba.",
      details: validation.error.flatten(),
    };
  }

  const { email, hasPromptAccess } = validation.data;

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId)
    return { success: false, error: "Hiányzó projekt konfiguráció." };

  let clientUid = "";

  // 3. Lookup user in Firestore by email
  try {
    let queryCompleted = false;
    const currentApps = getApps();

    if (currentApps.length > 0) {
      try {
        const userQuery = await getFirestore()
          .collection("users")
          .where("email", "==", email)
          .limit(1)
          .get();

        if (!userQuery.empty) {
          const userDoc = userQuery.docs[0];
          clientUid = userDoc.id;
          queryCompleted = true;
        }
      } catch (err) {
        console.warn(
          "Admin SDK firestore query failed, falling back to REST:",
          err
        );
      }
    }

    if (!queryCompleted) {
      const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:runQuery`;
      const queryBody = {
        structuredQuery: {
          from: [{ collectionId: "users" }],
          where: {
            fieldFilter: {
              field: { fieldPath: "email" },
              op: "EQUAL",
              value: { stringValue: email },
            },
          },
          limit: 1,
        },
      };

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(queryBody),
      });

      if (res.ok) {
        const rawData = (await res.json()) as Array<{
          document?: FirestoreQueryDocument;
        }>;
        if (
          Array.isArray(rawData) &&
          rawData.length > 0 &&
          rawData[0].document
        ) {
          const doc = rawData[0].document;
          const parts = doc.name.split("/");
          clientUid = parts[parts.length - 1];
        }
      }
    }

    if (!clientUid) {
      return {
        success: false,
        error: "Nem található ügyfél ezzel az e-mail címmel.",
      };
    }

    // 4. Update user profile with hasPromptAccess
    let updated = false;
    const finalApps = getApps();

    if (finalApps.length > 0) {
      try {
        await getFirestore().collection("users").doc(clientUid).update({
          hasPromptAccess,
        });
        updated = true;
      } catch (err) {
        console.warn(
          "Admin SDK firestore update failed, falling back to REST:",
          err
        );
      }
    }

    if (!updated) {
      const updateUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/users/${clientUid}`;
      const updateRes = await fetch(updateUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          fields: {
            hasPromptAccess: { booleanValue: hasPromptAccess },
          },
        }),
      });

      if (!updateRes.ok) {
        return {
          success: false,
          error: "Sikertelen profil frissítés az adatbázisban.",
        };
      }
    }

    return {
      success: true,
      message: hasPromptAccess
        ? "Prompt sablonok hozzáférés engedélyezve!"
        : "Prompt sablonok hozzáférés visszavonva!",
    };
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      error: "Adatbázis hiba a frissítés során: " + errMsg,
    };
  }
}

export async function updateClientToolsAction(
  data: z.infer<typeof updateClientToolsSchema>,
  idToken: string
) {
  // 1. Szigorú szuperadmin ellenőrzés
  const adminUser = await verifyUserToken(idToken);
  if (
    !adminUser ||
    !adminUser.isAdmin ||
    adminUser.email !== "hello@webdude.hu"
  ) {
    return { success: false, error: "Jogosulatlan hozzáférés." };
  }

  // 2. Zod validáció
  const validation = updateClientToolsSchema.safeParse(data);
  if (!validation.success) {
    return {
      success: false,
      error: "Validációs hiba.",
      details: validation.error.flatten(),
    };
  }

  const { targetUid, allowedTools, hasPromptAccess } = validation.data;

  // 3. Közvetlen Admin SDK frissítés a users/{uid} dokumentumon
  // (a kliensoldali írás rules-ban tiltott: allow write if false)
  try {
    const { adminDb } = await import("@/lib/firebase-admin");
    if (!adminDb) {
      return { success: false, error: "Adatbázis kapcsolat nem elérhető." };
    }

    await adminDb.collection("users").doc(targetUid).update({
      allowedTools,
      hasPromptAccess,
      updatedAt: new Date().toISOString(),
    });

    return {
      success: true,
      message: "Ügyfél jogosultságok sikeresen mentve!",
    };
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      error: "Adatbázis hiba a frissítés során: " + errMsg,
    };
  }
}

/**
 * Visszafelé kompatibilis változat (email alapú): a régi AdminPanel
 * eszközjogosultság-formja ezen keresztül hív. E-mail alapján feloldja
 * az uid-t, majd a updateClientToolsAction logikát futtatja.
 */
export async function updateUserToolsAction(
  data: { email: string; allowedTools: string[] },
  idToken: string
) {
  const adminUser = await verifyUserToken(idToken);
  if (
    !adminUser ||
    !adminUser.isAdmin ||
    adminUser.email !== "hello@webdude.hu"
  ) {
    return { success: false, error: "Jogosulatlan hozzáférés." };
  }

  try {
    const { adminDb } = await import("@/lib/firebase-admin");
    if (!adminDb) {
      return { success: false, error: "Adatbázis kapcsolat nem elérhető." };
    }

    const snap = await adminDb
      .collection("users")
      .where("email", "==", data.email)
      .limit(1)
      .get();

    if (snap.empty) {
      return {
        success: false,
        error: "Nem található ügyfél ezzel az e-mail címmel.",
      };
    }

    const targetUid = snap.docs[0].id;
    const hasPromptAccess = data.allowedTools.includes("prompt_templates");

    await adminDb.collection("users").doc(targetUid).update({
      allowedTools: data.allowedTools,
      hasPromptAccess,
      updatedAt: new Date().toISOString(),
    });

    return {
      success: true,
      message: "Eszközjogosultságok sikeresen frissítve!",
    };
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      error: "Adatbázis hiba a frissítés során: " + errMsg,
    };
  }
}
