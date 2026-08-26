import Link from "next/link";

import { logOut, setStatus } from "@/app/admin/actions";
import { SilsilaLockup } from "@/components/logo";
import { WaitlistStatus } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const STATUS_ORDER = [
  WaitlistStatus.PENDING,
  WaitlistStatus.PLAN_SENT,
  WaitlistStatus.ACTIVATED,
  WaitlistStatus.DROPPED,
] as const;

const STATUS_LABEL: Record<WaitlistStatus, string> = {
  PENDING: "Pending",
  PLAN_SENT: "Plan sent",
  ACTIVATED: "Activated",
  DROPPED: "Dropped",
};

const HOURS_LABEL = {
  THREE_TO_FIVE: "3–5",
  FIVE_TO_TEN: "5–10",
  TEN_PLUS: "10+",
} as const;

const LAPTOP_LABEL = {
  YES: "Yes",
  SOMETIMES: "Sometimes",
  PHONE_ONLY: "Phone only",
} as const;

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
});

/** Opens WhatsApp with the number and a first line already typed. The whole
 *  Phase 0/1 loop runs by hand over WhatsApp, so this is the button that
 *  actually gets used. */
function whatsappHref(number: string, university: string) {
  const digits = number.replace(/[^0-9]/g, "");
  const text = encodeURIComponent(
    `Assalam o alaikum! This is Silsila — you signed up from ${university}. Here's your first week's plan.`,
  );
  return `https://wa.me/${digits}?text=${text}`;
}

export default async function AdminDashboard({
  searchParams,
}: PageProps<"/admin">) {
  const params = await searchParams;
  const filter = typeof params.status === "string" ? params.status : undefined;
  const active = STATUS_ORDER.find((s) => s === filter);

  const [entries, counts, total] = await Promise.all([
    prisma.waitlistEntry.findMany({
      where: active ? { status: active } : undefined,
      orderBy: { createdAt: "desc" },
      take: 200,
    }),
    prisma.waitlistEntry.groupBy({ by: ["status"], _count: { _all: true } }),
    prisma.waitlistEntry.count(),
  ]);

  const countFor = (status: WaitlistStatus) =>
    counts.find((row) => row.status === status)?._count._all ?? 0;

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="border-b border-rule bg-raised">
        <div className="mx-auto flex h-14 w-full max-w-[1400px] items-center justify-between px-6">
          <SilsilaLockup markClassName="h-[22px] w-[22px]" />
          <div className="flex items-center gap-5">
            <Link
              href="/"
              className="font-mono text-[11px] tracking-[0.14em] uppercase"
            >
              Site
            </Link>
            <form action={logOut}>
              <button
                type="submit"
                className="cursor-pointer border-none bg-transparent p-0 font-mono text-[11px] tracking-[0.14em] uppercase underline underline-offset-4"
              >
                Log out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1400px] flex-1 px-6 py-10">
        <h1 className="text-[30px] leading-none font-semibold tracking-[-0.025em]">
          Waitlist
        </h1>

        {/* Counts double as the filter. One row, no chart — four numbers do not
            need a visualisation. */}
        <nav className="mt-8 flex flex-wrap gap-3">
          <FilterTile label="All" count={total} href="/admin" active={!active} />
          {STATUS_ORDER.map((status) => (
            <FilterTile
              key={status}
              label={STATUS_LABEL[status]}
              count={countFor(status)}
              href={`/admin?status=${status}`}
              active={active === status}
            />
          ))}
        </nav>

        {entries.length === 0 ? (
          <p className="mt-10 text-[16px] text-ink-2">
            {active
              ? "Nobody in this stage yet."
              : "No signups yet. The form on the landing page writes here."}
          </p>
        ) : (
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[1080px] border-collapse text-[14px]">
              <thead>
                <tr className="border-b border-ink text-left">
                  {[
                    "Joined",
                    "WhatsApp",
                    "Department",
                    "Sem",
                    "Hours",
                    "Laptop",
                    "Goal",
                    "Stage",
                  ].map((heading) => (
                    <th
                      key={heading}
                      scope="col"
                      className="py-3 pr-4 font-mono text-[10px] font-normal tracking-[0.14em] text-ink-3 uppercase"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry.id} className="border-b border-rule align-top">
                    <td className="py-4 pr-4 font-mono text-[12px] whitespace-nowrap text-ink-3">
                      {dateFormat.format(entry.createdAt)}
                    </td>
                    <td className="py-4 pr-4 whitespace-nowrap">
                      <a
                        href={whatsappHref(entry.whatsapp, entry.university)}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-[13px]"
                      >
                        {entry.whatsapp}
                      </a>
                    </td>
                    <td className="py-4 pr-4">
                      {entry.department}
                      {entry.university !== "Islamia University Bahawalpur" ? (
                        <span className="mt-1 block font-mono text-[11px] text-ink-3">
                          {entry.university}
                        </span>
                      ) : null}
                    </td>
                    <td className="py-4 pr-4 tabular-nums">{entry.semester}</td>
                    <td className="py-4 pr-4 whitespace-nowrap">
                      {HOURS_LABEL[entry.hours]}
                    </td>
                    <td className="py-4 pr-4 whitespace-nowrap">
                      {LAPTOP_LABEL[entry.laptop]}
                    </td>
                    <td className="max-w-[26rem] py-4 pr-4 text-ink-2">
                      {entry.goal || (
                        <span className="text-ink-3">—</span>
                      )}
                    </td>
                    <td className="py-4">
                      <form action={setStatus} className="flex gap-2">
                        <input type="hidden" name="id" value={entry.id} />
                        <select
                          name="status"
                          defaultValue={entry.status}
                          aria-label={`Stage for ${entry.whatsapp}`}
                          className="rounded-lg border border-rule bg-raised px-2.5 py-1.5 font-sans text-[13px]"
                        >
                          {STATUS_ORDER.map((status) => (
                            <option key={status} value={status}>
                              {STATUS_LABEL[status]}
                            </option>
                          ))}
                        </select>
                        <button
                          type="submit"
                          className="cursor-pointer rounded-lg bg-ink px-3.5 py-1.5 text-[13px] font-medium text-paper hover:bg-accent"
                        >
                          Save
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {entries.length === 200 ? (
          <p className="mt-6 font-mono text-[11px] text-ink-3">
            Showing the newest 200. Add paging when this becomes a problem.
          </p>
        ) : null}
      </main>
    </div>
  );
}

function FilterTile({
  label,
  count,
  href,
  active,
}: {
  label: string;
  count: number;
  href: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`min-w-[7.5rem] rounded-xl border px-4 py-3 no-underline shadow-[var(--shadow-card)] ${
        active
          ? "border-ink bg-ink text-paper"
          : "border-rule bg-raised hover:border-ink-3"
      }`}
    >
      <span className="block text-[24px] leading-none font-semibold tabular-nums">
        {count}
      </span>
      <span
        className={`mt-1.5 block font-mono text-[10px] tracking-[0.14em] uppercase ${
          active ? "text-paper/60" : "text-ink-3"
        }`}
      >
        {label}
      </span>
    </Link>
  );
}
