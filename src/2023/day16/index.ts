import { getInputLines, parseGrid } from "../../utils/index.ts";
import { Solution } from "../../types.ts";
import { Beam, Grid } from "./CustomGrid.ts";

interface Tile {
  label: string;
  lens: number;
}

export const day16: Solution = {
  part1: async (input: string) => {
    const grid = buildGrid(input);

    const energisedCount = traversGrid(grid, {
      direction: "right",
      x: 0,
      y: 0,
    });

    return energisedCount;
  },

  part2: async (input: string) => {
    const grid = buildGrid(input);

    const edgeBeams = getEdgeBeams(grid);
    let max = 0;

    edgeBeams.forEach((beam) => {
      const energisedCount = traversGrid(grid, beam);
      if (energisedCount > max) {
        max = energisedCount;
      }
      grid.resetGrid();
    });

    return max;
  },
};

function getEdgeBeams(grid: Grid): Beam[] {
  const beams: Beam[] = [];

  for (let y = 0; y < grid.height; y++) {
    for (let x = 0; x < grid.width; x++) {
      // is corner of grid
      if (x === 0 && y === 0) {
        beams.push({ direction: "right", x, y });
        beams.push({ direction: "down", x, y });
        continue;
      } else if (x === 0 && y === grid.height - 1) {
        beams.push({ direction: "right", x, y });
        beams.push({ direction: "up", x, y });
        continue;
      } else if (x === grid.width - 1 && y === 0) {
        beams.push({ direction: "left", x, y });
        beams.push({ direction: "down", x, y });
        continue;
      } else if (x === grid.width - 1 && y === grid.height - 1) {
        beams.push({ direction: "left", x, y });
        beams.push({ direction: "up", x, y });
        continue;
      }

      // is edge of grid
      if (x === 0) {
        beams.push({ direction: "right", x, y });
        continue;
      } else if (x === grid.width - 1) {
        beams.push({ direction: "left", x, y });
        continue;
      } else if (y === 0) {
        beams.push({ direction: "down", x, y });
        continue;
      } else if (y === grid.height - 1) {
        beams.push({ direction: "up", x, y });
        continue;
      }
    }
  }

  return beams;
}

function traversGrid(grid: Grid, initialBeam: Beam) {
  let beams: Beam[] = [initialBeam];

  do {
    const newBeams: Beam[] = [];
    beams.forEach((beam) => {
      newBeams.push(...grid.getBeams(beam));
    });
    beams = newBeams;
  } while (beams.length > 0);

  return grid.getEnergisedNodesCount();
}

function buildGrid(input: string) {
  const lines = getInputLines(input);
  const gridData = lines.map((line) => line.split(""));
  return new Grid(gridData);
}
