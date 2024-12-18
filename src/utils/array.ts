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
export function sum<T>(arr: T[], mapper?: (item: T) => number): number {
  if (mapper) {
    return arr.reduce((acc, val) => acc + mapper(val), 0);
  }
  return arr.reduce((acc, val) => acc + (val as unknown as number), 0);
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
 * Extracts numbers from a text string.
 *
 * @param text - The input text to parse
 * @param includeNegatives - Whether to include negative numbers in results
 * @returns Array of numbers found in the text
 */
export function findNumbers(text: string, includeNegatives = false): number[] {
  // Choose regex pattern based on whether to include negatives
  const pattern = includeNegatives ? /-?\d+/g : /\d+/g;
  const matches = text.match(pattern);
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
export function zip<T1, T2>(arr1: T1[], arr2: T2[]): [T1, T2][] {
  const minLength = Math.min(arr1.length, arr2.length);
  return Array.from(
    { length: minLength },
    (_, i) => [arr1[i], arr2[i]],
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
 * Create overlapping pairs from array elements
 *
 * When to use:
 * - Need consecutive pairs
 * - Analyzing sequential relationships
 * - Pattern matching between adjacent items
 * - Sliding window of size 2
 *
 * When not to use:
 * - Need non-sequential pairs
 * - Array too small (length < 2)
 * - Need larger groups
 *
 * @example
 * getPairs([1,2,3,4]) // [[1,2],[2,3],[3,4]]
 * getPairs(['a','b','c']) // [['a','b'],['b','c']]
 */
export function getOverlappingPairs<T>(arr: T[]): [T, T][] {
  if (arr.length < 2) return [];
  return arr.slice(0, -1).map((item, i) => [item, arr[i + 1]]);
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
 * sequence(1, 5)      // [1,2,3,4,5]
 * sequence(5, 1)      // [5,4,3,2,1]
 * sequence(2, 10, 2)  // [2,4,6,8,10]
 * sequence(10, 2, -2) // [10,8,6,4,2]
 */
export function sequenceFromRange(
  start: number,
  end: number,
  step = start <= end ? 1 : -1,
): number[] {
  // Validate step direction
  if ((start <= end && step <= 0) || (start >= end && step >= 0)) {
    return [];
  }

  const length = Math.floor(Math.abs((end - start) / step)) + 1;
  const arr = new Float64Array(length);

  for (let i = 0; i < length; i++) {
    arr[i] = start + (i * step);
  }

  return Array.from(arr);
}

/**
 * Generate sequence of numbers starting from a number, incrementing by a value, for n steps
 *
 * @param start - Starting number
 * @param increment - Value to increment by each step
 * @param steps - Number of steps to take
 * @returns Array of numbers in sequence
 *
 * @example
 * generateSequence(1, 2, 3)  // [1,3,5]
 * generateSequence(10, -2, 4) // [10,8,6,4]
 * generateSequence(0, 5, 5)  // [0,5,10,15,20]
 */
export function sequenceFromSteps(
  start: number,
  steps: number,
  increment: number = 1,
): number[] {
  const arr = new Float64Array(steps);

  for (let i = 0; i < steps; i++) {
    arr[i] = start + (i * increment);
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

/**
 * Basic number array sort using JavaScript's built-in sort
 *
 * When to use:
 * - Small to medium arrays (< 1000 elements)
 * - Need stable sort
 * - Original array should remain unchanged
 * - Simple sorting requirements
 *
 * When not to use:
 * - Very large arrays (use quickSort)
 * - Need in-place sorting (memory constrained)
 * - Integers in small range (use countingSort)
 * - Performance is critical
 *
 * @example
 * sortNumbers([3, 1, 4, 1, 5]) // Returns [1, 1, 3, 4, 5]
 *
 * // Original array unchanged
 * const nums = [5, 2, 8];
 * const sorted = sortNumbers(nums);
 * console.log(nums); // Still [5, 2, 8]
 */
export function sortNumbers(arr: number[]): number[] {
  return arr.slice().sort((a, b) => a - b);
}

/**
 * Quick sort implementation with in-place sorting
 *
 * When to use:
 * - Large arrays (> 1000 elements)
 * - Memory efficiency is important
 * - Speed is critical
 * - Can modify original array
 *
 * When not to use:
 * - Need stable sort
 * - Original array must be preserved
 * - Array is nearly sorted (worst case)
 * - Small arrays (overhead not worth it)
 *
 * How it works:
 * 1. Choose pivot element
 * 2. Partition array around pivot
 * 3. Recursively sort sub-arrays
 *
 * Time complexity: O(n log n) average, O(n²) worst
 * Space complexity: O(log n)
 *
 * @example
 * const arr = [3, 1, 4, 1, 5];
 * quickSort(arr);
 * console.log(arr); // [1, 1, 3, 4, 5]
 */
export function quickSort(arr: number[]): void {
  function partition(low: number, high: number): number {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (arr[j] <= pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
  }

  function sort(low: number, high: number): void {
    if (low < high) {
      const pi = partition(low, high);
      sort(low, pi - 1);
      sort(pi + 1, high);
    }
  }

  sort(0, arr.length - 1);
}

/**
 * Counting sort for integers in a known range
 *
 * When to use:
 * - Integers in a small, known range
 * - Range size (max-min) is comparable to array length
 * - Need linear time sorting
 * - Memory usage not a concern
 *
 * When not to use:
 * - Floating point numbers
 * - Large range of values
 * - Memory constrained
 * - Sparse data
 *
 * How it works:
 * 1. Count occurrences of each number
 * 2. Reconstruct sorted array from counts
 *
 * Time complexity: O(n + k) where k is range
 * Space complexity: O(k)
 *
 * @example
 * countingSort([3, 1, 4, 1, 5], 1, 5) // [1, 1, 3, 4, 5]
 *
 * // Perfect for small ranges
 * const scores = [10, 8, 9, 10, 7, 8];
 * countingSort(scores, 7, 10) // [7, 8, 8, 9, 10, 10]
 */
export function countingSort(
  arr: number[],
  min: number,
  max: number,
): number[] {
  const range = max - min + 1;
  const count = new Array(range).fill(0);
  const output = new Array(arr.length);

  // Count occurrences
  for (const num of arr) {
    count[num - min]++;
  }

  // Reconstruct sorted array
  let outIdx = 0;
  for (let i = 0; i < range; i++) {
    while (count[i]-- > 0) {
      output[outIdx++] = i + min;
    }
  }

  return output;
}

/**
 * Sort and remove duplicates in one pass
 *
 * When to use:
 * - Need both sorting and deduplication
 * - Order matters
 * - Memory usage not a concern
 * - Want cleaner code than separate sort/unique
 *
 * When not to use:
 * - Need to preserve duplicates
 * - Need to count occurrences
 * - Memory constrained
 * - Need to track original indices
 *
 * Time complexity: O(n log n)
 * Space complexity: O(n)
 *
 * @example
 * sortUnique([3, 1, 4, 1, 5]) // [1, 3, 4, 5]
 *
 * // Great for category lists
 * const categories = [5, 2, 5, 3, 2, 1];
 * sortUnique(categories) // [1, 2, 3, 5]
 */
export function sortUnique(arr: number[]): number[] {
  return [...new Set(arr)].sort((a, b) => a - b);
}

/**
 * Get top N largest elements
 *
 * When to use:
 * - Only need a subset of largest elements
 * - Full sort not required
 * - Top rankings/scores needed
 * - Performance matters for large arrays
 *
 * When not to use:
 * - Need complete sorted array
 * - N is close to array length
 * - Need to maintain original order
 * - Need both ends of range
 *
 * Time complexity: O(n log n)
 * Space complexity: O(n)
 *
 * @example
 * getTopN([3, 1, 4, 1, 5], 3) // [5, 4, 3]
 *
 * // Perfect for rankings
 * const scores = [88, 92, 75, 96, 84];
 * getTopN(scores, 3) // [96, 92, 88] (top 3 scores)
 */
export function getTopN(arr: number[], n: number): number[] {
  return arr.slice().sort((a, b) => b - a).slice(0, n);
}

/**
 * Remove item at specified index from array
 *
 * When to use:
 * - Need to remove single item by index
 * - Want immutable operation (original array unchanged)
 * - Need simple array modification
 * - Position of item is known
 *
 * When not to use:
 * - Need to remove multiple items
 * - Want to modify array in place
 * - Need to remove by value instead of index
 * - Array is very large (consider splice)
 *
 * Time complexity: O(n)
 * Space complexity: O(n)
 *
 * @param arr - Input array
 * @param index - Index to remove
 * @returns New array with item removed
 *
 * @example
 * removeAtIndex([1, 2, 3, 4], 1) // [1, 3, 4]
 *
 * // Keep original array unchanged
 * const original = [1, 2, 3];
 * const modified = removeAtIndex(original, 0);
 * console.log(original); // [1, 2, 3]
 * console.log(modified); // [2, 3]
 */
export function removeAtIndex<T>(arr: T[], index: number): T[] {
  // Input validation
  if (index < 0 || index >= arr.length) {
    return arr.slice();
  }

  // Return new array with item removed
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

/**
 * Faster version that modifies array in place
 *
 * When to use:
 * - Performance is critical
 * - Original array can be modified
 * - Memory usage is a concern
 *
 * When not to use:
 * - Need immutable operation
 * - Original array must be preserved
 *
 * @example
 * const arr = [1, 2, 3, 4];
 * removeAtIndexInPlace(arr, 1);
 * console.log(arr); // [1, 3, 4]
 */
export function removeAtIndexInPlace<T>(arr: T[], index: number): void {
  // Input validation
  if (index < 0 || index >= arr.length) {
    return;
  }

  // Modify array in place
  arr.splice(index, 1);
}

/**
 * Generate all permutations of an array
 * Optimized version using Heap's Algorithm
 *
 * Performance characteristics:
 * - Time: O(n!) - can't avoid this as it's generating all permutations
 * - Space: O(n) - better than O(n!) of recursive version
 *
 * When to use:
 * - Need all possible arrangements
 * - Array size <= 8 (8! = 40320 permutations)
 * - Order matters
 * - Performance is critical
 *
 * When not to use:
 * - Arrays longer than 8 elements
 * - Only need some permutations
 * - Order doesn't matter
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
  if (array.length <= 1) return [array.slice()];
  if (array.length > 8) {
    // throw new Error("Array too large, permutations would exceed 40320");
    return getPermutationsLarger(array);
  }

  const result: T[][] = [];
  const len = array.length;
  const c = new Array(len).fill(0);

  // Add first permutation
  result.push(array.slice());

  let i = 0;
  while (i < len) {
    if (c[i] < i) {
      // Swap elements
      const k = i % 2 && c[i];
      const temp = array[i];
      array[i] = array[k];
      array[k] = temp;

      // Add new permutation
      result.push(array.slice());

      // Increment count
      c[i]++;
      i = 0;
    } else {
      c[i] = 0;
      i++;
    }
  }

  return result;
}

function getPermutationsLarger<T>(array: T[]): T[][] {
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

/**
 * Creates an array of numbers from start to end (inclusive).
 * Can handle ascending or descending order.
 *
 * @param start - Starting number
 * @param end - Ending number (inclusive)
 * @returns Array of numbers in sequence
 *
 * @example
 * range(1, 4)    // Returns [1, 2, 3, 4]
 * range(4, 1)    // Returns [4, 3, 2, 1]
 *
 * Common use cases:
 * - Creating sequence of numbers
 * - Generating test cases
 * - Iterating over a range
 * - Counting down or up
 */
export function createRange(start: number, end: number): number[] {
  // Determine if counting up or down
  const isAscending = start <= end;

  // Use provided step or default based on direction
  const stepValue = isAscending ? 1 : -1;

  // Calculate length based on direction
  const length = Math.floor(Math.abs(end - start) / Math.abs(stepValue)) + 1;

  return Array.from(
    { length },
    (_, i) => start + (i * stepValue),
  );
}

/**
 * Returns numbers from the first array that appear in the second array.
 * Uses Set for O(n) lookup performance.
 *
 * @param first - First array to check numbers from
 * @param second - Second array to check against
 * @returns Array of numbers that exist in both arrays, in order of first array
 *
 * @example
 * findCommonNumbers([1,2,3,4], [2,4,6,8]) // Returns [2,4]
 */
export function findCommonNumbers(first: number[], second: number[]): number[] {
  // Convert second array to Set for O(1) lookups
  const secondSet = new Set(second);

  // Filter first array to only include numbers present in second array
  return first.filter((num) => secondSet.has(num));
}
