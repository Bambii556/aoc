import { createGrid, getInputLines, log } from "../../utils/index.ts";
import { Solution } from "../../types.ts";
import { findNumbers } from "../../utils/array.ts";
import { isInBounds } from "../../utils/grid.ts";

type Robot = {
  id: number;
  row: number;
  col: number;
  vRow: number;
  vCol: number;
};

export const day14: Solution = {
  part1: async (input: string) => {
    const { grid, robots } = parseGrid(input);
    let seconds = 0;
    const cols = grid[0].length;
    const rows = grid.length;

    do {
      for (const robot of robots) {
        // remove robot
        grid[robot.row][robot.col] -= 1;
        if (grid[robot.row][robot.col] < 0) {
          console.log("nooooo");
        }

        // move robot
        robot.row += robot.vRow;
        robot.col += robot.vCol;

        // place robot
        if (isInBounds(robot.row, robot.col, grid)) {
          grid[robot.row][robot.col] += 1;
        } else {
          // Wrap around for rows
          if (robot.row >= rows) {
            robot.row = robot.row % rows;
          } else if (robot.row < 0) {
            robot.row = ((robot.row % rows) + rows) % rows;
          }

          // Wrap around for columns
          if (robot.col >= cols) {
            robot.col = robot.col % cols;
          } else if (robot.col < 0) {
            robot.col = ((robot.col % cols) + cols) % cols;
          }
          grid[robot.row][robot.col] += 1;
        }
      }
      // printGrid(grid, seconds);
      seconds++;
    } while (seconds < 100);

    return calcQuads(grid);
  },

  part2: async (input: string) => {
    const { grid, robots } = parseGrid(input);
    const cols = grid[0].length;
    const rows = grid.length;

    for (let seconds = 1; seconds < 10000; seconds++) {
      // Clear the grid before placing robots
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          grid[r][c] = 0;
        }
      }

      // Move and place robots
      for (const robot of robots) {
        // move robot
        robot.row = (robot.row + robot.vRow + rows) % rows;
        robot.col = (robot.col + robot.vCol + cols) % cols;

        // place robot
        grid[robot.row][robot.col] += 1;
      }

      // Find connected components
      const components = findConnectedComponents(grid);

      // Check for Christmas tree condition
      if (components <= 200) {
        log(`Christmas tree found at second ${seconds}!`);
        console.log(gridToString(grid));
        return seconds;
      }

      // Optional: periodic logging
      if (seconds % 1000 === 0) {
        log(`Checked up to second ${seconds}`);
      }
    }

    return 0;
  },
};

function findConnectedComponents(grid: number[][]): number {
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = new Set<string>();
  let componentCount = 0;

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  function dfs(row: number, col: number) {
    const key = `${row},${col}`;
    if (visited.has(key) || grid[row][col] === 0) return;

    visited.add(key);

    for (const [dx, dy] of directions) {
      const newRow = (row + dx + rows) % rows;
      const newCol = (col + dy + cols) % cols;

      if (grid[newRow][newCol] !== 0) {
        dfs(newRow, newCol);
      }
    }
  }

  // Count components
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] !== 0 && !visited.has(`${r},${c}`)) {
        dfs(r, c);
        componentCount++;
      }
    }
  }

  return componentCount;
}

// Utility to print grid for debugging
function gridToString(grid: number[][]): string {
  return grid.map((row) => row.map((cell) => cell === 0 ? "." : "#").join(""))
    .join("\n");
}

function calcQuads(grid: number[][]) {
  const { midCol, midRow } = getGridMiddle(grid);
  const counts = {
    topLeft: 0,
    topRight: 0,
    bottomLeft: 0,
    bottomRight: 0,
  };

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const value = grid[row][col];
      // Skip middle lines
      if (row === midRow || col === midCol || value === 0) continue;

      // Count based on position relative to middle
      if (row < midRow) {
        if (col < midCol) counts.topLeft += value;
        if (col > midCol) counts.topRight += value;
      } else if (row > midRow) {
        if (col < midCol) counts.bottomLeft += value;
        if (col > midCol) counts.bottomRight += value;
      }
    }
  }

  return counts.topLeft * counts.topRight * counts.bottomLeft *
    counts.bottomRight;
}

function printGrid(grid: number[][], seconds: number): void {
  const maxLength = Math.max(
    ...grid
      .flatMap((row) => Array.from(row))
      .map((n) => n === 0 ? "." : n.toString())
      .map((s) => s.length),
  );

  const padSize = maxLength;

  log(`${"=".repeat(24)} ${seconds} ${"=".repeat(24)}`);
  // Print each row
  for (const row of grid) {
    log(
      Array.from(row)
        .map((n) => (n === 0 ? "." : n.toString()).padStart(padSize))
        .join(""),
    );
  }
  log("=".repeat(50));
}

function printGridToFile(
  grid: number[][],
  seconds: number,
  filePath: string,
): void {
  // Build the output string
  let output = "";

  // Header
  output += `${"=".repeat(24)} ${seconds} ${"=".repeat(24)}\n`;

  // Grid content
  const maxLength = Math.max(
    ...grid.flatMap((row) => Array.from(row))
      .map((n) => n === 0 ? "." : n.toString())
      .map((s) => s.length),
  );
  const padSize = maxLength;

  // Add each row
  for (const row of grid) {
    output += Array.from(row)
      .map((n) => (n === 0 ? "." : n.toString()).padStart(padSize))
      .join("") + "\n";
  }

  output += "=".repeat(50) + "\n\n";

  // Print to console
  console.log(output);

  // Append to file
  try {
    Deno.writeTextFileSync(filePath, output, { append: true });
  } catch (error) {
    console.error(`Failed to write to file: ${error}`);
  }
}

function getGridMiddle<T>(grid: T[][]) {
  return {
    midRow: Math.floor(grid.length / 2),
    midCol: Math.floor(grid[0].length / 2),
  };
}

function parseGrid(input: string) {
  const lines = getInputLines(input);

  const gridSize = lines[0].split("x");
  const cols = parseInt(gridSize[0]);
  const rows = parseInt(gridSize[1]);
  const grid = createGrid(rows, cols, 0);

  const robots = [] as Robot[];

  for (let r = 1; r < lines.length; r++) {
    const parts = lines[r].split(" ");
    const p = findNumbers(parts[0], true);
    const v = findNumbers(parts[1], true);

    robots.push({
      id: r,
      row: p[1],
      col: p[0],
      vRow: v[1],
      vCol: v[0],
    });
  }

  // Initial robot placement
  for (const robot of robots) {
    grid[robot.row][robot.col] += 1;
  }

  return { grid, robots };
}
