import { WaitlistForm } from "@/components/waitlist-form";
import { buildHeatmapCells } from "@/lib/profile-heatmap";

const STEPS = [
  {
    title: "It builds the plan.",
    body: "You say what you're after — a job, or something of your own. It asks your semester, your level, and the hours you actually have. Then it writes a 3-month plan, down to individual days.",
  },
  {
    title: "It sends one task a day.",
    body: "30–45 minutes. Small enough that a semester project can't justify skipping it.",
  },
  {
    title: "It grades what you send back.",
    body: "Not a tick. A grade against the task's own criteria, one thing you did well, one thing to fix next time. For most students this is the first time anyone has looked at their work and told them where it stands.",
  },
  {
    title: "You can ask it anything, any time.",
    body: "Stuck at 11pm with nobody to ask is the moment people quit. Ask in Urdu, Roman Urdu or English — it knows your plan, your level and what you sent last week, so the answer fits you rather than the internet.",
  },
  {
    title: "It piles up.",
    body: "Every graded submission adds to a profile you can send an employer. Finish one 3-month plan, start the next.",
  },
];

// The five task types from product.md §3. Showing the mix is the point — the
// alternative reads like a worse Coursera.
const SAMPLE_TASKS = [
  {
    type: "SKILL",
    body: "Complete section 4 of the JavaScript course. Push your solutions to GitHub.",
  },
  {
    type: "HORIZON",
    body: "Watch this 18-minute talk on how Careem was built. Write 3 lines on what surprised you.",
  },
  {
    type: "ARTIFACT",
    body: "Build a page that shows live currency rates. Deploy it.",
  },
  {
    type: "SIGNAL",
    body: "Rewrite your LinkedIn headline. Three examples inside.",
  },
  {
    type: "HUMAN",
    body: "Message one senior working in the field you want. Template provided.",
  },
];

