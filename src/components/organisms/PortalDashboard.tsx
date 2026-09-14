"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  getClientWorkflowsAction,
  approveWorkflowPhaseAction,
  getClientOrdersAction,
  deliverOrderAction,
  verifyUserToken,
  getClientUserProfileAction,
  listUsersAction,
} from "@/actions/portal";
import AddonStore from "@/components/organisms/AddonStore";
import {
  createStripeCheckoutSessionAction,
  verifyStripePaymentAction,
} from "@/actions/stripe";
import ClientAITools from "@/components/organisms/ClientAITools";
import ClientVault from "@/components/organisms/ClientVault";
import AdminPanel from "@/components/organisms/AdminPanel";
import CaseStudyCarousel from "@/components/organisms/CaseStudyCarousel";
import { getAddonsAction } from "@/actions/addons";
import { Order, Addon } from "@/types/addon";
import {
  Loader2,
  LogOut,
  Layers,
  Calendar,
  Activity,
  CheckCircle2,
  Play,
  Compass,
  AlertCircle,
  Clock,
  UserCheck,
  Sparkles,
  ThumbsUp,
  CreditCard,
  Copy,
} from "lucide-react";
import { motion } from "motion/react";
import OrderStatusCard from "@/components/molecules/OrderStatusCard";
import OnboardingForm from "@/components/molecules/OnboardingForm";
import WorkflowChat from "@/components/organisms/WorkflowChat";

// Local Workflow definition
interface Workflow {
  id: string;
  title: string;
  description: string;
  clientId: string;
  status:
    "planning" | "development" | "testing" | "ai_integration" | "completed";
  content: string;
  createdAt: string;
  approvedByClient?: boolean;
  clientApprovedAt?: string;

  // Pricing & payment fields
  planningPrice?: number;
  planningPaid?: boolean;
  developmentPrice?: number;
  developmentPaid?: boolean;
  testingPrice?: number;
  testingPaid?: boolean;
  ai_integrationPrice?: number;
  ai_integrationPaid?: boolean;
  completedPrice?: number;
  completedPaid?: boolean;
}

interface PortalUser {
  id: string;
  uid: string;
  email: string;
  name: string;
  role: string;
}

const categoryMap: Record<string, "cro" | "tech" | "ai" | "design"> = {
  addon_ux_roast: "design",
  addon_speed_opt: "tech",
  addon_seo_article: "ai",
  addon_cro_audit: "cro",
  addon_security_pack: "tech",
  addon_ai_chatbot: "ai",
};

const statusConfig = {
  planning: {
    label: "Tervezés / Audit",
    color: "border-amber-500/30 text-amber-500 bg-amber-500/5",
    progress: 25,
    icon: Compass,
  },
  development: {
    label: "Fejlesztés alatt",
    color: "border-blue-500/30 text-blue-400 bg-blue-500/5",
    progress: 50,
    icon: Play,
  },
  testing: {
    label: "Tesztelés / QA",
    color: "border-purple-500/30 text-purple-400 bg-purple-500/5",
    progress: 75,
    icon: Activity,
  },
  ai_integration: {
    label: "AI Integráció & AEO Optimalizálás",
    color:
      "border-amber-500/40 text-amber-500 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.05)]",
    progress: 90,
    icon: Sparkles,
  },
  completed: {
    label: "Átadva / Kész",
    color: "border-emerald-500/30 text-emerald-400 bg-emerald-500/5",
    progress: 100,
    icon: CheckCircle2,
  },
};

