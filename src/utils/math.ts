/**
 * Math Helper Functions
 * --------------------
 * Common mathematical operations needed in AOC puzzles
 */

/**
 * Calculates the Greatest Common Divisor of two numbers using Euclidean algorithm.
 *
 * @example
 * gcd(48, 18) // Returns 6
 * gcd(17, 5)  // Returns 1
 */
export function gcd(a: number, b: number): number {
  while (b !== 0) {
    const t = b; // Store b temporarily
    b = a % b; // Get remainder
    a = t; // Set a to old b
  }
  return a;
}

/**
 * Calculates the Least Common Multiple of two numbers.
 * Uses the formula: LCM(a,b) = |a*b|/GCD(a,b)
 *
 * @example
 * lcm(4, 6)   // Returns 12
 * lcm(15, 25) // Returns 75
 */
export function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

/**
 * Calculates the LCM of an array of numbers by repeatedly applying lcm().
 * Useful when finding cycle lengths in puzzle patterns.
 *
 * @example
 * lcmArray([4, 6, 8]) // Returns 24
 */
export function lcmArray(numbers: number[]): number {
  return numbers.reduce((a, b) => lcm(a, b));
}

/**
 * Generates all possible permutations of an array.
 * Uses recursive algorithm where each element takes turns being first.
 *
 * @example
 * getPermutations([1, 2]) // Returns [[1,2], [2,1]]
 *
 * How it works:
 * 1. Base case: array of 1 or 0 elements returns itself
 * 2. For each element:
 *   - Take it as the first element
 *   - Get permutations of remaining elements
 *   - Add current element to front of each sub-permutation
 */
export function getPermutations<T>(array: T[]): T[][] {
  if (array.length <= 1) return [array];

  const result: T[][] = [];
  for (let i = 0; i < array.length; i++) {
    const current = array[i]; // Element to put first
    const remaining = [ // All other elements
      ...array.slice(0, i),
      ...array.slice(i + 1),
    ];
    // Recursively get permutations of remaining elements
    const permutations = getPermutations(remaining);

    // Add current element to front of each sub-permutation
    for (const permutation of permutations) {
      result.push([current, ...permutation]);
    }
  }
  return result;
}
