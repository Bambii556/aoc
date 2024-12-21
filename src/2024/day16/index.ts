import { findFirstOccurrencesIndexInGrid, log } from "../../utils/index.ts";
import { Solution } from "../../types.ts";
import { parseGrid } from "../../utils/input.ts";

type Grid = string[][];
type Direction = `>` | `<` | `^` | `v`;
type Reindeer = {
  row: number;
  col: number;
  direction: Direction;
  cost: number;
  path?: Set<string>;
};

// Direction helpers
const moves: Record<Direction, [number, number]> = {
  "^": [0, -1],
  ">": [1, 0],
  "v": [0, 1],
  "<": [-1, 0],
};

const turns: Record<Direction, [Direction, Direction]> = {
  "^": ["<", ">"],
  ">": ["^", "v"],
  "v": [">", "<"],
  "<": ["v", "^"],
};

export const day16: Solution = {
  part1: async (input: string) => {
    const map = parseGrid(input) as Grid;

    const cost = solveMap(map);
    return cost;
  },

  part2: async (input: string) => {
    const map = parseGrid(input);

    const cost = solveMapPart2(map);
    return cost;
  },
};

function solveMap(map: Grid): number {
  const start = findFirstOccurrencesIndexInGrid(map, "S")!;
  const end = findFirstOccurrencesIndexInGrid(map, "E")!;

  const reindeer: Reindeer = {
    row: start.row,
    col: start.col,
    direction: ">",
    cost: 0,
  };

  const queue: Reindeer[] = [reindeer];
  const seen = new Set<string>();

  let bestCost = Infinity;

  while (queue.length > 0) {
    // Get state with lowest cost (sort is simple but not efficient for large mazes)
    queue.sort((a, b) => a.cost - b.cost);
    const current = queue.shift()!;

    const stateKey = `${current.col},${current.row},${current.direction}`;
    if (seen.has(stateKey)) continue;
    seen.add(stateKey);

    // Check if we reached the end
    if (current.col === end.col && current.row === end.row) {
      bestCost = Math.min(bestCost, current.cost);
      continue;
    }

    const [mCol, mRow] = moves[current.direction];
    const newCol = current.col + mCol;
    const newRow = current.row + mRow;

    if (
      newCol >= 0 && newRow >= 0 &&
      newCol < map[0].length && newRow < map.length &&
      map[newRow][newCol] !== "#"
    ) {
      queue.push({
        col: newCol,
        row: newRow,
        direction: current.direction,
        cost: current.cost + 1,
      });
    }
    for (const newDir of turns[current.direction]) {
      queue.push({
        col: current.col,
        row: current.row,
        direction: newDir,
        cost: current.cost + 1000,
      });
    }
  }

  return bestCost;
}

function solveMapPart2(map: Grid): number {
  const start = findFirstOccurrencesIndexInGrid(map, "S")!;
  const end = findFirstOccurrencesIndexInGrid(map, "E")!;

  const reindeer: Reindeer = {
    row: start.row,
    col: start.col,
    direction: ">",
    cost: 0,
    path: new Set([`${start.row},${start.col}`]),
  };

  const queue: Reindeer[] = [reindeer];
  const seen = new Map<string, number>();
  let bestCost = Infinity;
  const optimalPaths = new Set<string>();

  while (queue.length > 0) {
    queue.sort((a, b) => a.cost - b.cost);
    const current = queue.shift()!;

    if (bestCost !== Infinity && current.cost > bestCost) continue;

    const stateKey = `${current.col},${current.row},${current.direction}`;
    const prevCost = seen.get(stateKey) ?? Infinity;

    if (current.cost > prevCost) continue;

    seen.set(stateKey, current.cost);

    // if end
    if (current.col === end.col && current.row === end.row) {
      if (current.cost <= bestCost) {
        if (current.cost < bestCost) {
          bestCost = current.cost;
          optimalPaths.clear();
        }
        for (const coord of current.path!) {
          optimalPaths.add(coord);
        }
      }
      continue;
    }

    const [mCol, mRow] = moves[current.direction];
    const newCol = current.col + mCol;
    const newRow = current.row + mRow;

    if (
      newCol >= 0 && newRow >= 0 &&
      newCol < map[0].length && newRow < map.length &&
      map[newRow][newCol] !== "#"
    ) {
      const newPath = new Set(current.path);
      newPath.add(`${newRow},${newCol}`);

      queue.push({
        col: newCol,
        row: newRow,
        direction: current.direction,
        cost: current.cost + 1,
        path: newPath,
      });
    }

    // Try turning
    for (const newDir of turns[current.direction]) {
      queue.push({
        col: current.col,
        row: current.row,
        direction: newDir,
        cost: current.cost + 1000,
        path: new Set(current.path),
      });
    }
  }

  // for debug
  const display = map.map((row) => [...row]);
  for (const coord of optimalPaths) {
    const [row, col] = coord.split(",").map(Number);
    if (map[row][col] !== "S" && map[row][col] !== "E") {
      display[row][col] = "O";
    }
  }

  log("Best paths:");
  log("=".repeat(50));
  for (const row of display) {
    log(row.join(""));
  }
  log("=".repeat(50));

  return optimalPaths.size;
}
