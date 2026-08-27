"use client";

import { useEffect, useRef, useState } from "react";

/**
 * One solid block that comes apart into 84 tiles as you scroll past it.
 *
 * Scroll-linked rather than time-linked on purpose: the reader is the one
 * doing the breaking, at their own pace, which makes the point better than an
 * animation that runs whether they are watching or not.
 *
 * Offsets are deterministic from the index — no randomness — so the shape is
 * identical on server and client and every reload looks the same.
 */

const TILES = 84;

const SEEDS = Array.from({ length: TILES }, (_, i) => ({
  x: (((i * 37) % 17) - 8) / 8,
  y: (((i * 53) % 13) - 6) / 6,
  r: (((i * 29) % 11) - 5) / 5,
}));

export function GoalCrack() {
  const ref = useRef<HTMLDivElement>(null);
  const [spread, setSpread] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = requestAnimationFrame(() => setSpread(1));
      return () => cancelAnimationFrame(frame);
    }

    let queued = 0;

    const measure = () => {
      queued = 0;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = 1 - (rect.top - vh * 0.18) / (vh * 0.62);
      const clamped = Math.max(0, Math.min(1, raw));
      // Smoothstep, so it eases in and out rather than tracking scroll linearly.
      setSpread(clamped * clamped * (3 - 2 * clamped));
    };

    const onScroll = () => {
      if (!queued) queued = requestAnimationFrame(measure);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    queued = requestAnimationFrame(measure);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (queued) cancelAnimationFrame(queued);
    };
  }, []);

  const broken = spread > 0.55;

  return (
    <div
      ref={ref}
      className="rounded-2xl bg-raised p-5 shadow-[var(--shadow-card)] sm:p-7"
    >
      <div className="flex items-center justify-between gap-4">
        <span
          className={`font-mono text-[10.5px] tracking-[0.16em] uppercase transition-colors duration-300 ${
            broken ? "text-accent" : "text-ink-3"
          }`}
        >
          {broken ? "84 days · one at a time" : "One goal · unliftable"}
        </span>
        <span className="font-mono text-[10.5px] tracking-[0.16em] text-ink-3 uppercase">
          Scroll
        </span>
      </div>

      <div
        role="img"
        aria-label="A single solid block breaking apart into eighty-four separate days."
        className="mt-5 grid grid-cols-[repeat(14,minmax(0,1fr))]"
        style={{ gap: `${(spread * 6).toFixed(2)}px` }}
      >
        {SEEDS.map((seed, index) => (
          <span
            key={index}
            className="aspect-square bg-accent"
            style={{
              transform: `translate(${(seed.x * spread * 7).toFixed(2)}px, ${(seed.y * spread * 7).toFixed(2)}px) rotate(${(seed.r * spread * 5).toFixed(2)}deg)`,
              borderRadius: `${(spread * 4).toFixed(2)}px`,
              opacity: 0.5 + 0.5 * spread,
            }}
          />
        ))}
      </div>

      <dl className="mt-6 flex gap-10 border-t border-rule pt-5">
        <div>
          <dd className="text-[26px] leading-none font-semibold tabular-nums">
            84
          </dd>
          <dt className="mt-1.5 font-mono text-[10px] tracking-[0.14em] text-ink-3 uppercase">
            Days
          </dt>
        </div>
        <div>
          <dd className="text-[26px] leading-none font-semibold tabular-nums">
            1
          </dd>
          <dt className="mt-1.5 font-mono text-[10px] tracking-[0.14em] text-ink-3 uppercase">
            At a time
          </dt>
        </div>
      </dl>
    </div>
  );
}
