import { days } from "./days/index.ts";

async function runDay(day: number) {
  console.log(`\n🎄 Day ${day} 🎄`);

  try {
    const solution = days[day];
    if (!solution) {
      console.log(`Solution for day ${day} not found!`);
      return;
    }

    const input = await Deno.readTextFile(`./src/days/day${day}/input.txt`);

    console.log("####################### PART 1 #######################");
    console.time("Part 1");
    const part1 = await solution.part1(input);
    console.timeEnd("Part 1");
    console.log("Part 1 Solution:", part1);

    console.log("####################### PART 2 #######################");
    console.time("Part 2");
    const part2 = await solution.part2(input);
    console.timeEnd("Part 2");
    console.log("Part 2 Solution:", part2);

    console.log("####################### FINISHED #######################");
  } catch (e) {
    console.error(`Error running day ${day}:`, e);
  }
}

async function main() {
  const day = Deno.args[0] ? parseInt(Deno.args[0]) : new Date().getDate();

  if (isNaN(day) || day < 1 || day > 25) {
    console.log("Please provide a valid day (1-25)");
    Deno.exit(1);
  }

  await runDay(day);
}

// Run the program
if (import.meta.main) {
  main();
}
