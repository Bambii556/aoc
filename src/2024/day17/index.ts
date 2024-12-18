import { Solution } from "../../types.ts";
import { RegexPatterns } from "../../utils/utils.ts";

type ProgramState = {
  a: number;
  b: number;
  c: number;
  program: number[];
};

export const day17: Solution = {
  part1: async (input: string) => {
    const state = parseInput(input);

    const output = runProgram(state.a, state.b, state.c, state.program);
    return output.join(",");
  },

  part2: async (input: string) => {
    const state = parseInput(input);

    return findInitialA(state.program);
  },
};

function parseInput(input: string): ProgramState {
  const numbers = input.match(RegexPatterns.numbers)?.map(Number) || [];
  const [a, b, c, ...program] = numbers;

  return {
    a,
    b,
    c,
    program,
  };
}

function runProgram(
  a: number,
  b: number,
  c: number,
  program: number[],
): number[] {
  const output: number[] = [];

  for (let i = 0; i < program.length; i += 2) {
    const instruction = program[i];
    const operand = program[i + 1];
    const combo = getCombo(a, b, c, operand);

    switch (instruction) {
      case 0: // Divide A by 2^operand -> A
        a = Math.floor(a / (1 << combo));
        break;

      case 1: // XOR B with literal operand -> B
        b = b ^ operand;
        break;

      case 2: // operand % 8 -> B
        b = combo & 7;
        break;

      case 3: // If A != 0, jump to operand
        if (a !== 0) {
          i = operand - 2;
        }
        break;

      case 4: // XOR B with C -> B
        b = b ^ c;
        break;

      case 5: // Output operand % 8
        output.push(combo & 7);
        break;

      case 6: // Divide A by 2^operand -> B
        b = Math.floor(a / (1 << combo));
        break;

      case 7: // Divide A by 2^operand -> C
        c = Math.floor(a / (1 << combo));
        break;
    }
  }
  return output;
}

function getCombo(a: number, b: number, c: number, operand: number) {
  if (operand <= 3) {
    return operand;
  }

  switch (operand) {
    case 4:
      return a;
    case 5:
      return b;
    case 6:
      return c;
  }

  // reserved, not sure
  return 0;
}

function findInitialA(
  program: number[],
  nextValue = 0,
  i = program.length - 1,
): number {
  // my protection...
  if (i < 0) return nextValue;

  for (let valueA = nextValue * 8; valueA < nextValue * 8 + 8; valueA++) {
    const output = runProgram(valueA, 0, 0, program);

    if (output[0] === program[i]) {
      const finalVal = findInitialA(program, valueA, i - 1);
      if (finalVal >= 0) return finalVal;
    }
  }

  return -1;
}
