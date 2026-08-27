"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const DAYS = 84; // four months at the plan's own length
const TICK_MS = 42;

/**
 * Two students, same four months — played out rather than described.
 *
 * No chain here on purpose. An earlier version drew one above each grid and it
 * competed with the grid for the same job; the artifact drops it and the
 * panels read faster without it. The chain idea lives in the hero copy, where
 * it explains the name instead of duplicating a chart.
 *
 * The right-hand path is deliberately NOT perfect. Weekends are off and there
 * are two visible gaps — exam week and a wedding — because §4 Phase 3 makes
 * pausing a first-class feature, and a flawless column would promise a
 * discipline nobody has and quietly shame everyone who misses a day.
 */

/** The artifact's plan, exactly: one keen week, two guilty days, then a
 *  scramble at the end. Fourteen days out of 84. */
const DRIFT = new Set([0, 1, 2, 3, 4, 5, 6, 7, 66, 79, 80, 81, 82, 83]);

/** Every day except exam week and a wedding — 74 of 84. Not a perfect 84,
 *  because §4 Phase 3 makes pausing a feature and a flawless column would
 *  promise a discipline nobody has. */
const STEADY = new Set(
  Array.from({ length: DAYS }, (_, i) => i).filter(
    (i) => !(i >= 34 && i <= 40) && !(i >= 58 && i <= 60),
  ),
);

export function TwoPaths() {
  const ref = useRef<HTMLDivElement>(null);
  const [day, setDay] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const play = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    setDay(0);
    let i = 0;
    timer.current = setInterval(() => {
      i += 1;
      setDay(i);
      if (i >= DAYS && timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
    }, TICK_MS);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced || !("IntersectionObserver" in window)) {
      const frame = requestAnimationFrame(() => setDay(DAYS));
      return () => cancelAnimationFrame(frame);
    }

    let started = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        observer.disconnect();
        setTimeout(play, 260);
      },
      { threshold: 0.25 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (timer.current) clearInterval(timer.current);
    };
  }, [play]);

  const driftDays = countUpTo(DRIFT, day);
  const steadyDays = countUpTo(STEADY, day);

  return (
    <div ref={ref}>
      <div className="mb-5 flex items-center gap-4">
        <span className="font-mono text-[10.5px] tracking-[0.16em] text-ink-3 uppercase tabular-nums">
          Day {String(Math.min(day, DAYS)).padStart(2, "0")}
        </span>
        <span aria-hidden className="h-px flex-1 bg-rule" />
        <button
          type="button"
          onClick={play}
          className="cursor-pointer rounded-full border-none bg-surface px-3.5 py-1.5 font-mono text-[10.5px] tracking-[0.16em] text-ink-2 uppercase transition-colors hover:bg-accent-soft hover:text-accent"
        >
          Replay
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
        <Panel
          tone="peach"
          label="On your own"
          title="Four months, mostly waiting."
          worked={DRIFT}
          day={day}
          days={driftDays}
          built={0}
          footer="A folder of half-finished tutorials, and three nights of panic at the end."
        />
        <Panel
          tone="sky"
          label="With Silsila"
          title="Four months, 30 minutes at a time."
          worked={STEADY}
          day={day}
          days={steadyDays}
          built={Math.floor(steadyDays / 10)}
          footer="The two gaps are exam week and a wedding. You came back. That is the only rule."
        />
      </div>
    </div>
  );
}

function countUpTo(set: Set<number>, day: number) {
  let total = 0;
  for (let i = 0; i < day; i++) if (set.has(i)) total += 1;
  return total;
}

function Panel({
  tone,
  label,
  title,
  worked,
  day,
  days,
  built,
  footer,
}: {
  tone: "peach" | "sky";
  label: string;
  title: string;
  worked: Set<number>;
  day: number;
  days: number;
  built: number;
  footer: string;
}) {
  const isPeach = tone === "peach";

  return (
    <div
      className={`flex flex-col rounded-3xl p-6 sm:p-7 ${
        isPeach ? "bg-peach" : "bg-sky"
      }`}
    >
      <p
        className={`font-mono text-[10.5px] tracking-[0.16em] uppercase ${
          isPeach ? "text-peach-deep" : "text-sky-deep"
        }`}
      >
        {label}
      </p>
      <p className="mt-3 text-[19px] leading-[1.25] font-semibold tracking-[-0.02em]">
        {title}
      </p>

      <div
        role="img"
        aria-label={`${days} of ${DAYS} days worked.`}
        className="mt-6 grid grid-cols-[repeat(14,minmax(0,1fr))] gap-[3px]"
      >
        {Array.from({ length: DAYS }, (_, index) => {
          const filled = index < day && worked.has(index);
          return (
            <span
              key={index}
              className={`aspect-square rounded-[2px] transition-colors duration-200 ${
                filled
                  ? isPeach
                    ? "bg-peach-deep"
                    : "bg-sky-deep"
                  : "bg-white/55"
              }`}
            />
          );
        })}
      </div>

      <dl
        className={`mt-6 flex gap-8 border-t pt-4 ${
          isPeach ? "border-peach-deep/15" : "border-sky-deep/15"
        }`}
      >
        <div>
          <dd className="text-[24px] leading-none font-semibold tabular-nums">
            {days}
          </dd>
          <dt className="mt-1.5 text-[12.5px] text-ink-2">days worked</dt>
        </div>
        <div>
          <dd className="text-[24px] leading-none font-semibold tabular-nums">
            {built}
          </dd>
          <dt className="mt-1.5 text-[12.5px] text-ink-2">things built</dt>
        </div>
      </dl>

      <p className="mt-4 text-[14px] text-ink-2">{footer}</p>
    </div>
  );
}
