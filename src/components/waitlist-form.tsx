"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

import { isValidPakistaniMobile, WHATSAPP_ERROR } from "@/lib/validation";

type Option = { value: string; label: string };

type Field = {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  options?: Option[];
};

// Option values are the Prisma enum members, so nothing has to be translated
// between the form and the database.
const FIELDS: Field[] = [
  { id: "university", label: "University", type: "text", required: true },
  { id: "department", label: "Department", type: "text", required: true },
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
    id: "goal",
    label: "What do you want to do after you graduate?",
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

// Underline, not a box. Seven boxed inputs stacked is the most form-like a
// form can look; a rule under each keeps it closer to a printed slip.
const controlClass =
  "w-full border-0 border-b border-rule bg-transparent px-0 py-2.5 font-sans text-[16px] text-ink focus:border-ink";

type Status = "idle" | "submitting" | "done" | "already";

export function WaitlistForm() {
  const [form, setForm] = useState<Record<string, string>>({});
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
      <div className="border-l-2 border-accent pl-6">
        <p className="font-display text-[26px]">
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-7">
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
              className={controlClass}
            >
              <option value="">Select</option>
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
        </div>
      ))}

      {error ? (
        <p
          id="waitlist-error"
          role="alert"
          className="-mt-2 border-l-2 border-ink pl-3 text-[14px]"
        >
          {error}
        </p>
      ) : null}

      <div className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-3">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="cursor-pointer border-none bg-ink px-7 py-4 font-sans text-[16px] text-paper hover:bg-accent disabled:cursor-wait disabled:opacity-60"
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
