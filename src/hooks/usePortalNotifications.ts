"use client";

import { useEffect, useState } from "react";
import {
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db, auth } from "@/lib/firebase";

interface NotificationCounts {
  pendingGenerations: number;
  completedGenerations: number;
  failedGenerations: number;
  newVaultFiles: number;
  total: number;
}

/**
 * Valós idejű értesítési mechanizmus a Portál felületéhez.
 * Követi a user_generations (státusz változások) és a client_files (új dokumentumok)
 * kollekciókat, és badge számlálót ad vissza.
 * Anti-drain: onSnapshot cleanup a komponens unmount-ján.
 */
export function usePortalNotifications() {
  const [counts, setCounts] = useState<NotificationCounts>({
    pendingGenerations: 0,
    completedGenerations: 0,
    failedGenerations: 0,
    newVaultFiles: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth?.currentUser;
    if (!user || !db) {
      // Avoid synchronous setState in effect
      setTimeout(() => setLoading(false), 0);
      return;
    }

    const uid = user.uid;

    // 1. Generálások követése (user_generations kollekció)
    const generationsQuery = query(
      collection(db, "user_generations"),
      where("userId", "==", uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribeGenerations = onSnapshot(
      generationsQuery,
      (snapshot) => {
        let pending = 0;
        let completed = 0;
        let failed = 0;

        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          const status = data?.status;

          if (status === "processing") {
            pending++;
          } else if (status === "completed") {
            completed++;
          } else if (status === "failed") {
            failed++;
          }
        });

        setCounts((prev) => ({
          ...prev,
          pendingGenerations: pending,
          completedGenerations: completed,
          failedGenerations: failed,
          total: pending + completed + failed + prev.newVaultFiles,
        }));
        setLoading(false);
      },
      (error) => {
        console.error(
          "usePortalNotifications: generálások követése hiba",
          error
        );
        setLoading(false);
      }
    );

    // 2. Vault dokumentumok követése (client_files kollekció)
    const vaultQuery = query(
      collection(db, "client_files"),
      where("clientId", "==", uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribeVault = onSnapshot(
      vaultQuery,
      (snapshot) => {
        const newFiles = snapshot.docs.length;

        setCounts((prev) => ({
          ...prev,
          newVaultFiles: newFiles,
          total:
            prev.pendingGenerations +
            prev.completedGenerations +
            prev.failedGenerations +
            newFiles,
        }));
      },
      (error) => {
        console.error("usePortalNotifications: vault követése hiba", error);
      }
    );

    // Cleanup mindkét listener
    return () => {
      unsubscribeGenerations();
      unsubscribeVault();
    };
  }, []);

  return { counts, loading };
}
