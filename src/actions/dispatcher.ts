"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { generateAICopilotResponseAction } from "@/actions/ai-copilot";
import { DISPATCHER_SYSTEM_PROMPT } from "@/actions/prompts/dispatcher-prompt";
import { getClientUserProfileAction } from "@/actions/portal";

export type DispatcherAuthInput =
  | string
  | { Authorization?: string; authorization?: string };

const taskIdSchema = z
  .string()
  .trim()
  .min(1, "A taskId nem lehet üres.")
  .max(128, "Érvénytelen taskId.");

async function requireAdmin(authInput?: DispatcherAuthInput): Promise<string> {
  let token: string | null = null;

  if (typeof authInput === "string" && authInput.trim()) {
    token = authInput.startsWith("Bearer ")
      ? authInput.slice(7).trim()
      : authInput.trim();
  } else if (authInput && typeof authInput === "object") {
    const rawHeader = authInput.Authorization || authInput.authorization;
    if (rawHeader && rawHeader.startsWith("Bearer ")) {
      token = rawHeader.slice(7).trim();
    } else if (rawHeader) {
      token = rawHeader.trim();
    }
  }

  if (!token) {
    const headersList = await headers();
    const authHeader = headersList.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.slice(7).trim();
    }
  }

  if (!token) {
    throw new Error("Hiányzó vagy érvénytelen hitelesítési token.");
  }

  const userProfile = await getClientUserProfileAction(token);
  if (!userProfile.success || !userProfile.profile) {
    throw new Error("Érvénytelen felhasználói profil.");
  }

  const isAdmin =
    userProfile.profile.role === "admin" ||
    userProfile.profile.email === "hello@webdude.hu" ||
    userProfile.profile.email === "admin@webdude.hu";

  if (!isAdmin) {
    throw new Error("Nincs admin jogosultság a feladatok kiosztásához.");
  }

  return token;
}

export async function autoAssignTaskAction(
  taskId: string,
  authHeader?: DispatcherAuthInput
) {
  if (!db) {
    return { success: false, error: "Firebase nincs konfigurálva." };
  }

  try {
    const verifiedToken = await requireAdmin(authHeader);

    const parsedTaskId = taskIdSchema.safeParse(taskId);
    if (!parsedTaskId.success) {
      return {
        success: false,
        error: "Érvénytelen feladat azonosító (taskId).",
      };
    }

    const validTaskId = parsedTaskId.data;

    // Lekérjük a feladatot
    const taskDocRef = doc(db, "incoming_tasks", validTaskId);
    const taskSnap = await getDoc(taskDocRef);

    if (!taskSnap.exists()) {
      return { success: false, error: "Task not found" };
    }

    const task = taskSnap.data();

    // Lekérjük az aktív projekteket (workflows)
    const workflowsQuery = query(
      collection(db, "workflows"),
      where("status", "==", "active")
    );
    const workflowsSnap = await getDocs(workflowsQuery);
    const workflows = workflowsSnap.docs.map((docSnap) => ({
      id: docSnap.id,
      name: docSnap.data().name || "Névtelen projekt",
    }));

    if (workflows.length === 0) {
      return {
        success: false,
        reason: "NEW_PROJECT_REQUIRED",
        message: "Nincsenek aktív projektek.",
      };
    }

    const prompt = `
      Feladat: "${task?.task_description}"
      Aktív projektek: ${JSON.stringify(workflows)}
      ${DISPATCHER_SYSTEM_PROMPT}
    `;

    const aiResult = await generateAICopilotResponseAction(
      "dummy-workflow-id",
      prompt,
      verifiedToken
    );

    if (!aiResult.success || !aiResult.response) {
      return { success: false, error: "AI döntés sikertelen." };
    }

    const result = aiResult.response.trim();

    if (result !== "HUMAN_REVIEW" && result !== "NEW_PROJECT_REQUIRED") {
      // Ellenőrizzük, hogy a workflow ID létezik
      const workflowDocRef = doc(db, "workflows", result);
      const workflowSnap = await getDoc(workflowDocRef);

      if (!workflowSnap.exists()) {
        return { success: false, error: "A kiválasztott projekt nem létezik." };
      }

      // Áthelyezés a workflow-ba (tasks subcollection)
      const tasksCollectionRef = collection(db, "workflows", result, "tasks");
      await addDoc(tasksCollectionRef, {
        ...task,
        assigned_at: new Date().toISOString(),
        source: "AI_DISPATCHER",
        original_task_id: validTaskId,
      });

      // WorkflowChat komment hozzáadása
      const commentsCollectionRef = collection(
        db,
        "workflows",
        result,
        "comments"
      );
      await addDoc(commentsCollectionRef, {
        author: "AI_COPILOT",
        authorName: "WebDude AI",
        text: `Norbi, automatikusan kiosztottam egy új feladatot: "${task.task_description}"`,
        created_at: new Date().toISOString(),
      });

      // Törlés az incoming-ból
      await deleteDoc(taskDocRef);

      return {
        success: true,
        assignedTo: result,
        workflowName: workflowSnap.data().name,
      };
    }

    return { success: false, reason: result, message: `AI döntés: ${result}` };
  } catch (error) {
    console.error("hiba az autoAssignTaskAction-ban:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Hiba történt a feladat kiosztásakor.",
    };
  }
}

export async function autoAssignAllPendingTasksAction(
  authHeader?: DispatcherAuthInput
) {
  if (!db) {
    return { success: false, error: "Firebase nincs konfigurálva." };
  }

  try {
    await requireAdmin(authHeader);

    // Lekérjük az összes pending feladatot
    const pendingTasksQuery = query(
      collection(db, "incoming_tasks"),
      where("status", "==", "pending")
    );
    const pendingTasksSnap = await getDocs(pendingTasksQuery);

    const results = [];

    for (const taskDoc of pendingTasksSnap.docs) {
      const result = await autoAssignTaskAction(taskDoc.id, authHeader);
      results.push({
        taskId: taskDoc.id,
        ...result,
      });
    }

    const assigned = results.filter((r) => r.success).length;
    const failed = results.filter((r) => !r.success).length;

    return {
      success: true,
      total: results.length,
      assigned,
      failed,
      results,
    };
  } catch (error) {
    console.error("hiba az autoAssignAllPendingTasksAction-ban:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Hiba történt a tömeges kiosztáskor.",
    };
  }
}
