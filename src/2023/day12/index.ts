import {
  getInputLines,
  log,
  memoize,
  RegexPatterns,
} from "../../utils/index.ts";
import { Solution } from "../../types.ts";

type Cache = Map<string, number>;
type Spring = "." | "#" | "?";

// const countArrangementsMem = memoize(countArrangements);

type Record = {
  springs: Spring;
  groups: number[];
  hasUnknownSprings: boolean;
};

export const day12: Solution = {
  part1: async (input: string) => {
    const records = parseInput(input);

    const total = getArrangementSum(records);

    return total;
  },

  part2: async (input: string) => {
    const records = parseInput(input, true);

    const total = getArrangementSum(records);

    return total;
  },
};

function getArrangementSum(records: Record[]): number {
  let total = 0;
  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    if (!record.hasUnknownSprings) continue;

    const { springs, groups } = record;
    const arrangements = countArrangements(springs, groups, 0, 0, 0, new Map());
    log(`${i + 1}: ${springs} => ${arrangements}`);
    total += arrangements;
  }

  return total;
}

function countArrangements(
  springs: Spring,
  groups: number[],
  patternIndex: number = 0,
  groupIndex: number = 0,
  currentGroupSize: number = 0,
  cache: Map<string, number> = new Map(),
): number {
  const key = getKey(patternIndex, groupIndex, currentGroupSize);
  if (cache.has(key)) {
    return cache.get(key)!;
  }

  if (patternIndex === springs.length) {
    if (currentGroupSize > 0) {
      return (groupIndex < groups.length &&
          currentGroupSize === groups[groupIndex] &&
          groupIndex === groups.length - 1)
        ? 1
        : 0;
    }
    return groupIndex === groups.length ? 1 : 0;
  }

  const element = springs[patternIndex];
  const possibilities = element === "?" ? [".", "#"] : [element];

  let result = 0;

  for (const possibility of possibilities) {
    switch (possibility) {
      case "#":
        if (
          groupIndex >= groups.length ||
          currentGroupSize + 1 > groups[groupIndex]
        ) {
          continue;
        }

        result += countArrangements(
          springs,
          groups,
          patternIndex + 1,
          groupIndex,
          currentGroupSize + 1,
          cache,
        );
        break;

      case ".":
        if (currentGroupSize === 0) {
          result += countArrangements(
            springs,
            groups,
            patternIndex + 1,
            groupIndex,
            0,
            cache,
          );
        } else if (
          groupIndex < groups.length && currentGroupSize === groups[groupIndex]
        ) {
          result += countArrangements(
            springs,
            groups,
            patternIndex + 1,
            groupIndex + 1,
            0,
            cache,
          );
        }
        break;
    }
  }

  cache.set(key, result);
  return result;
}

function parseInput(input: string, expanded: boolean = false): Record[] {
  const records = getInputLines(input).map((line) => {
    const [springsPart, groupsPart] = line.split(" ");
    let groups = groupsPart.split(",").map(Number);
    let springs = springsPart;

    if (expanded) {
      groups = Array(5).fill(groups).flat();
      springs = Array(5).fill(springs).join("?");
    }

    return {
      springs,
      groups,
      hasUnknownSprings: springs.includes("?"),
    } as Record;
  });

  return records;
}

function getKey(
  patternIndex: number,
  groupIndex: number,
  currentGroupSize: number,
): string {
  return `${patternIndex},${groupIndex},${currentGroupSize}`;
}
