import { log } from "../../utils/index.ts";
import { Solution } from "../../types.ts";

type GateType = "AND" | "OR" | "XOR";

type Gate = {
  type: GateType;
  inputs: [string, string];
  output: string;
};

type Circuit = {
  wires: Map<string, string>;
  gates: Gate[];
};

type WireSwap = [string, string];

type Swops = [string, string];

export const day24: Solution = {
  part1: async (input: string) => {
    const circuit = parseCircuit(input);
    processCircuit(circuit);
    return getOutputWires(circuit);
  },

  part2: async (input: string) => {
    // const circuit = parseCircuit(input);
    // // Find potential swaps based on circuit analysis
    // const potentialSwaps = analyzeCircuit(circuit);
    // console.log(`Found ${potentialSwaps.length} potential swaps`);

    // // Generate and test combinations of 4 swaps
    // for (const swaps of generateSwapCombinations(potentialSwaps)) {
    //   if (testSwaps(circuit, swaps)) {
    //     return swaps.flat().sort().join(",");
    //   }
    // }

    // throw new Error("No valid solution found");
    return 0;
  },
};

function processCircuit(c: Circuit) {
  let hasProcessed = true;
  const processed = new Set<string>();

  while (hasProcessed) {
    hasProcessed = false;
    for (const gate of c.gates) {
      if (processed.has(gate.output) && c.wires.has(gate.output)) {
        continue;
      }

      if (!isValidGate(c, gate)) {
        continue;
      }

      const [input1, input2] = gate.inputs;
      const value1 = c.wires.get(input1)!;
      const value2 = c.wires.get(input2)!;

      const result = processGate(gate.type, value1, value2);

      if (!c.wires.has(gate.output) || c.wires.get(gate.output) !== result) {
        c.wires.set(gate.output, result);
        hasProcessed = true;
      }

      processed.add(gate.output);
    }
  }
}

function processGate(type: GateType, a: string, b: string): string {
  const numA = Number(a);
  const numB = Number(b);

  switch (type) {
    case "AND":
      return (numA && numB) ? "1" : "0";
    case "OR":
      return (numA || numB) ? "1" : "0";
    case "XOR":
      return (numA !== numB) ? "1" : "0";
    default:
      throw new Error(`Unknown gate type: ${type}`);
  }
}

function isValidGate(circuit: Circuit, gate: Gate): boolean {
  const [input1, input2] = gate.inputs;
  return circuit.wires.has(input1) && circuit.wires.has(input2);
}

function parseCircuit(input: string): Circuit {
  const [wires, gates] = input.trim().split("\n\n");
  const circuit: Circuit = {
    wires: new Map(),
    gates: [],
  };

  wires.split("\n").forEach((line) => {
    const [wire, value] = line.split(": ");
    if (wire && value) {
      circuit.wires.set(wire.trim(), value.trim());
    }
  });

  const gatePattern = /^(\w+) (AND|OR|XOR) (\w+) -> (\w+)$/;
  gates.split("\n").forEach((line) => {
    if (!line.trim()) return;

    const match = line.match(gatePattern);
    if (!match) {
      console.warn(`Invalid gate definition: ${line}`);
      return;
    }

    const [, input1, type, input2, output] = match;
    circuit.gates.push({
      type: type as GateType,
      inputs: [input1, input2],
      output: output,
    });
  });

  return circuit;
}

function getOutputWires(circuit: Circuit): number {
  const zWires = Array.from(circuit.wires.entries())
    .filter(([wire]) => wire.startsWith("z"))
    .sort((a, b) => {
      const numA = a[0].substring(1).padStart(2, "0");
      const numB = b[0].substring(1).padStart(2, "0");
      return numB.localeCompare(numA);
    });
  const values = zWires.map(([_, value]) => value);
  return parseInt(values.join(""), 2);
}
