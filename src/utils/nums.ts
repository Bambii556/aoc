/**
 * Get absolute difference between two numbers
 *
 * When to use:
 * - Need distance between two numbers
 * - Comparing numeric values
 * - Need positive difference
 * - Order of numbers doesn't matter
 *
 * When not to use:
 * - Need to preserve sign
 * - Need relative difference (%)
 * - Working with floating point precision
 *
 * @example
 * getDifference(5, 3)  // 2
 * getDifference(3, 5)  // 2
 * getDifference(-1, 1) // 2
 */
export function getDifference(a: number, b: number): number {
  return Math.abs(a - b);
}

/**
 * Get signed difference between two numbers
 *
 * When to use:
 * - Need to know if first number is larger/smaller
 * - Direction of difference matters
 * - Need positive/negative result
 *
 * @example
 * getSignedDifference(5, 3)  // 2
 * getSignedDifference(3, 5)  // -2
 */
export function getSignedDifference(a: number, b: number): number {
  return a - b;
}
