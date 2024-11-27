/**
 * Memoization
 * ----------
 * Function for optimizing recursive or expensive computations
 * by caching results
 */

/**
 * Creates a memoized version of any function.
 * Caches results based on stringified arguments.
 *
 * @example
 * const expensiveCalc = (n: number) => { ''complex calculation'' };
 * const memoizedCalc = memoize(expensiveCalc);
 * memoizedCalc(42); // Calculates first time
 * memoizedCalc(42); // Returns cached result
 *
 * How it works:
 * 1. Creates a cache using Map
 * 2. Converts arguments to string for cache key
 * 3. Returns cached result if available
 * 4. Otherwise computes and caches new result
 *
 * Common use cases:
 * - Optimizing recursive functions
 * - Caching expensive computations
 * - Improving performance of repeated calls
 *
 * Note: Be cautious with memory usage when memoizing
 * functions with many possible inputs
 */
export function memoize<T extends (...args: any[]) => any>(
  fn: T,
): (...args: Parameters<T>) => ReturnType<T> {
  const cache = new Map<string, ReturnType<T>>();

  return (...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args); // Convert args to cache key
    if (cache.has(key)) {
      return cache.get(key)!; // Return cached result if exists
    }
    const result = fn(...args); // Calculate new result
    cache.set(key, result); // Cache for future use
    return result;
  };
}
