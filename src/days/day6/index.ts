import {
  countInGrid,
  getInputLines,
  isInBounds,
  Log,
  parseGrid,
} from "../../utils/index.ts";
import { Solution } from "../../types.ts";

enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

type Guard = {
  row: number;
  col: number;
  direction: Direction;
  char: string;
  tile: string;
};

type Position = {
  row: number;
  col: number;
};

type GuardState = {
  row: number;
  col: number;
  direction: Direction;
};

export const day6: Solution = {
  part1: async (input: string) => {
    const map = parseGrid(input);
    let currentGuard = getInitialGuard(map);
    let count = 0;
    const positions: Set<string> = new Set();

    do {
      count++;
      const { nextRow, nextCol } = getNextCoordinate(currentGuard);
      if (!isInBounds(nextRow, nextCol, map)) {
        break;
      }

      const previousGuard = { ...currentGuard };
      currentGuard = getNextGuard(map, currentGuard);

      updateMapWithPath(map, currentGuard, previousGuard, true);

      positions.add(`${currentGuard.row},${currentGuard.col}`);

      if (previousGuard.direction !== currentGuard.direction) {
        // printMap(map);
      }
    } while (isInBounds(currentGuard.row, currentGuard.col, map));

    return positions.size;
  },

  part2: async (input: string) => {
    // const map = parseGrid(input);
    // let count = 0;
    // const dots = getDotCoordinates(map);

    // // Let's see what we're working with
    // console.log(`Total positions to check: ${dots.length}`);

    // // Track some statistics
    // const stats = {
    //   noLoop: 0,
    //   escapes: 0,
    //   missingDirections: 0,
    //   valid: 0,
    // };

    // for (let index = 0; index < dots.length; index++) {
    //   const [row, col] = dots[index];
    //   const newMap = map.map((row) => [...row]);
    //   newMap[row][col] = "0";

    //   const result = checkLoopWithDiagnostics(newMap);

    //   switch (result) {
    //     case "escapes":
    //       stats.escapes++;
    //       break;
    //     case "missing_directions":
    //       stats.missingDirections++;
    //       break;
    //     case "no_loop":
    //       stats.noLoop++;
    //       break;
    //     case "valid":
    //       stats.valid++;
    //       count++;

    //       // Let's look at some valid loops
    //       if (stats.valid % 100 === 0) {
    //         console.log(`Found valid loop at [${row}, ${col}]:`);
    //         printMap(newMap);
    //       }
    //       break;
    //   }

    //   // Progress update
    //   if (index % 1000 === 0) {
    //     console.log(`Processed ${index}/${dots.length} positions`);
    //     console.log(stats);
    //   }
    // }

    // console.log("Final stats:", stats);
    // return count;
    const map = parseGrid(input);
    const width = map[0].length;
    const guard = getInitialGuard(map);
    const visited = traverseMap(map, false);
    let loopCount = 0;

    for (const pos of visited) {
      const [row, col] = get2DIndex(pos, width);
      if (row === guard.row && col === guard.col) continue;

      const newMap = map.map((row) => [...row]);
      newMap[row][col] = "0";
      if (traverseMap(newMap, true)) loopCount++;
    }

    return loopCount;
  },
};

function traverseMap(map: string[][], checkForLoop = false): Set<number> {
  const guard = getInitialGuard(map);
  const width = map[0].length;
  let [row, col, direction] = [guard.row, guard.col, guard.direction];
  const visited = new Set<number>();

  while (true) {
    const { nextRow, nextCol } = getNextCoordinate(
      { row, col, direction } as Guard,
    );
    const nextChar = map[nextRow]?.[nextCol];

    if (checkForLoop) {
      const state = (get1DIndex(nextRow, nextCol, width) << 2) | direction;
      if (visited.has(state)) return new Set([1]); // Return non-empty set to indicate loop
      visited.add(state);
    }

    if (nextChar === undefined) break;
    if (nextChar === "#" || nextChar === "0") {
      direction = (direction + 1) % 4;
    } else {
      if (!checkForLoop) {
        visited.add(get1DIndex(nextRow, nextCol, width));
      }
      [row, col] = [nextRow, nextCol];
    }
  }

  return visited;
}

function get1DIndex(row: number, col: number, width: number): number {
  return row * width + col;
}

function get2DIndex(index: number, width: number): [number, number] {
  return [Math.floor(index / width), index % width];
}

