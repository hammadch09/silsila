const WEEKS = 16;
const DAYS = WEEKS * 7; // four months

/**
 * Two students, same four months.
 *
 * Left: the way it usually goes. A burst of enthusiasm in week one, a couple
 * of guilty restarts, months of nothing, then a panic at the end — the block
 * of red is three nights before a deadline doing what should have taken a
 * semester.
 *
 * Right: the same four months in small pieces. Note the gaps: exam week, a
 * shaadi, a bad patch. The right-hand path is NOT perfect, on purpose. §4
 * Phase 3 makes pausing a first-class feature, and a flawless column would
 * promise a discipline nobody has and quietly shame everyone who misses a day.
 */

/** Enthusiasm, guilt, silence, panic. */
function driftPath(): Array<"none" | "some" | "panic"> {
  const days = new Array<"none" | "some" | "panic">(DAYS).fill("none");
  [0, 1, 2, 3, 11, 12, 26, 41].forEach((d) => (days[d] = "some"));
  for (let d = DAYS - 6; d < DAYS; d++) days[d] = "panic";
  return days;
}

/** Most days, not all days. Comes back after each gap. */
function steadyPath(): Array<"none" | "done"> {
  const days = new Array<"none" | "done">(DAYS).fill("done");
  const gaps = [
    ...range(30, 37), // exam week
    ...range(58, 61), // a shaadi
    ...range(86, 89), // a bad patch
    5,
    19,
    45,
    73,
    99,
  ];
  gaps.forEach((d) => {
    if (d < DAYS) days[d] = "none";
  });
  return days;
}

function range(from: number, to: number) {
  return Array.from({ length: to - from }, (_, i) => from + i);
}

function Cells({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className="grid grid-cols-[repeat(14,minmax(0,1fr))] gap-[3px]"
    >
      {children}
    </div>
  );
}

export function TwoPaths() {
  const drift = driftPath();
  const steady = steadyPath();

  const driftDone = drift.filter((d) => d !== "none").length;
  const steadyDone = steady.filter((d) => d === "done").length;

  return (
    <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
      {/* WITHOUT */}
      <div className="flex flex-col rounded-3xl bg-peach p-6 sm:p-7">
        <p className="font-mono text-[10.5px] tracking-[0.16em] text-peach-deep uppercase">
          Without a system
        </p>
        <p className="mt-3 text-[19px] leading-[1.25] font-semibold tracking-[-0.02em]">
          Four months, mostly waiting.
        </p>

        <div className="mt-6">
          <Cells label={`${driftDone} of ${DAYS} days worked, most of them in the last week.`}>
            {drift.map((state, index) => (
              <span
                key={index}
                className={`aspect-square rounded-[2px] ${
                  state === "panic"
                    ? "bg-peach-deep"
                    : state === "some"
                      ? "bg-peach-deep/40"
                      : "bg-white/60"
                }`}
              />
            ))}
          </Cells>
        </div>

        <dl className="mt-6 flex gap-6 border-t border-peach-deep/15 pt-4">
          <div>
            <dd className="text-[24px] leading-none font-semibold tabular-nums">
              {driftDone}
            </dd>
            <dt className="mt-1.5 text-[12.5px] text-ink-2">days worked</dt>
          </div>
          <div>
            <dd className="text-[24px] leading-none font-semibold tabular-nums">
              0
            </dd>
            <dt className="mt-1.5 text-[12.5px] text-ink-2">things built</dt>
          </div>
        </dl>

        <p className="mt-4 text-[14px] text-ink-2">
          A folder of unfinished tutorials, and three nights of panic at the
          end.
        </p>
      </div>

      {/* WITH */}
      <div className="flex flex-col rounded-3xl bg-sky p-6 sm:p-7">
        <p className="font-mono text-[10.5px] tracking-[0.16em] text-sky-deep uppercase">
          With Silsila
        </p>
        <p className="mt-3 text-[19px] leading-[1.25] font-semibold tracking-[-0.02em]">
          Four months, 30 minutes at a time.
        </p>

        <div className="mt-6">
          <Cells label={`${steadyDone} of ${DAYS} days worked, spread evenly across four months.`}>
            {steady.map((state, index) => (
              <span
                key={index}
                className={`aspect-square rounded-[2px] ${
                  state === "done" ? "bg-sky-deep" : "bg-white/60"
                }`}
              />
            ))}
          </Cells>
        </div>

        <dl className="mt-6 flex gap-6 border-t border-sky-deep/15 pt-4">
          <div>
            <dd className="text-[24px] leading-none font-semibold tabular-nums">
              {steadyDone}
            </dd>
            <dt className="mt-1.5 text-[12.5px] text-ink-2">days worked</dt>
          </div>
          <div>
            <dd className="text-[24px] leading-none font-semibold tabular-nums">
              9
            </dd>
            <dt className="mt-1.5 text-[12.5px] text-ink-2">things built</dt>
          </div>
        </dl>

        <p className="mt-4 text-[14px] text-ink-2">
          The gaps are exam week and a shaadi. You came back. That&rsquo;s the
          only rule.
        </p>
      </div>
    </div>
  );
}
