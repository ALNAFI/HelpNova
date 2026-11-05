export type HistoricalPoint = {
  label: string;
  /** Full date label for tooltips and accessible listings. */
  date: string;
  volume: number;
};

/** Fixed demo dataset — not live history and not affected by workspace actions. */
export const historicalSample7d: HistoricalPoint[] = [
  { label: "Mon", date: "Mon, Mar 16, 2026", volume: 18 },
  { label: "Tue", date: "Tue, Mar 17, 2026", volume: 22 },
  { label: "Wed", date: "Wed, Mar 18, 2026", volume: 19 },
  { label: "Thu", date: "Thu, Mar 19, 2026", volume: 27 },
  { label: "Fri", date: "Fri, Mar 20, 2026", volume: 24 },
  { label: "Sat", date: "Sat, Mar 21, 2026", volume: 14 },
  { label: "Sun", date: "Sun, Mar 22, 2026", volume: 16 },
];

export const historicalSample30d: HistoricalPoint[] = [
  { label: "Feb 16", date: "Week of Feb 16, 2026", volume: 96 },
  { label: "Feb 23", date: "Week of Feb 23, 2026", volume: 112 },
  { label: "Mar 2", date: "Week of Mar 2, 2026", volume: 104 },
  { label: "Mar 9", date: "Week of Mar 9, 2026", volume: 128 },
  { label: "Mar 16", date: "Week of Mar 16, 2026", volume: 118 },
];

export function getHistoricalSample(range: 7 | 30): HistoricalPoint[] {
  return range === 7 ? historicalSample7d : historicalSample30d;
}
