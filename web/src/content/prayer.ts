/** Calculation settings, separate from mosque location and Iqamah data.
 * Method documentation: https://github.com/batoulapps/adhan-js/blob/develop/METHODS.md
 * Lagos city reference: GeoNames 2332453, 6.454066 N / 3.394673 E
 * https://www.geonames.org/advanced-search.html?country=NG&q=
 * These city coordinates are NOT the mosque's location or an entrance pin.
 */
export const prayerCalculationConfig = {
  city: "Lagos, Nigeria",
  timezone: "Africa/Lagos",
  cityCoordinates: { latitude: 6.454066, longitude: 3.394673 },
  method: "MuslimWorldLeague" as "MuslimWorldLeague" | "Egyptian" | "Karachi" | "MoonsightingCommittee",
  asr: "standard" as "standard" | "hanafi",
  adjustments: { fajr: 0, sunrise: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 },
} as const;

export type PrayerSlot = {
  key: "fajr" | "sunrise" | "dhuhr" | "asr" | "maghrib" | "isha";
  name: string;
  arabic: string;
  time: string; // HH:MM in Africa/Lagos
  at: number; // UTC instant for accurate countdowns and date rollover
  isPrayer: boolean;
};
export const prayerLabels = [
  { key: "fajr", name: "Fajr", arabic: "الفجر", isPrayer: true },
  { key: "sunrise", name: "Sunrise", arabic: "الشروق", isPrayer: false },
  { key: "dhuhr", name: "Dhuhr", arabic: "الظهر", isPrayer: true },
  { key: "asr", name: "Asr", arabic: "العصر", isPrayer: true },
  { key: "maghrib", name: "Maghrib", arabic: "المغرب", isPrayer: true },
  { key: "isha", name: "Isha", arabic: "العشاء", isPrayer: true },
] as const;
export const calculationMethodNames = {
  MuslimWorldLeague: "Muslim World League", Egyptian: "Egyptian General Authority of Survey",
  Karachi: "University of Islamic Sciences, Karachi", MoonsightingCommittee: "Moonsighting Committee",
} as const;
