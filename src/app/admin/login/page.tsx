"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

// Firebase Auth hibakódok → magyar hibaüzenetek
function getAuthErrorMessage(err: unknown): string {
  if (err && typeof err === "object" && "code" in err) {
    const code = (err as { code: string }).code;
    switch (code) {
      case "auth/configuration-not-found":
        return "A Firebase Authentication nincs bekapcsolva a projektben. Kérlek, aktiváld a Firebase Console-ban (Authentication → Get started → Email/Password).";
      case "auth/invalid-email":
        return "Érvénytelen e-mail cím formátum.";
      case "auth/user-not-found":
        return "Ezzel az e-mail címmel nincs regisztrált felhasználó a Firebase-ben.";
      case "auth/wrong-password":
      case "auth/invalid-credential":
        return "Hibás e-mail cím vagy jelszó.";
      case "auth/too-many-requests":
        return "Túl sok sikertelen kísérlet. Próbáld újra néhány perc múlva.";
      case "auth/network-request-failed":
        return "Hálózati hiba. Ellenőrizd az internetkapcsolatot.";
      case "auth/user-disabled":
        return "Ez a fiók le van tiltva.";
      default:
        return `Hiba: ${code}`;
    }
  }
  return err instanceof Error ? err.message : "Ismeretlen hiba történt.";
}

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Módok állapota
  const [isResetMode, setIsResetMode] = useState(false);
  const [isMagicMode, setIsMagicMode] = useState(false);

  const [resetSuccessMessage, setResetSuccessMessage] = useState("");
  const [magicSuccessMessage, setMagicSuccessMessage] = useState("");

  const router = useRouter();

  // 1. Meglévő bejelentkezési session ellenőrzése és irányítás szerepkör alapján
  useEffect(() => {
    if (!auth) return;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && !isResetMode && !isMagicMode) {
        try {
          const tokenResult = await user.getIdTokenResult();
          const isAdmin = tokenResult.claims.superadmin === true;
          if (isAdmin) {
            router.push("/admin");
          } else {
            router.push("/portal");
          }
        } catch {
          router.push("/portal");
        }
      }
    });

    return () => unsubscribe();
  }, [router, isResetMode, isMagicMode]);

  // 2. Bejövő Magic Link bejelentkezési token elkapása a URL-ből
  useEffect(() => {
    if (!auth) return;

    if (isSignInWithEmailLink(auth, window.location.href)) {
      let emailForSignIn = window.localStorage.getItem("emailForSignIn");
      if (!emailForSignIn) {
        emailForSignIn = window.prompt(
          "Kérlek, add meg az e-mail címedet a bejelentkezés megerősítéséhez:"
        );
      }

      if (emailForSignIn) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true);
        setError("");
        signInWithEmailLink(auth, emailForSignIn, window.location.href)
          .then(async (result) => {
            window.localStorage.removeItem("emailForSignIn");
            const tokenResult = await result.user.getIdTokenResult();
            const isAdmin = tokenResult.claims.superadmin === true;
            if (isAdmin) {
              router.push("/admin");
            } else {
              router.push("/portal");
            }
          })
          .catch((err: unknown) => {
            setError(getAuthErrorMessage(err));
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResetSuccessMessage("");
    setMagicSuccessMessage("");
    setLoading(true);

    if (!auth) {
      setError("Firebase Auth nem inicializálva");
      setLoading(false);
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const tokenResult = await result.user.getIdTokenResult();
      const isAdmin = tokenResult.claims.superadmin === true;
      if (isAdmin) {
        router.push("/admin");
      } else {
        router.push("/portal");
      }
    } catch (err: unknown) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResetSuccessMessage("");
    setMagicSuccessMessage("");
    setLoading(true);

    if (!auth) {
      setError("Firebase Auth nem inicializálva");
      setLoading(false);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setResetSuccessMessage(
        "A jelszó-visszaállító linket elküldtük az e-mail címedre! Kérlek, ellenőrizd a levélszemét (Spam) mappát is."
      );
    } catch (err: unknown) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLinkSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResetSuccessMessage("");
    setMagicSuccessMessage("");
    setLoading(true);

    if (!auth) {
      setError("Firebase Auth nem inicializálva");
      setLoading(false);
      return;
    }

    try {
      const actionCodeSettings = {
        url: window.location.origin + "/admin/login",
        handleCodeInApp: true,
      };

      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      setMagicSuccessMessage(
        "A bejelentkezési linket elküldtük az e-mail címedre! Kattints rá a jelszó nélküli belépéshez."
      );
    } catch (err: unknown) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4">
      <div className="bg-[#0f0f1a] border border-gray-800 rounded-lg p-8 w-full max-w-md shadow-2xl">
        <h1 className="text-2xl font-bold text-[#00B5F1] mb-2 text-center">
          WebDude Portál
        </h1>
        <p className="text-gray-400 text-xs text-center mb-6">
          {isResetMode
            ? "Jelszó visszaállítása e-mail segítségével"
            : isMagicMode
              ? "Bejelentkezés jelszó nélkül (Magic Link)"
              : "Bejelentkezés az ügyfél- és admin portálra"}
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        {resetSuccessMessage && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-lg mb-6 text-sm">
            {resetSuccessMessage}
          </div>
        )}

        {magicSuccessMessage && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-lg mb-6 text-sm">
            {magicSuccessMessage}
          </div>
        )}

        {isResetMode ? (
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2"
              >
                E-mail cím
              </label>
              <input
                type="email"
                id="email"
                placeholder="pelda@webdude.hu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#0a0a0f] border border-gray-700 focus:border-[#00B5F1] rounded-lg text-gray-100 outline-none transition-colors text-sm"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-[#00B5F1] text-gray-900 font-bold rounded-lg hover:bg-[#0095C7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm uppercase tracking-wider"
            >
              {loading ? "Küldés..." : "E-mail küldése"}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsResetMode(false);
                  setError("");
                  setResetSuccessMessage("");
                }}
                className="text-xs text-[#00B5F1] hover:text-[#00B5F1]/400 font-semibold"
              >
                Vissza a bejelentkezéshez
              </button>
            </div>
          </form>
        ) : isMagicMode ? (
          <form onSubmit={handleMagicLinkSend} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2"
              >
                E-mail cím
              </label>
              <input
                type="email"
                id="email"
                placeholder="pelda@webdude.hu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#0a0a0f] border border-gray-700 focus:border-[#00B5F1] rounded-lg text-gray-100 outline-none transition-colors text-sm"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-[#00B5F1] text-gray-900 font-bold rounded-lg hover:bg-[#0095C7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm uppercase tracking-wider"
            >
              {loading ? "Küldés..." : "Magic Link küldése"}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsMagicMode(false);
                  setError("");
                  setMagicSuccessMessage("");
                }}
                className="text-xs text-[#00B5F1] hover:text-[#00B5F1]/400 font-semibold"
              >
                Vissza a jelszavas bejelentkezéshez
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2"
              >
                E-mail cím
              </label>
              <input
                type="email"
                id="email"
                placeholder="pelda@webdude.hu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#0a0a0f] border border-gray-700 focus:border-[#00B5F1] rounded-lg text-gray-100 outline-none transition-colors text-sm"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="password"
                  className="block text-xs font-bold uppercase tracking-wider text-gray-400"
                >
                  Jelszó
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setIsResetMode(true);
                    setError("");
                    setResetSuccessMessage("");
                  }}
                  className="text-[10px] text-[#00B5F1] hover:text-[#00B5F1]/400 font-semibold uppercase tracking-wider"
                >
                  Elfelejtetted?
                </button>
              </div>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#0a0a0f] border border-gray-700 focus:border-[#00B5F1] rounded-lg text-gray-100 outline-none transition-colors text-sm"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-[#00B5F1] text-gray-900 font-bold rounded-lg hover:bg-[#0095C7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm uppercase tracking-wider"
            >
              {loading ? "Bejelentkezés..." : "Bejelentkezés"}
            </button>

            <div className="relative my-6 flex items-center justify-center">
              <div className="absolute inset-0 border-t border-gray-800"></div>
              <span className="relative bg-[#0f0f1a] px-3 text-xs text-gray-500 uppercase tracking-widest font-mono">
                vagy
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsMagicMode(true);
                setError("");
                setResetSuccessMessage("");
                setMagicSuccessMessage("");
              }}
              className="w-full px-4 py-3 bg-transparent border border-[#00B5F1]/30 text-[#00B5F1] font-bold rounded-lg hover:bg-[#00B5F1]/10 hover:border-[#00B5F1]/50 transition-all text-sm uppercase tracking-wider font-mono shadow-[0_0_15px_rgba(245,158,11,0.02)]"
            >
              Belépés Magic Linkkel
            </button>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <Link
            href="/"
            className="text-xs text-gray-400 hover:text-gray-200 transition-colors"
          >
            Vissza a főoldalra
          </Link>
        </div>
      </div>
    </div>
  );
}
