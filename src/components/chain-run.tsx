/**
 * A run of weeks drawn as an actual chain.
 *
 * The product is named after an unbroken chain and every visual so far has
 * been disconnected squares, which is the opposite idea. Links interlock when
 * consecutive weeks are worked, and the chain visibly comes apart where they
 * are not — so "kept going" and "stopped" are shapes rather than statistics.
 *
 * Links alternate horizontal and vertical, which is how real chain sits, and
 * is what stops a row of ovals reading as beads.
 */

export type LinkState = "done" | "cram" | "empty";

const LINK = 34; // long axis
const THICK = 18; // short axis
const STEP = 22; // centre-to-centre; less than LINK so links overlap
const STROKE = 4.5;

const TONE: Record<LinkState, string> = {
  done: "var(--color-sky-deep)",
  cram: "var(--color-peach-deep)",
  empty: "var(--color-rule)",
};

export function ChainRun({
  links,
  revealed = links.length,
  className,
  label,
}: {
  links: LinkState[];
  /** How many links are shown so far, for the play-through. */
  revealed?: number;
  className?: string;
  label: string;
}) {
  const width = STEP * links.length + (LINK - STEP) + STROKE * 2;
  const height = LINK + STROKE * 2;
  const cy = height / 2;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      role="img"
      aria-label={label}
      fill="none"
    >
      {links.map((state, index) => {
        const shown = index < revealed;
        const cx = STROKE + LINK / 2 + index * STEP;
        const vertical = index % 2 === 1;

        const w = vertical ? THICK : LINK;
        const h = vertical ? LINK : THICK;

        return (
          <rect
            key={index}
            x={cx - w / 2}
            y={cy - h / 2}
            width={w}
            height={h}
            rx={THICK / 2}
            stroke={shown ? TONE[state] : "var(--color-rule)"}
            strokeWidth={STROKE}
            opacity={shown ? (state === "empty" ? 0.45 : 1) : 0.18}
            style={{ transition: "opacity 300ms ease, stroke 300ms ease" }}
          />
        );
      })}
    </svg>
  );
}

/** Week-level shape of the two paths, for the hero. */
export function driftLinks(): LinkState[] {
  const weeks = new Array<LinkState>(16).fill("empty");
  weeks[0] = "done";
  weeks[1] = "done";
  weeks[4] = "done";
  weeks[15] = "cram";
  return weeks;
}

export function steadyLinks(): LinkState[] {
  const weeks = new Array<LinkState>(16).fill("done");
  weeks[4] = "empty"; // exam week
  weeks[9] = "empty"; // a shaadi
  return weeks;
}
