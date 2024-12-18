import { createGrid, getInputLines, log } from "../../utils/index.ts";
import { Solution } from "../../types.ts";

type Point = {
  x: number;
  y: number;
};

export const day18: Solution = {
  part1: async (input: string) => {
    const { gridSize, bytes, bytesToFall } = parseInput(input);
    const grid = buildGrid(gridSize, bytes, bytesToFall);
    // log("\nInitial grid:");
    // printGrid(grid);

    const distance = findShortestPath(grid);

    return distance as number;
  },

  part2: async (input: string) => {
    const { gridSize, bytes } = parseInput(input);

    let byteCount = 0;
    while (true) {
      byteCount++;
      const grid = buildGrid(gridSize, bytes, byteCount);

      const distance = findShortestPath(grid);
      if (!distance) {
        break;
      }
    }
    return pointToKey(bytes[byteCount - 1]);
  },
};

function pointToKey(p: Point): string {
  return `${p.x},${p.y}`;
}

function isValidPoint(grid: string[][], point: Point): boolean {
  return point.x >= 0 &&
    point.x < grid[0].length &&
    point.y >= 0 &&
    point.y < grid.length &&
    grid[point.y][point.x] === ".";
}

function getNeighbors(grid: string[][], point: Point): Point[] {
  const neighbors: Point[] = [];
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // right, down, left, up

  for (const [dx, dy] of directions) {
    const newPoint = {
      x: point.x + dx,
      y: point.y + dy,
    };

    if (isValidPoint(grid, newPoint)) {
      neighbors.push(newPoint);
    }
  }
  return neighbors;
}

function findShortestPath(grid: string[][]): number | null {
  const height = grid.length;
  const width = grid[0].length;

  const start: Point = { x: 0, y: 0 };
  const end: Point = { x: width - 1, y: height - 1 };

  const queue: [Point, number][] = [[start, 0]];
  const visited = new Set<string>([pointToKey(start)]);

  while (queue.length > 0) {
    const [current, steps] = queue.shift()!;

    if (current.x === end.x && current.y === end.y) {
      return steps;
    }

    for (const neighbor of getNeighbors(grid, current)) {
      const key = pointToKey(neighbor);
      if (!visited.has(key)) {
        visited.add(key);
        queue.push([neighbor, steps + 1]);
      }
    }
  }

  return null;
}

function printGrid(grid: string[][]) {
  console.log(grid.map((row) => row.join("")).join("\n"));
}

function buildGrid(gridSize: Point, coords: Point[], bytesToFall: number) {
  const grid = createGrid(gridSize.x + 1, gridSize.y + 1, ".");

  for (let i = 0; i < bytesToFall; i++) {
    const point = coords[i];
    grid[point.y][point.x] = "#";
  }

  return grid;
}

function parseInput(
  input: string,
): { gridSize: Point; bytes: Point[]; bytesToFall: number } {
  const lines = getInputLines(input);

  const bytesToFall = parseInt(lines.shift()!);

  const gridSizes = lines.shift()!.split("x");

  const bytes = lines.map((line) => {
    const parts = line.split(",");
    return { x: parseInt(parts[0]), y: parseInt(parts[1]) } as Point;
  });

  return {
    gridSize: { x: parseInt(gridSizes[0]), y: parseInt(gridSizes[1]) },
    bytes,
    bytesToFall,
  };
}
