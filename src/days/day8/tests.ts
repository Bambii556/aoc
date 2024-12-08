import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { day8 as solution } from "./index.ts";

const sampleInput = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;

const expected = {
  part1: 14,
  part2: 34,
};

Deno.test("Day 8", async (t) => {
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
