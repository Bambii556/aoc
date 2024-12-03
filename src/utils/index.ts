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
  countingSort,
  countOccurrences,
  create2DArray,
  findAllMatches,
  findNumbers,
  getFrequencyMap,
  getOverlappingPairs,
  getTopN,
  hasIntersection,
  minMax,
  pairs,
  product,
  quickSort,
  removeAtIndex,
  removeAtIndexInPlace,
  sequence,
  sortNumbers,
  sortUnique,
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

import { getDifference, getSignedDifference } from "./nums.ts";

export const log = { Log };

export const nums = {
  getDifference,
  getSignedDifference,
};

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
  countingSort,
  getTopN,
  quickSort,
  sortNumbers,
  sortUnique,
  chunks,
  combinations,
  hasIntersection,
  minMax,
  pairs,
  sequence,
  getOverlappingPairs,
  removeAtIndex,
  removeAtIndexInPlace,
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
  chunks,
  combinations,
  countingSort,
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
  getDifference,
  getFrequencyMap,
  getInputGroups,
  getInputLines,
  getOverlappingPairs,
  getPermutations,
  getPrimeFactors,
  getSignedDifference,
  getTopN,
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
  quickSort,
  range,
  rangesOverlap,
  removeAtIndex,
  removeAtIndexInPlace,
  sequence,
  setDifference,
  setIntersection,
  setUnion,
  sortNumbers,
  sortUnique,
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
