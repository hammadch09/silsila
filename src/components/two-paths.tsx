"use client";

import { useEffect, useRef, useState } from "react";

const WEEKS = 16;
const DAYS = WEEKS * 7; // four months
const PLAY_MS = 7000;
const HOLD_MS = 2400;

/**
 * Two students, same four months — played out rather than described.
 *
 * A static version made the argument; watching it happen teaches it. The left
 * panel dies on day four in front of you and then sits empty for months while
 * the right one keeps ticking. That is the whole product in seven seconds,
 * and it needs no copy to explain.
 *
 * The right-hand path deliberately is NOT perfect. It has gaps — exam week, a
 * shaadi, a bad patch — because §4 Phase 3 makes pausing a first-class
 * feature, and a flawless column would promise a discipline nobody has and
 * quietly shame everyone who misses a day.
 */

type Drift = "none" | "some" | "panic";
type Cell = Drift | "done" | "hidden";

function driftPath(): Drift[] {
  const days = new Array<Drift>(DAYS).fill("none");
  [0, 1, 2, 3, 11, 12, 26, 41].forEach((d) => (days[d] = "some"));
  for (let d = DAYS - 6; d < DAYS; d++) days[d] = "panic";
  return days;
}

function steadyPath(): Array<"none" | "done"> {
  const days = new Array<"none" | "done">(DAYS).fill("done");
  [
    ...range(30, 37), // exam week
    ...range(58, 61), // a shaadi
    ...range(86, 89), // a bad patch
    5,
    19,
    45,
    73,
    99,
  ].forEach((d) => {
    if (d < DAYS) days[d] = "none";
  });
  return days;
}

function range(from: number, to: number) {
  return Array.from({ length: to - from }, (_, i) => from + i);
}

const DRIFT = driftPath();
const STEADY = steadyPath();

/** Things get built only after enough consecutive work has gone in. */
const BUILD_DAYS = [12, 26, 39, 51, 64, 76, 88, 99, 108];

export function TwoPaths() {
  const [elapsed, setElapsed] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let frame = 0;
    let start = 0;

    // Reduced motion, or no observer: jump to the finished state and stop.
    // Deferred into a frame rather than set inline — a synchronous setState in
    // an effect body triggers a cascading render.
    if (reduced || !("IntersectionObserver" in window)) {
      frame = requestAnimationFrame(() => setElapsed(DAYS));
      return () => cancelAnimationFrame(frame);
    }

    const run = (now: number) => {
      if (!start) start = now;
      const t = now - start;

      if (t <= PLAY_MS) {
        setElapsed(Math.floor((t / PLAY_MS) * DAYS));
      } else if (t <= PLAY_MS + HOLD_MS) {
        setElapsed(DAYS);
      } else {
        start = now;
        setElapsed(0);
      }

      frame = requestAnimationFrame(run);
    };

    // Only run while on screen — an off-screen rAF loop is just battery.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !frame) {
          frame = requestAnimationFrame(run);
        } else if (!entry.isIntersecting && frame) {
          cancelAnimationFrame(frame);
          frame = 0;
          start = 0;
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const month = Math.min(4, Math.floor(elapsed / 28) + 1);
  const driftDone = DRIFT.slice(0, elapsed).filter((d) => d !== "none").length;
  const steadyDone = STEADY.slice(0, elapsed).filter((d) => d === "done").length;
  const built = BUILD_DAYS.filter((d) => d <= elapsed).length;

  return (
    <div ref={containerRef}>
      <div className="mb-4 flex items-center gap-3">
        <span className="font-mono text-[11px] tracking-[0.16em] text-ink-3 uppercase">
          Month {month} of 4
        </span>
        <span aria-hidden className="h-px flex-1 bg-rule" />
        <span className="font-mono text-[11px] tracking-[0.16em] text-ink-3 tabular-nums">
          DAY {String(Math.min(elapsed, DAYS)).padStart(3, "0")}
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
        <Panel
          tone="peach"
          label="Without a system"
          title="Four months, mostly waiting."
          cells={DRIFT.map((state, index) =>
            index < elapsed ? state : "hidden",
          )}
          days={driftDone}
          built={0}
          footer="A folder of unfinished tutorials, and three nights of panic at the end."
        />
        <Panel
          tone="sky"
          label="With Silsila"
          title="Four months, 30 minutes at a time."
          cells={STEADY.map((state, index) =>
            index < elapsed ? state : "hidden",
          )}
          days={steadyDone}
          built={built}
          footer="The gaps are exam week and a shaadi. You came back. That’s the only rule."
        />
      </div>
    </div>
  );
}

function Panel({
  tone,
  label,
  title,
  cells,
  days,
  built,
  footer,
}: {
  tone: "peach" | "sky";
  label: string;
  title: string;
  cells: Cell[];
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
        {cells.map((state, index) => (
          <span
            key={index}
            className={`aspect-square rounded-[2px] transition-colors duration-300 ${
              state === "panic"
                ? "bg-peach-deep"
                : state === "some"
                  ? "bg-peach-deep/40"
                  : state === "done"
                    ? "bg-sky-deep"
                    : state === "hidden"
                      ? "bg-white/25"
                      : "bg-white/60"
            }`}
          />
        ))}
      </div>

      <dl
        className={`mt-6 flex gap-6 border-t pt-4 ${
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
