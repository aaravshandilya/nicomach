/**
 * Distributes company nodes evenly across a sphere (Fibonacci/golden-angle
 * distribution) so the 3D network view has genuine depth from every camera
 * angle, rather than a flat ring that only reads as "3D" from the side.
 */
export function sphereLayout(
  items: string[],
  radius = 4.2
): Map<string, [number, number, number]> {
  const count = Math.max(items.length, 1);
  const positions = new Map<string, [number, number, number]>();
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  items.forEach((id, i) => {
    if (count === 1) {
      positions.set(id, [0, 0, radius]);
      return;
    }
    const y = 1 - (i / (count - 1)) * 2; // top (1) to bottom (-1)
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * i;
    positions.set(id, [
      Math.cos(theta) * r * radius,
      y * radius * 0.82, // slightly oblate — reads better than a perfect sphere
      Math.sin(theta) * r * radius,
    ]);
  });

  return positions;
}
