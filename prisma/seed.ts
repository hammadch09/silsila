import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "../src/generated/prisma/client";
import { TaskType } from "../src/generated/prisma/enums";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set. Copy .env.example to .env.");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

// One track's first week, using the five task types from product.md §3.
const webDevWeekOne = [
  {
    dayIndex: 1,
    type: TaskType.SKILL,
    title: "Set up your machine",
    body: "Install Node and VS Code. Create a GitHub account. Push an empty repo called `qadam-log`.",
    estimateMins: 40,
  },
  {
    dayIndex: 2,
    type: TaskType.HORIZON,
    title: "See what gets built here",
    body: "Watch an 18-minute talk on how a Pakistani product team ships. Write 3 lines: what surprised you?",
    estimateMins: 30,
  },
  {
    dayIndex: 3,
    type: TaskType.SKILL,
    title: "JavaScript basics, section 1",
    body: "Complete section 1 of the JS course. Push your solutions to `qadam-log`.",
    estimateMins: 45,
  },
  {
    dayIndex: 4,
    type: TaskType.ARTIFACT,
    title: "Ship one page",
    body: "Build a single HTML page that shows your name and three things you want to learn. Deploy it. Send the link.",
    estimateMins: 45,
  },
  {
    dayIndex: 5,
    type: TaskType.SIGNAL,
    title: "Rewrite your LinkedIn headline",
    body: "Here are 3 examples of good headlines for a CS student. Rewrite yours. Screenshot it.",
    estimateMins: 30,
  },
  {
    dayIndex: 6,
    type: TaskType.HUMAN,
    title: "Message one senior",
    body: "Find one person from your university working in the field. Use the template. Send it. Screenshot the sent message.",
    estimateMins: 30,
  },
  {
    dayIndex: 7,
    type: TaskType.SKILL,
    title: "JavaScript basics, section 2",
    body: "Complete section 2 of the JS course. Push your solutions.",
    estimateMins: 45,
  },
];

async function main() {
  const track = await prisma.track.upsert({
    where: { slug: "web-dev" },
    update: {},
    create: {
      slug: "web-dev",
      title: "Web Development",
      description:
        "Frontend fundamentals to a deployed portfolio. The default track for CS/IT students.",
    },
  });

  for (const task of webDevWeekOne) {
    await prisma.task.upsert({
      where: { trackId_dayIndex: { trackId: track.id, dayIndex: task.dayIndex } },
      update: task,
      create: { ...task, trackId: track.id },
    });
  }

  await prisma.waitlistEntry.upsert({
    where: { whatsapp: "+923000000000" },
    update: {},
    create: {
      whatsapp: "+923000000000",
      university: "Islamia University Bahawalpur",
      department: "BS Artificial Intelligence",
      semester: 4,
      goal: "Not sure yet — something with AI",
      hours: "FIVE_TO_TEN",
      laptop: "SOMETIMES",
      source: "seed",
    },
  });

  const [tracks, tasks, entries] = await Promise.all([
    prisma.track.count(),
    prisma.task.count(),
    prisma.waitlistEntry.count(),
  ]);

  console.log(`Seeded: ${tracks} track(s), ${tasks} task(s), ${entries} waitlist entry/entries.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
