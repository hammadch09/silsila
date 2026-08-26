"use client";

import { useActionState } from "react";

import { SilsilaMark } from "@/components/logo";
import { logIn } from "@/app/admin/actions";

export default function AdminLogin() {
  const [error, action, pending] = useActionState(logIn, null);

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-20">
      <div className="w-full max-w-[360px]">
        <SilsilaMark className="h-8 w-8" />

        <h1 className="mt-6 text-[30px] leading-none font-semibold tracking-[-0.025em]">
          Admin
        </h1>

        <form action={action} className="mt-8 flex flex-col gap-4">
          <label
            htmlFor="password"
            className="font-mono text-[10px] tracking-[0.16em] text-ink-3 uppercase"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoFocus
            autoComplete="current-password"
            aria-describedby={error ? "login-error" : undefined}
            className="w-full rounded-lg border border-rule bg-raised px-3.5 py-2.5 font-sans text-[15px] text-ink shadow-[0_1px_2px_rgba(13,17,23,0.04)] focus:border-accent"
          />

          {error ? (
            <p
              id="login-error"
              role="alert"
              className="rounded-lg bg-accent-soft px-3 py-2 text-[14px] text-accent"
            >
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={pending}
            className="mt-2 cursor-pointer rounded-xl border-none bg-accent px-6 py-3.5 text-[16px] font-medium text-white shadow-[var(--shadow-card)] transition-colors hover:bg-ink disabled:cursor-wait disabled:opacity-60"
          >
            {pending ? "Checking…" : "Open dashboard"}
          </button>
        </form>
      </div>
    </main>
  );
}
