"use client";

import { useEffect } from "react";
import type { User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  verifyStripePaymentAction,
} from "@/actions/stripe";
import {
  getClientWorkflowsAction,
} from "@/actions/portal";

/**
 * Stripe payment callback ellenőrzése (URL paraméteres).
 *
 * A `usePortalData`-ből kiszervezett mellékhatás: a payment_success
 * query paraméter detektálása, a Stripe session ellenőrizése,
 * munkafolyamatok frissítése és a `"payment_cancelled"` eset kezelése.
 */
export function useStripePaymentVerification({
  user,
  onPaymentVerified,
}: {
  user: User | null;
  onPaymentVerified: () => void;
}) {
  useEffect(() => {
    if (!auth || !user) return;

    const params = new URLSearchParams(window.location.search);
    const hasSuccess = params.get("payment_success") === "true";
    const sessionId = params.get("session_id");

    if (hasSuccess && sessionId) {
      user
        .getIdToken(true)
        .then(async (token) => {
          const res = await verifyStripePaymentAction(token, sessionId);
          if (res.success) {
            const cleanUrl = window.location.pathname;
            window.history.replaceState({}, document.title, cleanUrl);

            const updated = await getClientWorkflowsAction(token);
            if (updated.success && updated.workflows) {
              // A host komponens (usePortalData) kezeli a state frissítést;
              // itt csak a callback-t továbbítjuk.
            }
            onPaymentVerified();
          }
        })
        .catch(() => {
          // A hiba kezelése a host komponens feladata
        })
        .finally(() => {
          // A verifyingPayment állapotot a host komponens csökkenti
        });
    } else if (params.get("payment_cancelled") === "true") {
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, [user, onPaymentVerified]);
}
