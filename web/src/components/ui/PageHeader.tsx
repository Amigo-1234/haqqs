import type { ReactNode } from "react";
import { GirihPattern } from "./GirihPattern";
import { Eyebrow } from "./primitives";

export function PageHeader({
  eyebrow,
  title,
  arabic,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  arabic?: string;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-emerald-950 text-ivory">
      <GirihPattern className="text-gold opacity-[0.07]" />
      <div aria-hidden="true" className="absolute -right-40 -top-56 size-[36rem] rounded-full bg-emerald-700/25 blur-3xl" />
      {/* arch silhouette on the right, echoing the emblem */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute -bottom-px right-[6%] hidden h-[115%] w-72 text-gold-light/15 lg:block"
      >
        <path d="M0.5 100V34C0.5 16.4 22.2 5.5 50 0.5c27.8 5 49.5 15.9 49.5 33.5V100" fill="none" stroke="currentColor" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="container-page relative pb-16 pt-12 md:pb-24 md:pt-20">
        <Eyebrow tone="dark">{eyebrow}</Eyebrow>
        {arabic && (
          <p lang="ar" dir="rtl" className="mt-6 text-left text-4xl leading-tight text-gold-light md:text-5xl">
            {arabic}
          </p>
        )}
        <h1 className="mt-3 max-w-4xl text-[2.6rem] font-normal leading-[1.05] md:text-6xl">{title}</h1>
        {intro && <div className="mt-6 max-w-2xl text-lg leading-relaxed text-ivory/75 md:text-xl">{intro}</div>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
