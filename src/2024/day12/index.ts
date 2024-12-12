import { getInputLines, log } from "../../utils/index.ts";
import { Solution } from "../../types.ts";

interface Point {
  x: number;
  y: number;
}

interface Plot {
  letter: string;
  points: Point[];
  perimeter: number;
  sides: number;
}

interface Queue {
  pos: Point;
  currChar: string;
}

export const day12: Solution = {
  part1: async (input: string) => {
    const lines = getInputLines(input);
    const plots = buildPlots(lines, false);

    let totalPrice = 0;
    for (const plot of plots) {
      totalPrice += plot.points.length * plot.perimeter;
    }
    return totalPrice;
  },

  part2: async (input: string) => {
    const lines = getInputLines(input);
    const plots = buildPlots(lines, true);

    let totalPrice = 0;
    for (const plot of plots) {
      totalPrice += plot.points.length * plot.sides;
    }
    return totalPrice;
  },
};

function buildPlots(contents: string[], partTwo: boolean): Plot[] {
  const plots: Plot[] = [];
  const visited: Record<string, boolean> = {};

  for (let i = 0; i < contents.length; i++) {
    for (let j = 0; j < contents[i].length; j++) {
      const key = `${i},${j}`;
      if (visited[key]) {
        continue;
      }

      plots.push(buildPlot(i, j, contents, visited, partTwo));
    }
  }

  return plots;
}

function buildPlot(
  i: number,
  j: number,
  contents: string[],
  visited: Record<string, boolean>,
  partTwo: boolean,
): Plot {
  const plot: Plot = {
    letter: "",
    points: [],
    perimeter: 0,
    sides: 0,
  };

  const directions: Point[] = [
    { x: 1, y: 0 }, // Down
    { x: 0, y: 1 }, // Right
    { x: -1, y: 0 }, // Up
    { x: 0, y: -1 }, // Left
  ];

  const currentValue = contents[i][j];
  plot.letter = currentValue;
  const queue: Queue[] = [{ pos: { x: i, y: j }, currChar: currentValue }];

  while (queue.length > 0) {
    const element = queue.shift()!;
    const key = `${element.pos.x},${element.pos.y}`;

    if (visited[key]) {
      continue;
    }

    visited[key] = true;
    plot.points.push(element.pos);

    for (const dir of directions) {
      const newX = element.pos.x + dir.x;
      const newY = element.pos.y + dir.y;

      if (
        newX < 0 ||
        newY < 0 ||
        newX >= contents.length ||
        newY >= contents[newX].length
      ) {
        plot.perimeter++;
        continue;
      }

      if (plot.letter !== contents[newX][newY]) {
        plot.perimeter++;
        continue;
      }

      queue.push({ pos: { x: newX, y: newY }, currChar: element.currChar });
    }
  }

  if (partTwo) {
    let corners = 0;
    const orthogonalPairs: Point[][] = [];
    for (let i = 0; i < 4; i++) {
      orthogonalPairs.push([directions[i], directions[(i + 1) % 4]]);
    }

    for (const point of plot.points) {
      let cornerCount = 0;
      for (const pair of orthogonalPairs) {
        const posOne: Point = {
          x: point.x + pair[0].x,
          y: point.y + pair[0].y,
        };
        const posTwo: Point = {
          x: point.x + pair[1].x,
          y: point.y + pair[1].y,
        };

        if (
          !isInPoints(plot.points, posOne) && !isInPoints(plot.points, posTwo)
        ) {
          cornerCount++;
          continue;
        }

        const diagonal: Point = {
          x: point.x + pair[0].x + pair[1].x,
          y: point.y + pair[0].y + pair[1].y,
        };
        if (
          isInPoints(plot.points, posOne) &&
          isInPoints(plot.points, posTwo) &&
          !isInPoints(plot.points, diagonal)
        ) {
          cornerCount++;
          continue;
        }
      }
      if (cornerCount > 0) {
        corners += cornerCount;
      }
    }

    plot.sides = corners;
  }

  return plot;
}

function isInPoints(points: Point[], point: Point): boolean {
  return points.some((p) => p.x === point.x && p.y === point.y);
}
