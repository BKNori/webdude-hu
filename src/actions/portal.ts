"use server";
import {
  getClientOrdersAction as getClientOrders,
  deliverOrderAction as deliverOrder,
} from "./addons";

import { z } from "zod";
import { sendWelcomeEmailAction } from "./mail";
import { ChatMessage } from "@/types/chat";

// Wrapper server actions for re-export compatibility
export async function getClientOrdersAction(idToken: string) {
  return await getClientOrders(idToken);
}

export async function deliverOrderAction(
  idToken: string,
  orderId: string,
  deliveryNotes: string,
  deliveryUrl: string
) {
  return await deliverOrder(idToken, orderId, deliveryNotes, deliveryUrl);
}

// Zod schemas for input validation
const workflowSchema = z.object({
  title: z
    .string()
    .min(3, { message: "A címnek legalább 3 karakterből kell állnia!" }),
  description: z
    .string()
    .min(5, { message: "A leírásnak legalább 5 karakterből kell állnia!" }),
  clientId: z.string().min(5, { message: "Érvénytelen ügyfél azonosító!" }),
  status: z.enum(
    ["planning", "development", "testing", "ai_integration", "completed"],
    {
      errorMap: () => ({ message: "Érvénytelen workflow státusz!" }),
    }
  ),
  content: z
    .string()
    .min(5, { message: "A tartalomnak legalább 5 karakterből kell állnia!" }),

  // Optional prices for phases
  planningPrice: z.number().optional(),
  planningPaid: z.boolean().optional(),
  developmentPrice: z.number().optional(),
  developmentPaid: z.boolean().optional(),
  testingPrice: z.number().optional(),
  testingPaid: z.boolean().optional(),
  ai_integrationPrice: z.number().optional(),
  ai_integrationPaid: z.boolean().optional(),
  completedPrice: z.number().optional(),
  completedPaid: z.boolean().optional(),
});

const clientUserSchema = z.object({
  email: z.string().email({ message: "Érvénytelen e-mail cím formátum!" }),
  name: z
    .string()
    .min(2, { message: "A névnek legalább 2 karakterből kell állnia!" }),
});

export type WorkflowData = z.infer<typeof workflowSchema>;
export type ClientUserData = z.infer<typeof clientUserSchema>;

interface UserLookupResponse {
  users?: Array<{
    localId: string;
    email: string;
    customAttributes?: string;
  }>;
}

interface FirestoreField {
  stringValue?: string;
  timestampValue?: string;
  booleanValue?: boolean;
  integerValue?: string;
  arrayValue?: { values?: Array<{ stringValue?: string }> };
}

interface FirestoreDocument {
  name: string;
  fields: Record<string, FirestoreField>;
  createTime?: string;
  updateTime?: string;
}

interface QueryResultItem {
  document?: FirestoreDocument;
}

interface FirestoreListResponse {
  documents?: FirestoreDocument[];
}

interface WorkflowItem {
  id: string;
  title: string;
  description: string;
  clientId: string;
  status:
    "planning" | "development" | "testing" | "ai_integration" | "completed";
  content: string;
  createdAt: string;
  approvedByClient?: boolean;
  clientApprovedAt?: string;

  // Phase prices and payment statuses
  planningPrice?: number;
  planningPaid?: boolean;
  developmentPrice?: number;
  developmentPaid?: boolean;
  testingPrice?: number;
  testingPaid?: boolean;
  ai_integrationPrice?: number;
  ai_integrationPaid?: boolean;
  completedPrice?: number;
  completedPaid?: boolean;
}

interface UserListItem {
  id: string;
  uid: string;
  email: string;
  name: string;
  role: string;
  allowedTools?: string[];
  hasPromptAccess?: boolean;
}

/**
 * Helper: Verify Firebase Auth ID Token and return user details.
 */
