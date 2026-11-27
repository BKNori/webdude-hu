// Analytics utility for Google Analytics 4 event tracking and Consent Mode v2
// This file provides type-safe gtag functions for event tracking and consent initialization

declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

export interface AnalyticsEvent {
  eventName: string;
  params?: Record<string, string | number | boolean>;
}

const GA_MEASUREMENT_ID_PATTERN = /^(G|GT|AW)-[A-Z0-9]+$/i;

/**
 * Validate a GA4 / Google Tag measurement ID to prevent script injection.
 */
export function isValidGaMeasurementId(
  id: string | undefined
): id is string {
  if (!id) return false;
  return GA_MEASUREMENT_ID_PATTERN.test(id.trim());
}

/**
 * Build an inline Consent Mode v2 + GA4 config script for public routes.
 * Skips /admin and /portal private paths.
 */
export function buildGaConsentInitScript(measurementId: string): string {
  const safeId = measurementId.trim();
  return `(function(){try{var p=window.location.pathname||'';if(p.indexOf('/admin')===0||p.indexOf('/portal')===0){return;}var accepted=false;try{accepted=localStorage.getItem('cookieConsent')==='accepted';}catch(e){}window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};window.gtag('consent','default',{analytics_storage:accepted?'granted':'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});window.gtag('js',new Date());window.gtag('config','${safeId}',{anonymize_ip:true,cookie_flags:'SameSite=None;Secure'});}catch(e){}})();`;
}

/**
 * Update GA4 Consent Mode v2 analytics_storage status at runtime.
 */
export function updateAnalyticsConsent(status: "granted" | "denied"): void {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: status,
    });
  }
}

/**
 * Track a custom event in Google Analytics 4
 * @param eventName - The name of the event (e.g., 'form_submit', 'cta_click')
 * @param params - Optional event parameters
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
}

/**
 * Track a form submission event
 * @param formName - The name of the form (e.g., 'contact_form')
 * @param success - Whether the submission was successful
 */
export function trackFormSubmit(formName: string, success: boolean): void {
  trackEvent("form_submit", {
    form_name: formName,
    success: success,
  });
}

/**
 * Track a CTA button click event
 * @param buttonName - The name/label of the button
 * @param location - The location of the button (e.g., 'hero', 'footer')
 */
export function trackCTAClick(buttonName: string, location: string): void {
  trackEvent("cta_click", {
    button_name: buttonName,
    location: location,
  });
}

/**
 * Track a page view (automatically handled by gtag config, but available for custom tracking)
 * @param pagePath - The path of the page
 * @param pageTitle - The title of the page
 */
export function trackPageView(pagePath: string, pageTitle: string): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "page_view", {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }
}
