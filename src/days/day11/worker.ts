// worker.ts
import { parentPort } from "node:worker_threads";

if (!parentPort) throw new Error("Must be run as a worker");

function processChunkInWorker(chunk: BigUint64Array, length: number) {
  const resultChunk = new BigUint64Array(length * 2);
  let resultLength = 0;

  for (let i = 0; i < length; i++) {
    const value = chunk[i];

    if (value === 0n) {
      resultChunk[resultLength++] = 1n;
    } else {
      const strValue = value.toString();

      if (strValue.length % 2 === 0) {
        const mid = strValue.length >> 1;
        const left = strValue.slice(0, mid);
        const right = strValue.slice(mid);

        resultChunk[resultLength++] = BigInt(left);
        resultChunk[resultLength++] = BigInt(right);
      } else {
        resultChunk[resultLength++] = value * 2024n;
      }
    }
  }

  return {
    chunk: resultChunk.slice(0, resultLength),
    length: resultLength,
    buffer: resultChunk.buffer,
  };
}

parentPort.on("message", ({ chunk, length }) => {
  const result = processChunkInWorker(chunk, length);
  parentPort?.postMessage(result, [result.buffer]);
});