export async function verifyUserToken(idToken: string) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    if (!apiKey) throw new Error("Firebase API kulcs nincs konfigurálva.");

    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      }
    );

    if (!res.ok) return null;
    const data = (await res.json()) as UserLookupResponse;
    const user = data.users?.[0];
    if (!user) return null;

    let isAdmin = false;
    if (user.customAttributes) {
      const claims = JSON.parse(user.customAttributes) as Record<
        string,
        unknown
      >;
      isAdmin = claims.superadmin === true;
    }

    // Fallback: If email is hello@webdude.hu, always treat as superadmin
    if (!isAdmin && user.email === "hello@webdude.hu") {
      isAdmin = true;
    }

    return {
      uid: user.localId,
      email: user.email,
      isAdmin,
    };
  } catch {
    return null;
  }
}

/**
 * Fetch workflows assigned to a client (verified by token).
 */
export async function getClientWorkflowsAction(idToken: string) {
  const user = await verifyUserToken(idToken);
  if (!user) {
    return { success: false, error: "Jogosulatlan hozzáférés.", workflows: [] };
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) {
    return {
      success: false,
      error: "Firebase Project ID nincs konfigurálva.",
      workflows: [],
    };
  }

  try {
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:runQuery`;

    // Non-admins can only query their own workflows
    const queryUid = user.uid;
    const filter = !user.isAdmin
      ? {
          fieldFilter: {
            field: { fieldPath: "clientId" },
            op: "EQUAL",
            value: { stringValue: queryUid },
          },
        }
      : undefined;

    const queryBody = {
      structuredQuery: {
        from: [{ collectionId: "workflows" }],
        where: filter,
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

    if (!res.ok) {
      return {
        success: false,
        error: "Nem sikerült lekérni a workflow-kat.",
        workflows: [],
      };
    }

    const rawData = (await res.json()) as QueryResultItem[];
    const workflows: WorkflowItem[] = [];

    if (Array.isArray(rawData)) {
      rawData.forEach((item) => {
        if (item.document) {
          const doc = item.document;
          const fields = doc.fields;
          const parts = doc.name.split("/");
          const id = parts[parts.length - 1];

          workflows.push({
            id,
            title: fields.title?.stringValue || "",
            description: fields.description?.stringValue || "",
            clientId: fields.clientId?.stringValue || "",
            status: (fields.status?.stringValue ||
              "planning") as WorkflowItem["status"],
            content: fields.content?.stringValue || "",
            createdAt: doc.createTime || "",
            approvedByClient: fields.approvedByClient?.booleanValue ?? false,
            clientApprovedAt: fields.clientApprovedAt?.stringValue || "",
            planningPrice: fields.planningPrice?.integerValue
              ? parseInt(fields.planningPrice.integerValue)
              : undefined,
            planningPaid: fields.planningPaid?.booleanValue ?? false,
            developmentPrice: fields.developmentPrice?.integerValue
              ? parseInt(fields.developmentPrice.integerValue)
              : undefined,
            developmentPaid: fields.developmentPaid?.booleanValue ?? false,
            testingPrice: fields.testingPrice?.integerValue
              ? parseInt(fields.testingPrice.integerValue)
              : undefined,
            testingPaid: fields.testingPaid?.booleanValue ?? false,
            ai_integrationPrice: fields.ai_integrationPrice?.integerValue
              ? parseInt(fields.ai_integrationPrice.integerValue)
              : undefined,
            ai_integrationPaid:
              fields.ai_integrationPaid?.booleanValue ?? false,
            completedPrice: fields.completedPrice?.integerValue
              ? parseInt(fields.completedPrice.integerValue)
              : undefined,
            completedPaid: fields.completedPaid?.booleanValue ?? false,
          });
        }
      });
    }

    return { success: true, workflows };
  } catch (error: unknown) {
    console.error("Workflow fetch error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Ismeretlen hiba történt a letöltéskor.",
      workflows: [],
    };
  }
}

/**
 * Superadmin: Create a new workflow.
 */
export async function createWorkflowAction(
  data: WorkflowData,
  idToken: string
) {
  const user = await verifyUserToken(idToken);
  if (!user || !user.isAdmin) {
    return {
      success: false,
      error: "Csak adminisztrátorok hozhatnak létre workflow-kat.",
    };
  }

  const validation = workflowSchema.safeParse(data);
  if (!validation.success) {
    return {
      success: false,
      error: "Validációs hiba.",
      details: validation.error.flatten(),
    };
  }

  const validated = validation.data;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId)
    return { success: false, error: "Hiányzó projekt konfiguráció." };

  try {
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/workflows`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        fields: {
          title: { stringValue: validated.title },
          description: { stringValue: validated.description },
          clientId: { stringValue: validated.clientId },
          status: { stringValue: validated.status },
          content: { stringValue: validated.content },
          planningPrice: { integerValue: String(validated.planningPrice || 0) },
          planningPaid: { booleanValue: false },
          developmentPrice: {
            integerValue: String(validated.developmentPrice || 0),
          },
          developmentPaid: { booleanValue: false },
          testingPrice: { integerValue: String(validated.testingPrice || 0) },
          testingPaid: { booleanValue: false },
          ai_integrationPrice: {
            integerValue: String(validated.ai_integrationPrice || 0),
          },
          ai_integrationPaid: { booleanValue: false },
          completedPrice: {
            integerValue: String(validated.completedPrice || 0),
          },
          completedPaid: { booleanValue: false },
        },
      }),
    });

    if (!res.ok) {
      const err = (await res.json()) as { error?: { message?: string } };
      return { success: false, error: err.error?.message || "Mentési hiba." };
    }

    return { success: true, message: "Workflow sikeresen létrehozva!" };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Hiba a workflow mentése során.",
    };
  }
}