function checkLoopWithDiagnostics(
  map: string[][],
): "valid" | "escapes" | "missing_directions" | "no_loop" {
  let currentGuard = getInitialGuard(map);
  const visited: Set<number> = new Set();
  let seenDirections = 0;
  let steps = 0;
  const maxSteps = map.length * map[0].length * 4;

  while (steps < maxSteps) {
    const state = (currentGuard.row << 16) | (currentGuard.col << 8) |
      currentGuard.direction;
    seenDirections |= 1 << currentGuard.direction;

    const { nextRow, nextCol } = getNextCoordinate(currentGuard);
    if (!isInBounds(nextRow, nextCol, map)) {
      return "escapes";
    }

    if (visited.has(state)) {
      if (seenDirections !== 15) { // Not all directions used
        return "missing_directions";
      }
      return "valid";
    }

    visited.add(state);
    const previousGuard = { ...currentGuard };
    currentGuard = getNextGuard(map, currentGuard);
    updateMapWithPath(map, currentGuard, previousGuard, false);
    steps++;
  }

  return "no_loop";
}

function checkLoop(map: string[][]): boolean {
  let currentGuard = getInitialGuard(map);
  const visited: Set<number> = new Set();
  let seenDirections = 0; // Track directions using bits: UP=1, RIGHT=2, DOWN=4, LEFT=8
  let steps = 0;
  const maxSteps = map.length * map[0].length * 4;

  // To verify the loop uses the new obstacle
  const initialState = (currentGuard.row << 16) | (currentGuard.col << 8) |
    currentGuard.direction;
  let foundLoop = false;
  let usedNewObstacle = false;

  while (steps < maxSteps) {
    const state = (currentGuard.row << 16) | (currentGuard.col << 8) |
      currentGuard.direction;

    // Track which directions we've moved in
    seenDirections |= 1 << currentGuard.direction;

    const { nextRow, nextCol } = getNextCoordinate(currentGuard);
    if (!isInBounds(nextRow, nextCol, map)) {
      return false;
    }

    // Check if we're about to hit the new obstacle
    if (map[nextRow][nextCol] === "0") {
      usedNewObstacle = true;
    }

    // When we find a potential loop
    if (visited.has(state)) {
      // If this is our first loop detection
      if (!foundLoop) {
        foundLoop = true;

        // Must have used all four directions
        if (seenDirections !== 15) { // 1111 in binary
          return false;
        }

        // Must have used the new obstacle
        if (!usedNewObstacle) {
          return false;
        }

        // Continue to verify we can complete the loop again
        continue;
      }

      // If we've made it around twice, it's a valid loop
      return true;
    }

    visited.add(state);

    const previousGuard = { ...currentGuard };
    currentGuard = getNextGuard(map, currentGuard);

    updateMapWithPath(map, currentGuard, previousGuard, false);
    steps++;
  }

  return false;
}

function getNextGuard(map: string[][], guard: Guard): Guard {
  const { nextRow, nextCol } = getNextCoordinate(guard);
  const nextChar = map[nextRow][nextCol];

  // If there's an obstacle in front, turn right
  if (nextChar === "#" || nextChar === "0") {
    return updateGuardWithNextPosition(guard, ".");
  }

  // Otherwise, move forward
  return {
    char: guard.char,
    row: nextRow,
    col: nextCol,
    direction: guard.direction,
    tile: nextChar,
  };
}

function updateMapWithPath(
  map: string[][],
  currentGuard: Guard,
  previousGuard: Guard,
  isPart1: boolean,
): void {
  const previousChar = map[previousGuard.row][previousGuard.col];
  const currentChar = map[currentGuard.row][currentGuard.col];

  // set current guard position
  map[currentGuard.row][currentGuard.col] = currentGuard.char;

  if (isPart1) {
    // Set Previous Guard position
    map[previousGuard.row][previousGuard.col] = "X";
    return;
  }

  // Don't modify starting position, walls, or obstacles
  if (
    map[previousGuard.row][previousGuard.col] === "#" ||
    map[previousGuard.row][previousGuard.col] === "0"
  ) {
    return;
  }

  if (
    previousGuard.tile === "." &&
    previousGuard.direction === currentGuard.direction
  ) {
    map[previousGuard.row][previousGuard.col] = mapDirectionToChar(
      previousGuard.direction,
    );
    return;
  }

  if (
    previousGuard.tile === "-" &&
    (previousGuard.direction === Direction.UP ||
      previousGuard.direction === Direction.DOWN)
  ) {
    map[previousGuard.row][previousGuard.col] = "+";
    return;
  }

  if (
    previousGuard.tile === "|" &&
    (previousGuard.direction === Direction.LEFT ||
      previousGuard.direction === Direction.RIGHT)
  ) {
    map[previousGuard.row][previousGuard.col] = "+";
    return;
  }

  if (previousGuard.direction !== currentGuard.direction) {
    map[previousGuard.row][previousGuard.col] = "+";
    return;
  }

  map[previousGuard.row][previousGuard.col] = mapDirectionToChar(
    previousGuard.direction,
  );
}

