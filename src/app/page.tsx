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

const headingClass = "text-[40px] sm:text-[52px] lg:text-[58px]";

export default function Home() {
  const cells = buildHeatmapCells();

  return (
    <>
      <header className="sticky top-0 z-20 border-b-2 border-ink bg-marigold">
        <div className={`${shellClass} flex h-14 items-center justify-between`}>
          <span className="font-mono text-[15px] font-medium tracking-[-0.01em]">
            silsila
          </span>
          <a
            href="#form"
            className="border-2 border-ink bg-ink px-4 py-1.5 font-mono text-[11px] tracking-[0.14em] text-marigold uppercase no-underline hover:bg-paper hover:text-ink"
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
        <section className={`${shellClass} pt-16 pb-20 lg:pt-20`}>
          <p className={labelClass}>
            Early access · computing students · 100 places
          </p>

          <h1 className="mt-7 text-[46px] sm:text-[72px] lg:text-[96px]">
            Roz ek kaam.
            <br />
            Aur koi <span className="mark">poochne wala.</span>
          </h1>

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
                  className="inline-block border-2 border-ink bg-marigold px-7 py-4 text-[17px] font-semibold text-ink no-underline shadow-[5px_5px_0_0_var(--color-ink)] transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0_0_var(--color-ink)]"
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
              <dl className="mt-12 grid max-w-[30rem] grid-cols-3 gap-4 border-t-2 border-ink pt-6">
                {[
                  { v: "3", l: "months" },
                  { v: "84", l: "tasks" },
                  { v: "30–45", l: "min a day" },
                ].map((stat) => (
                  <div key={stat.l}>
                    <dd className="text-[34px] leading-none font-bold tracking-[-0.03em] tabular-nums">
                      {stat.v}
                    </dd>
                    <dt className="mt-2 font-mono text-[11px] tracking-[0.12em] text-ink-3 uppercase">
                      {stat.l}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>

            {/* The log explains the product faster than any paragraph. */}
            <div className="lg:col-span-5">
              <p className={labelClass}>A day on Silsila</p>

              <div className="mt-5 border-2 border-ink bg-raised shadow-[6px_6px_0_0_var(--color-pine)]">
                <div className="border-b border-rule px-5 py-4">
                  <p className="font-mono text-[10px] tracking-[0.14em] text-marigold">
                    SILSILA · DAY 12
                  </p>
                  <p className="mt-2 text-[15px]">
                    Build a page that fetches live currency rates. Deploy it.
                    ~40 min.
                  </p>
                </div>

                {/* Urdu in, plain English out — product.md §Language. */}
                <div className="border-b border-rule bg-surface px-5 py-4">
                  <p className="font-mono text-[10px] tracking-[0.14em] text-ink-3">
                    YOU
                  </p>
                  <p className="mt-2 text-[15px]">
                    agar API down ho jaye to kya karun?
                  </p>
                </div>

                <div className="border-b border-rule px-5 py-4">
                  <p className="font-mono text-[10px] tracking-[0.14em] text-marigold">
                    SILSILA
                  </p>
                  <p className="mt-2 text-[15px]">
                    Show the last rate you saved, with the time you saved it.
                    Then a short line: &ldquo;Could not update just now.&rdquo;
                    That is what a real app does.
                  </p>
                </div>

                <div className="border-b border-rule bg-surface px-5 py-4">
                  <p className="font-mono text-[10px] tracking-[0.14em] text-ink-3">
                    YOU
                  </p>
                  <p className="mt-2 text-[15px]">done — rates.netlify.app</p>
                </div>

                <div className="px-5 py-4">
                  <p className="font-mono text-[10px] tracking-[0.14em] text-marigold">
                    SILSILA · GRADED 4/5
                  </p>
                  <p className="mt-2 text-[15px]">
                    <span className="text-ink-3">Good —</span> it&rsquo;s
                    deployed, and you handled the offline case.
                  </p>
                  <p className="mt-1.5 text-[15px]">
                    <span className="text-ink-3">Fix next time —</span> your
                    currency codes are hardcoded. Pull them from the API&rsquo;s
                    own list.
                  </p>
                </div>
              </div>

              <p className="mt-4 text-[13px] text-ink-3">
                Graded, not marked done by you. A checkbox teaches nothing and
                can be lied to.
              </p>
            </div>
          </div>
        </section>

        <div className="dot-rule" aria-hidden />

        {/* A WEEK — stays on cream so the task-type colours keep the surface
            they were validated against. */}
        <section className="border-y-2 border-ink bg-surface py-20">
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

        {/* THE MIX — the chart section, on the validated cream surface. */}
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

        {/* HOW — full-bleed marigold. The loudest field on the page, and the
            section a student most needs to actually read. */}
        <section className="border-y-2 border-ink bg-marigold py-20">
          <div className={shellClass}>
            <p className="font-mono text-[11px] tracking-[0.18em] text-ink/70 uppercase">
              How it works
            </p>
            <h2 className={`mt-5 max-w-[16ch] ${headingClass}`}>
              A plan that runs itself, and checks on you.
            </h2>

            <ol className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {STEPS.map((step, index) => (
                <li key={step.title} className="border-t-2 border-ink pt-5">
                  <span className="font-mono text-[13px] font-medium tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 text-[22px] leading-[1.15] font-extrabold tracking-[-0.02em]">
                    {step.title}
                  </p>
                  <p className="mt-2.5 text-[15px] text-ink/85">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* TIMELINE — full-bleed pine. No chart colours here, so a dark field
            is free. */}
        <section className="bg-pine py-20 text-paper">
          <div className={shellClass}>
            <p className="font-mono text-[11px] tracking-[0.18em] text-paper/55 uppercase">
              The milestone is an internship
            </p>
            <h2 className={`mt-5 max-w-[18ch] ${headingClass}`}>
              Not graduation. That&rsquo;s{" "}
              <span className="text-marigold">too far away</span> to hold
              anyone.
            </h2>
            <p className="mt-6 max-w-[52ch] text-[16px] text-paper/75">
              Most companies here hire interns out of semesters 4 to 6.
              That&rsquo;s close enough to work toward, and it happens while
              you&rsquo;re still a student.
            </p>

            <ol className="mt-14 grid gap-8 lg:grid-cols-3 lg:gap-10">
              {TIMELINE.map((row) => (
                <li
                  key={row.when}
                  className={
                    row.emphasis
                      ? "border-2 border-marigold bg-marigold p-6 text-ink"
                      : "border-t-2 border-paper/25 p-6 pr-0 pl-0"
                  }
                >
                  <p
                    className={`font-mono text-[11px] tracking-[0.14em] ${
                      row.emphasis ? "text-ink/70" : "text-paper/55"
                    }`}
                  >
                    {row.when}
                  </p>
                  <p className="mt-3 text-[26px] leading-[1.1] font-extrabold tracking-[-0.02em]">
                    {row.title}
                  </p>
                  <p
                    className={`mt-2.5 text-[15px] ${
                      row.emphasis ? "text-ink/85" : "text-paper/75"
                    }`}
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
              <div className="border-2 border-ink bg-raised p-6 shadow-[8px_8px_0_0_var(--color-pine)] lg:p-9">
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

                <dl className="mt-9 grid grid-cols-3 gap-6 border-t-2 border-ink pt-7">
                  {PROFILE_STATS.map((stat) => (
                    <div key={stat.label}>
                      <dd className="text-[46px] leading-none font-extrabold tracking-[-0.04em] tabular-nums">
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
        <section className="border-y-2 border-ink bg-ink py-24 text-paper">
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
                <p className="max-w-[22ch] text-[36px] leading-[1.02] font-extrabold tracking-[-0.035em] sm:text-[46px]">
                  When you graduate, you will have{" "}
                  <span className="text-marigold">something to say.</span>
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

              <dl className="mt-10 flex flex-col gap-6 border-t-2 border-ink pt-8">
                {REASSURANCES.map(([term, detail]) => (
                  <div key={term}>
                    <dt className="font-semibold">{term}</dt>
                    <dd className="mt-1 text-[15px] text-ink-2">{detail}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="lg:col-span-7">
              <div className="border-2 border-ink bg-raised p-6 shadow-[8px_8px_0_0_var(--color-marigold)] lg:p-8">
                <WaitlistForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t-2 border-ink bg-marigold">
        <div
          className={`${shellClass} flex flex-wrap justify-between gap-3 py-9 text-[13px]`}
        >
          <span>
            Silsila — a daily companion for students working it out alone.
          </span>
          <a href="mailto:hello@silsila.pk" className="decoration-ink">
            hello@silsila.pk
          </a>
        </div>
      </footer>
    </>
  );
}
