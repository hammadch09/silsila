import { TASK_COLORS } from "@/lib/viz";

/**
 * A small object for each of the five steps.
 *
 * The "how it works" section was five text cards, which is the most boring
 * shape a section can take. Each card now carries a miniature of the thing it
 * describes, drawn in CSS — a plan filling in, a task arriving, a grade, a
 * question answered, a profile stacking up. They also carry the task-type
 * palette, which was previously stranded in a single chart.
 */

const frame =
  "flex h-[104px] items-center justify-center overflow-hidden rounded-xl bg-surface p-4";

/** 01 — a 12-week plan writing itself, day by day. */
function PlanForming() {
  return (
    <div className={frame}>
      <div className="grid w-full grid-cols-[repeat(14,1fr)] gap-[3px]">
        {Array.from({ length: 42 }, (_, index) => (
          <span
            key={index}
            className={`aspect-square rounded-[2px] ${
              index < 26 ? "bg-accent" : "bg-rule"
            }`}
            style={index >= 20 && index < 26 ? { opacity: 0.45 } : undefined}
          />
        ))}
      </div>
    </div>
  );
}

/** 02 — one task arriving, typed with its colour. */
function TaskArriving() {
  return (
    <div className={frame}>
      <div className="w-full rounded-xl bg-raised p-3 shadow-[var(--shadow-card)]">
        <span
          className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.12em]"
          style={{ color: TASK_COLORS.ARTIFACT }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: TASK_COLORS.ARTIFACT }}
          />
          ARTIFACT · 40 MIN
        </span>
        <span className="mt-1.5 block h-1.5 w-full rounded-full bg-rule" />
        <span className="mt-1 block h-1.5 w-2/3 rounded-full bg-rule" />
      </div>
    </div>
  );
}

/** 03 — the grade, and the two lines that come with it. */
function GradeGiven() {
  return (
    <div className={frame}>
      <div className="w-full">
        <div className="flex items-end justify-between">
          <span className="text-[26px] leading-none font-semibold tracking-[-0.03em] tabular-nums">
            4<span className="text-[15px] text-ink-3">/5</span>
          </span>
          <div className="flex w-1/2 gap-1">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="h-1.5 flex-1 rounded-full bg-accent" />
            ))}
            <span className="h-1.5 flex-1 rounded-full bg-rule" />
          </div>
        </div>
        <div className="mt-3 space-y-1.5">
          <span className="flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: TASK_COLORS.ARTIFACT }}
            />
            <span className="block h-1.5 w-full rounded-full bg-rule" />
          </span>
          <span className="flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: TASK_COLORS.HORIZON }}
            />
            <span className="block h-1.5 w-3/4 rounded-full bg-rule" />
          </span>
        </div>
      </div>
    </div>
  );
}

/** 04 — asked at 11pm, answered in plain English. */
function QuestionAsked() {
  return (
    <div className={frame}>
      <div className="flex w-full flex-col gap-1.5">
        <span className="self-end rounded-lg rounded-br-sm bg-accent-soft px-2.5 py-1.5 font-mono text-[9.5px] text-accent">
          kya karun?
        </span>
        <span className="self-start rounded-lg rounded-bl-sm bg-raised px-2.5 py-2 shadow-[var(--shadow-card)]">
          <span className="block h-1.5 w-[76px] rounded-full bg-rule" />
          <span className="mt-1 block h-1.5 w-[52px] rounded-full bg-rule" />
        </span>
      </div>
    </div>
  );
}

/** 05 — six months of it, stacking into something you can send. */
function ProfileStacking() {
  const bars = [24, 38, 30, 52, 46, 64, 58, 78, 70, 88, 82, 100];
  return (
    <div className={frame}>
      <div className="flex h-full w-full items-end gap-[5px]">
        {bars.map((height, index) => (
          <span
            key={index}
            className="flex-1 rounded-t-[2px]"
            style={{
              height: `${height}%`,
              background:
                index === bars.length - 1 ? TASK_COLORS.SKILL : "var(--color-rule)",
              opacity: index === bars.length - 1 ? 1 : 0.5 + index * 0.04,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export const STEP_VISUALS = [
  PlanForming,
  TaskArriving,
  GradeGiven,
  QuestionAsked,
  ProfileStacking,
];
