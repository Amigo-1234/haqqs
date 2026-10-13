import Image from "next/image";

/**
 * The HAQSLAM emblem.
 *
 * BRAND ASSET STATUS: reference only. This image is extracted from the 2023
 * Maolid flyer (about 135 px tall in the source) and enlarged. It is not a
 * production logo. When the professionally recreated vector arrives, replace
 * EMBLEM_SRC (and its dimensions) here; every usage on the site updates.
 *
 * The extraction keeps a faint white fringe, so the emblem always sits on an
 * ivory plate and never directly on dark colour.
 */
export const EMBLEM_SRC = "/brand/haqslam-emblem-2023-reference.png";
const EMBLEM_W = 454;
const EMBLEM_H = 543;

export function Emblem({
  size = 48,
  className = "",
  priority = false,
}: {
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  const width = Math.round((size * EMBLEM_W) / EMBLEM_H);
  const pad = Math.max(3, Math.round(size * 0.12));
  return (
    <span
      style={{ padding: `${pad}px ${pad + 2}px` }}
      className={`inline-flex shrink-0 items-center justify-center rounded-[40%_40%_12px_12px] bg-ivory shadow-[0_1px_0_rgba(255,255,255,.5)_inset,0_6px_18px_-8px_rgba(0,0,0,.45)] ring-1 ring-gold/40 ${className}`}
    >
      <Image
        src={EMBLEM_SRC}
        alt="HAQSLAM emblem"
        width={width}
        height={size}
        priority={priority}
        sizes={`${width}px`}
        className="block max-w-none"
        style={{ width, height: "auto" }}
      />
    </span>
  );
}
