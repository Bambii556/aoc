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
  // For large arrays, using a for loop is faster than reduce
  let count = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) count++;
  }
  return count;
}

/**
 * Calculates the sum (+) of all numbers in an array.
 *
 * @example
 * sum([1,2,3,4]) // Returns 10
 */
export function sum(numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}

/**
 * Calculates the product (*) of all numbers in an array.
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
  const matches = text.match(/-?\d+/g);
  return matches ? matches.map(Number) : [];
}

/**
 * Creates a frequency map counting occurrences of each unique item.
 *
 * When to use:
 * - Counting occurrences
 * - Need item frequencies
 * - Pattern matching
 * - Histogram creation
 *
 * When not to use:
 * - Only need single item count
 * - Memory constrained
 * - Need sorted frequencies
 * - Need index positions
 *
 * @example
 * getFrequencyMap(['a','b','a','c','b'])
 * // Returns Map { 'a' => 2, 'b' => 2, 'c' => 1 }
 */
export function getFrequencyMap<T>(array: T[]): Map<T, number> {
  const map = new Map<T, number>();
  // Using for loop instead of for..of for better performance
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    map.set(item, (map.get(item) || 0) + 1);
  }
  return map;
}

/**
 * Find all combinations of an array (This can be very expensive for large arrays:)
 *
 * When to use:
 * - Need all possible selections of items where order doesn't matter
 * - Subset generation
 * - Testing combinations of elements
 *
 * When not to use:
 * - Order matters (use permutations)
 * - Large arrays (grows exponentially)
 * - Need full arrangements
 *
 * @example
 * // Get all 2-item combinations
 * combinations([1, 2, 3], 2)
 * // Returns: [[1, 2], [1, 3], [2, 3]]
 *
 * // Find all possible sums of 3 numbers
 * const nums = [1, 2, 3, 4, 5];
 * combinations(nums, 3).map(combo => combo.reduce((a, b) => a + b));
 *
 * // Check if any combination sums to target
 * const target = 10;
 * combinations(nums, 3).some(combo =>
 *   combo.reduce((a, b) => a + b) === target
 * );
 */
export function combinations<T>(array: T[], r: number): T[][] {
  // Add early termination conditions
  if (r > array.length) return [];
  if (r === 0) return [[]];
  if (r === array.length) return [array];
  if (r === 1) return array.map((el) => [el]);

  const first = array[0];
  const rest = array.slice(1);

  // Reuse arrays where possible instead of creating new ones
  return [
    ...combinations(rest, r),
    ...combinations(rest, r - 1).map((combo) => [first, ...combo]),
  ];
}

/**
 * Windows/Sliding window over string or array
 *
 * When to use:
 * - Need overlapping segments
 * - Pattern detection
 * - Sequence analysis
 * - Finding sequences of specific length
 *
 * When not to use:
 * - Non-overlapping chunks needed
 * - Memory constrained
 * - Large windows on large arrays
 *
 * @example
 * // Find all groups of 3 consecutive characters
 * windows("ABCDEF", 3)
 * // Returns: ["ABC", "BCD", "CDE", "DEF"]
 *
 * // Check for increasing sequences
 * const nums = [1, 2, 3, 2, 4, 5];
 * windows(nums, 3).filter(win =>
 *   win[0] < win[1] && win[1] < win[2]
 * );
 *
 * // Find patterns in data
 * const data = [1, 1, 2, 3, 5, 8];
 * windows(data, 3).forEach(([a, b, c]) => {
 *   if (a + b === c) console.log("Found Fibonacci sequence");
 * });
 */
