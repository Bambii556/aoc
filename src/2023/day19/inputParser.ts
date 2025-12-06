import { getInputGroups } from "../../utils/input.ts";

export interface Part {
  x: number;
  m: number;
  a: number;
  s: number;
}

export interface Rule {
  condition?: string;
  destination: string;
}

export interface Workflow {
  name: string;
  rules: Rule[];
}

export function parseInputs(input: string) {
  const [workflows, parts] = getInputGroups(input);

  return {
    workflows: parseWorkflows(workflows),
    parts: parsePart(parts),
  };
}

function parseWorkflows(rulesInput: string[]): Map<string, Workflow> {
  const workflows = new Map<string, Workflow>();

  for (const line of rulesInput) {
    const match = line.match(/^(\w+)\{(.+)\}$/);

    if (!match) {
      throw new Error(`Invalid workflow format: ${line}`);
    }

    const [, name, rulesStr] = match;
    const ruleParts = rulesStr.split(",");

    const rules: Rule[] = ruleParts.map((rulePart) => {
      // Check if rule has a condition (contains ':')
      if (rulePart.includes(":")) {
        const [condition, destination] = rulePart.split(":");
        return { condition, destination };
      } else {
        // Default rule (no condition)
        return { destination: rulePart };
      }
    });

    workflows.set(name, { name, rules });
  }

  return workflows;
}

export function parsePart(parts: string[]): Part[] {
  return parts.map((partStr) => {
    const pairs = partStr.slice(1, -1).split(",");

    const part: Partial<Part> = {};

    for (const pair of pairs) {
      const [key, value] = pair.split("=");
      part[key as keyof Part] = parseInt(value, 10);
    }

    return part as Part;
  });
}
