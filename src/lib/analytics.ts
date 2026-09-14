// Analytics utility for Google Analytics 4 event tracking
// This file provides type-safe gtag functions for event tracking

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
