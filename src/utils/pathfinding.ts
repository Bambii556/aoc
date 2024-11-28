/**
 * A* Pathfinding Algorithm
 * -----------------------
 * A* is like Dijkstra's but uses a heuristic to guide the search
 * towards the goal, making it more efficient for point-to-point pathfinding.
 */

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
 * When to use:
 * - Part of A* implementation
 * - Need min value from score map
 * - Priority queue not available
 *
 * When not to use:
 * - Large sets (use PriorityQueue)
 * - Different scoring system
 * - Need multiple min values
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
  const distances = new Map<number, number>();
  const pq = new PriorityQueue<number>();

  // Initialize
  distances.set(start, 0);
  pq.push(0, start);

  while (!pq.isEmpty()) {
    const current = pq.pop()!;
    const currentDist = distances.get(current)!;

    const neighbors = graph.get(current);
    if (!neighbors) continue;

    for (const [neighbor, weight] of neighbors) {
      const distance = currentDist + weight;

      if (!distances.has(neighbor) || distance < distances.get(neighbor)!) {
        distances.set(neighbor, distance);
        pq.push(distance, neighbor);
      }
    }
  }

  return distances;
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
  const queue: string[] = [start];
  const visited = new Set([start]);
  const parent = new Map<string, string>();

  let queueIndex = 0; // Track position in queue array

  while (queueIndex < queue.length) {
    const current = queue[queueIndex++];
    if (current === target) {
      // Reconstruct path
      const path: string[] = [];
      let node = current;
      while (node !== start) {
        path.unshift(node);
        node = parent.get(node)!;
      }
      path.unshift(start);
      return path;
    }

    for (const neighbor of getNeighbors(current)) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        parent.set(neighbor, current);
        queue.push(neighbor);
      }
    }
  }

  return null;
}

class PriorityQueue<T> {
  private heap: [number, T][] = [];

  push(priority: number, value: T) {
    const element: [number, T] = [priority, value];
    this.heap.push(element);
    this.bubbleUp(this.heap.length - 1);
  }

  pop(): T | undefined {
    if (this.heap.length === 0) return undefined;

    const result = this.heap[0][1];
    const last = this.heap.pop()!;

    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.bubbleDown(0);
    }

    return result;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  private bubbleUp(index: number) {
    while (index > 0) {
      const parentIndex = (index - 1) >>> 1;
      if (this.heap[parentIndex][0] <= this.heap[index][0]) break;

      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];
      index = parentIndex;
    }
  }

  private bubbleDown(index: number) {
    while (true) {
      let smallest = index;
      const leftChild = (index << 1) + 1;
      const rightChild = leftChild + 1;

      if (
        leftChild < this.heap.length &&
        this.heap[leftChild][0] < this.heap[smallest][0]
      ) {
        smallest = leftChild;
      }

      if (
        rightChild < this.heap.length &&
        this.heap[rightChild][0] < this.heap[smallest][0]
      ) {
        smallest = rightChild;
      }

      if (smallest === index) break;

      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      index = smallest;
    }
  }
}
