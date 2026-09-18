"use client";

import { useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  approveWorkflowPhaseAction,
  deliverOrderAction,
  getClientOrdersAction,
  getClientWorkflowsAction,
} from "@/actions/portal";
import {
  createStripeCheckoutSessionAction,
  verifyStripePaymentAction,
} from "@/actions/stripe";
import type { Order } from "@/types/addon";
import type { Workflow } from "@/types/portal";

/** usePortalData bemenetek és visszatérési érték. */
export interface PortalDataInput {
  user: User | null;
  idToken: string;
  onReport: (message: string) => void;
  onReportSuccess: (message: string) => void;
  onPaymentVerified: () => void;
}

export interface PortalData {
  workflows: Workflow[];
  orders: Order[];
  verifyingPayment: boolean;
  actionLoading: string | null;
  handlePayMilestone: (workflowId: string, phase: string) => Promise<void>;
  handleApprovePhase: (workflowId: string) => Promise<void>;
  handleDeliverOrder: (orderId: string, notes: string, url: string) => Promise<void>;
  refreshOrders: () => Promise<void>;
  formatDate: (dateStr: string) => string;
}

/**
 * Ügyfélportál workflow- és rendelés-adatok.
 *
 * Az eredeti PortalDashboard-komponens adatkezelésének változatlan
 * logikája: workflow-k és rendelések betöltése, mérföldkő-fizetés,
 * fázis-jóváhagyás (optimistic UI + rollback), rendelés-kézbesítés,
 * Stripe-fizetés utóellenőrzés és dátumformázás.
 */
export function usePortalData({
  user,
  idToken,
  onReport,
  onReportSuccess,
  onPaymentVerified,
}: PortalDataInput): PortalData {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [verifyingPayment, setVerifyingPayment] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [reportError, setReportError] = useState<string | null>(null);
  const [reportSuccess, setReportSuccess] = useState<string | null>(null);

  const handlePayMilestone = async (workflowId: string, phase: string) => {
    if (!auth?.currentUser) return;
    setActionLoading(`pay_${workflowId}_${phase}`);
    setReportSuccess(null);
    setReportError(null);

    try {
      const token = await auth.currentUser.getIdToken(true);
      const res = await createStripeCheckoutSessionAction(
        token,
        workflowId,
        phase,
        window.location.origin
      );
      if (res.success && res.url) {
        window.location.assign(res.url);
      } else {
        setReportError(res.error || "Nem sikerült elindítani a fizetési folyamatot.");
      }
    } catch {
      setReportError("Kapcsolódási hiba a fizetés indításakor.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleApprovePhase = async (workflowId: string) => {
    if (!auth?.currentUser) return;

    setActionLoading(workflowId);
    setReportError(null);

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
      const token = await auth.currentUser.getIdToken(true);
      const res = await approveWorkflowPhaseAction(token, workflowId);
      if (!res.success) {
        // Rollback
        setWorkflows((prev) =>
          prev.map((w) =>
            w.id === workflowId
              ? { ...w, approvedByClient: false, clientApprovedAt: undefined }
              : w
          )
        );
        setReportError(res.error || "Nem sikerült jóváhagyni a fázist.");
      }
    } catch {
      setReportError("Kapcsolódási hiba a fázis jóváhagyásakor.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeliverOrder = async (
    orderId: string,
    notes: string,
    url: string
  ) => {
    if (!idToken) return;

    const res = await deliverOrderAction(idToken, orderId, notes, url);
    if (!res.success) {
      setReportError(res.error || "Kézbesítés sikertelen");
    } else {
      setReportSuccess(res.message || "Rendelés kézbesítve");
      // Refresh orders after delivery
      const refreshed = await getClientOrdersAction(idToken);
      if (refreshed?.success && refreshed.orders) {
        setOrders(refreshed.orders);
      }
    }
  };

  const refreshOrders = async () => {
    if (!idToken) return;

    // Refresh orders after submission
    const refreshed = await getClientOrdersAction(idToken);
    if (refreshed?.success && refreshed.orders) {
      setOrders(refreshed.orders);
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

  useEffect(() => {
    if (!auth || !user) return;

    const params = new URLSearchParams(window.location.search);
    const hasSuccess = params.get("payment_success") === "true";
    const sessionId = params.get("session_id");

    if (hasSuccess && sessionId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVerifyingPayment(true);
      setReportSuccess(null);
      setReportError(null);

      user
        .getIdToken(true)
        .then(async (token) => {
          const res = await verifyStripePaymentAction(token, sessionId);
          if (res.success) {
            setReportSuccess(
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
            onPaymentVerified();
          } else {
            setReportError(res.error || "Nem sikerült ellenőrizni a fizetést.");
          }
        })
        .catch(() => {
          setReportError("Hiba történt a fizetés hitelesítése során.");
        })
        .finally(() => {
          setVerifyingPayment(false);
        });
    } else if (params.get("payment_cancelled") === "true") {
      setReportError("A fizetés megszakadt vagy el lett utasítva.");
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, [user, onPaymentVerified]);

  // Adatok egyszeri betöltése bejelentkezés után.
  useEffect(() => {
    if (!auth || !user) return;

    let isMounted = true;
    const loadWorkflowsAndOrders = async () => {
      const token = idToken;

      const result = await getClientWorkflowsAction(token);

      if (result.success && result.workflows) {
        if (isMounted) setWorkflows(result.workflows as Workflow[]);
      } else if (isMounted) {
        setReportError(result.error || "Nem sikerült letölteni a workflow-kat.");
      }

      const ordersRes = await getClientOrdersAction(token);
      if (ordersRes.success && ordersRes.orders) {
        if (isMounted) setOrders(ordersRes.orders);
      } else if (isMounted) {
        setReportError(
          ordersRes.error || "Nem sikerült letölteni a megrendeléseket."
        );
      }
    };

    loadWorkflowsAndOrders();

    return () => {
      isMounted = false;
    };
  }, [user, idToken]);

  // Jelentések (error/success) továbbítása a host felé.
  useEffect(() => {
    if (reportError !== null) onReport(reportError);
  }, [reportError, onReport]);
  useEffect(() => {
    if (reportSuccess !== null) onReportSuccess(reportSuccess);
  }, [reportSuccess, onReportSuccess]);

  return {
    workflows,
    orders,
    verifyingPayment,
    actionLoading,
    handlePayMilestone,
    handleApprovePhase,
    handleDeliverOrder,
    refreshOrders,
    formatDate,
  };
}
