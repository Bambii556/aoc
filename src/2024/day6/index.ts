import {
  countOccurrencesInGrid,
  getInputLines,
  isInBounds,
  log,
  parseGrid,
} from "../../utils/index.ts";
import { Solution } from "../../types.ts";

enum Direction {
  UP,
  RIGHT,
  DOWN,
  LEFT,
}

type Guard = {
  row: number;
  col: number;
  direction: Direction;
};

export const day6: Solution = {
  part1: async (input: string) => {
    const map = parseGrid(input);
    const guard = getInitialGuard(map);
    return countPath(map, guard);
  },

  part2: async (input: string) => {
    const map = parseGrid(input);
    const initialGuard = getInitialGuard(map);
    let loops = 0;

    for (let row = 0; row < map.length; row++) {
      for (let col = 0; col < map[row].length; col++) {
        if (
          map[row][col] !== "." ||
          (row === initialGuard.row && col === initialGuard.col)
        ) {
          continue;
        }

        const testMap = map.map((row) => [...row]);
        testMap[row][col] = "0";
        if (checkForLoop(testMap, { ...initialGuard })) {
          loops++;
        }
      }
    }

    return loops;
  },
};

function checkForLoop(map: string[][], guard: Guard): boolean {
  const path = new Map<string, Direction>();
  path.set(`${guard.row},${guard.col}`, guard.direction);

  while (isInBounds(guard.row, guard.col, map)) {
    const { nextRow, nextCol } = getNextCoordinate(guard);
    if (!isInBounds(nextRow, nextCol, map)) break;

    if (map[nextRow][nextCol] === "#" || map[nextRow][nextCol] === "0") {
      guard.direction = (guard.direction + 1) % 4;
    } else {
      guard.row = nextRow;
      guard.col = nextCol;

      const key = `${guard.row},${guard.col}`;
      const previousDirection = path.get(key);

      if (previousDirection === guard.direction) {
        return true;
      }
      path.set(key, guard.direction);
    }
  }
  return false;
}

function countPath(map: string[][], guard: Guard): number {
  const visited = new Set<string>();
  visited.add(`${guard.row},${guard.col}`);

  while (isInBounds(guard.row, guard.col, map)) {
    const { nextRow, nextCol } = getNextCoordinate(guard);
    if (!isInBounds(nextRow, nextCol, map)) break;

    if (map[nextRow][nextCol] === "#" || map[nextRow][nextCol] === "0") {
      guard.direction = (guard.direction + 1) % 4;
    } else {
      guard.row = nextRow;
      guard.col = nextCol;
      visited.add(`${guard.row},${guard.col}`);
    }
  }

  return visited.size;
}

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

// function checkLoopWithDiagnostics(
//   map: string[][],
// ): "valid" | "escapes" | "missing_directions" | "no_loop" {
//   let currentGuard = getInitialGuard(map);
//   const visited: Set<number> = new Set();
//   let seenDirections = 0;
//   let steps = 0;
//   const maxSteps = map.length * map[0].length * 4;

//   while (steps < maxSteps) {
//     const state = (currentGuard.row << 16) | (currentGuard.col << 8) |
//       currentGuard.direction;
//     seenDirections |= 1 << currentGuard.direction;

//     const { nextRow, nextCol } = getNextCoordinate(currentGuard);
//     if (!isInBounds(nextRow, nextCol, map)) {
//       return "escapes";
//     }

//     if (visited.has(state)) {
//       if (seenDirections !== 15) { // Not all directions used
//         return "missing_directions";
//       }
//       return "valid";
//     }

//     visited.add(state);
//     const previousGuard = { ...currentGuard };
//     currentGuard = getNextGuard(map, currentGuard);
//     updateMapWithPath(map, currentGuard, previousGuard, false);
//     steps++;
//   }

//   return "no_loop";
// }

// function checkLoop(map: string[][]): boolean {
//   let currentGuard = getInitialGuard(map);
//   const visited: Set<number> = new Set();
//   let seenDirections = 0; // Track directions using bits: UP=1, RIGHT=2, DOWN=4, LEFT=8
//   let steps = 0;
//   const maxSteps = map.length * map[0].length * 4;

//   // To verify the loop uses the new obstacle
//   const initialState = (currentGuard.row << 16) | (currentGuard.col << 8) |
//     currentGuard.direction;
//   let foundLoop = false;
//   let usedNewObstacle = false;

//   while (steps < maxSteps) {
//     const state = (currentGuard.row << 16) | (currentGuard.col << 8) |
//       currentGuard.direction;

//     // Track which directions we've moved in
//     seenDirections |= 1 << currentGuard.direction;

//     const { nextRow, nextCol } = getNextCoordinate(currentGuard);
//     if (!isInBounds(nextRow, nextCol, map)) {
//       return false;
//     }

//     // Check if we're about to hit the new obstacle
//     if (map[nextRow][nextCol] === "0") {
//       usedNewObstacle = true;
//     }

