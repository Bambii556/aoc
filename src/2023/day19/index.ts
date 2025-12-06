import { Solution } from "../../types.ts";
import { parseInputs, Part } from "./inputParser.ts";

export const day19: Solution = {
  part1: async (input: string) => {
    const { parts, workflows } = parseInputs(input);

    let sum = 0;

    for (const part of parts) {
      let destination = "in";
      do {
        const workflow = workflows.get(destination);
        if (!workflow) {
          throw new Error(`Workflow ${destination} not found`);
        }

        let matchedRule = false;
        for (const rule of workflow.rules) {
          if (rule.condition) {
            const variables = {
              x: part.x,
              m: part.m,
              a: part.a,
              s: part.s,
            };
            if (parseComparison(rule.condition, variables)) {
              destination = rule.destination;
              matchedRule = true;
              break;
            }
          } else {
            // Default rule
            destination = rule.destination;
            matchedRule = true;
            break;
          }
        }

        if (!matchedRule) {
          throw new Error(
            `No matching rule found in workflow ${workflow.name}`,
          );
        }
      } while (destination !== "A" && destination !== "R");

      if (destination === "A") {
        sum += calcPartSum(part);
      }
    }

    return sum;
  },

  part2: async (input: string) => {
    const { workflows } = parseInputs(input);

    let sum = 0;

    return sum;
  },
};

function calcPartSum(part: Part) {
  return part.x + part.m + part.a + part.s;
}

function parseComparison(
  expression: string,
  variables: Record<string, number>,
): boolean {
  // Match pattern: variable operator value
  const match = expression.match(/^(\w+)([<>]=?|==|!=)(\d+)$/);

  if (!match) {
    throw new Error(`Invalid expression: ${expression}`);
  }

  const [, variable, operator, valueStr] = match;
  const value = parseInt(valueStr, 10);
  const varValue = variables[variable];

  if (varValue === undefined) {
    throw new Error(`Variable ${variable} not found`);
  }

  switch (operator) {
    case "<":
      return varValue < value;
    case ">":
      return varValue > value;
    case "<=":
      return varValue <= value;
    case ">=":
      return varValue >= value;
    case "==":
      return varValue === value;
    case "!=":
      return varValue !== value;
    default:
      throw new Error(`Unknown operator: ${operator}`);
  }
}
