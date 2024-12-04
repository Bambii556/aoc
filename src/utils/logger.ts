export class Log {
  static async logWithTimer(timerName: string, fn: () => Promise<unknown>) {
    console.time(timerName);
    const result = await fn();
    console.timeEnd(timerName);

    return result;
  }

  /** Create a divider line */
  static divider(char: string = "─", length = 50) {
    console.log("\n" + char.repeat(length) + "\n");
  }

  static info(message: string, ...args: unknown[]) {
    console.log(`${message}`, ...args);
  }

  static error(message: string, ...args: unknown[]) {
    console.error(`${message}`, ...args);
  }
}
