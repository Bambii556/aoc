import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { day2 as solution } from "./index.ts";

const sampleInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

const expected = {
  part1: 2,
  part2: 4,
};

Deno.test("Day 2", async (t) => {
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

  // await t.step("puzzle input", async (t) => {
  //   const input = await Deno.readTextFile("src/days/day1/input.txt");

  //   await t.step("part 1", async () => {
  //     const result = await solution.part1(input);
  //     assertEquals(result, "puzzle answer 1"); // Update after solving
  //   });

  //   await t.step("part 2", async () => {
  //     const result = await solution.part2(input);
  //     assertEquals(result, "puzzle answer 2"); // Update after solving
  //   });
  // });
});
