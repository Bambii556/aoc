import { getInputLines } from "../../utils/index.ts";
import { Solution } from "../../types.ts";

export const day2: Solution = {
  part1: async (input: string) => {
    const ids = getInputLines(input)[0].split(",").map((id) => ({
      start: parseInt(id.split("-")[0]),
      end: parseInt(id.split("-")[1]),
    }));
    let sum = 0;

    ids.forEach((id) => {
      for (let i = id.start; i <= id.end; i++) {
        const num = i;
        const item = num.toString();
        if (item.length % 2 === 0) {
          const left = item.slice(0, item.length / 2);
          const right = item.slice(item.length / 2);
          if (left === right) {
            sum += num;
          }
        }
      }
    });

    return sum;
  },

  part2: async (input: string) => {
    const ids = getInputLines(input)[0].split(",").map((id) => ({
      start: parseInt(id.split("-")[0]),
      end: parseInt(id.split("-")[1]),
    }));
    let sum = 0;

    ids.forEach((id) => {
      for (let i = id.start; i <= id.end; i++) {
        const num = i;
        if (hasRepeatingPattern(num)) {
          sum += num;
        }
      }
    });

    return sum;
  },
};

function hasRepeatingPattern(num: number): boolean {
  const str = num.toString();
  const len = str.length;

  for (let patternLen = 1; patternLen <= len / 2; patternLen++) {
    if (len % patternLen === 0) {
      const pattern = str.substring(0, patternLen);
      const repetitions = len / patternLen;

      if (pattern.repeat(repetitions) === str) {
        return true;
      }
    }
  }

  return false;
}
