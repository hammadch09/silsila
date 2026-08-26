import type { TaskType } from "@/lib/viz";

/**
 * Plan generation.
 *
 * Pure and deterministic on purpose: the same answers always produce the same
 * plan, so it can be generated once at intake and stored rather than
 * regenerated per day. That is the §3 rule that keeps LLM cost survivable at
 * PKR pricing — the LLM personalises a template here, it does not author 84
 * tasks from scratch.
 *
 * No database calls. This runs the same on the server, in a test, or in the
 * browser during the join flow, which is what lets the flow be confirmed
 * before any of it is persisted.
 */

export type Destination = "JOB" | "FOUNDER";
export type Level = "NONE" | "SOME" | "COMFORTABLE";

export type Intake = {
  destination: Destination;
  level: Level;
  department: string;
  semester: number;
  daysPerWeek: number;
  minutesPerDay: number;
};

export type PlanTask = {
  dayIndex: number;
  week: number;
  type: TaskType;
  title: string;
  detail: string;
  minutes: number;
};

export const PLAN_WEEKS = 12;

/** product.md §3 — the rotation, as a repeating 10-day pattern. */
const JOB_MIX: TaskType[] = [
  "SKILL",
  "SKILL",
  "HORIZON",
  "SKILL",
  "ARTIFACT",
  "SKILL",
  "ARTIFACT",
  "SIGNAL",
  "HORIZON",
  "HUMAN",
];

/** §2 — a founder track weights Human, Signal and Artifact over deep Skill. */
const FOUNDER_MIX: TaskType[] = [
  "SKILL",
  "ARTIFACT",
  "HUMAN",
  "SKILL",
  "HORIZON",
  "ARTIFACT",
  "HUMAN",
  "SIGNAL",
  "ARTIFACT",
  "HORIZON",
];

type Template = { title: string; detail: string };

