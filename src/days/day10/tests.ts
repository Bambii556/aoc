import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { day10 as solution } from "./index.ts";

const sampleInput = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;

const expected = {
  part1: 36,
  part2: 81,
};

Deno.test("Day 10", async (t) => {
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
});
