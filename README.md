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

Open http://localhost:3000 for the landing page. `/dashboard` reads from the
database on every request — if it shows no tracks, the seed did not run.

Sanity check: `curl localhost:3000/api/health` → `{"status":"ok","database":"up"}`.

## Routes

| Route | What it is |
|---|---|
| `/` | Landing page. Statically prerendered; the form is the only client component. |
| `/dashboard` | Waitlist count + seeded tracks, straight from Postgres. **No auth yet.** |
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
    layout.tsx         Manrope + the pre-hydration `data-js` flag
    globals.css        palette tokens + base styles
    dashboard/         DB-backed view
    api/health/        DB liveness check
    api/waitlist/      GET count, POST intake
  components/
    waitlist-form.tsx  the intake form (client)
    reveal-on-scroll.tsx  one IntersectionObserver for the whole page
  lib/
    prisma.ts          PrismaClient singleton
    validation.ts      Zod intake schema + WhatsApp normalisation
    profile-heatmap.ts deterministic sample contribution grid
  generated/prisma/    generated client — gitignored, rebuilt by `prisma generate`
```

## Landing page notes

Ported from the design artifact kept at `design/Qadam Landing.dc.html` (open it
directly in a browser to compare). Inline styles became
Tailwind utilities; the palette lives as `@theme` tokens in `globals.css`
(`bg-ink`, `text-accent`, `text-muted`, …). It is **dark-only by design** —
there is no light mode to maintain.

**Base styles must stay inside `@layer base`.** Unlayered CSS outranks every
`@layer utilities` rule no matter the specificity, so an unlayered
`a { color: … }` beats `text-ink` and paints the CTA label the same green as
the button behind it.

**The form posts to `/api/waitlist`,** not a Google Sheet. Select options carry
the Prisma enum values (`FIVE_TO_TEN`, `PHONE_ONLY`) so nothing is translated
between the form and the database. A duplicate number returns 409 and is shown
as "you're already on the list" rather than an error.

**Numbers are Pakistani-only** — `03XXXXXXXXX` or `+923XXXXXXXXX`, validated on
both sides and normalised to `+92…` before storage, so the same student typing
`0321-1234567` and `+92 321 1234567` is one row.

**Scroll reveal degrades safely.** Elements are hidden by CSS only under
`html[data-js]`, which an inline script sets before first paint — so a visitor
without JS gets the whole page instead of a blank one. That attribute is why
`<html>` carries `suppressHydrationWarning`.

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
