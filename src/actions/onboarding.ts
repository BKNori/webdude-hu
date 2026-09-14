"use server";

import { verifyUserToken } from "./portal";
import { revalidatePath } from "next/cache";

interface FirestoreOrderDoc {
  name: string;
  fields: {
    title?: { stringValue?: string };
    addonId?: { stringValue?: string };
    clientId?: { stringValue?: string };
  };
}

/**
 * Server action to submit onboarding requirements for a purchased add-on.
 * Updates the order status to 'in-progress' and automatically initializes a client workflow card.
 */
export async function submitOnboardingDataAction(
  idToken: string,
  orderId: string,
  category: "cro" | "tech" | "ai" | "design",
  data: Record<string, string>
) {
  const user = await verifyUserToken(idToken);
  if (!user) {
    return { success: false, error: "Jogosulatlan hozzáférés." };
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) {
    return { success: false, error: "Firebase Project ID nincs konfigurálva." };
  }

  try {
    // 1. Fetch the corresponding order details from Firestore
    const orderUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/orders/${orderId}`;
    const orderRes = await fetch(orderUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (!orderRes.ok) {
      return {
        success: false,
        error: "Nem sikerült megtalálni a megrendelést.",
      };
    }

    const orderDoc = (await orderRes.json()) as FirestoreOrderDoc;
    const orderFields = orderDoc.fields;

    // Security check: ensure the client owns the order (unless Admin)
    const orderClientId = orderFields.clientId?.stringValue;
    if (!user.isAdmin && orderClientId !== user.uid) {
      return {
        success: false,
        error: "Ehhez a megrendeléshez nincs hozzáférési jogosultságod.",
      };
    }

    const addonTitle =
      orderFields.title?.stringValue || "Kiegészítő szolgáltatás";

    // 2. Generate detailed Markdown summary and description from submitted fields
    let summaryContent = "";
    let briefDesc = "";

    if (category === "design") {
      summaryContent =
        `### 🎨 Dizájn Onboarding Részletek\n` +
        `- **Weboldal URL:** ${data.websiteUrl || "Nincs megadva"}\n` +
        `- **Arculati Színek:** ${data.brandColors || "Nincs megadva"}\n` +
        `- **Dizájn Irányelvek / Referenciák:** ${data.designGuidelines || "Nincs megadva"}`;
      briefDesc = `UX/UI igények leadva. Színek: ${data.brandColors}.`;
    } else if (category === "tech") {
      summaryContent =
        `### ⚡ Technikai Onboarding Részletek\n` +
        `- **Weboldal URL:** ${data.websiteUrl || "Nincs megadva"}\n` +
        `- **Tárhelyszolgáltató:** ${data.hostingProvider || "Nincs megadva"}\n` +
        `- **Használt CMS / Technológia:** ${data.techStack || "Nincs megadva"}`;
      briefDesc = `Technikai igények leadva. Webhely: ${data.websiteUrl}. Tárhely: ${data.hostingProvider}.`;
    } else if (category === "ai") {
      summaryContent =
        `### 🤖 AI Integrációs Onboarding Részletek\n` +
        `- **Célközönség:** ${data.targetAudience || "Nincs megadva"}\n` +
        `- **Preferált Témák / Kulcsszavak:** ${data.preferredTopics || "Nincs megadva"}\n` +
        `- **AI Célkitűzések:** ${data.aiObjectives || "Nincs megadva"}`;
      briefDesc = `AI igények leadva. Célközönség: ${data.targetAudience}.`;
    } else if (category === "cro") {
      summaryContent =
        `### 📈 CRO Onboarding Részletek\n` +
        `- **Weboldal URL:** ${data.websiteUrl || "Nincs megadva"}\n` +
        `- **Elsődleges Cél:** ${data.primaryGoal || "Nincs megadva"}\n` +
        `- **Fő Versenytársak:** ${data.competitors || "Nincs megadva"}`;
      briefDesc = `Landing page CRO igények leadva. Cél: ${data.primaryGoal}.`;
    }

    // 3. Update the order record in Firestore (set onboardingSubmitted, status to 'in-progress')
    const patchOrderUrl = `${orderUrl}?updateMask.fieldPaths=onboardingSubmitted&updateMask.fieldPaths=onboardingData&updateMask.fieldPaths=onboardingSubmittedAt&updateMask.fieldPaths=status`;
    const patchRes = await fetch(patchOrderUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        fields: {
          onboardingSubmitted: { booleanValue: true },
          onboardingData: { stringValue: JSON.stringify(data) },
          onboardingSubmittedAt: { timestampValue: new Date().toISOString() },
          status: { stringValue: "in-progress" },
        },
      }),
    });

    if (!patchRes.ok) {
      return {
        success: false,
        error: "Nem sikerült frissíteni a megrendelési adatlapot.",
      };
    }

    // 4. Automatically insert a new active workflow timeline in Firestore 'workflows'
    const createWorkflowUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/workflows`;
    const workflowDoc = {
      fields: {
        title: {
          stringValue: `Add-on Projekt: ${addonTitle.replace("WebDude - ", "")}`,
        },
        description: { stringValue: briefDesc },
        clientId: { stringValue: orderClientId || user.uid },
        status: { stringValue: "planning" },
        content: { stringValue: summaryContent },
        createdAt: { timestampValue: new Date().toISOString() },

        // Mark all milestones as 0 HUF & paid since add-on was paid at purchase
        planningPrice: { integerValue: "0" },
        planningPaid: { booleanValue: true },
        developmentPrice: { integerValue: "0" },
        developmentPaid: { booleanValue: true },
        testingPrice: { integerValue: "0" },
        testingPaid: { booleanValue: true },
        ai_integrationPrice: { integerValue: "0" },
        ai_integrationPaid: { booleanValue: true },
        completedPrice: { integerValue: "0" },
        completedPaid: { booleanValue: true },
      },
    };

    const workflowRes = await fetch(createWorkflowUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(workflowDoc),
    });

    if (!workflowRes.ok) {
      // Log warning but do not fail the overall action since order was successfully updated
      console.warn(
        "Failed to automatically initialize workflow document for order:",
        orderId
      );
    }

    // Revalidate dashboard path to render the new timeline card
    revalidatePath("/portal");

    return { success: true };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Ismeretlen hiba történt a beküldés során.",
    };
  }
}
