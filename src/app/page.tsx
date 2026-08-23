import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { WaitlistForm } from "@/components/waitlist-form";
import { buildHeatmapCells } from "@/lib/profile-heatmap";

const PROBLEMS = [
  "Your syllabus is ten years behind the industry.",
  "There's no one around you who's done what you want to do.",
  "Plans are free. Following through alone is the part nobody helps with.",
];

const STEPS = [
  {
    title: "One small task a day.",
    body: "30–45 minutes. Skill work, a talk worth watching, something small to build, a message to send.",
  },
  {
    title: "You show your work.",
    body: "A link, a screenshot, three lines. Someone actually looks at it.",
  },
  {
    title: "It piles up.",
    body: "Every task adds to a profile you can send to an employer. In two years it's unrecognisable.",
  },
];

const SAMPLE_TASKS = [
  "Complete section 4 of the JavaScript course. Push your solutions to GitHub.",
  "Watch this 18-minute talk on how Careem was built. Write 3 lines on what surprised you.",
  "Build a page that shows live currency rates. Deploy it.",
  "Rewrite your LinkedIn headline. Three examples inside.",
  "Message one senior working in the field you want. Template provided.",
];

const PROFILE_STATS = [
  { value: "148", label: "tasks done" },
  { value: "9", label: "things built" },
  { value: "31", label: "reviews" },
];

const REASSURANCES = [
  "No streaks to lose. Miss a week for exams — come back, we'll pick a lighter task.",
  "Free while we're in early access.",
  "Works on your phone. Everything runs through WhatsApp.",
];

const eyebrowClass =
  "text-[11.5px] font-extrabold uppercase tracking-[1.6px] text-muted-darkest";

