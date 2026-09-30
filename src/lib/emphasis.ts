export interface EmphasisSegment {
  text: string;
  strong: boolean;
}

/**
 * Kiemelés-konvenció: a szótárban `**szöveg**` jelöli a kiemelt részt.
 *
 * A JSON szótár szándékosan csak stringet tartalmaz (ReactNode nem
 * szerializálható Server → Client határon), a vezérlő karaktereket ez a
 * segédfüggvény oldja fel determinisztikusan.
 */
export function splitEmphasis(value: string): EmphasisSegment[] {
  if (!value) return [];

  const segments: EmphasisSegment[] = [];
  const pattern = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null = pattern.exec(value);

  while (match !== null) {
    if (match.index > lastIndex) {
      segments.push({
        text: value.slice(lastIndex, match.index),
        strong: false,
      });
    }
    segments.push({ text: match[1], strong: true });
    lastIndex = match.index + match[0].length;
    match = pattern.exec(value);
  }

  if (lastIndex < value.length) {
    segments.push({ text: value.slice(lastIndex), strong: false });
  }

  return segments;
}
