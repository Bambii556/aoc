// src/utils/index.ts

// Re-export all utilities with categorized namespaces
import {
  getInputGroups,
  getInputLines,
  parseBinaryGrid,
  parseCoordinates,
  parseGrid,
  parseInstructions,
  parseKeyValue,
  parseNumberGrid,
  parseRanges,
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

import {
  average,
  clamp,
  getDifference,
  getPercentageDifference,
  getSignedDifference,
  isBetween,
  isInRange,
  median,
  roundToNearest,
  scale,
} from "./numbers.ts";

// Also export everything directly for those who prefer destructuring
export {
  aStar,
  average,
  bfs,
  binarySearchAnswer,
  binaryToDecimal,
  chunks,
  clamp,
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
  getPercentageDifference,
  getPermutations,
  getPrimeFactors,
  getSignedDifference,
  getTopN,
  hasIntersection,
  isBetween,
  isInBounds,
  isInRange,
  isPrime,
  lcm,
  lcmArray,
  Log,
  manhattanDistance,
  median,
  memoize,
  mergeRanges,
  minMax,
  mode,
  pairs,
  parseBinaryGrid,
  parseCoordinates,
  parseGrid,
  parseInstructions,
  parseKeyValue,
  parseNumberGrid,
  parseRanges,
  pointToString,
  product,
  quickSort,
  range,
  rangesOverlap,
  removeAtIndex,
  removeAtIndexInPlace,
  rotateGrid,
  roundToNearest,
  scale,
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
