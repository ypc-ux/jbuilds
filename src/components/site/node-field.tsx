/**
 * The "graphology" motif: a field of nodes and edges rendered at three depths.
 * Positions come from a seeded generator rather than Math.random so the server
 * and client render identical markup.
 */

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

type Node = { x: number; y: number; r: number };

function buildLayer(seed: number, count: number, radius: [number, number]) {
  const rand = seeded(seed);
  const nodes: Node[] = [];
  for (let i = 0; i < count; i++) {
    nodes.push({
      x: rand() * 100,
      y: rand() * 100,
      r: radius[0] + rand() * (radius[1] - radius[0]),
    });
  }
  // Connect each node to its nearest neighbour — produces a sparse, organic
  // graph instead of a uniform mesh.
  const edges: [Node, Node][] = [];
  nodes.forEach((a, i) => {
    let bestIndex = -1;
    let bestDist = Infinity;
    nodes.forEach((b, j) => {
      if (i === j) return;
      const d = (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
      if (d < bestDist) {
        bestDist = d;
        bestIndex = j;
      }
    });
    if (bestIndex >= 0 && bestDist < 900) edges.push([a, nodes[bestIndex]]);
  });
  return { nodes, edges };
}

const LAYERS = [
  { seed: 7, count: 34, radius: [0.18, 0.4] as [number, number], depth: -0.34, opacity: 0.3 },
  { seed: 91, count: 20, radius: [0.32, 0.62] as [number, number], depth: -0.18, opacity: 0.55 },
  { seed: 415, count: 11, radius: [0.5, 0.95] as [number, number], depth: 0.16, opacity: 0.9 },
].map((l) => ({ ...l, ...buildLayer(l.seed, l.count, l.radius) }));

export function NodeField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {LAYERS.map((layer, i) => (
        <svg
          key={i}
          data-parallax
          data-depth={layer.depth}
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-[130%] w-full -translate-y-[8%]"
          style={{ opacity: layer.opacity }}
        >
          {layer.edges.map(([a, b], j) => (
            <line
              key={j}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="var(--color-signal)"
              strokeWidth={0.06}
              strokeOpacity={0.28}
            />
          ))}
          {layer.nodes.map((n, j) => (
            <circle key={j} cx={n.x} cy={n.y} r={n.r} fill="var(--color-signal)" fillOpacity={0.7} />
          ))}
        </svg>
      ))}
    </div>
  );
}
