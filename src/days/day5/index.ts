import { Log, sum } from "../../utils/index.ts";
import { Solution } from "../../types.ts";

type Rule = [number, number]; // [before, after]
type Update = number[];

export const day5: Solution = {
  part1: async (input: string) => {
    const { rules, updates } = parseInput(input);

    const validUpdates = getValidUpdates(rules, updates);
    const sumMiddle = getMiddles(validUpdates);

    return sumMiddle;
  },

  part2: async (input: string) => {
    const { rules, updates } = parseInput(input);

    const invalidUpdates = getInvalidUpdates(rules, updates);

    const reorderedUpdates = await Log.logWithTimer(
      "Reordering updates",
      () => reorderUpdates(invalidUpdates, rules),
    );
    // const reorderedUpdates = reorderUpdates(invalidUpdates, rules);
    const sumMiddle = getMiddles(reorderedUpdates);

    return sumMiddle;
  },
};

function parseInput(input: string): { rules: Rule[]; updates: Update[] } {
  const [rulesStr, updatesStr] = input.trim().split("\n\n");

  const rules = rulesStr.split("\n")
    .map((line) =>
      line.split("|")
        .map(Number) as Rule
    );

  const updates = updatesStr.split("\n")
    .map((line) =>
      line.split(",")
        .map(Number)
    );

  return { rules, updates };
}

function getValidUpdates(rules: Rule[], updates: Update[]): Update[] {
  const validUpdates: Update[] = updates.filter((update) => {
    return isValidUpdate(update, rules);
  });
  return validUpdates;
}

function getInvalidUpdates(rules: Rule[], updates: Update[]): Update[] {
  const invalidUpdates: Update[] = updates.filter((update) => {
    return !isValidUpdate(update, rules);
  });
  return invalidUpdates;
}

function isValidUpdate(update: Update, rules: Rule[]): boolean {
  return rules.every(([before, after]) => {
    if (update.includes(before) && update.includes(after)) {
      return update.indexOf(before) < update.indexOf(after);
    }
    return true;
  });
}

function getMiddles(updates: Update[]) {
  return sum(updates.map((update) => update[Math.floor(update.length / 2)]));
}

function reorderUpdates(updates: Update[], rules: Rule[]): Update[] {
  return updates.map((update) => {
    const appliedRules = rules.filter(([before, after]) =>
      update.includes(before) && update.includes(after)
    );

    const newUpdate: Update = [...update];
    do {
      const failed = getFailedRules(appliedRules, newUpdate);
      if (failed.length === 0) {
        break;
      }
      failed.forEach(([before, after]) => {
        const beforeIndex = newUpdate.indexOf(before);
        const afterIndex = newUpdate.indexOf(after);

        newUpdate.splice(afterIndex, 1);
        newUpdate.splice(beforeIndex + 1, 0, after);
      });
    } while (!isValidUpdate(newUpdate, appliedRules));

    return newUpdate;
  });
}

function getFailedRules(
  rules: Rule[],
  update: Update,
): Rule[] {
  const failedRules = rules.filter(([before, after]) =>
    update.indexOf(before) > update.indexOf(after)
  );

  return failedRules;
}
