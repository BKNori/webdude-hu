"use server";

import { z } from "zod";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { headers } from "next/headers";
import { checkRateLimit, getClientIdentifier } from "@/lib/rate-limit";

// Zod schema for Quote Request validation
const quoteRequestSchema = z.object({
  name: z
    .string()
    .min(2, { message: "A névnek legalább 2 karakterből kell állnia!" }),
  email: z.string().email({ message: "Kérlek, érvényes email címet adj meg!" }),
  projectType: z.enum(["webpage", "webshop", "graphics", "ai", "contact"], {
    errorMap: () => ({ message: "Kérlek, válassz érvényes projekt típust!" }),
  }),
  budget: z.enum(["under_500k", "500k_1m", "1m_2m", "over_2m"], {
    errorMap: () => ({ message: "Kérlek, válassz érvényes költségkeretet!" }),
  }),
  summary: z
    .string()
    .min(10, { message: "Az üzenetnek legalább 10 karakterből kell állnia!" }),
});

export type QuoteRequestData = z.infer<typeof quoteRequestSchema>;

/**
 * Validates and submits a new lead to the Firestore 'leads' collection.
 * Applies rate limiting for anti-abuse.
 */
export async function createLeadFromFormAction(data: QuoteRequestData) {
  // Use existing submitQuoteRequest to handle validation and Firestore write
  const result = await submitQuoteRequest(data);

  // If the lead was successfully saved, trigger ISR revalidation for the admin leads page
  if (result.success) {
    try {
      // Import revalidatePath from Next.js cache API
      // Note: In a Server Action, we can import directly at top, but using dynamic import avoids circular issues
      // However, we have static import available; adding at top is fine
      // We'll call revalidatePath here

      const { revalidatePath } = await import("next/cache");
      revalidatePath("/admin/leads");
    } catch (e) {
      // If revalidation fails, log but do not block the response
      console.error("Failed to revalidate admin leads page:", e);
    }
  }
  return result;
}

export async function submitQuoteRequest(data: QuoteRequestData) {
  // Rate limiting check (max 5 requests per hour per client)
  const headersList = await headers();
  const req = { headers: headersList } as unknown as Request;
  const identifier = getClientIdentifier(req);
  const rateLimitResult = checkRateLimit(identifier, 5, 3600000); // 5 requests per hour

  if (!rateLimitResult.success) {
    return {
      success: false,
      error: "Túl sok üzenetküldési kísérlet. Kérlek, próbáld meg később!",
    };
  }

  // Zod validation on the server side
  const validationResult = quoteRequestSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      error: "Validációs hiba történt. Ellenőrizd a megadott adatokat!",
      details: validationResult.error.errors,
    };
  }

  const validated = validationResult.data;

  try {
    if (!db) {
      return {
        success: false,
        error: "Az adatbázis-kapcsolat nem érhető el.",
      };
    }

    const leadsRef = collection(db, "leads");
    await addDoc(leadsRef, {
      name: validated.name,
      email: validated.email,
      projectType: validated.projectType,
      budget: validated.budget,
      summary: validated.summary,
      status: "new", // Default status for new requests
      createdAt: serverTimestamp(),
    });

    return {
      success: true,
      message:
        "Ajánlatkérésed sikeresen beérkezett! Hamarosan felveszem veled a kapcsolatot.",
    };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Hiba történt a beküldés során. Kérlek, próbáld újra!",
    };
  }
}

/**
 * Verifies if the provided Firebase ID Token belongs to a superadmin user.
 */
async function verifyAdminToken(idToken: string): Promise<boolean> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    if (!apiKey) return false;

    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      }
    );

    if (!res.ok) return false;
    const data = await res.json();
    const user = data.users?.[0];
    if (!user) return false;

    if (user.customAttributes) {
      const claims = JSON.parse(user.customAttributes);
      return claims.superadmin === true;
    }
    return false;
  } catch {
    return false;
  }
}

/**
 * Server Action to update the status of a lead.
 * Requires superadmin ID token authentication.
 */
export async function updateLeadStatusAction(
  leadId: string,
  newStatus: "new" | "contacted" | "proposal_sent" | "closed",
  idToken: string
) {
  // 1. Verify token & superadmin status
  const isAdmin = await verifyAdminToken(idToken);
  if (!isAdmin) {
    return {
      success: false,
      error:
        "Jogosulatlan hozzáférés. Csak adminisztrátorok módosíthatják a státuszt.",
    };
  }

  try {
    // 2. Perform the update using REST API on behalf of the admin (passing their ID token)
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    if (!projectId) {
      return {
        success: false,
        error: "Firebase Project ID nincs konfigurálva.",
      };
    }

    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/leads/${leadId}?updateMask.fieldPaths=status`;

    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        fields: {
          status: { stringValue: newStatus },
        },
      }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      return {
        success: false,
        error:
          errData.error?.message ||
          "Nem sikerült frissíteni a státuszt a Firestore-ban.",
      };
    }

    return {
      success: true,
      message: "A lead státusza sikeresen módosítva!",
    };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Hiba történt a státusz frissítése közben.",
    };
  }
}

export { createLeadFromFormAction as createLeadAction };
