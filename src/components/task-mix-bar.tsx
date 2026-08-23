import { TASK_COLORS, TASK_MIX } from "@/lib/viz";

/**
 * Stacked proportion bar — one row, five segments, summing to 100%.
 *
 * A pie was the obvious alternative and is worse: five slices with two at 10%
 * are hard to compare by angle, and this reads left to right like a sentence.
 * Segments are separated by a 2px surface gap, the outer ends are rounded, and
 * every series is labelled in the legend — colour is never the only channel.
 */
export function TaskMixBar() {
  return (
    <figure className="m-0">
      <div
        className="flex h-14 w-full gap-[2px] overflow-hidden rounded"
        role="img"
        aria-label={TASK_MIX.map((s) => `${s.type} ${s.share}%`).join(", ")}
      >
        {/* No numbers inside the fills. Three of these five sit below 3:1
            against white — they are light colours, so white text on them
            fails, and mixing white on some with ink on others reads as a bug.
            The legend below is the label set, in the same order. */}
        {TASK_MIX.map((segment, index) => (
          <div
            key={segment.type}
            title={`${segment.type} — ${segment.share}%`}
            className={`${index === 0 ? "rounded-l" : ""} ${
              index === TASK_MIX.length - 1 ? "rounded-r" : ""
            }`}
            style={{
              width: `${segment.share}%`,
              background: TASK_COLORS[segment.type],
            }}
          />
        ))}
      </div>

      <figcaption className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:grid-cols-5">
        {TASK_MIX.map((segment) => (
          <div key={segment.type} className="flex gap-2.5">
            <span
              aria-hidden
              className="mt-[5px] h-2.5 w-2.5 shrink-0 rounded-[2px]"
              style={{ background: TASK_COLORS[segment.type] }}
            />
            <div>
              <p className="font-mono text-[11px] tracking-[0.1em]">
                {segment.type}{" "}
                <span className="text-ink-3">{segment.share}%</span>
              </p>
              <p className="mt-0.5 text-[13px] text-ink-2">{segment.what}</p>
            </div>
          </div>
        ))}
      </figcaption>
    </figure>
  );
}
