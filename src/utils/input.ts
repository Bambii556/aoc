/**
 * Input Processing Functions
 * -------------------------
 * These functions help parse and process input data commonly found in AOC puzzles
 */

/**
 * Splits input string into an array of lines.
 * Optionally removes empty lines (default: true)
 *
 * When to use:
 * - Processing line-by-line input
 * - Need to handle whitespace-only lines
 * - Input is text-based with newline separators
 * - Need array of strings for further processing
 *
 * When not to use:
 * - Input is already an array
 * - Need to preserve empty lines (unless removeEmpty=false)
 * - Working with binary data
 * - Need to split on different delimiter
 *
 * @example
 * const input = "line1\n\nline2\nline3";
 * getInputLines(input) // ["line1", "line2", "line3"]
 * getInputLines(input, false) // ["line1", "", "line2", "line3"]
 */
export function getInputLines(input: string, removeEmpty = true): string[] {
  if (!removeEmpty) return input.split("\n");
  return input.split("\n").filter(Boolean); // Boolean is faster than length check
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
  return input.split("\n\n").map((group) => group.split("\n").filter(Boolean));
}

/**
 * Converts a grid-like string input into a 2D array of characters.
 * Useful for maze/map puzzles where each character represents something.
 *
 * When to use:
 * - Input represents a 2D grid/maze
 * - Each character has meaning (e.g., '#' for walls)
 * - Need to process map-like structures
 * - Grid cells contain non-numeric data
 *
 * When not to use:
 * - Grid contains numbers (use parseNumberGrid)
 * - Input is not uniform width
 * - Need to process as single string
 * - Memory constrained (uses more memory than 1D array)
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
export function parseNumberGrid(input: string): Uint8Array[] {
  const lines = input.split("\n").filter(Boolean);
  return lines.map((line) => {
    const nums = new Uint8Array(line.length);
    for (let i = 0; i < line.length; i++) {
      nums[i] = +line[i];
    }
    return nums;
  });
}

/**
 * Parse key-value pairs
 *
 * @example
 * // a=1 b=2
 * parseKeyValue(input) // { a: '1', b: '2' }
 */
export function parseKeyValue(input: string): Record<string, string> {
  return Object.fromEntries(
    input.split(" ")
      .map((pair) => pair.split("=")),
  );
}

/**
 * Parse coordinates in format "x,y"
 *
 * @example
 * // 1,2
 * // 3,4
 * parseCoordinates(input) // [[1,2], [3,4]]
 */
export function parseCoordinates(input: string): [number, number][] {
  return input.split("\n")
    .map((line) => line.split(",").map(Number) as [number, number]);
}

/**
 * Parse instructions with direction and amount
 *
 * @example
 * // forward 5
 * // down 3
 * parseInstructions(input) // [['forward', 5], ['down', 3]]
 */
export function parseInstructions(input: string): [string, number][] {
  return input.split("\n")
    .map((line) => {
      const [dir, amt] = line.split(" ");
      return [dir, Number(amt)];
    });
}

/**
 * Parse range notation "a-b"
 *
 * @example
 * // 2-4,6-8
 * parseRanges(input) // [[2,4], [6,8]]
 */
export function parseRanges(input: string): [number, number][] {
  return input.split(",")
    .map((range) => range.split("-").map(Number) as [number, number]);
}
