import { DayTests, runTestPart } from "../../utils/test_utils.ts";
import { day9 as solution } from "./index.ts";

const input = `2333133121414131402`;

const tests: DayTests = {
  part1: [
    {
      input,
      expected: 1928,
    },
  ],
  part2: [
    {
      input,
      expected: 2858,
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
