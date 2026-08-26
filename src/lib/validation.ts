import { z } from "zod";

import {
  Destination,
  LaptopAccess,
  SkillLevel,
  WeeklyHours,
} from "@/generated/prisma/enums";
import { DEPARTMENTS, UNIVERSITIES } from "@/lib/intake-options";

export const WHATSAPP_ERROR =
  "Enter a valid Pakistani number: 03XXXXXXXXX or +923XXXXXXXXX.";

/** Strip the separators students actually type: 0300-123 4567, +92 300 1234567. */
function stripSeparators(raw: string): string {
  return raw.replace(/[\s-()]/g, "");
}

/** Pakistani mobile numbers only — this product is one country deep on purpose. */
export function isValidPakistaniMobile(raw: string): boolean {
  return /^(03\d{9}|\+?923\d{9})$/.test(stripSeparators(raw));
}

/** `0300-1234567` and `+92 300 1234567` are the same person. Store one form. */
export function normaliseWhatsapp(raw: string): string {
  const digits = stripSeparators(raw).replace(/[^0-9]/g, "");
  if (digits.startsWith("92")) return `+${digits}`;
  if (digits.startsWith("0")) return `+92${digits.slice(1)}`;
  return `+${digits}`;
}

/// Mirrors the six intake questions in product.md §5.
export const waitlistIntakeSchema = z.object({
  whatsapp: z.string().trim().refine(isValidPakistaniMobile, WHATSAPP_ERROR),
  // Closed lists, enforced here and not only in the dropdown — the route takes
  // JSON from anywhere, so the form's options are a convenience, not a control.
  university: z.enum(UNIVERSITIES, {
    message: "We're only open to Islamia University Bahawalpur right now.",
  }),
  department: z.enum(DEPARTMENTS, {
    message: "Pick one of the computing programs.",
  }),
  semester: z.coerce.number().int().min(1).max(8),
  // Optional on purpose. "Not sure yet" is a valid answer, and so is silence —
  // a required essay box at the bottom of a form loses people (product.md §5).
  goal: z.string().trim().max(500).optional().default(""),
  hours: z.enum(WeeklyHours),
  laptop: z.enum(LaptopAccess),
  // The one answer that changes the plan most (product.md §2).
  destination: z.enum(Destination),
  level: z.enum(SkillLevel),
  source: z.string().trim().max(120).optional(),
});

export type WaitlistIntake = z.infer<typeof waitlistIntakeSchema>;
