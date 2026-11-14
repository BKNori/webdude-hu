"use client";

import AddonStore from "@/components/organisms/AddonStore";
import CaseStudyCarousel from "@/components/organisms/CaseStudyCarousel";
import ClientAITools from "@/components/organisms/ClientAITools";
import ClientVault from "@/components/organisms/ClientVault";
import ProjectTimelineGantt from "@/components/molecules/ProjectTimelineGantt";
import PortalOnboardingSection from "@/components/organisms/portal/PortalOnboardingSection";
import PortalOrdersSection from "@/components/organisms/portal/PortalOrdersSection";
import PortalWorkflowGrid from "@/components/organisms/portal/PortalWorkflowGrid";
import type { Order } from "@/types/addon";
import type { Workflow } from "@/types/portal";

interface PortalClientWorkspaceProps {
  workflows: Workflow[];
  orders: Order[];
  idToken: string;
  userUid: string;
  isAdmin: boolean;
  allowedTools: string[];
  actionLoading: string | null;
  formatDate: (dateStr: string) => string;
  onApprove: (workflowId: string) => void;
  onPay: (workflowId: string, phase: string) => void;
  onDeliver: (orderId: string, notes: string, url: string) => Promise<void>;
  refreshOrders: () => Promise<void>;
}

/**
 * Az ügyfélportál fő munkaterülete (Kliens Nézet):
 * - Aktív workflow Bento Grid és fázis-jóváhagyás / mérföldkő-fizetés
 * - Onboarding kérdőívek és Add-on Store
 * - Megrendelések áttekintő (admin/kliens)
 * - Projekt idővonal & Gantt vizualizáció
 * - Ügyfélszéf (ClientVault) + Interaktív AI Eszközök (ClientAITools)
 * - Referencia esettanulmányok (CaseStudyCarousel)
 */
export default function PortalClientWorkspace({
  workflows,
  orders,
  idToken,
  userUid,
  isAdmin,
  allowedTools,
  actionLoading,
  formatDate,
  onApprove,
  onPay,
  onDeliver,
  refreshOrders,
}: PortalClientWorkspaceProps) {
  return (
    <div
      id="portal-panel-client"
      role="tabpanel"
      aria-labelledby="portal-tab-client"
      className="space-y-12"
    >
      {/* Bento Grid */}
      <PortalWorkflowGrid
        workflows={workflows}
        idToken={idToken}
        userUid={userUid}
        actionLoading={actionLoading}
        formatDate={formatDate}
        onApprove={onApprove}
        onPay={onPay}
      />

      {/* Client Onboarding Section */}
      {!isAdmin && (
        <PortalOnboardingSection
          orders={orders}
          refreshOrders={refreshOrders}
        />
      )}

      {/* Add-on Store Section */}
      <AddonStore idToken={idToken} />

      {/* Orders Section (superadmin) */}
      <PortalOrdersSection
        orders={orders}
        isAdmin={isAdmin}
        onDeliver={onDeliver}
      />

      {/* Projekt idővonal & Gantt */}
      <div className="pt-8 border-t border-bg-elevated/40">
        <ProjectTimelineGantt workflow={workflows[0]} />
      </div>

      {/* Client Vault & AI Tools Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8 border-t border-bg-elevated/40 items-start">
        <ClientVault />
        <ClientAITools allowedTools={allowedTools} isAdmin={isAdmin} />
      </div>

      {/* Case Study Carousel */}
      <div className="pt-8">
        <CaseStudyCarousel />
      </div>
    </div>
  );
}
