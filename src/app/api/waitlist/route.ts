import { NextResponse } from "next/server";

import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { normaliseWhatsapp, waitlistIntakeSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function GET() {
  const count = await prisma.waitlistEntry.count();
  return NextResponse.json({ count });
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = waitlistIntakeSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const { whatsapp, ...rest } = parsed.data;

  try {
    const entry = await prisma.waitlistEntry.create({
      data: { ...rest, whatsapp: normaliseWhatsapp(whatsapp) },
      select: { id: true, createdAt: true },
    });

    return NextResponse.json(entry, { status: 201 });
  } catch (error) {
    // P2002 = unique constraint. Someone filling the form twice is not an error
    // worth showing them; treat it as already-on-the-list.
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json({ error: "Already on the list" }, { status: 409 });
    }

    console.error("Waitlist create failed", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
