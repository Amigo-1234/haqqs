import type { ReactNode } from "react";

/**
 * Frames content in a pointed arch, with a fine gold outline offset behind it.
 * The arch shape echoes the arch of the HAQSLAM emblem.
 */
export function ArchFrame({
  children,
  className = "",
  outline = "text-gold/70",
  offset = "translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4",
}: {
  children: ReactNode;
  className?: string;
  outline?: string;
  offset?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className={`absolute inset-0 h-full w-full ${offset} ${outline}`}
      >
        <path
          d="M0.5 99.5V34C0.5 16.4 22.2 5.5 50 0.5c27.8 5 49.5 15.9 49.5 33.5v65.5z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="arch-mask relative h-full w-full overflow-hidden">{children}</div>
    </div>
  );
}
