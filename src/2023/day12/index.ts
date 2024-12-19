import { getInputLines, RegexPatterns } from "../../utils/index.ts";
import { Solution } from "../../types.ts";

type Spring = "." | "#" | "?";

type Record = {
  springs: Spring[];
  groups: number[];
  hadUnknownSprings: boolean;
};

export const day12: Solution = {
  part1: async (input: string) => {
    const records = parseInput(input);

    let total = 0;
    for (let i = 0; i < records.length; i++) {
      const record = records[i];
      if (!record.hadUnknownSprings) continue;

      const { springs, groups } = record;
      const arrangements = getArrangements(springs, groups);
      total += arrangements;
    }

    return total;
  },

  part2: async (input: string) => {
    const records = parseInput(input);

    return 0;
  },
};

function getArrangements(
  springs: Spring[],
  groups: number[],
): number {
  return 0;
}

function parseInput(input: string): Record[] {
  const records = getInputLines(input).map((line) => {
    const groups = line.match(RegexPatterns.numbers)!.map(Number);
    const springs = line.split(" ")[0].split("") as Spring[];
    return {
      springs,
      groups,
      hadUnknownSprings: springs.some((spring) => spring === "?"),
    } as Record;
  });

  return records;
}
