import { getInputLines, log } from "../../utils/index.ts";
import { Solution } from "../../types.ts";

type Graph = Map<string, Set<string>>;

export const day23: Solution = {
  part1: async (input: string) => {
    const graph = parseGraph(input);

    const triangles = findTrianglesNodeIterator(graph);

    return Array.from(triangles)
      .filter((triangle) =>
        triangle.split(",").some((node) => node.startsWith("t"))
      ).length;
  },

  part2: async (input: string) => {
    const graph = parseGraph(input);

    const cliques = bronKerbosch(graph);

    const maxClique = cliques.reduce((max, current) =>
      current.size > max.size ? current : max
    );

    return [...maxClique].sort().join(",");
  },
};

function parseGraph(input: string) {
  const graph = new Map<string, Set<string>>();

  for (const line of input.trim().split("\n")) {
    const [a, b] = line.split("-");
    if (!graph.has(a)) graph.set(a, new Set());
    if (!graph.has(b)) graph.set(b, new Set());
    graph.get(a)!.add(b);
    graph.get(b)!.add(a);
  }

  return graph;
}

function findTrianglesNodeIterator(graph: Graph): Set<string> {
  const triangles = new Set<string>();
  const nodes = Array.from(graph.keys());

  for (const u of nodes) {
    const neighbors = graph.get(u)!;

    for (const v of neighbors) {
      if (v <= u) continue;

      for (const w of neighbors) {
        if (w <= v) continue;

        if (graph.get(v)!.has(w)) {
          triangles.add([u, v, w].sort().join(","));
        }
      }
    }
  }

  return triangles;
}

function bronKerbosch(
  graph: Graph,
  r: Set<string> = new Set(),
  p: Set<string> = new Set(graph.keys()),
  x: Set<string> = new Set(),
): Set<string>[] {
  const cliques: Set<string>[] = [];

  if (p.size === 0 && x.size === 0) {
    if (r.size > 0) cliques.push(new Set(r));
    return cliques;
  }

  // pivot
  const pivot = chooseFromSet(p.size > 0 ? p : x);
  const candidates = new Set([...p].filter((v) => !graph.get(pivot)!.has(v)));

  for (const v of candidates) {
    const newR = new Set(r).add(v);
    const newP = new Set([...p].filter((u) => graph.get(v)!.has(u)));
    const newX = new Set([...x].filter((u) => graph.get(v)!.has(u)));

    cliques.push(...bronKerbosch(graph, newR, newP, newX));

    p.delete(v);
    x.add(v);
  }

  return cliques;
}

function chooseFromSet(set: Set<string>): string {
  return [...set][0];
}
