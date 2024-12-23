import { log } from "../../utils/index.ts";
import { DayTests, runTestPart } from "../../utils/test_utils.ts";
import { day22 as solution } from "./index.ts";

const input = `1
10
100
2024`;

const tests: DayTests = {
  part1: [
    {
      input,
      expected: 37327623,
    },
  ],
  part2: [
    {
      input,
      expected: 23,
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
