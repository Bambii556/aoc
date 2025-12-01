import { loadAllSolutions, Solutions } from "./index.ts";
import { log } from "./utils/index.ts";

async function runDay(year: number, day: number) {
  log(`\n🎄 Day ${day} 🎄`);

  try {
    const solutions: Solutions = await loadAllSolutions();

    if (!solutions[year]?.[day]) {
      console.warn(`No solution found for Year ${year} Day ${day}`);
      return;
    }

    // Load test module
    const testModule = await import(`./${year}/day${day}/test.ts`);

    // Load input file for the specific day
    const input = await Deno.readTextFile(
      `./src/${year}/day${day}/input.txt`,
    );

    log(`=== Year ${year} Day ${day} ===\n`);
    if (solutions[year][day].title) {
      log(solutions[year][day].title);
    }

    // Run part 1 tests and solution
    try {
      await testModule.runPart1Tests();
      log(`${"-".repeat(20)}\n`);
      console.time("Part 1");
      const part1Result = await solutions[year][day].part1(input);
      console.timeEnd("Part 1");
      log(" - Result:", part1Result);
      log(`\n${"#".repeat(20)}\n`);
    } catch (error) {
      console.error("Part 1 failed:", error);
      Deno.exit(1);
    }

    // Run part 2 tests and solution
    try {
      await testModule.runPart2Tests();
      log(`${"-".repeat(20)}\n`);
      console.time("Part 2");
      const part2Result = await solutions[year][day].part2(input);
      console.timeEnd("Part 2");
      log(" - Result:", part2Result);
    } catch (error) {
      console.error("Part 2 failed:", error);
      Deno.exit(1);
    }

    log(`\n=== Year ${year} Day ${day} END ===\n`);
  } catch (e) {
    console.error(`Error running day ${day}:`, e);
  }
}

async function main() {
  const year = Deno.args[0] ? parseInt(Deno.args[0]) : 0;
  const day = Deno.args[1] ? parseInt(Deno.args[1]) : 0;

  if (isNaN(year) || year < 1 || year > 2025) {
    log("Please provide a valid year (2020-2025)");
    Deno.exit(1);
  }

  if (isNaN(day) || day < 1 || day > 25) {
    log("Please provide a valid day (1-25)");
    Deno.exit(1);
  }

  await runDay(year, day);
}

// Run the program
if (import.meta.main) {
  main();
}
