export interface Solution {
  part1: (input: string) => Promise<string | number>;
  part2: (input: string) => Promise<string | number>;
}
