export interface AdminKpiPdfInput {
  mrr: number;
  totalRevenue: number;
  estimatedLtv: number;
  cac: number;
  churnRate: number;
  activeClients: number;
  leadsCount: number;
  portfolioCount?: number | null;
  totalGenerations?: number | null;
  revenueByService?: Array<{ service: string; revenue: number }>;
}

function formatHuf(value: number): string {
  const safeValue = Number.isFinite(value) ? value : 0;
  return new Intl.NumberFormat("hu-HU", {
    style: "currency",
    currency: "HUF",
    maximumFractionDigits: 0,
  }).format(safeValue);
}

/**
 * Dinamikus jsPDF alapú vezetői KPI összefoglaló exportálása (böngészőben).
 * A jsPDF könyvtár csak gombnyomáskor töltődik be az elsődleges bundle védelméhez.
 */
export async function exportAdminKpiPdf(
  input: AdminKpiPdfInput
): Promise<void> {
  if (typeof window === "undefined") return;

  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF();
  const currentDate = new Date().toLocaleDateString("hu-HU");

  doc.setFontSize(18);
  doc.setTextColor(0, 181, 241);
  doc.text("WebDude.hu - Vezetoi KPI & Statisztikai Jelentes", 20, 20);

  doc.setFontSize(10);
  doc.setTextColor(120, 120, 120);
  doc.text(`Generalva: ${currentDate} | Adminisztracios Osszefoglalo`, 20, 28);

  doc.setDrawColor(30, 41, 59);
  doc.line(20, 32, 190, 32);

  doc.setFontSize(13);
  doc.setTextColor(30, 41, 59);
  doc.text("1. Penzugyi es Ugyfel Metrikak", 20, 42);

  doc.setFontSize(10);
  doc.setTextColor(50, 50, 50);
  doc.text(`- Havi Visszatero Bevetel (MRR / havi): ${formatHuf(input.mrr)}`, 25, 52);
  doc.text(`- Osszes Bevetel (lezart tranzakciok): ${formatHuf(input.totalRevenue)}`, 25, 60);
  doc.text(`- Becsult Ugyfelertek (LTV): ${formatHuf(input.estimatedLtv)}`, 25, 68);
  doc.text(`- Ugyfelszerzesi Koltseg (CAC): ${formatHuf(input.cac)}`, 25, 76);
  doc.text(`- Lemondasi Rata (Churn Rate): ${input.churnRate}%`, 25, 84);
  doc.text(`- Aktiv Ugyfelek / Projektek szama: ${input.activeClients} db`, 25, 92);

  doc.setFontSize(13);
  doc.setTextColor(30, 41, 59);
  doc.text("2. CRM es Mukodesi Allapot", 20, 108);

  doc.setFontSize(10);
  doc.setTextColor(50, 50, 50);
  doc.text(`- Beerkezett Leadek szama: ${input.leadsCount} db`, 25, 118);
  if (typeof input.portfolioCount === "number") {
    doc.text(`- Portfolio Munkak: ${input.portfolioCount} db`, 25, 126);
  }
  if (typeof input.totalGenerations === "number") {
    doc.text(`- Lefuttatott AI Generalasok: ${input.totalGenerations} alkalom`, 25, 134);
  }

  const services = input.revenueByService ?? [];
  if (services.length > 0) {
    doc.setFontSize(13);
    doc.setTextColor(30, 41, 59);
    doc.text("3. Bevetel Szolgaltatasonkent", 20, 150);

    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);
    services.slice(0, 8).forEach((item, index) => {
      doc.text(
        `- ${item.service}: ${formatHuf(item.revenue)}`,
        25,
        160 + index * 8
      );
    });
  }

  doc.setDrawColor(200, 200, 200);
  doc.line(20, 270, 190, 270);
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text("Bizalmas - WebDude.hu belso vezetoi dokumentacio", 20, 276);

  doc.save(`webdude_kpi_report_${new Date().toISOString().split("T")[0]}.pdf`);
}
