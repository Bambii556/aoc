import { Solution } from "../types.ts";
import { day1 } from "./day1/index.ts";
import { day2 } from "./day2/index.ts";
import { day3 } from "./day3/index.ts";
import { day4 } from "./day4/index.ts";
import { day5 } from "./day5/index.ts";
import { day6 } from "./day6/index.ts";
import { day7 } from "./day7/index.ts";
import { day8 } from "./day8/index.ts";

export const days: Record<number, Solution> = {
  1: day1,
  2: day2,
  3: day3,
  4: day4,
  5: day5,
  6: day6,
  7: day7,
  8: day8,
};
