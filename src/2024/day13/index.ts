import { log, RegexPatterns, solveCramer } from "../../utils/index.ts";
import { Solution } from "../../types.ts";
import { sum } from "../../utils/array.ts";

type ClawMachine = {
  a: [x: number, y: number];
  b: [x: number, y: number];
  prize: [x: number, y: number];
};

type Machines = ClawMachine[];

export const day13: Solution = {
  part1: async (input: string) => {
    const machines = parseClawMachines(input);
    const prizeCosts = getMachinesPrizeCosts(machines);
    return sum(prizeCosts);
  },

  part2: async (input: string) => {
    const machines = parseClawMachines(input, true);
    const prizeCosts = getMachinesPrizeCosts(machines);
    return sum(prizeCosts);
  },
};

function getMachinesPrizeCosts(machines: Machines): number[] {
  const prizeCosts: number[] = [];
  for (const machine of machines) {
    const buttonPresses = calcButtonPressesToWin(machine);
    if (buttonPresses) {
      prizeCosts.push((buttonPresses[0] * 3) + buttonPresses[1]);
    }
  }
  return prizeCosts;
}

function parseClawMachines(
  input: string,
  part2Correction: boolean = false,
): Machines {
  const entries = input.split("\n\n");
  const correction = 10000000000000;

  return entries.map((entry) => {
    const numbers = entry.match(RegexPatterns.numbers)!.map(Number);

    return {
      a: [numbers[0], numbers[1]],
      b: [numbers[2], numbers[3]],
      prize: [
        !part2Correction ? numbers[4] : numbers[4] + correction,
        !part2Correction ? numbers[5] : numbers[5] + correction,
      ],
    };
  });
}

function calcButtonPressesToWin(
  machine: ClawMachine,
): [a: number, b: number] | null {
  const [aX, aY] = machine.a;
  const [bX, bY] = machine.b;
  const [targetX, targetY] = machine.prize;

  const solution = solveCramer([[aX, bX], [aY, bY]], [targetX, targetY]);

  if (!solution) return null;

  const [pressA, pressB] = solution;

  if (
    pressA < 0 || pressB < 0 || !Number.isInteger(pressA) ||
    !Number.isInteger(pressB)
  ) {
    return null;
  }

  return [pressA, pressB];
}
