const DAYS = 84; // 12 weeks, the length of one plan
const COLUMNS = 14;

/** The day most plans die. Not a statistic — the shape of the thing. */
const STOPPED_ON = 4;

function Grid({
  filled,
  label,
  caption,
  tone,
}: {
  filled: number;
  label: string;
  caption: string;
  tone: "accent" | "ink";
}) {
  return (
    <figure className="m-0 flex-1">
      <figcaption className="font-mono text-[11px] tracking-[0.16em] text-ink-3 uppercase">
        {label}
      </figcaption>

      <div
        role="img"
        aria-label={`${label}: ${filled} of ${DAYS} days done.`}
        className="mt-4 grid gap-[3px]"
        style={{ gridTemplateColumns: `repeat(${COLUMNS}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: DAYS }, (_, index) => (
          <div
            key={index}
            className={`aspect-square rounded-[2px] ${
              index < filled
                ? tone === "accent"
                  ? "bg-accent"
                  : "bg-ink"
                : "bg-rule-soft"
            }`}
          />
        ))}
      </div>

      <p className="mt-4 text-[15px] text-ink-2">{caption}</p>
    </figure>
  );
}

/**
 * The same 84 cells, twice. Left is the plan anyone can get for free in thirty
 * seconds; right is what happens to it. The grid is the page's recurring
 * device — it shows up again at the bottom as six months of finished work, so
 * the reader meets the shape here and recognises it there.
 */
export function PlanVsReality() {
  return (
    <div className="flex flex-col gap-12 sm:flex-row sm:gap-14">
      <Grid
        tone="accent"
        filled={DAYS}
        label="The plan you made"
        caption="Twelve weeks. Every day accounted for. You meant all of it."
      />
      <Grid
        tone="ink"
        filled={STOPPED_ON}
        label="What usually happens"
        caption="Four days. Then a quiz, a shaadi, a week with no electricity — and it never started again."
      />
    </div>
  );
}
