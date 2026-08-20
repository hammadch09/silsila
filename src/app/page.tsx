import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
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
        <h1 className="text-3xl font-semibold tracking-tight">Qadam</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Next.js + Prisma + Postgres boilerplate. This page reads from the
          database on every request.
        </p>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium uppercase tracking-wide text-neutral-500">
          Waitlist
        </h2>
        <p className="text-4xl font-semibold tabular-nums">{waitlistCount}</p>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          completed intake {waitlistCount === 1 ? "form" : "forms"}
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-medium uppercase tracking-wide text-neutral-500">
          Tracks
        </h2>

        {tracks.length === 0 ? (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            No tracks yet. Run <code className="font-mono">npm run db:seed</code>.
          </p>
        ) : (
          <ul className="flex flex-col gap-6">
            {tracks.map((track) => (
              <li
                key={track.id}
                className="rounded-lg border border-neutral-200 p-5 dark:border-neutral-800"
              >
                <h3 className="font-medium">{track.title}</h3>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  {track.description}
                </p>
                <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                  {track.tasks.length} tasks · {track._count.users} enrolled
                </p>

                <ol className="mt-4 flex flex-col gap-2">
                  {track.tasks.map((task) => (
                    <li key={task.id} className="flex gap-3 text-sm">
                      <span className="w-12 shrink-0 font-mono text-xs text-neutral-400">
                        Day {task.dayIndex}
                      </span>
                      <span className="w-20 shrink-0 font-mono text-xs text-neutral-400">
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

      <footer className="text-xs text-neutral-400">
        <a className="underline" href="/api/health">
          /api/health
        </a>{" "}
        ·{" "}
        <a className="underline" href="/api/waitlist">
          /api/waitlist
        </a>
      </footer>
    </main>
  );
}
