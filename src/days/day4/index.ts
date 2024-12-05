import {
  findAllWords,
  getInputLines,
  Log,
  parseGrid,
} from "../../utils/index.ts";
import { Solution } from "../../types.ts";

export const day4: Solution = {
  part1: async (input: string) => {
    const grid = parseGrid(input);

    const occ = findAllWords(grid, "XMAS");
    return occ.length;
  },

  part2: async (input: string) => {
    const grid = parseGrid(input);
    const occ = findXMAS(grid);
    console.log("\nVisualization:");
    // console.log(visualizePattern(grid));
    return occ;
  },
};

// / Using our optimized findXMAS function with your input
function findXMAS(grid: string[][]): number {
  const height = grid.length;
  const width = grid[0].length;
  let count = 0;

  // For each possible center point of an X
  for (let row = 1; row < height - 1; row++) {
    for (let col = 1; col < width - 1; col++) {
      // Must have 'A' in center
      if (grid[row][col] !== "A") continue;

      // Check diagonals for MAS in any direction
      const tl = grid[row - 1][col - 1]; // top-left
      const tr = grid[row - 1][col + 1]; // top-right
      const bl = grid[row + 1][col - 1]; // bottom-left
      const br = grid[row + 1][col + 1]; // bottom-right

      // Build all possible diagonal strings
      const diagonals = [
        tl + "A" + br, // top-left to bottom-right
        br + "A" + tl, // bottom-right to top-left
        tr + "A" + bl, // top-right to bottom-left
        bl + "A" + tr, // bottom-left to top-right
      ];

      // Check if any two crossing diagonals form MAS
      for (let i = 0; i < 2; i++) { // First diagonal
        if (!isMAS(diagonals[i])) continue;
        for (let j = 2; j < 4; j++) { // Second diagonal
          if (isMAS(diagonals[j])) {
            count++;
            j = 4; // Break inner loop
            i = 2; // Break outer loop
          }
        }
      }
    }
  }

  return count;
}

function isMAS(str: string): boolean {
  return str === "MAS" || str === "SAM";
}

// For visualization of a found pattern:
function visualizePattern(grid: string[][], row: number, col: number): string {
  return [
    `${grid[row - 1][col - 1]}${grid[row - 1][col]}${grid[row - 1][col + 1]}`,
    `${grid[row][col - 1]}${grid[row][col]}${grid[row][col + 1]}`,
    `${grid[row + 1][col - 1]}${grid[row + 1][col]}${grid[row + 1][col + 1]}`,
  ].join("\n");
}
