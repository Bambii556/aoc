import { DayTests, runTestPart } from "../../utils/test_utils.ts";
import { day1 as solution } from "./index.ts";
import { log } from "../../utils/index.ts";

const tests: DayTests = {
  part1: [
    {
      input: `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`,
      expected: 142,
    },
  ],
  part2: [
    {
      input: `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`,
      expected: 281,
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
