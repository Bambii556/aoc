import { getInputLines, log } from "../../utils/index.ts";
import { Solution } from "../../types.ts";

const MASK = (1 << 24) - 1;

export const day22: Solution = {
  part1: async (input: string) => {
    const secrets = getInputLines(input).map(Number);

    let sum = 0;

    for (let secret of secrets) {
      for (let i = 0; i < 2000; i += 1) {
        secret = transform(secret);
      }
      sum += secret;
    }

    return sum;
  },

  part2: async (input: string) => {
    const startingSecrets = getInputLines(input).map(Number);
    const patterns = new Map<string, number>();

    for (const startSecret of startingSecrets) {
      const foundPatterns = new Set<string>();
      let secret = startSecret;
      let prices = [secret % 10];
      let changes: number[] = [];

      // Generate sequence
      for (let i = 0; i < 2000; i++) {
        secret = transform(secret);
        const price = secret % 10;
        prices.push(price);
        changes.push(price - prices[prices.length - 2]);

        // Once we have enough changes, start looking for sequences
        if (changes.length >= 4) {
          // Get the last 4 changes
          const lastFour = changes.slice(-4);
          // Only consider changes in range -3 to 3
          if (lastFour.every((c) => c >= -3 && c <= 3)) {
            const key = lastFour.join(",");
            if (!foundPatterns.has(key)) {
              foundPatterns.add(key);
              patterns.set(key, (patterns.get(key) ?? 0) + price);
            }
          }
        }
      }
    }

    // Find the sequence with highest total
    let maxTotal = 0;
    let bestPattern = "";

    for (const [pattern, total] of patterns.entries()) {
      if (total > maxTotal) {
        maxTotal = total;
        bestPattern = pattern;
      }
    }

    log("\nBest pattern found:", bestPattern);
    log("Total bananas:", maxTotal);

    return maxTotal;
  },
};

function transform(secret: number): number {
  secret = ((secret << 6) ^ secret) & MASK;
  secret = ((secret >> 5) ^ secret) & MASK;
  secret = ((secret << 11) ^ secret) & MASK;
  return secret;
}
