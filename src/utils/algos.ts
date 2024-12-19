/**
 * Solves a system of linear equations using Cramer's Rule.
 *
 * When to use:
 * - Solving 2x2 or 3x3 systems of linear equations
 * - Need exact solutions rather than approximations
 * - System has a unique solution
 * - Coefficients are known constants
 *
 * When not to use:
 * - Large systems of equations (4x4 or larger)
 * - System may be singular (no unique solution)
 * - Coefficients are floating point and precision is critical
 * - System is sparse (many zero coefficients)
 *
 * @example
 * // Solve system:
 * // 2x + 3y = 8
 * // 4x + 9y = 22
 * solveCramer([[2,3], [4,9]], [8,22])
 * // Returns [1,2] (x=1, y=2)
 *
 * How it works:
 * 1. Calculate main determinant (D) from coefficient matrix
 * 2. For each variable:
 *    - Replace corresponding column with constants
 *    - Calculate new determinant (Dx, Dy)
 *    - Solution for variable is Dx/D or Dy/D
 * 3. Verify solution exists (D ≠ 0)
 *
 * Common use cases:
 * - Finding intersection points
 * - Calculating unknown quantities in physics
 * - Balancing chemical equations
 * - Game mechanics requiring exact solutions
 *
 * @param coefficients - Matrix of coefficients where each row is [a,b] for ax + by = c
 * @param constants - Array of constant terms [c1,c2]
 * @returns Solution array [x,y] or null if no solution exists
 */
export function solveCramer(
  coefficients: [number, number][],
  constants: number[],
): [number, number] | null {
  // Extract coefficients
  const [[a11, a12], [a21, a22]] = coefficients;
  const [b1, b2] = constants;

  // Calculate main determinant
  const D = a11 * a22 - a12 * a21;

  // Check if system has a solution
  if (D === 0) {
    return null;
  }

  // Calculate determinants for x and y
  const Dx = b1 * a22 - b2 * a12;
  const Dy = a11 * b2 - b1 * a21;

  // Calculate solutions
  const x = Dx / D;
  const y = Dy / D;

  return [x, y];
}

/**
 * Binary GCD Algorithm (Stein's Algorithm)
 * A more efficient GCD implementation for large numbers using bitwise operations
 *
 * Steps:
 * 1. Convert inputs to positive numbers
 * 2. Factor out powers of 2 using bitwise shifts
 * 3. Use subtraction instead of division
 * 4. Restore the common factors of 2 at the end
 *
 * Advantages:
 * - More efficient for very large numbers
 * - Avoids expensive modulo operations
 * - Better for numbers with many factors of 2
 *
 * @param a - First number to find GCD of
 * @param b - Second number to find GCD of
 * @returns The greatest common divisor
 * @example
 * gcdLarge(48, 18) // Returns 6
 */
