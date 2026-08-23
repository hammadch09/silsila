import { WaitlistForm } from "@/components/waitlist-form";
import { buildHeatmapCells } from "@/lib/profile-heatmap";

const PROBLEMS = [
  "Your syllabus is ten years behind the industry.",
  "There's no one around you who's done what you want to do.",
  "Plans are free. Following through alone is the part nobody helps with.",
];

const STEPS = [
  {
    title: "It builds the plan.",
    body: "Four questions at signup, then a week-by-week roadmap for your field. Not a generic one — yours, for your semester and the hours you actually have.",
  },
  {
    title: "It sends one task a day.",
    body: "30–45 minutes. Small enough that a semester project can't justify skipping it.",
  },
  {
    title: "It asks what you did.",
    body: "You send a link, a screenshot, three lines. Qadam reads it, tells you what to fix, and remembers what you said you'd do last Tuesday.",
  },
  {
    title: "It piles up.",
    body: "Every submission adds to a profile you can send an employer. In two years it's unrecognisable.",
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

const PROFILE_STATS = [
  { value: "148", label: "tasks done" },
  { value: "9", label: "things built" },
  { value: "31", label: "reviewed" },
];

const REASSURANCES = [
  ["No streaks to lose.", "Miss a week for exams. Come back and it picks a lighter task."],
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
        {/* HERO */}
        <section className={`${shellClass} pt-20 pb-16`}>
          <p className={labelClass}>Early access · 100 students</p>

          <h1 className="mt-6 text-[34px] leading-[1.15] font-semibold tracking-[-0.025em] sm:text-[42px]">
            You&rsquo;ve asked ChatGPT what to do.
          </h1>

          <p className="mt-5 max-w-[46ch] text-[17px] text-ink-2">
            You got a roadmap. You did three days of it. Then the semester
            happened. It&rsquo;s not that you&rsquo;re not serious —{" "}
            <span className="text-ink">nobody checked in on day four.</span>
          </p>

          <div className="mt-8 border-l-2 border-ink pl-5">
            <p className="max-w-[46ch] text-[17px]">
              Qadam does. It builds your plan, sends you one small task a day,
              and asks what you did with it. 30–45 minutes. All on WhatsApp.
            </p>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
            <a
              href="#form"
              className="inline-block bg-ink px-5 py-3 text-[15px] font-medium text-paper no-underline hover:bg-ink-2"
            >
              Get your first week
            </a>
            <span className="text-[14px] text-ink-3">
              Free · no calls · takes a minute
            </span>
          </div>
        </section>

        {/* THE LOG — the product in three messages, no phone chrome. */}
        <section className={`${shellClass} pb-16`}>
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

            <div className="border-b border-rule bg-surface px-5 py-4">
              <p className="font-mono text-[11px] tracking-[0.1em] text-ink-3">
                YOU
              </p>
              <p className="mt-2 text-[15px]">done — rates.netlify.app</p>
            </div>

            <div className="px-5 py-4">
              <p className="font-mono text-[11px] tracking-[0.1em] text-accent">
                QADAM
              </p>
              <p className="mt-2 text-[15px]">
                Works. Your currency codes are hardcoded — swap them for the
                API&rsquo;s list tomorrow. Added to your profile.
              </p>
            </div>
          </div>

          <p className="mt-3 text-[13px] text-ink-3">
            Reviewed by Qadam, not marked done by you. A checkbox teaches
            nothing and can be lied to.
          </p>
        </section>

        {/* PROBLEM */}
        <section className={`${shellClass} border-t border-rule py-14`}>
          <p className={labelClass}>Why it stalls</p>

          <ul className="mt-5">
            {PROBLEMS.map((problem, index) => (
              <li
                key={problem}
                className={`py-4 text-[17px] ${
                  index === 0 ? "" : "border-t border-rule-soft"
                }`}
              >
                {problem}
              </li>
            ))}
          </ul>
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
            Six months in. This is what you send an employer instead of a blank
            one-page CV.
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
          <span>Qadam — a daily companion for students working it out alone.</span>
          <a href="mailto:hello@qadam.pk">hello@qadam.pk</a>
        </div>
      </footer>
    </>
  );
}
