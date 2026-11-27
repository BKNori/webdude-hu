import {
  isValidGaMeasurementId,
  buildGaConsentInitScript,
  updateAnalyticsConsent,
  trackEvent,
  trackFormSubmit,
  trackCTAClick,
  trackPageView,
} from "@/lib/analytics";

describe("Analytics utilities", () => {
  const gtagMock = jest.fn();

  beforeEach(() => {
    (window as unknown as { gtag?: unknown }).gtag = gtagMock;
    gtagMock.mockClear();
  });

  afterAll(() => {
    delete (window as unknown as { gtag?: unknown }).gtag;
  });

  test("isValidGaMeasurementId accepts valid GA4/GT/AW IDs and rejects invalid ones", () => {
    expect(isValidGaMeasurementId("G-ABC123XYZ")).toBe(true);
    expect(isValidGaMeasurementId(" G-123456 ")).toBe(true);
    expect(isValidGaMeasurementId("GT-999AA")).toBe(true);
    expect(isValidGaMeasurementId("AW-12345")).toBe(true);
    expect(isValidGaMeasurementId(undefined)).toBe(false);
    expect(isValidGaMeasurementId("")).toBe(false);
    expect(isValidGaMeasurementId("G-123';alert(1)//")).toBe(false);
    expect(isValidGaMeasurementId("INVALID")).toBe(false);
  });

  test("buildGaConsentInitScript skips admin/portal paths and sets Consent Mode v2", () => {
    const script = buildGaConsentInitScript("G-TEST1234");
    expect(script).toContain("/admin");
    expect(script).toContain("/portal");
    expect(script).toContain("cookieConsent");
    expect(script).toContain("window.gtag('consent','default'");
    expect(script).toContain("G-TEST1234");
  });

  test("updateAnalyticsConsent calls gtag consent update when available", () => {
    updateAnalyticsConsent("granted");
    expect(gtagMock).toHaveBeenCalledWith("consent", "update", {
      analytics_storage: "granted",
    });

    gtagMock.mockClear();
    updateAnalyticsConsent("denied");
    expect(gtagMock).toHaveBeenCalledWith("consent", "update", {
      analytics_storage: "denied",
    });

    delete (window as unknown as { gtag?: unknown }).gtag;
    gtagMock.mockClear();
    updateAnalyticsConsent("granted");
    expect(gtagMock).not.toHaveBeenCalled();
  });

  test("trackEvent calls gtag with proper args", () => {
    const eventName = "custom_event";
    const params = { foo: "bar", count: 3 };
    trackEvent(eventName, params);
    expect(gtagMock).toHaveBeenCalledWith("event", eventName, params);
  });

  test("trackFormSubmit forwards correct payload", () => {
    trackFormSubmit("contact_form", true);
    expect(gtagMock).toHaveBeenCalledWith("event", "form_submit", {
      form_name: "contact_form",
      success: true,
    });
  });

  test("trackCTAClick forwards correct payload", () => {
    trackCTAClick("Get Quote", "hero");
    expect(gtagMock).toHaveBeenCalledWith("event", "cta_click", {
      button_name: "Get Quote",
      location: "hero",
    });
  });

  test("trackPageView calls gtag when defined", () => {
    trackPageView("/test", "Test Page");
    expect(gtagMock).toHaveBeenCalledWith("event", "page_view", {
      page_path: "/test",
      page_title: "Test Page",
    });
  });

  test("trackEvent does nothing when gtag is undefined", () => {
    delete (window as unknown as { gtag?: unknown }).gtag;
    gtagMock.mockClear();
    trackEvent("no_gtag");
    expect(gtagMock).not.toHaveBeenCalled();
  });

  test("trackPageView does nothing when gtag is undefined", () => {
    delete (window as unknown as { gtag?: unknown }).gtag;
    gtagMock.mockClear();
    trackPageView("/no-gtag", "No Gtag");
    expect(gtagMock).not.toHaveBeenCalled();
  });
});
