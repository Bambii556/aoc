import { log, sum } from "../../utils/index.ts";
import { Solution } from "../../types.ts";

interface Match {
  index: number;
  type: MatchType;
  value: string;
}

enum MatchType {
  MUL,
  DO,
  DONT,
}

export const day3: Solution = {
  part1: async (input: string) => {
    const pattern = "mul\\(\\d+,\\d+\\)";
    const matches = [...input.matchAll(new RegExp(pattern, "g"))];

    const instructions = matches.map((match) => {
      const [a, b] = match[0].match(/\d+/g)!;
      return { a: parseInt(a), b: parseInt(b) };
    });

    const result: number[] = [];

    for (const instruction of instructions) {
      result.push(instruction.a * instruction.b);
    }

    log("things");
    return sum(result);
  },

  part2: async (input: string) => {
    const pattern = "mul\\(\\d+,\\d+\\)";
    const doPattern = "do\\(\\)";
    const dontPatter = "don't\\(\\)";
    const matches: Match[] = [
      ...(input.matchAll(new RegExp(pattern, "g")).map((match) => {
        return { index: match.index, type: MatchType.MUL, value: match[0] };
      })),
    ];
    const doMatches = [
      ...(input.matchAll(new RegExp(doPattern, "g")).map((match) => {
        return { index: match.index, type: MatchType.DO, value: match[0] };
      })),
    ];
    const dontMatches = [
      ...(input.matchAll(new RegExp(dontPatter, "g")).map((match) => {
        return { index: match.index, type: MatchType.DONT, value: match[0] };
      })),
    ];

    const combined: Match[] = [
      ...matches,
      ...doMatches,
      ...dontMatches,
    ];

    const sorted = combined.slice().sort((a, b) => a.index - b.index);

    const result: number[] = [];
    let enabled = true;

    for (const m of sorted) {
      if (m.type === MatchType.DO) {
        enabled = true;
        continue;
      }
      if (m.type === MatchType.DONT) {
        enabled = false;
        continue;
      }

      if (enabled && m.type === MatchType.MUL) {
        const [a, b] = m.value.match(/\d+/g)!;
        result.push(parseInt(a) * parseInt(b));
      }
    }

    return sum(result);
  },
};
