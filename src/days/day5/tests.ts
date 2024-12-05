import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { day5 as solution } from "./index.ts";

const sampleInput = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

const expected = {
  part1: 143,
  part2: 123,
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
