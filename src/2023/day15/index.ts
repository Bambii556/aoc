import { getInputLines } from "../../utils/index.ts";
import { Solution } from "../../types.ts";

interface Box {
  label: string;
  lens: number;
}

export const day15: Solution = {
  part1: async (input: string) => {
    const items = parseInput(input);
    let sum = 0;
    for (const item of items) {
      const values = stringToAsciiNumbers(item);
      sum += hashAlgo(values);
    }

    return sum;
  },

  part2: async (input: string) => {
    const items = parseInput(input).map((item) => {
      const operation = item.includes("=");
      let lens = 0;
      let label = "";
      if (operation) {
        const addIndex = item.indexOf("=");
        lens = Number(item.slice(addIndex + 1));
        label = item.slice(0, addIndex);
      } else {
        label = item.slice(0, item.indexOf("-"));
      }
      const hash = hashAlgo(stringToAsciiNumbers(label));

      return {
        label,
        add: operation,
        lens,
        hash,
      };
    });
    const list = createBoxes();

    for (const item of items) {
      const boxes = list.get(item.hash);
      if (!boxes) continue;

      const existingBox = boxes.find((box) => box.label === item.label);
      if (item.add) {
        if (existingBox) {
          existingBox.lens = item.lens;
        } else {
          boxes.push({ label: item.label, lens: item.lens });
        }
      } else {
        if (existingBox) {
          boxes.splice(boxes.indexOf(existingBox), 1);
        }
      }
    }
    let sum = 0;

    const boxArr = Array.from(list.values());
    for (let i = 0; i < boxArr.length; i++) {
      const boxes = boxArr[i];
      for (let b = 0; b < boxes.length; b++) {
        const box = boxes[b];
        sum += (i + 1) * (b + 1) * box.lens;
      }
    }

    return sum;
  },
};

function parseInput(input: string): string[] {
  return input.split(",");
}

function createBoxes() {
  const boxes: Map<number, Box[]> = new Map();

  for (let i = 0; i < 256; i++) {
    boxes.set(i, []);
  }

  return boxes;
}

function stringToAsciiNumbers(code: string): number[] {
  const asciiValues: number[] = [];
  for (let i = 0; i < code.length; i++) {
    asciiValues.push(code.charCodeAt(i));
  }
  return asciiValues;
}

function hashAlgo(input: number[]) {
  let currentVal = 0;
  for (const val of input) {
    currentVal += val;
    currentVal *= 17;
    currentVal %= 256;
  }
  return currentVal;
}
