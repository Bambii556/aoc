import { DayTests, runTestPart } from "../../utils/test_utils.ts";
import { day11 as solution } from "./index.ts";
import { log } from "../../utils/index.ts";

const input = `125 17`;

const tests: DayTests = {
  part1: [
    {
      input,
      expected: 55312,
    },
  ],
  part2: [],
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