/**
 * Superadmin: Update an existing workflow status or details.
 */
export async function updateWorkflowAction(
  workflowId: string,
  data: Partial<WorkflowData>,
  idToken: string
) {
  const user = await verifyUserToken(idToken);
  if (!user || !user.isAdmin) {
    return {
      success: false,
      error: "Csak adminisztrátorok módosíthatják a workflow-kat.",
    };
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId)
    return { success: false, error: "Hiányzó projekt konfiguráció." };

  try {
    // Generate the patch payload
    const fields: Record<string, FirestoreField> = {};
    const updateMasks: string[] = [];

    if (data.title !== undefined) {
      fields.title = { stringValue: data.title };
      updateMasks.push("updateMask.fieldPaths=title");
    }
    if (data.description !== undefined) {
      fields.description = { stringValue: data.description };
      updateMasks.push("updateMask.fieldPaths=description");
    }
    if (data.clientId !== undefined) {
      fields.clientId = { stringValue: data.clientId };
      updateMasks.push("updateMask.fieldPaths=clientId");
    }
    if (data.status !== undefined) {
      fields.status = { stringValue: data.status };
      updateMasks.push("updateMask.fieldPaths=status");
    }
    if (data.content !== undefined) {
      fields.content = { stringValue: data.content };
      updateMasks.push("updateMask.fieldPaths=content");
    }
    if (data.planningPrice !== undefined) {
      fields.planningPrice = { integerValue: String(data.planningPrice) };
      updateMasks.push("updateMask.fieldPaths=planningPrice");
    }
    if (data.planningPaid !== undefined) {
      fields.planningPaid = { booleanValue: data.planningPaid };
      updateMasks.push("updateMask.fieldPaths=planningPaid");
    }
    if (data.developmentPrice !== undefined) {
      fields.developmentPrice = { integerValue: String(data.developmentPrice) };
      updateMasks.push("updateMask.fieldPaths=developmentPrice");
    }
    if (data.developmentPaid !== undefined) {
      fields.developmentPaid = { booleanValue: data.developmentPaid };
      updateMasks.push("updateMask.fieldPaths=developmentPaid");
    }
    if (data.testingPrice !== undefined) {
      fields.testingPrice = { integerValue: String(data.testingPrice) };
      updateMasks.push("updateMask.fieldPaths=testingPrice");
    }
    if (data.testingPaid !== undefined) {
      fields.testingPaid = { booleanValue: data.testingPaid };
      updateMasks.push("updateMask.fieldPaths=testingPaid");
    }
    if (data.ai_integrationPrice !== undefined) {
      fields.ai_integrationPrice = {
        integerValue: String(data.ai_integrationPrice),
      };
      updateMasks.push("updateMask.fieldPaths=ai_integrationPrice");
    }
    if (data.ai_integrationPaid !== undefined) {
      fields.ai_integrationPaid = { booleanValue: data.ai_integrationPaid };
      updateMasks.push("updateMask.fieldPaths=ai_integrationPaid");
    }
    if (data.completedPrice !== undefined) {
      fields.completedPrice = { integerValue: String(data.completedPrice) };
      updateMasks.push("updateMask.fieldPaths=completedPrice");
    }
    if (data.completedPaid !== undefined) {
      fields.completedPaid = { booleanValue: data.completedPaid };
      updateMasks.push("updateMask.fieldPaths=completedPaid");
    }

    if (updateMasks.length === 0) {
      return { success: false, error: "Nincs módosítandó mező." };
    }

    const maskParams = updateMasks.join("&");
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/workflows/${workflowId}?${maskParams}`;

    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({ fields }),
    });

    if (!res.ok) {
      const err = (await res.json()) as { error?: { message?: string } };
      return {
        success: false,
        error: err.error?.message || "Sikertelen frissítés.",
      };
    }

    return { success: true, message: "Workflow sikeresen frissítve!" };
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Hiba a frissítés során.",
    };
  }
}

/**
 * Superadmin: Delete a workflow.
 */
export async function deleteWorkflowAction(
  workflowId: string,
  idToken: string
) {
  const user = await verifyUserToken(idToken);
  if (!user || !user.isAdmin) {
    return {
      success: false,
      error: "Csak adminisztrátorok törölhetnek workflow-kat.",
    };
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId)
    return { success: false, error: "Hiányzó projekt konfiguráció." };

  try {
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/workflows/${workflowId}`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (!res.ok) {
      return { success: false, error: "Nem sikerült törölni a workflow-t." };
    }

    return { success: true, message: "Workflow sikeresen törölve!" };
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Hiba a törlés során.",
    };
  }
}

