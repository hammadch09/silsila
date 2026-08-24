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

        <h1 className="mt-6 text-[32px] leading-none font-bold tracking-[-0.03em]">
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
            className="w-full border-2 border-ink bg-paper px-3.5 py-3 font-sans text-[16px]"
          />

          {error ? (
            <p
              id="login-error"
              role="alert"
              className="border-l-[6px] border-marigold pl-3 text-[14px] font-medium"
            >
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={pending}
            className="mt-2 cursor-pointer border-2 border-ink bg-marigold px-6 py-3.5 text-[16px] font-semibold text-ink shadow-[5px_5px_0_0_var(--color-ink)] disabled:cursor-wait disabled:opacity-60"
          >
            {pending ? "Checking…" : "Open dashboard"}
          </button>
        </form>
      </div>
    </main>
  );
}
