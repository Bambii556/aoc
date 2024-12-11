import { getInputLines, isEven, Log } from "../../utils/index.ts";
import { Solution } from "../../types.ts";
import { Worker } from "node:worker_threads";

type ChunkResult = {
  chunk: string[];
  length: number;
};

export const day11: Solution = {
  part1: async (input: string) => {
    let stones = input.split(" ");

    for (let blink = 1; blink <= 25; blink++) {
      stones = stones.flatMap((stone) => evaluateStone(stone));
    }

    return stones.length;
  },

  part2: async (input: string) => {
    const CHUNK_SIZE = 100000;
    const NUM_WORKERS = 12; // Adjust based on CPU cores

    // Create worker pool
    const workers = Array.from(
      { length: NUM_WORKERS },
      () => new Worker(new URL("./worker.ts", import.meta.url)),
    );

    try {
      let chunks: string[][] = [input.split(" ")];
      let chunkLengths: number[] = [chunks[0].length];

      for (let blink = 1; blink <= 75; blink++) {
        const blinkName = `Blink ${blink}`;
        console.time(blinkName);
        // Process chunks in parallel
        const chunkPromises = chunks.map((chunk, idx) =>
          new Promise<{ chunk: string[]; length: number }>((resolve) => {
            const worker = workers[idx % NUM_WORKERS];
            worker.once("message", resolve);
            worker.postMessage({ chunk, length: chunkLengths[idx] });
          })
        );

        // Wait for all chunks to process
        const results = await Promise.all(chunkPromises);

        // Combine and redistribute results
        const newChunks: string[][] = [];
        const newLengths: number[] = [];
        let currentChunk: string[] = new Array(CHUNK_SIZE);
        let currentLength = 0;

        for (const { chunk, length } of results) {
          for (let i = 0; i < length; i++) {
            if (currentLength >= CHUNK_SIZE) {
              newChunks.push(currentChunk);
              newLengths.push(currentLength);
              currentChunk = [];
              currentLength = 0;
            }
            currentChunk[currentLength++] = chunk[i];
          }
        }

        if (currentLength > 0) {
          newChunks.push(currentChunk);
          newLengths.push(currentLength);
        }

        chunks = newChunks;
        chunkLengths = newLengths;

        const totalLength = chunkLengths.reduce((sum, len) => sum + len, 0);
        console.log(`Blink ${blink}: - ${totalLength} - ${chunks.length}`);
        console.timeEnd(blinkName);
      }

      return chunkLengths.reduce((sum, len) => sum + len, 0);
    } finally {
      // Cleanup workers
      workers.forEach((worker) => worker.terminate());
    }
  },
};

function evaluateStone(stone: string): string[] {
  // Rule 1: If stone is "0", return "1"
  if (stone === "0") return ["1"];

  // Rule 2: If even number of digits, split the string
  const len = stone.length;
  if (len % 2 === 0) {
    const mid = len >> 1; // Bitwise shift instead of division

    // Avoid regex when possible
    let left = stone.slice(0, mid);
    let right = stone.slice(mid);

    // Manual leading zero removal (faster than regex)
    while (left[0] === "0" && left.length > 1) left = left.slice(1);
    while (right[0] === "0" && right.length > 1) right = right.slice(1);

    return [left || "0", right || "0"];
  }

  // Rule 3: Multiply by 2024
  // Only convert to number for multiplication
  const num = parseInt(stone, 10);
  return [(num * 2024).toString()];
}
