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

/**
 * Number Utility Functions
 * Collection of commonly needed number operations and comparisons
 */

/**
 * Calculate percentage difference between two numbers
 *
 * When to use:
 * - Need relative difference rather than absolute
 * - Comparing values of different scales
 * - Analyzing changes/trends
 * - Calculating percentage changes
 *
 * When not to use:
 * - Need absolute difference
 * - Working with zero values (will return NaN)
 * - Precision critical calculations
 *
 * @example
 * getPercentageDifference(100, 90)  // 10 (10% difference)
 * getPercentageDifference(50, 75)   // 33.33... (33.33% difference)
 * getPercentageDifference(200, 150) // 25 (25% difference)
 */
export function getPercentageDifference(a: number, b: number): number {
  return Math.abs(a - b) / Math.max(a, b) * 100;
}

/**
 * Check if a number falls within a range (inclusive)
 *
 * When to use:
 * - Bounds checking
 * - Input validation
 * - Range containment tests
 * - Threshold checking
 *
 * When not to use:
 * - Need exclusive bounds
 * - Checking multiple ranges
 * - Complex range operations
 *
 * @example
 * isInRange(5, 1, 10)   // true
 * isInRange(0, 1, 10)   // false
 * isInRange(10, 1, 10)  // true (inclusive)
 */
export function isInRange(num: number, min: number, max: number): boolean {
  return num >= min && num <= max;
}

/**
 * Constrain a number between minimum and maximum values
 *
 * When to use:
 * - Enforcing bounds
 * - Limiting values
 * - Input normalization
 * - Animation/movement constraints
 *
 * When not to use:
 * - Need to know if clamping occurred
 * - Complex boundary conditions
 *
 * @example
 * clamp(15, 0, 10)    // 10 (clamped to max)
 * clamp(-5, 0, 10)    // 0  (clamped to min)
 * clamp(5, 0, 10)     // 5  (within range)
 */
export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

/**
 * Round number to nearest multiple of specified value
 *
 * When to use:
 * - Grid snapping
 * - Time rounding
 * - Price/currency rounding
 * - Measurement standardization
 *
 * When not to use:
 * - Need specific rounding direction (up/down)
 * - Working with very large numbers
 * - Precision critical calculations
 *
 * @example
 * roundToNearest(42, 5)   // 40 (nearest multiple of 5)
 * roundToNearest(44, 5)   // 45 (nearest multiple of 5)
 * roundToNearest(123, 10) // 120 (nearest multiple of 10)
 */
export function roundToNearest(num: number, multiple: number): number {
  return Math.round(num / multiple) * multiple;
}

/**
 * Calculate average/mean of numbers
 *
 * When to use:
 * - Need central tendency
 * - Data summarization
 * - Simple statistics
 * - Trend analysis
 *
 * When not to use:
 * - Outliers will skew results
 * - Need other averages (median/mode)
 * - Empty arrays (will return NaN)
 *
 * @example
 * average([1,2,3,4,5])     // 3
 * average([10,20,30,40])   // 25
 * average([-10,0,10])      // 0
 */
export function average(numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0) / numbers.length;
}

/**
 * Calculate median (middle value) of numbers
 *
 * When to use:
 * - Need central value
 * - Data has outliers
 * - Need robust average
 * - Statistical analysis
 *
 * When not to use:
 * - Empty arrays
 * - Need other averages
 * - Performance critical (requires sorting)
 *
 * @example
 * median([1,2,3,4,5])      // 3
 * median([1,2,3,4])        // 2.5 (average of middle values)
 * median([100,1,2,3,4])    // 3 (not affected by outlier)
 */
export function median(numbers: number[]): number {
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

/**
 * Check if number is between two values (exclusive)
 *
 * When to use:
 * - Need exclusive range check
 * - Boundary conditions
 * - Value comparisons
 * - Range validation
 *
 * When not to use:
 * - Need inclusive check (use isInRange)
 * - Checking multiple ranges
 * - Complex range logic
 *
 * @example
 * isBetween(5, 1, 10)   // true
 * isBetween(1, 1, 10)   // false (exclusive)
 * isBetween(5, 10, 1)   // true (works with reversed bounds)
 */
export function isBetween(num: number, a: number, b: number): boolean {
  return num > Math.min(a, b) && num < Math.max(a, b);
}

/**
 * Scale a number from one range to another
 *
 * When to use:
 * - Normalizing values
 * - Converting between ranges
 * - Animation scaling
 * - Data visualization
 *
 * When not to use:
 * - Need non-linear scaling
 * - Complex transforms
 * - Zero-length ranges
 *
 * @example
 * scale(5, 0, 10, 0, 100)    // 50 (5 is 50% of 0-10, so 50% of 0-100)
 * scale(20, 0, 100, 0, 1)    // 0.2 (convert percentage to decimal)
 * scale(-5, -10, 0, 0, 100)  // 50 (convert negative range to positive)
 */
export function scale(
  num: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  return (num - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

/**
 * Check if a number is even
 * Bitwise even/odd check (faster than modulo)
 *
 * When to use:
 * - Need to know if a number is divisible by 2
 * - Even/odd checks
 * - Checking parity
 */
export function isEven(num: number, useBitwise: boolean = true): boolean {
  return useBitwise ? (num & 1) === 0 : num % 2 === 0;
}

/**
 * Check if a number is odd
 * Bitwise even/odd check (faster than modulo)
 */
export function isOdd(n: number): boolean {
  return (n & 1) === 1;
}

/*
 * Modulo with positive result
 * Returns positive remainder when dividing n by m
 */
export function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

/**
 * Check if a number is prime.
 * Uses optimization tricks to quickly determine primality.
 *
 * @example
 * isPrime(17) // Returns true
 * isPrime(24) // Returns false
 *
 * How it works:
 * 1. Quick checks for n ≤ 3
 * 2. Eliminates even numbers and multiples of 3
 * 3. Only checks potential factors up to sqrt(n)
 * 4. Uses 6k±1 optimization (all primes > 3 are of form 6k±1)
 *
 * Common use cases:
 * - Prime factorization problems
 * - Number theory puzzles
 * - Checking divisibility properties
 */
export function isPrime(n: number): boolean {
  if (n <= 3) return n > 1;
  if (n % 2 === 0 || n % 3 === 0) return false;

  // Use wheel factorization with 2,3,5
  const limit = Math.sqrt(n);
  for (let i = 5; i <= limit; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

/**
 * Get all prime factors of a number in ascending order.
 * Returns repeated factors for prime powers.
 *
 * @example
 * getPrimeFactors(60) // Returns [2, 2, 3, 5]
 * getPrimeFactors(28) // Returns [2, 2, 7]
 *
 * How it works:
 * 1. Handle all factors of 2 first (optimization)
 * 2. Check odd numbers up to sqrt(n)
 * 3. Add remaining prime number if exists
 *
 * Common use cases:
 * - Finding divisors
 * - Computing GCD/LCM
 * - Number theory problems
 *
 * Performance note:
 * - Very efficient for numbers < 10^9
 * - For larger numbers, consider probabilistic methods
 */
export function getPrimeFactors(n: number): number[] {
  const factors: number[] = [];
  let num = n;

  // Handle all factors of 2 first (optimization)
  while (num % 2 === 0) {
    factors.push(2);
    num = num / 2;
  }

  // Check odd numbers up to sqrt(n)
  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    while (num % i === 0) {
      factors.push(i);
      num = num / i;
    }
  }

  // If remaining number is > 2, it's prime
  if (num > 2) {
    factors.push(num);
  }

  return factors;
}
