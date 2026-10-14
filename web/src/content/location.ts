/** No house number, pin or Maps listing is published until society confirmation. */
export type VerifiedLocation = {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  addressCountry: "NG";
  mapsUrl: string;
  confirmedBy: string;
  confirmedOn: string; // ISO date; retain evidence in docs/CONTENT-STATUS.md
};
export const verifiedLocation: VerifiedLocation | null = null;
