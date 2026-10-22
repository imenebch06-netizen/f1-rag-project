import gpsRaw from "@/data/grands-prix.json";

export interface GrandPrix {
  id: string;
  round: number;
  name: string;
  circuit: string;
  country: { fr: string; en: string };
  date: string; // ISO race-day (Sunday)
}

export const GRANDS_PRIX = gpsRaw as GrandPrix[];

export type GpStatus = "done" | "next" | "upcoming";

export function gpStatus(dateStr: string, now: Date): GpStatus {
  const race = new Date(`${dateStr}T23:59:59`);
  if (race.getTime() < now.getTime()) return "done";
  // "Next" = the closest upcoming race
  const upcoming = GRANDS_PRIX.filter(
    (g) => new Date(`${g.date}T23:59:59`).getTime() >= now.getTime()
  ).sort((a, b) => a.date.localeCompare(b.date));
  return upcoming[0]?.date === dateStr ? "next" : "upcoming";
}
