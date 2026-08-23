import { SAMPLE_WEEK, TASK_COLORS } from "@/lib/viz";

/**
 * One week, seven days, seven tasks. The single clearest thing on the page —
 * a student can see the whole commitment at a glance and check it against
 * their own timetable.
 *
 * Scrolls horizontally on a phone rather than reflowing to a list, so the
 * "seven of these, that's a week" shape survives at every width.
 */
export function WeekStrip() {
  return (
    <div className="-mx-6 overflow-x-auto px-6 pb-2 lg:mx-0 lg:px-0">
      <ol className="flex min-w-[720px] gap-3 lg:min-w-0">
        {SAMPLE_WEEK.map((entry) => (
          <li
            key={entry.day}
            className="flex flex-1 flex-col border border-rule bg-paper"
          >
            <span
              aria-hidden
              className="h-1 w-full"
              style={{ background: TASK_COLORS[entry.type] }}
            />
            <div className="flex flex-1 flex-col p-4">
              <p className="font-mono text-[11px] tracking-[0.1em] text-ink-3">
                {entry.day}
              </p>
              <p className="mt-3 flex-1 text-[14px] leading-[1.45]">
                {entry.task}
              </p>
              <p className="mt-4 flex items-center justify-between gap-2 border-t border-rule-soft pt-3">
                <span className="font-mono text-[10px] tracking-[0.1em] text-ink-3">
                  {entry.type}
                </span>
                <span className="font-mono text-[11px] text-ink-2 tabular-nums">
                  {entry.mins}m
                </span>
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
