// src/utils/index.ts

// Re-export all utilities with categorized namespaces
import {
  getInputGroups,
  getInputLines,
  parseGrid,
  parseNumberGrid,
} from "./input.ts";

import {
  binaryToDecimal,
  gcd,
  getPermutations,
  lcm,
  lcmArray,
  mode,
} from "./math.ts";

import {
  getAdjacent,
  getAdjacentWithDiagonals,
  isInBounds,
  manhattanDistance,
  pointToString,
  rotateGrid,
  stringToPoint,
} from "./grid.ts";

import {
  chunks,
  combinations,
  count,
  countOccurrences,
  create2DArray,
  findAllMatches,
  findNumbers,
  getFrequencyMap,
  hasIntersection,
  minMax,
  pairs,
  product,
  sequence,
  sum,
  transpose,
  unique,
  windows,
  zip,
} from "./array.ts";

import { binarySearchAnswer, deepClone, getAllSubstrings } from "./utils.ts";

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
  binaryToDecimal,
  mode,
};

export const grid = {
  getAdjacent,
  getAdjacentWithDiagonals,
  isInBounds,
  pointToString,
  stringToPoint,
  manhattanDistance,
  rotateGrid,
};

export const array = {
  countOccurrences,
  sum,
  product,
  findNumbers,
  getFrequencyMap,
  combinations,
  windows,
  findAllMatches,
  create2DArray,
  hasIntersection,
  chunks,
  unique,
  zip,
  pairs,
  transpose,
  count,
  sequence,
  minMax,
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

export const utils = {
  deepClone,
  getAllSubstrings,
  binarySearchAnswer,
};

// Also export everything directly for those who prefer destructuring
export {
  aStar,
  bfs,
  binarySearchAnswer,
  binaryToDecimal,
  chunks,
  combinations,
  count,
  countOccurrences,
  create2DArray,
  deepClone,
  dijkstra,
  findAllMatches,
  findNumbers,
  gcd,
  getAdjacent,
  getAdjacentWithDiagonals,
  getAllSubstrings,
  getFrequencyMap,
  getInputGroups,
  getInputLines,
  getPermutations,
  getPrimeFactors,
  hasIntersection,
  isInBounds,
  isPrime,
  lcm,
  lcmArray,
  Log,
  manhattanDistance,
  memoize,
  mergeRanges,
  minMax,
  mode,
  pairs,
  parseGrid,
  parseNumberGrid,
  pointToString,
  product,
  range,
  rangesOverlap,
  sequence,
  setDifference,
  setIntersection,
  setUnion,
  stringToPoint,
  sum,
  transpose,
  unique,
  windows,
  zip,
};

// Export commonly used types
export type Point = [number, number];
export type Grid<T> = T[][];
export type NumberGrid = Grid<number>;
export type StringGrid = Grid<string>;
