import { getInputLines } from "../../utils/index.ts";
import { Solution } from "../../types.ts";

export const day2: Solution = {
  part1: async (input: string) => {
    const lines = getInputLines(input);

    const reports = lines.map((line) => ({
      valid: isValidSequence(parseLevels(line)),
    }));
    return reports.filter((a) => a.valid).length;
  },

  part2: async (input: string) => {
    const lines = getInputLines(input);
    let safeCount = 0;

    lines.forEach((line) => {
      const levels = parseLevels(line);
      if (isValidSequence(levels)) {
        safeCount++;
        return;
      }

      // Try removing each number
      for (let i = 0; i < levels.length; i++) {
        const newLevels = [...levels.slice(0, i), ...levels.slice(i + 1)];
        if (isValidSequence(newLevels)) {
          safeCount++;
          break;
        }
      }
    });

    return safeCount;
  },
};

function isValidSequence(levels: number[]): boolean {
  if (levels.length < 2) return true;

  let increasing = true;
  let decreasing = true;

  for (let i = 0; i < levels.length - 1; i++) {
    const diff = levels[i + 1] - levels[i];
    if (Math.abs(diff) < 1 || Math.abs(diff) > 3) return false;

    if (diff > 0) decreasing = false;
    if (diff < 0) increasing = false;
    if (!increasing && !decreasing) return false;
  }

  return true;
}

function printLevels(levels: number[], index: number) {
  const line = levels
    .map((num, i) => i === index ? `(${num})` : `${num}`)
    .join(" ");
  console.log(`[ ${line} ]`);
}

function parseLevels(line: string) {
  return line.split(" ").map((level) => parseInt(level));
}
