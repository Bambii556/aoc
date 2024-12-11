// worker.ts
import { parentPort } from "node:worker_threads";

if (!parentPort) throw new Error("Must be run as a worker");

function processChunkInWorker(chunk: string[], length: number) {
  const resultChunk = new Array(length * 2); // Max possible size
  let resultLength = 0;

  for (let i = 0; i < length; i++) {
    const stone = chunk[i];

    if (stone === "0") {
      resultChunk[resultLength++] = "1";
    } else if (stone.length % 2 === 0) {
      const mid = stone.length >> 1;
      const left = stone.slice(0, mid);
      const right = stone.slice(mid);

      resultChunk[resultLength++] = left.replace(/^0+/, "") || "0";
      resultChunk[resultLength++] = right.replace(/^0+/, "") || "0";
    } else {
      resultChunk[resultLength++] = (parseInt(stone, 10) * 2024).toString();
    }
  }

  return { chunk: resultChunk.slice(0, resultLength), length: resultLength };
}

parentPort.on("message", ({ chunk, length }) => {
  const result = processChunkInWorker(chunk, length);
  parentPort?.postMessage(result);
});
