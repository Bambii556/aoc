/**
 * Input Processing Functions
 * -------------------------
 * These functions help parse and process input data commonly found in AOC puzzles
 */

/**
 * Splits input string into an array of lines.
 * Optionally removes empty lines (default: true)
 *
 * @example
 * const input = "line1\n\nline2\nline3";
 * getInputLines(input) // ["line1", "line2", "line3"]
 * getInputLines(input, false) // ["line1", "", "line2", "line3"]
 */
export function getInputLines(input: string, removeEmpty = true): string[] {
  const lines = input.split("\n");
  return removeEmpty ? lines.filter((line) => line.length > 0) : lines;
}

/**
 * Splits input into groups of lines separated by blank lines.
 * Useful for puzzles where input has distinct groups separated by empty lines.
 *
 * @example
 * const input = "1\n2\n\n3\n4\n\n5\n6";
 * getInputGroups(input) // [["1", "2"], ["3", "4"], ["5", "6"]]
 */
export function getInputGroups(input: string): string[][] {
  return input.split("\n\n")
    .map((group) => group.split("\n").filter((line) => line.length > 0));
}

/**
 * Converts a grid-like string input into a 2D array of characters.
 * Useful for maze/map puzzles where each character represents something.
 *
 * @example
 * const input = "123\n456";
 * parseGrid(input) // [["1","2","3"], ["4","5","6"]]
 */
export function parseGrid(input: string): string[][] {
  return getInputLines(input).map((line) => line.split(""));
}

/**
 * Similar to parseGrid but converts each character to a number.
 * Perfect for height maps or risk level grids.
 *
 * @example
 * const input = "123\n456";
 * parseNumberGrid(input) // [[1,2,3], [4,5,6]]
 */
export function parseNumberGrid(input: string): number[][] {
  return getInputLines(input).map((line) =>
    line.split("").map((char) => parseInt(char))
  );
}
