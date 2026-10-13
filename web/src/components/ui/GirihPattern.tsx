import { useId } from "react";

/**
 * An eight-fold star lattice (khatam), drawn as fine line work. Purely
 * decorative; it does not depict the society or any real building.
 */
export function GirihPattern({ className = "", tile = 88 }: { className?: string; tile?: number }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg aria-hidden="true" focusable="false" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}>
      <defs>
        <pattern id={`girih-${id}`} width={tile} height={tile} patternUnits="userSpaceOnUse" viewBox="0 0 80 80">
          <g fill="none" stroke="currentColor" strokeWidth="0.7">
            {/* eight-pointed star: two interlaced squares */}
            <path d="M24 24h32v32H24z" />
            <path d="M40 17.4L62.6 40 40 62.6 17.4 40z" />
            {/* links to neighbouring stars */}
            <path d="M40 0v17.4M40 62.6V80M0 40h17.4M62.6 40H80" />
            {/* corner rosettes shared between tiles */}
            <path d="M0 8L8 0M72 0l8 8M80 72l-8 8M8 80L0 72" />
            <circle cx="40" cy="40" r="6" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#girih-${id})`} />
    </svg>
  );
}
