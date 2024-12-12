import { DayTests, runTestPart } from "../../utils/test_utils.ts";
import { day12 as solution } from "./index.ts";
import { log } from "../../utils/index.ts";

const tests: DayTests = {
  part1: [
    {
      input: `AAAA
BBCD
BBCC
EEEC`,
      expected: 140,
    },
    {
      input: `OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`,
      expected: 772,
    },
    {
      input: `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`,
      expected: 1930,
    },
  ],
  part2: [
    {
      input: `AAAA
BBCD
BBCC
EEEC`,
      expected: 80,
    },
    {
      input: `OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`,
      expected: 436,
    },
    {
      input: `EEEEE
EXXXX
EEEEE
EXXXX
EEEEE`,
      expected: 236,
    },
    {
      input: `AAAAAA
AAABBA
AAABBA
ABBAAA
ABBAAA
AAAAAA`,
      expected: 368,
    },
    {
      input: `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`,
      expected: 1206,
    },
  ],
};

export async function runPart1Tests() {
  if (!tests.part1?.length) {
    log("⚠️ No tests defined for Part 1\n");
    return true;
  }
  return await runTestPart(solution.part1, tests.part1, 1);
}

export async function runPart2Tests() {
  if (!tests.part2?.length) {
    log("⚠️ No tests defined for Part 2\n");
    return true;
  }
  return await runTestPart(solution.part2, tests.part2, 2);
}