export function gcdLarge(a: number, b: number): number {
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
 * Euclidean GCD Algorithm
 * A simple implementation to find the greatest common divisor using modulo
 *
 * Steps:
 * 1. While second number isn't 0:
 *    - Store second number temporarily
 *    - Second number becomes remainder of a÷b
 *    - First number becomes the stored temp
 * 2. Return first number when done
 *
 * Advantages:
 * - Simple to understand and implement
 * - Often faster for smaller numbers
 * - More readable code
 *
 * @param a - First number to find GCD of
 * @param b - Second number to find GCD of
 * @returns The greatest common divisor
 * @example
 * gcd(48, 18) // Returns 6
 */
export function gcd(a: number, b: number): number {
  while (b > 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

/**
 * Least Common Multiple (LCM)
 * Finds smallest positive number divisible by both inputs
 *
 * Steps:
 * 1. Multiply the absolute values of inputs
 * 2. Divide by their Greatest Common Divisor (GCD)
 *
 * Notes:
 * - Uses |a * b| / gcd(a,b) formula
 * - Takes absolute values to handle negative inputs
 * - Can use either gcd() or gcdLarge() internally
 *
 * When to use:
 * - Finding common cycles/periods
 * - Solving timing problems
 * - Need smallest common multiple
 *
 * When not to use:
 * - Working with floating point numbers
 * - Numbers too large (product may overflow)
 * - Need Greatest Common Divisor instead
 *
 * @param a - First number to find LCM of
 * @param b - Second number to find LCM of
 * @returns The least common multiple
 * @example
 * lcm(4, 6) // Returns 12
 * lcm(21, 6) // Returns 42
 */
export function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

// Alternate version using gcdLarge
/**
 * Least Common Multiple using Binary GCD
 * Same as lcm() but uses binary GCD algorithm
 * Better for large numbers with many factors of 2
 *
 * @param a - First number to find LCM of
 * @param b - Second number to find LCM of
 * @returns The least common multiple
 * @example
 * lcmLarge(4, 6) // Returns 12
 */
export function lcmLarge(a: number, b: number): number {
  return Math.abs(a * b) / gcdLarge(a, b);
}

/**
 * LCM for multiple numbers
 * Calculates the LCM of an array of numbers by repeatedly applying lcm().
 * Useful when finding cycle lengths in puzzle patterns.
 *
 * Finds smallest number divisible by all inputs
 *
 * Detailed explanation:
 * Uses reduce to repeatedly apply LCM:
 * 1. Start with first number
 * 2. Find LCM with second number
 * 3. Take that result and find LCM with third number
 * 4. Continue until all numbers processed
 *
 * Example walkthrough:
 * lcmArray([4, 6, 8]):
 * 1. First pair: lcm(4, 6) = 12
 * 2. Result with next: lcm(12, 8) = 24
 *
 * Visual representation:
 * 4: |----|----|----|----|----|----|
 * 6: |---------|---------|---------|
 * 8: |-----------|-----------|
 * All align at 24
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
 * Optimized mode (most frequent value) calculator
 *
 * When to use:
 * - Need most common element
 * - Frequency analysis
 * - Single pass required
 * - Memory available for Map
 *
 * When not to use:
 * - Need all frequencies
 * - Need to handle ties
 * - Memory constrained
 * - Need to track frequency order
 *
 * @example
 * mode([1, 2, 2, 3, 4, 2]) // Returns 2
 *
 * // Find most common character
 * mode('abracadabra'.split('')) // Returns 'a'
 */
export function mode<T>(arr: T[]): T {
  const freq = new Map<T, number>();
  let maxFreq = 0;
  let maxItem: T = arr[0];

  // Single pass through array
  for (const item of arr) {
    const count = (freq.get(item) || 0) + 1;
    freq.set(item, count);

    if (count > maxFreq) {
      maxFreq = count;
      maxItem = item;
    }
  }

  return maxItem;
}

/**
 * Calculate Manhattan distance between two points.
 * Manhattan distance is the sum of absolute differences of coordinates.
 * Also known as L1 distance or taxicab distance.
 *
 * When to use:
 * - Grid-based movement with only cardinal directions (no diagonals)
 * - Finding minimum steps between points on a grid
 * - Distance calculations in maze/path problems
 * - When diagonal movement is not allowed
 * - Computing distances in 2D coordinate systems
 *
 * When not to use:
 * - Diagonal movement is allowed (use Euclidean distance)
 * - Need exact geometric distance
 * - Working in 3D space
 * - Need curved/non-grid paths
 * - When movement costs are not uniform
 *
 * @example
 * manhattanDistance(1, 1, 4, 5) // Returns 7
 * // Because |1-4| + |1-5| = 3 + 4 = 7
 *
 * How it works:
 * - Takes absolute difference of x coordinates
 * - Takes absolute difference of y coordinates
 * - Sums these differences
 *
 * Common use cases:
 * - Path finding in grid-based puzzles
 * - Calculating minimum steps between points
 * - Measuring distance when diagonal moves aren't allowed
 */
export function manhattanDistance(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): number {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

/**
 * Creates a memoized version of any function.
 * Caches results based on stringified arguments.
 *
 * When to use:
 * - Expensive recursive calculations
 * - Pure functions
 * - Repeated calls with same args
 * - Dynamic programming
 *
 * When not to use:
 * - Functions with side effects
 * - Memory constrained
 * - Arguments not serializable
 * - Random/time-dependent functions
 *
 * How it works:
 * 1. Creates a cache using Map
 * 2. Converts arguments to string for cache key
 * 3. Returns cached result if available
 * 4. Otherwise computes and caches new result
 *
 * @param fn - Function to memoize
 * @returns Memoized version of the function
 *
 * @example
 * const memoizedFib = memoize((n: number): number => {
 *   if (n <= 1) return n;
 *   return memoizedFib(n - 1) + memoizedFib(n - 2);
 * });
 */
export function memoize<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => TResult,
): (...args: TArgs) => TResult {
  const cache = new Map<string, TResult>();

  return (...args: TArgs): TResult => {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}
