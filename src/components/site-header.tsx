"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { SilsilaLockup } from "@/components/logo";

/**
 * The site header.
 *
 * Three zones — brand, navigation, actions — because a bar with a logo at one
 * end and a button at the other has nothing holding its middle and reads
 * unfinished at 1180px.
 *
 * It starts flush with the page and only grows a hairline, a blur and a shadow
 * once you scroll. That is the detail that separates a designed header from a
 * div with a border: at the top of the page there is nothing to divide, so
 * there should be no line.
 */

const NAV = [
  { href: "#problem", label: "Why it fails" },
  { href: "#how", label: "How it works" },
  { href: "#profile", label: "What you get" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    // Deferred into a frame — a synchronous setState in an effect body
    // triggers a cascading render.
    const frame = requestAnimationFrame(onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-30 transition-[background-color,border-color,box-shadow] duration-200 ${
        scrolled || open
          ? "border-b border-rule bg-paper/80 shadow-[0_1px_2px_rgba(13,17,23,0.04)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[68px] w-full max-w-[1180px] items-center gap-6 px-6 lg:px-10">
        <Link href="/" className="shrink-0 no-underline">
          <SilsilaLockup markClassName="h-[22px] w-[22px]" />
        </Link>

        {/* Centre zone. Pill on hover rather than an underline — underlines
            are for prose, and this bar already has an underlined link in it. */}
        <nav className="hidden flex-1 justify-center gap-1 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-[14.5px] text-ink-2 no-underline transition-colors hover:bg-surface hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          <span className="hidden items-center gap-2 rounded-full bg-accent-soft px-3 py-1.5 md:inline-flex">
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-accent"
            />
            <span className="font-mono text-[10.5px] tracking-[0.12em] text-accent uppercase">
              Early access · 100 places
            </span>
          </span>

          <Link
            href="/join"
            className="rounded-lg bg-ink px-4 py-2.5 text-[14px] font-medium text-paper no-underline transition-colors hover:bg-accent"
          >
            Start free
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border-none bg-transparent lg:hidden"
          >
            <span aria-hidden className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 block h-[1.5px] w-full rounded-full bg-ink transition-transform duration-200 ${
                  open ? "top-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 block h-[1.5px] w-full rounded-full bg-ink transition-transform duration-200 ${
                  open ? "top-1/2 -rotate-45" : "top-full"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu. A real panel rather than nav that simply disappears
          below lg, which is what the old header did. */}
      <div
        id="site-menu"
        hidden={!open}
        className="border-t border-rule bg-paper px-6 pt-2 pb-6 lg:hidden"
      >
        <nav className="flex flex-col">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-rule-soft py-3.5 text-[16px] no-underline"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <p className="mt-4 font-mono text-[10.5px] tracking-[0.12em] text-accent uppercase">
          Early access · 100 places
        </p>
      </div>
    </header>
  );
}
