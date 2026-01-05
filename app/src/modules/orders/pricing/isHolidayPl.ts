// src/modules/orders/pricing/isHolidayPL.ts
export const polishHolidays2026 = [
  "2026-01-01",
  "2026-01-06",
  "2026-04-05",
  "2026-04-06",
  "2026-05-01",
  "2026-05-03",
  "2026-05-24",
  "2026-06-04",
  "2026-08-15",
  "2026-11-01",
  "2026-11-11",
  "2026-12-25",
];

export function isHolidayPL(date: Date): boolean {
  const iso = date.toISOString().slice(0, 10);
  return polishHolidays2026.includes(iso);
}
