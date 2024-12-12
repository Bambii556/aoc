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
const ADJACENT_COORDS = [[-1, 0], [1, 0], [0, -1], [0, 1]];
export function getAdjacent(x: number, y: number): [number, number][] {
  return ADJACENT_COORDS.map(([dx, dy]) => [x + dx, y + dy]);
}

/**
 * Returns all eight adjacent coordinates including diagonals.
 * Useful for games like Game of Life or when diagonal movement is allowed.
 *
 * @example
 * getAdjacentWithDiagonals(1, 1)
 * // Returns [[0,0], [1,0], [2,0], [0,1], [2,1], [0,2], [1,2], [2,2]]
 */
const DIAGONAL_COORDS = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];
export function getAdjacentWithDiagonals(
  x: number,
  y: number,
): [number, number][] {
  return DIAGONAL_COORDS.map(([dx, dy]) => [x + dx, y + dy]);
}

const TOP_BOTTOM_COORDS: [number, number][] = [
  [-1, -1], // top left
  [0, -1], // top middle
  [1, -1], // top right
  [-1, 1], // bottom left
  [0, 1], // bottom middle
  [1, 1], // bottom right
];

export function getAdjacentWithTopAndBottom(
  x: number,
  y: number,
): [number, number][] {
  return TOP_BOTTOM_COORDS.map(([dx, dy]) => [x + dx, y + dy]);
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
export function isInBounds<T>(
  row: number,
  col: number,
  grid: T[][],
): boolean {
  return col >= 0 && col < grid[0].length && row >= 0 && row < grid.length;
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
export function stringToPoint(
  str: string,
  delimiter: string = ",",
): [number, number] {
  const [x, y] = str.split(delimiter).map(Number);
  return [x, y];
}

/**
 * Calculate Manhattan distance between two points.
 * Manhattan distance is the sum of absolute differences of coordinates.
 * Also known as L1 distance or taxicab distance.
 *
 * When to use:
 * - Grid-based movement with only cardinal directions (no diagonals)
 * - Finding minimum steps between points on a grid
 * - Distance calculations in maze/path problems
 * - When diagonal movement is not allowed
 * - Computing distances in 2D coordinate systems
 *
 * When not to use:
 * - Diagonal movement is allowed (use Euclidean distance)
 * - Need exact geometric distance
 * - Working in 3D space
 * - Need curved/non-grid paths
 * - When movement costs are not uniform
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

/**
 * Rotate a grid 90 degrees clockwise
 *
 * When to use:
 * - Pattern matching with rotations
 * - Grid transformation puzzles
 * - Need to check all orientations
 * - Mirror/symmetry problems
 *
 * When not to use:
 * - Large grids (memory intensive)
 * - Non-square grids
 * - Simple grid traversal
 *
 * @example
 * // Rotate a simple grid
 * const grid = [
 *   [1, 2],
 *   [3, 4]
 * ];
 * rotateGrid(grid)
 * // Returns: [
 * //   [3, 1],
 * //   [4, 2]
 * // ]
 *
 * // Check all rotations for pattern
 * let currentGrid = grid;
 * for (let i = 0; i < 4; i++) {
 *   if (checkPattern(currentGrid)) break;
 *   currentGrid = rotateGrid(currentGrid);
 * }
 *
 * // Find symmetrical patterns
 * const isSymmetrical = grid.toString() === rotateGrid(grid).toString();
 */
export function rotateGrid<T>(grid: T[][]): T[][] {
  const N = grid.length;
  const rotated = Array(N).fill(0).map(() => Array(N).fill(0));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      rotated[j][N - 1 - i] = grid[i][j];
    }
  }

  return rotated;
}

/**
 * Count occurrences of a value in a 2D array
 *
 * When to use:
 * - Need to count specific elements in grid
 * - Finding frequency of items in 2D array
 * - Grid pattern analysis
 *
 * @example
 * const grid = [['A','B','A'], ['A','C','B']]
 * countInGrid(grid, 'A') // Returns 3
 *
 * const numGrid = [[1,2,1], [1,3,2]]
 * countInGrid(numGrid, 1) // Returns 3
 */
export function countInGrid<T>(grid: T[][], value: T): number {
  return grid.reduce(
    (count, row) =>
      count +
      row.reduce((rowCount, cell) => rowCount + (cell === value ? 1 : 0), 0),
    0,
  );
}

/**
 * Finds the first occurrence of a value in a 2D grid
 * @param grid The 2D grid to search
 * @param value The value to search for
 * @returns The position of the first occurrence or null if not found
 */
export function findFirstIndexInGrid<T>(
  grid: T[][],
  value: T,
): [number, number] | null {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === value) {
        return [row, col];
      }
    }
  }
  return null;
}

/**
 * Finds all occurrences of a value in a 2D grid
 * @param grid The 2D grid to search
 * @param value The value to search for
 * @returns Array of positions where the value was found
 */
export function findAllIndexesInGrid<T>(
  grid: T[][],
  value: T,
): [number, number][] {
  const positions: [number, number][] = [];

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === value) {
        positions.push([row, col]);
      }
    }
  }

  return positions;
}
