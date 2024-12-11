import { DayTests, runTestPart } from "../../utils/test_utils.ts";
import { day3 as solution, log } from "./index.ts";

const input =
  `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;

const tests: DayTests = {
  part1: [
    {
      input,
      expected: 161,
    },
  ],
  part2: [
    {
      input,
      expected: 48,
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
