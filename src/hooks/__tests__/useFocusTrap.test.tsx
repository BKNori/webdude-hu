import { fireEvent, render, screen } from "@testing-library/react";
import { useRef, useState } from "react";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface HarnessProps {
  onEscape?: () => void;
}

/**
 * Teszt-keret: egy nyitható/zárható "modál", amely a fókuszcsapdát használja.
 * A fókuszálható elemek sorrendje szándékosan: Első, Második, Bezárás,
 * majd egy `hidden` és egy `disabled` gomb – ezeket a csapdának ki KELL hagynia.
 */
function Harness({ onEscape }: HarnessProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useFocusTrap<HTMLDivElement>(isOpen, onEscape);

  return (
    <div>
      <button type="button" onClick={() => setIsOpen(true)}>
        Megnyitás
      </button>
      {isOpen && (
        <div
          ref={containerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Teszt párbeszédablak"
        >
          <button type="button">Első</button>
          <button type="button">Második</button>
          <button type="button" onClick={() => setIsOpen(false)}>
            Bezárás
          </button>
          <button type="button" hidden>
            Rejtett
          </button>
          <button type="button" disabled>
            Letiltott
          </button>
        </div>
      )}
    </div>
  );
}

/** A modál megnyitása: a fókuszt előbb a kiváltó gombra tesszük (mint a böngésző). */
function openDialog() {
  const trigger = screen.getByRole("button", { name: "Megnyitás" });
  trigger.focus();
  fireEvent.click(trigger);
  return trigger;
}

/**
 * Teszt-keret egyedi kezdeti fókusszal: a csapda a teljes sávot fogja,
 * de a fókusz a "Bezárás" gombra kerül (mint a valódi mobil menüben, ahol a
 * bezáró gomb a DOM-ban NEM az első elem).
 */
function PreferredFocusHarness() {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const containerRef = useFocusTrap<HTMLDivElement>(
    isOpen,
    () => setIsOpen(false),
    closeButtonRef
  );

  return (
    <div>
      <button type="button" onClick={() => setIsOpen(true)}>
        Megnyitás
      </button>
      {isOpen && (
        <div ref={containerRef}>
          <a href="#elso">Első hivatkozás</a>
          <button type="button" ref={closeButtonRef} onClick={() => setIsOpen(false)}>
            Bezárás
          </button>
        </div>
      )}
    </div>
  );
}

describe("useFocusTrap hook", () => {
  it("megnyitáskor az első fókuszálható elemre állítja a fókuszt", () => {
    render(<Harness />);
    openDialog();

    expect(screen.getByRole("button", { name: "Első" })).toHaveFocus();
  });

  it("a Tab lenyomása az utolsó elemről az elsőre csavarja a fókuszt", () => {
    render(<Harness />);
    openDialog();

    const last = screen.getByRole("button", { name: "Bezárás" });
    last.focus();
    fireEvent.keyDown(document, { key: "Tab" });

    expect(screen.getByRole("button", { name: "Első" })).toHaveFocus();
  });

  it("a Shift+Tab lenyomása az első elemről az utolsóra csavarja a fókuszt", () => {
    render(<Harness />);
    openDialog();

    const first = screen.getByRole("button", { name: "Első" });
    first.focus();
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });

    expect(screen.getByRole("button", { name: "Bezárás" })).toHaveFocus();
  });

  it("kihagyja a rejtett és letiltott elemeket a fókusz-ciklusból", () => {
    render(<Harness />);
    openDialog();

    screen.getByRole("button", { name: "Első" }).focus();
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });

    // Ha a `hidden` / `disabled` gombok nem lennének kiszűrve, a fókusz
    // a "Rejtett" vagy "Letiltott" gombra kerülne.
    expect(screen.getByRole("button", { name: "Bezárás" })).toHaveFocus();
  });

  it("az Escape lenyomása meghívja az onEscape visszahívást", () => {
    const onEscape = jest.fn();
    render(<Harness onEscape={onEscape} />);
    openDialog();

    fireEvent.keyDown(document, { key: "Escape" });

    expect(onEscape).toHaveBeenCalledTimes(1);
  });

  it("bezáráskor visszaállítja a fókuszt a megnyitó elemre", () => {
    render(<Harness />);
    const trigger = openDialog();

    fireEvent.click(screen.getByRole("button", { name: "Bezárás" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("inaktív állapotban nem nyúl a fókuszhoz", () => {
    render(<Harness />);

    const trigger = screen.getByRole("button", { name: "Megnyitás" });
    trigger.focus();
    fireEvent.keyDown(document, { key: "Tab" });

    expect(trigger).toHaveFocus();
  });
});

/** Teszt-keret fókuszálható elemek nélküli konténerrel. */
function EmptyHarness() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useFocusTrap<HTMLDivElement>(isOpen);

  return (
    <div>
      <button type="button" onClick={() => setIsOpen(true)}>
        Megnyitás
      </button>
      {isOpen && (
        <div ref={containerRef} role="dialog" aria-modal="true" aria-label="Üres">
          <p>Nincs interaktív elem</p>
        </div>
      )}
    </div>
  );
}

describe("useFocusTrap hook – initialFocusRef", () => {
  it("a megadott elemet fókuszálja megnyitáskor az első helyett", () => {
    render(<PreferredFocusHarness />);
    fireEvent.click(screen.getByRole("button", { name: "Megnyitás" }));

    // A DOM-ban az első elem az "Első hivatkozás" link, de a fókuszt a
    // closeButtonRef-en lévő "Bezárás" gombnak kell megkapnia.
    expect(screen.getByRole("button", { name: "Bezárás" })).toHaveFocus();
    expect(screen.getByRole("link", { name: "Első hivatkozás" })).not.toHaveFocus();
  });
});

describe("useFocusTrap hook – üres konténer", () => {
  it("fókuszálható elemek hiányában a konténer kapja a fókuszt", () => {
    render(<EmptyHarness />);
    fireEvent.click(screen.getByRole("button", { name: "Megnyitás" }));

    const dialog = screen.getByRole("dialog", { name: "Üres" });
    expect(dialog).toHaveFocus();
    expect(dialog).toHaveAttribute("tabindex", "-1");
  });

  it("Tab lenyomása üres konténerben a konténeren tartja a fókuszt", () => {
    render(<EmptyHarness />);
    fireEvent.click(screen.getByRole("button", { name: "Megnyitás" }));

    const dialog = screen.getByRole("dialog", { name: "Üres" });
    fireEvent.keyDown(document, { key: "Tab" });

    expect(dialog).toHaveFocus();
  });

  it("Escape lenyomása onEscape nélkül sem okoz hibát", () => {
    render(<EmptyHarness />);
    fireEvent.click(screen.getByRole("button", { name: "Megnyitás" }));

    expect(() =>
      fireEvent.keyDown(document, { key: "Escape" })
    ).not.toThrow();
    // onEscape híján a párbeszédablak nyitva marad.
    expect(
      screen.getByRole("dialog", { name: "Üres" })
    ).toBeInTheDocument();
  });
});
