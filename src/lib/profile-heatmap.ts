// Grey at rest, accent when there is work. The middle steps stay pale on
// purpose — this is the one dense element on the page and a saturated grid
// would shout over everything around it.
const SHADES = ["#f2f2f2", "#dde5f8", "#a8c0f0", "#1a56db"] as const;

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
    // Starts thin and thickens. Six months of showing up should be legible as
    // a shape, not just a texture.
    const ramp = 0.12 + (i / count) * 0.78;

    cells.push(
      SHADES[r < ramp * 0.4 ? 3 : r < ramp * 0.72 ? 2 : r < ramp ? 1 : 0],
    );
  }

  return cells;
}
