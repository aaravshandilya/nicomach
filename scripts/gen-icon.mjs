// One-off generator for the static favicon (app/icon.svg) and the public
// standalone wreath asset, using the same geometry as lib/laurel.ts so the
// favicon matches the in-app emblem exactly.
import { writeFileSync, mkdirSync } from "node:fs";

function toRad(d) {
  return (d * Math.PI) / 180;
}
function point(cx, cy, r, thetaDeg) {
  const t = toRad(thetaDeg);
  return { x: cx + r * Math.cos(t), y: cy - r * Math.sin(t) };
}
function leafPath(x, y, thetaDeg, length, width, leanDeg) {
  const rotate = 90 - thetaDeg + leanDeg;
  const halfW = width / 2;
  const d = `M 0 0 C ${halfW} ${-length * 0.22}, ${halfW} ${-length * 0.58}, 0 ${-length} C ${-halfW} ${-length * 0.58}, ${-halfW} ${-length * 0.22}, 0 0 Z`;
  return { d, rotate, x, y };
}
function generate({ cx = 50, cy = 50, r = 27, count = 8 } = {}) {
  const leafLenBase = 22,
    leafLenTip = 16,
    leafWidthBase = 16,
    leafWidthTip = 11;
  const startDeg = 258;
  const endDeg = -78;
  const build = (mirror) => {
    const out = [];
    for (let i = 0; i < count; i++) {
      const tParam = i / (count - 1);
      const sweep = startDeg - tParam * (startDeg - endDeg);
      const theta = mirror === 1 ? sweep : 180 - sweep;
      const { x, y } = point(cx, cy, r, theta);
      const length = leafLenBase + (leafLenTip - leafLenBase) * tParam;
      const width = leafWidthBase + (leafWidthTip - leafWidthBase) * tParam;
      out.push(leafPath(x, y, theta, length, width, 0));
    }
    return out;
  };
  return [...build(1), ...build(-1)];
}

function svgFor({ withLetter }) {
  const leaves = generate({});
  const groups = leaves
    .map(
      (l) =>
        `<g transform="translate(${l.x.toFixed(2)} ${l.y.toFixed(2)}) rotate(${l.rotate.toFixed(2)})"><path d="${l.d}"/></g>`
    )
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#DEC177"/>
      <stop offset="55%" stop-color="#C4A052"/>
      <stop offset="100%" stop-color="#9C7F41"/>
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="20" fill="#050705"/>
  <g fill="url(#g)" stroke="rgba(5,7,5,0.35)" stroke-width="0.6">${groups}</g>
  ${withLetter ? `<text x="50" y="60" font-family="Georgia, 'Cormorant Garamond', serif" font-size="34" fill="#F4EBD8" text-anchor="middle">N</text>` : ""}
</svg>`;
}

mkdirSync("public/logo", { recursive: true });
writeFileSync("app/icon.svg", svgFor({ withLetter: true }));
writeFileSync("public/logo/wreath-n.svg", svgFor({ withLetter: true }));
writeFileSync("public/logo/wreath-o.svg", svgFor({ withLetter: false }));
console.log("Generated app/icon.svg, public/logo/wreath-n.svg, public/logo/wreath-o.svg");
