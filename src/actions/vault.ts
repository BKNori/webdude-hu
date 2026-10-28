"use server";

import { verifyUserToken } from "./portal";

interface FirestoreVaultDocument {
  name?: string;
  fields: {
    clientId: { stringValue: string };
    name: { stringValue: string };
    url: { stringValue: string };
    size: { integerValue: string | number };
    uploadedBy: { stringValue: "client" | "admin" };
    uploadedByName: { stringValue: string };
    storagePath: { stringValue: string };
    createdAt: { timestampValue: string };
  };
}

/**
 * Register an uploaded file in the Firestore vault collection.
 */
export async function registerUploadedFileAction(
  idToken: string,
  fileData: {
    clientId: string;
    name: string;
    url: string;
    size: number;
    uploadedBy: "client" | "admin";
    storagePath: string;
  }
) {
  const user = await verifyUserToken(idToken);
  if (!user) {
    return { success: false, error: "Jogosulatlan hozzáférés." };
  }

  // Security check: Clients can only register files for themselves.
  if (!user.isAdmin && user.uid !== fileData.clientId) {
    return {
      success: false,
      error: "Csak a saját széfedbe regisztrálhatsz fájlokat!",
    };
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId)
    return { success: false, error: "Hiányzó projekt konfiguráció." };

  try {
    // 1. Resolve uploader name
    let uploadedByName = "Ügyfél";
    if (user.isAdmin) {
      uploadedByName = "Norbi (WebDude)";
    } else {
      try {
        const profileRes = await fetch(
          `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/users/${user.uid}`,
          { headers: { Authorization: `Bearer ${idToken}` } }
        );
        if (profileRes.ok) {
          const profile = (await profileRes.json()) as {
            fields?: { name?: { stringValue?: string } };
          };
          uploadedByName = profile.fields?.name?.stringValue || "Ügyfél";
        }
      } catch {
        uploadedByName = "Ügyfél";
      }
    }

    // 2. Post file document
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/vault`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        fields: {
          clientId: { stringValue: fileData.clientId },
          name: { stringValue: fileData.name },
          url: { stringValue: fileData.url },
          size: { integerValue: fileData.size.toString() },
          uploadedBy: { stringValue: fileData.uploadedBy },
          uploadedByName: { stringValue: uploadedByName },
          storagePath: { stringValue: fileData.storagePath },
          createdAt: { timestampValue: new Date().toISOString() },
        },
      }),
    });

    if (!res.ok) {
      const err = (await res.json()) as { error?: { message?: string } };
      return {
        success: false,
        error: err.error?.message || "Nem sikerült regisztrálni a fájlt.",
      };
    }

    return { success: true, message: "Fájl sikeresen regisztrálva a széfbe!" };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Hiba a fájl regisztrációja során.",
    };
  }
}

/**
 * Get all files registered in the vault for a given client.
 */
export async function getClientFilesAction(idToken: string, clientId: string) {
  const user = await verifyUserToken(idToken);
  if (!user) {
    return { success: false, error: "Jogosulatlan hozzáférés." };
  }

  // Security check: Clients can only list their own files.
  if (!user.isAdmin && user.uid !== clientId) {
    return { success: false, error: "Csak a saját fájljaidat kérheted le!" };
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId)
    return { success: false, error: "Hiányzó projekt konfiguráció." };

  try {
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:runQuery`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        structuredQuery: {
          from: [{ collectionId: "vault" }],
          where: {
            fieldFilter: {
              field: { fieldPath: "clientId" },
              op: "EQUAL",
              value: { stringValue: clientId },
            },
          },
        },
      }),
    });

    if (!res.ok) {
      return { success: false, error: "Nem sikerült betölteni a fájlokat." };
    }

    const rawData = (await res.json()) as Array<{
      document?: FirestoreVaultDocument;
    }>;
    const files = rawData
      .filter((item) => item.document)
      .map((item) => {
        const doc = item.document!;
        const parts = doc.name!.split("/");
        const id = parts[parts.length - 1];

        return {
          id,
          clientId: doc.fields.clientId.stringValue,
          name: doc.fields.name.stringValue,
          url: doc.fields.url.stringValue,
          size: parseInt(doc.fields.size.integerValue.toString(), 10),
          uploadedBy: doc.fields.uploadedBy.stringValue,
          uploadedByName: doc.fields.uploadedByName.stringValue,
          storagePath: doc.fields.storagePath.stringValue,
          createdAt: doc.fields.createdAt.timestampValue,
        };
      });

    // Sort by createdAt descending (newest first)
    files.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return { success: true, files };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Hiba a fájlok lekérése során.",
    };
  }
}

