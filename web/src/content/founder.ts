/**
 * Founder details. Only facts printed on official material or stated on the
 * founder's own public profile are used. No biography has been verified yet.
 */

export const founder = {
  displayName: "Sheikh AbdulGaniyy Olohunkemi Abiodun",
  // As printed on the 2023 and 2026 Maolid flyers.
  formalName: "Fad. Sheikh Alh. Abd. Ganiyy Abiodun Daud Hamzat Olohunkemi",
  // As printed on the cover of Kitab al-Adhkar al-Mukhtarat.
  arabicName: "فضيلة الشيخ الحاج عبد الغني داؤد حمزة أولهنكمي",
  title: "Khalifatu Khulafahi Ojokoro",
  portrait: {
    src: "/photos/founder-portrait.webp",
    width: 950,
    height: 1938,
    alt: "Sheikh AbdulGaniyy Olohunkemi Abiodun, seated, wearing a white robe with gold embroidered trim and a white head wrap",
  },
  roles: [
    {
      role: "Founder of Haqiqat-s-Salam Society of Nigeria",
      source: "Preface to the HAQSLAM Prayer Book, and the founder's public profile",
      href: "/library/haqslam-prayer-book",
    },
    {
      role: "Mudeer (Director) of Markazul Ginaa",
      source: "Founder's public profile",
    },
    {
      role: "Host of the Annual Maolid Nabiyy celebration",
      source: "Official 2023 and 2026 event flyers",
    },
    {
      role: "Compiler of Kitab al-Adhkar al-Mukhtarat",
      source: "Book cover: “al-jamʿ wa al-tartīb”",
      href: "/library/kitab-al-adhkar",
    },
  ],
} as const;
