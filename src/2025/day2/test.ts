import { DayTests, runTestPart } from "../../utils/test_utils.ts";
import { day2 as solution } from "./index.ts";
import { log } from "../../utils/index.ts";

const input =
  `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`;

const tests: DayTests = {
  part1: [
    {
      input,
      expected: 1227775554,
    },
  ],
  part2: [
    {
      input,
      expected: 4174379265,
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
