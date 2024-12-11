import { Solution } from "./types.ts";

// Type for yearly solutions
export interface YearSolutions {
  [day: number]: Solution;
}

// Type for all solutions across years
export interface Solutions {
  [year: number]: YearSolutions;
}

async function loadYear(year: number): Promise<YearSolutions> {
  const solutions: YearSolutions = {};

  // Try to load days 1-25 for the given year
  for (let day = 1; day <= 25; day++) {
    try {
      const module = await import(`./${year}/day${day}/index.ts`);
      if (module.default || module[`day${day}`]) {
        solutions[day] = module.default || module[`day${day}`];
      }
    } catch (_error) {
      // Skip if the day's module hasn't been created yet
      continue;
    }
  }

  return solutions;
}

export async function loadAllSolutions(): Promise<Solutions> {
  const years = [2023, 2024]; // Add more years as needed
  const solutions: Solutions = {};

  for (const year of years) {
    try {
      solutions[year] = await loadYear(year);
    } catch (error) {
      console.error(`Failed to load solutions for year ${year}:`, error);
    }
  }

  return solutions;
}
