const SHADES = [
  "rgba(255,255,255,0.07)",
  "rgba(78,240,140,0.28)",
  "rgba(78,240,140,0.6)",
  "#4ef08c",
] as const;

export const HEATMAP_CELL_COUNT = 182;

/**
 * The contribution grid on the sample profile. Deterministic on purpose: a
 * seeded LCG, so the server and client render identical markup and the density
 * ramps up left-to-right the way a real six months of work would.
 */
export function buildHeatmapCells(count = HEATMAP_CELL_COUNT): string[] {
  const cells: string[] = [];
  let seed = 7;

  for (let i = 0; i < count; i++) {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    const r = seed / 2147483648;
    const ramp = 0.25 + (i / count) * 0.6;

    cells.push(
      SHADES[r < ramp * 0.45 ? 3 : r < ramp * 0.8 ? 2 : r < ramp * 1.05 ? 1 : 0],
    );
  }

  return cells;
}
