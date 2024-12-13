/**
 * Convert binary string to decimal number
 * Faster than parseInt(binary, 2) for longer strings
 *
 * When to use:
 * - Binary string conversion problems
 * - Bit manipulation puzzles
 * - Binary pattern matching
 *
 * When not to use:
 * - Already have number type
 * - Non-binary strings
 * - Numbers exceeding safe integer
 *
 * @example
 * binaryToDecimal('1101') // Returns 13
 * binaryToDecimal('00001111') // Returns 15
 *
 * // Use in pattern matching
 * const patterns = ['1010', '1100', '1111'];
 * const values = patterns.map(binaryToDecimal);
 */
export function binaryToDecimal(binary: string): number {
  let result = 0;
  for (let i = 0; i < binary.length; i++) {
    result = (result << 1) | (binary[i] === "1" ? 1 : 0);
  }
  return result;
}

/**
 * Convert a point to a string key for use in Maps/Sets.
 * Useful for caching or storing points as unique identifiers.
 *
 * @example
 * const point = pointToString(2, 3); // Returns "2,3"
 * const visited = new Set<string>();
 * visited.add(pointToString(x, y));
 *
 * Common use cases:
 * - Tracking visited positions in grid traversal
 * - Creating unique keys for coordinate pairs
 * - Converting points for Set/Map storage
 */
export function pointToString(x: number, y: number): string {
  return `${x},${y}`;
}

/**
 * Convert a string key back to point coordinates.
 * Inverse of pointToString function.
 *
 * @example
 * const [x, y] = stringToPoint("2,3"); // Returns [2, 3]
 *
 * Common use cases:
 * - Retrieving coordinates from cached points
 * - Converting stored points back to coordinates
 * - Processing point data from string format
 */
export function stringToPoint(
  str: string,
  delimiter: string = ",",
): [number, number] {
  const [x, y] = str.split(delimiter).map(Number);
  return [x, y];
}
