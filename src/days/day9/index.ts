import { Log } from "../../utils/index.ts";
import { Solution } from "../../types.ts";
import { sum } from "../../utils/array.ts";

export const day9: Solution = {
  part1: async (input: string) => {
    const blocks = parseInput(input);
    const compactedBlocks = compactBlocks(blocks);
    return getChecksum(compactedBlocks);
  },

  part2: async (input: string) => {
    const blocks = parseInput(input);
    const compactedFiles = compactFiles(blocks);
    return getChecksum(compactedFiles);
  },
};

function parseInput(input: string) {
  const blocks: string[] = [];
  let isFile = true;
  let fileIndex = 0;

  for (let index = 0; index < input.length; index++) {
    const element = parseInt(input[index]);
    if (isFile) {
      for (let i = 0; i < element; i++) {
        blocks.push(fileIndex.toString());
      }
      fileIndex++;
    } else {
      for (let i = 0; i < element; i++) {
        blocks.push(".");
      }
    }

    isFile = !isFile;
  }

  return blocks;
}

function compactBlocks(blocks: string[]) {
  let compactedBlocks: string[] = blocks;
  let isValid = true;
  do {
    [compactedBlocks, isValid] = swapDotWithValue(compactedBlocks);
  } while (isValid);

  return compactedBlocks;
}

function compactFiles(blocks: string[]) {
  const compactedFiles = blocks;
  const valueGroups = findValueGroups(blocks);
  const dotGroups = findDotGroups(blocks);

  for (let i = 0; i < valueGroups.length; i++) {
    const valueGroup = valueGroups[i];
    const dotGroup = dotGroups.find((dot) =>
      dot.startIndex < valueGroup.startIndex &&
      dot.count >= valueGroup.count
    );

    if (dotGroup) {
      for (let j = 0; j < valueGroup.count; j++) {
        compactedFiles[dotGroup.startIndex + j] = valueGroup.value;
        compactedFiles[valueGroup.startIndex + j] = ".";
      }
      if (dotGroup.count - valueGroup.count <= 0) {
        dotGroups.splice(dotGroups.indexOf(dotGroup), 1);
        continue;
      }

      dotGroup.count -= valueGroup.count;
      dotGroup.startIndex += valueGroup.count;
    }
  }

  // console.log(compactedFiles.join(""));
  return compactedFiles;
}

function getChecksum(blocks: string[]) {
  const checksums: number[] = [];

  for (let index = 0; index < blocks.length; index++) {
    const value = blocks[index];
    if (value === ".") {
      continue;
    }
    checksums.push(index * parseInt(value));
  }

  return sum(checksums);
}

function swapDotWithValue(arr: string[]): [string[], boolean] {
  const firstDotIndex = arr.findIndex((val) => val === ".");
  const lastValueIndex = arr.findLastIndex((val) => val !== ".");

  if (
    firstDotIndex !== -1 && lastValueIndex !== -1 &&
    firstDotIndex < lastValueIndex
  ) {
    [arr[firstDotIndex], arr[lastValueIndex]] = [
      arr[lastValueIndex],
      arr[firstDotIndex],
    ];
    return [arr, true];
  }

  return [arr, false];
}

type DotGroup = {
  count: number;
  startIndex: number;
};

type ValueGroup = DotGroup & {
  value: string;
};

function findValueGroups(arr: string[]): ValueGroup[] {
  const groups: ValueGroup[] = [];
  let currentValue = arr[arr.length - 1];
  let count = 1;
  let startIndex = arr.length - 1;

  for (let i = arr.length - 2; i >= 0; i--) {
    if (arr[i] === currentValue && arr[i] !== ".") {
      count++;
      startIndex = i;
    } else {
      if (count >= 1 && currentValue !== ".") {
        groups.push({ value: currentValue, count, startIndex });
      }
      currentValue = arr[i];
      count = 1;
      startIndex = i;
    }
  }
  if (count >= 1 && currentValue !== ".") {
    groups.push({ value: currentValue, count, startIndex });
  }
  return groups;
}

function findDotGroups(arr: string[]): DotGroup[] {
  const groups: DotGroup[] = [];
  let count = 0;
  let startIndex = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === ".") {
      if (count === 0) startIndex = i;
      count++;
    } else if (count > 0) {
      groups.push({ count, startIndex });
      count = 0;
    }
  }
  if (count > 0) {
    groups.push({ count, startIndex });
  }
  return groups;
}
