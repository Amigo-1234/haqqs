/** Address confirmed by the owner on 2026-10-14. No mosque coordinates or pin. */
export type VerifiedLocation = {
  streetAddress: string; addressLocality: string; addressRegion: string; addressCountry: "NG";
  mapsUrl: string | null; confirmedBy: string; confirmedOn: string;
};
export const verifiedLocation: VerifiedLocation = {
  streetAddress: "41 Olaniyi Street, off Bioyin Street, Ike Oluwa Town, Jankara",
  addressLocality: "Ijaye-Ojokoro", addressRegion: "Lagos State", addressCountry: "NG",
  mapsUrl: null, confirmedBy: "Website owner", confirmedOn: "2026-10-14",
};