const POOL: Record<Destination, Record<TaskType, Template[]>> = {
  JOB: {
    SKILL: [
      { title: "Set up your machine", detail: "Install Node and VS Code, make a GitHub account, push an empty repo called silsila-log." },
      { title: "JavaScript: values and types", detail: "Section 1 of the course. Push your solutions." },
      { title: "JavaScript: functions", detail: "Section 2. Push, even if some are wrong." },
      { title: "Arrays and objects", detail: "Section 3, then redo yesterday's two hardest problems from memory." },
      { title: "The DOM", detail: "Section 4. Make one button that changes one thing." },
      { title: "Fetch and async", detail: "Section 5. Call one public API and log the result." },
      { title: "Git properly", detail: "Branch, commit, merge, and undo a commit. Break it on purpose." },
      { title: "CSS layout", detail: "Flexbox and grid. Rebuild one screen you use daily." },
      { title: "React: components and props", detail: "Build three components that take props. No state yet." },
      { title: "React: state", detail: "Add state to yesterday's components. Push." },
      { title: "Forms and validation", detail: "One form, validated, with real error messages." },
      { title: "Fix what came back", detail: "Take last week's lowest grade and redo just the part that was marked." },
    ],
    HORIZON: [
      { title: "How a Pakistani product team ships", detail: "Watch the 18-minute talk. Write 3 lines: what surprised you?" },
      { title: "What a junior dev actually does", detail: "Read the day-in-the-life thread. Write down 2 things you didn't know." },
      { title: "Read a real codebase", detail: "Open a popular repo and read one file end to end. Write what you didn't understand." },
      { title: "What hiring managers screen for", detail: "Watch the 12-minute breakdown. List 3 things your CV is missing." },
      { title: "How the money works", detail: "Read how agencies, products and freelancing differ in Pakistan. Which fits you?" },
      { title: "What's being hired for right now", detail: "Read this month's market note. Write one line on what it changes for you." },
    ],
    ARTIFACT: [
      { title: "Ship one page", detail: "A single page with your name and three things you want to learn. Deploy it." },
      { title: "Live currency rates", detail: "Fetch and display live rates. Handle the offline case. Deploy it." },
      { title: "A CGPA calculator", detail: "Takes your courses, gives your GPA. Deploy it and send the link." },
      { title: "Rebuild a screen you use", detail: "Pick one screen from an app you open daily. Rebuild the layout." },
      { title: "A form that saves", detail: "A form that stores what people submit and shows it back." },
      { title: "Your profile page", detail: "One page that lists everything you have built so far. This one you keep." },
    ],
    SIGNAL: [
      { title: "Rewrite your LinkedIn headline", detail: "Three examples inside. Yours should say what you do, not what you are studying." },
      { title: "Your GitHub README", detail: "Pin three repos and write one honest line about each." },
      { title: "A CV that fits one page", detail: "Template inside. Projects above education." },
      { title: "Write your first post", detail: "300 words on something you built. Post it." },
    ],
    HUMAN: [
      { title: "Message one senior", detail: "Someone from your university working in the field. Template inside. Send it." },
      { title: "Ask one specific question", detail: "In a real community, not a group chat. Specific questions get answers." },
      { title: "Find five companies", detail: "Five places in Pakistan that hire interns in your field. Names and links." },
      { title: "Ask for one review", detail: "Send one project to one person and ask what they'd change." },
    ],
  },
  FOUNDER: {
    SKILL: [
      { title: "Set up your machine", detail: "Install Node and VS Code, make a GitHub account, push an empty repo." },
      { title: "Enough JavaScript to build", detail: "Section 1 and 2. You need enough to make a prototype, not to pass an exam." },
      { title: "Make one screen real", detail: "Take a sketch and turn it into HTML that exists." },
      { title: "Store something", detail: "Save one form submission somewhere and read it back." },
      { title: "Deploy anything", detail: "Get something on the internet with a URL you can send." },
      { title: "Fix what came back", detail: "Take last week's lowest grade and redo the part that was marked." },
    ],
    HORIZON: [
      { title: "How Careem started", detail: "Watch the 18-minute talk. Write 3 lines on what they did before building." },
      { title: "Read one teardown", detail: "How a Pakistani business actually makes money. Write the numbers down." },
      { title: "Talk to a founder", detail: "Watch the interview. List 2 things they got wrong first." },
      { title: "What people pay for", detail: "Read the piece on pricing. What would yours cost?" },
    ],
    ARTIFACT: [
      { title: "One page that explains it", detail: "A landing page for the thing you want to make. Deploy it." },
      { title: "A form that collects interest", detail: "Add a form. Put the link somewhere real." },
      { title: "The smallest working version", detail: "Not the product. The one part that proves it works." },
      { title: "Show it to someone", detail: "Put the prototype in front of one person. Write down where they got stuck." },
      { title: "A one-page pitch", detail: "Problem, who has it, what you made, what you need. One page." },
    ],
    SIGNAL: [
      { title: "Write what you're building", detail: "300 words. Post it. This is how people find you." },
      { title: "Your LinkedIn, as a founder", detail: "Headline, banner, and one post about the problem." },
      { title: "A page about you", detail: "Who you are and what you're working on. One page." },
    ],
    HUMAN: [
      { title: "Go to the market", detail: "Ask 10 shopkeepers how they track udhaar. Write down what they said, word for word." },
      { title: "Interview five people", detail: "Five people with the problem. Do not pitch. Just ask what they do now." },
      { title: "Message one founder", detail: "Someone one step ahead. Template inside. Send it." },
      { title: "Find where they already are", detail: "Which group, market or shop has 50 of your users in one place?" },
      { title: "Ask for one intro", detail: "One person, one introduction, one specific ask." },
    ],
  },
};

/** Level shifts the opening: a beginner starts at task one, others skip ahead. */
const LEVEL_OFFSET: Record<Level, number> = {
  NONE: 0,
  SOME: 2,
  COMFORTABLE: 4,
};

export function generatePlan(intake: Intake): PlanTask[] {
  const mix = intake.destination === "FOUNDER" ? FOUNDER_MIX : JOB_MIX;
  const pool = POOL[intake.destination];
  const total = PLAN_WEEKS * intake.daysPerWeek;

  // How many of each type have been placed so far, so each type walks its own
  // pool in order instead of repeating the same template.
  const used: Partial<Record<TaskType, number>> = {};
  const offset = LEVEL_OFFSET[intake.level];

  return Array.from({ length: total }, (_, index) => {
    const type = mix[index % mix.length];
    const templates = pool[type];

    const seen = used[type] ?? 0;
    used[type] = seen + 1;

    // Level only shifts where SKILL starts — a beginner needs day one, someone
    // who can already build does not. The other types are the same for everyone.
    const start = type === "SKILL" ? offset : 0;
    const template = templates[(start + seen) % templates.length];

    return {
      dayIndex: index + 1,
      week: Math.floor(index / intake.daysPerWeek) + 1,
      type,
      title: template.title,
      detail: template.detail,
      minutes: intake.minutesPerDay,
    };
  });
}

export function planSummary(tasks: PlanTask[]) {
  const byType = tasks.reduce<Record<string, number>>((acc, task) => {
    acc[task.type] = (acc[task.type] ?? 0) + 1;
    return acc;
  }, {});

  return {
    total: tasks.length,
    weeks: PLAN_WEEKS,
    hours: Math.round((tasks.length * tasks[0].minutes) / 60),
    byType,
    artifacts: byType.ARTIFACT ?? 0,
  };
}
