import { getInputLines } from "../../utils/index.ts";
import { Solution } from "../../types.ts";
import { sum } from "../../utils/array.ts";

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

    const cubes = new Map<string, number>();
    cubes.set("red", 12);
    cubes.set("green", 13);
    cubes.set("blue", 14);

    const ids: number[] = [];

    for (const game of games) {
      let isValidGame = true;
      for (const { color, count } of game.sets) {
        if (count > (cubes.get(color) as number)) {
          isValidGame = false;
          break;
        }
      }
      if (isValidGame) {
        ids.push(game.id);
      }
    }

    return sum(ids);
  },

  part2: async (input: string) => {
    const games = parseGames(input);

    return 0;
  },
};

function parseGames(input: string): Game[] {
  const lines = getInputLines(input);
  // need to parse this 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'

  return lines.map((line) => {
    const [id, cubes] = line.split(":");

    return {
      id: Number(id.replace("Game ", "")),
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
