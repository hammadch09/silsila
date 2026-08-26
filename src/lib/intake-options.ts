/**
 * The closed lists behind the intake form.
 *
 * One source of truth, consumed by both the form and the Zod schema — a
 * dropdown alone constrains nothing, since the API takes JSON from anywhere.
 *
 * Values are the full display strings rather than short codes. They are what
 * the dashboard shows and what gets pasted into WhatsApp, and it keeps the
 * seeded row valid without a data migration. If this list ever gets long
 * enough that renaming becomes painful, move to codes then.
 */

/** One campus. product.md §Phase 4: dominate IUB before going wide — 200
 *  active students on one campus is a real business, 200 across 40
 *  universities is nothing. */
export const UNIVERSITIES = ["Islamia University Bahawalpur"] as const;

export const DEFAULT_UNIVERSITY = UNIVERSITIES[0];

/** Computing programs only (product.md §Scope). Not business, not humanities,
 *  not engineering — that is a v1 decision, not an oversight. "Other computing
 *  program" covers the "and adjacent" in the doc without opening the door to
 *  every department on campus. */
export const DEPARTMENTS = [
  "BS Computer Science",
  "BS Artificial Intelligence",
  "BS Software Engineering",
  "BS Information Technology",
  "Other computing program",
] as const;

export type University = (typeof UNIVERSITIES)[number];
export type Department = (typeof DEPARTMENTS)[number];

/** product.md §2 — two destinations, same machinery, different task mix. */
export const DESTINATIONS = [
  { value: "JOB", label: "Get a job" },
  { value: "FOUNDER", label: "Start something of my own" },
] as const;

/** Where they are starting from. Changes the first few weeks, not the shape. */
export const LEVELS = [
  { value: "NONE", label: "Nothing yet — total beginner" },
  { value: "SOME", label: "Did a course or two, built nothing" },
  { value: "COMFORTABLE", label: "I can build small things" },
] as const;