// §2b — the internship window is the near-term outcome, not graduation.
const TIMELINE = [
  {
    when: "SEM 1–3",
    what: "Foundations. Build the habit, widen what you know exists.",
  },
  {
    when: "SEM 4–6",
    what: "Internship push. Portfolio pieces that survive a real screen, a CV and LinkedIn at a real standard, how to find openings, how to apply, what to expect on day one.",
    emphasis: true,
  },
  {
    when: "SEM 7–8",
    what: "Full-time readiness, or the founder track.",
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
  "font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3";

const shellClass = "mx-auto w-full max-w-[640px] px-6";

export default function Home() {
  const cells = buildHeatmapCells();

  return (
    <>
      <header className="border-b border-rule">
        <div className={`${shellClass} flex h-14 items-center justify-between`}>
          <span className="font-mono text-[15px] font-medium tracking-[-0.01em]">
            qadam
          </span>
          <a
            href="#form"
            className="font-mono text-[12px] uppercase tracking-[0.12em] text-ink-2 no-underline hover:text-ink"
          >
            Join waitlist
          </a>
        </div>
      </header>

      <main className="flex-1">
        {/* HERO — the slogan first, then in one plain line what it actually
            is, then the emotional beat. A student should be able to repeat the
            first line to a friend without opening the page again. */}
        <section className={`${shellClass} pt-20 pb-14`}>
          <p className={labelClass}>
            Early access · computing students · 100 places
          </p>

          <h1 className="mt-6 text-[34px] leading-[1.12] font-semibold tracking-[-0.025em] sm:text-[44px]">
            Roz ek kaam.
            <br />
            Aur koi poochne wala.
          </h1>

          <p className="mt-6 max-w-[44ch] text-[18px]">
            A 3-month plan. One 30-minute task a day. Graded, not ticked. All on
            WhatsApp.
          </p>

          <p className="mt-5 max-w-[46ch] text-[16px] text-ink-2">
            You already got a roadmap from ChatGPT. You did three days of it,
            then the semester happened. It&rsquo;s not that you&rsquo;re not
            serious — <span className="text-ink">nobody asked on day four.</span>
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <a
              href="#form"
              className="inline-block bg-ink px-6 py-3.5 text-[16px] font-medium text-paper no-underline hover:bg-ink-2"
            >
              Get your first week — free
            </a>
            <span className="text-[14px] text-ink-3">
              No calls · takes a minute
            </span>
          </div>
        </section>

        {/* THE LOG — the product in five messages, no phone chrome. */}
        <section className={`${shellClass} border-t border-rule py-14`}>
          <p className={labelClass}>A day on Qadam</p>

          <div className="mt-4 border border-rule">
            <div className="border-b border-rule px-5 py-4">
              <p className="font-mono text-[11px] tracking-[0.1em] text-accent">
                QADAM · DAY 12
              </p>
              <p className="mt-2 text-[15px]">
                Build a page that fetches and displays live currency rates.
                Deploy it. ~40 min.
              </p>
            </div>

            {/* Urdu in, simple English out — product.md §Language. */}
            <div className="border-b border-rule bg-surface px-5 py-4">
              <p className="font-mono text-[11px] tracking-[0.1em] text-ink-3">
                YOU
              </p>
              <p className="mt-2 text-[15px]">
                agar API down ho jaye to kya karun?
              </p>
            </div>

            <div className="border-b border-rule px-5 py-4">
              <p className="font-mono text-[11px] tracking-[0.1em] text-accent">
                QADAM
              </p>
              <p className="mt-2 text-[15px]">
                Show the last rate you saved, with the time you saved it. Then
                show a short line: &ldquo;Could not update just now.&rdquo;
                That is what a real app does.
              </p>
            </div>

            <div className="border-b border-rule bg-surface px-5 py-4">
              <p className="font-mono text-[11px] tracking-[0.1em] text-ink-3">
                YOU
              </p>
              <p className="mt-2 text-[15px]">done — rates.netlify.app</p>
            </div>

            <div className="px-5 py-4">
              <p className="font-mono text-[11px] tracking-[0.1em] text-accent">
                QADAM · GRADED 4/5
              </p>
              <p className="mt-2 text-[15px]">
                <span className="text-ink-3">Good —</span> it&rsquo;s deployed,
                and you handled the offline case.
              </p>
              <p className="mt-1.5 text-[15px]">
                <span className="text-ink-3">Fix next time —</span> your
                currency codes are hardcoded. Pull them from the API&rsquo;s own
                list. Added to your profile.
              </p>
            </div>
          </div>

          <p className="mt-3 max-w-[52ch] text-[13px] text-ink-3">
            Graded, not marked done by you. A checkbox teaches nothing and can
            be lied to.
          </p>
        </section>

        {/* THE PROMISE — product.md §1b, deliberately unsoftened. */}
        <section className={`${shellClass} border-t border-rule py-14`}>
          <p className={labelClass}>What we promise</p>

          <ul className="mt-5 flex flex-col gap-2 text-[17px] text-ink-3">
            <li>We don&rsquo;t promise you a job.</li>
            <li>We don&rsquo;t promise you&rsquo;ll start a company.</li>
            <li>We don&rsquo;t promise you&rsquo;ll be in the top 1%.</li>
          </ul>

          <div className="mt-7 border-l-2 border-ink pl-5">
            <p className="max-w-[48ch] text-[17px]">
              What we promise is this. When you graduate, you will have
              something to say. Something in your skill set. A profile
              that&rsquo;s been worked on. Things you actually built. You will
              not be starting from zero.
            </p>
          </div>

          <p className="mt-5 max-w-[52ch] text-[13px] text-ink-3">
            Every skills course sold to Pakistani students promises a job in
            three months. You&rsquo;ve heard it before. We&rsquo;d rather
            promise something we can keep.
          </p>
        </section>

        {/* HOW */}
        <section className={`${shellClass} border-t border-rule py-14`}>
          <p className={labelClass}>How it works</p>

          <ol className="mt-6 flex flex-col gap-7">
            {STEPS.map((step, index) => (
              <li key={step.title} className="flex gap-5">
                <span className="pt-1 font-mono text-[12px] text-ink-3 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="max-w-[52ch]">
                  <p className="font-medium">{step.title}</p>
                  <p className="mt-1 text-[15px] text-ink-2">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* TIMELINE */}
        <section className={`${shellClass} border-t border-rule py-14`}>
          <p className={labelClass}>The milestone is an internship</p>

          <p className="mt-5 max-w-[52ch] text-[17px]">
            Not graduation. Most companies here hire interns out of semesters 4
            to 6 — that&rsquo;s close enough to work toward, and it happens
            while you&rsquo;re still a student.
          </p>

          <dl className="mt-7">
            {TIMELINE.map((row, index) => (
              <div
                key={row.when}
                className={`flex flex-col gap-1 py-4 sm:flex-row sm:gap-6 ${
                  index === 0 ? "" : "border-t border-rule-soft"
                }`}
              >
                <dt
                  className={`font-mono text-[11px] tracking-[0.1em] sm:w-[72px] sm:shrink-0 sm:pt-1 ${
                    row.emphasis ? "text-accent" : "text-ink-3"
                  }`}
                >
                  {row.when}
                </dt>
                <dd className="max-w-[46ch] text-[15px]">{row.what}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* TASKS */}
        <section className={`${shellClass} border-t border-rule py-14`}>
          <p className={labelClass}>Five kinds of task, rotated</p>

          <ul className="mt-5">
            {SAMPLE_TASKS.map((task, index) => (
              <li
                key={task.type}
                className={`flex flex-col gap-1 py-4 sm:flex-row sm:gap-6 ${
                  index === 0 ? "" : "border-t border-rule-soft"
                }`}
              >
                <span className="font-mono text-[11px] tracking-[0.1em] text-ink-3 sm:w-[72px] sm:shrink-0 sm:pt-1">
                  {task.type}
                </span>
                <span className="text-[15px]">{task.body}</span>
              </li>
            ))}
          </ul>

          <p className="mt-5 max-w-[52ch] text-[13px] text-ink-3">
            The last one has the worst completion rate and the highest long-term
            value. It stays in.
          </p>
        </section>

        {/* PROFILE */}
        <section className={`${shellClass} border-t border-rule py-14`}>
          <p className={labelClass}>What you end up with</p>

          <div className="mt-5 border border-rule p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-mono text-[14px]">qadam.pk/ayesha-r</p>
              <p className="text-[13px] text-ink-3">
                Semester 5 · Computer Science · Bahawalpur
              </p>
            </div>

            <div
              aria-hidden
              className="mt-5 grid grid-cols-[repeat(26,1fr)] gap-[3px]"
            >
              {cells.map((background, index) => (
                <div
                  key={index}
                  className="aspect-square"
                  style={{ background }}
                />
              ))}
            </div>

            <dl className="mt-6 flex gap-10 border-t border-rule-soft pt-5">
              {PROFILE_STATS.map((stat) => (
                <div key={stat.label}>
                  <dd className="font-mono text-[22px] tracking-[-0.02em] tabular-nums">
                    {stat.value}
                  </dd>
                  <dt className="mt-0.5 text-[13px] text-ink-3">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>

          <p className="mt-3 max-w-[52ch] text-[13px] text-ink-3">
            Two 3-month plans in. This is what you send an employer instead of a
            blank one-page CV.
          </p>
        </section>

        {/* REASSURANCE */}
        <section className={`${shellClass} border-t border-rule py-14`}>
          <dl className="flex flex-col gap-5">
            {REASSURANCES.map(([term, detail]) => (
              <div key={term} className="sm:flex sm:gap-6">
                <dt className="font-medium sm:w-[15rem] sm:shrink-0">{term}</dt>
                <dd className="text-[15px] text-ink-2">{detail}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* FORM */}
        <section
          id="form"
          className={`${shellClass} scroll-mt-14 border-t border-rule py-14`}
        >
          <h2 className="text-[26px] font-semibold tracking-[-0.02em]">
            Get your first week&rsquo;s plan — free.
          </h2>
          <p className="mt-2 max-w-[46ch] text-[15px] text-ink-2">
            Six questions. We send the plan to your WhatsApp within 48 hours.
          </p>

          <div className="mt-8">
            <WaitlistForm />
          </div>
        </section>
      </main>

      <footer className="border-t border-rule">
        <div
          className={`${shellClass} flex flex-wrap justify-between gap-3 py-8 text-[13px] text-ink-3`}
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