//     // When we find a potential loop
//     if (visited.has(state)) {
//       // If this is our first loop detection
//       if (!foundLoop) {
//         foundLoop = true;

//         // Must have used all four directions
//         if (seenDirections !== 15) { // 1111 in binary
//           return false;
//         }

//         // Must have used the new obstacle
//         if (!usedNewObstacle) {
//           return false;
//         }

//         // Continue to verify we can complete the loop again
//         continue;
//       }

//       // If we've made it around twice, it's a valid loop
//       return true;
//     }

//     visited.add(state);

//     const previousGuard = { ...currentGuard };
//     currentGuard = getNextGuard(map, currentGuard);

//     updateMapWithPath(map, currentGuard, previousGuard, false);
//     steps++;
//   }

//   return false;
// }

// function getNextGuard(map: string[][], guard: Guard): Guard {
//   const { nextRow, nextCol } = getNextCoordinate(guard);
//   const nextChar = map[nextRow][nextCol];

//   // If there's an obstacle in front, turn right
//   if (nextChar === "#" || nextChar === "0") {
//     return updateGuardWithNextPosition(guard, ".");
//   }

//   // Otherwise, move forward
//   return {
//     char: guard.char,
//     row: nextRow,
//     col: nextCol,
//     direction: guard.direction,
//     tile: nextChar,
//   };
// }

// function updateMapWithPath(
//   map: string[][],
//   currentGuard: Guard,
//   previousGuard: Guard,
//   isPart1: boolean,
// ): void {
//   const previousChar = map[previousGuard.row][previousGuard.col];
//   const currentChar = map[currentGuard.row][currentGuard.col];

//   // set current guard position
//   map[currentGuard.row][currentGuard.col] = currentGuard.char;

//   if (isPart1) {
//     // Set Previous Guard position
//     map[previousGuard.row][previousGuard.col] = "X";
//     return;
//   }

//   // Don't modify starting position, walls, or obstacles
//   if (
//     map[previousGuard.row][previousGuard.col] === "#" ||
//     map[previousGuard.row][previousGuard.col] === "0"
//   ) {
//     return;
//   }

//   if (
//     previousGuard.tile === "." &&
//     previousGuard.direction === currentGuard.direction
//   ) {
//     map[previousGuard.row][previousGuard.col] = mapDirectionToChar(
//       previousGuard.direction,
//     );
//     return;
//   }

//   if (
//     previousGuard.tile === "-" &&
//     (previousGuard.direction === Direction.UP ||
//       previousGuard.direction === Direction.DOWN)
//   ) {
//     map[previousGuard.row][previousGuard.col] = "+";
//     return;
//   }

//   if (
//     previousGuard.tile === "|" &&
//     (previousGuard.direction === Direction.LEFT ||
//       previousGuard.direction === Direction.RIGHT)
//   ) {
//     map[previousGuard.row][previousGuard.col] = "+";
//     return;
//   }

//   if (previousGuard.direction !== currentGuard.direction) {
//     map[previousGuard.row][previousGuard.col] = "+";
//     return;
//   }

//   map[previousGuard.row][previousGuard.col] = mapDirectionToChar(
//     previousGuard.direction,
//   );
// }

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
    log("\n" + "=".repeat(map[0].length));

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
      log(line);
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

// function updateGuardWithNextPosition(
//   currentGuard: Guard,
//   tile: string,
// ): Guard {
//   if (currentGuard.char === ">") {
//     return {
//       char: "v",
//       direction: Direction.DOWN,
//       row: currentGuard.row + 1,
//       col: currentGuard.col,
//       tile,
//     };
//   }
//   if (currentGuard.char === "v") {
//     return {
//       char: "<",
//       direction: Direction.LEFT,
//       row: currentGuard.row,
//       col: currentGuard.col - 1,
//       tile,
//     };
//   }
//   if (currentGuard.char === "<") {
//     return {
//       char: "^",
//       direction: Direction.UP,
//       row: currentGuard.row - 1,
//       col: currentGuard.col,
//       tile,
//     };
//   }
//   return {
//     char: ">",
//     direction: Direction.RIGHT,
//     row: currentGuard.row,
//     col: currentGuard.col + 1,
//     tile,
//   };
// }

// function mapDirectionToChar(direction: Direction): string {
//   switch (direction) {
//     case Direction.UP:
//     case Direction.DOWN:
//       return "|";
//     case Direction.LEFT:
//     case Direction.RIGHT:
//       return "-";
//   }
// }

function getInitialGuard(map: string[][]): Guard {
  const guard = map.find((row) => row.includes("^"));
  if (!guard) {
    // return { char: "^", row: -1, col: -1, direction: Direction.UP, tile: "." };
    return { row: -1, col: -1, direction: Direction.UP };
  }
  const row = map.indexOf(guard);
  const col = guard.indexOf("^");
  return { row, col, direction: Direction.UP };
}
