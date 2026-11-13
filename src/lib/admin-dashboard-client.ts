import {
  collection,
  getCountFromServer,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

/**
 * Admin Dashboard — kliensoldali Firestore fallback.
 *
 * A `src/actions/admin-dashboard.ts` Server Action a kliens SDK-t
 * szerveroldalon, auth token nélkül használja, ezért cPanelen (hiányzó
 * Service Account kulcs) `7 PERMISSION_DENIED` hibát dob. Ilyenkor a
 * `/admin/dashboard` komponens erre a modulra vált: a bejelentkezett
 * szuperadmin (hello@webdude.hu) auth tokenje a kliens SDK-n keresztül
 * automatikusan Bearer-ként utazik, és a `firestore.rules` `isHelloAdmin()`
 * szabálya teljes hozzáférést ad neki.
 *
 * A lekérdezések és aggregációk a Server Action-beli logika pontos
 * tükrei — ugyanazokat a mezőket és számításokat végzi.
 */

export interface DashboardStats {
  leadsCount: number;
  activeProjectsCount: number;
  completedProjectsCount: number;
  onboardingLeadsCount: number;
  seoAuditsCount: number;
  competitorAnalysesCount: number;
  contentPlansCount: number;
  monthlyRevenue: number;
  revenueTrend: string;
  avgCompletionTime: number;
  leadConversionRate: number;
  churnRate: number;
  ltv: number;
  cac: number;
  revenueByService: Array<{ service: string; revenue: number }>;
}

export interface CsvExportResult {
  csvContent: string;
  filename: string;
}

/** Teljes dashboard statisztika kliens SDK-val. `null` ha db nem elérhető. */
export async function fetchDashboardStatsClient(): Promise<DashboardStats | null> {
  if (!db) return null;

  const leadsCol = collection(db, "leads");
  const leadsCount = (await getCountFromServer(leadsCol)).data().count;

  const projectsCol = collection(db, "projects");
  const activeProjectsCount = (
    await getCountFromServer(query(projectsCol, where("status", "==", "active")))
  ).data().count;
  const completedProjectsQuery = query(
    projectsCol,
    where("status", "==", "completed")
  );
  const completedProjectsCount = (
    await getCountFromServer(completedProjectsQuery)
  ).data().count;
  const completedProjectsDetailSnap = await getDocs(completedProjectsQuery);

  const onboardingLeadsCount = (
    await getCountFromServer(
      query(leadsCol, where("status", "==", "onboarding"))
    )
  ).data().count;

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const iso30 = thirtyDaysAgo.toISOString();

  const seoAuditsCount = (
    await getCountFromServer(
      query(collection(db, "seo_audits"), where("createdAt", ">=", iso30))
    )
  ).data().count;
  const competitorAnalysesCount = (
    await getCountFromServer(
      query(
        collection(db, "competitor_analyses"),
        where("createdAt", ">=", iso30)
      )
    )
  ).data().count;
  const contentPlansCount = (
    await getCountFromServer(
      query(collection(db, "content_plans"), where("createdAt", ">=", iso30))
    )
  ).data().count;

  const transactionsCol = collection(db, "transactions");
  const transactionsSnap = await getDocs(
    query(transactionsCol, where("createdAt", ">=", iso30))
  );
  let monthlyRevenue = 0;
  transactionsSnap.forEach((d) => {
    const amount = d.data().amount;
    if (amount) monthlyRevenue += amount;
  });

  const previousThirtyDaysAgo = new Date();
  previousThirtyDaysAgo.setDate(previousThirtyDaysAgo.getDate() - 60);
  const previousTransactionsSnap = await getDocs(
    query(
      transactionsCol,
      where("createdAt", ">=", previousThirtyDaysAgo.toISOString()),
      where("createdAt", "<", iso30)
    )
  );
  let previousRevenue = 0;
  previousTransactionsSnap.forEach((d) => {
    const amount = d.data().amount;
    if (amount) previousRevenue += amount;
  });

  let revenueTrend = "0%";
  if (previousRevenue > 0) {
    const percentage =
      ((monthlyRevenue - previousRevenue) / previousRevenue) * 100;
    revenueTrend =
      percentage >= 0
        ? `+${percentage.toFixed(1)}%`
        : `${percentage.toFixed(1)}%`;
  }

  let totalCompletionTime = 0;
  let completedProjectCount = 0;
  completedProjectsDetailSnap.forEach((d) => {
    const data = d.data();
    if (data.createdAt && data.updatedAt) {
      const diffDays = Math.ceil(
        Math.abs(
          new Date(data.updatedAt).getTime() -
            new Date(data.createdAt).getTime()
        ) /
          (1000 * 60 * 60 * 24)
      );
      totalCompletionTime += diffDays;
      completedProjectCount++;
    }
  });
  const avgCompletionTime =
    completedProjectCount > 0
      ? totalCompletionTime / completedProjectCount
      : 0;

  const leadConversionRate =
    leadsCount > 0 ? (completedProjectsCount / leadsCount) * 100 : 0;

  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
  const iso90 = ninetyDaysAgo.toISOString();

  const activeCustomersSnap = await getDocs(
    query(transactionsCol, where("createdAt", ">=", iso90))
  );
  const totalCustomersSnap = await getDocs(transactionsCol);

  const totalCustomers = new Set(
    totalCustomersSnap.docs.map((d) => d.data().clientId)
  ).size;
  const activeCustomers = new Set(
    activeCustomersSnap.docs.map((d) => d.data().clientId)
  ).size;
  const churnRate =
    totalCustomers > 0
      ? ((totalCustomers - activeCustomers) / totalCustomers) * 100
      : 0;

  const revenueByCustomer = new Map<string, number>();
  totalCustomersSnap.forEach((d) => {
    const data = d.data();
    revenueByCustomer.set(
      data.clientId,
      (revenueByCustomer.get(data.clientId) || 0) + (data.amount || 0)
    );
  });
  const ltv =
    revenueByCustomer.size > 0
      ? Array.from(revenueByCustomer.values()).reduce((a, b) => a + b, 0) /
        revenueByCustomer.size
      : 0;

  let totalMarketingSpend = 0;
  (await getDocs(collection(db, "marketing_spend"))).forEach((d) => {
    const amount = d.data().amount;
    if (amount) totalMarketingSpend += amount;
  });

  const newCustomers = new Set(
    activeCustomersSnap.docs.map((d) => d.data().clientId)
  ).size;
  const cac = newCustomers > 0 ? totalMarketingSpend / newCustomers : 0;

  const revenueByServiceMap = new Map<string, number>();
  totalCustomersSnap.forEach((d) => {
    const data = d.data();
    const service = data.serviceType || "Egyéb";
    revenueByServiceMap.set(
      service,
      (revenueByServiceMap.get(service) || 0) + (data.amount || 0)
    );
  });
  const revenueByService = Array.from(revenueByServiceMap.entries()).map(
    ([service, revenue]) => ({ service, revenue })
  );

  return {
    leadsCount,
    activeProjectsCount,
    completedProjectsCount,
    onboardingLeadsCount,
    seoAuditsCount,
    competitorAnalysesCount,
    contentPlansCount,
    monthlyRevenue,
    revenueTrend,
    avgCompletionTime,
    leadConversionRate,
    churnRate,
    ltv,
    cac,
    revenueByService,
  };
}

function toCsv(rows: (string | number)[][]): string {
  return rows.map((row) => row.join(",")).join("\n");
}

const dateStamp = () => new Date().toISOString().split("T")[0];

/** Leads CSV export kliens SDK-val (rules: isHelloAdmin olvasás). */
export async function exportLeadsCsvClient(): Promise<CsvExportResult | null> {
  if (!db) return null;
  const snap = await getDocs(collection(db, "leads"));
  const rows = snap.docs.map((d) => {
    const data = d.data();
    return [
      d.id,
      data.name || "",
      data.email || "",
      data.phone || "",
      data.status || "",
      data.createdAt || "",
    ];
  });
  return {
    csvContent: toCsv([
      ["ID", "Név", "Email", "Telefon", "Státusz", "Létrehozva"],
      ...rows,
    ]),
    filename: `leads_export_${dateStamp()}.csv`,
  };
}

/** Tranzakciók CSV export kliens SDK-val. */
export async function exportTransactionsCsvClient(): Promise<CsvExportResult | null> {
  if (!db) return null;
  const snap = await getDocs(collection(db, "transactions"));
  const rows = snap.docs.map((d) => {
    const data = d.data();
    return [
      d.id,
      data.clientId || "",
      data.amount || 0,
      data.currency || "HUF",
      data.status || "",
      data.stripePaymentIntentId || "",
      data.createdAt || "",
    ];
  });
  return {
    csvContent: toCsv([
      [
        "ID",
        "Ügyfél ID",
        "Összeg",
        "Valuta",
        "Státusz",
        "Stripe Payment Intent ID",
        "Létrehozva",
      ],
      ...rows,
    ]),
    filename: `transactions_export_${dateStamp()}.csv`,
  };
}

/** Projektek CSV export kliens SDK-val. */
export async function exportProjectsCsvClient(): Promise<CsvExportResult | null> {
  if (!db) return null;
  const snap = await getDocs(collection(db, "projects"));
  const rows = snap.docs.map((d) => {
    const data = d.data();
    return [
      d.id,
      data.clientId || "",
      data.title || "",
      data.description || "",
      data.status || "",
      data.createdAt || "",
      data.updatedAt || "",
    ];
  });
  return {
    csvContent: toCsv([
      [
        "ID",
        "Ügyfél ID",
        "Cím",
        "Leírás",
        "Státusz",
        "Létrehozva",
        "Frissítve",
      ],
      ...rows,
    ]),
    filename: `projects_export_${dateStamp()}.csv`,
  };
}
