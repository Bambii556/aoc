/**
 * Math Helper Functions
 * --------------------
 * Common mathematical operations needed in AOC puzzles
 */

/**
 * Calculates the Greatest Common Divisor of two numbers using Euclidean algorithm.
 *
 * When to use:
 * - Finding common factors
 * - Reducing fractions
 * - Solving timing/cycle problems
 * - Need to simplify ratios
 *
 * When not to use:
 * - Working with floating point numbers
 * - Numbers outside safe integer range
 * - Need least common multiple (use lcm)
 * - Need all factors (use getPrimeFactors)
 *
 * @example
 * gcd(48, 18) // Returns 6
 * gcd(17, 5)  // Returns 1
 */
export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);

  // Use binary GCD algorithm
  let shift = 0;

  // Remove common factors of 2
  while (((a | b) & 1) === 0) {
    a >>= 1;
    b >>= 1;
    shift++;
  }

  // Remove remaining factors of 2 from a
  while ((a & 1) === 0) a >>= 1;

  while (b) {
    // Remove factors of 2 from b
    while ((b & 1) === 0) b >>= 1;

    // Swap if needed so a >= b
    if (a > b) [a, b] = [b, a];

    b -= a;
  }

  // Restore common factors of 2
  return a << shift;
}

/**
 * Calculates the Least Common Multiple of two numbers.
 * Uses the formula: LCM(a,b) = |a*b|/GCD(a,b)
 *
 * When to use:
 * - Finding common cycle lengths
 * - Synchronization problems
 * - Pattern repetition calculations
 * - When need smallest number divisible by both inputs
 * - Time-based cycle problems
 *
 * When not to use:
 * - Numbers outside safe integer range
 * - Need factors instead of multiples
 * - Working with floating point numbers
 * - Memory/performance critical (for very large numbers)
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
 * When to use:
 * - Multiple cycle synchronization
 * - Finding common repeat intervals
 * - Need smallest number divisible by all inputs
 * - Pattern matching across multiple sequences
 * - Time-based problems with multiple cycles
 *
 * When not to use:
 * - Very large arrays (performance degrades)
 * - Numbers that could overflow when multiplied
 * - Need to preserve intermediate calculations
 * - When any input could be 0
 * - Need prime factorization
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
 * When to use:
 * - Need all possible arrangements
 * - Testing all combinations
 * - Order matters
 * - Array size < 10 (reasonable performance)
 *
 * When not to use:
 * - Large arrays (factorial growth)
 * - Order doesn't matter (use combinations)
 * - Need partial permutations
 * - Memory constrained
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
