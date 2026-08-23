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

// Full-bleed shell. Prose inside still gets a max-width — the width is for the
// visuals and the grids, not for 120-character lines of text.
const shellClass = "mx-auto w-full max-w-[1180px] px-6 lg:px-10";

// Section headings sit well below the hero but well above body copy. The gap
// between the three sizes is what makes the page feel composed rather than
// uniformly medium.
const headingClass = "text-[34px] sm:text-[42px] lg:text-[46px]";

export default function Home() {
  const cells = buildHeatmapCells();

  return (
    <>
      <header className="sticky top-0 z-10 border-b border-rule bg-paper/85 backdrop-blur">
        <div className={`${shellClass} flex h-16 items-center justify-between`}>
          <span className="font-mono text-[15px] tracking-[-0.01em]">qadam</span>
          <a
            href="#form"
            className="bg-ink px-4 py-2 font-mono text-[11px] tracking-[0.14em] text-paper uppercase no-underline hover:bg-accent"
          >
            Join waitlist
          </a>
        </div>
      </header>

      <main className="flex-1">
        {/* HERO */}
        <section className={`${shellClass} pt-20 pb-24 lg:pt-28`}>
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-7">
              <p className={labelClass}>
                Early access · computing students · 100 places
              </p>

              {/* The italic second line is the signature. Instrument Serif's
                  italic is the most distinctive thing in the type stack, and
                  the two-register slogan is what a screenshot will show. */}
              <h1 className="mt-8 text-[46px] leading-[0.98] sm:text-[68px] lg:text-[80px]">
                Roz ek kaam.
                <br />
                <em className="italic">Aur koi poochne wala.</em>
              </h1>

              <p className="mt-9 max-w-[42ch] text-[20px] leading-[1.45]">
                A 3-month plan. One 30-minute task a day. Graded, not ticked.
                All on WhatsApp.
              </p>

              <p className="mt-5 max-w-[46ch] text-[16px] text-ink-2">
                You already got a roadmap from ChatGPT. You did three days of
                it, then the semester happened. It&rsquo;s not that you&rsquo;re
                not serious —{" "}
                <span className="text-ink">nobody asked on day four.</span>
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3">
                <a
                  href="#form"
                  className="inline-block bg-ink px-7 py-4 text-[16px] text-paper no-underline hover:bg-accent"
                >
                  Get your first week — free
                </a>
                <span className="text-[14px] text-ink-3">
                  No calls · takes a minute
                </span>
              </div>
            </div>

            {/* The log explains the product faster than any paragraph. No
                outer box — a hairline rule per exchange is enough, and the
                page stops looking like a dashboard. */}
            <div className="lg:col-span-5">
              <p className={labelClass}>A day on Qadam</p>

              <div className="mt-6 flex flex-col">
                <div className="border-t border-rule py-4">
                  <p className="font-mono text-[10px] tracking-[0.14em] text-accent">
                    QADAM · DAY 12
                  </p>
                  <p className="mt-2 text-[15px]">
                    Build a page that fetches live currency rates. Deploy it.
                    ~40 min.
                  </p>
                </div>

                {/* Urdu in, plain English out — product.md §Language. */}
                <div className="border-t border-rule py-4 pl-8">
                  <p className="font-mono text-[10px] tracking-[0.14em] text-ink-3">
                    YOU
                  </p>
                  <p className="mt-2 text-[15px] text-ink-2">
                    agar API down ho jaye to kya karun?
                  </p>
                </div>

                <div className="border-t border-rule py-4">
                  <p className="font-mono text-[10px] tracking-[0.14em] text-accent">
                    QADAM
                  </p>
                  <p className="mt-2 text-[15px]">
                    Show the last rate you saved, with the time you saved it.
                    Then a short line: &ldquo;Could not update just now.&rdquo;
                    That is what a real app does.
                  </p>
                </div>

                <div className="border-t border-rule py-4 pl-8">
                  <p className="font-mono text-[10px] tracking-[0.14em] text-ink-3">
                    YOU
                  </p>
                  <p className="mt-2 text-[15px] text-ink-2">
                    done — rates.netlify.app
                  </p>
                </div>

                <div className="border-y border-rule py-4">
                  <p className="font-mono text-[10px] tracking-[0.14em] text-accent">
                    QADAM · GRADED 4/5
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

        {/* A WEEK */}
        <section className="border-t border-rule bg-surface py-24">
          <div className={shellClass}>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className={labelClass}>What a week looks like</p>
                <h2 className={`mt-6 ${headingClass}`}>
                  Seven days.
                  <br />
                  <em className="italic">Seven small things.</em>
                </h2>
              </div>
              <p className="max-w-[38ch] text-[16px] text-ink-2">
                Nothing here needs a free afternoon. That&rsquo;s the whole
                design — a semester project can&rsquo;t justify skipping 30
                minutes.
              </p>
            </div>

            <div className="mt-14">
              <WeekStrip />
            </div>
          </div>
        </section>

        {/* THE MIX */}
        <section className={`${shellClass} py-24`}>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-4">
              <p className={labelClass}>The mix</p>
              <h2 className={`mt-6 ${headingClass}`}>
                Not tutorials <em className="italic">on repeat.</em>
              </h2>
              <p className="mt-7 text-[16px] text-ink-2">
                If every task were &ldquo;watch a React video&rdquo;, this would
                be a worse Coursera. The rotation is the product.
              </p>
              <p className="mt-4 text-[14px] text-ink-3">
                Human tasks have the worst completion rate and the highest
                long-term value. They stay in.
              </p>
            </div>

            <div className="lg:col-span-8 lg:pt-10">
              <TaskMixBar />
            </div>
          </div>
        </section>

        {/* HOW */}
        <section className="border-t border-rule py-24">
          <div className={shellClass}>
            <p className={labelClass}>How it works</p>
            <h2 className={`mt-6 max-w-[16ch] ${headingClass}`}>
              A plan that runs itself, and <em className="italic">checks</em> on
              you.
            </h2>

            <ol className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {STEPS.map((step, index) => (
                <li key={step.title}>
                  <span className="font-mono text-[11px] tracking-[0.14em] text-ink-3 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 font-display text-[24px] leading-[1.15]">
                    {step.title}
                  </p>
                  <p className="mt-3 text-[15px] text-ink-2">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* TIMELINE */}
        <section className="border-t border-rule bg-surface py-24">
          <div className={shellClass}>
            <p className={labelClass}>The milestone is an internship</p>
            <h2 className={`mt-6 max-w-[20ch] ${headingClass}`}>
              Not graduation. That&rsquo;s{" "}
              <em className="italic">too far away</em> to hold anyone.
            </h2>
            <p className="mt-7 max-w-[54ch] text-[16px] text-ink-2">
              Most companies here hire interns out of semesters 4 to 6.
              That&rsquo;s close enough to work toward, and it happens while
              you&rsquo;re still a student.
            </p>

            <ol className="mt-16 grid gap-10 lg:grid-cols-3 lg:gap-14">
              {TIMELINE.map((row) => (
                <li
                  key={row.when}
                  className={`border-t pt-6 ${
                    row.emphasis ? "border-accent" : "border-rule"
                  }`}
                >
                  <p
                    className={`font-mono text-[11px] tracking-[0.14em] ${
                      row.emphasis ? "text-accent" : "text-ink-3"
                    }`}
                  >
                    {row.when}
                  </p>
                  <p className="mt-4 font-display text-[26px] leading-[1.1]">
                    {row.title}
                  </p>
                  <p className="mt-3 text-[15px] text-ink-2">{row.what}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* PROFILE */}
        <section className={`${shellClass} py-24`}>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-4">
              <p className={labelClass}>What you end up with</p>
              <h2 className={`mt-6 ${headingClass}`}>
                A page instead of a <em className="italic">blank CV.</em>
              </h2>
              <p className="mt-7 text-[16px] text-ink-2">
                Every graded submission lands here. After two 3-month plans it
                is the thing you send an employer.
              </p>
            </div>

            <div className="lg:col-span-8">
              {/* The one raised plate on the page. It earns it — this is
                  meant to look like an artefact you'd send someone. */}
              <div className="bg-raised p-8 shadow-[0_1px_2px_rgba(20,18,15,0.04),0_12px_32px_-12px_rgba(20,18,15,0.10)] lg:p-10">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-mono text-[15px]">qadam.pk/ayesha-r</p>
                  <p className="text-[13px] text-ink-3">
                    Semester 5 · Computer Science · Bahawalpur
                  </p>
                </div>

                <div
                  role="img"
                  aria-label="Six months of daily submissions, sparse at the start and dense by the end."
                  className="mt-8 grid grid-cols-[repeat(26,1fr)] gap-[3px]"
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

                <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-rule-soft pt-8">
                  {PROFILE_STATS.map((stat) => (
                    <div key={stat.label}>
                      <dd className="font-display text-[44px] leading-none tabular-nums">
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

        {/* THE PROMISE — product.md §1b, deliberately unsoftened. The one dark
            band on the page, because this is the part that should stop you. */}
        <section className="bg-ink py-28 text-paper">
          <div className={shellClass}>
            <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
              <div className="lg:col-span-5">
                <p className="font-mono text-[11px] tracking-[0.18em] text-paper/45 uppercase">
                  What we promise
                </p>
                <ul className="mt-8 flex flex-col gap-4 text-[19px] text-paper/50">
                  <li>We don&rsquo;t promise you a job.</li>
                  <li>We don&rsquo;t promise you&rsquo;ll start a company.</li>
                  <li>We don&rsquo;t promise you&rsquo;ll be in the top 1%.</li>
                </ul>
              </div>

              <div className="lg:col-span-7">
                <p className="max-w-[26ch] font-display text-[34px] leading-[1.12] sm:text-[42px]">
                  When you graduate, you will have{" "}
                  <em className="italic">something to say.</em>
                </p>
                <p className="mt-7 max-w-[46ch] text-[17px] text-paper/75">
                  Something in your skill set. A profile that&rsquo;s been
                  worked on. Things you actually built. You will not be starting
                  from zero.
                </p>
                <p className="mt-8 max-w-[48ch] text-[15px] text-paper/45">
                  Every skills course sold to Pakistani students promises a job
                  in three months. You&rsquo;ve heard it before. We&rsquo;d
                  rather promise something we can keep.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FORM */}
        <section id="form" className={`${shellClass} scroll-mt-16 py-24`}>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <h2 className={headingClass}>
                Get your first week&rsquo;s plan —{" "}
                <em className="italic">free.</em>
              </h2>
              <p className="mt-6 max-w-[38ch] text-[16px] text-ink-2">
                Six questions. We send the plan to your WhatsApp within 48
                hours.
              </p>

              <dl className="mt-12 flex flex-col gap-6 border-t border-rule pt-10">
                {REASSURANCES.map(([term, detail]) => (
                  <div key={term}>
                    <dt className="font-medium">{term}</dt>
                    <dd className="mt-1 text-[15px] text-ink-2">{detail}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="lg:col-span-7 lg:pt-4">
              <WaitlistForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-rule">
        <div
          className={`${shellClass} flex flex-wrap justify-between gap-3 py-12 text-[13px] text-ink-3`}
        >
          <span>
            Qadam — a daily companion for students working it out alone.
          </span>
          <a href="mailto:hello@qadam.pk">hello@qadam.pk</a>
        </div>
      </footer>
    </>
  );
}
