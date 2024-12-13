import {
  createRange,
  FastQ,
  findCommonNumbers,
  findNumbers,
  getInputLines,
  memoize,
  sum,
} from "../../utils/index.ts";
import { Solution } from "../../types.ts";

type Card = {
  id: number;
  winning: number[];
  numbers: number[];
};

export const day4: Solution = {
  part1: async (input: string) => {
    const cards = parseCards(input);
    const cardPoints: number[] = [];

    for (const card of cards) {
      const common = findCommonNumbers(card.winning, card.numbers);
      if (common.length <= 0) {
        continue;
      }
      cardPoints.push(Math.pow(2, common.length - 1));
    }

    return sum(cardPoints);
  },

  part2: async (input: string) => {
    const cards = parseCards(input);
    const lookup = new Map<number, Card>();
    cards.forEach((card) => lookup.set(card.id, card));

    const cardsToProcess = FastQ.fromArray(cards);
    let winningCardCount = 0;
    do {
      winningCardCount++;
      const card = cardsToProcess.popFront()!;

      const winningCount = findWinningCount(card.winning, card.numbers);
      if (winningCount <= 0) continue;

      const ids = createRange(card.id + winningCount, card.id + 1);

      ids.forEach((id) => {
        const card = lookup.get(id);
        if (card) {
          cardsToProcess.addFront(card);
        }
      });
    } while (!cardsToProcess.isEmpty());

    return winningCardCount;
  },
};

function parseCards(input: string): Card[] {
  const cards = getInputLines(input).map((line) => {
    const [card, numbers] = line.split(":");
    const numberParts = numbers.split("|");

    return {
      id: findNumbers(card)[0],
      winning: findNumbers(numberParts[0]),
      numbers: findNumbers(numberParts[1]),
    } as Card;
  }) as Card[];

  return cards;
}

const findWinningCount = memoize(
  (winings: number[], numbers: number[]): number => {
    const common = findCommonNumbers(winings, numbers);
    return common.length;
  },
);
