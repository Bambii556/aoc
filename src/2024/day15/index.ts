import { getInputLines, log } from "../../utils/index.ts";
import { Solution } from "../../types.ts";
import { sum } from "../../utils/array.ts";

type Cell = "#" | "." | "O" | "@" | "[" | "]";
type Direction = "^" | "v" | "<" | ">";
type FloorMap = Cell[][];

type Position = {
  row: number;
  col: number;
  isWideBox?: boolean;
  originalCell?: Cell;
};

type Warehouse = {
  map: FloorMap;
  robotPosition: Position;
  width: number;
  height: number;
  moves: Direction[];
};

export const day15: Solution = {
  part1: async (input: string) => {
    const warehouse = parseWarehouse(input);

    for (let m = 0; m < warehouse.moves.length; m++) {
      const direction = warehouse.moves[m];
      const nextRobotPosition = getNextCoordinate(
        warehouse.robotPosition,
        direction,
      );
      const { canMove, boxesToMove } = validateMove(
        warehouse.map,
        warehouse.robotPosition,
        direction,
      );

      if (canMove) {
        if (boxesToMove && boxesToMove.length > 0) {
          moveBoxesPart1(warehouse, boxesToMove, direction);
        }
        warehouse
          .map[warehouse.robotPosition.row][warehouse.robotPosition.col] = ".";
        warehouse.robotPosition = nextRobotPosition;
        warehouse.map[nextRobotPosition.row][nextRobotPosition.col] = "@";
      }
    }

    const distances = calcDistancesPart1(warehouse.map);
    return sum(distances);
  },

  part2: async (input: string) => {
    const warehouse = parseWarehouse(input);

    warehouse.map = convertMap(warehouse.map);
    warehouse.robotPosition.col *= 2;

    // printColorMap(warehouse.map, warehouse.robotPosition);

    for (let m = 0; m < warehouse.moves.length; m++) {
      const direction = warehouse.moves[m];
      const nextRobotPosition = getNextCoordinate(
        warehouse.robotPosition,
        direction,
      );
      const { canMove, boxesToMove } = validateMove(
        warehouse.map,
        warehouse.robotPosition,
        direction,
      );

      if (canMove) {
        if (boxesToMove && boxesToMove.length > 0) {
          moveBoxesPart2(warehouse, boxesToMove, direction);
        }
        warehouse
          .map[warehouse.robotPosition.row][warehouse.robotPosition.col] = ".";
        warehouse.robotPosition = nextRobotPosition;
        warehouse.map[nextRobotPosition.row][nextRobotPosition.col] = "@";
      }

      // printColorMap(warehouse.map, warehouse.robotPosition, direction);
    }

    const distances = calcDistancesPart2(warehouse.map);
    return sum(distances);
  },
};

function convertMap(map: FloorMap) {
  const doubledMap: Cell[][] = [];

  for (let row = 0; row < map.length; row++) {
    const newRow: Cell[] = [];

    for (let col = 0; col < map[row].length; col++) {
      const cell = map[row][col];

      // Apply the transformation rules
      switch (cell) {
        case "#":
          newRow.push("#", "#");
          break;
        case "O":
          newRow.push("[", "]");
          break;
        case ".":
          newRow.push(".", ".");
          break;
        case "@":
          newRow.push("@", ".");
          break;
        default:
          newRow.push(".", ".");
      }
    }

    doubledMap.push(newRow);
  }

  return doubledMap;
}

function moveBoxesPart1(
  warehouse: Warehouse,
  boxesToMove: Position[],
  direction: Direction,
) {
  // Clear original positions
  for (const box of boxesToMove) {
    warehouse.map[box.row][box.col] = ".";
  }

  // Move boxes to new positions
  for (const box of boxesToMove) {
    const nextPos = getNextCoordinate(box, direction);
    warehouse.map[nextPos.row][nextPos.col] = "O";
  }
}

function moveBoxesPart2(
  warehouse: Warehouse,
  boxesToMove: Position[],
  direction: Direction,
) {
  for (const box of boxesToMove) {
    warehouse.map[box.row][box.col] = ".";
  }

  for (const box of boxesToMove) {
    const nextPos = getNextCoordinate(box, direction);
    warehouse.map[nextPos.row][nextPos.col] = box.originalCell!;
  }
}

function calcDistancesPart1(map: FloorMap) {
  const distances = [];
  for (let r = 1; r < map.length - 1; r++) {
    for (let c = 1; c < map[r].length - 1; c++) {
      const current = map[r][c];
      if (current === "O") {
        distances.push((100 * r) + c);
      }
    }
  }
  return distances;
}

function calcDistancesPart2(map: FloorMap) {
  const distances = [];
  for (let r = 1; r < map.length - 1; r++) {
    for (let c = 1; c < map[r].length - 1; c++) {
      const current = map[r][c];
      if (current === "[") {
        const leftDistance = c;
        const rightDistance = c + 1; // Since box is 2 wide
        const minDistance = Math.min(leftDistance, rightDistance);

        distances.push((100 * r) + minDistance);
      }
    }
  }
  return distances;
}

