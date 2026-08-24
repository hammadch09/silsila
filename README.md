# Silsila

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

Open http://localhost:3000 for the landing page, and `/admin` for the waitlist
dashboard — it asks for `ADMIN_PASSWORD` from your `.env`.

Sanity check: `curl localhost:3000/api/health` → `{"status":"ok","database":"up"}`.

## Routes

| Route | What it is |
|---|---|
| `/` | Landing page. Statically prerendered; the form is the only client component. |
| `/admin` | Waitlist dashboard. Password-gated. |
| `/admin/login` | The only unauthenticated page under `/admin`. |
| `/api/waitlist` | `GET` count · `POST` validated intake |
| `/api/health` | Database liveness |

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
    page.tsx           landing page (static)
    layout.tsx         IBM Plex Sans + Mono
    globals.css        palette tokens + base styles
    admin/             password-gated waitlist dashboard
    api/health/        DB liveness check
    api/waitlist/      GET count, POST intake
  components/
    waitlist-form.tsx  the intake form (client) — the only client component
  lib/
    prisma.ts          PrismaClient singleton
    validation.ts      Zod intake schema + WhatsApp normalisation
    profile-heatmap.ts deterministic sample contribution grid
  generated/prisma/    generated client — gitignored, rebuilt by `prisma generate`
```

## Landing page notes

White paper, near-black ink, IBM Plex Sans with IBM Plex Mono carrying the
labels, day markers and figures. One accent (`#1a56db`), used sparingly.
Palette tokens live in `globals.css` under `@theme` — `bg-paper`, `text-ink`,
`text-ink-2/3`, `border-rule`.

**The restraint is the design.** No gradients, no glows, no glass, no shadows,
no scroll animation, no cards-with-fills. Separation is a hairline or
whitespace. Anything that reads as an effect has been removed on purpose — the
first version of this page was dark with a neon accent and gradient headline,
and it looked like every AI-generated landing page. If you add an effect back,
have a reason.

The earlier design is kept at `design/Qadam Landing.dc.html` for reference; the
current page is a rewrite, not a port of it.

**Base styles must stay inside `@layer base`.** Unlayered CSS outranks every
`@layer utilities` rule no matter the specificity, so an unlayered
`a { color: … }` beats a `text-*` utility on a link-styled button — which is
exactly how the previous version ended up with invisible CTA labels.

**The copy says Silsila reviews submissions, not a person.** The AI builds the
plan, sends the daily task, and reads what comes back. Keep it that way unless
the product changes — an earlier draft claimed "checked by a real person",
which the product does not do.

**The form posts to `/api/waitlist`,** not a Google Sheet. Select options carry
the Prisma enum values (`FIVE_TO_TEN`, `PHONE_ONLY`) so nothing is translated
between the form and the database. A duplicate number returns 409 and is shown
as "you're already on the list" rather than an error.

**Numbers are Pakistani-only** — `03XXXXXXXXX` or `+923XXXXXXXXX`, validated on
both sides and normalised to `+92…` before storage, so the same student typing
`0321-1234567` and `+92 321 1234567` is one row.

## Admin

`/admin` lists every intake, filters by stage, and turns each number into a
WhatsApp link with the first line already typed — Phase 0/1 runs by hand over
WhatsApp, so that is the button that matters. Stage moves PENDING → PLAN_SENT →
ACTIVATED, or DROPPED.

Auth is one shared password in `ADMIN_PASSWORD`, checked in `src/middleware.ts`
so anything added under `/admin` is protected by default rather than protected
only if someone remembers. The cookie holds a SHA-256 of the password, not the
password, and is httpOnly. **Replace this the moment a second person needs
access, or the moment the dashboard can delete anything.**

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
