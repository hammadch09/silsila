# Qadam

Next.js 16 (App Router) + Prisma 7 + PostgreSQL boilerplate.

Product context lives in [`product.md`](./product.md).

## Stack

| | |
|---|---|
| Framework | Next.js 16.3 (App Router, Turbopack) |
| Language | TypeScript 5, React 19 |
| Styling | Tailwind CSS 4 |
| ORM | Prisma 7 with the `@prisma/adapter-pg` driver adapter |
| Database | PostgreSQL |
| Validation | Zod 4 |
| Node | 20.9+ (`.nvmrc` pins 22) |

## Getting started

```bash
nvm use                 # Node 22 — Next 16 will not run on Node 18
npm install
cp .env.example .env    # then set DATABASE_URL
npm run db:migrate      # create the schema
npm run db:seed         # one track, seven tasks, one waitlist entry
npm run dev
```

Open http://localhost:3000. The home page reads from the database on every
request, so an empty page means the seed did not run.

Sanity check: `curl localhost:3000/api/health` → `{"status":"ok","database":"up"}`.

## Scripts

| Script | Does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | `prisma generate` then production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run db:migrate` | Create + apply a migration in dev |
| `npm run db:deploy` | Apply pending migrations (production/CI) |
| `npm run db:seed` | Run `prisma/seed.ts` |
| `npm run db:reset` | Drop, re-migrate, re-seed |
| `npm run db:studio` | Prisma Studio |

## Layout

```
prisma/
  schema.prisma        models + enums
  migrations/          committed SQL migrations
  seed.ts              idempotent (upserts) — safe to re-run
prisma.config.ts       Prisma 7 config; loads .env, points at the seed script
src/
  app/
    page.tsx           server component reading from the DB
    api/health/        DB liveness check
    api/waitlist/      GET count, POST intake
  lib/
    prisma.ts          PrismaClient singleton
    validation.ts      Zod intake schema + WhatsApp normalisation
  generated/prisma/    generated client — gitignored, rebuilt by `prisma generate`
```

## Things worth knowing

**Prisma 7 needs a driver adapter.** The client is constructed with `PrismaPg`
in `src/lib/prisma.ts` — a bare `new PrismaClient()` will not connect.

**The generated client is not committed.** It is written to
`src/generated/prisma` and gitignored. `postinstall` and `build` both run
`prisma generate`, so a fresh clone or a CI box gets it automatically.

**The client is cached on `globalThis` in dev.** Without that, Next's hot reload
opens a new connection pool on every file save until Postgres starts refusing
connections.

**Env vars are not auto-loaded by Prisma 7.** `prisma.config.ts` does
`import "dotenv/config"` explicitly. Next.js loads `.env` on its own.

**The data model is a starting point.** `WaitlistEntry` covers the Phase 1
intake questions; `User` / `Track` / `Task` / `Submission` sketch the Phase 2
daily loop well enough to prove relations and enums work. Expect to change it.

## Deploying

Set `DATABASE_URL` to a pooled connection string (Neon, Supabase, RDS) and run
`npm run db:deploy` in the release step. `SHADOW_DATABASE_URL` is only needed in
development, and only if your database user cannot create databases.
