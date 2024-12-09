import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { day16 as solution } from "./index.ts";

const sampleInput = `your
sample
input`;

const expected = {
  part1: "expected result 1",
  part2: "expected result 2",
};

Deno.test("Day 16", async (t) => {
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