/**
 * Register a B2B document (szerződés, számla, brief, ajánlat) in the
 * Firestore vault collection — MVP Document Vault (Spark-kompatibilis,
 * nincs Cloud Functions).
 *
 * A dokumentum egy `kind: "document"` + opcionális `description` mezővel
 * megjelölt vault-rekord; a fájl maga a Firebase Storage
 * `clients/{uid}/documents/` mappájába kerül (a `storage.rules`
 * `clients/{clientId}` sávja fedi — szabálymódosítás nem kell).
 * A Server Action a meglévő `verifyUserToken` + REST-mintát követi
 * (lásd: `registerUploadedFileAction`).
 */
export async function registerDocumentAction(
  idToken: string,
  documentData: {
    clientId: string;
    name: string;
    url: string;
    size: number;
    uploadedBy: "client" | "admin";
    storagePath: string;
    description?: string;
  }
) {
  const user = await verifyUserToken(idToken);
  if (!user) {
    return { success: false, error: "Jogosulatlan hozzáférés." };
  }

  if (!user.isAdmin && user.uid !== documentData.clientId) {
    return {
      success: false,
      error: "Csak a saját széfedbe regisztrálhatsz dokumentumokat!",
    };
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId)
    return { success: false, error: "Hiányzó projekt konfiguráció." };

  try {
    let uploadedByName = "Ügyfél";
    if (user.isAdmin) {
      uploadedByName = "Norbi (WebDude)";
    } else {
      try {
        const profileRes = await fetch(
          `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/users/${user.uid}`,
          { headers: { Authorization: `Bearer ${idToken}` } }
        );
        if (profileRes.ok) {
          const profile = (await profileRes.json()) as {
            fields?: { name?: { stringValue?: string } };
          };
          uploadedByName = profile.fields?.name?.stringValue || "Ügyfél";
        }
      } catch {
        uploadedByName = "Ügyfél";
      }
    }

    const docFields: Record<string, unknown> = {
      clientId: { stringValue: documentData.clientId },
      name: { stringValue: documentData.name },
      url: { stringValue: documentData.url },
      size: { integerValue: documentData.size.toString() },
      uploadedBy: { stringValue: documentData.uploadedBy },
      uploadedByName: { stringValue: uploadedByName },
      storagePath: { stringValue: documentData.storagePath },
      createdAt: { timestampValue: new Date().toISOString() },
      kind: { stringValue: "document" },
    };
    if (documentData.description) {
      docFields.description = { stringValue: documentData.description };
    }

    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/vault`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({ fields: docFields }),
    });

    if (!res.ok) {
      const err = (await res.json()) as { error?: { message?: string } };
      return {
        success: false,
        error: err.error?.message || "Nem sikerült regisztrálni a dokumentumot.",
      };
    }

    return { success: true, message: "Dokumentum sikeresen regisztrálva a széfbe!" };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Hiba a dokumentum regisztrációja során.",
    };
  }
}

/**
 * Delete a registered file metadata record from Firestore vault collection.
 * Note: The actual file deletion on Storage should be handled client-side using the client's token permissions.
 */
export async function deleteClientFileAction(idToken: string, fileId: string) {
  const user = await verifyUserToken(idToken);
  if (!user) {
    return { success: false, error: "Jogosulatlan hozzáférés." };
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId)
    return { success: false, error: "Hiányzó projekt konfiguráció." };

  try {
    // 1. Fetch metadata first to enforce client-only delete limits in Server Action
    const getUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/vault/${fileId}`;
    const getRes = await fetch(getUrl, {
      headers: { Authorization: `Bearer ${idToken}` },
    });

    if (!getRes.ok) {
      return { success: false, error: "A törlendő fájl nem található." };
    }

    const doc = (await getRes.json()) as FirestoreVaultDocument;

    // Security check: Clients can only delete files they themselves uploaded.
    if (!user.isAdmin) {
      if (doc.fields.clientId.stringValue !== user.uid) {
        return {
          success: false,
          error: "Nincs jogosultságod törölni ezt a fájlt.",
        };
      }
      if (doc.fields.uploadedBy.stringValue !== "client") {
        return {
          success: false,
          error: "Kliensek nem törölhetik az admin által feltöltött fájlokat!",
        };
      }
    }

    // 2. Run delete
    const deleteRes = await fetch(getUrl, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${idToken}` },
    });

    if (!deleteRes.ok) {
      return { success: false, error: "Nem sikerült törölni a fájl rekordot." };
    }

    return { success: true, message: "Fájl sikeresen eltávolítva!" };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Hiba a fájl törlése során.",
    };
  }
}

/**
 * B2B dokumentumok (`kind == "document"`) lekérése a Firestore vault
 * kollekcióból — MVP Document Vault (Spark-kompatibilis).
 * A `getClientFilesAction` REST + runQuery mintáját követi: kliens csak
 * saját, admin az adott ügyfél dokumentumait látja. Build-időben üres
 * listával tér vissza (Admin SDK nélkül) — soha nem dob.
 */
export async function getClientDocumentsAction(idToken: string, clientId: string) {
  const user = await verifyUserToken(idToken);
  if (!user) {
    return { success: false, error: "Jogosulatlan hozzáférés." };
  }

  if (!user.isAdmin && user.uid !== clientId) {
    return {
      success: false,
      error: "Csak a saját dokumentumaidat kérdezheted le!",
    };
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId)
    return { success: false, error: "Hiányzó projekt konfiguráció." };

  try {
    const targetUid = user.isAdmin ? clientId : user.uid;
    const res = await fetch(
      `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:runQuery`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          structuredQuery: {
            from: [{ collectionId: "vault" }],
            where: {
              compositeFilter: {
                op: "AND",
                filters: [
                  {
                    fieldFilter: {
                      field: { fieldPath: "clientId" },
                      op: "EQUAL",
                      value: { stringValue: targetUid },
                    },
                  },
                  {
                    fieldFilter: {
                      field: { fieldPath: "kind" },
                      op: "EQUAL",
                      value: { stringValue: "document" },
                    },
                  },
                ],
              },
            },
            orderBy: [{ field: { fieldPath: "createdAt" }, direction: "DESCENDING" }],
            limit: 100,
          },
        }),
      }
    );

    if (!res.ok) {
      return { success: false, error: "Nem sikerült betölteni a dokumentumokat." };
    }

    const rawData = (await res.json()) as Array<{
      document?: FirestoreVaultDocument & {
        fields: {
          kind?: { stringValue?: string };
          description?: { stringValue?: string };
        };
      };
    }>;
    const documents = rawData
      .filter((item) => item.document)
      .map((item) => {
        const doc = item.document!;
        const parts = doc.name!.split("/");
        const id = parts[parts.length - 1];

        return {
          id,
          clientId: doc.fields.clientId.stringValue,
          name: doc.fields.name.stringValue,
          url: doc.fields.url.stringValue,
          size: parseInt(doc.fields.size.integerValue.toString(), 10),
          uploadedBy: doc.fields.uploadedBy.stringValue,
          uploadedByName: doc.fields.uploadedByName.stringValue,
          storagePath: doc.fields.storagePath.stringValue,
          createdAt: doc.fields.createdAt.timestampValue,
          kind: doc.fields.kind?.stringValue ?? "document",
          description: doc.fields.description?.stringValue ?? "",
        };
      });

    return { success: true, documents };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Hiba a dokumentumok lekérése során.",
    };
  }
}
