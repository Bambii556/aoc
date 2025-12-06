import { DayTests, runTestPart } from "../../utils/test_utils.ts";
import { day6 as solution } from "./index.ts";
import { log } from "../../utils/index.ts";

const input = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;

const tests: DayTests = {
  part1: [
    {
      input,
      expected: 4277556,
    },
  ],
  part2: [
    {
      input,
      expected: 3263827,
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
