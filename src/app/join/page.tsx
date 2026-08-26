"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { SilsilaLockup } from "@/components/logo";
import { DEPARTMENTS } from "@/lib/intake-options";
import {
  generatePlan,
  planSummary,
  PLAN_WEEKS,
  type Destination,
  type Intake,
  type Level,
} from "@/lib/plan";
import { isValidPakistaniMobile, WHATSAPP_ERROR } from "@/lib/validation";
import { TASK_COLORS } from "@/lib/viz";

/**
 * The join flow, front to back, with nothing persisted yet.
 *
 * One question per screen because these students are on phones with patchy
 * data, and a seven-field form is where people leave. Plan generation is real
 * — the same pure function the backend will call — so what you click through
 * is the actual plan someone would get, not a mockup of one.
 *
 * Wiring this to Postgres is: write the User + Plan + PlanDay rows at
 * `finish`, send a login code, and move `/today` to a server component. The
 * schema for all of that already exists.
 */

type Answers = {
  destination?: Destination;
  department?: string;
  semester?: number;
  level?: Level;
  daysPerWeek?: number;
  minutesPerDay?: number;
  name?: string;
  whatsapp?: string;
};

type Choice = { value: string; label: string; hint?: string };

type Step = {
  id: keyof Answers;
  question: string;
  note?: string;
  choices?: Choice[];
  kind?: "text" | "contact";
};

const STEPS: Step[] = [
  {
    id: "destination",
    question: "What are you actually after?",
    note: "This changes the whole plan, so answer honestly. You can switch later.",
    choices: [
      { value: "JOB", label: "A job", hint: "Internship first, then full-time." },
      {
        value: "FOUNDER",
        label: "Something of my own",
        hint: "More building and talking to people, less course work.",
      },
    ],
  },
  {
    id: "department",
    question: "What are you studying?",
    note: "Early access is Islamia University Bahawalpur, computing programs only.",
    choices: DEPARTMENTS.map((d) => ({ value: d, label: d })),
  },
  {
    id: "semester",
    question: "Which semester?",
    note: "Semesters 4–6 are when most companies here hire interns. That changes what we push.",
    choices: ["1", "2", "3", "4", "5", "6", "7", "8"].map((n) => ({
      value: n,
      label: `Semester ${n}`,
    })),
  },
  {
    id: "level",
    question: "How much can you build right now?",
    note: "There is no wrong answer. Saying beginner gets you a better plan than pretending.",
    choices: [
      { value: "NONE", label: "Nothing yet", hint: "Total beginner." },
      { value: "SOME", label: "A little", hint: "A course or two, nothing finished." },
      {
        value: "COMFORTABLE",
        label: "I can build small things",
        hint: "You've shipped something, even if rough.",
      },
    ],
  },
  {
    id: "daysPerWeek",
    question: "How many days a week can you really show up?",
    note: "Pick the number you can keep in exam week, not the number you want to be true.",
    choices: [
      { value: "3", label: "3 days", hint: "Slower, but it survives a bad month." },
      { value: "5", label: "5 days", hint: "Most people. Weekends off." },
      { value: "7", label: "Every day", hint: "Only if you mean it." },
    ],
  },
  {
    id: "minutesPerDay",
    question: "How long, each time?",
    choices: [
      { value: "25", label: "25 minutes", hint: "Between classes." },
      { value: "40", label: "40 minutes", hint: "The default." },
      { value: "60", label: "An hour", hint: "If you have a free evening most days." },
    ],
  },
  { id: "name", question: "What should we call you?", kind: "text" },
  {
    id: "whatsapp",
    question: "Where should the daily task go?",
    note: "WhatsApp only. No email, no calls, and nothing else sent to this number.",
    kind: "contact",
  },
];

