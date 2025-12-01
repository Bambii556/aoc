import { getInputLines } from "../../utils/index.ts";
import { Solution } from "../../types.ts";

export const day1: Solution = {
  part1: async (input: string) => {
    const lines = getInputLines(input).map((l) => ({
      rotation: l.substring(0, 1),
      value: parseInt(l.substring(1)),
    }));
    const start = 50;
    let currentPosition = start;
    let zeroCount = 0;

    for (const line of lines) {
      if (line.rotation === "L") {
        currentPosition -= line.value;
        while (currentPosition < 0) {
          currentPosition += 100;
        }
      } else {
        currentPosition += line.value;
        while (currentPosition > 99) {
          currentPosition -= 100;
        }
      }
      if (currentPosition === 0) {
        zeroCount++;
      }
    }
    return zeroCount;
  },

  part2: async (input: string) => {
    const lines = getInputLines(input).map((l) => ({
      rotation: l.substring(0, 1),
      value: parseInt(l.substring(1)),
    }));
    const start = 50;
    let currentPos = start;
    let zeroCount = 0;

    for (const line of lines) {
      for (let i = 0; i < line.value; i++) {
        if (line.rotation === "L") {
          currentPos--;
          if (currentPos < 0) currentPos = 99;
        } else {
          currentPos++;
          if (currentPos > 99) currentPos = 0;
        }
        if (currentPos === 0) {
          zeroCount++;
        }
      }
    }
    return zeroCount;
  },
};
