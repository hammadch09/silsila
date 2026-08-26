import { SilsilaMark } from "@/components/logo";

/**
 * The hero's object: a phone running the daily loop, with the two artefacts
 * the product produces — a grade and a filling chain — floating off it.
 *
 * Everything is CSS. No screenshots to keep in sync, crisp at any DPI, and the
 * copy inside stays greppable. Cards sit at the vertical extremes where the
 * phone has chrome rather than text: an earlier pass floated them over the
 * middle and made the conversation unreadable, which defeats the point of
 * showing a conversation.
 */

const CHAT: Array<{ from: "silsila" | "you"; label?: string; body: string }> = [
  {
    from: "silsila",
    label: "DAY 12 · ARTIFACT",
    body: "Build a page that fetches live currency rates. Deploy it. ~40 min.",
  },
  { from: "you", body: "agar API down ho jaye to kya karun?" },
  {
    from: "silsila",
    body: "Show the last rate you saved, with its time. That is what a real app does.",
  },
  { from: "you", body: "done — rates.netlify.app" },
];

export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[420px] pt-10 pb-16">
      {/* Atmosphere — two soft radial fields and a dot lattice, so the
          composition sits in light rather than on paper. */}
      <div
        aria-hidden
        className="absolute inset-[-14%] rounded-full bg-[radial-gradient(closest-side,rgba(33,88,208,0.16),transparent_70%)]"
      />
      <div
        aria-hidden
        className="absolute right-[-10%] bottom-0 h-[45%] w-[60%] rounded-full bg-[radial-gradient(closest-side,rgba(255,122,0,0.12),transparent_70%)]"
      />
      <div
        aria-hidden
        className="absolute inset-[-6%] opacity-60 [background-image:radial-gradient(rgba(13,17,23,0.10)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(closest-side,black,transparent)]"
      />

      {/* The phone. */}
      <div className="relative mx-auto w-[268px] rotate-[-1.5deg] rounded-[36px] bg-ink p-[9px] shadow-[var(--shadow-phone)]">
        <div className="overflow-hidden rounded-[28px] bg-paper">
          <div className="flex items-center gap-2.5 border-b border-rule bg-raised px-4 py-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink">
              <SilsilaMark className="h-4 w-4 text-paper" mono />
            </span>
            <span>
              <span className="block text-[13px] leading-tight font-semibold">
                Silsila
              </span>
              <span className="block text-[10.5px] leading-tight text-ink-3">
                checks in daily
              </span>
            </span>
          </div>

          <div className="flex flex-col gap-2 px-3 py-3.5">
            {CHAT.map((message, index) => (
              <div
                key={index}
                className={`max-w-[86%] rounded-2xl px-3 py-2 text-[12px] leading-[1.45] shadow-[0_1px_2px_rgba(13,17,23,0.06)] ${
                  message.from === "silsila"
                    ? "self-start rounded-bl-md bg-raised"
                    : "self-end rounded-br-md bg-accent-soft"
                }`}
              >
                {message.label ? (
                  <span className="mb-0.5 block font-mono text-[9px] tracking-[0.12em] text-accent">
                    {message.label}
                  </span>
                ) : null}
                {message.body}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grade card — clears the phone's top edge. */}
      <div className="absolute top-0 right-0 w-[186px] animate-[float_7s_ease-in-out_infinite] rounded-2xl bg-raised p-3.5 shadow-[var(--shadow-lift)] motion-reduce:animate-none">
        <p className="flex items-center gap-1.5 font-mono text-[9.5px] tracking-[0.12em] text-accent">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          GRADED 4/5
        </p>
        <p className="mt-1.5 text-[12px] leading-[1.4] text-ink-2">
          <span className="font-medium text-ink">Good</span> — deployed, offline
          case handled.
        </p>
        <div className="mt-2.5 flex gap-1" aria-hidden>
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="h-1 flex-1 rounded-full bg-accent" />
          ))}
          <span className="h-1 flex-1 rounded-full bg-rule" />
        </div>
      </div>

      {/* Streak card — clears the phone's bottom edge. The chain, unbroken for
          twelve days, is the thing the name is about. */}
      <div className="absolute bottom-0 left-0 w-[196px] animate-[float_8s_ease-in-out_1.2s_infinite] rounded-2xl bg-raised p-3.5 shadow-[var(--shadow-lift)] motion-reduce:animate-none">
        <p className="font-mono text-[9.5px] tracking-[0.12em] text-ink-3">
          DAY 12 OF 84
        </p>
        <div className="mt-2.5 flex items-center gap-[3px]" aria-hidden>
          {Array.from({ length: 16 }, (_, index) => (
            <span
              key={index}
              className={`h-2.5 flex-1 rounded-[2px] ${
                index < 12 ? "bg-accent" : "bg-rule-soft"
              }`}
            />
          ))}
        </div>
        <p className="mt-2 text-[11.5px] text-ink-2">
          Twelve days. Not broken yet.
        </p>
      </div>
    </div>
  );
}
