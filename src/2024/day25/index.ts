import { getInputLines, log } from "../../utils/index.ts";
import { Solution } from "../../types.ts";

type Schematic = {
  type: "lock" | "key";
  heights: number[];
  totalHeight: number;
};

export const day25: Solution = {
  part1: async (input: string) => {
    const schematics = parseInput(input);
    const locks = schematics.filter((s) => s.type === "lock");
    const keys = schematics.filter((s) => s.type === "key");

    const result = countValidPairs(locks, keys);
    return result;
  },

  part2: async (input: string) => {
    return "Not implemented yet";
  },
};

function parseInput(input: string): Schematic[] {
  const parts = input.split("\n\n");
  const schematics: Schematic[] = [];

  for (const part of parts) {
    const device = part.split("\n");
    const schematic = parseSchematic(device);
    if (schematic) {
      schematics.push(schematic);
    }
  }

  return schematics;
}

function parseSchematic(lines: string[]): Schematic | null {
  if (lines.length === 0 || lines.every((line) => line.trim() === "")) {
    return null;
  }

  const isLock = lines[0] === "#".repeat(lines[0].length);
  const type = isLock ? "lock" : "key";

  const width = lines[0].length;
  const heights: number[] = [];

  // columns
  for (let col = 0; col < width; col++) {
    let height = 0;

    if (isLock) {
      for (let row = 0; row < lines.length; row++) {
        if (lines[row][col] === "#") {
          height = row;
          continue;
        }
        break;
      }
    } else {
      // For keys, count from bottom up
      for (let row = 0; row < lines.length; row++) {
        if (lines[row][col] === "#") {
          height = lines.length - 1 - row;
          break;
        }
      }
    }
    heights.push(height);
  }

  return { type, heights, totalHeight: lines.length - 1 };
}

function canFit(
  lock: number[],
  key: number[],
  totalHeight: number,
): boolean {
  return lock.every((pinHeight, i) => {
    const keyHeight = key[i];
    return pinHeight + keyHeight < totalHeight;
  });
}

function countValidPairs(locks: Schematic[], keys: Schematic[]): number {
  let validPairs = 0;

  for (const lock of locks) {
    for (const key of keys) {
      if (canFit(lock.heights, key.heights, lock.totalHeight)) {
        validPairs++;
        log(`${lock.heights.join(",")} and key ${key.heights.join(",")} Fit`);
      } else {
        log(
          `${lock.heights.join(",")} and key ${key.heights.join(",")} overlap`,
        );
      }
    }
  }

  return validPairs;
}
