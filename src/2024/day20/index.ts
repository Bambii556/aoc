import { Solution } from "../../types.ts";
import { ADJACENT_COORDS } from "../../utils/index.ts";

class Location {
  constructor(public row: number, public col: number) {}

  move(moveDir: number[]): Location {
    return new Location(this.row + moveDir[1], this.col + moveDir[0]);
  }

  equals(other: Location): boolean {
    return this.row === other.row && this.col === other.col;
  }

  toString(): string {
    return `${this.row},${this.col}`;
  }
}

export const day20: Solution = {
  part1: async (input: string) => {
    const { map, start, end } = parseMap(input);
    const racePath = findNormalPath(map, start, end);

    return findCheats(racePath, map, 2, 100);
  },

  part2: async (input: string) => {
    const { map, start, end } = parseMap(input);
    const racePath = findNormalPath(map, start, end);

    return findCheats(racePath, map, 20, 100);
  },
};

function parseMap(input: string) {
  const lines = input.split("\n");
  const map = lines.map((line) => line + "#");
  map.push("#".repeat(map[0].length));

  const start = getLocation("S", map);
  const end = getLocation("E", map);

  return { map, start, end };
}

function getLocation(letter: string, map: string[]): Location {
  for (let row = 0; row < map.length; row++) {
    const col = map[row].indexOf(letter);
    if (col >= 0) {
      return new Location(row, col);
    }
  }
  throw new Error(`Not Found ${letter}`);
}

function findNormalPath(
  map: string[],
  start: Location,
  end: Location,
): Location[] {
  const path: Location[] = [start];
  const visited = new Set<string>([`${start}`]);

  while (!path[path.length - 1].equals(end)) {
    const current = path[path.length - 1];
    let moved = false;

    for (let c = 0; c < ADJACENT_COORDS.length; c++) {
      const moveDir = ADJACENT_COORDS[c];
      const nextMove = current.move(moveDir);

      if (visited.has(`${nextMove}`)) {
        continue;
      }

      const nextChar = map[nextMove.row][nextMove.col];

      if (nextChar === "." || nextChar === "E") {
        path.push(nextMove);
        visited.add(`${nextMove}`);
        moved = true;
        break;
      }
    }

    if (!moved) {
      throw new Error("No valid moves found");
    }
  }

  return path;
}

function isInBounds(loc: Location, raceMap: string[]): boolean {
  return loc.row >= 0 &&
    loc.row < raceMap.length &&
    loc.col >= 0 &&
    loc.col < raceMap[0].length;
}

function findPathWithCheats(
  start: Location,
  map: string[],
  maxSteps: number,
): Map<string, number> {
  const destinations = new Map<string, number>();
  const visited = new Set<string>();
  const queue: [Location, number][] = [[start, 0]];

  while (queue.length > 0) {
    const [current, steps] = queue.shift()!;
    const currentStr = current.toString();

    // exit
    if (steps <= maxSteps && isInBounds(current, map)) {
      const char = map[current.row][current.col];
      if ((char === "." || char === "E") && !destinations.has(currentStr)) {
        destinations.set(currentStr, steps);
      }
    }

    if (steps >= maxSteps) continue;

    for (const moveDir of ADJACENT_COORDS) {
      const next = current.move(moveDir);
      const nextStr = next.toString();
      const visitKey = `${nextStr},${steps + 1}`;

      if (!visited.has(visitKey) && isInBounds(next, map)) {
        visited.add(visitKey);
        queue.push([next, steps + 1]);
      }
    }
  }

  return destinations;
}

function findCheats(
  paths: Location[],
  map: string[],
  maxCheatSteps: number,
  minTimeSaved: number,
): number {
  let totalCheats = 0;
  const pathLookup = new Map<string, number>();

  paths.forEach((loc, idx) => pathLookup.set(loc.toString(), idx));

  for (let i = 0; i < paths.length; i++) {
    const start = paths[i];

    const destinationsWithSteps = findPathWithCheats(
      start,
      map,
      maxCheatSteps,
    );

    for (const [destStr, cheatSteps] of destinationsWithSteps) {
      const destIdx = pathLookup.get(destStr);
      if (destIdx === undefined || destIdx <= i) continue;

      const normalSteps = destIdx - i;
      const timeSaved = normalSteps - cheatSteps;

      if (timeSaved >= minTimeSaved) {
        totalCheats++;
      }
    }
  }

  return totalCheats;
}
