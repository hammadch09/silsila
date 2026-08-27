import Link from "next/link";

import { SilsilaLockup } from "@/components/logo";

/**
 * The site header, matched to the artifact.
 *
 * Solid from the start rather than transparent-until-scrolled. The page opens
 * on a headline, not a hero image, so there is nothing for a transparent bar
 * to sit over — the fade-in only read as a flicker.
 *
 * Three children in a space-between row, so the nav lands in the middle
 * without being absolutely centred. Below the lg breakpoint it wraps to its
 * own full-width row and scrolls sideways, which the artifact does instead of
 * a hamburger. For five short links that is better: everything stays visible
 * and one tap away rather than two.
 *
 * No client JS at all now — it is a static bar, so it should not ship a
 * bundle.
 */

const NAV = [
  { href: "#loop", label: "The loop" },
  { href: "#layers", label: "Why it repeats" },
  { href: "#day", label: "A day" },
  { href: "#how", label: "How it works" },
  { href: "#profile", label: "What you get" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/[0.86] backdrop-blur-[12px]">
      <div className="mx-auto flex w-full max-w-[1240px] flex-wrap items-center justify-between gap-x-6 gap-y-3.5 px-5 py-[15px] sm:px-8 lg:px-10">
        <Link href="/" className="flex shrink-0 items-center no-underline">
          <SilsilaLockup markClassName="h-[22px] w-[22px]" />
        </Link>

        <nav className="order-3 -mx-1 flex w-full gap-6 overflow-x-auto px-1 text-[14px] text-ink-2 lg:order-none lg:mx-0 lg:w-auto lg:gap-7 lg:overflow-visible lg:px-0 lg:text-[15px]">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 no-underline transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3.5">
          <span className="hidden rounded-full bg-accent-soft px-3 py-[7px] font-mono text-[11px] tracking-[0.1em] text-accent uppercase md:inline-block">
            100 seats · early access
          </span>

          <Link
            href="/join"
            className="rounded-[10px] bg-ink px-[18px] py-[11px] text-[15px] font-medium text-paper no-underline transition-colors hover:bg-accent"
          >
            Start free
          </Link>
        </div>
      </div>
    </header>
  );
}