export function windows<T>(array: T[], size: number): T[][] {
  // Add input validation
  if (size > array.length) return [];

  const result: T[][] = [];
  // Use single pass with for loop
  for (let i = 0; i <= array.length - size; i++) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

/**
 * Find all regex matches in a string with groups
 *
 * When to use:
 * - Pattern matching with capture groups
 * - Text processing needing all matches
 * - Extracting structured data
 * - Need match positions
 *
 * When not to use:
 * - Simple contains check
 * - Single match needed
 * - Performance critical (use indexOf for simple searches)
 *
 * @example
 * // Extract all numbers with their signs
 * const text = "temp: +15C and -3C";
 * findAllMatches(text, /([+-]?\d+)C/g)
 * // Returns matches with groups: ["+15", "-3"]
 *
 * // Parse structured data
 * const data = "x=5,y=10;x=3,y=4";
 * findAllMatches(data, /x=(\d+),y=(\d+)/g).map(match => ({
 *   x: parseInt(match[1]),
 *   y: parseInt(match[2])
 * }));
 *
 * // Find overlapping patterns
 * const binary = "11010";
 * findAllMatches(binary, /(?=(11))/g)
 *   .map(m => m.index); // Find positions of all "11"
 */
export function findAllMatches(
  str: string,
  pattern: RegExp,
): RegExpMatchArray[] {
  return Array.from(str.matchAll(pattern));
}

/**
 * Create a 2D array with optimizations for numeric types
 *
 * When to use:
 * - Creating grids/matrices
 * - Need memory efficient 2D arrays
 * - Working with numeric grids
 * - Dynamic programming tables
 *
 * When not to use:
 * - Need jagged arrays
 * - Dynamic sizing needed
 * - Need sparse matrix
 * - Complex objects as values
 *
 * @example
 * create2DArray(3, 3, 0)  // number[][]
 * create2DArray(2, 2, false)  // boolean[][]
 * create2DArray(2, 2, '.') // string[][]
 */
export function create2DArray<T>(
  rows: number,
  cols: number,
  defaultValue: T,
): T[][] {
  // Special case for small unsigned integers
  if (
    typeof defaultValue === "number" &&
    Number.isInteger(defaultValue) &&
    defaultValue >= 0 &&
    defaultValue < 256
  ) {
    const buffer = new Array(rows);
    const uint8Array = new Uint8Array(cols);
    uint8Array.fill(defaultValue);

    for (let i = 0; i < rows; i++) {
      buffer[i] = new Uint8Array(cols);
      buffer[i].set(uint8Array);
    }

    return buffer as unknown as T[][];
  }

  // For all other types
  const grid: T[][] = new Array(rows);
  for (let i = 0; i < rows; i++) {
    grid[i] = new Array(cols).fill(defaultValue);
  }

  return grid;
}

/**
 * Efficient array intersection check using Set
 *
 * When to use:
 * - Need to check for common elements
 * - Performance critical intersection
 * - Memory available for Set
 * - Early termination desired
 *
 * When not to use:
 * - Need all common elements
 * - Need intersection count
 * - Memory constrained
 * - Arrays are tiny (simple loop might be faster)
 *
 * @example
 * hasIntersection([1, 2], [2, 3]) // Returns true
 *
 * // Check if sets of words share elements
 * const common = hasIntersection(words1, words2)
 */
export function hasIntersection<T>(arr1: T[], arr2: T[]): boolean {
  // Convert smaller array to Set for O(1) lookups
  if (arr1.length > arr2.length) {
    [arr1, arr2] = [arr2, arr1];
  }
  const set = new Set(arr1);
  return arr2.some((item) => set.has(item));
}

/**
 * Split array into chunks of specified size
 *
 * When to use:
 * - Processing data in groups
 * - Sliding windows
 * - Fixed-size batches
 *
 * @example
 * chunks([1,2,3,4,5], 2) // [[1,2], [3,4], [5]]
 */
export function chunks<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  // Use for loop instead of Array.from
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, Math.min(i + size, arr.length)));
  }
  return result;
}

/**
 * Get unique values from very Large arrays
 *
 * When to use:
 * - Need to remove duplicates
 * - Counting unique items
 * - Set operations
 *
 * @example
 * unique([1,1,2,2,3]) // [1,2,3]
 */
