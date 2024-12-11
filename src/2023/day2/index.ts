import { getInputLines } from "../../utils/index.ts";
import { Solution } from "../../types.ts";

type Game = {
  id: number;
  sets: Cubes[];
};

type Cubes = {
  count: number;
  color: "blue" | "red" | "green";
};

export const day2: Solution = {
  part1: async (input: string) => {
    const games = parseGames(input);

    return 0;
  },

  part2: async (input: string) => {
    const games = parseGames(input);

    return 0;
  },
};

function parseGames(input: string) {
  const lines = getInputLines(input);
  // need to parse this 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'

  return lines.map((line) => {
    const [id, cubes] = line.split(":");

    return {
      id: Number(id),
      sets: cubes.split(" ").map((cube) => {
        const [count, color] = cube.split("");
        return {
          count: Number(count),
          color: color as "blue" | "red" | "green",
        };
      }),
    };
  });
}
