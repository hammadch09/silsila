import { z } from "zod";

import { LaptopAccess, WeeklyHours } from "@/generated/prisma/enums";

/// Mirrors the six intake questions in product.md §5.
export const waitlistIntakeSchema = z.object({
  whatsapp: z
    .string()
    .trim()
    // Deliberately loose: students write 0300-1234567, +923001234567, 923001234567.
    // Normalise downstream rather than rejecting people at the form.
    .regex(/^[+0-9][0-9\s-]{8,17}$/, "Enter a valid WhatsApp number"),
  university: z.string().trim().min(2).max(120),
  department: z.string().trim().min(2).max(120),
  semester: z.coerce.number().int().min(1).max(8),
  goal: z.string().trim().min(1).max(500),
  hours: z.enum(WeeklyHours),
  laptop: z.enum(LaptopAccess),
  source: z.string().trim().max(120).optional(),
});

export type WaitlistIntake = z.infer<typeof waitlistIntakeSchema>;

/// `0300-1234567` and `+92 300 1234567` are the same person. Store one form.
export function normaliseWhatsapp(raw: string): string {
  const digits = raw.replace(/[^0-9]/g, "");
  if (digits.startsWith("92")) return `+${digits}`;
  if (digits.startsWith("0")) return `+92${digits.slice(1)}`;
  return `+${digits}`;
}