export function unique<T>(arr: T[]): T[] {
  // Method 1: For small arrays (< 1000 elements)
  //    For primitive types, Set is fastest
  //    Create a Set (which only stores unique values)
  //    Then spread it back into an array
  if (arr.length < 1000) return [...new Set(arr)];

  // Method 2: For large arrays
  // For large arrays of objects, use Map to maintain insertion order
  const seen = new Map<T, boolean>();
  const result: T[] = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (!seen.has(item)) {
      seen.set(item, true);
      result.push(item);
    }
  }
  return result;
}

/**
 * Zip multiple arrays together
 *
 * When to use:
 * - Combining parallel arrays
 * - Matrix operations
 * - Pairing elements
 *
 * @example
 * zip([1,2,3], ['a','b','c']) // [[1,'a'], [2,'b'], [3,'c']]
 */
export function zip<T>(...arrays: T[][]): T[][] {
  const minLength = Math.min(...arrays.map((x) => x.length));
  return Array.from(
    { length: minLength },
    (_, i) => arrays.map((array) => array[i]),
  );
}

/**
 * Get all pairs of array elements
 *
 * When to use:
 * - Need to compare all pairs
 * - Combination problems
 * - Relationship mapping
 *
 * @example
 * pairs([1,2,3]) // [[1,2], [1,3], [2,3]]
 */
export function pairs<T>(arr: T[]): [T, T][] {
  // Preallocate array for better performance
  const length = (arr.length * (arr.length - 1)) / 2;
  const result = new Array<[T, T]>(length);
  let index = 0;

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      result[index++] = [arr[i], arr[j]];
    }
  }
  return result;
}

/**
 * Transpose a matrix (2D array) - converts rows to columns and columns to rows
 *
 * When to use:
 * - Converting row patterns to column patterns
 * - Grid rotations/transformations
 * - Matrix operations
 * - Pattern matching in different directions
 *
 * When not to use:
 * - Empty matrices
 * - Jagged arrays (rows of different lengths)
 * - Very large matrices (consider in-place transpose)
 *
 * How it works:
 * Original matrix:    Transposed matrix:
 * [1, 2, 3]          [1, 4, 7]
 * [4, 5, 6]    ->    [2, 5, 8]
 * [7, 8, 9]          [3, 6, 9]
 *
 * @example
 * const grid = [
 *   [1, 2, 3],
 *   [4, 5, 6]
 * ];
 * transpose(grid) // Returns [[1,4], [2,5], [3,6]]
 *
 * // Real AOC example: checking patterns vertically and horizontally
 * const patterns = [
 *   ['#', '.', '#'],
 *   ['.', '#', '.'],
 * ];
 * const columnPatterns = transpose(patterns);
 */
export function transpose<T>(matrix: T[][]): T[][] {
  // matrix[0].map creates an array with length equal to the number of columns
  return matrix[0].map((_, colIndex) =>
    // For each column, map through all rows and get item at colIndex
    matrix.map((row) => row[colIndex])
  );
}

/**
 * Generate sequence of numbers
 *
 * When to use:
 * - Need number sequence
 * - Loop alternatives
 * - Range operations
 *
 * @example
 * sequence(1, 5) // [1,2,3,4,5]
 * sequence(2, 10, 2) // [2,4,6,8,10]
 */
export function sequence(start: number, end: number, step = 1): number[] {
  // Use TypedArray for better performance with numbers
  const length = Math.floor((end - start) / step) + 1;
  const arr = new Float64Array(length);
  for (let i = 0; i < length; i++) {
    arr[i] = start + (i * step);
  }
  return Array.from(arr);
}

/**
 * Get the min and max values from array
 *
 * When to use:
 * - Need both min and max
 * - Range calculations
 * - Bounds checking
 *
 * @example
 * minMax([1,5,3,7,2]) // { min: 1, max: 7 }
 */
export function minMax(arr: number[]): { min: number; max: number } {
  return {
    min: Math.min(...arr),
    max: Math.max(...arr),
  };
}
