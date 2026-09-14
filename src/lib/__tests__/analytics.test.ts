import {
  trackEvent,
  trackFormSubmit,
  trackCTAClick,
  trackPageView,
} from "@/lib/analytics";

describe("Analytics utilities", () => {
  const gtagMock = jest.fn();
  beforeAll(() => {
    // Ensure window object exists (jsdom) and mock gtag
    if (typeof window === "undefined") {
      (global as unknown as { window?: unknown }).window = {} as unknown;
    }
    (window as unknown as { gtag?: unknown }).gtag = gtagMock;
  });

  afterAll(() => {
    // Clean up gtag mock
    delete (window as unknown as { gtag?: unknown }).gtag;
  });

  afterEach(() => {
    gtagMock.mockClear();
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
    // Remove gtag mock
    delete (window as unknown as { gtag?: unknown }).gtag;
    gtagMock.mockClear();
    trackEvent("no_gtag");
    expect(gtagMock).not.toHaveBeenCalled();
  });

  test("trackPageView does nothing when gtag is undefined", () => {
    // Ensure gtag is undefined
    delete (window as unknown as { gtag?: unknown }).gtag;
    gtagMock.mockClear();
    trackPageView("/no-gtag", "No Gtag");
    expect(gtagMock).not.toHaveBeenCalled();
  });
});
