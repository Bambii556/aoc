export default class FastQ<T> {
  private head: number = 0;
  private tail: number = 0;
  private storage: { [key: number]: T } = {};

  constructor(items?: T[]) {
    if (items) {
      items.forEach((item) => this.addBack(item));
    }
  }

  static fromArray<T>(items: T[]): FastQ<T> {
    return new FastQ(items);
  }

  addFront(value: T): void {
    this.head--;
    this.storage[this.head] = value;
  }

  addBack(value: T): void {
    this.storage[this.tail] = value;
    this.tail++;
  }

  popFront(): T | undefined {
    if (this.isEmpty()) return undefined;

    const value = this.storage[this.head];
    delete this.storage[this.head];
    this.head++;
    return value;
  }

  popBack(): T | undefined {
    if (this.isEmpty()) return undefined;

    this.tail--;
    const value = this.storage[this.tail];
    delete this.storage[this.tail];
    return value;
  }

  size(): number {
    return this.tail - this.head;
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  toArray(): T[] {
    return Object.values(this.storage);
  }

  clear(): void {
    this.storage = {};
    this.head = 0;
    this.tail = 0;
  }
}
