/**
 * Organisation facts for HAQSLAM V2.
 *
 * Every value here comes from a source the society produced: the official 2023
 * and 2026 event flyers, published book covers, or the previous website. Items
 * still awaiting confirmation are flagged and listed in docs/CONTENT-STATUS.md.
 */

export const site = {
  shortName: "HAQSLAM",
  name: "Haqiqat-s-Salam Society of Nigeria",
  // As printed on the Kitab al-Adhkar cover ("لجمعية حقيقة السلام").
  arabicName: "جمعية حقيقة السلام",
  arabicShort: "حقيقة السلام",
  basmala: "بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
  motto: {
    arabic: "لا إله إلا الله",
    transliteration: "Laa ilaha illallah",
    english: "There is no deity worthy of worship except Allah",
  },
  description:
    "Haqiqat-s-Salam Society of Nigeria (HAQSLAM) is an Islamic society in Ijaye-Ojokoro, Lagos, devoted to worship, remembrance and learning under the motto Laa ilaha illallah.",
} as const;

export const contact = {
  // From the previous website; not yet re-confirmed by the society.
  phone: { display: "+234 708 893 4875", href: "tel:+2347088934875" },
  email: { display: "haqslam1@gmail.com", href: "mailto:haqslam1@gmail.com" },
  secretariat: {
    label: "National Secretariat",
    // Both official flyers agree on the street; the house number differs
    // between the flyers (40) and the previous website (41), so it is withheld.
    lines: ["Olaniyi Street, off Bioyin Street", "Ike Oluwa Town, Jankara", "Ijaye-Ojokoro, Lagos State"],
    houseNumberPending: true,
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Olaniyi+Street+Jankara+Ijaye+Ojokoro+Lagos",
  },
  branch: {
    label: "Branch",
    // Bus stop spelling differs between flyers (Adesoro / Adesara), so it is omitted.
    lines: ["Alhaji Jimoh Adekunle Street", "Adiyan, Ogun State"],
  },
} as const;

export const donation = {
  // From the previous website's donation page.
  bank: "First City Monument Bank (FCMB)",
  accountName: "HAQIQAT-S-SALAM SOCIETY OF NIGERIA",
  accountNumber: "7533648010",
} as const;

export const partners = {
  markaz: {
    name: "Markazul Ginaa",
    // As printed on the 2026 Maolid flyer.
    fullName: "Markazu-l-Ginaa Litaaleemideeni Wa Dunaa",
    arabic: "مركز الغنى",
    motto: { english: "Knowledge is Wealth", arabic: "العلم غنى" },
    logo: "/brand/markaz-ginaa-logo-reference.png",
    // Markaz runs its own separate platform. Its public URL has not been
    // confirmed, so no link is published until it is (no shared auth or data).
    url: null as string | null,
  },
  muassasat: {
    // As printed on the 2026 Maolid flyer.
    name: "Muassasat Nasrul Ilm Wa Da'awat",
    division: "Ojokoro Division 1",
  },
} as const;
