/**
 * A* Pathfinding Algorithm
 * -----------------------
 * A* is like Dijkstra's but uses a heuristic to guide the search
 * towards the goal, making it more efficient for point-to-point pathfinding.
 */

/**
 * A* pathfinding algorithm implementation.
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
  const openSet = new Set([start]);
  const cameFrom = new Map<string, string>();

  const gScore = new Map<string, number>(); // Distance from start to node
  gScore.set(start, 0);

  const fScore = new Map<string, number>(); // gScore + heuristic
  fScore.set(start, heuristic(start));

  while (openSet.size > 0) {
    const current = getLowestFScore(openSet, fScore);

    if (current === goal) {
      return reconstructPath(cameFrom, current);
    }

    openSet.delete(current);

    for (const neighbor of getNeighbors(current)) {
      // tentative_gScore = distance from start to neighbor through current
      const tentativeGScore = gScore.get(current)! +
        distance(current, neighbor);

      if (!gScore.has(neighbor) || tentativeGScore < gScore.get(neighbor)!) {
        // This path to neighbor is better than any previous one
        cameFrom.set(neighbor, current);
        gScore.set(neighbor, tentativeGScore);
        fScore.set(neighbor, tentativeGScore + heuristic(neighbor));
        openSet.add(neighbor);
      }
    }
  }

  return null; // No path found
}

/**
 * Helper function for A* to find node with lowest fScore.
 *
 * @example
 * const openSet = new Set(['A', 'B', 'C']);
 * const fScore = new Map([['A',10], ['B',5], ['C',8]]);
 * getLowestFScore(openSet, fScore) // Returns 'B'
 */
function getLowestFScore(
  openSet: Set<string>,
  fScore: Map<string, number>,
): string {
  let lowest = Infinity;
  let lowestNode = "";
  for (const node of openSet) {
    const score = fScore.get(node) ?? Infinity;
    if (score < lowest) {
      lowest = score;
      lowestNode = node;
    }
  }
  return lowestNode;
}

/**
 * Helper function for A* to reconstruct path from cameFrom map.
 *
 * @example
 * const cameFrom = new Map([['B','A'], ['C','B']]);
 * reconstructPath(cameFrom, 'C') // Returns ['A', 'B', 'C']
 */
function reconstructPath(
  cameFrom: Map<string, string>,
  current: string,
): string[] {
  const path = [current];
  while (cameFrom.has(current)) {
    current = cameFrom.get(current)!;
    path.unshift(current);
  }
  return path;
}

/**
 * Dijkstra's shortest path algorithm implementation.
 * Finds shortest distances from start node to all other nodes.
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
  const distances = new Map<number, number>();
  const visited = new Set<number>();
  const nodes = Array.from(graph.keys());

  // Initialize all distances to Infinity
  nodes.forEach((node) => distances.set(node, Infinity));
  distances.set(start, 0);

  while (visited.size < nodes.length) {
    // Find closest unvisited node
    let closest = -1;
    let closestDistance = Infinity;
    for (const node of nodes) {
      if (
        !visited.has(node) &&
        (distances.get(node) || Infinity) < closestDistance
      ) {
        closest = node;
        closestDistance = distances.get(node) || Infinity;
      }
    }

    if (closest === -1) break; // No reachable nodes left
    visited.add(closest); // Mark as visited

    // Update distances to all neighbors
    const neighbors = graph.get(closest) || new Map();
    for (const [neighbor, weight] of neighbors.entries()) {
      if (visited.has(neighbor)) continue;
      const distance = closestDistance + weight;
      if (distance < (distances.get(neighbor) || Infinity)) {
        distances.set(neighbor, distance);
      }
    }
  }

  return distances;
}

/**
 * Breadth-First Search implementation that returns shortest path.
 * Useful for finding shortest path in unweighted graphs.
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
  const queue: string[] = [start]; // Queue of nodes to visit
  const visited = new Set([start]); // Track visited nodes
  const parent = new Map<string, string>(); // Track path

  while (queue.length > 0) {
    const current = queue.shift()!; // Get next node to explore
    if (current === target) {
      // Found target, reconstruct path
      const path: string[] = [current];
      let node = current;
      while (parent.has(node)) {
        node = parent.get(node)!;
        path.unshift(node);
      }
      return path;
    }

    // Explore neighbors
    for (const neighbor of getNeighbors(current)) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        parent.set(neighbor, current);
        queue.push(neighbor);
      }
    }
  }
  return null; // No path found
}
