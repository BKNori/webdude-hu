import React from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import LeadKanbanBoard from "@/components/organisms/LeadKanbanBoard";
import { Lead } from "@/components/molecules/LeadKanbanCard";

// Force dynamic rendering to always fetch fresh leads on server side if possible
export const revalidate = 0;

async function fetchLeadsServer(): Promise<Lead[]> {
  if (!db) return [];
  try {
    const leadsRef = collection(db, "leads");
    const q = query(leadsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const leadsData: Lead[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      let status = data.status || "new";
      if (status === "pending") status = "new";

      leadsData.push({
        id: doc.id,
        name: data.name || "Névtelen",
        email: data.email || "",
        projectType: data.projectType || "contact",
        budget: data.budget,
        summary: data.summary || data.message || "",
        status: (["new", "contacted", "proposal_sent", "closed"].includes(
          status
        )
          ? status
          : "new") as Lead["status"],
        createdAt: data.createdAt
          ? {
              seconds: data.createdAt.seconds || 0,
              nanoseconds: data.createdAt.nanoseconds || 0,
            }
          : { seconds: 0, nanoseconds: 0 },
      });
    });

    return leadsData;
  } catch {
    // Insufficient permissions is expected during static build or local unauthenticated SSR.
    // Client-side component will fall back and fetch data dynamically in the browser.
    return [];
  }
}

export default async function AdminLeadsPage() {
  const leads = await fetchLeadsServer();

  return (
    <div className="space-y-8">
      {/* Header and Title */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#00B5F1] font-mono tracking-wide uppercase">
          CRM Dashboard
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Kapcsolatfelvételek és több lépcsős ajánlatkérések kezelése
        </p>
      </div>

      {/* Kanban Board with Client-side Fallback & KPI calculations */}
      <LeadKanbanBoard initialLeads={leads} />
    </div>
  );
}
