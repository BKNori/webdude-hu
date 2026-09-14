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

  test("applies primary variant class by default", () => {
    render(<Button>Primary</Button>);
    const btn = screen.getByRole("button", { name: /primary/i });
    expect(btn).toHaveClass("bg-linear-to-r");
  });

  test("applies secondary variant class when specified", () => {
    render(
      <Button variant="secondary" href="/contact">
        Secondary
      </Button>
    );
    const link = screen.getByRole("link", { name: /secondary/i });
    expect(link).toHaveClass("bg-transparent");
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
  test("applies secondary variant class when specified", () => {
    render(
      <Button variant="secondary" href="/contact">
        Secondary
      </Button>
    );
    const link = screen.getByRole("link", { name: /secondary/i });
    expect(link).toHaveClass("bg-transparent");
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
});
