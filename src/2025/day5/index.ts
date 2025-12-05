import { Solution } from "../../types.ts";

interface Range {
  min: number;
  max: number;
}

export const day5: Solution = {
  part1: async (input: string) => {
    const { ranges, ids } = parseInput(input);
    let fresh = 0;

    ids.forEach((id) => {
      if (isInRange(ranges, id)) {
        fresh++;
      }
    });

    return fresh;
  },

  part2: async (input: string) => {
    const { ranges } = parseInput(input);
    const merged = mergeRanges(ranges);
    return merged.reduce((sum, range) => sum + (range.max - range.min + 1), 0);
  },
};

function isInRange(ranges: Range[], value: number) {
  for (const range of ranges) {
    if (value >= range.min && value <= range.max) {
      return true;
    }
  }
  return false;
}

function parseInput(input: string) {
  const parts = input.split("\n\n");
  const ranges = parts[0].split("\n").map((line) => {
    const [min, max] = line.split("-").map(Number);
    return { min, max };
  });

  return {
    ranges,
    ids: parts[1].split("\n").map(Number),
  };
}

function mergeRanges(ranges: Range[]): Range[] {
  ranges.sort((a, b) => a.min - b.min);

  const merged: Range[] = [ranges[0]];

  for (let i = 1; i < ranges.length; i++) {
    const current = ranges[i];
    const last = merged[merged.length - 1];

    if (current.min <= last.max + 1) {
      last.max = Math.max(last.max, current.max);
    } else {
      merged.push(current);
    }
  }

  return merged;
}
