/**
 * String/Array Helper Functions
 * ---------------------------
 * Utility functions for common string and array operations
 */

/**
 * Counts how many times a value appears in an array.
 *
 * @example
 * countOccurrences([1,2,2,3], 2) // Returns 2
 * countOccurrences(['a','b','a'], 'a') // Returns 2
 */
export function countOccurrences<T>(array: T[], value: T): number {
  return array.filter((item) => item === value).length;
}

/**
 * Calculates the sum of all numbers in an array.
 *
 * @example
 * sum([1,2,3,4]) // Returns 10
 */
export function sum(numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}

/**
 * Calculates the product of all numbers in an array.
 *
 * @example
 * product([2,3,4]) // Returns 24
 */
export function product(numbers: number[]): number {
  return numbers.reduce((a, b) => a * b, 1);
}

/**
 * Extracts all numbers (including negative) from a string.
 * Useful when parsing input with embedded numbers.
 *
 * @example
 * findNumbers("There are 12 months and -2 seasons")
 * // Returns [12, -2]
 */
export function findNumbers(text: string): number[] {
  return [...text.matchAll(/-?\d+/g)].map((match) => parseInt(match[0]));
}

/**
 * Creates a frequency map counting occurrences of each unique item.
 *
 * @example
 * getFrequencyMap(['a','b','a','c','b'])
 * // Returns Map { 'a' => 2, 'b' => 2, 'c' => 1 }
 */
export function getFrequencyMap<T>(array: T[]): Map<T, number> {
  const map = new Map<T, number>();
  for (const item of array) {
    map.set(item, (map.get(item) || 0) + 1);
  }
  return map;
}