function validateMove(
  map: FloorMap,
  position: Position,
  direction: Direction,
  boxesToMove: Position[] = [],
): { canMove: boolean; boxesToMove?: Position[] } {
  const nextCoord = getNextCoordinate(position, direction);
  const nextCell = map[nextCoord.row][nextCoord.col];

  switch (nextCell) {
    case "#":
    case "@":
      return { canMove: false };
    case ".":
      return { canMove: true, boxesToMove };

    case "O": {
      const boxPosition = {
        row: nextCoord.row,
        col: nextCoord.col,
        isWideBox: false,
      };

      boxesToMove.push(boxPosition);
      const nextValidation = validateMove(
        map,
        boxPosition,
        direction,
        boxesToMove,
      );

      if (!nextValidation.canMove) return { canMove: false };
      return { canMove: true, boxesToMove };
    }
    case "[":
    case "]": {
      const startCol = nextCell === "]" ? nextCoord.col - 1 : nextCoord.col;

      // Check if we already have this box
      const exists = boxesToMove.some((box) =>
        box.row === nextCoord.row &&
        (box.col === startCol || box.col === startCol + 1)
      );

      if (!exists) {
        // Add both parts of the box
        boxesToMove.push({
          row: nextCoord.row,
          col: startCol,
          isWideBox: true,
          originalCell: map[nextCoord.row][startCol],
        });
        boxesToMove.push({
          row: nextCoord.row,
          col: startCol + 1,
          isWideBox: true,
          originalCell: map[nextCoord.row][startCol + 1],
        });

        // For vertical movement, check both positions
        if (direction === "^" || direction === "v") {
          const leftValidation = validateMove(
            map,
            { row: nextCoord.row, col: startCol },
            direction,
            boxesToMove,
          );
          if (!leftValidation.canMove) return { canMove: false };

          const rightValidation = validateMove(
            map,
            { row: nextCoord.row, col: startCol + 1 },
            direction,
            boxesToMove,
          );
          if (!rightValidation.canMove) return { canMove: false };
        } else {
          // For horizontal movement, only check from the edge we're moving towards
          const checkCol = direction === "<" ? startCol : startCol + 1;
          const validation = validateMove(
            map,
            { row: nextCoord.row, col: checkCol },
            direction,
            boxesToMove,
          );
          if (!validation.canMove) return { canMove: false };
        }
      }

      return { canMove: true, boxesToMove };
    }
  }
}

function getNextCoordinate(position: Position, direction: Direction): Position {
  switch (direction) {
    case "^":
      return { row: position.row - 1, col: position.col };
    case "v":
      return { row: position.row + 1, col: position.col };
    case "<":
      return { row: position.row, col: position.col - 1 };
    case ">":
      return { row: position.row, col: position.col + 1 };
  }
}

function parseWarehouse(input: string): Warehouse {
  const [mapSection, movesSection] = input.split("\n\n");

  const mapRows = mapSection.trim().split("\n");
  const map: Cell[][] = [];
  let robotPosition: Position = { row: 0, col: 0 };

  for (let row = 0; row < mapRows.length; row++) {
    const mapRow: Cell[] = [];
    for (let col = 0; col < mapRows[row].length; col++) {
      const char = mapRows[row][col] as Cell;
      if (char === "@") {
        robotPosition = { row, col };
        mapRow.push(".");
      } else {
        mapRow.push(char);
      }
    }
    map.push(mapRow);
  }

  const moves = movesSection
    .replace(/\n/g, "")
    .split("")
    .filter((char): char is Direction =>
      char === "^" || char === "v" || char === "<" || char === ">"
    );

  return {
    map,
    robotPosition,
    width: map[0].length,
    height: map.length,
    moves,
  };
}

function printMap(
  map: Cell[][],
  robotPosition: Position,
  log: (message: string) => void,
) {
  // Create a deep copy of the map to avoid modifying the original
  const displayMap = map.map((row) => [...row]);

  // Add robot to the display map
  displayMap[robotPosition.row][robotPosition.col] = "@";

  // Convert map to string representation
  const mapString = displayMap
    .map((row) => row.join(""))
    .join("\n");

  // Print the map
  log("\nCurrent warehouse state:");
  log(mapString);
  log(""); // Empty line for better readability
}

// Alternative version with colors if your console supports ANSI colors
function printColorMap(
  map: Cell[][],
  robotPosition: Position,
  direction?: Direction,
) {
  const colors = {
    "#": "\x1b[90m", // Gray for walls
    "O": "\x1b[33m", // Yellow for boxes
    "[": "\x1b[33m", // Yellow for boxes
    "]": "\x1b[33m", // Yellow for boxes
    "@": "\x1b[32m", // Green for robot
    ".": "\x1b[37m", // White for empty space
    reset: "\x1b[0m",
  };

  const displayMap = map.map((row) => [...row]);
  displayMap[robotPosition.row][robotPosition.col] = "@";

  const mapString = displayMap
    .map((row) =>
      row.map((cell) => `${colors[cell]}${cell}${colors.reset}`).join("")
    )
    .join("\n");

  if (direction) {
    log(`\nMove ${direction}:`);
  } else {
    log("\nCurrent warehouse state:");
  }
  log(mapString);
  log("");
}
