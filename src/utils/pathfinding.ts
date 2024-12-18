/**
 * A* Pathfinding Algorithm
 * -----------------------
 * A* is like Dijkstra's but uses a heuristic to guide the search
 * towards the goal, making it more efficient for point-to-point pathfinding.
 * Uses optimized PriorityQueue and Map operations
 */

import PriorityQueue from "./classes/PriorityQueue.ts";

/**
 * A* pathfinding algorithm implementation.
 *
 * When to use:
 * - Need optimal path with weighted edges
 * - Have a good heuristic estimate to goal
 * - Grid/maze navigation with varying costs
 * - Large search spaces where efficiency matters
 * - Need to consider movement costs + distance to goal
 *
 * When not to use:
 * - No good heuristic available
 * - Unweighted graphs (use BFS instead)
 * - Need all possible paths
 * - Memory constrained (stores lots of state)
 * - Small search spaces (BFS might be simpler)
 *
 * @param start - Starting node
 * @param goal - Target node
 * @param getNeighbors - Function that returns neighboring nodes
 * @param heuristic - Function that estimates distance to goal
 * @param distance - Function that returns actual distance between neighbors
 *
 * @example
 * const getNeighbors = (node: string) => ['adjacent', 'nodes'];
 * const heuristic = (node: string) => // estimated distance to goal
 * const distance = (a: string, b: string) => // actual distance
 * aStar('start', 'end', getNeighbors, heuristic, distance)
 *
 * How it works:
 * 1. Maintains open set of nodes to explore
 * 2. For each node, tracks:
 *    - gScore: actual distance from start
 *    - fScore: gScore + estimated distance to goal
 * 3. Always explores node with lowest fScore
 */
export function aStar(
  start: string,
  goal: string,
  getNeighbors: (node: string) => string[],
  heuristic: (node: string) => number,
  distance: (a: string, b: string) => number,
): string[] | null {
  const pq = new PriorityQueue<string>();
  const cameFrom = new Map<string, string>();
  const gScore = new Map<string, number>();
  const closed = new Set<string>();

  gScore.set(start, 0);
  pq.push(heuristic(start), start);

  while (!pq.isEmpty()) {
    const current = pq.pop()!;

    if (current === goal) {
      return reconstructPath(cameFrom, current);
    }

    if (closed.has(current)) continue;
    closed.add(current);

    const currentGScore = gScore.get(current)!;

    for (const neighbor of getNeighbors(current)) {
      if (closed.has(neighbor)) continue;

      const tentativeGScore = currentGScore + distance(current, neighbor);
      const neighborGScore = gScore.get(neighbor) ?? Infinity;

      if (tentativeGScore < neighborGScore) {
        cameFrom.set(neighbor, current);
        gScore.set(neighbor, tentativeGScore);
        const fScore = tentativeGScore + heuristic(neighbor);
        pq.push(fScore, neighbor);
      }
    }
  }

  return null;
}

/**
 * Helper function for A* to reconstruct path from cameFrom map.
 *
 * When to use:
 * - After A* finds goal
 * - Need full path from start to end
 * - Using parent pointer approach
 *
 * When not to use:
 * - Only need distance
 * - Different path format needed
 * - Memory constraints
 *
 * @example
 * const cameFrom = new Map([['B','A'], ['C','B']]);
 * reconstructPath(cameFrom, 'C') // Returns ['A', 'B', 'C']
 */
export function reconstructPath(
  cameFrom: Map<string, string>,
  current: string,
): string[] {
  const path = new Array<string>(cameFrom.size + 1);
  let pathLength = 0;

  while (cameFrom.has(current)) {
    path[pathLength++] = current;
    current = cameFrom.get(current)!;
  }
  path[pathLength++] = current;

  // Reverse in place
  for (let i = 0; i < pathLength >> 1; i++) {
    const temp = path[i];
    path[i] = path[pathLength - 1 - i];
    path[pathLength - 1 - i] = temp;
  }

  return path.slice(0, pathLength);
}

/**
 * Dijkstra's shortest path algorithm implementation.
 * Finds shortest distances from start node to all other nodes.
 *
 * When to use:
 * - Edges have different weights
 * - Finding shortest path with costs
 * - Network/routing problems
 * - Need minimum cost path
 *
 * When not to use:
 * - Unweighted graphs (use BFS)
 * - Negative edge weights (use Bellman-Ford)
 * - Need all paths
 * - Memory constrained
 *
 * @param start - Starting node
 * @param graph - Map where keys are nodes and values are Maps of neighbor->weight
 * @returns Map of node->shortest distance from start
 *
 * @example
 * const graph = new Map([
 *   [1, new Map([[2, 5], [3, 2]])],
 *   [2, new Map([[3, 1]])],
 *   [3, new Map()]
 * ]);
 * dijkstra(1, graph) // Returns distances from node 1 to all others
 *
 * How it works:
 * 1. Initialize all distances to Infinity except start (0)
 * 2. While unvisited nodes remain:
 *   - Pick unvisited node with smallest distance
 *   - Mark it as visited
 *   - Update distances to its neighbors
 */
export function dijkstra(
  start: number,
  graph: Map<number, Map<number, number>>,
): Map<number, number> {
  const distances = new Map<string, number>();
  const pq = new PriorityQueue<number>();
  const visited = new Set<number>();

  distances.set(start.toString(), 0);
  pq.push(0, start);

  while (!pq.isEmpty()) {
    const current = pq.pop()!;

    if (visited.has(current)) continue;
    visited.add(current);

    const currentDist = distances.get(current.toString())!;
    const neighbors = graph.get(current);

    if (!neighbors) continue;

    for (const [neighbor, weight] of neighbors) {
      if (visited.has(neighbor)) continue;

      const distance = currentDist + weight;
      const neighborKey = neighbor.toString();
      const existingDist = distances.get(neighborKey) ?? Infinity;

      if (distance < existingDist) {
        distances.set(neighborKey, distance);
        pq.push(distance, neighbor);
      }
    }
  }

  return new Map(
    Array.from(distances.entries()).map(([k, v]) => [parseInt(k), v]),
  );
}

/**
 * Breadth-First Search implementation that returns shortest path.
 * Useful for finding shortest path in unweighted graphs.
 *
 * When to use:
 * - Finding shortest path
 * - All edges have equal weight
 * - Need level-by-level traversal
 * - Grid/maze navigation
 *
 * When not to use:
 * - Edges have different weights (use Dijkstra)
 * - Need all possible paths (use DFS)
 * - Memory constrained (large graphs)
 * - Need path with specific constraints
 *
 * @param start - Starting node
 * @param target - Target node to find
 * @param getNeighbors - Function that returns neighbors of a node
 * @returns Array of nodes representing path, or null if no path exists
 *
 * @example
 * const getNeighbors = (node: string) => ['possible', 'next', 'nodes'];
 * bfs('start', 'end', getNeighbors)
 */
export function bfs(
  start: string,
  target: string,
  getNeighbors: (node: string) => string[],
): string[] | null {
  // Pre-allocate arrays for better performance
  const queue = new Array<string>(1000);
  let front = 0;
  let rear = 0;

  queue[rear++] = start;

  const visited = new Set([start]);
  const parent = new Map<string, string>();

  while (front < rear) {
    const current = queue[front++];

    if (current === target) {
      return reconstructPath(parent, current);
    }

    for (const neighbor of getNeighbors(current)) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        parent.set(neighbor, current);
        queue[rear++] = neighbor;
      }
    }
  }

  return null;
}
