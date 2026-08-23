import Link from "next/link";

import { prisma } from "@/lib/prisma";

// Unauthenticated on purpose for now — it exists to prove the database layer
// works end to end. Put it behind auth before this is reachable in production.
export const dynamic = "force-dynamic";

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
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-10 px-6 py-16">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          Dashboard
        </h1>
        <p className="text-sm text-muted-dimmer">
          Reads from Postgres on every request.
        </p>
      </header>

      <section className="flex flex-col gap-2">
        <h2 className="text-[11.5px] font-extrabold tracking-[1.6px] uppercase text-muted-darkest">
          Waitlist
        </h2>
        <p className="text-4xl font-extrabold tabular-nums text-white">
          {waitlistCount}
        </p>
        <p className="text-sm text-muted-dimmer">
          completed intake {waitlistCount === 1 ? "form" : "forms"}
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[11.5px] font-extrabold tracking-[1.6px] uppercase text-muted-darkest">
          Tracks
        </h2>

        {tracks.length === 0 ? (
          <p className="text-sm text-muted-dimmer">
            No tracks yet. Run <code className="font-mono">npm run db:seed</code>.
          </p>
        ) : (
          <ul className="flex flex-col gap-6">
            {tracks.map((track) => (
              <li
                key={track.id}
                className="rounded-[18px] border border-white/[0.075] bg-white/[0.045] p-5"
              >
                <h3 className="font-bold text-white">{track.title}</h3>
                <p className="mt-1 text-sm text-muted">{track.description}</p>
                <p className="mt-2 text-xs text-muted-dimmer">
                  {track.tasks.length} tasks · {track._count.users} enrolled
                </p>

                <ol className="mt-4 flex flex-col gap-2">
                  {track.tasks.map((task) => (
                    <li key={task.id} className="flex gap-3 text-sm">
                      <span className="w-12 shrink-0 font-mono text-xs text-muted-darkest">
                        Day {task.dayIndex}
                      </span>
                      <span className="w-20 shrink-0 font-mono text-xs text-accent">
                        {task.type}
                      </span>
                      <span className="text-body-soft">{task.title}</span>
                    </li>
                  ))}
                </ol>
              </li>
            ))}
          </ul>
        )}
      </section>

      <footer className="text-xs text-muted-darkest">
        <Link href="/">← Landing page</Link> ·{" "}
        <a href="/api/health">/api/health</a>
      </footer>
    </main>
  );
}
