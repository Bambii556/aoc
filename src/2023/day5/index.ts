import { Solution } from "../../types.ts";
import { findNumbers } from "../../utils/array.ts";
import { log, timerSync } from "../../utils/logger.ts";

type Category =
  | "seed"
  | "soil"
  | "fertilizer"
  | "water"
  | "light"
  | "temperature"
  | "humidity"
  | "location";

type Range = {
  start: number;
  end: number;
  step: number;
};

type RangeMap = {
  source: Range[];
  destination: Range[];
};

type Mapping = {
  from: Category;
  to: Category;
  ranges: RangeMap;
};

type Almanac = {
  seeds: number[];
  maps: Mapping[];
};

const categoryPairs: [Category, Category][] = [
  ["seed", "soil"],
  ["soil", "fertilizer"],
  ["fertilizer", "water"],
  ["water", "light"],
  ["light", "temperature"],
  ["temperature", "humidity"],
  ["humidity", "location"],
];

export const day5: Solution = {
  part1: async (input: string) => {
    const almanac = parseAlmanac(input);

    let minLocation = Infinity;

    for (const seed of almanac.seeds) {
      const seedLocation = getLocation(almanac, seed);
      minLocation = Math.min(seedLocation, minLocation);
    }

    return minLocation;
  },

  part2: async (input: string) => {
    const almanac = parseAlmanac(input);

    let minLocation = Infinity;

    for (let i = 0; i < almanac.seeds.length; i += 2) {
      const start = almanac.seeds[i];
      const length = almanac.seeds[i + 1];
      const end = start + length - 1;

      log(` - Running ${i / 2 + 1}/${almanac.seeds.length / 2} - ${length}`);
      const CHUNK_SIZE = 1000000;
      for (let s = start; s <= end; s += CHUNK_SIZE) {
        const chunkEnd = Math.min(s + CHUNK_SIZE - 1, end);

        for (let seed = s; seed <= chunkEnd; seed++) {
          const location = getLocation(almanac, seed);
          if (location < minLocation) {
            minLocation = location;
          }
        }
      }
    }

    return minLocation;
  },
};

function getLocation(almanac: Almanac, seed: number): number {
  let value = seed;

  for (const mapping of almanac.maps) {
    value = getValueFromKey(mapping.ranges, value);
  }

  return value;
}

function getValueFromKey(mapping: RangeMap, key: number): number {
  const { source, destination } = mapping;
  const len = source.length;

  for (let i = 0; i < len; i++) {
    const src = source[i];
    if (key >= src.start && key <= src.end) {
      return destination[i].start + key - src.start;
    }
  }
  return key;
}

function parseAlmanac(input: string): Almanac {
  const sections = input.split("\n\n");

  const almanac: Almanac = {
    seeds: [],
    maps: [],
  };

  sections.forEach((section, index) => {
    if (index === 0) {
      almanac.seeds = findNumbers(section);
      return;
    }

    const [from, to] = categoryPairs[index - 1];

    const ranges: RangeMap = {
      source: [],
      destination: [],
    };

    const lines = section.split("\n").slice(1);
    lines.forEach((line) => {
      const [destStart, sourceStart, length] = findNumbers(line);

      ranges.destination.push({
        start: destStart,
        end: destStart + length - 1,
        step: length,
      });

      ranges.source.push({
        start: sourceStart,
        end: sourceStart + length - 1,
        step: length,
      });
    });

    almanac.maps.push({
      from,
      to,
      ranges,
    });
  });

  return almanac;
}
