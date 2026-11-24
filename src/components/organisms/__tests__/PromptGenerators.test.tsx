import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LogoPromptGenerator from "../LogoPromptGenerator";
import BannerPromptGenerator from "../BannerPromptGenerator";
import MidjourneyPromptGenerator from "../MidjourneyPromptGenerator";
import SeoAuditPromptGenerator from "../SeoAuditPromptGenerator";
import SeasonalPromptGenerator from "../SeasonalPromptGenerator";
import ContentPlanPromptGenerator from "../ContentPlanPromptGenerator";
import UiUxPromptGenerator from "../UiUxPromptGenerator";

const writeTextMock = jest.fn();

beforeAll(() => {
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText: writeTextMock },
    configurable: true,
  });
});

beforeEach(() => {
  writeTextMock.mockReset();
  writeTextMock.mockResolvedValue(undefined);
});

const generators = [
  { name: "LogoPromptGenerator", Comp: LogoPromptGenerator },
  { name: "BannerPromptGenerator", Comp: BannerPromptGenerator },
  { name: "MidjourneyPromptGenerator", Comp: MidjourneyPromptGenerator },
  { name: "SeoAuditPromptGenerator", Comp: SeoAuditPromptGenerator },
  { name: "SeasonalPromptGenerator", Comp: SeasonalPromptGenerator },
  { name: "ContentPlanPromptGenerator", Comp: ContentPlanPromptGenerator },
  { name: "UiUxPromptGenerator", Comp: UiUxPromptGenerator },
] as const;

describe("AI Műhely PromptGenerator organizmusok", () => {
  it.each(generators)(
    "$name: üres és kitöltött mezőkkel is generál, opciót vált, másol, és 0% arany/mojibake",
    async ({ Comp }) => {
      const { container } = render(<Comp />);

      // 0% arany/amber és 0% mojibake a renderelt szövegben
      const text = container.textContent ?? "";
      expect(text).not.toMatch(/arany|amber|\u0102\u00a9|\u0139\u00b1|\u00e2\u20ac\u201c/i);

      // Opciógombok átkapcsolása (aria-pressed)
      const toggleButtons = container.querySelectorAll(
        "button[aria-pressed='false']"
      );
      toggleButtons.forEach((btn) => fireEvent.click(btn));

      // Üres mezőkkel történő generálás (opcionális ágak tesztelése)
      const allButtons = Array.from(container.querySelectorAll("button"));
      const generateBtn = allButtons[allButtons.length - 1]!;
      fireEvent.click(generateBtn);
      expect(screen.getByText("Generált Prompt")).toBeInTheDocument();

      // Minden szöveges mező és textarea kitöltése, majd újragenerálás
      container.querySelectorAll("input, textarea").forEach((el, idx) => {
        fireEvent.change(el, { target: { value: `Teszt érték ${idx + 1}` } });
      });
      fireEvent.click(generateBtn);

      // Sikeres vágólap másolás
      const copyBtn = screen.getByLabelText("Prompt másolása vágólapra");
      fireEvent.click(copyBtn);
      await waitFor(() => expect(writeTextMock).toHaveBeenCalledTimes(1));

      // Sikertelen vágólap ág
      writeTextMock.mockRejectedValueOnce(new Error("clipboard denied"));
      fireEvent.click(copyBtn);
      await waitFor(() => expect(writeTextMock).toHaveBeenCalledTimes(2));
    }
  );
});
