import Link from "next/link";

import { prisma } from "@/lib/prisma";

// Unauthenticated on purpose for now — it exists to prove the database layer
// works end to end. Put it behind auth before this is reachable in production.
export const dynamic = "force-dynamic";

const labelClass =
  "font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3";

export default async function Dashboard() {
  const [waitlistCount, tracks] = await Promise.all([
    prisma.waitlistEntry.count(),
    prisma.track.findMany({
      orderBy: { title: "asc" },
      include: {
        tasks: { orderBy: { dayIndex: "asc" } },
        _count: { select: { users: true } },
      },
    }),
  ]);

  return (
    <main className="mx-auto w-full max-w-[640px] flex-1 px-6 py-16">
      <h1 className="text-[26px] font-semibold tracking-[-0.02em]">Dashboard</h1>
      <p className="mt-2 text-[15px] text-ink-2">
        Reads from Postgres on every request.
      </p>

      <section className="mt-12 border-t border-rule pt-8">
        <p className={labelClass}>Waitlist</p>
        <p className="mt-3 font-mono text-[34px] tracking-[-0.02em] tabular-nums">
          {waitlistCount}
        </p>
        <p className="mt-1 text-[13px] text-ink-3">
          completed intake {waitlistCount === 1 ? "form" : "forms"}
        </p>
      </section>

      <section className="mt-12 border-t border-rule pt-8">
        <p className={labelClass}>Tracks</p>

        {tracks.length === 0 ? (
          <p className="mt-4 text-[15px] text-ink-2">
            No tracks yet. Run <code className="font-mono">npm run db:seed</code>
            .
          </p>
        ) : (
          <ul className="mt-5 flex flex-col gap-8">
            {tracks.map((track) => (
              <li key={track.id}>
                <p className="font-medium">{track.title}</p>
                <p className="mt-1 max-w-[52ch] text-[15px] text-ink-2">
                  {track.description}
                </p>
                <p className="mt-1 font-mono text-[11px] text-ink-3">
                  {track.tasks.length} tasks · {track._count.users} enrolled
                </p>

                <ol className="mt-4 border-t border-rule-soft">
                  {track.tasks.map((task) => (
                    <li
                      key={task.id}
                      className="flex gap-4 border-b border-rule-soft py-2.5 text-[14px]"
                    >
                      <span className="w-12 shrink-0 font-mono text-[11px] text-ink-3 tabular-nums">
                        {String(task.dayIndex).padStart(2, "0")}
                      </span>
                      <span className="w-[72px] shrink-0 font-mono text-[11px] tracking-[0.08em] text-accent">
                        {task.type}
                      </span>
                      <span>{task.title}</span>
                    </li>
                  ))}
                </ol>
              </li>
            ))}
          </ul>
        )}
      </section>

      <footer className="mt-12 border-t border-rule pt-6 text-[13px] text-ink-3">
        <Link href="/">← Landing page</Link> ·{" "}
        <a href="/api/health">/api/health</a>
      </footer>
    </main>
  );
}
