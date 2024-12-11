import { log, sum } from "../../utils/index.ts";
import { Solution } from "../../types.ts";

type EQ = {
  testValue: number;
  values: number[];
};

export const day7: Solution = {
  part1: async (input: string) => {
    const equations = input.split("\n").map((line) => {
      const [testValue, values] = line.split(":");
      return {
        testValue: Number(testValue),
        values: values.trim().split(/\s+/).map(Number),
      };
    });

    const results: number[] = startLoop(equations, ["+", "*"]);

    return sum(results);
  },

  part2: async (input: string) => {
    const equations = input.split("\n").map((line) => {
      const [testValue, values] = line.split(":");
      return {
        testValue: Number(testValue),
        values: values.trim().split(/\s+/).map(Number),
      };
    });

    const results: number[] = startLoop(equations, ["+", "*", "||"]);
    return sum(results);
  },
};

function startLoop(equations: EQ[], initialOperators: string[]) {
  const results: number[] = [];

  for (let index = 0; index < equations.length; index++) {
    const eq = equations[index];

    const perm = generatePermutations(initialOperators, eq.values.length - 1);

    for (let i = 0; i < perm.length; i++) {
      const operators = perm[i];

      const result = calculateEQ(eq, operators);
      if (result.isValid) {
        results.push(result.result);
        break;
      }
    }
  }

  return results;
}

function calculateEQ(eq: EQ, operators: string[]) {
  const { testValue, values } = eq;

  let result = values[0];
  let equation = values[0].toString();

  for (let i = 0; i < operators.length; i++) {
    const op = operators[i];
    const nextValue = values[i + 1];

    equation += ` ${op} ${nextValue}`;

    if (op === "+") {
      result += nextValue;
    } else if (op === "*") {
      result *= nextValue;
    } else if (op === "||") {
      // Convert both numbers to strings and concatenate, then back to number
      result = Number(result.toString() + nextValue.toString());
    } else {
      throw new Error(`Invalid operator: ${op}`);
    }
  }

  if (result.toString().includes("NAN")) {
    result.toString();
  }

  return {
    result,
    isValid: result === testValue,
    equation,
  };
}

function generatePermutations(arr: string[], parts: number): string[][] {
  const result: string[][] = [];

  function generate(current: string[]) {
    if (current.length === parts) {
      result.push([...current]);
      return;
    }

    for (const item of arr) {
      current.push(item);
      generate(current);
      current.pop();
    }
  }

  generate([]);
  return result;
}
