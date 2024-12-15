import { log } from "../../utils/logger.ts";
import { DayTests, runTestPart } from "../../utils/test_utils.ts";
import { day14 as solution } from "./index.ts";

const input = `11x7
p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`;

const tests: DayTests = {
  part1: [
    //     {
    //       input: `11x7
    // p=2,4 v=2,-3`,
    //       expected: 1,
    //     },
    {
      input,
      expected: 12,
    },
  ],
  part2: [
    // {
    //   input,
    //   expected: 0,
    // },
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
