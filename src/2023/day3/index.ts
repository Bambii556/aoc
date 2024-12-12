import {
  findAllIndexesInGrid,
  getAdjacentWithDiagonals,
  getAdjacentWithTopAndBottom,
  getInputLines,
  isInBounds,
  parseGrid,
} from "../../utils/index.ts";
import { Solution } from "../../types.ts";
import { sum } from "../../utils/array.ts";

export const day3: Solution = {
  part1: async (input: string) => {
    const grid = parseGrid(input);
    const partNumbers: number[] = [];

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        const element = grid[row][col];
        // check if element is a digit
        if (isDigit(element)) {
          const val = getNumberFromPosition(row, col, grid);
          const newCol = col + val.length;

          if (isPartNumber(grid, row, col, newCol)) {
            partNumbers.push(parseInt(val));
          }
          col = newCol;
        }
      }
    }

    return sum(partNumbers);
  },

  part2: async (input: string) => {
    const grid = parseGrid(input);
    const gears: number[] = [];

    const gearLocations = findAllIndexesInGrid(grid, "*");

    for (const [gearX, gearY] of gearLocations) {
      const numbers = getNumbersAroundPosition(gearX, gearY, grid);
      if (numbers.length === 2) {
        gears.push(numbers[0] * numbers[1]);
      }

      // const adj = getAdjacentWithTopAndBottom(gearX, gearY);
      // for (const [x, y] of adj) {
      //   if (isInBounds(x, y, grid) && isDigit(grid[x][y])) {
      //     const numbers = getNumbersAroundPosition(x, y, grid);
      //     if (numbers.length === 2) {
      //       gears.push(numbers[0] * numbers[1]);
      //     }
      //   }
      // }
    }
    return sum(gears);
  },
};

function isPartNumber(
  grid: string[][],
  row: number,
  startCol: number,
  endCol: number,
) {
  const coords = new Map<string, string>();
  for (let i = startCol; i <= endCol; i++) {
    getAdjacentWithDiagonals(row, i).forEach(([x, y]) => {
      if (
        !coords.has(`${x},${y}`) &&
        isInBounds(x, y, grid)
      ) {
        coords.set(`${x},${y}`, grid[x][y]);
      }
    });
  }
  return Array.from(coords.values()).some((val) => isSymbol(val));
}

function getNumberFromPosition(x: number, y: number, grid: string[][]): string {
  let result = grid[x][y];
  let currentY = y + 1;

  // Traverse right until we hit a non-digit or end of grid
  while (
    isInBounds(x, currentY, grid) &&
    isDigit(grid[x][currentY])
  ) {
    result += grid[x][currentY];
    currentY++;
  }

  return result;
}

function isDigit(val: string) {
  return /[0-9]/.test(val);
}

function isSymbol(val: string) {
  if (/[0-9a-zA-z.]/.test(val)) {
    return false;
  }
  return true;
}

function getNumbersAroundPosition(
  x: number,
  y: number,
  grid: string[][],
): number[] {
  const foundNumbers = new Set<string>(); // Track numbers we've seen using "row,col" format
  const numbers: number[] = [];

  // Get all adjacent positions including diagonals
  getAdjacentWithDiagonals(x, y).forEach(([adjX, adjY]) => {
    // Skip if out of bounds or not a digit
    if (!isInBounds(adjX, adjY, grid) || !isDigit(grid[adjX][adjY])) {
      return;
    }

    // Find start of number by going left
    let startY = adjY;
    while (startY > 0 && isDigit(grid[adjX][startY - 1])) {
      startY--;
    }

    // If we haven't seen this number yet, get it and add it
    const coordKey = `${adjX},${startY}`;
    if (!foundNumbers.has(coordKey)) {
      const numberStr = getNumberFromPosition(adjX, startY, grid);
      numbers.push(parseInt(numberStr));
      foundNumbers.add(coordKey);
    }
  });

  return numbers;
}
