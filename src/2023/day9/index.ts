import { getInputLines } from "../../utils/index.ts";
import { Solution } from "../../types.ts";

export const day9: Solution = {
  part1: async (input: string) => {
    const lines = getInputLines(input).map((line) =>
      line.split(" ").map(Number)
    );
    let sum = 0;
    for (const line of lines) {
      const lastDigits: number[] = [];
      lastDigits.push(line[line.length - 1]);
      let currentSum = 0;
      console.log(`Starting line: ${JSON.stringify(line)}`);
      let diffs: number[] = [];
      do {
        currentSum = 0;

        diffs = extrapolate(diffs.length === 0 ? line : diffs);
        console.log(JSON.stringify(diffs));
        lastDigits.push(diffs[diffs.length - 1]);

        currentSum = diffs.reduce((a, b) => a + b, 0);
      } while (currentSum !== 0);

      const finalValue = lastDigits.reduce((a, b) => a + b, 0);
      console.log(
        `Final value for line: ${JSON.stringify(lastDigits)} => ${finalValue}`,
      );
      console.log("-------------------");
      sum += finalValue;
    }

    console.log(`Final: ${sum}`);
    return sum;
  },

  part2: async (input: string) => {
    const lines = getInputLines(input).map((line) =>
      line.split(" ").map(Number)
    );
    let sum = 0;
    for (const line of lines) {
      const firstDigits: number[] = [];
      firstDigits.push(line[0]);
      let currentSum = 0;
      console.log(`Starting line: ${JSON.stringify(line)}`);
      let diffs: number[] = [];
      do {
        currentSum = 0;

        diffs = extrapolate(diffs.length === 0 ? line : diffs);
        console.log(JSON.stringify(diffs));
        firstDigits.push(diffs[0]);

        currentSum = diffs.reduce((a, b) => a + b, 0);
      } while (currentSum !== 0);

      // Reverse
      firstDigits.reverse();

      let nextVal = 0;
      for (let i = 0; i < firstDigits.length; i++) {
        const first = firstDigits[i];
        nextVal = first - nextVal;
      }
      sum += nextVal;
    }

    return sum;
  },
};

function extrapolate(nums: number[]): number[] {
  const result: number[] = [];
  const len = nums.length;

  for (let i = 0; i < len; i++) {
    if (i + 1 >= len) break;

    const current = nums[i];
    const next = nums[i + 1];

    const diff = next - current;
    result.push(diff);
  }

  return result;
}
