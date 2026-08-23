/**
 * Chart palette and data.
 *
 * Colours come from the validated categorical palette, assigned in fixed slot
 * order and never cycled. Verified with the dataviz validator against this
 * page's white surface:
 *
 *   5 slots, adjacent pairs (the stacked mix bar)  → ALL CHECKS PASS
 *     worst adjacent CVD ΔE 9.1, normal-vision ΔE 19.6
 *   5 slots, all pairs (a dense grid)              → FAIL
 *     magenta↔orange normal-vision ΔE 12.9, below the 15 floor
 *
 * That second result is why the day grid is a one-hue sequential ramp rather
 * than five categories: in a grid any two types can end up adjacent, and no
 * ordering of five hues survives that. Identity → categorical bar; magnitude →
 * sequential heatmap.
 *
 * Three of the five sit below 3:1 against white, so the relief rule applies:
 * every series carries a visible label, never colour alone.
 */

export type TaskType = "SKILL" | "HORIZON" | "ARTIFACT" | "SIGNAL" | "HUMAN";

export const TASK_COLORS: Record<TaskType, string> = {
  SKILL: "#2a78d6", // slot 1 blue
  HORIZON: "#eb6834", // slot 2 orange
  ARTIFACT: "#1baf7a", // slot 3 aqua
  SIGNAL: "#eda100", // slot 4 yellow
  HUMAN: "#e87ba4", // slot 5 magenta
};

/** The mix from product.md §3. Real numbers, not illustrative. */
export const TASK_MIX: {
  type: TaskType;
  share: number;
  what: string;
}[] = [
  { type: "SKILL", share: 40, what: "The technical spine" },
  { type: "HORIZON", share: 20, what: "What you didn't know existed" },
  { type: "ARTIFACT", share: 20, what: "Something that leaves a trace" },
  { type: "SIGNAL", share: 10, what: "CV, profile, positioning" },
  { type: "HUMAN", share: 10, what: "Talking to actual people" },
];

/** One week of a software-development track, showing the rotation. */
export const SAMPLE_WEEK: {
  day: string;
  type: TaskType;
  task: string;
  mins: number;
}[] = [
  { day: "MON", type: "SKILL", task: "JavaScript course, section 4. Push your solutions.", mins: 45 },
  { day: "TUE", type: "HORIZON", task: "Watch: how Careem was built. Write 3 lines.", mins: 30 },
  { day: "WED", type: "SKILL", task: "Section 5. Push again.", mins: 45 },
  { day: "THU", type: "ARTIFACT", task: "Build a live currency rates page. Deploy it.", mins: 40 },
  { day: "FRI", type: "SIGNAL", task: "Rewrite your LinkedIn headline.", mins: 30 },
  { day: "SAT", type: "HUMAN", task: "Message one senior in your field. Template inside.", mins: 30 },
  { day: "SUN", type: "SKILL", task: "Fix what came back in yesterday's grade.", mins: 40 },
];

// Sequential blue, light→dark. Step 0 is a warm neutral tuned to the paper, so
// "no work that day" reads as absence rather than as a low value — a cool grey
// here would sit visibly wrong against the warm surface.
const HEATMAP_STEPS = ["#e5e0d5", "#9ec5f4", "#3987e5", "#1c5cab"] as const;

export const HEATMAP_CELL_COUNT = 182;

/**
 * The contribution grid on the sample profile. Deterministic: a seeded LCG, so
 * server and client render identical markup. Density ramps left to right, so
 * six months of showing up reads as a shape rather than as texture.
 */
export function buildHeatmapCells(count = HEATMAP_CELL_COUNT): string[] {
  const cells: string[] = [];
  let seed = 7;

  for (let i = 0; i < count; i++) {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    const r = seed / 2147483648;
    const ramp = 0.12 + (i / count) * 0.78;

    cells.push(
      HEATMAP_STEPS[
        r < ramp * 0.4 ? 3 : r < ramp * 0.72 ? 2 : r < ramp ? 1 : 0
      ],
    );
  }

  return cells;
}
