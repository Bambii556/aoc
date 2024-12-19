import { log, memoize } from "../../utils/index.ts";
import { Solution } from "../../types.ts";

const canMakePatternMem = memoize(canMakePattern);
const countDifferentWaysMem = memoize(countDifferentWays);

export const day19: Solution = {
  part1: async (input: string) => {
    const { patterns, towels } = parseInput(input);

    let count = 0;
    for (const pattern of patterns) {
      const result = canMakePatternMem(pattern, towels);
      if (result) {
        count++;
      }
    }

    return count;
  },

  part2: async (input: string) => {
    const { patterns, towels } = parseInput(input);

    let count = 0;
    for (const pattern of patterns) {
      const result = countDifferentWaysMem(pattern, towels);
      if (result) {
        count += result;
      }
    }

    return count;
  },
};

function canMakePattern(pattern: string, towels: string[]) {
  if (pattern === "") return true;

  for (const towel of towels) {
    if (pattern.startsWith(towel)) {
      const remaining = pattern.slice(towel.length);
      if (canMakePatternMem(remaining, towels)) {
        return true;
      }
    }
  }
  return false;
}

function countDifferentWays(pattern: string, towels: string[]): number {
  if (pattern === "") return 1;

  let total = 0;

  for (const towel of towels) {
    if (pattern.startsWith(towel)) {
      const remaining = pattern.slice(towel.length);
      total += countDifferentWaysMem(remaining, towels);
    }
  }
  return total;
}

function parseInput(input: string) {
  const sections = input.split("\n\n");
  const towels = sections[0].trim().split(",").map((t) => t.trim());
  return {
    towels,
    patterns: sections[1].trim().split("\n").map((t) => t.trim()),
  };
}