export default function PortalDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [idToken, setIdToken] = useState<string>("");
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [allowedTools, setAllowedTools] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [verifyingPayment, setVerifyingPayment] = useState(false);
  const [activeTab, setActiveTab] = useState<"portal" | "admin">("portal");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [allUsers, setAllUsers] = useState<PortalUser[]>([]);
  const [allAddons, setAllAddons] = useState<Addon[]>([]);
  const [userTools, setUserTools] = useState<Record<string, string[]>>({});

  const handlePayMilestone = async (workflowId: string, phase: string) => {
    if (!auth?.currentUser) return;
    setActionLoading(`pay_${workflowId}_${phase}`);
    setError("");
    setSuccessMessage("");

    try {
      const idToken = await auth.currentUser.getIdToken(true);
      const res = await createStripeCheckoutSessionAction(
        idToken,
        workflowId,
        phase,
        window.location.origin
      );
      if (res.success && res.url) {
        window.location.assign(res.url);
      } else {
        setError(res.error || "Nem sikerült elindítani a fizetési folyamatot.");
      }
    } catch {
      setError("Kapcsolódási hiba a fizetés indításakor.");
    } finally {
      setActionLoading(null);
    }
  };

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/admin/login");
        return;
      }
      setUser(currentUser);

      try {
        const token = await currentUser.getIdToken(true);
        setIdToken(token);
        // Determine admin status
        const authInfo = await verifyUserToken(token);
        const isAdminUser = authInfo?.isAdmin ?? false;
        setIsAdmin(isAdminUser);

        if (isAdminUser && currentUser.email === "hello@webdude.hu") {
          const [usersRes, addonsRes] = await Promise.all([
            listUsersAction(token),
            getAddonsAction(token),
          ]);
          if (usersRes.success && usersRes.users) {
            setAllUsers(usersRes.users);
            setUserTools({}); // Initialize empty tools map
          }
          if (addonsRes.success && addonsRes.addons) {
            setAllAddons(addonsRes.addons);
          }
        }

        // Fetch user profile to get allowedTools
        const profileRes = await getClientUserProfileAction(token);
        if (profileRes.success && profileRes.profile) {
          // Superadmin (hello@webdude.hu) gets access to all tools automatically
          if (isAdminUser && currentUser.email === "hello@webdude.hu") {
            setAllowedTools([
              "product_desc",
              "review_assistant",
              "social_matrix",
              "cart_recovery",
              "midjourney_prompt",
              "banner_concept",
              "logo_designer",
              "ui_ux_designer",
              "seasonal_campaign_designer",
              "kristofka_workflow",
            ]);
          } else {
            // Only users assigned by Superadmin get access
            const userAllowedTools = profileRes.profile.allowedTools || [];
            if (userAllowedTools.length === 0) {
              setError(
                "Hozzáférés megtagadva. Csak a Superadmin által hozzárendelt felhasználók férhetnek hozzá az ügyfélportálhoz!"
              );
              setLoading(false);
              return;
            }
            setAllowedTools(userAllowedTools);
          }
        }

        const result = await getClientWorkflowsAction(token);

        if (result.success && result.workflows) {
          setWorkflows(result.workflows as Workflow[]);
        } else {
          setError(result.error || "Nem sikerült letölteni a workflow-kat.");
        }

        // Fetch client orders
        const ordersRes = await getClientOrdersAction(token);
        if (ordersRes.success && ordersRes.orders) {
          setOrders(ordersRes.orders);
        } else {
          setError(
            ordersRes.error || "Nem sikerült letölteni a megrendeléseket."
          );
        }
      } catch {
        setError("Hálózati hiba a profil és a workflow-k lekérése során.");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!auth || !user) return;

    const params = new URLSearchParams(window.location.search);
    const hasSuccess = params.get("payment_success") === "true";
    const sessionId = params.get("session_id");

    if (hasSuccess && sessionId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVerifyingPayment(true);
      setError("");
      setSuccessMessage("");

      user
        .getIdToken(true)
        .then(async (token) => {
          const res = await verifyStripePaymentAction(token, sessionId);
          if (res.success) {
            setSuccessMessage(
              res.message || "Sikeres fizetés! Köszönjük a bizalmadat!"
            );

            // Strip queries from address bar
            const cleanUrl = window.location.pathname;
            window.history.replaceState({}, document.title, cleanUrl);

            // Refresh workflows
            const updated = await getClientWorkflowsAction(token);
            if (updated.success && updated.workflows) {
              setWorkflows(updated.workflows as Workflow[]);
            }
          } else {
            setError(res.error || "Nem sikerült ellenőrizni a fizetést.");
          }
        })
        .catch(() => {
          setError("Hiba történt a fizetés hitelesítése során.");
        })
        .finally(() => {
          setVerifyingPayment(false);
        });
    } else if (params.get("payment_cancelled") === "true") {
      setError("A fizetés megszakadt vagy el lett utasítva.");
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, [user]);

  const handleLogout = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
      router.push("/admin/login");
    } catch {
      setError("Hiba a kijelentkezés során.");
    }
  };

  const handleApprovePhase = async (workflowId: string) => {
    if (!auth?.currentUser) return;

    setActionLoading(workflowId);
    setError("");

    // Optimistic UI Update
    setWorkflows((prev) =>
      prev.map((w) =>
        w.id === workflowId
          ? {
              ...w,
              approvedByClient: true,
              clientApprovedAt: new Date().toISOString(),
            }
          : w
      )
    );

    try {
      const idToken = await auth.currentUser.getIdToken(true);
      const res = await approveWorkflowPhaseAction(idToken, workflowId);
      if (!res.success) {
        // Rollback
        setWorkflows((prev) =>
          prev.map((w) =>
            w.id === workflowId
              ? { ...w, approvedByClient: false, clientApprovedAt: undefined }
              : w
          )
        );
        setError(res.error || "Nem sikerült jóváhagyni a fázist.");
      }
    } catch {
      setError("Kapcsolódási hiba a fázis jóváhagyásakor.");
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("hu-HU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
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
      {/* Header / Navigation */}
      <header className="border-b border-amber-500/20 bg-bg-surface/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/10">
                <Layers className="w-5 h-5 text-bg-base" />
              </div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <span className="text-lg font-bold text-text-primary tracking-tight">
                  WebDude
                </span>
              </motion.div>
            </div>
            {/* Portal Navigation */}
            <nav className="flex items-center gap-3 sm:gap-4 ml-3 sm:ml-6">
              <Link
                href="/portal"
                className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-slate-400 hover:text-amber-500 transition-colors"
              >
                Projektek
              </Link>
              <Link
                href="/portal/ai-muhely"
                className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-amber-500 hover:text-amber-400 transition-colors flex items-center gap-1"
              >
                <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                Műhely
              </Link>
              {isAdmin && user?.email === "hello@webdude.hu" && (
                <Link
                  href="/portal/prompt-sablonok"
                  className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-slate-400 hover:text-amber-500 transition-colors flex items-center gap-1"
                >
                  <Copy className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                  Sablonok
                </Link>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700 text-xs">
              <UserCheck className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-text-primary font-medium truncate max-w-37.5">
                {user.email}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-700 hover:border-red-500/40 text-slate-400 hover:text-red-400 transition-colors text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Kijelentkezés</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {/* Title area */}
        <div className="space-y-2">
          <span className="text-xs font-mono font-black uppercase tracking-widest text-amber-500">
            Aktív Projektek & Workflow
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-text-primary tracking-tight font-mono">
            Munkafolyamatok
          </h1>
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
                  ? "border-amber-500 text-amber-500"
                  : "border-transparent text-slate-500 hover:text-amber-500"
              }`}
            >
              Kliens Nézet / Portál
            </button>
            <button
              onClick={() => setActiveTab("admin")}
              className={`pb-4 px-6 font-mono text-xs font-black uppercase tracking-wider cursor-pointer border-b-2 transition-all ${
                activeTab === "admin"
                  ? "border-amber-500 text-amber-500"
                  : "border-transparent text-slate-500 hover:text-amber-500"
              }`}
            >
              Rendszer Admin
            </button>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-2xl text-xs flex items-center gap-2.5 max-w-2xl font-mono">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        {successMessage && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-2xl text-xs flex items-center gap-2.5 max-w-2xl font-mono">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            {successMessage}
          </div>
        )}

        {verifyingPayment && (
          <div className="fixed inset-0 bg-transparent backdrop-blur-md z-100 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
            <p className="text-sm font-bold font-mono text-white uppercase tracking-wider animate-pulse">
              Stripe tranzakció ellenőrzése...
            </p>
          </div>
        )}

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
            {workflows.length === 0 ? (
              <div className="bg-slate-900/80 border border-amber-500/20 rounded-3xl p-12 text-center max-w-2xl mx-auto space-y-4">
                <Clock className="w-12 h-12 text-slate-500 mx-auto animate-pulse" />
                <h3 className="text-lg font-bold text-text-primary font-mono">
                  Nincs még hozzárendelt workflow
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                  Jelenleg nem található aktív fejlesztési folyamat ehhez a
                  fiókhoz. Hamarosan elkészítem a workflow-dat, és itt fogod
                  látni az előrehaladást!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {workflows.map((wf) => {
                  const config =
                    statusConfig[wf.status] || statusConfig.planning;
                  const StatusIcon = config.icon;
                  const isApproved = wf.approvedByClient === true;

                  return (
                    <div
                      key={wf.id}
                      className="bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:border-amber-500/50 transition-all duration-300 shadow-xl group"
                    >
                      <div className="space-y-6">
                        {/* Header */}
                        <div className="flex justify-between items-start gap-4">
                          <div className="space-y-2">
                            <span
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider ${config.color}`}
                            >
                              <StatusIcon className="w-3.5 h-3.5" />
                              {config.label}
                            </span>
                            <h3 className="text-xl md:text-2xl font-bold text-text-primary leading-tight font-mono">
                              {wf.title}
                            </h3>
                          </div>

                          <div className="w-10 h-10 rounded-xl bg-transparent border border-slate-700 flex items-center justify-center shrink-0">
                            <Activity className="w-5 h-5 text-amber-500" />
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-[10px] font-mono text-text-secondary">
                            <span>Előrehaladás</span>
                            <span className="font-bold text-text-primary">
                              {config.progress}%
                            </span>
                          </div>
                          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                            <motion.div
                              className="h-full bg-linear-to-r from-amber-500 to-amber-600 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${config.progress}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                            />
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-slate-400 leading-relaxed">
                          {wf.description}
                        </p>

                        {/* Detail block */}
                        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4 md:p-5 space-y-3">
                          <span className="text-[10px] uppercase font-black tracking-widest text-slate-500 block">
                            Jegyzetek & Lépések
                          </span>
                          <p className="text-xs text-slate-400 whitespace-pre-wrap leading-relaxed">
                            {wf.content}
                          </p>
                        </div>

                        {/* Payment Box (Stripe Integration) */}
                        {(() => {
                          const phase = wf.status;
                          const priceKey = `${phase}Price` as keyof Workflow;
                          const paidKey = `${phase}Paid` as keyof Workflow;
                          const phasePrice = wf[priceKey]
                            ? (wf[priceKey] as number)
                            : 0;
                          const phasePaid = wf[paidKey] === true;

                          if (phasePrice <= 0) return null;

                          return (
                            <div className="border-t border-slate-700 pt-4 space-y-3">
                              <span className="text-[10px] uppercase font-black tracking-widest text-slate-500 block">
                                Pénzügyi Mérföldkő
                              </span>
                              {phasePaid ? (
                                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-2xl flex items-center justify-between text-xs">
                                  <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                                    <div>
                                      <span className="font-bold block">
                                        ✓ Mérföldkő kiegyenlítve
                                      </span>
                                      <span className="text-[10px] text-emerald-500/70 font-mono block">
                                        Díj:{" "}
                                        {phasePrice.toLocaleString("hu-HU")} Ft
                                        • Fizetve
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="bg-amber-500/5 border border-amber-500/10 p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3">
                                  <div>
                                    <span className="text-xs font-bold text-slate-300 block">
                                      Aktuális mérföldkő kifizetése
                                    </span>
                                    <span className="text-[10px] text-amber-500 font-mono font-bold block mt-0.5">
                                      Díj: {phasePrice.toLocaleString("hu-HU")}{" "}
                                      Ft (Fizetésre vár)
                                    </span>
                                  </div>

                                  <button
                                    type="button"
                                    disabled={
                                      actionLoading === `pay_${wf.id}_${phase}`
                                    }
                                    onClick={() =>
                                      handlePayMilestone(wf.id, phase)
                                    }
                                    className="flex items-center justify-center gap-1.5 px-4 py-2 bg-linear-to-r from-amber-500 to-amber-600 text-bg-base font-bold text-xs uppercase tracking-wider rounded-xl hover:scale-[1.02] transition-all cursor-pointer shrink-0 disabled:opacity-50"
                                  >
                                    {actionLoading ===
                                    `pay_${wf.id}_${phase}` ? (
                                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                    ) : (
                                      <>
                                        <CreditCard className="w-3.5 h-3.5" />
                                        Fizetés Stripe-pal
                                      </>
                                    )}
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        })()}

                        {/* Approval Box */}
                        <div className="border-t border-slate-700 pt-4 space-y-3">
                          {isApproved ? (
                            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-2xl flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 shrink-0" />
                                <div>
                                  <span className="font-bold block">
                                    ✓ Fázis jóváhagyva
                                  </span>
                                  {wf.clientApprovedAt && (
                                    <span className="text-[10px] text-emerald-500/70 font-mono block">
                                      Jóváhagyva:{" "}
                                      {formatDate(wf.clientApprovedAt)}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="bg-amber-500/5 border border-amber-500/10 p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3">
                              <div>
                                <span className="text-xs font-bold text-slate-300 block">
                                  Kérlek hagyd jóvá az aktuális fázist!
                                </span>
                                <span className="text-[10px] text-slate-500 block mt-0.5">
                                  Ha elégedett vagy a tervekkel / részletekkel,
                                  indítsd el a következő lépést.
                                </span>
                              </div>

                              <button
                                type="button"
                                disabled={actionLoading === wf.id}
                                onClick={() => handleApprovePhase(wf.id)}
                                className="flex items-center justify-center gap-1.5 px-4 py-2 bg-linear-to-r from-amber-500 to-amber-600 text-bg-base font-bold text-xs uppercase tracking-wider rounded-xl hover:scale-[1.02] transition-all cursor-pointer shrink-0 disabled:opacity-50"
                              >
                                {actionLoading === wf.id ? (
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                  <>
                                    <ThumbsUp className="w-3.5 h-3.5" />
                                    Jóváhagyás
                                  </>
                                )}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Workflow Chat */}
                      <WorkflowChat
                        workflowId={wf.id}
                        idToken={idToken}
                        currentUserUid={user.uid}
                      />

                      {/* Footer info */}
                      <div className="flex items-center justify-between border-t border-slate-700 pt-4 mt-6 text-[10px] text-slate-500 font-mono">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          <span>Létrehozva: {formatDate(wf.createdAt)}</span>
                        </div>
                        <span className="text-amber-500/40">ID: {wf.id}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Client Onboarding Section */}
            {!isAdmin &&
              orders.some(
                (o) => o.status === "paid" && !o.onboardingSubmitted
              ) && (
                <section className="mb-12 space-y-6">
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-black uppercase tracking-widest text-amber-500">
                      Kötelező lépések
                    </span>
                    <h2 className="text-2xl font-extrabold text-text-primary tracking-tight font-mono">
                      Onboarding Adatlapok Kitöltése
                    </h2>
                    <p className="text-slate-400 text-xs max-w-xl">
                      Kérlek, töltsd ki az onboarding adatlapot a megvásárolt
                      add-onokhoz, hogy elkezdhessem a munkát!
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {orders
                      .filter(
                        (o) => o.status === "paid" && !o.onboardingSubmitted
                      )
                      .map((order) => {
                        const category = categoryMap[order.addonId] || "design";
                        return (
                          <div
                            key={order.id}
                            className="bg-slate-900/80 border border-slate-700 backdrop-blur-md rounded-2xl p-6 space-y-4"
                          >
                            <div className="flex justify-between items-center">
                              <h3 className="font-bold text-text-primary text-base font-mono">
                                {order.title}
                              </h3>
                              <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                                Kitöltésre vár
                              </span>
                            </div>
                            <p className="text-xs text-slate-400">
                              Kérlek, add meg a szükséges technikai / dizájn
                              részleteket az alábbi űrlapon.
                            </p>
                            <OnboardingForm
                              orderId={order.id}
                              category={category}
                              onSubmitSuccess={async () => {
                                // Refresh orders after submission
                                const refreshed =
                                  await getClientOrdersAction(idToken);
                                if (refreshed?.success && refreshed.orders)
                                  setOrders(refreshed.orders);
                              }}
                            />
                          </div>
                        );
                      })}
                  </div>
                </section>
              )}

            {/* Add-on Store Section */}
            <AddonStore
              idToken={idToken}
              onOrderError={(msg: string) => setError(msg)}
            />
            {/* Orders Section */}
            {isAdmin && orders.length > 0 && (
              <section className="mt-12">
                <h2 className="text-xl font-bold text-slate-100 mb-4">
                  Megrendelések
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {orders.map((order) => (
                    <OrderStatusCard
                      key={order.id}
                      order={order}
                      isAdmin={isAdmin}
                      onDeliver={async (
                        orderId: string,
                        notes: string,
                        url: string
                      ) => {
                        const res = await deliverOrderAction(
                          idToken,
                          orderId,
                          notes,
                          url
                        );
                        if (!res.success) {
                          setError(res.error || "Kézbesítés sikertelen");
                        } else {
                          setSuccessMessage(
                            res.message || "Rendelés kézbesítve"
                          );
                          // Refresh orders after delivery
                          const refreshed =
                            await getClientOrdersAction(idToken);
                          if (refreshed?.success && refreshed.orders)
                            setOrders(refreshed.orders);
                        }
                      }}
                    />
                  ))}
                </div>
              </section>
            )}

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
      </main>
    </div>
  );
}
