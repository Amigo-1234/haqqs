import type { ReactNode } from "react";

/** Gentle fade between pages. Disabled automatically for reduced motion. */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
