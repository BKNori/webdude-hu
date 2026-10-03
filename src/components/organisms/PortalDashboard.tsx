"use client";

import { useCallback, useState } from "react";
import { Loader2 } from "lucide-react";
import AddonStore from "@/components/organisms/AddonStore";
import AdminPanel from "@/components/organisms/AdminPanel";
import CaseStudyCarousel from "@/components/organisms/CaseStudyCarousel";
import ClientAITools from "@/components/organisms/ClientAITools";
import ClientVault from "@/components/organisms/ClientVault";
import ProjectTimelineGantt from "@/components/molecules/ProjectTimelineGantt";
import PortalAlerts from "@/components/organisms/portal/PortalAlerts";
import PortalHeader from "@/components/organisms/portal/PortalHeader";
import PortalOnboardingSection from "@/components/organisms/portal/PortalOnboardingSection";
import PortalOrdersSection from "@/components/organisms/portal/PortalOrdersSection";
import PortalWorkflowGrid from "@/components/organisms/portal/PortalWorkflowGrid";
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
        <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
        <p className="text-sm text-text-secondary font-mono">
          Biztonságos ügyfélkapu betöltése...
        </p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div
      id="portal-layout"
      className="min-h-screen bg-bg-base text-text-primary"
    >
      <PortalHeader user={user} isAdmin={isAdmin} onLogout={handleLogout} />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {/* Title area */}
        <div className="space-y-2">
          <span className="text-xs font-mono font-black uppercase tracking-widest text-sky-500">
            Aktív Projektek & Workflow
          </span>
          {/**
           * `h2`, nem `h1`: az oldal egyetlen `h1`-je a `page.tsx`
           * Server Component `sr-only` címsora, ami a `!user`
           * (nem belépett) állapotban is jelen van. Ez a dashboard
           * a `page.tsx` címsor *alá* kerül a hierarchiában.
           */}
          <h2 className="text-3xl md:text-5xl font-extrabold text-text-primary tracking-tight font-mono">
            Munkafolyamatok
          </h2>
          <p className="text-slate-400 text-sm max-w-xl">
            Kövesd nyomon valós időben a weboldalad, webáruházad vagy AI
            automatizációd aktuális állapotát és mérföldköveit.
          </p>
        </div>

        {isAdmin && user?.email === "hello@webdude.hu" && (
          <div className="flex border-b border-slate-800 mt-4">
            <button
              onClick={() => setActiveTab("portal")}
              className={`pb-4 px-6 font-mono text-xs font-black uppercase tracking-wider cursor-pointer border-b-2 transition-all ${
                activeTab === "portal"
                  ? "border-sky-500 text-sky-500"
                  : "border-transparent text-slate-500 hover:text-sky-500"
              }`}
            >
              Kliens Nézet / Portál
            </button>
            <button
              onClick={() => setActiveTab("admin")}
              className={`pb-4 px-6 font-mono text-xs font-black uppercase tracking-wider cursor-pointer border-b-2 transition-all ${
                activeTab === "admin"
                  ? "border-sky-500 text-sky-500"
                  : "border-transparent text-slate-500 hover:text-sky-500"
              }`}
            >
              Rendszer Admin
            </button>
          </div>
        )}

        <PortalAlerts
          error={error}
          successMessage={successMessage}
          verifyingPayment={verifyingPayment}
        />

        {activeTab === "admin" &&
        isAdmin &&
        user?.email === "hello@webdude.hu" ? (
          <AdminPanel
            idToken={idToken}
            users={allUsers}
            addons={allAddons.map((a) => ({ id: a.id, name: a.title }))}
            userTools={userTools}
          />
        ) : (
          <>
            {/* Bento Grid */}
            <PortalWorkflowGrid
              workflows={workflows}
              idToken={idToken}
              userUid={user.uid}
              actionLoading={actionLoading}
              formatDate={formatDate}
              onApprove={handleApprovePhase}
              onPay={handlePayMilestone}
            />
            {/* Client Onboarding Section */}
            {!isAdmin && (
              <PortalOnboardingSection
                orders={orders}
                refreshOrders={refreshOrders}
              />
            )}

            {/* Add-on Store Section */}
            <AddonStore
              idToken={idToken}
              onOrderError={(msg: string) => setError(msg)}
            />

            {/* Orders Section (superadmin) */}
            <PortalOrdersSection
              orders={orders}
              isAdmin={isAdmin}
              onDeliver={handleDeliverOrder}
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
          </>
        )}
      </div>
    </div>
  );
}
