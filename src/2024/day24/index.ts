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

export const day24: Solution = {
  part1: async (input: string) => {
    const circuit = parseCircuit(input);
    processCircuit(circuit);
    return getOutputWires(circuit);
  },

  part2: async (input: string) => {
    const circuit = parseCircuit(input);

    // Get initial x and y values - these don't change during processing
    const xVal = getBinaryNumber(circuit.wires, "x");
    const yVal = getBinaryNumber(circuit.wires, "y");
    const expectedSum = xVal + yVal;

    console.log(`Initial x value: ${xVal} (${xVal.toString(2)})`);
    console.log(`Initial y value: ${yVal} (${yVal.toString(2)})`);
    console.log(`Expected sum: ${expectedSum} (${expectedSum.toString(2)})`);

    // Get all output wires for potential swaps
    const outputWires = Array.from(new Set(circuit.gates.map((g) => g.output)));
    const swapCandidates: [string, string][] = [];

    // Generate possible swaps
    for (let i = 0; i < outputWires.length; i++) {
      for (let j = i + 1; j < outputWires.length; j++) {
        swapCandidates.push([outputWires[i], outputWires[j]]);
      }
    }

    // Reuse these maps for performance
    const wireCache = new Map<string, string>();
    const swapMap = new Map<string, string>();

    function testSwapCombination(swaps: [string, string][]): boolean {
      // Reset to initial wire values
      wireCache.clear();
      for (const [key, value] of circuit.wires) {
        wireCache.set(key, value);
      }

      // Build swap lookup
      swapMap.clear();
      for (const [wire1, wire2] of swaps) {
        swapMap.set(wire1, wire2);
        swapMap.set(wire2, wire1);
      }

      let changed = true;
      while (changed) {
        changed = false;
        for (const gate of circuit.gates) {
          const [in1, in2] = gate.inputs;

          // Skip if we don't have inputs yet
          if (!wireCache.has(in1) || !wireCache.has(in2)) continue;

          // Process gate
          const result = processGate(
            gate.type,
            wireCache.get(in1)!,
            wireCache.get(in2)!,
          );

          // Use swapped output if it exists
          const actualOutput = swapMap.get(gate.output) || gate.output;

          if (
            !wireCache.has(actualOutput) ||
            wireCache.get(actualOutput) !== result
          ) {
            wireCache.set(actualOutput, result);
            changed = true;
          }
        }
      }

      // Convert z wires to number and validate against expected sum
      const zVal = Array.from(wireCache.entries())
        .filter(([wire]) => wire.startsWith("z"))
        .sort((a, b) => {
          const numA = parseInt(a[0].substring(1));
          const numB = parseInt(b[0].substring(1));
          return numA - numB;
        })
        .map(([_, value]) => value)
        .join("");

      return parseInt(zVal, 2) === expectedSum;
    }

    // Try combinations until we find the right one
    for (const swaps of generateSwapCombinations(swapCandidates)) {
      if (testSwapCombination(swaps)) {
        return swaps.flat().sort().join(",");
      }
    }

    throw new Error("No valid solution found");
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

function getBinaryNumber(wires: Map<string, string>, prefix: string): number {
  const bits = Array.from(wires.entries())
    .filter(([wire]) => wire.startsWith(prefix))
    .sort((a, b) => {
      const numA = parseInt(a[0].substring(1));
      const numB = parseInt(b[0].substring(1));
      return numA - numB;
    })
    .map(([_, value]) => value)
    .join("");

  return parseInt(bits, 2);
}

function* generateSwapCombinations(
  candidates: [string, string][],
): Generator<[string, string][]> {
  const seen = new Set<string>();

  function* helper(
    current: [string, string][],
    startIdx: number,
  ): Generator<[string, string][]> {
    if (current.length === 4) {
      yield [...current];
      return;
    }

    for (let i = startIdx; i < candidates.length; i++) {
      const [wire1, wire2] = candidates[i];
      if (seen.has(wire1) || seen.has(wire2)) continue;

      seen.add(wire1);
      seen.add(wire2);
      current.push(candidates[i]);

      yield* helper(current, i + 1);

      seen.delete(wire1);
      seen.delete(wire2);
      current.pop();
    }
  }

  yield* helper([], 0);
}
