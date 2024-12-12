import { getInputLines } from "../../utils/index.ts";
import { Solution } from "../../types.ts";
import { sum } from "../../utils/array.ts";

type Game = {
  id: number;
  sets: Set[];
};

type Set = Cube[];

type Cube = {
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
      for (const set of game.sets) {
        const combinedCubes = combineCubes(set);

        for (const { color, count } of combinedCubes) {
          if (count > (cubes.get(color) as number)) {
            isValidGame = false;
            break;
          }
        }
        if (!isValidGame) {
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

    const cubes = new Map<string, number>();
    cubes.set("red", 12);
    cubes.set("green", 13);
    cubes.set("blue", 14);

    const results: number[] = [];

    for (const game of games) {
      const cubeCounts = new Map<string, number>();
      for (const set of game.sets) {
        const combinedCubes = combineCubes(set);

        for (const { color, count } of combinedCubes) {
          const currentCount = cubeCounts.get(color) || 0;
          cubeCounts.set(color, count > currentCount ? count : currentCount);
        }
      }
      if (cubeCounts.size > 0) {
        results.push(Array.from(cubeCounts.values()).reduce((a, b) => a * b));
      }
    }

    return sum(results);
  },
};

function parseGames(input: string) {
  const lines = getInputLines(input);

  const result = lines.map((line) => {
    const [id, cubes] = line.split(":");
    const sets = cubes.split(";").map((cubeSet) => {
      return cubeSet.split(",").map((set) => {
        // split on space and remove spaces
        const [count, color] = set.split(" ").filter(Boolean);
        return {
          count: Number(count),
          color: color as "blue" | "red" | "green",
        } as Cube;
      }) as Set;
    });

    return {
      id: Number(id.split(" ")[1]),
      sets,
    } as Game;
  });

  return result;
}

function combineCubes(set: Set): Cube[] {
  const result = new Map<string, number>();
  for (const cube of set) {
    result.set(cube.color, (result.get(cube.color) || 0) + cube.count);
  }
  return Array.from(result.entries()).map(([color, count]) => ({
    count,
    color,
  })) as Cube[];
}
