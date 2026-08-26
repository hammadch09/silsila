"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

import {
  DEFAULT_UNIVERSITY,
  DEPARTMENTS,
  DESTINATIONS,
  LEVELS,
  UNIVERSITIES,
} from "@/lib/intake-options";
import { isValidPakistaniMobile, WHATSAPP_ERROR } from "@/lib/validation";

type Option = { value: string; label: string };

type Field = {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  options?: Option[];
  /** Pre-selected value. Skips the placeholder row entirely. */
  defaultValue?: string;
  helper?: string;
};

// Option values are the Prisma enum members, so nothing has to be translated
// between the form and the database.
const FIELDS: Field[] = [
  {
    id: "university",
    label: "University",
    required: true,
    // One option, so there is no decision to make — pre-select it rather than
    // making someone open a dropdown to pick the only entry. The helper says
    // why the list is short, so a student elsewhere is not left guessing.
    defaultValue: DEFAULT_UNIVERSITY,
    helper: "Early access is one campus only. More soon.",
    options: UNIVERSITIES.map((name) => ({ value: name, label: name })),
  },
  {
    id: "department",
    label: "Department",
    required: true,
    helper: "Computing programs only for now.",
    options: DEPARTMENTS.map((name) => ({ value: name, label: name })),
  },
  {
    id: "semester",
    label: "Semester",
    required: true,
    options: ["1", "2", "3", "4", "5", "6", "7", "8"].map((n) => ({
      value: n,
      label: n,
    })),
  },
  {
    id: "destination",
    label: "What are you after?",
    required: true,
    helper: "This changes which tasks you get, so answer honestly.",
    options: DESTINATIONS.map((d) => ({ value: d.value, label: d.label })),
  },
  {
    id: "level",
    label: "How much can you build right now?",
    required: true,
    options: LEVELS.map((l) => ({ value: l.value, label: l.label })),
  },
  {
    id: "goal",
    label: "Anything specific you want to end up doing?",
    type: "text",
    placeholder: "Not sure yet — that's fine, say that",
  },
  {
    id: "hours",
    label: "Hours a week you can realistically give",
    required: true,
    options: [
      { value: "THREE_TO_FIVE", label: "3–5" },
      { value: "FIVE_TO_TEN", label: "5–10" },
      { value: "TEN_PLUS", label: "10+" },
    ],
  },
  {
    id: "laptop",
    label: "Laptop access",
    required: true,
    options: [
      { value: "YES", label: "Yes" },
      { value: "SOMETIMES", label: "Sometimes" },
      { value: "PHONE_ONLY", label: "Phone only" },
    ],
  },
  {
    id: "whatsapp",
    label: "WhatsApp number",
    type: "tel",
    required: true,
    placeholder: "03XXXXXXXXX",
  },
];

const controlClass =
  "w-full rounded-lg border border-rule bg-raised px-3.5 py-2.5 font-sans text-[15px] text-ink shadow-[0_1px_2px_rgba(13,17,23,0.04)] focus:border-accent";

type Status = "idle" | "submitting" | "done" | "already";

const INITIAL_FORM: Record<string, string> = Object.fromEntries(
  FIELDS.filter((field) => field.defaultValue).map((field) => [
    field.id,
    field.defaultValue as string,
  ]),
);

export function WaitlistForm() {
  const [form, setForm] = useState<Record<string, string>>(INITIAL_FORM);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  function onChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isValidPakistaniMobile(form.whatsapp ?? "")) {
      setError(WHATSAPP_ERROR);
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "landing" }),
      });

      // Filling the form twice is not a mistake worth scolding anyone for.
      if (response.status === 409) {
        setStatus("already");
        return;
      }

      if (!response.ok) {
        setStatus("idle");
        setError("Couldn't send that. Try again in a moment.");
        return;
      }

      setStatus("done");
    } catch {
      setStatus("idle");
      setError("Couldn't send that — check your connection and try again.");
    }
  }

  if (status === "done" || status === "already") {
    return (
      <div className="rounded-xl border border-accent bg-accent-soft p-6">
        <p className="text-[22px] font-semibold tracking-[-0.02em]">
          {status === "done"
            ? "You're on the list."
            : "You're already on the list."}
        </p>
        <p className="mt-1 max-w-[46ch] text-[15px] text-ink-2">
          {status === "done"
            ? "Check WhatsApp in the next 48 hours. Your first task will be short."
            : "We already have this number. Your first week is on its way."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {FIELDS.map((field) => (
        <div key={field.id} className="flex flex-col gap-2">
          <label
            htmlFor={field.id}
            className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3"
          >
            {field.label}
          </label>

          {field.options ? (
            <select
              id={field.id}
              name={field.id}
              required={field.required}
              value={form[field.id] ?? ""}
              onChange={onChange}
              aria-describedby={
                field.helper ? `${field.id}-helper` : undefined
              }
              className={controlClass}
            >
              {/* A pre-selected field has nothing to choose, so it gets no
                  empty placeholder row to fall back into. */}
              {field.defaultValue ? null : <option value="">Select</option>}
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={field.id}
              name={field.id}
              type={field.type}
              required={field.required}
              placeholder={field.placeholder}
              value={form[field.id] ?? ""}
              onChange={onChange}
              aria-invalid={field.id === "whatsapp" && error ? true : undefined}
              aria-describedby={
                field.id === "whatsapp" && error ? "waitlist-error" : undefined
              }
              className={controlClass}
            />
          )}

          {field.helper ? (
            <p id={`${field.id}-helper`} className="text-[13px] text-ink-3">
              {field.helper}
            </p>
          ) : null}
        </div>
      ))}

      {error ? (
        <p
          id="waitlist-error"
          role="alert"
          className="-mt-1 rounded-lg bg-accent-soft px-3 py-2 text-[14px] text-accent"
        >
          {error}
        </p>
      ) : null}

      <div className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-3">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="cursor-pointer rounded-xl border-none bg-accent px-7 py-3.5 font-sans text-[16px] font-medium text-white shadow-[var(--shadow-card)] transition-colors hover:bg-ink disabled:cursor-wait disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send me my first week"}
        </button>
        <p className="text-[13px] text-ink-3">
          We&rsquo;ll only message you about this. No spam, no calls.
        </p>
      </div>
    </form>
  );
}
