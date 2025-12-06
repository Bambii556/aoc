import { getInputLines } from "../../utils/index.ts";
import { Solution } from "../../types.ts";

type Operation = "+" | "*";

interface Problem {
  numbers: number[];
  operation: Operation;
}

export const day6: Solution = {
  part1: async (input: string) => {
    const problems = parseMathInput(input);
    let sum = 0;

    for (const problem of problems) {
      sum += problemSum(problem);
    }
    return sum;
  },

  part2: async (input: string) => {
    const problems = parseMathInputPart2(input);
    let sum = 0;
    for (const problem of problems) {
      sum += problemSum(problem);
    }
    return sum;
  },
};

function problemSum(problem: Problem): number {
  return problem.numbers.reduce((acc, num) => {
    if (problem.operation === "+") {
      return acc + num;
    } else {
      return acc * num;
    }
  }, problem.operation === "+" ? 0 : 1);
}

function parseMathInputPart2(input: string): Problem[] {
  const lines = getInputLines(input);

  const maxLength = Math.max(...lines.map((line) => line.length));

  const problems: Problem[] = [];
  let currentNumbers: number[] = [];

  for (let col = maxLength - 1; col >= 0; col--) {
    const column = lines.map((line) => line[col]);

    const digits = column.slice(0, -1).filter((x) => x !== " ");

    if (digits.length > 0) {
      currentNumbers.push(parseInt(digits.join(""), 10));
    }

    const lastChar = column[column.length - 1];
    if (lastChar === "+" || lastChar === "*") {
      problems.push({
        numbers: currentNumbers,
        operation: lastChar as Operation,
      });

      currentNumbers = [];
      continue;
    }
  }

  return problems;
}

function parseMathInput(input: string): Problem[] {
  const lines = getInputLines(input).map((line) =>
    line.split(" ").filter(Boolean)
  );

  const maxWidth = Math.max(...lines.map((line) => line.length));

  const problems: Problem[] = [];

  for (let col = 0; col < maxWidth; col++) {
    const column = lines.map((line) => line[col]);
    const isEmptyColumn = column.every((char) => char === " ");

    if (!isEmptyColumn) {
      problems.push(parseProblem(column));
    }
  }

  return problems;
}

function parseProblem(chars: string[]): Problem {
  const operation = chars[chars.length - 1] as Operation;

  const numbers: number[] = [];

  for (let i = 0; i < chars.length - 1; i++) {
    const char = chars[i];
    numbers.push(parseInt(char, 10));
  }

  return { numbers, operation };
}
