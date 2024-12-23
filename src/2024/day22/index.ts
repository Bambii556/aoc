import { getInputLines, log } from "../../utils/index.ts";
import { Solution } from "../../types.ts";

const modNum: number = 16777216; // 2^24

function nextSecret(secret: number): number {
  let result = secret;
  result ^= (result << 6) & (modNum - 1);
  result ^= result >>> 5;
  result ^= (result << 11) & (modNum - 1);
  return result & (modNum - 1);
}

function generateSequences(
  startSecret: number,
): { prices: number[]; changes: number[] } {
  const prices = [];
  let current = startSecret;

  // Generate prices (initial price + 2000 more)
  for (let i = 0; i <= 2000; i++) {
    prices.push(current % 10);
    current = nextSecret(current);
  }

  // Calculate changes
  const changes = [];
  for (let i = 1; i < prices.length; i++) {
    changes.push(prices[i] - prices[i - 1]);
  }

  return { prices, changes };
}

export const day22: Solution = {
  part1: async (input: string) => {
    const numbers = getInputLines(input).map(Number);
    let total = 0;

    for (const start of numbers) {
      let num = start;
      for (let i = 0; i < 2000; i++) {
        num = nextSecret(num);
      }
      total += num;
    }

    return total;
  },

  part2: async (input: string) => {
    const startingSecrets = getInputLines(input).map(Number);
    let maxBananas = 0;
    let bestSequence: number[] = [];
    let bestSequences: string[] = [];

    // Try all sequences of length 4 with values between -3 and 3
    for (let a = -3; a <= 3; a++) {
      for (let b = -3; b <= 3; b++) {
        for (let c = -3; c <= 3; c++) {
          for (let d = -3; d <= 3; d++) {
            const sequence = [a, b, c, d];
            let total = 0;

            // Try this sequence on each starting secret
            for (const startSecret of startingSecrets) {
              const { prices, changes } = generateSequences(startSecret);

              // Find first occurrence of sequence
              for (let i = 3; i < changes.length; i++) {
                if (
                  changes[i - 3] === sequence[0] &&
                  changes[i - 2] === sequence[1] &&
                  changes[i - 1] === sequence[2] &&
                  changes[i] === sequence[3]
                ) {
                  total += prices[i + 1]; // Important: use i + 1 here
                  break;
                }
              }
            }

            if (total > maxBananas) {
              maxBananas = total;
              bestSequence = sequence.slice();
              bestSequences = [`${sequence} giving ${total} bananas`];
            } else if (total === maxBananas) {
              bestSequences.push(`${sequence} giving ${total} bananas`);
            }
          }
        }
      }
    }

    log(`\nBest sequence found: ${bestSequence} giving ${maxBananas} bananas`);
    log(`\nSequences:`);
    for (const seq of bestSequences) {
      log(`  ${seq}`);
    }

    return maxBananas;
  },
};
