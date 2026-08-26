const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];

/** The window Pakistani companies actually hire interns out of (§2b). */
const WINDOW_START = 4;
const WINDOW_END = 6;

/**
 * The degree as a track, with the hiring window marked on it.
 *
 * This was three text cards, which said the same thing without letting anyone
 * see it. Drawn as a timeline you can locate yourself on — a student in
 * semester 5 finds themselves inside the highlighted band, which is the whole
 * argument in one glance.
 */
export function SemesterTrack() {
  const startPct = ((WINDOW_START - 1) / SEMESTERS.length) * 100;
  const widthPct = ((WINDOW_END - WINDOW_START + 1) / SEMESTERS.length) * 100;

  return (
    <div className="rounded-2xl bg-raised p-6 shadow-[var(--shadow-card)] lg:p-8">
      <div className="relative">
        {/* the highlighted window, behind the ticks */}
        <div
          aria-hidden
          className="absolute -top-3 bottom-8 rounded-xl bg-accent-soft"
          style={{ left: `${startPct}%`, width: `${widthPct}%` }}
        />

        <div className="relative flex">
          {SEMESTERS.map((semester) => {
            const inWindow =
              semester >= WINDOW_START && semester <= WINDOW_END;
            return (
              <div key={semester} className="flex-1 text-center">
                <span
                  className={`mx-auto block h-2.5 w-2.5 rounded-full ${
                    inWindow ? "bg-accent" : "bg-rule"
                  }`}
                />
                <span
                  className={`mt-3 block font-mono text-[11px] tabular-nums ${
                    inWindow ? "text-accent" : "text-ink-3"
                  }`}
                >
                  {semester}
                </span>
              </div>
            );
          })}
        </div>

        {/* the rail */}
        <div
          aria-hidden
          className="absolute top-[5px] right-0 left-0 -z-10 h-[2px] bg-rule"
        />
      </div>

      <div className="mt-8 grid gap-6 border-t border-rule pt-6 sm:grid-cols-3">
        <div>
          <p className="font-mono text-[10px] tracking-[0.14em] text-ink-3 uppercase">
            Sem 1–3
          </p>
          <p className="mt-2 text-[15px] font-medium">Foundations</p>
          <p className="mt-1 text-[14px] text-ink-2">
            Build the habit. Widen what you know exists.
          </p>
        </div>
        <div>
          <p className="font-mono text-[10px] tracking-[0.14em] text-accent uppercase">
            Sem 4–6 · the hinge
          </p>
          <p className="mt-2 text-[15px] font-medium">Internship push</p>
          <p className="mt-1 text-[14px] text-ink-2">
            A portfolio that survives a real screen. How to find openings, how
            to apply, what day one looks like.
          </p>
        </div>
        <div>
          <p className="font-mono text-[10px] tracking-[0.14em] text-ink-3 uppercase">
            Sem 7–8
          </p>
          <p className="mt-2 text-[15px] font-medium">Full-time, or founder</p>
          <p className="mt-1 text-[14px] text-ink-2">
            Deeper artifacts, referrals, applications.
          </p>
        </div>
      </div>
    </div>
  );
}
