import { DayTests, runTestPart } from "../../utils/test_utils.ts";
import { day9 as solution } from "./index.ts";
import { log } from "../../utils/index.ts";

const input1 = `0 3 6 9 12 15`;
const input2 = `1 3 6 10 15 21`;
const input3 = `10 13 16 21 30 45`;
const input4 = `${input1}\n${input2}\n${input3}`;

const tests: DayTests = {
  part1: [
    {
      input: input1,
      expected: 18,
    },
    {
      input: input2,
      expected: 28,
    },
    {
      input: input3,
      expected: 68,
    },
    {
      input: input4,
      expected: 114,
    },
  ],
  part2: [
    {
      input: input3,
      expected: 5,
    },
    {
      input: input1,
      expected: -3,
    },
    {
      input: input2,
      expected: 0,
    },
    {
      input: input4,
      expected: 2,
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
