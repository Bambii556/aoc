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
