import { DayTests, runTestPart } from "../../utils/test_utils.ts";
import { day2 as solution } from "./index.ts";
import { log } from "../../utils/index.ts";

const input = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

const tests: DayTests = {
  part1: [
    {
      input,
      expected: 2,
    },
  ],
  part2: [
    {
      input,
      expected: 4,
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
