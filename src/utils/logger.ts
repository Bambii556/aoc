// src/utils/logger.ts

/** Available log types with corresponding colors */
type LogType = "info" | "success" | "warning" | "error" | "debug" | "result";

/** Color codes for different log types */
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  info: "\x1b[36m", // Cyan
  success: "\x1b[32m", // Green
  warning: "\x1b[33m", // Yellow
  error: "\x1b[31m", // Red
  debug: "\x1b[35m", // Magenta
  result: "\x1b[34m", // Blue
} as const;

/** Symbols for different log types */
const symbols = {
  info: "ℹ",
  success: "✓",
  warning: "⚠",
  error: "✖",
  debug: "🔍",
  result: "➜",
} as const;

export class Log {
  private static timers = new Map<string, number>();

  private static logWithColor(type: LogType, ...args: unknown[]) {
    const timestamp = new Date().toLocaleTimeString();
    const colorCode = colors[type];
    const symbol = symbols[type];

    console.log(
      `${colors.dim}[${timestamp}]${colors.reset}`,
      `${colorCode}${symbol}${colors.reset}`,
      ...args.map((arg) =>
        typeof arg === "string" ? `${colorCode}${arg}${colors.reset}` : arg
      ),
    );
  }

  /** Log general information */
  static info(...args: unknown[]) {
    this.logWithColor("info", ...args);
  }

  /** Log successful operations */
  static success(...args: unknown[]) {
    this.logWithColor("success", ...args);
  }

  /** Log warnings */
  static warning(...args: unknown[]) {
    this.logWithColor("warning", ...args);
  }

  /** Log errors */
  static error(...args: unknown[]) {
    this.logWithColor("error", ...args);
  }

  /** Log debug information */
  static debug(...args: unknown[]) {
    this.logWithColor("debug", ...args);
  }

  /** Log results/answers */
  static result(...args: unknown[]) {
    this.logWithColor("result", ...args);
  }

  /** Start a timer */
  static time(label: string) {
    this.timers.set(label, performance.now());
    this.info(`Starting ${label}...`);
  }

  /** End a timer and show duration */
  static timeEnd(label: string) {
    const start = this.timers.get(label);
    if (start === undefined) {
      this.warning(`Timer '${label}' does not exist`);
      return;
    }
    const duration = performance.now() - start;
    this.timers.delete(label);
    this.success(`${label}: ${duration.toFixed(2)}ms`);
  }

  /** Create a divider line */
  static divider() {
    console.log("\n" + "─".repeat(50) + "\n");
  }

  /** Log header for a day */
  static day(day: number) {
    console.log("\n");
    console.log("═".repeat(20));
    this.result(`Advent of Code 2024 - Day ${day}`);
    console.log("═".repeat(20));
    console.log("\n");
  }
}
