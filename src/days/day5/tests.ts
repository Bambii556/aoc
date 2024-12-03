import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { day5 as solution } from "./index.ts";

const sampleInput = `your
sample
input`;

const expected = {
  part1: "expected result 1",
  part2: "expected result 2",
};

Deno.test("Day 5", async (t) => {
  await t.step("sample data", async (t) => {
    await t.step("part 1", async () => {
      const result = await solution.part1(sampleInput);
      assertEquals(result, expected.part1);
    });

    await t.step("part 2", async () => {
      const result = await solution.part2(sampleInput);
      assertEquals(result, expected.part2);
    });
  });

  await t.step("puzzle input", async (t) => {
    const input = await Deno.readTextFile("src/days/day1/input.txt");

    await t.step("part 1", async () => {
      const result = await solution.part1(input);
      assertEquals(result, "puzzle answer 1"); // Update after solving
    });

    await t.step("part 2", async () => {
      const result = await solution.part2(input);
      assertEquals(result, "puzzle answer 2"); // Update after solving
    });
  });
});
