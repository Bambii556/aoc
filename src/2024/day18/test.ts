import { DayTests, runTestPart } from "../../utils/test_utils.ts";
import { day18 as solution } from "./index.ts";
import { log } from "../../utils/index.ts";

const input = `12
6x6
5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0`;

const tests: DayTests = {
  part1: [
    {
      input,
      expected: 22,
    },
  ],
  part2: [
    {
      input,
      expected: "6,1",
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
