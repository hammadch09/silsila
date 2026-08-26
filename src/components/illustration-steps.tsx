/**
 * "Bara goal, chhote tukde" — the product in one picture.
 *
 * A large ghosted block (the goal, the thing that feels impossible) with a
 * staircase of small solid cubes climbing out of it. Each cube is one day.
 * The point of the picture is that the big shape and the little shapes are
 * made of the same stuff.
 *
 * Hand-built isometric SVG rather than clip-art: it uses the project's pastel
 * palette exactly, scales to any size without a raster asset, and can be
 * recoloured from one array. It is not a 3D render — that needs an
 * illustrator — but it is a real drawing rather than a chart pretending.
 */

// 2:1 isometric. w/h describe the top-face rhombus; d is the extrusion.
const W = 26;
const H = 15;
const D = 24;

/** top, left face, right face — each pastel with two darker steps. */
const FACES: Array<[string, string, string]> = [
  ["#DCE9FB", "#BFD6F5", "#A5C3EE"], // sky
  ["#DCEFE4", "#BEDFCC", "#A4CFB6"], // mint
  ["#FCE7D8", "#F6D2BA", "#EEBC9C"], // peach
  ["#E8E4FA", "#D0C9F2", "#B9B0E9"], // lilac
  ["#FBE2EA", "#F4C9D7", "#EBB0C3"], // blush
];

function Cube({ x, y, faces }: { x: number; y: number; faces: [string, string, string] }) {
  const [top, left, right] = faces;
  return (
    <g transform={`translate(${x} ${y})`}>
      <polygon points={`0,${-H} ${W},0 0,${H} ${-W},0`} fill={top} />
      <polygon
        points={`${-W},0 0,${H} 0,${H + D} ${-W},${D}`}
        fill={left}
      />
      <polygon points={`${W},0 0,${H} 0,${H + D} ${W},${D}`} fill={right} />
    </g>
  );
}

const STEPS = 9;

export function IllustrationSteps({ className }: { className?: string }) {
  // Each step moves right and rises, so the run reads as climbing.
  const cubes = Array.from({ length: STEPS }, (_, i) => ({
    x: 120 + i * W,
    y: 250 + i * H - i * 26,
    faces: FACES[i % FACES.length],
  }));

  return (
    <svg
      viewBox="0 0 520 380"
      className={className}
      role="img"
      aria-label="A large block labelled as the goal, with a staircase of small cubes climbing out of it — one cube for each day."
      fill="none"
    >
      <defs>
        <radialGradient id="steps-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2158D0" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#2158D0" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="260" cy="220" rx="250" ry="170" fill="url(#steps-glow)" />

      {/* The goal: big, translucent, made of the same shape as the steps. */}
      <g opacity="0.5">
        <polygon points="120,120 210,172 120,224 30,172" fill="#DCE9FB" />
        <polygon points="30,172 120,224 120,300 30,248" fill="#C6D9F3" />
        <polygon points="210,172 120,224 120,300 210,248" fill="#AFC8EC" />
      </g>
      <g
        stroke="#2158D0"
        strokeOpacity="0.35"
        strokeWidth="1.5"
        strokeDasharray="5 5"
      >
        <polygon points="120,120 210,172 120,224 30,172" />
      </g>

      {/* Soft ground shadow under the run. */}
      <ellipse
        cx="260"
        cy="312"
        rx="150"
        ry="16"
        fill="#0D1117"
        opacity="0.05"
      />

      {cubes.map((cube, index) => (
        <Cube key={index} x={cube.x} y={cube.y} faces={cube.faces} />
      ))}

      {/* A small flag on the last cube — where the run gets to. */}
      <g transform={`translate(${cubes[STEPS - 1].x} ${cubes[STEPS - 1].y - H})`}>
        <line x1="0" y1="0" x2="0" y2="-42" stroke="#0D1117" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M0,-42 L30,-33 L0,-24 Z" fill="#2158D0" />
      </g>
    </svg>
  );
}
