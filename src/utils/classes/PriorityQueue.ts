/**
 * Optimized Priority Queue implementation
 * Uses binary heap for O(log n) operations
 * Memory: O(n) but more efficient as it uses an array
 *
 * PriorityQueue is better for:
 * - Dijkstra's algorithm
 * - A* pathfinding
 * - Any time you need items processed by priority
 */
export default class PriorityQueue<T> {
  private heap: Array<[number, T]>;

  constructor(initialCapacity = 16) {
    // Preallocate array for better performance
    this.heap = new Array(initialCapacity);
    this.size = 0;
  }

  private size: number;

  push(priority: number, value: T): void {
    if (this.size >= this.heap.length) {
      this.grow();
    }

    this.heap[this.size] = [priority, value];
    this.bubbleUp(this.size++);
  }

  pop(): T | undefined {
    if (this.size === 0) return undefined;

    const result = this.heap[0][1];
    this.size--;

    if (this.size > 0) {
      const last = this.heap[this.size];
      this.heap[0] = last;
      this.bubbleDown(0);
    }

    return result;
  }

  private grow(): void {
    const newCapacity = this.heap.length * 2;
    const newHeap = new Array(newCapacity);
    for (let i = 0; i < this.size; i++) {
      newHeap[i] = this.heap[i];
    }
    this.heap = newHeap;
  }

  // Optimized bubbleUp using shift operations
  private bubbleUp(index: number): void {
    const item = this.heap[index];

    while (index > 0) {
      const parentIndex = (index - 1) >> 1;
      const parent = this.heap[parentIndex];

      if (parent[0] <= item[0]) break;

      this.heap[index] = parent;
      index = parentIndex;
    }

    this.heap[index] = item;
  }

  // Optimized bubbleDown using shift operations
  private bubbleDown(index: number): void {
    const item = this.heap[index];
    const halfSize = this.size >> 1;

    while (index < halfSize) {
      let bestIndex = (index << 1) + 1;
      let bestPriority = this.heap[bestIndex][0];

      const rightIndex = bestIndex + 1;
      if (rightIndex < this.size) {
        const rightPriority = this.heap[rightIndex][0];
        if (rightPriority < bestPriority) {
          bestIndex = rightIndex;
          bestPriority = rightPriority;
        }
      }

      if (bestPriority >= item[0]) break;

      this.heap[index] = this.heap[bestIndex];
      index = bestIndex;
    }

    this.heap[index] = item;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }
}
