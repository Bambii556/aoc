import { memoize } from "../../utils/index.ts";
import { Solution } from "../../types.ts";

export const day11: Solution = {
  part1: async (input: string) => {
    const numbers = input.split(" ").map(Number);
    const solve = createSolver();
    return numbers.reduce((sum, num) => sum + solve(num, 25), 0);
  },

  part2: async (input: string) => {
    const numbers = input.split(" ").map(Number);
    const solve = createSolver();
    return numbers.reduce((sum, num) => sum + solve(num, 75), 0);
  },
};

const createSolver = () => {
  const solve = memoize((x: number, steps: number): number => {
    if (steps === 0) {
      return 1;
    }

    if (x === 0) {
      return solve(1, steps - 1);
    }

    const strNum = x.toString();
    if (strNum.length % 2 === 0) {
      const mid = strNum.length >> 1;
      const left = parseInt(strNum.slice(0, mid), 10);
      const right = parseInt(strNum.slice(mid), 10);
      return solve(left, steps - 1) + solve(right, steps - 1);
    }

    return solve(x * 2024, steps - 1);
  });

  return solve;
};
