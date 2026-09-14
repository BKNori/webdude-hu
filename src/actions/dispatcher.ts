"use server";

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

export async function autoAssignTaskAction(taskId: string) {
  if (!db) {
    return { success: false, error: "Firebase nincs konfigurálva." };
  }

  try {
    // Lekérjük a feladatot
    const taskDocRef = doc(db, "incoming_tasks", taskId);
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
    const workflows = workflowsSnap.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name || "Névtelen projekt",
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
      prompt
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
        original_task_id: taskId,
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
    return { success: false, error: "Hiba történt a feladat kiosztásakor." };
  }
}

export async function autoAssignAllPendingTasksAction() {
  if (!db) {
    return { success: false, error: "Firebase nincs konfigurálva." };
  }

  try {
    // Lekérjük az összes pending feladatot
    const pendingTasksQuery = query(
      collection(db, "incoming_tasks"),
      where("status", "==", "pending")
    );
    const pendingTasksSnap = await getDocs(pendingTasksQuery);

    const results = [];

    for (const taskDoc of pendingTasksSnap.docs) {
      const result = await autoAssignTaskAction(taskDoc.id);
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
    return { success: false, error: "Hiba történt a tömeges kiosztáskor." };
  }
}
