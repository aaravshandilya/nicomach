/**
 * Parametric laurel wreath generator.
 *
 * Produces two mirrored branches of tapering laurel leaves arranged around a
 * circle, in the classical "crest" style: leaves sweep from a tied base near
 * the bottom, up and around each side, leaving the wreath open at the top
 * (used for the standalone N mark) or fully closed into a ring (used for the
 * wreath that replaces the "o" in the wordmark).
 *
 * All geometry is computed once from a small set of parameters so the
 * favicon, the inline wordmark mark, the loading animation, and the footer
 * emblem all derive from the same shape.
 */

export interface LeafGeom {
  /** SVG path "d" attribute for a single leaf, already positioned + rotated */
  d: string;
  /** stagger delay (0..1) useful for draw-on animations, tip leaves first */
  order: number;
}

export interface WreathGeom {
  left: LeafGeom[];
  right: LeafGeom[];
  /** small ribbon/tie path joining the two branches at the base */
  tie: string;
  cx: number;
  cy: number;
  r: number;
}

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function point(cx: number, cy: number, r: number, thetaDeg: number) {
  const t = toRad(thetaDeg);
  return { x: cx + r * Math.cos(t), y: cy - r * Math.sin(t) };
}

/**
 * Builds a single laurel leaf: a tapered, gently curved almond shape,
 * anchored at (x, y), oriented so its tip points away from the wreath
 * center at angle `thetaDeg`, and leaning slightly toward the direction of
 * travel along the branch (`leanDeg`) the way real laurel leaves stack.
 */
function leafPath(
  x: number,
  y: number,
  thetaDeg: number,
  length: number,
  width: number,
  leanDeg: number
) {
  const rotate = 90 - thetaDeg + leanDeg;
  // Leaf drawn in local space: base at (0,0), tip at (0,-length), bulging
  // asymmetrically to one side for a natural, hand-drawn laurel silhouette.
  const halfW = width / 2;
  const d = `M 0 0
    C ${halfW} ${-length * 0.22}, ${halfW} ${-length * 0.58}, 0 ${-length}
    C ${-halfW} ${-length * 0.58}, ${-halfW} ${-length * 0.22}, 0 0 Z`;
  return { d, rotate, x, y };
}

function pathWithTransform(leaf: { d: string; rotate: number; x: number; y: number }) {
  return `<g transform="translate(${leaf.x.toFixed(2)} ${leaf.y.toFixed(
    2
  )}) rotate(${leaf.rotate.toFixed(2)})"><path d="${leaf.d.replace(/\s+/g, " ").trim()}" /></g>`;
}

export function generateWreath(opts?: {
  cx?: number;
  cy?: number;
  r?: number;
  count?: number;
  gapDeg?: number;
  closed?: boolean;
  leafLenBase?: number;
  leafLenTip?: number;
  leafWidthBase?: number;
  leafWidthTip?: number;
}): WreathGeom {
  const count = opts?.count ?? 8;
  // Fewer leaves would otherwise leave gaps in the ring (each leaf covers a
  // fixed angular slice); widen and lengthen them to compensate so the
  // wreath reads as one continuous ring at any leaf count, including the
  // small inline mark that replaces the "o" in the wordmark.
  const scale = Math.sqrt(8 / count);
  const {
    cx = 50,
    cy = 50,
    r = 27,
    gapDeg = 34,
    closed = true,
    leafLenBase = 22 * scale,
    leafLenTip = 16 * scale,
    leafWidthBase = 16 * scale,
    leafWidthTip = 11 * scale,
  } = opts || {};

  // Bottom of circle is 270deg (screen-down). Branches start near the
  // bottom (tied) and sweep up each side, stopping `gapDeg/2` short of the
  // top (90deg) unless `closed`, which continues them into a full ring.
  const startDeg = 270 - (closed ? 12 : gapDeg / 2 - 6); // slight overlap at base
  const endDeg = closed ? -90 : 90 + gapDeg / 2;

  const buildBranch = (mirror: 1 | -1): { d: string; order: number }[] => {
    const leaves: { d: string; order: number }[] = [];
    for (let i = 0; i < count; i++) {
      const tParam = i / (count - 1); // 0 at base, 1 at tip
      // sweep angle from start (base, bottom) to end (tip, near top)
      const sweep = startDeg - tParam * (startDeg - endDeg);
      const theta = mirror === 1 ? sweep : 180 - sweep;
      const { x, y } = point(cx, cy, r, theta);
      const length = leafLenBase + (leafLenTip - leafLenBase) * tParam;
      const width = leafWidthBase + (leafWidthTip - leafWidthBase) * tParam;
      const geom = leafPath(x, y, theta, length, width, 0);
      leaves.push({
        d: pathWithTransform(geom),
        order: tParam,
      });
    }
    return leaves;
  };

  const left = buildBranch(1).map((l, i) => ({ d: l.d, order: l.order }));
  const right = buildBranch(-1).map((l, i) => ({ d: l.d, order: l.order }));

  const base = point(cx, cy, r, 270);
  const tie = `M ${(base.x - 6).toFixed(2)} ${(base.y - 2).toFixed(2)}
    Q ${cx.toFixed(2)} ${(base.y + 9).toFixed(2)} ${(base.x + 6).toFixed(2)} ${(
    base.y - 2
  ).toFixed(2)}`;

  return { left, right, tie, cx, cy, r };
}
