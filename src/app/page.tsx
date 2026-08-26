import { SilsilaLockup, SilsilaMark } from "@/components/logo";
import { HeroVisual } from "@/components/hero-visual";
import { PlanVsReality } from "@/components/plan-vs-reality";
import { TaskMixBar } from "@/components/task-mix-bar";
import { WaitlistForm } from "@/components/waitlist-form";
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

const TIMELINE = [
  {
    when: "SEM 1–3",
    title: "Foundations",
    what: "Build the habit. Widen what you know exists.",
  },
  {
    when: "SEM 4–6",
    title: "Internship push",
    what: "Portfolio pieces that survive a real screen. CV and LinkedIn at a real standard. How to find openings, how to apply, what to expect on day one.",
    emphasis: true,
  },
  {
    when: "SEM 7–8",
    title: "Full-time, or founder",
    what: "Deeper artifacts, referrals, applications.",
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
      <header className="sticky top-0 z-20 border-b border-rule bg-paper/85 backdrop-blur">
        <div className={`${shellClass} flex h-14 items-center justify-between`}>
          <SilsilaLockup markClassName="h-[22px] w-[22px]" />
          <a
            href="#form"
            className="rounded-lg bg-ink px-4 py-2 text-[13px] font-medium text-paper no-underline hover:bg-accent"
          >
            Join waitlist
          </a>
        </div>
      </header>

      <main className="flex-1">
        {/* HERO — the headline gets the full 1180px on its own row. Boxed into
            seven columns it wrapped to three lines and orphaned "Aur koi";
            across the full measure it sets in two and can be genuinely large,
            which is the whole point of a face like this. */}
        <section className={`${shellClass} pt-20 pb-24 lg:pt-24`}>
          <p className={labelClass}>
            Early access · computing students · 100 places
          </p>

          {/* The name is the thesis, so the headline uses it as a verb. "Koi
              poochne wala" was a complaint — the phrase Urdu speakers use for
              nobody-cares-about-me — which is the wrong register for a product
              that refuses to shame anyone. "Silsila chalta rahe" is what you
              say when you want a good thing to keep going. */}
          <h1 className="mt-7 text-[40px] sm:text-[58px] lg:text-[68px]">
            Roz ek kaam.
            <br />
            <span className="text-accent">Silsila</span> chalta rahe.
          </h1>

          <p className="mt-6 max-w-[52ch] text-[15px] text-ink-3">
            <span className="font-mono text-[13px] tracking-[0.04em] text-ink-2">
              silsila
            </span>{" "}
            (سلسلہ) — an unbroken chain. One thing after another, without a
            break. That&rsquo;s the entire product.
          </p>

          <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="max-w-[40ch] text-[21px] leading-[1.35] font-medium">
                A 3-month plan. One 30-minute task a day. Graded, not ticked.
                All on WhatsApp.
              </p>

              <p className="mt-5 max-w-[46ch] text-[16px] text-ink-2">
                You already got a roadmap from ChatGPT. You did three days of
                it, then the semester happened. It&rsquo;s not that you&rsquo;re
                not serious —{" "}
                <span className="font-semibold text-ink">
                  nobody asked on day four.
                </span>
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href="#form"
                  className="inline-block rounded-xl bg-accent px-7 py-4 text-[16px] font-medium text-white no-underline shadow-[var(--shadow-card)] transition-colors hover:bg-ink"
                >
                  Get your first week — free
                </a>
                <span className="text-[14px] text-ink-3">
                  No calls · takes a minute
                </span>
              </div>

              {/* The whole commitment as three numbers. Fills the column
                  beside the log, and answers "how much is this going to
                  cost me" before anyone has to ask. */}
              <dl className="mt-12 grid max-w-[30rem] grid-cols-3 gap-4 border-t border-rule pt-6">
                {[
                  { v: "3", l: "months" },
                  { v: "84", l: "tasks" },
                  { v: "30–45", l: "min a day" },
                ].map((stat) => (
                  <div key={stat.l}>
                    <dd className="text-[30px] leading-none font-semibold tracking-[-0.03em] tabular-nums">
                      {stat.v}
                    </dd>
                    <dt className="mt-2 font-mono text-[11px] tracking-[0.12em] text-ink-3 uppercase">
                      {stat.l}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>

            {/* The product as an object, not a description: the chat on a
                phone, the grade and the filling grid floating off it. */}
            <div className="lg:col-span-5">
              <HeroVisual />
              <p className="mt-8 text-center text-[13px] text-ink-3">
                Graded, not marked done by you. A checkbox teaches nothing and
                can be lied to.
              </p>
            </div>
          </div>
        </section>

        {/* THE PROBLEM — named before anything is sold. The grid here is the
            same one that closes the page as six months of finished work, so
            the reader meets the shape at its worst and recognises it at its
            best. */}
        <section className={`${shellClass} py-28`}>
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

          <div className="mt-16">
            <PlanVsReality />
          </div>

          <p className="mt-16 max-w-[26ch] text-[26px] leading-[1.2] font-semibold tracking-[-0.02em] sm:text-[32px]">
            The plan was never the hard part.{" "}
            <span className="text-accent">Day four was.</span>
          </p>
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
        <section className="py-28">
          <div className={shellClass}>
            <p className={labelClass}>
              How it works
            </p>
            <h2 className={`mt-5 max-w-[16ch] ${headingClass}`}>
              A plan that runs itself, and checks on you.
            </h2>

            <ol className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {STEPS.map((step, index) => (
                <li key={step.title} className="rounded-2xl bg-raised p-6 shadow-[var(--shadow-card)]">
                  <span className="font-mono text-[12px] text-ink-3 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 text-[19px] leading-[1.2] font-semibold tracking-[-0.02em]">
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

            <ol className="mt-14 grid gap-8 lg:grid-cols-3 lg:gap-10">
              {TIMELINE.map((row) => (
                <li
                  key={row.when}
                  className={`rounded-2xl bg-raised p-6 shadow-[var(--shadow-card)] ${
                    row.emphasis ? "ring-1 ring-accent" : ""
                  }`}
                >
                  <p
                    className={`font-mono text-[11px] tracking-[0.14em] ${
                      row.emphasis ? "text-accent" : "text-ink-3"
                    }`}
                  >
                    {row.when}
                  </p>
                  <p className="mt-3 text-[20px] leading-[1.2] font-semibold tracking-[-0.02em]">
                    {row.title}
                  </p>
                  <p
                    className="mt-2.5 text-[15px] text-ink-2"
                  >
                    {row.what}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* PROFILE */}
        <section className={`${shellClass} py-20`}>
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

        {/* FORM */}
        <section id="form" className={`${shellClass} scroll-mt-16 py-20`}>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className={headingClass}>
                Get your first week&rsquo;s plan — <span className="mark">free.</span>
              </h2>
              <p className="mt-6 max-w-[36ch] text-[16px] text-ink-2">
                Six questions. We send the plan to your WhatsApp within 48
                hours.
              </p>

              <dl className="mt-10 flex flex-col gap-6 border-t border-rule pt-8">
                {REASSURANCES.map(([term, detail]) => (
                  <div key={term}>
                    <dt className="font-semibold">{term}</dt>
                    <dd className="mt-1 text-[15px] text-ink-2">{detail}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-raised p-6 shadow-[var(--shadow-card)] lg:p-8">
                <WaitlistForm />
              </div>
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
