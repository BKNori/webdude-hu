import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import WebDudeChatLauncher from "../WebDudeChatLauncher";

let mockPathname = "/";

jest.mock("next/navigation", () => ({
  usePathname: () => mockPathname,
}));

jest.mock("next/dynamic", () => () => {
  const MockLazyChat = ({
    defaultOpen,
    initialMessage,
    locale,
  }: {
    defaultOpen?: boolean;
    initialMessage?: string;
    locale?: string;
  }) => (
    <div
      data-testid="lazy-webdude-chat"
      data-open={String(Boolean(defaultOpen))}
      data-msg={initialMessage ?? ""}
      data-locale={locale ?? ""}
    />
  );
  return MockLazyChat;
});

describe("WebDudeChatLauncher (0 KB AI SDK kezdeti betöltéskor)", () => {
  beforeEach(() => {
    mockPathname = "/";
  });

  it("publikus oldalon csak a pehelykönnyű #chat-trigger-btn gombot rendereli, kattintásra tölti be a panelt", () => {
    render(<WebDudeChatLauncher locale="hu" />);
    expect(screen.queryByTestId("lazy-webdude-chat")).toBeNull();

    const trigger = screen.getByRole("button", {
      name: /webdude ai asszisztens megnyitása/i,
    });
    expect(trigger).toHaveAttribute("id", "chat-trigger-btn");

    fireEvent.click(trigger);
    const panel = screen.getByTestId("lazy-webdude-chat");
    expect(panel).toHaveAttribute("data-open", "true");
    expect(panel).toHaveAttribute("data-locale", "hu");
  });

  it("open-webdude-chat egyedi eseményre átadja az initialMessage szöveget és aktiválja a panelt", () => {
    render(
      <WebDudeChatLauncher
        locale="en"
        dictionary={
          {
            triggerAriaLabel: "Open AI Assistant",
          } as never
        }
      />
    );

    act(() => {
      window.dispatchEvent(
        new CustomEvent("open-webdude-chat", {
          detail: { initialMessage: "Hello Norbi" },
        })
      );
    });

    const panel = screen.getByTestId("lazy-webdude-chat");
    expect(panel).toHaveAttribute("data-open", "true");
    expect(panel).toHaveAttribute("data-msg", "Hello Norbi");
    expect(panel).toHaveAttribute("data-locale", "en");
  });

  it("/admin és /portal útvonalakon nem renderelődik", () => {
    mockPathname = "/admin/dashboard";
    const { container, rerender } = render(<WebDudeChatLauncher />);
    expect(container.firstChild).toBeNull();

    mockPathname = "/portal/ai-muhely";
    rerender(<WebDudeChatLauncher />);
    expect(container.firstChild).toBeNull();
  });
});
