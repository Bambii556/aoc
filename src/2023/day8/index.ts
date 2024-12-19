import { getInputLines, log, unique } from "../../utils/index.ts";
import { Solution } from "../../types.ts";
import { RegexPatterns } from "../../utils/utils.ts";
import { gcd, memoize } from "../../utils/algos.ts";
import { lcm } from "../../utils/algos.ts";
import { lcmArray } from "../../utils/algos.ts";

type Nodes = Map<string, [string, string]>;

export const day8: Solution = {
  part1: async (input: string) => {
    const { instructions, nodes } = parseInput(input);

    let currentNode = "AAA";
    let steps = 0;

    while (currentNode !== "ZZZ") {
      const instruction = instructions[steps % instructions.length];
      const [left, right] = nodes.get(currentNode)!;
      currentNode = instruction === "L" ? left : right;
      steps++;
    }

    return steps;
  },

  part2: async (input: string) => {
    const { instructions, nodes } = parseInput(input);
    const startingNodes = Array.from(nodes.keys()).filter((x) =>
      x.endsWith("A")
    );

    const patterns = startingNodes.map((start) =>
      findZPositions(start, instructions, nodes)
    );

    const steps = findAlignmentStep(patterns);
    return steps;
  },
};

function findZPositions(start: string, instructions: string[], nodes: Nodes) {
  let current = start;
  let steps = 0;

  const seen = new Set<string>();
  const zPositions = new Set<number>();
  const instructionLenght = instructions.length;

  while (true) {
    const state = `${current}-${steps % instructionLenght}`;
    if (seen.has(state)) break;

    seen.add(state);

    if (current.endsWith("Z")) {
      zPositions.add(steps);
    }

    const instruction = instructions[steps % instructionLenght];
    const [left, right] = nodes.get(current)!;
    current = instruction === "L" ? left : right;
    steps++;
  }

  return Array.from(zPositions);
}

function findAlignmentStep(occurrences: number[][]): number {
  const arrayLCMs = occurrences.map((arr) => {
    return arr.reduce((acc, num) => lcm(acc, num));
  });

  return arrayLCMs.reduce((acc, num) => lcm(acc, num));
}

function parseInput(input: string): { instructions: string[]; nodes: Nodes } {
  const [instructionStr, nodeStr] = input.split(`\n\n`);

  const nodes: Nodes = new Map();

  for (const line of nodeStr.split("\n")) {
    const [id, value] = line.split("=");
    const values = value.match(RegexPatterns.words)?.map((x) => x.trim()) as [
      string,
      string,
    ];
    nodes.set(id.trim(), values);
  }

  return {
    instructions: instructionStr.split(""),
    nodes,
  };
}
