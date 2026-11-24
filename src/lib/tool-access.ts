import { verifyUserToken, getClientUserProfileAction } from "@/actions/portal";
import { hasToolAccess, isSuperAdmin, normalizeToolIds } from "@/lib/tool-access-policy";

/**
 * Szerveroldali AI generátor jogosultság-ellenőrzés (Server Action őr).
 *
 * SZÁNDÉKOSAN NEM `"use server"` modul: így nem válik kliensről hívható
 * Server Action-né, kizárólag más Server Action-ök importálhatják.
 *
 * Lépések (fail-closed):
 *  1. Firebase Auth `idToken` érvényesítése (Identity Toolkit lookup)
 *  2. Szuperadmin bypass (`superadmin` claim / `hello@webdude.hu`)
 *  3. Firestore `users/{uid}` profil: `role === "admin"` VAGY `allowedTools` ∋ modul ID
 */

type VerifiedUser = NonNullable<Awaited<ReturnType<typeof verifyUserToken>>>;

export type ToolAccessResult =
  | { ok: true; user: VerifiedUser }
  | { ok: false; code: "UNAUTHENTICATED" | "FORBIDDEN"; error: string };

export const TOOL_ACCESS_ERRORS = {
  UNAUTHENTICATED: "Jogosulatlan hozzáférés. Kérlek, jelentkezz be újra!",
  FORBIDDEN:
    "Ehhez a prémium AI modulhoz nincs hozzáférésed. Hozzáférést a /kapcsolat oldalon igényelhetsz.",
} as const;

export async function authorizeToolAccess(
  idToken: unknown,
  toolIds: string | readonly string[]
): Promise<ToolAccessResult> {
  if (typeof idToken !== "string" || idToken.trim().length === 0) {
    return { ok: false, code: "UNAUTHENTICATED", error: TOOL_ACCESS_ERRORS.UNAUTHENTICATED };
  }

  const user = await verifyUserToken(idToken);
  if (!user) {
    return { ok: false, code: "UNAUTHENTICATED", error: TOOL_ACCESS_ERRORS.UNAUTHENTICATED };
  }

  if (isSuperAdmin({ email: user.email, isAdmin: user.isAdmin })) {
    return { ok: true, user: { ...user, isAdmin: true } };
  }

  const required = normalizeToolIds(toolIds);
  const profileRes = await getClientUserProfileAction(idToken);
  // Sikertelen profil-lekérésnél semmilyen jogot nem feltételezünk (fail-closed).
  const profile = profileRes.success ? profileRes.profile : undefined;

  const granted = hasToolAccess(
    {
      email: user.email,
      isAdmin: user.isAdmin,
      role: profile?.role ?? null,
      allowedTools: profile?.allowedTools ?? [],
    },
    required
  );

  if (!granted) {
    return { ok: false, code: "FORBIDDEN", error: TOOL_ACCESS_ERRORS.FORBIDDEN };
  }

  return {
    ok: true,
    user: { ...user, isAdmin: user.isAdmin || profile?.role === "admin" },
  };
}
