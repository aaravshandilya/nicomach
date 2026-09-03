/**
 * Arranges nodes evenly around a circle, sizing the radius so that node
 * cards never overlap regardless of how many companies are in the
 * network. `fitView` then scales the whole layout to the container.
 */
export function circleLayout(
  items: string[],
  nodeWidth = 150,
  nodeGap = 56
) {
  const count = Math.max(items.length, 1);
  const minCircumference = count * (nodeWidth + nodeGap);
  const r = Math.max(220, minCircumference / (2 * Math.PI));
  const cx = r + nodeWidth;
  const cy = r + nodeWidth;
  const positions = new Map<string, { x: number; y: number }>();

  items.forEach((id, i) => {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
    positions.set(id, {
      x: cx + r * Math.cos(angle) - nodeWidth / 2,
      y: cy + r * Math.sin(angle) - 24,
    });
  });

  return positions;
}
