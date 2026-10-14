export type NavItem = { href: string; label: string; arabic?: string };

/** Primary navigation: kept short so the header never feels crowded. */
export const primaryNav: NavItem[] = [
  { href: "/about", label: "About" },
  { href: "/founder", label: "Our Founder" },
  { href: "/prayer-times", label: "Prayer Times" },
  { href: "/activities", label: "Activities" },
  { href: "/library", label: "Library" },
  { href: "/markaz", label: "Markazul Ginaa" },
];

/** Everything, for the mobile menu and footer. */
export const fullNav: NavItem[] = [
  ...primaryNav,
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/donate", label: "Donate" },
  { href: "/contact", label: "Contact" },
];
