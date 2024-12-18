/**
 * Type-safe deep clone function
 *
 * When to use:
 * - Need true deep copy of nested objects
 * - Working with immutable data
 * - Need to prevent object references
 * - Copying complex data structures
 *
 * When not to use:
 * - Objects with functions
 * - Circular references
 * - Objects with special prototypes
 * - Performance critical shallow copies
 *
 * @example
 * const obj = { a: [1, { b: 2 }], c: new Date() };
 * const clone = deepClone(obj);
 */
export function deepClone<T>(obj: T): T {
  // Handle null
  if (obj === null) {
    return obj;
  }

  // Handle primitive types
  if (typeof obj !== "object") {
    return obj;
  }

  // Handle Date objects
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }

  // Handle Arrays
  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item)) as T;
  }

  // Handle Objects
  if (obj.constructor === Object) {
    const clonedObj = {} as { [key: string]: unknown };

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        clonedObj[key] = deepClone((obj as { [key: string]: unknown })[key]);
      }
    }

    return clonedObj as T;
  }

  // Handle other types (return as is)
  return obj;
}

/**
 * Memory efficient substring generator
 *
 * When to use:
 * - Need all possible substrings
 * - Memory efficiency important
 * - Processing substrings one at a time
 * - Large strings
 *
 * When not to use:
 * - Need array of all substrings
 * - Random access needed
 * - Need to count substrings only
 * - Need specific length substrings
 *
 * @example
 * for (const sub of getAllSubstrings('abc')) {
 *   console.log(sub); // Prints: a, ab, abc, b, bc, c
 * }
 *
 * // Find substrings matching pattern
 * const matches = [...getAllSubstrings(text)]
 *   .filter(sub => pattern.test(sub));
 */
export function* getAllSubstrings(str: string): Generator<string> {
  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j <= str.length; j++) {
      yield str.slice(i, j);
    }
  }
}

/**
 * Binary Search on Answer
 *
 * When to use:
 * - Finding minimum/maximum value that satisfies condition
 * - Optimization problems
 * - Range is too large for linear search
 *
 * When not to use:
 * - Condition is not monotonic
 * - Small search space
 * - Need all valid answers
 *
 * @example
 * binarySearchAnswer(1, 1000000, (x) => someCondition(x))
 */
export function binarySearchAnswer(
  low: number,
  high: number,
  isValid: (mid: number) => boolean,
): number {
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (isValid(mid)) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }
  return low;
}

export const RegexPatterns = {
  numbers: /\d+/g,
  numbersWithNegative: /(-?\d+)/g,
  words: /\w+/g,
  coordinates: /\((\d+),\s*(\d+)\)/,
  hexColor: /#[0-9a-f]{6}/i,
};
