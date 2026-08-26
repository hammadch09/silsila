/**
 * The Silsila mark.
 *
 * Three equal strokes on a connecting bar. It is two things at once:
 *
 *  1. The teeth of س — the first letter of سلسلہ, and a letterform that is
 *     already a repeating series. Local without being costume.
 *  2. Three days in a row, joined at the base. The strokes are deliberately
 *     the SAME height: rising bars would promise growth, and §1b says we don't
 *     promise that. Equal strokes say "you showed up again", which is the
 *     actual claim.
 *
 * Three is the fewest that reads as a pattern rather than a pair, and it
 * survives 16px, which four did not.
 *
 * The last stroke carries the accent — today, the one still to be done.
 */

type MarkProps = {
  className?: string;
  /** Single-colour rendering for stamps, embroidery, one-ink print. */
  mono?: boolean;
  title?: string;
};

export function SilsilaMark({ className, mono = false, title }: MarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      fill="none"
    >
      {title ? <title>{title}</title> : null}
      {/* The chain: the bar is what makes three marks a series. */}
      <rect x="4" y="21" width="24" height="4.5" rx="2.25" fill="currentColor" />
      <rect x="4" y="7" width="4.5" height="18.5" rx="2.25" fill="currentColor" />
      <rect
        x="13.75"
        y="7"
        width="4.5"
        height="18.5"
        rx="2.25"
        fill="currentColor"
      />
      <rect
        x="23.5"
        y="7"
        width="4.5"
        height="18.5"
        rx="2.25"
        fill={mono ? "currentColor" : "var(--color-accent)"}
      />
    </svg>
  );
}

type LockupProps = {
  className?: string;
  markClassName?: string;
  mono?: boolean;
};

/** Mark plus wordmark. The wordmark stays live text — it stays crisp, it is
 *  selectable, and screen readers get a name without an alt attribute. */
export function SilsilaLockup({
  className,
  markClassName = "h-6 w-6",
  mono = false,
}: LockupProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <SilsilaMark className={markClassName} mono={mono} />
      <span className="text-[19px] leading-none font-bold tracking-[-0.045em]">
        silsila
      </span>
    </span>
  );
}