/**
 * Superadmin: List users/clients in the system.
 */
export async function listUsersAction(idToken: string) {
  const user = await verifyUserToken(idToken);
  if (!user || !user.isAdmin) {
    return {
      success: false,
      error: "Csak adminisztrátorok listázhatják a felhasználókat.",
    };
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId)
    return { success: false, error: "Hiányzó projekt konfiguráció." };

  try {
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/users`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (!res.ok) {
      return {
        success: false,
        error: "Nem sikerült letölteni a felhasználók listáját.",
      };
    }

    const rawData = (await res.json()) as FirestoreListResponse;
    const usersList: UserListItem[] = [];

    if (rawData.documents) {
      rawData.documents.forEach((doc) => {
        const fields = doc.fields;
        const parts = doc.name.split("/");
        const id = parts[parts.length - 1];

        usersList.push({
          id,
          uid: fields.uid?.stringValue || id,
          email: fields.email?.stringValue || "",
          name: fields.name?.stringValue || "Névtelen Ügyfél",
          role: fields.role?.stringValue || "client",
          allowedTools:
            fields.allowedTools?.arrayValue?.values
              ?.map((v) => v.stringValue ?? "")
              .filter((s) => s.length > 0) ?? [],
          hasPromptAccess: fields.hasPromptAccess?.booleanValue ?? false,
        });
      });
    }

    return { success: true, users: usersList };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Hiba a felhasználók listázása során.",
    };
  }
}

/**
 * Superadmin: Create a client user account.
 * Registers the user in Firebase Auth and adds their profile to the users collection.
 */
export async function createClientUserAction(
  data: ClientUserData,
  idToken: string
) {
  const adminUser = await verifyUserToken(idToken);
  if (!adminUser || !adminUser.isAdmin) {
    return {
      success: false,
      error: "Csak adminisztrátorok hozhatnak létre felhasználókat.",
    };
  }

  const validation = clientUserSchema.safeParse(data);
  if (!validation.success) {
    return {
      success: false,
      error: "Validációs hiba.",
      details: validation.error.flatten(),
    };
  }

  const { email, name } = validation.data;
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!apiKey || !projectId) {
    return { success: false, error: "Hiányzó projekt konfiguráció." };
  }

  try {
    // 1. Register in Firebase Auth via REST API
    // Default temporary password
    const defaultPassword =
      "WebDude" + Math.floor(1000 + Math.random() * 9000) + "!";
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
      const err = (await authRes.json()) as { error?: { message?: string } };
      return {
        success: false,
        error:
          err.error?.message === "EMAIL_EXISTS"
            ? "Ez az e-mail cím már regisztrálva van!"
            : err.error?.message || "Nem sikerült regisztrálni a felhasználót.",
      };
    }

    const authData = (await authRes.json()) as { localId: string };
    const uid = authData.localId;

    // 2. Save user profile to Firestore 'users' collection
    const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/users/${uid}`;
    const firestoreRes = await fetch(firestoreUrl, {
      method: "PATCH", // PATCH acts as set (upsert) for specific doc path
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
          "A felhasználó létrejött az Auth-ban, de a Firestore profil mentése sikertelen volt.",
      };
    }

    // 3. Send Onboarding Welcome Email
    let emailStatusMessage = "Ügyfél sikeresen létrehozva!";
    let mailWarning: string | undefined = undefined;
    try {
      const mailRes = await sendWelcomeEmailAction(
        email,
        name,
        defaultPassword
      );
      if (mailRes.success) {
        if (mailRes.warning) {
          mailWarning = mailRes.warning;
        } else {
          emailStatusMessage =
            "Ügyfél sikeresen létrehozva és az onboarding értesítő kiküldve!";
        }
      } else {
        mailWarning = `Felhasználó létrejött, de a kiküldés sikertelen volt: ${mailRes.error}`;
      }
    } catch (err: unknown) {
      mailWarning = `E-mail küldési hiba: ${err instanceof Error ? err.message : "Ismeretlen hiba"}`;
    }

    return {
      success: true,
      uid,
      password: defaultPassword,
      message: emailStatusMessage,
      warning: mailWarning,
    };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Hiba a regisztráció során.",
    };
  }
}