function getDotCoordinates(map: string[][]): [number, number][] {
  const coordinates: [number, number][] = [];

  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[0].length; col++) {
      if (map[row][col] === ".") {
        coordinates.push([row, col]);
      }
    }
  }

  return coordinates;
}

function printMap(map: string[][], isFile = false) {
  if (!isFile) {
    // Print header separator
    console.log("\n" + "=".repeat(map[0].length));

    // Process and print one line at a time
    for (let row = 0; row < map.length; row++) {
      let line = "";
      for (let col = 0; col < map[row].length; col++) {
        const char = map[row][col];
        // Build each character with its color code
        switch (char) {
          case "^":
          case "v":
          case "<":
          case ">":
            line += `\x1b[31m${char}\x1b[0m`;
            break;
          case "0":
            line += `\x1b[33m${char}\x1b[0m`;
            break;
          case "#":
            line += `\x1b[36m${char}\x1b[0m`;
            break;
          case "+":
            line += `\x1b[32m${char}\x1b[0m`;
            break;
          case "|":
          case "-":
            line += `\x1b[34m${char}\x1b[0m`;
            break;
          case ".":
            line += `\x1b[90m.\x1b[0m`;
            break;
          case "X":
            line += `\x1b[35mX\x1b[0m`;
            break;
          default:
            line += char;
        }
      }
      // Print each line immediately after processing
      console.log(line);
    }
  } else {
    const mapString = map.map((row) => row.join("")).join("\n");

    try {
      Deno.writeTextFileSync("./map", mapString);
    } catch (error) {
      console.error(`Error writing to file: ${error}`);
    }
  }
}

function getNextCoordinate(guard: Guard) {
  switch (guard.direction) {
    case Direction.UP:
      return { nextRow: guard.row - 1, nextCol: guard.col };
    case Direction.DOWN:
      return { nextRow: guard.row + 1, nextCol: guard.col };
    case Direction.LEFT:
      return { nextRow: guard.row, nextCol: guard.col - 1 };
    case Direction.RIGHT:
      return { nextRow: guard.row, nextCol: guard.col + 1 };
  }
}

function updateGuardWithNextPosition(
  currentGuard: Guard,
  tile: string,
): Guard {
  if (currentGuard.char === ">") {
    return {
      char: "v",
      direction: Direction.DOWN,
      row: currentGuard.row + 1,
      col: currentGuard.col,
      tile,
    };
  }
  if (currentGuard.char === "v") {
    return {
      char: "<",
      direction: Direction.LEFT,
      row: currentGuard.row,
      col: currentGuard.col - 1,
      tile,
    };
  }
  if (currentGuard.char === "<") {
    return {
      char: "^",
      direction: Direction.UP,
      row: currentGuard.row - 1,
      col: currentGuard.col,
      tile,
    };
  }
  return {
    char: ">",
    direction: Direction.RIGHT,
    row: currentGuard.row,
    col: currentGuard.col + 1,
    tile,
  };
}

function mapDirectionToChar(direction: Direction): string {
  switch (direction) {
    case Direction.UP:
    case Direction.DOWN:
      return "|";
    case Direction.LEFT:
    case Direction.RIGHT:
      return "-";
  }
}

function getInitialGuard(map: string[][]): Guard {
  const guard = map.find((row) => row.includes("^"));
  if (!guard) {
    return { char: "^", row: -1, col: -1, direction: Direction.UP, tile: "." };
  }
  const row = map.indexOf(guard);
  const col = guard.indexOf("^");
  return { char: "^", row, col, direction: Direction.UP, tile: "." };
}
