// Base type for puzzle input parsing
export type PuzzleInput = string;

// Type for the return value of solutions
export type SolutionResult = string | number;

// Interface for individual parts of a day's solution
export interface PuzzlePart {
  (input: PuzzleInput): Promise<SolutionResult>;
  description?: string;  // Optional description of what this part does
}

// Interface for a complete day's solution
export interface Solution {
  part1: PuzzlePart;
  part2: PuzzlePart;
  parseInput?: (raw: string) => PuzzleInput;  // Optional custom input parser
  title?: string;  // Optional day title/description
}