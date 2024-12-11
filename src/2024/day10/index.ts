import { getAdjacent, isInBounds, log, parseGrid } from "../../utils/index.ts";
import { Solution } from "../../types.ts";

type Grid = number[][];

export const day10: Solution = {
  part1: async (input: string) => {
    const grid = parseGrid(input).map((row) =>
      row.map((value) => parseInt(value))
    );

    let totalScore = 0;
    // Find all trailheads (positions with value 0)
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col] === 0) {
          // Get reachable 9s from this trailhead
          const reachable9s = findReachableNines(grid, row, col);
          totalScore += reachable9s.size; // Score is number of unique 9s reachable
        }
      }
    }

    return totalScore;
  },

  part2: async (input: string) => {
    const grid = parseGrid(input).map((row) =>
      row.map((value) => parseInt(value))
    );

    let totalRating = 0;
    // Find all trailheads (positions with value 0)
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col] === 0) {
          // Count total unique paths from this trailhead
          const paths = countUniquePaths(grid, row, col);
          totalRating += paths;
        }
      }
    }

    return totalRating;
  },
};

function countUniquePaths(map: Grid, row: number, col: number): number {
  const currentPath = new Set<string>();
  let pathCount = 0;

  function explore(currentRow: number, currentCol: number) {
    const pos = `${currentRow},${currentCol}`;
    if (currentPath.has(pos)) return;

    currentPath.add(pos);

    // If we've reached a 9, we found a complete path
    if (map[currentRow][currentCol] === 9) {
      pathCount++;
      currentPath.delete(pos);
      return;
    }

    // Check adjacent positions
    getAdjacent(currentRow, currentCol).forEach(([nextRow, nextCol]) => {
      if (!isInBounds(nextRow, nextCol, map)) return;

      // Must increase by exactly 1
      if (map[nextRow][nextCol] === map[currentRow][currentCol] + 1) {
        explore(nextRow, nextCol);
      }
    });

    currentPath.delete(pos);
  }

  explore(row, col);
  return pathCount;
}

function findReachableNines(map: Grid, row: number, col: number): Set<string> {
  // Track unique 9s we can reach
  const reachableNines = new Set<string>();
  // Track current path to avoid cycles
  const currentPath = new Set<string>();

  function explore(
    currentRow: number,
    currentCol: number,
    currentHeight: number,
  ) {
    const pos = `${currentRow},${currentCol}`;
    if (currentPath.has(pos)) return;

    currentPath.add(pos);

    // If we've reached a 9, record it
    if (map[currentRow][currentCol] === 9) {
      reachableNines.add(pos);
      currentPath.delete(pos);
      return;
    }

    // Check adjacent positions
    getAdjacent(currentRow, currentCol).forEach(([nextRow, nextCol]) => {
      if (!isInBounds(nextRow, nextCol, map)) return;

      // Must increase by exactly 1
      if (map[nextRow][nextCol] === currentHeight + 1) {
        explore(nextRow, nextCol, map[nextRow][nextCol]);
      }
    });

    currentPath.delete(pos);
  }

  explore(row, col, 0);
  return reachableNines;
}
