"use client";

import { useCallback, useState } from "react";
import { Loader2 } from "lucide-react";
import AdminPanel from "@/components/organisms/AdminPanel";
import PortalAlerts from "@/components/organisms/portal/PortalAlerts";
import PortalClientWorkspace from "@/components/organisms/portal/PortalClientWorkspace";
import PortalHeader from "@/components/organisms/portal/PortalHeader";
import PortalHeroAndTabs from "@/components/organisms/portal/PortalHeroAndTabs";
import { usePortalData } from "@/hooks/usePortalData";
import { usePortalSession } from "@/hooks/usePortalSession";
import type { PortalTab } from "@/types/portal";

export default function PortalDashboard() {
  const [activeTab, setActiveTab] = useState<PortalTab>("portal");

  // Munkamenet: Firebase Auth, jogosultságok, admin listák, hiba/siker üzenetek.
  const {
    user,
    idToken,
    isAdmin,
    allowedTools,
    loading,
    allUsers,
    allAddons,
    userTools,
    error,
    successMessage,
    setError,
    setSuccessMessage,
    handleLogout,
  } = usePortalSession();

  // A usePortalData payment-callbackje szándékosan üres és stabil:
  // a workflow-k frissítését a hook belsőleg végzi, a jelentések pedig a
  // session hibakezelőjére futnak (useCallback → nem indul újra az effect).
  const handlePaymentVerified = useCallback(() => {}, []);

  // Adatok és akciók: workflow-k, megrendelések, Stripe mérföldkő-fizetés,
  // fázis-jóváhagyás (optimistic UI), kézbesítés, dátumformázás.
  const {
    workflows,
    orders,
    verifyingPayment,
    actionLoading,
    handlePayMilestone,
    handleApprovePhase,
    handleDeliverOrder,
    refreshOrders,
    formatDate,
  } = usePortalData({
    user,
    idToken,
    onReport: setError,
    onReportSuccess: setSuccessMessage,
    onPaymentVerified: handlePaymentVerified,
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-brand-primary" />
        <p className="text-sm text-text-secondary font-sans">
          Biztonságos ügyfélkapu betöltése...
        </p>
      </div>
    );
  }

  if (!user) return null;

  const isSuperAdmin = Boolean(isAdmin && user.email === "hello@webdude.hu");

  return (
    <div
      id="portal-layout"
      className="min-h-screen bg-bg-base text-text-primary"
    >
      <PortalHeader user={user} isAdmin={isAdmin} onLogout={handleLogout} />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        <PortalHeroAndTabs
          isSuperAdmin={isSuperAdmin}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <PortalAlerts
          error={error}
          successMessage={successMessage}
          verifyingPayment={verifyingPayment}
        />

        {activeTab === "admin" && isSuperAdmin ? (
          <div
            id="portal-panel-admin"
            role="tabpanel"
            aria-labelledby="portal-tab-admin"
          >
            <AdminPanel
              idToken={idToken}
              users={allUsers}
              addons={allAddons.map((a) => ({ id: a.id, name: a.title }))}
              userTools={userTools}
            />
          </div>
        ) : (
          <PortalClientWorkspace
            workflows={workflows}
            orders={orders}
            idToken={idToken}
            userUid={user.uid}
            isAdmin={isAdmin}
            allowedTools={allowedTools}
            actionLoading={actionLoading}
            formatDate={formatDate}
            onApprove={handleApprovePhase}
            onPay={handlePayMilestone}
            onDeliver={handleDeliverOrder}
            refreshOrders={refreshOrders}
          />
        )}
      </div>
    </div>
  );
}
