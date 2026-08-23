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
        {/* No box per day. A 2px rule in the task-type colour tops each column
            and the rest is whitespace — bordered cards are what made the page
            read like a dashboard. */}
        {SAMPLE_WEEK.map((entry) => (
          <li key={entry.day} className="flex flex-1 flex-col">
            <span
              aria-hidden
              className="h-[2px] w-full"
              style={{ background: TASK_COLORS[entry.type] }}
            />
            <div className="flex flex-1 flex-col pt-4">
              <p className="font-mono text-[10px] tracking-[0.14em] text-ink-3">
                {entry.day}
              </p>
              <p className="mt-4 flex-1 text-[15px] leading-[1.45]">
                {entry.task}
              </p>
              <p className="mt-6 flex items-baseline justify-between gap-2">
                <span className="font-mono text-[10px] tracking-[0.12em] text-ink-3">
                  {entry.type}
                </span>
                <span className="font-mono text-[12px] text-ink-2 tabular-nums">
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
