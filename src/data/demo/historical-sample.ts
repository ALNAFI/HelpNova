export type HistoricalPoint = {
  label: string;
  volume: number;
};

export const historicalSample7d: HistoricalPoint[] = [
  { label: "Mon", volume: 18 },
  { label: "Tue", volume: 22 },
  { label: "Wed", volume: 19 },
  { label: "Thu", volume: 27 },
  { label: "Fri", volume: 24 },
  { label: "Sat", volume: 14 },
  { label: "Sun", volume: 16 },
];

export const historicalSample30d: HistoricalPoint[] = [
  { label: "W1", volume: 96 },
  { label: "W2", volume: 112 },
  { label: "W3", volume: 104 },
  { label: "W4", volume: 128 },
  { label: "W5", volume: 118 },
];

export function getHistoricalSample(range: 7 | 30): HistoricalPoint[] {
  return range === 7 ? historicalSample7d : historicalSample30d;
}
