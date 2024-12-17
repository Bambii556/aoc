import { getInputLines } from "../../utils/index.ts";
import { Solution } from "../../types.ts";
import { sum } from "../../utils/array.ts";

type Card =
  | "A"
  | "K"
  | "Q"
  | "J"
  | "T"
  | "9"
  | "8"
  | "7"
  | "6"
  | "5"
  | "4"
  | "3"
  | "2";

type Hand = {
  id: number;
  cards: Card[];
  bid: number;
  score: number;
};

type HandType =
  | "Five of a kind"
  | "Four of a kind"
  | "Full house"
  | "Three of a kind"
  | "Two pair"
  | "One pair"
  | "High card";

const cardScores = new Map<Card, number>([
  ["A", 14],
  ["K", 13],
  ["Q", 12],
  ["J", 11],
  ["T", 10],
  ["9", 9],
  ["8", 8],
  ["7", 7],
  ["6", 6],
  ["5", 5],
  ["4", 4],
  ["3", 3],
  ["2", 2],
]);
const handTypeScores = new Map<HandType, number>([
  ["Five of a kind", 6],
  ["Four of a kind", 5],
  ["Full house", 4],
  ["Three of a kind", 3],
  ["Two pair", 2],
  ["One pair", 1],
  ["High card", 0],
]);

export const day7: Solution = {
  part1: async (input: string) => {
    const hands = parseInput(input);

    hands.forEach((hand) => {
      hand.score = getHandScore(hand);
    });

    const sorted = sortHands(hands);

    return sum(sorted.map((h, i) => h.bid * (i + 1)));
  },

  part2: async (input: string) => {
    const hands = parseInput(input);

    cardScores.set("J", 1);

    hands.forEach((hand) => {
      hand.score = getHandScore(hand, true);
    });

    const sorted = sortHands(hands);

    return sum(sorted.map((h, i) => h.bid * (i + 1)));
  },
};

function sortHands(hands: Hand[]): Hand[] {
  return hands.sort((a, b) => {
    if (a.score !== b.score) {
      return a.score - b.score; // low to high
    }

    for (let i = 0; i < 5; i++) {
      const cardA = cardScores.get(a.cards[i])!;
      const cardB = cardScores.get(b.cards[i])!;
      if (cardA !== cardB) {
        return cardA - cardB;
      }
    }

    return 0; // Hands are identical ???
  });
}

function parseInput(input: string) {
  return getInputLines(input).map((line) => line.split(" ")).map(
    (values, index) => {
      return {
        id: index,
        cards: values[0].split("").map((card) => card as Card),
        bid: Number(values[1]),
        score: 0,
      } as Hand;
    },
  );
}

function getHandScore(hand: Hand, jokerRule: boolean = false) {
  const freq = new Map<Card, number>();
  for (const card of hand.cards) {
    freq.set(card, (freq.get(card) || 0) + 1);
  }

  if (jokerRule && freq.has("J")) {
    const jokerCount = freq.get("J") || 0;
    freq.delete("J");

    // all jokers
    if (freq.size === 0) return 7;

    // Add jokers to the highest frequency card to maximize score
    let maxCard = null;
    let maxCount = 0;
    for (const [card, count] of freq) {
      if (count > maxCount) {
        maxCard = card;
        maxCount = count;
      }
    }
    freq.set(maxCard!, maxCount + jokerCount);
  }

  const counts = [...freq.values()].sort((a, b) => b - a);
  const [highest = 0, second = 0] = counts;

  if (highest === 5) return 7; // Five of a kind
  if (highest === 4) return 6; // Four of a kind
  if (highest === 3 && second === 2) return 5; // Full house
  if (highest === 3) return 4; // Three of a kind
  if (highest === 2 && second === 2) return 3; // Two pair
  if (highest === 2) return 2; // One pair
  return 1; // High card
}
