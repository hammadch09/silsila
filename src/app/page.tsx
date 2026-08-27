import { IllustrationSteps } from "@/components/illustration-steps";
import { SilsilaMark } from "@/components/logo";
import { SiteHeader } from "@/components/site-header";
import { TwoPaths } from "@/components/two-paths";
import { SemesterTrack } from "@/components/semester-track";
import { STEP_VISUALS } from "@/components/step-visuals";
import { HeroVisual } from "@/components/hero-visual";
import { TaskMixBar } from "@/components/task-mix-bar";
import { WeekStrip } from "@/components/week-strip";
import { buildHeatmapCells } from "@/lib/viz";

const STEPS = [
  {
    title: "It builds the plan.",
    body: "You say what you're after — a job, or something of your own. It asks your semester, your level and the hours you actually have, then writes 3 months down to individual days.",
  },
  {
    title: "It sends one task a day.",
    body: "30–45 minutes. Small enough that a semester project can't justify skipping it.",
  },
  {
    title: "It grades what you send back.",
    body: "Not a tick. A grade against the task's own criteria, one thing you did well, one thing to fix. For most students this is the first time anyone has looked at their work and said where it stands.",
  },
  {
    title: "You can ask it anything.",
    body: "Stuck at 11pm with nobody to ask is the moment people quit. Ask in Urdu, Roman Urdu or English — it knows your plan and what you sent last week.",
  },
  {
    title: "It piles up.",
    body: "Every graded submission adds to a profile you can send an employer. Finish one 3-month plan, start the next.",
  },
];

const PROFILE_STATS = [
  { value: "148", label: "tasks graded" },
  { value: "9", label: "things built" },
  { value: "4.1", label: "grade average" },
];

const REASSURANCES = [
  [
    "No streaks to lose.",
    "Miss a week for exams. Come back and it picks a lighter task.",
  ],
  ["Free while we're in early access.", "No card, no calls."],
  ["Works on your phone.", "Everything runs through WhatsApp."],
];

const labelClass =
  "font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3";

const shellClass = "mx-auto w-full max-w-[1180px] px-6 lg:px-10";

const headingClass = "text-[32px] sm:text-[40px] lg:text-[44px]";

