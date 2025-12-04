import { parseGrid } from "../../utils/index.ts";
import { Solution } from "../../types.ts";

interface Coord {
  r: number;
  c: number;
}

export const day4: Solution = {
  part1: async (input: string) => {
    const grid = parseGrid(input);
    let rolls = 0;

    for (let r = 0; r < grid.length; r++) {
      const rows = grid[r];
      for (let c = 0; c < rows.length; c++) {
        const item = rows[c];
        if (item !== "@") continue;

        let localRolls = 0;
        const coords = getCoords(r, c);
        for (const coord of coords) {
          const checkRow = grid[coord.r];
          if (!checkRow) continue;
          const checkItem = checkRow[coord.c];
          if (checkItem === "@") {
            localRolls++;
          }
        }

        if (localRolls < 4) {
          rolls++;
        }
      }
    }
    return rolls;
  },

  part2: async (input: string) => {
    const grid = parseGrid(input);
    let rollsRemoved = 0;

    let hasAnyRemovedRoles = false;
    do {
      hasAnyRemovedRoles = false;
      const rollsToRemove: Coord[] = [];
      for (let r = 0; r < grid.length; r++) {
        const rows = grid[r];
        for (let c = 0; c < rows.length; c++) {
          const item = rows[c];
          if (item !== "@") continue;

          let localRolls = 0;
          const coords = getCoords(r, c);
          for (const coord of coords) {
            const checkRow = grid[coord.r];
            if (!checkRow) continue;
            const checkItem = checkRow[coord.c];
            if (checkItem === "@") {
              localRolls++;
            }
          }

          if (localRolls < 4) {
            rollsRemoved++;
            hasAnyRemovedRoles = true;
            rollsToRemove.push({ r, c });
          }
        }
      }
      if (rollsToRemove.length > 0) {
        hasAnyRemovedRoles = true;

        for (const coord of rollsToRemove) {
          grid[coord.r][coord.c] = "x";
        }
      }
      console.log("Removed rolls this pass:", rollsToRemove.length);
    } while (hasAnyRemovedRoles);

    return rollsRemoved;
  },
};

function getCoords(r: number, c: number): Coord[] {
  return [
    { r: r - 1, c: c - 1 }, // top-left
    { r: r, c: c - 1 }, // top
    { r: r + 1, c: c - 1 }, // top-right
    { r: r + 1, c: c }, // right
    { r: r + 1, c: c + 1 }, // bottom-right
    { r: r, c: c + 1 }, // bottom
    { r: r - 1, c: c + 1 }, // bottom-left
    { r: r - 1, c: c }, // left
  ];
}
