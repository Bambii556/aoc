import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { day9 as solution } from "./index.ts";

const sampleInput = `2333133121414131402`;

const expected = {
  part1: 1928,
  part2: 2858,
};

Deno.test("Day 9", async (t) => {
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
