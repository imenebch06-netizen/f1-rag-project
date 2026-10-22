import carsRaw from "@/data/cars.json";

export type SpecKey = "power" | "grip" | "legacy";

export interface CarSpec {
  key: SpecKey;
  value: string;
  text: { fr: string; en: string };
}

export interface CarOfTheDay {
  id: string;
  name: string;
  team: string;
  year: number;
  driver: string;
  tagline: { fr: string; en: string };
  specs: CarSpec[];
  stat: { fr: string; en: string };
  image: {
    remote: string;
    alt: { fr: string; en: string };
    credit: string;
    creditUrl: string;
  };
}

export const CARS = carsRaw as CarOfTheDay[];

/**
 * Daily rotation: deterministic, changes every calendar day.
 * dayOfYear % cars.length — same car for everyone, all day.
 */
export function getCarIndexForDate(date: Date = new Date()): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const dayOfYear = Math.floor(
    (date.getTime() - start.getTime()) / 86_400_000
  );
  return dayOfYear % CARS.length;
}

export function getCarOfTheDay(date: Date = new Date()): {
  car: CarOfTheDay;
  index: number;
} {
  const index = getCarIndexForDate(date);
  return { car: CARS[index], index };
}

/** Cars ordered starting from today's, for the "this week" strip. */
export function getWeekCars(date: Date = new Date()): {
  car: CarOfTheDay;
  index: number;
  isToday: boolean;
}[] {
  const today = getCarIndexForDate(date);
  return CARS.map((car, i) => ({
    car,
    index: (today + i) % CARS.length,
    isToday: i === 0,
  })).map((entry) => ({
    car: CARS[entry.index],
    index: entry.index,
    isToday: entry.isToday,
  }));
}
