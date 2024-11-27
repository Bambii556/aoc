/**
 * Grid/Graph Helper Functions
 * --------------------------
 * Functions for working with 2D grids and graph-like structures
 */

/**
 * Returns the four adjacent coordinates (up, right, down, left) for a given point.
 * Commonly used in grid-based puzzles where diagonal movement isn't allowed.
 *
 * @example
 * getAdjacent(1, 1) // Returns [[1,0], [2,1], [1,2], [0,1]]
 */
export function getAdjacent(x: number, y: number): [number, number][] {
  return [
    [x, y - 1], // up
    [x + 1, y], // right
    [x, y + 1], // down
    [x - 1, y], // left
  ];
}

/**
 * Returns all eight adjacent coordinates including diagonals.
 * Useful for games like Game of Life or when diagonal movement is allowed.
 *
 * @example
 * getAdjacentWithDiagonals(1, 1)
 * // Returns [[0,0], [1,0], [2,0], [0,1], [2,1], [0,2], [1,2], [2,2]]
 */
export function getAdjacentWithDiagonals(
  x: number,
  y: number,
): [number, number][] {
  return [
    [x - 1, y - 1], // up-left
    [x, y - 1], // up
    [x + 1, y - 1], // up-right
    [x - 1, y], // left
    [x + 1, y], // right
    [x - 1, y + 1], // down-left
    [x, y + 1], // down
    [x + 1, y + 1], // down-right
  ];
}

/**
 * Checks if given coordinates are within the bounds of a grid.
 * Prevents array out-of-bounds errors in grid traversal.
 *
 * @example
 * const grid = [[1,2], [3,4]];
 * isInBounds(0, 0, grid) // true
 * isInBounds(2, 2, grid) // false
 */
// deno-lint-ignore no-explicit-any
export function isInBounds(x: number, y: number, grid: any[][]): boolean {
  return x >= 0 && x < grid[0].length && y >= 0 && y < grid.length;
}

/**
 * Convert a point to a string key for use in Maps/Sets.
 * Useful for caching or storing points as unique identifiers.
 *
 * @example
 * const point = pointToString(2, 3); // Returns "2,3"
 * const visited = new Set<string>();
 * visited.add(pointToString(x, y));
 *
 * Common use cases:
 * - Tracking visited positions in grid traversal
 * - Creating unique keys for coordinate pairs
 * - Converting points for Set/Map storage
 */
export function pointToString(x: number, y: number): string {
  return `${x},${y}`;
}

/**
 * Convert a string key back to point coordinates.
 * Inverse of pointToString function.
 *
 * @example
 * const [x, y] = stringToPoint("2,3"); // Returns [2, 3]
 *
 * Common use cases:
 * - Retrieving coordinates from cached points
 * - Converting stored points back to coordinates
 * - Processing point data from string format
 */
export function stringToPoint(str: string): [number, number] {
  const [x, y] = str.split(",").map(Number);
  return [x, y];
}

/**
 * Calculate Manhattan distance between two points.
 * Manhattan distance is the sum of absolute differences of coordinates.
 * Also known as L1 distance or taxicab distance.
 *
 * @example
 * manhattanDistance(1, 1, 4, 5) // Returns 7
 * // Because |1-4| + |1-5| = 3 + 4 = 7
 *
 * How it works:
 * - Takes absolute difference of x coordinates
 * - Takes absolute difference of y coordinates
 * - Sums these differences
 *
 * Common use cases:
 * - Path finding in grid-based puzzles
 * - Calculating minimum steps between points
 * - Measuring distance when diagonal moves aren't allowed
 */
export function manhattanDistance(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): number {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}
