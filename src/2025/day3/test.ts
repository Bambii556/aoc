import { DayTests, runTestPart } from "../../utils/test_utils.ts";
import { day3 as solution } from "./index.ts";
import { log } from "../../utils/index.ts";

const input = `987654321111111
811111111111119
234234234234278
818181911112111`;

const tests: DayTests = {
  part1: [
    {
      input,
      expected: 357,
    },
  ],
  part2: [
    {
      input,
      expected: 3121910778619,
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
