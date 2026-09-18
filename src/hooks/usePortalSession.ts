"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "firebase/auth";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  getAddonsAction,
} from "@/actions/addons";
import {
  getClientUserProfileAction,
  listUsersAction,
  verifyUserToken,
} from "@/actions/portal";
import type { Addon } from "@/types/addon";
import type { PortalUser } from "@/types/portal";
import { SUPERADMIN_TOOLS } from "@/lib/portalConfig";

/** usePortalSession visszatérési értéke. */
export interface PortalSession {
  user: User | null;
  idToken: string;
  isAdmin: boolean;
  allowedTools: string[];
  allUsers: PortalUser[];
  allAddons: Addon[];
  userTools: Record<string, string[]>;
  loading: boolean;
  error: string;
  successMessage: string;
  handleLogout: () => Promise<void>;
  setError: (message: string) => void;
  setSuccessMessage: (message: string) => void;
}

/**
 * Ügyfélportál auth- és profil-állapot.
 *
 * Az eredeti PortalDashboard-komponens 1. useEffect-blokkjának
 * változatlan logikája: Firebase auth figyelés, admin-státusz,
 * jogosultságok, admin listák és kijelentkezés.
 */
export function usePortalSession(): PortalSession {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [idToken, setIdToken] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [allowedTools, setAllowedTools] = useState<string[]>([]);
  const [allUsers, setAllUsers] = useState<PortalUser[]>([]);
  const [allAddons, setAllAddons] = useState<Addon[]>([]);
  const [userTools, setUserTools] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
            setAllowedTools([...SUPERADMIN_TOOLS]);
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
      } catch {
        setError("Hálózati hiba a profil és a workflow-k lekérése során.");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
      router.push("/admin/login");
    } catch {
      setError("Hiba a kijelentkezés során.");
    }
  };

  return {
    user,
    idToken,
    isAdmin,
    allowedTools,
    allUsers,
    allAddons,
    userTools,
    loading,
    error,
    successMessage,
    handleLogout,
    setError,
    setSuccessMessage,
  };
}
