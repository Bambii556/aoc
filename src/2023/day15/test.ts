import { DayTests, runTestPart } from "../../utils/test_utils.ts";
import { day15 as solution } from "./index.ts";
import { log } from "../../utils/index.ts";

const input = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;

const tests: DayTests = {
  part1: [
    {
      input,
      expected: 1320,
    },
  ],
  part2: [
    {
      input,
      expected: 145,
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