export default function JoinPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const current = STEPS[step];
  const progress = ((step + (done ? 1 : 0)) / STEPS.length) * 100;

  function commit(value: string) {
    const numeric = ["semester", "daysPerWeek", "minutesPerDay"];
    const parsed = numeric.includes(current.id) ? Number(value) : value;

    setAnswers((prev) => ({ ...prev, [current.id]: parsed }));
    setText("");
    setError("");

    if (step === STEPS.length - 1) setDone(true);
    else setStep(step + 1);
  }

  function submitText() {
    const value = text.trim();

    if (current.kind === "contact") {
      if (!isValidPakistaniMobile(value)) {
        setError(WHATSAPP_ERROR);
        return;
      }
    } else if (value.length < 2) {
      setError("Just a first name is fine.");
      return;
    }

    commit(value);
  }

  function back() {
    setError("");
    if (done) setDone(false);
    else if (step > 0) setStep(step - 1);
  }

  if (done) {
    return <PlanReveal answers={answers} onBack={back} />;
  }

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header />

      <div aria-hidden className="h-1 w-full bg-rule-soft">
        <div
          className="h-full bg-accent transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <main className="mx-auto flex w-full max-w-[640px] flex-1 flex-col justify-center px-6 py-16">
        <p className="font-mono text-[11px] tracking-[0.16em] text-ink-3 uppercase">
          Question {step + 1} of {STEPS.length}
        </p>

        <h1 className="mt-5 text-[30px] leading-[1.12] sm:text-[38px]">
          {current.question}
        </h1>

        {current.note ? (
          <p className="mt-4 max-w-[46ch] text-[15px] text-ink-2">
            {current.note}
          </p>
        ) : null}

        {current.choices ? (
          <div className="mt-9 flex flex-col gap-2.5">
            {current.choices.map((choice) => (
              <button
                key={choice.value}
                type="button"
                onClick={() => commit(choice.value)}
                className="group rounded-xl bg-raised p-4 text-left shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-lift)]"
              >
                <span className="flex items-center justify-between gap-4">
                  <span>
                    <span className="block text-[16px] font-medium">
                      {choice.label}
                    </span>
                    {choice.hint ? (
                      <span className="mt-0.5 block text-[14px] text-ink-2">
                        {choice.hint}
                      </span>
                    ) : null}
                  </span>
                  <span
                    aria-hidden
                    className="text-ink-3 transition-colors group-hover:text-accent"
                  >
                    →
                  </span>
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-9">
            <input
              autoFocus
              value={text}
              onChange={(event) => {
                setText(event.target.value);
                setError("");
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") submitText();
              }}
              type={current.kind === "contact" ? "tel" : "text"}
              placeholder={
                current.kind === "contact" ? "03XXXXXXXXX" : "Your first name"
              }
              aria-label={current.question}
              aria-describedby={error ? "join-error" : undefined}
              className="w-full rounded-lg border border-rule bg-raised px-4 py-3.5 text-[17px] shadow-[0_1px_2px_rgba(13,17,23,0.04)] focus:border-accent"
            />
            {error ? (
              <p
                id="join-error"
                role="alert"
                className="mt-3 rounded-lg bg-accent-soft px-3 py-2 text-[14px] text-accent"
              >
                {error}
              </p>
            ) : null}
            <button
              type="button"
              onClick={submitText}
              className="mt-5 cursor-pointer rounded-xl bg-accent px-7 py-3.5 text-[16px] font-medium text-white shadow-[var(--shadow-card)] transition-colors hover:bg-ink"
            >
              {step === STEPS.length - 1 ? "Build my plan" : "Continue"}
            </button>
          </div>
        )}

        {step > 0 ? (
          <button
            type="button"
            onClick={back}
            className="mt-10 self-start text-[14px] text-ink-3 underline underline-offset-4"
          >
            Back
          </button>
        ) : null}
      </main>
    </div>
  );
}

function Header() {
  return (
    <header className="border-b border-rule">
      <div className="mx-auto flex h-14 w-full max-w-[1180px] items-center justify-between px-6">
        <Link href="/" className="no-underline">
          <SilsilaLockup markClassName="h-[22px] w-[22px]" />
        </Link>
        <span className="font-mono text-[11px] tracking-[0.14em] text-ink-3 uppercase">
          Early access
        </span>
      </div>
    </header>
  );
}

function PlanReveal({
  answers,
  onBack,
}: {
  answers: Answers;
  onBack: () => void;
}) {
  // Built inside the memo so the object identity does not change every render
  // and the generator is not re-run for nothing.
  const intake: Intake = useMemo(
    () => ({
      destination: answers.destination ?? "JOB",
      level: answers.level ?? "NONE",
      department: answers.department ?? "",
      semester: answers.semester ?? 1,
      daysPerWeek: answers.daysPerWeek ?? 5,
      minutesPerDay: answers.minutesPerDay ?? 40,
    }),
    [answers],
  );

  const tasks = useMemo(() => generatePlan(intake), [intake]);
  const summary = planSummary(tasks);
  const firstWeek = tasks.filter((task) => task.week === 1);

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header />

      <main className="mx-auto w-full max-w-[880px] flex-1 px-6 py-14">
        <p className="font-mono text-[11px] tracking-[0.16em] text-accent uppercase">
          Your plan is ready
        </p>
        <h1 className="mt-5 max-w-[18ch] text-[32px] leading-[1.1] sm:text-[42px]">
          {answers.name ? `${answers.name}, here’s ` : "Here’s "}
          your next {PLAN_WEEKS} weeks.
        </h1>
        <p className="mt-5 max-w-[52ch] text-[16px] text-ink-2">
          {summary.total} tasks, {intake.minutesPerDay} minutes each,{" "}
          {intake.daysPerWeek} days a week. Roughly {summary.hours} hours in
          total — spread thin enough that a semester project can&rsquo;t knock
          it over.
        </p>

        <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { v: String(summary.total), l: "tasks" },
            { v: String(summary.artifacts), l: "things you'll build" },
            { v: `${summary.hours}h`, l: "total" },
            { v: `${intake.minutesPerDay}m`, l: "a day" },
          ].map((stat) => (
            <div
              key={stat.l}
              className="rounded-xl bg-raised p-4 shadow-[var(--shadow-card)]"
            >
              <dd className="text-[26px] leading-none font-semibold tabular-nums">
                {stat.v}
              </dd>
              <dt className="mt-2 text-[13px] text-ink-2">{stat.l}</dt>
            </div>
          ))}
        </dl>

        <h2 className="mt-14 text-[22px] font-semibold tracking-[-0.02em]">
          Week one
        </h2>
        <p className="mt-2 text-[15px] text-ink-2">
          This is exactly what lands, starting tomorrow.
        </p>

        <ol className="mt-6 flex flex-col gap-2.5">
          {firstWeek.map((task) => (
            <li
              key={task.dayIndex}
              className="flex gap-4 rounded-xl bg-raised p-4 shadow-[var(--shadow-card)]"
            >
              <span
                aria-hidden
                className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ background: TASK_COLORS[task.type] }}
              />
              <div className="min-w-0 flex-1">
                <p className="flex flex-wrap items-baseline gap-x-3">
                  <span className="text-[16px] font-medium">{task.title}</span>
                  <span className="font-mono text-[10px] tracking-[0.12em] text-ink-3">
                    {task.type} · {task.minutes}M
                  </span>
                </p>
                <p className="mt-1 text-[14.5px] text-ink-2">{task.detail}</p>
              </div>
              <span className="font-mono text-[11px] text-ink-3 tabular-nums">
                D{task.dayIndex}
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-12 rounded-2xl bg-accent-soft p-6">
          <p className="text-[16px] font-medium">
            Nothing has been saved yet.
          </p>
          <p className="mt-1.5 max-w-[52ch] text-[15px] text-ink-2">
            This flow runs entirely in your browser so the shape can be checked
            before any of it is written down. Confirm it and the next step is
            accounts, storage and the daily send.
          </p>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="mt-8 text-[14px] text-ink-3 underline underline-offset-4"
        >
          Change an answer
        </button>
      </main>
    </div>
  );
}