/**
 * Client: Approve the current workflow phase.
 */
export async function approveWorkflowPhaseAction(
  idToken: string,
  workflowId: string
) {
  const user = await verifyUserToken(idToken);
  if (!user) {
    return { success: false, error: "Jogosulatlan hozzáférés." };
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId)
    return { success: false, error: "Hiányzó projekt konfiguráció." };

  try {
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/workflows/${workflowId}?updateMask.fieldPaths=approvedByClient&updateMask.fieldPaths=clientApprovedAt`;

    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        fields: {
          approvedByClient: { booleanValue: true },
          clientApprovedAt: { stringValue: new Date().toISOString() },
        },
      }),
    });

    if (!res.ok) {
      const err = (await res.json()) as { error?: { message?: string } };
      return {
        success: false,
        error: err.error?.message || "Sikertelen jóváhagyás.",
      };
    }

    return { success: true, message: "Fázis sikeresen jóváhagyva!" };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Hiba a jóváhagyás során.",
    };
  }
}

/**
 * Client/Admin: Add a comment to a workflow chat feed.
 */
export async function addWorkflowCommentAction(
  idToken: string,
  workflowId: string,
  text: string
) {
  const user = await verifyUserToken(idToken);
  if (!user) {
    return { success: false, error: "Jogosulatlan hozzáférés." };
  }

  const cleanedText = text.trim();
  if (cleanedText.length < 2 || cleanedText.length > 1000) {
    return {
      success: false,
      error: "A kommentnek 2 és 1000 karakter között kell lennie!",
    };
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId)
    return { success: false, error: "Hiányzó projekt konfiguráció." };

  try {
    // 1. Resolve author name
    let authorName = "Ügyfél";
    if (user.isAdmin) {
      authorName = "Norbi (WebDude)";
    } else {
      try {
        const profileRes = await fetch(
          `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/users/${user.uid}`,
          {
            headers: { Authorization: `Bearer ${idToken}` },
          }
        );
        if (profileRes.ok) {
          const profile = (await profileRes.json()) as {
            fields?: { name?: { stringValue?: string } };
          };
          authorName = profile.fields?.name?.stringValue || "Ügyfél";
        }
      } catch {
        authorName = "Ügyfél";
      }
    }

    // 2. Post comment document
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/workflows/${workflowId}/comments`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        fields: {
          authorId: { stringValue: user.uid },
          authorName: { stringValue: authorName },
          text: { stringValue: cleanedText },
          createdAt: { timestampValue: new Date().toISOString() },
        },
      }),
    });

    if (!res.ok) {
      const err = (await res.json()) as { error?: { message?: string } };
      return {
        success: false,
        error: err.error?.message || "Nem sikerült elmenteni a kommentet.",
      };
    }

    return { success: true, message: "Komment sikeresen hozzáadva!" };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Hiba a komment mentése során.",
    };
  }
}

