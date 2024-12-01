import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { day1 as solution } from "./index.ts";

const sampleInput = `3   4
4   3
2   5
1   3
3   9
3   3`;

const expected = {
  part1: 11,
  part2: 31,
};

Deno.test("Day 1", async (t) => {
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
