import PriorityQueue from "./PriorityQueue.ts";

export default class Graph<T> {
  // Stores connections between vertices
  // Each vertex maps to an array of its connected vertices
  private adjacencyList: Map<T, T[]>;

  constructor() {
    this.adjacencyList = new Map();
  }

  /**
   * Adds a new vertex to the graph.
   * Use when: Adding new locations/states that will be connected
   * Don't use: For vertices that already exist
   * Example: Adding rooms to a maze, adding states to a game
   * @param vertex The vertex to add
   */
  addVertex(vertex: T): void {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }

  /**
   * Creates a bidirectional connection between two vertices
   * Use when: Connecting two points that can be traversed in both directions
   * Don't use: For one-way connections
   * Example: Connecting adjacent rooms, connecting game states
   * @param vertex1 First vertex to connect
   * @param vertex2 Second vertex to connect
   */
  addEdge(vertex1: T, vertex2: T): void {
    this.adjacencyList.get(vertex1)?.push(vertex2);
    this.adjacencyList.get(vertex2)?.push(vertex1);
  }

  /**
   * Performs a breadth-first search starting from a given vertex
   * Use when: Finding shortest paths in unweighted graphs, exploring level by level
   * Don't use: When paths have different costs or weights
   * Example: Finding nearest items, exploring a maze layer by layer
   * @param start Starting vertex
   * @param visitor Function called for each visited vertex
   */
  bfs(start: T, visitor: (node: T) => void): void {
    const visited = new Set<T>();
    const queue: T[] = [start];

    while (queue.length > 0) {
      const vertex = queue.shift()!;
      if (!visited.has(vertex)) {
        visited.add(vertex);
        visitor(vertex);
        const neighbors = this.adjacencyList.get(vertex) || [];
        queue.push(...neighbors);
      }
    }
  }

  /**
   * Performs a depth-first search starting from a given vertex
   * Use when: Exploring all possible paths, finding if any path exists
   * Don't use: For finding shortest paths or level-based exploration
   * Example: Mapping all possible game states, finding all solutions
   * @param start Starting vertex
   * @param visitor Function called for each visited vertex
   */
  dfs(start: T, visitor: (node: T) => void): void {
    const visited = new Set<T>();

    const dfsHelper = (vertex: T): void => {
      visited.add(vertex);
      visitor(vertex);
      const neighbors = this.adjacencyList.get(vertex) || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          dfsHelper(neighbor);
        }
      }
    };

    dfsHelper(start);
  }

  /**
   * Finds the shortest path using Dijkstra's algorithm with custom rules
   * Use when: Need optimal path with weights, complex movement rules
   * Don't use: For simple unweighted pathfinding (use BFS instead)
   * Example: Finding path with elevation constraints, finding cheapest path
   * @param start Starting vertex
   * @param isEnd Function to determine if vertex is the goal
   * @param getNeighbors Function to get valid neighbors for a vertex
   * @param getCost Function to determine cost between vertices (default: 1)
   * @returns Path and total cost, or null if no path exists
   */
  findShortestPath(
    start: T,
    isEnd: (node: T) => boolean,
    getNeighbors: (node: T) => T[],
    getCost: (from: T, to: T) => number = () => 1,
  ): { path: T[]; cost: number } | null {
    const distances = new Map<string, number>();
    const previous = new Map<string, T>();
    const queue = new PriorityQueue<T>();

    const getKey = (node: T) => JSON.stringify(node);
    distances.set(getKey(start), 0);
    queue.push(0, start); // Changed from enqueue to push

    while (!queue.isEmpty()) { // Changed from size() > 0
      const current = queue.pop(); // Changed from dequeue
      if (!current) break;

      const currentKey = getKey(current);
      const currentDist = distances.get(currentKey) || Infinity;

      if (isEnd(current)) {
        const path: T[] = [];
        let currentNode = current;
        while (currentNode !== start) {
          path.unshift(currentNode);
          currentNode = previous.get(getKey(currentNode))!;
        }
        path.unshift(start);
        return { path, cost: currentDist };
      }

      for (const neighbor of getNeighbors(current)) {
        const neighborKey = getKey(neighbor);
        const cost = getCost(current, neighbor);
        const newDist = currentDist + cost;

        if (
          !distances.has(neighborKey) || newDist < distances.get(neighborKey)!
        ) {
          distances.set(neighborKey, newDist);
          previous.set(neighborKey, current);
          queue.push(newDist, neighbor); // Changed from enqueue
        }
      }
    }

    return null;
  }
}
