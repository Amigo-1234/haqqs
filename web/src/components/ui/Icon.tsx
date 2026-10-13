import type { SVGProps } from "react";

const paths = {
  menu: "M4 7h16M4 12h16M4 17h10",
  close: "M6 6l12 12M18 6L6 18",
  arrowRight: "M5 12h14M13 6l6 6-6 6",
  external: "M7 17L17 7M9 7h8v8",
  chevronLeft: "M15 6l-6 6 6 6",
  chevronRight: "M9 6l6 6-6 6",
  copy: "M9 9h10v10H9zM5 15V5h10",
  check: "M5 12.5l4.5 4.5L19 7.5",
  pin: "M12 21s-7-6.2-7-11.5A7 7 0 0119 9.5C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
  phone:
    "M5 4h3.5l1.5 4.5-2 1.5a12 12 0 006 6l1.5-2 4.5 1.5V19a1.5 1.5 0 01-1.5 1.5A16.5 16.5 0 013.5 5.5 1.5 1.5 0 015 4z",
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  expand: "M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5",
  book: "M4 5.5A1.5 1.5 0 015.5 4H11v15H5.5A1.5 1.5 0 004 20.5zM20 5.5A1.5 1.5 0 0018.5 4H13v15h5.5a1.5 1.5 0 011.5 1.5z",
  calendar: "M4 6h16v14H4zM4 10h16M9 3v4M15 3v4",
  image: "M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4M15.5 9.5h.01",
  moon: "M20 14.5A8 8 0 019.5 4 8 8 0 1020 14.5z",
  clock: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3 2",
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, className = "size-5", ...props }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      <path d={paths[name]} />
    </svg>
  );
}