export default function Home() {
  const cells = buildHeatmapCells();

  return (
    <div className="relative overflow-hidden bg-ink text-body">
      <RevealOnScroll />

      {/* Glow behind the hero. Decorative, so it never eats a tap. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[620px] w-[620px] -translate-x-1/2 bg-[radial-gradient(circle,rgba(78,240,140,0.16)_0%,rgba(78,240,140,0)_68%)]"
      />

      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/[0.06] bg-ink/70 px-4 py-2.5 backdrop-blur-[14px]">
        <span className="text-[16.5px] font-extrabold tracking-[-0.4px] text-white">
          Qadam
        </span>
        <a
          href="#form"
          className="rounded-full bg-accent px-4 py-2.5 text-[13px] font-extrabold text-ink no-underline hover:text-ink"
        >
          Join waitlist
        </a>
      </header>

      <main>
        {/* HERO */}
        <section className="relative px-5 pt-11 pb-[34px]">
          <div className="mx-auto max-w-[600px]">
            <div
              data-reveal
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/[0.28] bg-accent/[0.07] py-1.5 pr-3 pl-2 text-xs font-semibold text-accent-soft"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_#4ef08c]" />
              Early access · open to 100 students
            </div>

            <h1
              data-reveal
              className="mb-4 text-[clamp(30px,8.4vw,44px)] leading-[1.08] font-extrabold tracking-[-1.4px] text-white"
            >
              Har din ek chhota kaam —{" "}
              <span className="bg-[linear-gradient(96deg,#4ef08c,#9ff0c0)] bg-clip-text text-transparent">
                checked by a real person.
              </span>
            </h1>

            <p data-reveal className="mb-[26px] max-w-[38ch] text-[17px] text-muted">
              You got the roadmap. You did three days. Nobody checked in on day
              four. That&rsquo;s the part we fix. 30–45 minutes a day, all on
              WhatsApp.
            </p>

            <div data-reveal className="flex flex-wrap items-center gap-2.5">
              <a
                href="#form"
                className="inline-block rounded-full bg-accent px-[26px] py-3.5 text-[15.5px] font-extrabold text-ink no-underline shadow-[0_10px_28px_rgba(78,240,140,0.22)] hover:text-ink"
              >
                Get your first week
              </a>
              <span className="text-[13px] text-muted-darkest">
                Free · no calls
              </span>
            </div>

            {/* Phone mock — the daily loop in three messages. */}
            <div
              data-reveal
              className="mx-auto mt-9 max-w-[296px] rounded-[32px] border border-white/[0.09] bg-[linear-gradient(180deg,#0d1f18,#081611)] px-3 pt-3 pb-[18px] shadow-[0_30px_70px_rgba(0,0,0,0.55)]"
            >
              <div className="mx-auto mb-3.5 h-[5px] w-16 rounded-full bg-white/15" />
              <div className="flex flex-col gap-[9px]">
                <div className="max-w-[92%] self-start rounded-[16px_16px_16px_5px] border border-white/[0.07] bg-white/[0.07] px-3 py-2.5 text-[13px] leading-normal">
                  <span className="mb-[3px] block text-[11px] font-extrabold tracking-[0.3px] text-accent">
                    QADAM · DAY 12
                  </span>
                  Build a page that shows live currency rates. Deploy it. ~40
                  min.
                </div>
                <div className="max-w-[92%] self-end rounded-[16px_16px_5px_16px] border border-accent/[0.22] bg-accent/[0.14] px-3 py-2.5 text-[13px] text-[#d5f7e4]">
                  done — rates.netlify.app
                </div>
                <div className="max-w-[92%] self-start rounded-[16px_16px_16px_5px] border border-white/[0.07] bg-white/[0.07] px-3 py-2.5 text-[13px] leading-normal">
                  Nice. Currency codes are hardcoded — swap them for the API
                  list tomorrow. Added to your profile.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="px-5 py-7">
          <div className="mx-auto max-w-[600px]">
            <h2 data-reveal className={`mb-4 ${eyebrowClass}`}>
              Why it stalls
            </h2>
            <div className="flex flex-col gap-2.5">
              {PROBLEMS.map((problem) => (
                <p
                  key={problem}
                  data-reveal
                  className="rounded-[18px] border border-white/[0.075] bg-white/[0.045] px-[19px] py-[17px] text-base"
                >
                  {problem}
                </p>
              ))}
            </div>
            <p
              data-reveal
              className="mt-[18px] text-[16.5px] font-semibold text-accent-soft"
            >
              It&rsquo;s not that you&rsquo;re not serious. Nobody checked in on
              day four.
            </p>
          </div>
        </section>

        {/* HOW */}
        <section className="px-5 py-[26px]">
          <div className="mx-auto max-w-[600px]">
            <h2 data-reveal className={`mb-[18px] ${eyebrowClass}`}>
              How it works
            </h2>

            <ol className="flex flex-col gap-[18px]">
              {STEPS.map((step, index) => (
                <li key={step.title} data-reveal className="flex gap-3.5">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-xl border border-accent/30 bg-accent/[0.14] text-sm font-extrabold text-accent">
                    {index + 1}
                  </span>
                  <p className="text-muted">
                    <strong className="text-white">{step.title}</strong>{" "}
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>

            {/* Sample public profile — the reason they don't quit. */}
            <div
              data-reveal
              className="mt-6 rounded-[22px] border border-white/[0.09] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-[18px] backdrop-blur-[8px]"
            >
              <div className="mb-3.5 flex items-center justify-between gap-2.5">
                <div>
                  <p className="mb-0.5 text-[14.5px] font-extrabold text-white">
                    qadam.pk/ayesha-r
                  </p>
                  <p className="text-[12.5px] text-muted-dimmer">
                    Semester 5 · Computer Science · Bahawalpur
                  </p>
                </div>
                <span className="rounded-full border border-accent/30 px-2.5 py-1 text-[11px] font-bold whitespace-nowrap text-accent">
                  live
                </span>
              </div>

              <div
                aria-hidden
                className="grid grid-cols-[repeat(26,1fr)] gap-[3px]"
              >
                {cells.map((background, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-[2px]"
                    style={{ background }}
                  />
                ))}
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {PROFILE_STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[14px] bg-white/5 px-2.5 py-3 text-center"
                  >
                    <p className="text-[21px] font-extrabold tracking-[-0.6px] text-white">
                      {stat.value}
                    </p>
                    <p className="text-[11.5px] text-muted-dimmer">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-3.5 text-[12.5px] text-muted-dimmer">
                This is what you send an employer instead of a blank one-page
                CV.
              </p>
            </div>
          </div>
        </section>

        {/* TASKS */}
        <section className="px-5 py-[26px]">
          <div className="mx-auto max-w-[600px]">
            <h2 data-reveal className={`mb-3.5 ${eyebrowClass}`}>
              Real tasks
            </h2>
            <ul className="flex flex-col gap-[9px]">
              {SAMPLE_TASKS.map((task) => (
                <li
                  key={task}
                  data-reveal
                  className="flex items-start gap-[11px] rounded-2xl border border-white/[0.07] bg-white/[0.04] px-4 py-3.5 text-[15px] text-body-soft"
                >
                  <span
                    aria-hidden
                    className="text-[13px] leading-[1.6] font-extrabold text-accent"
                  >
                    ↳
                  </span>
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* REASSURANCE */}
        <section className="px-5 py-[26px]">
          <div
            data-reveal
            className="mx-auto flex max-w-[600px] flex-col gap-[13px] rounded-[22px] border border-accent/[0.22] bg-accent/[0.06] p-[22px] text-[15.5px] text-body-warm"
          >
            {REASSURANCES.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </section>

        {/* FORM */}
        <section id="form" className="scroll-mt-16 px-5 pt-[26px] pb-11">
          <div className="mx-auto max-w-[600px] rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] px-5 py-6">
            <h2 className="mb-1.5 text-[23px] font-extrabold tracking-[-0.7px] text-white">
              Get your first week&rsquo;s plan — free.
            </h2>
            <p className="mb-[22px] text-[15px] text-muted-dim">
              We&rsquo;ll send it on WhatsApp within 48 hours.
            </p>

            <WaitlistForm />
          </div>
        </section>
      </main>

      <footer className="border-t border-white/[0.07]">
        <div className="mx-auto flex max-w-[600px] flex-wrap justify-between gap-2 px-5 pt-[22px] pb-[34px] text-[12.5px] text-muted-dimmer">
          <span>
            <strong className="text-body">Qadam</strong> — a daily companion for
            students figuring it out on their own.
          </span>
          <a href="mailto:hello@qadam.pk">hello@qadam.pk</a>
        </div>
      </footer>
    </div>
  );
}
