import { getInputLines, Log, parseGrid } from "../../utils/index.ts";
import { Solution } from "../../types.ts";

type Grid = string[][];

type Point = {
  x: number;
  y: number;
  frequency: string;
};

export const day8: Solution = {
  part1: async (input: string) => {
    const grid = parseGrid(input) as Grid;

    const frequencies = getAllFrequencies(grid);

    const resPoints = findResonantPoints(frequencies, grid);

    return resPoints.size;
  },

  part2: async (input: string) => {
    const grid = parseGrid(input) as Grid;

    const frequencies = getAllFrequencies(grid);

    const resPoints = findResonantPoints(frequencies, grid, true);

    return resPoints.size;
  },
};

function findResonantPoints(
  frequencies: Map<string, Point[]>,
  grid: Grid,
  includeHarmonics = false,
) {
  const resonantPoints = new Set<string>();

  for (const [frequency, points] of frequencies) {
    if (points.length < 2) continue;

    if (includeHarmonics) {
      points.forEach((p) => resonantPoints.add(`${p.x},${p.y}`));
    }

    // For each pair of points with the same frequency
    for (let i = 0; i < points.length; i++) {
      for (let j = 0; j < points.length; j++) {
        const p1 = points[i];
        const p2 = points[j];

        // Skip if same point
        if (isSamePoint(p1, p2)) {
          continue;
        }

        // Check every point in the grid for resonance
        for (let x = 0; x < grid.length; x++) {
          for (let y = 0; y < grid[x].length; y++) {
            const testPoint: Point = { x, y, frequency };

            // Skip if not collinear
            if (!areCollinear(testPoint, p1, p2)) {
              continue;
            }

            // Check if distances match the 2:1 ratio
            if (includeHarmonics || checkDistanceRatio(testPoint, p1, p2)) {
              resonantPoints.add(`${x},${y}`);
            }
          }
        }
      }
    }
  }

  return resonantPoints;
}

function getAllFrequencies(grid: Grid) {
  const frequencies = new Map<string, Point[]>();
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      const element = grid[x][y];

      if (/[a-zA-Z0-9]/.test(element)) {
        if (!frequencies.has(element)) {
          frequencies.set(element, []);
        }

        frequencies.get(element)!.push({
          x,
          y,
          frequency: element,
        });
      }
    }
  }

  return frequencies;
}

function getDistance(p1: Point, p2: Point): number {
  return Math.sqrt(
    Math.pow(p2.x - p1.x, 2) +
      Math.pow(p2.y - p1.y, 2),
  );
}

function areCollinear(p1: Point, p2: Point, p3: Point): boolean {
  const area = Math.abs(
    (p1.x * (p2.y - p3.y) +
      p2.x * (p3.y - p1.y) +
      p3.x * (p1.y - p2.y)) / 2,
  );
  return Math.abs(area) < 0.0001; // Using epsilon for floating point comparison
}

function isSamePoint(p1: Point, p2: Point) {
  return p1.frequency === p2.frequency && p1.x === p2.x && p1.y === p2.y;
}

function checkDistanceRatio(
  testPoint: Point,
  antenna1: Point,
  antenna2: Point,
): boolean {
  const dist1 = getDistance(testPoint, antenna1);
  const dist2 = getDistance(testPoint, antenna2);

  // Check if one distance is twice the other (within floating point epsilon)
  const epsilon = 0.0001;
  const ratio = Math.max(dist1, dist2) / Math.min(dist1, dist2);
  return Math.abs(ratio - 2) < epsilon;
}
