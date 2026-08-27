"use client";

import { Reveal } from "@/components/reveal";

/**
 * A day on Silsila, as the conversation it actually is.
 *
 * Everything lives inside the thread — including the grade, which is the last
 * message rather than a card floating outside the phone. An earlier version
 * hung the grade and a streak counter off the edges; that pulled the eye away
 * from the conversation and inverted the composition, when the whole point is
 * that the product is a conversation.
 */

type Message =
  | { side: "in"; label?: string; body: string }
  | { side: "out"; body: string };

const THREAD: Message[] = [
  {
    side: "in",
    label: "DAY 12 · ARTIFACT · 40 MIN",
    body: "Build a page that fetches live currency rates and deploy it.",
  },
  { side: "out", body: "what do I do if the API goes down?" },
  {
    side: "in",
    body: "Show the last rate you saved, with its timestamp. That is what a real app does.",
  },
  { side: "out", body: "done — rates.netlify.app" },
];

export function DayThread() {
  return (
    <div className="mx-auto w-full max-w-[440px] lg:max-w-none">
      <div className="overflow-hidden rounded-[28px] border-[6px] border-ink bg-surface shadow-[var(--shadow-lift)]">
        <div className="flex items-center gap-2.5 border-b border-rule bg-raised px-4 py-3.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent font-mono text-[14px] text-white">
            s
          </span>
          <span>
            <span className="block text-[14px] leading-tight font-semibold">
              Silsila
            </span>
            <span className="block text-[11.5px] leading-tight text-ink-3">
              checks in daily
            </span>
          </span>
        </div>

        <div className="flex flex-col gap-2.5 px-4 py-5">
          {/* 850ms apart, so it reads at conversation speed rather than
              appearing all at once. */}
          {THREAD.map((message, index) => (
            <Reveal
              key={index}
              delay={500 + index * 850}
              className={`max-w-[86%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-[1.5] ${
                message.side === "in"
                  ? "self-start rounded-bl-md bg-raised shadow-[0_1px_2px_rgba(11,14,20,0.06)]"
                  : "self-end rounded-br-md bg-accent-soft"
              }`}
            >
              {message.side === "in" && message.label ? (
                <span className="mb-1 block font-mono text-[9.5px] tracking-[0.12em] text-accent">
                  {message.label}
                </span>
              ) : null}
              {message.body}
            </Reveal>
          ))}

          {/* The grade is a message, not an ornament. */}
          <Reveal
            delay={500 + THREAD.length * 850}
            className="max-w-[86%] self-start rounded-2xl rounded-bl-md bg-raised px-3.5 py-3 shadow-[0_1px_2px_rgba(11,14,20,0.06)]"
          >
            <span className="flex items-center gap-1.5 font-mono text-[9.5px] tracking-[0.12em] text-accent">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
              GRADED 4/5
            </span>
            <p className="mt-1.5 text-[13.5px] leading-[1.5]">
              <span className="font-semibold">Good</span> — deployed, and you
              handled the offline case.
            </p>
            <p className="mt-1 text-[13.5px] leading-[1.5] text-ink-2">
              Next time: show the timestamp in local time.
            </p>
            <span aria-hidden className="mt-3 flex gap-1">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="h-1 flex-1 rounded-full bg-accent" />
              ))}
              <span className="h-1 flex-1 rounded-full bg-rule" />
            </span>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
