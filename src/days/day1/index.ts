import {
  countOccurrences,
  getInputLines,
  Log,
  sortNumbers,
  sum,
} from "../../utils/index.ts";
import { Solution } from "../../types.ts";

export const day1: Solution = {
  part1: async (input: string) => {
    const lines = getInputLines(input);

    const rows = split(lines);
    const sortedRows = sort(rows);
    const routeCosts: number[] = [];

    for (let index = 0; index < sortedRows.left.length; index++) {
      const left = sortedRows.left[index];
      const right = sortedRows.right[index];

      if (left > right) {
        routeCosts.push(left - right);
      } else {
        routeCosts.push(right - left);
      }
    }

    return sum(routeCosts);
  },

  part2: async (input: string) => {
    const lines = getInputLines(input);

    const rows = split(lines);
    const routeCosts: number[] = [];

    for (let index = 0; index < rows.left.length; index++) {
      const leftValue = rows.left[index];
      routeCosts.push(leftValue * countOccurrences(rows.right, leftValue));
    }

    return sum(routeCosts);
  },
};

function split(lines: string[]): { left: number[]; right: number[] } {
  const leftList: number[] = [];
  const rightList: number[] = [];
  lines.forEach((line) => {
    const values = line.split(" ");

    leftList.push(Number(values[0]));
    rightList.push(Number(values[values.length - 1]));
  });

  return {
    left: leftList,
    right: rightList,
  };
}

function sort(
  { left, right }: { left: number[]; right: number[] },
): { left: number[]; right: number[] } {
  return {
    left: sortNumbers(left),
    right: sortNumbers(right),
  };
}
