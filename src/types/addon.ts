// src/types/addon.ts
// Type definitions for Stripe Add-on Store (Cycle 113)

/**
 * Represents a micro‑service or subscription add‑on offered in the portal.
 */
export interface Addon {
  /** Unique identifier (Firestore document ID) */
  id: string;
  /** Display name shown to the user */
  title: string;
  /** Short description of the add‑on */
  description: string;
  /** Price in Hungarian Forint (HUF) */
  price: number;
  /** Type of service */
  type: "one-time" | "recurring";
  /** Category for UI grouping */
  category: "ai" | "design" | "tech" | "cro";
  /** Feature list displayed on the card */
  features: string[];
  /** Stripe price identifier (optional for mock) */
  stripePriceId?: string;
}

/**
 * Represents an order placed by a client for an add‑on.
 */
export interface Order {
  /** Firestore document ID */
  id: string;
  /** Title of the add‑on (display name) */
  title: string;
  /** ID of the purchased add‑on */
  addonId: string;
  /** UID of the client who placed the order */
  clientId: string;
  /** Order status – pending, paid, onboarding-pending, in-progress, delivered */
  status:
    "pending" | "paid" | "onboarding-pending" | "in-progress" | "delivered";
  /** Amount in HUF */
  amount: number;
  /** Creation timestamp (ISO string) */
  createdAt: string;
  /** Delivery timestamp or null */
  deliveredAt: string | null;
  /** Unique Stripe session ID */
  stripeSessionId?: string;
  /** Whether the onboarding form has been submitted */
  onboardingSubmitted?: boolean;
  /** JSON stringified onboarding answers */
  onboardingData?: string;
  /** Onboarding submission timestamp */
  onboardingSubmittedAt?: string;
  /** Optional Stripe session URL for redirect (mock or real) */
  checkoutUrl?: string;
  /** Delivery notes from admin */
  deliveryNotes?: string | null;
  /** URL to delivered material */
  deliveryUrl?: string | null;
}