interface FirestoreCommentDocument {
  name: string;
  fields: {
    authorId: { stringValue: string };
    authorName: { stringValue: string };
    text: { stringValue: string };
    createdAt: { timestampValue: string };
  };
}

/**
 * Client/Admin: Get all comments for a workflow.
 */
export async function getWorkflowCommentsAction(
  idToken: string,
  workflowId: string
) {
  const user = await verifyUserToken(idToken);
  if (!user) {
    return { success: false, error: "Jogosulatlan hozzáférés." };
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId)
    return { success: false, error: "Hiányzó projekt konfiguráció." };

  try {
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/workflows/${workflowId}/comments`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (!res.ok) {
      // If collection is empty, Firestore REST API can return 404. Handle this safely.
      if (res.status === 404) {
        return { success: true, comments: [] };
      }
      return { success: false, error: "Nem sikerült betölteni a kommenteket." };
    }

    const data = (await res.json()) as {
      documents?: FirestoreCommentDocument[];
    };
    const docs = data.documents || [];

    const comments: ChatMessage[] = docs.map((doc) => {
      const parts = doc.name.split("/");
      const id = parts[parts.length - 1];
      return {
        id,
        authorId: doc.fields.authorId.stringValue || "",
        authorName: doc.fields.authorName.stringValue || "",
        text: doc.fields.text.stringValue || "",
        createdAt: doc.fields.createdAt.timestampValue || "",
      };
    });

    // Sort chronologically in memory to avoid index requirements
    comments.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    return { success: true, comments };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Hiba a kommentek betöltése során.",
    };
  }
}

export async function getClientUserProfileAction(idToken: string) {
  const user = await verifyUserToken(idToken);
  if (!user) {
    return { success: false, error: "Jogosulatlan hozzáférés." };
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) {
    return { success: false, error: "Firebase Project ID nincs konfigurálva." };
  }

  try {
    const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/users/${user.uid}`;
    const res = await fetch(firestoreUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (!res.ok) {
      // If it doesn't exist, return a default profile
      return {
        success: true,
        profile: {
          uid: user.uid,
          email: user.email,
          role: "client",
          allowedTools: [],
        },
      };
    }

    const doc = (await res.json()) as FirestoreDocument;
    const fields = doc.fields;

    const allowedTools: string[] = [];
    if (fields.allowedTools?.arrayValue?.values) {
      fields.allowedTools.arrayValue.values.forEach((val) => {
        if (val.stringValue) allowedTools.push(val.stringValue);
      });
    }

    return {
      success: true,
      profile: {
        uid: user.uid,
        email: user.email,
        name: fields.name?.stringValue || "",
        role: fields.role?.stringValue || "client",
        allowedTools,
      },
    };
  } catch (error: unknown) {
    console.error("Profile fetch error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Hiba a profil letöltésekor.",
      profile: {
        uid: user.uid,
        email: user.email,
        role: "client",
        allowedTools: [],
      },
    };
  }
}
