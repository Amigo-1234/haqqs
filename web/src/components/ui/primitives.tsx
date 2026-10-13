import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

/** Small uppercase label with a gold rule, used above section headings. */
export function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <p
      className={`flex items-center gap-3 text-[0.78rem] font-semibold uppercase tracking-[0.22em] ${
        tone === "dark" ? "text-gold-light" : "text-gold-deep"
      }`}
    >
      <span aria-hidden="true" className={`h-px w-8 ${tone === "dark" ? "bg-gold-light/70" : "bg-gold"}`} />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  arabic,
  intro,
  tone = "light",
  align = "left",
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  arabic?: string;
  intro?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  id?: string;
}) {
  const centered = align === "center";
  return (
    <div className={`max-w-2xl ${centered ? "mx-auto text-center [&>p:first-child]:justify-center" : ""}`}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      {arabic && (
        <p lang="ar" dir="rtl" className={`mt-4 text-2xl ${centered ? "text-center" : "text-left"} ${tone === "dark" ? "text-gold-light" : "text-gold-deep"}`}>
          {arabic}
        </p>
      )}
      <h2
        id={id}
        className={`mt-3 text-[2.1rem] font-medium md:text-5xl ${tone === "dark" ? "text-ivory" : "text-emerald-900"}`}
      >
        {title}
      </h2>
      {intro && (
        <div className={`mt-5 text-lg ${tone === "dark" ? "text-ivory/75" : "text-ink-soft"}`}>{intro}</div>
      )}
    </div>
  );
}

type ButtonVariant = "gold" | "emerald" | "outline-light" | "outline-dark" | "text";

const buttonStyles: Record<ButtonVariant, string> = {
  gold: "bg-gold-light text-emerald-950 hover:bg-[#e7d3a6] shadow-[0_10px_30px_-12px_rgba(220,195,140,.6)]",
  emerald: "bg-emerald-800 text-ivory hover:bg-emerald-700",
  "outline-light": "ring-1 ring-inset ring-ivory/35 text-ivory hover:bg-ivory/10 hover:ring-ivory/60",
  "outline-dark": "ring-1 ring-inset ring-emerald-800/30 text-emerald-900 hover:bg-emerald-900/5 hover:ring-emerald-800/60",
  text: "px-0! text-emerald-800 underline decoration-gold/60 underline-offset-[6px] hover:decoration-gold",
};

export function ButtonLink({
  href,
  children,
  variant = "gold",
  icon = "arrowRight",
  external = false,
  className = "",
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  icon?: IconName | null;
  external?: boolean;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className">) {
  const classes = `group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 text-[0.95rem] font-semibold tracking-wide transition-all duration-300 ${buttonStyles[variant]} ${className}`;
  const iconEl = icon && (
    <Icon
      name={external ? "external" : icon}
      className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
    />
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        {iconEl}
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
      {iconEl}
    </Link>
  );
}

/** A clearly visible notice for demonstration or unverified content. */
export function Notice({
  children,
  tone = "light",
  title = "Awaiting confirmation",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  title?: string;
}) {
  return (
    <div
      role="note"
      className={`flex gap-3 rounded-xl px-4 py-3 text-sm ${
        tone === "dark" ? "bg-ivory/8 text-ivory/80 ring-1 ring-ivory/15" : "bg-parchment text-ink-soft ring-1 ring-sand"
      }`}
    >
      <span
        aria-hidden="true"
        className={`mt-1.5 size-2 shrink-0 rotate-45 ${tone === "dark" ? "bg-gold-light" : "bg-gold"}`}
      />
      <p>
        <strong className={`font-semibold ${tone === "dark" ? "text-gold-light" : "text-gold-deep"}`}>{title}. </strong>
        {children}
      </p>
    </div>
  );
}

/** Tasteful placeholder for photography that has not been supplied yet. */
export function PhotoPlaceholder({
  title,
  note = "Photographs awaiting permission",
  className = "",
}: {
  title: string;
  note?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex flex-col justify-end overflow-hidden rounded-2xl bg-parchment p-5 ring-1 ring-sand ${className}`}
    >
      <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full text-sand">
        <path d="M18 100V52C18 36 31 26 50 20c19 6 32 16 32 32v48" fill="none" stroke="currentColor" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
      </svg>
      <Icon name="image" className="relative mb-3 size-6 text-gold" />
      <p className="relative font-display text-lg text-emerald-900">{title}</p>
      <p className="relative text-sm text-muted">{note}</p>
    </div>
  );
}

/** The honorific ﷺ, set in the Arabic face so it renders as a ligature. */
export function Salawat() {
  return (
    <span lang="ar" className="font-arabic text-[1.15em] leading-none">
      ﷺ
    </span>
  );
}

export function ArabicText({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span lang="ar" dir="rtl" className={className}>
      {children}
    </span>
  );
}
