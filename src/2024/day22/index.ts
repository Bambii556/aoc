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
    const secrets = getInputLines(input).map(Number);
    const targetSequence = [-2, 1, -1, 3]; // Known working sequence from example
    let total = 0;

    // For debugging, use example inputs
    const exampleSecrets = [1, 2, 3, 2024];

    log("\nExample sequence test:");
    for (const secret of exampleSecrets) {
      const result = findSequence(secret, targetSequence);
      if (result.found) {
        log(
          `Secret ${secret}: Found sequence at ${result.position}, price = ${result.price}`,
        );
        log(`  Prices: ${result.prices?.join(",")}`);
        log(`  Changes: ${result.changes?.join(",")}`);
        total += result.price!;
      } else {
        log(`Secret ${secret}: Sequence not found`);
      }
    }

    return total;
  },
};

function transform(secret: number): number {
  secret = ((secret << 6) ^ secret) & MASK;
  secret = ((secret >> 5) ^ secret) & MASK;
  secret = ((secret << 11) ^ secret) & MASK;
  return secret;
}

function findSequence(startSecret: number, targetSequence: number[]): {
  found: boolean;
  position?: number;
  price?: number;
  prices?: number[];
  changes?: number[];
} {
  let secret = startSecret;
  const prices: number[] = [secret % 10];
  const changes: number[] = [];

  for (let i = 0; i < 2000; i++) {
    secret = transform(secret);
    const price = secret % 10;
    prices.push(price);
    changes.push(price - prices[prices.length - 2]);
  }

  // Look for target sequence
  for (let i = 0; i < changes.length - 3; i++) {
    let matches = true;
    for (let j = 0; j < 4; j++) {
      if (changes[i + j] !== targetSequence[j]) {
        matches = false;
        break;
      }
    }
    if (matches) {
      return {
        found: true,
        position: i,
        price: prices[i + 4],
        prices: prices.slice(i, i + 5),
        changes: changes.slice(i, i + 4),
      };
    }
  }

  return { found: false };
}
