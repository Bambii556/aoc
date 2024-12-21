import { Solution } from "../../types.ts";
import { RegexPatterns } from "../../utils/utils.ts";

type Point = { x: number; y: number };
type NStates =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "A"
  | "E";
type DStates = "^" | ">" | "<" | "v" | "A" | "E";
type Direction = "^" | ">" | "<" | "v";

const numpad: Record<NStates, Point> = {
  "7": { x: 0, y: 0 },
  "8": { x: 0, y: 1 },
  "9": { x: 0, y: 2 },
  "4": { x: 1, y: 0 },
  "5": { x: 1, y: 1 },
  "6": { x: 1, y: 2 },
  "1": { x: 2, y: 0 },
  "2": { x: 2, y: 1 },
  "3": { x: 2, y: 2 },
  "E": { x: 3, y: 0 },
  "0": { x: 3, y: 1 },
  "A": { x: 3, y: 2 },
};

const dpad: Record<DStates, Point> = {
  "E": { x: 0, y: 0 },
  "^": { x: 0, y: 1 },
  "A": { x: 0, y: 2 },
  "<": { x: 1, y: 0 },
  "v": { x: 1, y: 1 },
  ">": { x: 1, y: 2 },
};

const directions: Record<Direction, Point> = {
  "^": { x: -1, y: 0 },
  ">": { x: 0, y: 1 },
  "<": { x: 0, y: -1 },
  "v": { x: 1, y: 0 },
};

export const day21: Solution = {
  part1: async (input: string) => {
    const codes = parseInput(input);
    const sum = solveRobots(codes, 1);
    return sum;
  },

  part2: async (input: string) => {
    const codes = parseInput(input);
    const sum = solveRobots(codes, 1);
    return sum;
  },
};

function parseInput(input: string) {
  const codes = input.split("\n").filter((line) => line.trim());
  return codes;
}

function solveRobots(codes: string[], robots: number) {
  const memo = new Map<string, number>();
  let sum = 0;

  for (const code of codes) {
    const sequences = getNextSequence(numpad, code, robots, memo);
    const codeNumber = parseInt(
      code.match(RegexPatterns.numbers)?.[0] ?? "0",
    );
    sum += codeNumber * sequences;
  }

  return sum;
}

function getNextSequence(
  positions: typeof numpad | typeof dpad,
  ixs: string,
  iter: number,
  memo: Map<string, number>,
): number {
  const key = `${ixs},${iter}`;

  type T = NStates & DStates;

  if (memo.has(key)) {
    return memo.get(key)!;
  }

  let start = positions.A;
  let len = 0;

  for (let i = 0; i < ixs.length; i++) {
    const paths = bfs(start, positions[ixs[i] as T], positions)!;
    if (iter === 0) {
      len += paths[0].length;
    } else {
      len += Math.min(
        ...paths.map((ixs) => getNextSequence(dpad, ixs, iter - 1, memo)),
      );
    }
    start = positions[ixs[i] as T];
  }

  memo.set(key, len);
  return len;
}

function bfs(
  start: Point,
  end: Point,
  positions: typeof numpad | typeof dpad,
): string[] {
  // press the button
  if (start.x === end.x && start.y === end.y) {
    return ["A"];
  }

  type State = { point: Point; path: string };

  const isInBounds = (p: Point) =>
    Object.values(positions).some(({ x, y }) => p.x === x && p.y === y);

  const paths: string[] = [];
  const queue: State[] = [{ point: start, path: "" }];
  const distances = new Map<string, number>();

  while (queue.length > 0) {
    const curr = queue.shift();
    if (!curr) break;

    const { point, path } = curr;
    const { x, y } = point;
    const forbiddenPosition = positions.E;
    const key = `${x},${y}`;

    if (x === end.x && y === end.y) {
      paths.push(path + "A");
    }

    if (distances.has(key) && distances.get(key)! < path.length) {
      continue;
    }

    for (const [symbol, dir] of Object.entries(directions)) {
      const neighbour = { x: x + dir.x, y: y + dir.y };
      const neighbourKey = `${neighbour.x},${neighbour.y}`;
      if (
        isInBounds(neighbour) &&
        !(forbiddenPosition.x === neighbour.x &&
          forbiddenPosition.y === neighbour.y) &&
        (!distances.has(neighbourKey) ||
          distances.get(neighbourKey)! >= path.length + 1)
      ) {
        queue.push({ point: neighbour, path: `${path}${symbol}` });
        distances.set(neighbourKey, path.length + 1);
      }
    }
  }

  return paths.sort((a, b) => a.length - b.length);
}
