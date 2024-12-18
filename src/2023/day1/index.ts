import { getInputLines, RegexPatterns, sum } from "../../utils/index.ts";
import { Solution } from "../../types.ts";

export const day1: Solution = {
  part1: async (input: string) => {
    const lines = getInputLines(input);
    return getSum(lines);
  },

  part2: async (input: string) => {
    const lines = getInputLines(input);
    return getSumIncludingWords(lines);
  },
};

function getSum(lines: string[]) {
  const lineNumbers = lines.map((line) =>
    line.split("").map(Number).filter((x) => !isNaN(x))
  );

  const values = lineNumbers.map((line) => {
    const first = line[0];
    const last = line[line.length - 1];
    return Number(`${first}${last}`);
  });

  return sum(values);
}

function findFirstAndLastNumber(line: string): [number, number] {
  const numberMap: Record<string, string> = {
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8",
    "nine": "9",
  };

  let firstNum: { value: string; index: number } | null = null;
  let lastNum: { value: string; index: number } | null = null;

  // Find all digits first
  for (let i = 0; i < line.length; i++) {
    if (RegexPatterns.numbers.test(line[i])) {
      if (firstNum === null) firstNum = { value: line[i], index: i };
      lastNum = { value: line[i], index: i };
    }
  }

  // Find all number words and update first/last if they come before/after
  for (const [word, digit] of Object.entries(numberMap)) {
    let index = line.indexOf(word);
    while (index !== -1) {
      if (firstNum === null || index < firstNum.index) {
        firstNum = { value: digit, index: index };
      }
      if (lastNum === null || index > lastNum.index) {
        lastNum = { value: digit, index: index };
      }
      index = line.indexOf(word, index + 1);
    }
  }

  if (!firstNum || !lastNum) {
    throw new Error(`No numbers found in line: ${line}`);
  }

  return [Number(firstNum.value), Number(lastNum.value)];
}

function getSumIncludingWords(lines: string[]): number {
  const values = lines.map((line) => {
    const [first, last] = findFirstAndLastNumber(line);
    return first * 10 + last;
  });

  return sum(values);
}
