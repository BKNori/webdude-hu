import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "@/components/atoms/Button";
import { trackEvent } from "@/lib/analytics";

jest.mock("@/lib/analytics", () => ({
  trackEvent: jest.fn(),
}));

describe("Button component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders as a link when href is provided and triggers analytics on click", () => {
    render(
      <Button
        href="/about"
        analyticsEvent="cta_click"
        analyticsParams={{ button_name: "Learn More" }}
      >
        Learn More
      </Button>
    );
    const link = screen.getByRole("link", { name: /learn more/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/about");
    fireEvent.click(link);
    expect(trackEvent).toHaveBeenCalledWith("cta_click", {
      button_name: "Learn More",
    });
  });

  test("renders as a button with onClick and analytics, both are called", () => {
    const handleClick = jest.fn();
    render(
      <Button
        type="button"
        onClick={handleClick}
        analyticsEvent="form_submit"
        analyticsParams={{ form_name: "test", success: "true" }}
      >
        Submit
      </Button>
    );
    const btn = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalled();
    expect(trackEvent).toHaveBeenCalledWith("form_submit", {
      form_name: "test",
      success: "true",
    });
  });

  test("calls only analytics when onClick is not provided", () => {
    render(
      <Button
        analyticsEvent="cta_click"
        analyticsParams={{ button_name: "OnlyAnalytics" }}
      >
        Click Me
      </Button>
    );
    const btn = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(btn);
    expect(trackEvent).toHaveBeenCalledWith("cta_click", {
      button_name: "OnlyAnalytics",
    });
  });

  test("does nothing when no handlers are provided", () => {
    render(<Button>Plain</Button>);
    const btn = screen.getByRole("button", { name: /plain/i });
    fireEvent.click(btn);
    expect(trackEvent).not.toHaveBeenCalled();
  });

  test("applies Kék-Lila v7.0 primary variant classes by default", () => {
    render(<Button>Primary</Button>);
    const btn = screen.getByRole("button", { name: /primary/i });
    expect(btn).toHaveClass("bg-linear-to-r");
    expect(btn).toHaveClass("from-[#075985]");
    expect(btn).toHaveClass("to-[#5B21B6]");
    expect(btn).toHaveClass("text-white");
  });

  test("applies secondary variant class when specified", () => {
    render(
      <Button variant="secondary" href="/contact">
        Secondary
      </Button>
    );
    const link = screen.getByRole("link", { name: /secondary/i });
    expect(link).toHaveClass("bg-slate-900/80");
    expect(link).toHaveClass("border-slate-700");
    expect(link).toHaveClass("text-text-primary");
  });

  test("renders as a link and tracks analytics with async click", async () => {
    const user = userEvent.setup();
    render(
      <Button
        href="/about"
        analyticsEvent="cta_click"
        analyticsParams={{ button_name: "Learn More" }}
      >
        Learn More
      </Button>
    );
    const link = screen.getByRole("link", { name: /learn more/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/about");
    await user.click(link);
    expect(trackEvent).toHaveBeenCalledWith("cta_click", {
      button_name: "Learn More",
    });
  });

  test("renders as a button when no href and tracks analytics on click", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(
      <Button
        type="button"
        onClick={handleClick}
        analyticsEvent="form_submit"
        analyticsParams={{ form_name: "test", success: "true" }}
      >
        Submit
      </Button>
    );
    const btn = screen.getByRole("button", { name: /submit/i });
    expect(btn).toBeInTheDocument();
    await user.click(btn);
    expect(handleClick).toHaveBeenCalled();
    expect(trackEvent).toHaveBeenCalledWith("form_submit", {
      form_name: "test",
      success: "true",
    });
  });
  test("onClick works without analytics when no href", () => {
    const handleClick = jest.fn();
    render(
      <Button type="button" onClick={handleClick}>
        ClickMe
      </Button>
    );
    const btn = screen.getByRole("button", { name: /clickme/i });
    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalled();
    expect(trackEvent).not.toHaveBeenCalled();
  });

  test("click on link with both onClick and analytics calls both", async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    render(
      <Button
        href="/about"
        onClick={handleClick}
        analyticsEvent="cta_click"
        analyticsParams={{ button_name: "Learn More" }}
      >
        Learn More
      </Button>
    );
    const link = screen.getByRole("link", { name: /learn more/i });
    await user.click(link);
    expect(handleClick).toHaveBeenCalled();
    expect(trackEvent).toHaveBeenCalledWith("cta_click", {
      button_name: "Learn More",
    });
  });

  test("no handlers does nothing on button", () => {
    render(<Button>JustBtn</Button>);
    const btn = screen.getByRole("button", { name: /justbtn/i });
    fireEvent.click(btn);
    expect(trackEvent).not.toHaveBeenCalled();
  });

  test("applies ghost variant classes when specified", () => {
    render(<Button variant="ghost">Ghost</Button>);
    const btn = screen.getByRole("button", { name: /ghost/i });
    expect(btn).toHaveClass("bg-transparent");
    expect(btn).toHaveClass("text-[#00B5F1]");
  });

  test("applies accent variant classes when specified", () => {
    render(<Button variant="accent">Accent</Button>);
    const btn = screen.getByRole("button", { name: /accent/i });
    expect(btn).toHaveClass("bg-[#7C3AED]");
    expect(btn).toHaveClass("text-white");
  });

  test("applies sm size classes when specified", () => {
    render(<Button size="sm">Small</Button>);
    const btn = screen.getByRole("button", { name: /small/i });
    expect(btn).toHaveClass("min-h-[40px]");
    expect(btn).toHaveClass("px-4");
  });

  test("blocked click and no analytics when disabled", () => {
    const handleClick = jest.fn();
    render(
      <Button
        disabled
        onClick={handleClick}
        analyticsEvent="cta_click"
        analyticsParams={{ button_name: "Disabled" }}
      >
        DisabledBtn
      </Button>
    );
    const btn = screen.getByRole("button", { name: /disabledbtn/i });
    fireEvent.click(btn);
    expect(handleClick).not.toHaveBeenCalled();
    expect(trackEvent).not.toHaveBeenCalled();
  });

  test("shows loading state and blocks click and analytics", () => {
    const handleClick = jest.fn();
    render(
      <Button
        loading
        onClick={handleClick}
        analyticsEvent="cta_click"
        analyticsParams={{ button_name: "Loading" }}
      >
        LoadingBtn
      </Button>
    );
    const btn = screen.getByRole("button", { name: /loadingbtn/i });
    expect(btn).toHaveClass("opacity-50");
    fireEvent.click(btn);
    expect(handleClick).not.toHaveBeenCalled();
    expect(trackEvent).not.toHaveBeenCalled();
  });
});