export default function Home() {
  const cells = buildHeatmapCells();

  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        {/* HERO — the two paths are the pitch. A student recognises the
            left panel before reading a word of copy, and the right panel is
            the product without needing to explain it. */}
        <section className={`${shellClass} pt-16 pb-24 lg:pt-20`}>
          <p className={labelClass}>For computing students at IUB</p>

          <div className="mt-7 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h1 className="text-[40px] sm:text-[54px] lg:text-[62px]">
                Everyone starts.
                <br />
                <span className="text-accent">Almost nobody finishes.</span>
              </h1>
            </div>
            <div className="lg:col-span-5 lg:pt-2">
              <p className="text-[19px] leading-[1.4] font-medium">
                Four years of starting over is a degree and a blank CV. Silsila
                breaks what you want to become into 84 small days, and tracks
                every one.
              </p>
              <p className="mt-4 text-[15px] text-ink-3">
                <span className="font-mono text-[13px] text-ink-2">silsila</span>{" "}
                (سلسلہ) — an unbroken chain. One thing after another, without a
                break.
              </p>
            </div>
          </div>

          <div className="mt-14">
            <TwoPaths />
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href="/join"
              className="inline-block rounded-xl bg-accent px-7 py-4 text-[16px] font-medium text-white no-underline shadow-[var(--shadow-card)] transition-colors hover:bg-ink"
            >
              Get your first week — free
            </a>
            <span className="text-[15px] text-ink-2">
              Free · no calls · takes a minute
            </span>
            <dl className="ml-auto hidden gap-8 sm:flex">
              {[
                { v: "3", l: "months" },
                { v: "84", l: "tasks" },
                { v: "30–45", l: "min a day" },
              ].map((stat) => (
                <div key={stat.l}>
                  <dd className="text-[24px] leading-none font-semibold tracking-[-0.03em] tabular-nums">
                    {stat.v}
                  </dd>
                  <dt className="mt-1.5 font-mono text-[10px] tracking-[0.12em] text-ink-3 uppercase">
                    {stat.l}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* THE PROBLEM — the hero already showed this; here it is named, and
            the blame is taken off the reader. Deliberately text only: two
            grids making the same point would weaken both. */}
        <section id="problem" className={`${shellClass} py-28`}>
          <p className={labelClass}>Why plans die</p>

          <h2 className={`mt-6 max-w-[20ch] ${headingClass}`}>
            You&rsquo;ve made this plan before.
          </h2>

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <p className="max-w-[52ch] text-[18px] text-ink-2 lg:col-span-7">
              Maybe in first semester. Maybe last week. You wrote it down, you
              were serious, and you meant every line of it. You were not being
              lazy — you were being{" "}
              <span className="text-ink">a person with a life</span>.
            </p>
            <p className="max-w-[46ch] text-[16px] text-ink-2 lg:col-span-5">
              Four years of starting over is a degree, a blank CV, and the
              belief that it was your fault. It wasn&rsquo;t. Consistency
              isn&rsquo;t a personality trait you were born without — it&rsquo;s
              a thing other people have help with.
            </p>
          </div>

          <div className="mt-14 grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <IllustrationSteps className="w-full" />
            </div>
            <div className="lg:col-span-6">
              <p className="max-w-[22ch] text-[26px] leading-[1.2] font-semibold tracking-[-0.02em] sm:text-[32px]">
                The plan was never the hard part.{" "}
                <span className="text-accent">Day four was.</span>
              </p>
              <p className="mt-6 max-w-[44ch] text-[16px] text-ink-2">
                A goal is one enormous block, and nobody can lift it. Silsila
                cuts it into pieces small enough to pick up on a bad day, then
                keeps count so you never have to.
              </p>
            </div>
          </div>
        </section>

        {/* THE DAY — the loop as a conversation, since that is literally
            where it happens. */}
        <section className="py-28">
          <div className={shellClass}>
            <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <p className={labelClass}>A day on Silsila</p>
                <h2 className={`mt-5 ${headingClass}`}>
                  It arrives. You reply. It answers back.
                </h2>
                <p className="mt-6 max-w-[42ch] text-[16px] text-ink-2">
                  No app to remember to open, no dashboard to keep up with. The
                  task comes to the place you already check forty times a day,
                  and what you send back gets read.
                </p>

                <ul className="mt-8 flex flex-col gap-4">
                  {[
                    ["Ask in Urdu.", "Answers come back in plain English."],
                    ["No streaks to lose.", "Miss a week. Come back to a lighter task."],
                    ["Graded, not ticked.", "A checkbox can be lied to."],
                  ].map(([term, detail]) => (
                    <li key={term} className="flex gap-3">
                      <span
                        aria-hidden
                        className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      />
                      <p className="text-[15px]">
                        <span className="font-medium">{term}</span>{" "}
                        <span className="text-ink-2">{detail}</span>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-7">
                <HeroVisual />
              </div>
            </div>
          </div>
        </section>

        {/* A WEEK — the task-type colours keep the light surface they were
            validated against. */}
        <section className="py-28">
          <div className={shellClass}>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className={labelClass}>What a week looks like</p>
                <h2 className={`mt-5 ${headingClass}`}>
                  Seven days.
                  <br />
                  Seven <span className="mark">small things.</span>
                </h2>
              </div>
              <p className="max-w-[36ch] text-[16px] text-ink-2">
                Nothing here needs a free afternoon. That&rsquo;s the whole
                design — a semester project can&rsquo;t justify skipping 30
                minutes.
              </p>
            </div>

            <div className="mt-12">
              <WeekStrip />
            </div>
          </div>
        </section>

        {/* THE MIX — the chart section, on the validated light surface. */}
        <section className={`${shellClass} py-20`}>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className={labelClass}>The mix</p>
              <h2 className={`mt-5 ${headingClass}`}>
                Not tutorials on repeat.
              </h2>
              <p className="mt-6 text-[16px] text-ink-2">
                If every task were &ldquo;watch a React video&rdquo;, this would
                be a worse Coursera. The rotation is the product.
              </p>
              <p className="mt-4 text-[14px] text-ink-3">
                Human tasks have the worst completion rate and the highest
                long-term value. They stay in.
              </p>
            </div>

            <div className="lg:col-span-8 lg:pt-8">
              <TaskMixBar />
            </div>
          </div>
        </section>

        {/* HOW — the section a student most needs to actually read, so it gets
            cards on a quiet surface rather than a shouted colour field. */}
        <section id="how" className="py-28">
          <div className={shellClass}>
            <p className={labelClass}>
              How it works
            </p>
            <h2 className={`mt-5 max-w-[16ch] ${headingClass}`}>
              A plan that runs itself, and checks on you.
            </h2>

            <ol className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {STEPS.map((step, index) => (
                <li
                  key={step.title}
                  className="flex flex-col rounded-2xl bg-raised p-5 shadow-[var(--shadow-card)]"
                >
                  {(() => {
                    const Visual = STEP_VISUALS[index];
                    return <Visual />;
                  })()}
                  <span className="mt-5 font-mono text-[12px] text-ink-3 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-2 text-[19px] leading-[1.2] font-semibold tracking-[-0.02em]">
                    {step.title}
                  </p>
                  <p className="mt-2.5 text-[15px] text-ink-2">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* TIMELINE */}
        <section className="py-28">
          <div className={shellClass}>
            <p className={labelClass}>
              The milestone is an internship
            </p>
            <h2 className={`mt-5 max-w-[18ch] ${headingClass}`}>
              Not graduation. That&rsquo;s{" "}
              <span className="mark">too far away</span> to hold
              anyone.
            </h2>
            <p className="mt-6 max-w-[52ch] text-[16px] text-ink-2">
              Most companies here hire interns out of semesters 4 to 6.
              That&rsquo;s close enough to work toward, and it happens while
              you&rsquo;re still a student.
            </p>

            <div className="mt-14">
              <SemesterTrack />
            </div>
          </div>
        </section>

        {/* PROFILE */}
        <section id="profile" className={`${shellClass} py-20`}>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className={labelClass}>What you end up with</p>
              <h2 className={`mt-5 ${headingClass}`}>
                A page, not a <span className="mark">blank CV.</span>
              </h2>
              <p className="mt-6 text-[16px] text-ink-2">
                Every graded submission lands here. After two 3-month plans it
                is the thing you send an employer.
              </p>
            </div>

            <div className="lg:col-span-8">
              <div className="rounded-2xl bg-raised p-6 shadow-[var(--shadow-lift)] lg:p-9">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-mono text-[15px]">silsila.pk/ayesha-r</p>
                  <p className="text-[13px] text-ink-3">
                    Semester 5 · Computer Science · Bahawalpur
                  </p>
                </div>

                <div
                  role="img"
                  aria-label="Six months of daily submissions, sparse at the start and dense by the end."
                  className="mt-7 grid grid-cols-[repeat(26,1fr)] gap-[3px]"
                >
                  {cells.map((background, index) => (
                    <div
                      key={index}
                      className="aspect-square rounded-[1px]"
                      style={{ background }}
                    />
                  ))}
                </div>

                <p className="mt-3 font-mono text-[10px] tracking-[0.14em] text-ink-3">
                  26 WEEKS →
                </p>

                <dl className="mt-9 grid grid-cols-3 gap-6 border-t border-rule pt-7">
                  {PROFILE_STATS.map((stat) => (
                    <div key={stat.label}>
                      <dd className="text-[40px] leading-none font-semibold tracking-[-0.035em] tabular-nums">
                        {stat.value}
                      </dd>
                      <dt className="mt-3 text-[13px] text-ink-3">
                        {stat.label}
                      </dt>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* THE PROMISE — product.md §1b, deliberately unsoftened. */}
        <section className="relative overflow-hidden bg-deep py-32 text-paper">
          <div
            aria-hidden
            className="absolute -top-1/3 left-1/2 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(33,88,208,0.35),transparent_70%)]"
          />
          <div className={shellClass}>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <p className="font-mono text-[11px] tracking-[0.18em] text-paper/45 uppercase">
                  What we promise
                </p>
                <ul className="mt-7 flex flex-col gap-4 text-[19px] text-paper/50">
                  <li>We don&rsquo;t promise you a job.</li>
                  <li>We don&rsquo;t promise you&rsquo;ll start a company.</li>
                  <li>We don&rsquo;t promise you&rsquo;ll be in the top 1%.</li>
                </ul>
              </div>

              <div className="lg:col-span-7">
                <p className="max-w-[24ch] text-[32px] leading-[1.12] font-semibold tracking-[-0.03em] sm:text-[40px]">
                  When you graduate, you will have{" "}
                  <span className="text-accent">something to say.</span>
                </p>
                <p className="mt-7 max-w-[44ch] text-[17px] text-paper/75">
                  Something in your skill set. A profile that&rsquo;s been
                  worked on. Things you actually built. You will not be starting
                  from zero.
                </p>
                <p className="mt-7 max-w-[46ch] text-[15px] text-paper/45">
                  Every skills course sold to Pakistani students promises a job
                  in three months. You&rsquo;ve heard it before. We&rsquo;d
                  rather promise something we can keep.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* JOIN — the waitlist is gone. Answering the questions IS the
            signup now, so the page ends by starting the thing. */}
        <section id="form" className={`${shellClass} scroll-mt-16 py-28`}>
          <div className="rounded-3xl bg-sky p-8 sm:p-12 lg:p-16">
            <div className="max-w-[34ch]">
              <h2 className={headingClass}>
                Eight questions. Then your first week.
              </h2>
              <p className="mt-6 max-w-[46ch] text-[17px] text-ink-2">
                No waitlist and no calls. You answer what you&rsquo;re after,
                where you are and how much time you actually have, and the plan
                is built in front of you.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href="/join"
                  className="inline-block rounded-xl bg-accent px-7 py-4 text-[16px] font-medium text-white no-underline shadow-[var(--shadow-card)] transition-colors hover:bg-ink"
                >
                  Build my plan — free
                </a>
                <span className="text-[15px] text-ink-2">
                  Takes about a minute
                </span>
              </div>

              <dl className="mt-12 flex flex-col gap-5 border-t border-sky-deep/15 pt-8">
                {REASSURANCES.map(([term, detail]) => (
                  <div key={term}>
                    <dt className="font-medium">{term}</dt>
                    <dd className="mt-0.5 text-[15px] text-ink-2">{detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t border-rule">
        <div
          className={`${shellClass} flex flex-wrap justify-between gap-3 py-9 text-[13px]`}
        >
          <span className="inline-flex items-center gap-2.5">
            <SilsilaMark className="h-5 w-5 shrink-0" />
            Silsila — a daily companion for students working it out alone.
          </span>
          <a href="mailto:hello@silsila.pk">
            hello@silsila.pk
          </a>
        </div>
      </footer>
    </>
  );
}
