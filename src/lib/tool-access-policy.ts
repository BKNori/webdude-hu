/**
 * AI generátor hozzáférési szabály (RBAC) — Single Source of Truth.
 *
 * Tiszta, mellékhatás-mentes függvények: a kliensoldali `useToolAccess`
 * hook ÉS a szerveroldali `authorizeToolAccess` helper is ezt használja,
 * így a UI-zár és a Server Action védelem garantáltan azonos döntést hoz.
 *
 * Hozzáférési mátrix:
 *  1. Vendég (nincs bejelentkezve)          → TILTVA
 *  2. Bejelentkezett ügyfél (nem admin)     → csak ha `allowedTools` tartalmazza a modul ID-t
 *  3. Szuperadmin (`hello@webdude.hu` / `role === "admin"` / `superadmin` claim) → 100% bypass
 */

export const SUPERADMIN_EMAIL = "hello@webdude.hu";

export interface ToolAccessSubject {
  email?: string | null;
  role?: string | null;
  /** Firebase custom claim (`superadmin === true`) alapú admin jelzés. */
  isAdmin?: boolean;
  allowedTools?: readonly string[] | null;
}

/** Szuperadmin-e az alany (e-mail, Firestore role vagy custom claim alapján). */
export function isSuperAdmin(subject: ToolAccessSubject | null | undefined): boolean {
  if (!subject) return false;
  if (subject.isAdmin === true) return true;
  if (subject.role === "admin") return true;
  return (subject.email ?? "").trim().toLowerCase() === SUPERADMIN_EMAIL;
}

/** A kért modul-azonosítók normalizálása (string | string[] → string[]). */
export function normalizeToolIds(toolIds: string | readonly string[]): string[] {
  const list = typeof toolIds === "string" ? [toolIds] : [...toolIds];
  return list.map((id) => id.trim()).filter((id) => id.length > 0);
}

/**
 * Döntés: hozzáférhet-e az alany a megadott modul(ok) bármelyikéhez.
 * Üres modul-lista esetén CSAK a szuperadmin kap hozzáférést (fail-closed).
 */
export function hasToolAccess(
  subject: ToolAccessSubject | null | undefined,
  toolIds: string | readonly string[]
): boolean {
  if (!subject) return false;
  if (isSuperAdmin(subject)) return true;
  const required = normalizeToolIds(toolIds);
  if (required.length === 0) return false;
  const allowed = Array.isArray(subject.allowedTools) ? subject.allowedTools : [];
  return required.some((id) => allowed.includes(id));
}
