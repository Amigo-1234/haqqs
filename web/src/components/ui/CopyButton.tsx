"use client";

import { useState } from "react";
import { Icon } from "./Icon";

export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold text-gold-light ring-1 ring-gold-light/40 transition-colors hover:bg-gold-light/10"
    >
      <Icon name={copied ? "check" : "copy"} className="size-4" />
      <span aria-live="polite">{copied ? "Copied" : label}</span>
    </button>
  );
}
