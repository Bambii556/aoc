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
 * Binary GCD Algorithm (Binary Euclidean Algorithm)
 * Finds the largest number that divides both inputs with no remainder
 *
 * Detailed explanation:
 * 1. Take absolute values of inputs (GCD is always positive)
 * 2. Remove common factors of 2 using bit shifting:
 *    - a >>= 1 means divide by 2
 *    - (a | b) & 1 checks if both numbers are even
 * 3. Keep track of removed 2s in 'shift'
 * 4. Remove remaining factors of 2 from each number
 * 5. Subtract smaller from larger until one becomes 0
 * 6. Multiply result by 2^shift to restore common factors
 *
 * Example walkthrough:
 * gcd(48, 18):
 * 1. 48 = 110000₂, 18 = 10010₂
 * 2. Both even: shift = 1, a = 24, b = 9
 * 3. a = 24 (even), a = 12, then 6, then 3
 * 4. Now: a = 3, b = 9
 * 5. Swap so a = 9, b = 3
 * 6. Subtract: b = 6, then 3, then 0
 * 7. Result: 3 * 2^1 = 6
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
 * Least Common Multiple
 * Finds smallest number divisible by both inputs
 * Uses the relationship: LCM(a,b) = |a*b|/GCD(a,b)
 *
 * Detailed explanation:
 * 1. Multiply the numbers together
 * 2. Divide by their GCD
 * 3. Take absolute value for positive result
 *
 * Example walkthrough:
 * lcm(4, 6):
 * 1. Multiply: 4 * 6 = 24
 * 2. Find GCD(4, 6) = 2
 * 3. Result: 24/2 = 12
 *
 * Visual representation:
 * 4: |----|----|----| (marks at 4, 8, 12)
 * 6: |---------|---| (marks at 6, 12)
 * First common mark is at 12
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
