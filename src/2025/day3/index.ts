import { getInputLines } from "../../utils/index.ts";
import { Solution } from "../../types.ts";

export const day3: Solution = {
  part1: async (input: string) => {
    const banks = getInputLines(input).map((line) =>
      line.split("").map(Number)
    );
    let sum = 0;
    for (const bank of banks) {
      sum += findMax(bank);
    }
    return sum;
  },

  part2: async (input: string) => {
    const banks = getInputLines(input).map((line) =>
      line.split("").map(Number)
    );
    let sum = 0;
    for (const bank of banks) {
      const result = findMax12Batteries(bank);
      sum += parseInt(result);
    }
    return sum;
  },
};

function findMax(arr: number[]): number {
  let maxValue = -Infinity;

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      const concatenated = parseInt(`${arr[i]}${arr[j]}`);

      if (concatenated > maxValue) {
        maxValue = concatenated;
      }
    }
  }

  return maxValue;
}

function findMax12Batteries(bank: number[]): string {
  const digits = bank;
  const n = digits.length;
  const toSelect = 12;

  const result: number[] = [];
  let startIndex = 0;

  for (let i = 0; i < toSelect; i++) {
    const remaining = toSelect - i - 1;

    const latestIndex = n - remaining - 1;

    let maxDigit = -1;
    let maxIndex = startIndex;

    for (let j = startIndex; j <= latestIndex; j++) {
      if (digits[j] > maxDigit) {
        maxDigit = digits[j];
        maxIndex = j;
      }
    }

    result.push(maxDigit);
    startIndex = maxIndex + 1;
  }

  return result.join("");
}
