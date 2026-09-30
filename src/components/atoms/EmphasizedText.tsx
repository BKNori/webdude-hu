import { splitEmphasis } from "@/lib/emphasis";

interface EmphasizedTextProps {
  /** `**kiemelés**` jelöléssel tagolt szöveg (i18n szótárból). */
  value: string;
  /** A kiemelt szegmens osztálya (alapértelmezés: hero alcím stílus). */
  strongClassName?: string;
}

/**
 * EmphasizedText — `**kiemelés**` jelölés feloldása React csomópontokra.
 * A szótár JSON nem tartalmazhat ReactNode-ot, ezért a kiemelést ez a
 * szerver-safe atom végzi (kliens komponensekben is használható).
 */
export default function EmphasizedText({
  value,
  strongClassName = "text-text-primary font-semibold",
}: EmphasizedTextProps) {
  const segments = splitEmphasis(value);

  if (segments.length === 0) return null;

  if (segments.length === 1 && !segments[0].strong) {
    return <>{segments[0].text}</>;
  }

  return (
    <>
      {segments.map((segment, index) =>
        segment.strong ? (
          <span key={index} className={strongClassName}>
            {segment.text}
          </span>
        ) : (
          <span key={index}>{segment.text}</span>
        )
      )}
    </>
  );
}
