import { Reveal } from "@/components/reveal";
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
        {/* Each day arrives after the one before it — the section is about a
            week accumulating, so it should accumulate. */}
        {SAMPLE_WEEK.map((entry, index) => (
          <Reveal
            as="li"
            key={entry.day}
            delay={index * 70}
            className="flex flex-1 flex-col overflow-hidden rounded-xl bg-raised shadow-[var(--shadow-card)]"
          >
            {/* The task-type colour is a solid cap rather than a hairline, so
                the week reads as seven different things at a glance. */}
            <span
              aria-hidden
              className="h-1.5 w-full"
              style={{ background: TASK_COLORS[entry.type] }}
            />
            <div className="flex flex-1 flex-col p-4">
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
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
