export function timerSync<T>(
  timerName: string,
  fn: () => T,
  reset: boolean = false,
): T {
  if (reset) {
    console.countReset(timerName);
  }
  console.time(timerName);
  const result = fn();
  console.timeEnd(timerName);
  return result;
}

export async function timerAsync<T>(
  timerName: string,
  fn: () => Promise<T>,
  reset: boolean = false,
): Promise<T> {
  if (reset) {
    console.countReset(timerName);
  }
  console.time(timerName);
  const result = await fn();
  console.timeEnd(timerName);
  return result;
}

export function divider(char: string = "─", length = 50) {
  console.log("\n" + char.repeat(length) + "\n");
}

export function log(message: string, ...args: unknown[]) {
  console.log(`${message}`, ...args);
}

export function error(message: string, ...args: unknown[]) {
  console.error(`${message}`, ...args);
}
