import { DayTests, runTestPart } from "../../utils/test_utils.ts";
import { day17 as solution } from "./index.ts";
import { log } from "../../utils/index.ts";

const tests: DayTests = {
  part1: [
    {
      input: `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`,
      expected: "4,6,3,5,6,3,5,2,1,0",
    },
  ],
  part2: [
    {
      input: `Register A: 2024
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0`,
      expected: 117440,
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
