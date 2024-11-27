// src/utils/index.ts

// Re-export all utilities with categorized namespaces
import {
  getInputGroups,
  getInputLines,
  parseGrid,
  parseNumberGrid,
} from "./input.ts";

import { gcd, getPermutations, lcm, lcmArray } from "./math.ts";

import {
  getAdjacent,
  getAdjacentWithDiagonals,
  isInBounds,
  manhattanDistance,
  pointToString,
  stringToPoint,
} from "./grid.ts";

import {
  countOccurrences,
  findNumbers,
  getFrequencyMap,
  product,
  sum,
} from "./array.ts";

import { aStar, bfs, dijkstra } from "./pathfinding.ts";

import { setDifference, setIntersection, setUnion } from "./sets.ts";

import { mergeRanges, range, rangesOverlap } from "./ranges.ts";

import { getPrimeFactors, isPrime } from "./number-theory.ts";

import { memoize } from "./memoize.ts";

import { Log } from "./logger.ts";

export const log = { Log };

// Export everything grouped by category
export const input = {
  getInputLines,
  getInputGroups,
  parseGrid,
  parseNumberGrid,
};

export const math = {
  gcd,
  lcm,
  lcmArray,
  getPermutations,
  isPrime,
  getPrimeFactors,
};

export const grid = {
  getAdjacent,
  getAdjacentWithDiagonals,
  isInBounds,
  pointToString,
  stringToPoint,
  manhattanDistance,
};

export const array = {
  countOccurrences,
  sum,
  product,
  findNumbers,
  getFrequencyMap,
};

export const pathfinding = {
  dijkstra,
  bfs,
  aStar,
};

export const sets = {
  intersection: setIntersection,
  union: setUnion,
  difference: setDifference,
};

export const ranges = {
  create: range,
  overlap: rangesOverlap,
  merge: mergeRanges,
};

// Also export everything directly for those who prefer destructuring
export {
  aStar,
  bfs,
  countOccurrences,
  dijkstra,
  findNumbers,
  gcd,
  getAdjacent,
  getAdjacentWithDiagonals,
  getFrequencyMap,
  getInputGroups,
  getInputLines,
  getPermutations,
  getPrimeFactors,
  isInBounds,
  isPrime,
  lcm,
  lcmArray,
  Log,
  manhattanDistance,
  memoize,
  mergeRanges,
  parseGrid,
  parseNumberGrid,
  pointToString,
  product,
  range,
  rangesOverlap,
  setDifference,
  setIntersection,
  setUnion,
  stringToPoint,
  sum,
};

// Export commonly used types
export type Point = [number, number];
export type Grid<T> = T[][];
export type NumberGrid = Grid<number>;
export type StringGrid = Grid<string>;
