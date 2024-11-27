/**
 * Set Operations
 * -------------
 * Functions for working with Sets, commonly needed in puzzles
 * involving groups, collections, or comparisons
 */

/**
 * Returns a new Set containing elements present in both input Sets.
 *
 * @example
 * const set1 = new Set([1, 2, 3]);
 * const set2 = new Set([2, 3, 4]);
 * setIntersection(set1, set2) // Returns Set(2, 3)
 *
 * Common use cases:
 * - Finding common items between groups
 * - Finding shared characteristics
 * - Identifying overlapping elements
 */
export function setIntersection<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  return new Set([...setA].filter((x) => setB.has(x)));
}

/**
 * Returns a new Set containing all unique elements from both input Sets.
 *
 * @example
 * const set1 = new Set([1, 2]);
 * const set2 = new Set([2, 3]);
 * setUnion(set1, set2) // Returns Set(1, 2, 3)
 *
 * Common use cases:
 * - Combining collections
 * - Finding all possible options
 * - Merging groups
 */
export function setUnion<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  return new Set([...setA, ...setB]);
}

/**
 * Returns a new Set containing elements in setA that aren't in setB.
 *
 * @example
 * const set1 = new Set([1, 2, 3]);
 * const set2 = new Set([2, 3, 4]);
 * setDifference(set1, set2) // Returns Set(1)
 *
 * Common use cases:
 * - Finding unique elements
 * - Removing common elements
 * - Identifying distinct items
 */
export function setDifference<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  return new Set([...setA].filter((x) => !setB.has(x)));
}
