"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Eight semesters, each one dying in roughly the same place.
 *
 * This is the strongest idea on the page: the failure is not one bad semester,
 * it is the same two weeks repeated eight times. Playing the rows in sequence
 * with a restart counter climbing makes that a shape you watch rather than a
 * claim you read — and the reason appearing beside each dead row is the part
 * that stings, because every one of them is a sentence the reader has said.
 */

const WEEKS = 14;

type Semester = {
  label: string;
  diesOn: number;
  reason: string;
  /** The one row called out in warm — the semester it starts to cost money. */
  warm?: boolean;
};

const SEMESTERS: Semester[] = [
  { label: "SEM 1", diesOn: 3, reason: "Started strong. Then midterms." },
  { label: "SEM 2", diesOn: 2, reason: "Waited for the semester to calm down." },
  { label: "SEM 3", diesOn: 4, reason: "New course, new plan. Same week four." },
  { label: "SEM 4", diesOn: 2, reason: "Bought a course. Watched two videos." },
  {
    label: "SEM 5",
    diesOn: 5,
    reason: "Internship applications. Nothing to show.",
    warm: true,
  },
  { label: "SEM 6", diesOn: 1, reason: "Decided to start properly after exams." },
  { label: "SEM 7", diesOn: 3, reason: "Final year project ate everything." },
  { label: "SEM 8", diesOn: 2, reason: "Three nights, one CV, nothing to put on it." },
];

/** The count that actually hurts, under the rows. */
const TOTALS = [
  { value: "8", label: "plans made" },
  { value: "0", label: "plans finished" },
  { value: "1", label: "degree, no evidence" },
];

const CELL_MS = 70;
const ROW_GAP_MS = 340;

export function SemesterLoop() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState<number[]>(() =>
    SEMESTERS.map(() => -1),
  );
  const [done, setDone] = useState<boolean[]>(() => SEMESTERS.map(() => false));

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const timers: ReturnType<typeof setTimeout>[] = [];

    const finish = () => {
      setProgress(SEMESTERS.map((s) => s.diesOn));
      setDone(SEMESTERS.map(() => true));
    };

    if (reduced || !("IntersectionObserver" in window)) {
      timers.push(setTimeout(finish, 0));
      return () => timers.forEach(clearTimeout);
    }

    let started = false;

    const playRow = (row: number) => {
      if (row >= SEMESTERS.length) return;
      const dies = SEMESTERS[row].diesOn;

      for (let week = 0; week <= dies; week++) {
        timers.push(
          setTimeout(() => {
            setProgress((prev) => {
              const next = [...prev];
              next[row] = week;
              return next;
            });
          }, week * CELL_MS),
        );
      }

      timers.push(
        setTimeout(
          () => {
            setDone((prev) => {
              const next = [...prev];
              next[row] = true;
              return next;
            });
            playRow(row + 1);
          },
          (dies + 1) * CELL_MS + ROW_GAP_MS,
        ),
      );
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        observer.disconnect();
        timers.push(setTimeout(() => playRow(0), 320));
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  const restarts = done.filter(Boolean).length;

  return (
    <div ref={ref} className="rounded-2xl bg-raised p-5 shadow-[var(--shadow-card)] sm:p-7">
      <div className="flex items-center justify-between gap-4 border-b border-rule pb-4">
        <span className="font-mono text-[10.5px] tracking-[0.16em] text-ink-3 uppercase">
          Semester
        </span>
        <span className="hidden font-mono text-[10.5px] tracking-[0.16em] text-ink-3 uppercase sm:block">
          {WEEKS} weeks →
        </span>
        <span className="font-mono text-[10.5px] tracking-[0.16em] text-peach-deep uppercase tabular-nums">
          Restarts {restarts}
        </span>
      </div>

      <ol className="mt-2">
        {SEMESTERS.map((semester, row) => {
          const reached = progress[row];
          const isDone = done[row];

          return (
            <li
              key={semester.label}
              className={`flex flex-col gap-2 border-b border-rule-soft py-3.5 last:border-b-0 sm:flex-row sm:items-center sm:gap-5 ${
                semester.warm ? "-mx-3 rounded-lg bg-peach/50 px-3" : ""
              }`}
            >
              <span
                className={`w-[52px] shrink-0 font-mono text-[10.5px] tracking-[0.12em] ${
                  semester.warm ? "text-peach-deep" : "text-ink-3"
                }`}
              >
                {semester.label}
              </span>

              <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
                <div
                  role="img"
                  aria-label={`${semester.label}: stopped in week ${semester.diesOn + 1}. ${semester.reason}`}
                  className="flex flex-1 gap-[3px]"
                >
                  {Array.from({ length: WEEKS }, (_, week) => {
                    const alive = week <= reached && week < semester.diesOn + 1;
                    const isBreak = week === semester.diesOn && isDone;

                    return (
                      <span
                        key={week}
                        className={`h-6 flex-1 rounded-[2px] transition-[background-color,transform] duration-300 ${
                          isBreak
                            ? semester.warm
                              ? "scale-y-[0.42] bg-[#e09a6e]"
                              : "scale-y-[0.42] bg-[#d8b3a0]"
                            : alive
                              ? semester.warm
                                ? "bg-peach-deep"
                                : "bg-accent"
                              : semester.warm
                                ? "bg-peach"
                                : "bg-rule-soft"
                        }`}
                      />
                    );
                  })}
                </div>

                <span
                  className={`text-[13.5px] transition-all duration-500 sm:w-[248px] sm:shrink-0 ${
                    semester.warm ? "text-peach-deep" : "text-ink-2"
                  } ${
                    isDone
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-1.5 opacity-0"
                  }`}
                >
                  {semester.reason}
                </span>
              </div>
            </li>
          );
        })}
      </ol>

      <dl className="mt-6 flex flex-wrap gap-10 border-t border-rule pt-6">
        {TOTALS.map((total) => (
          <div key={total.label}>
            <dd className="text-[26px] leading-none font-semibold tabular-nums">
              {total.value}
            </dd>
            <dt className="mt-1.5 text-[13px] text-ink-2">{total.label}</dt>
          </div>
        ))}
      </dl>
    </div>
  );
}
