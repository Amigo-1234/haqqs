"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Emblem } from "@/components/brand/Emblem";
import { Icon } from "@/components/ui/Icon";
import { contact, site } from "@/content/site";
import { fullNav, primaryNav } from "@/content/navigation";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  const openMenu = () => {
    dialogRef.current?.showModal();
    setOpen(true);
  };
  const closeMenu = () => dialogRef.current?.close();

  return (
    <header className="sticky top-0 z-40 border-b border-gold/15 bg-emerald-950/92 text-ivory backdrop-blur-md supports-[backdrop-filter]:bg-emerald-950/80">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-gold-light focus:px-4 focus:py-2 focus:text-emerald-950"
      >
        Skip to content
      </a>
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-6 md:h-20">
        <Link href="/" className="group flex items-center gap-3" aria-label={`${site.shortName}, ${site.name}: home`}>
          <Emblem size={44} priority className="transition-transform duration-500 group-hover:-translate-y-0.5" />
          <span className="leading-none">
            <span className="block font-display text-xl font-semibold tracking-[0.08em] text-ivory">HAQSLAM</span>
            <span className="mt-1 block text-[0.68rem] uppercase tracking-[0.16em] text-gold-light/85">
              Haqiqat-s-Salam Society
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-2">
            {primaryNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative rounded-full px-3 py-2 text-[0.92rem] tracking-wide transition-colors after:absolute after:inset-x-3 after:-bottom-0.5 after:h-px after:origin-left after:bg-gold-light after:transition-transform after:duration-300 hover:text-ivory ${
                      active ? "text-ivory after:scale-x-100" : "text-ivory/72 after:scale-x-0 hover:after:scale-x-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/donate"
            className="hidden min-h-11 items-center rounded-full bg-gold-light px-5 text-sm font-semibold text-emerald-950 transition-colors hover:bg-[#e7d3a6] sm:inline-flex"
          >
            Donate
          </Link>
          <button
            type="button"
            onClick={openMenu}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="site-menu"
            className="inline-flex size-11 items-center justify-center rounded-full ring-1 ring-ivory/25 transition-colors hover:bg-ivory/10 lg:hidden"
          >
            <Icon name="menu" className="size-5" />
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        id="site-menu"
        aria-label="Site menu"
        onClose={() => setOpen(false)}
        className="site-menu m-0 h-dvh max-h-none w-screen max-w-none overflow-y-auto bg-emerald-950 p-0 text-ivory backdrop:bg-emerald-950/60"
      >
        <div className="container-page flex min-h-full flex-col pb-10">
          <div className="flex h-[4.5rem] items-center justify-between">
            <p lang="ar" dir="rtl" className="text-xl text-gold-light">
              {site.basmala}
            </p>
            <button
              type="button"
              onClick={closeMenu}
              autoFocus
              className="inline-flex size-11 items-center justify-center rounded-full ring-1 ring-ivory/25 hover:bg-ivory/10"
            >
              <Icon name="close" className="size-5" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <div className="rule-gold opacity-40" />
          <nav aria-label="Mobile" className="mt-6 flex-1">
            <ol className="space-y-1">
              {fullNav.map((item, i) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href} className="menu-item" style={{ animationDelay: `${60 + i * 35}ms` }}>
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-baseline gap-4 rounded-lg py-2.5 font-display text-[1.7rem] leading-tight transition-colors ${
                        active ? "text-gold-light" : "text-ivory hover:text-gold-light"
                      }`}
                    >
                      <span className="w-6 font-sans text-xs tabular-nums text-gold-light/60">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ol>
          </nav>
          <div className="mt-8 space-y-2 border-t border-ivory/10 pt-6 text-sm text-ivory/70">
            <a href={contact.phone.href} className="flex items-center gap-3 py-1 hover:text-ivory">
              <Icon name="phone" className="size-4 text-gold-light" /> {contact.phone.display}
            </a>
            <a href={contact.email.href} className="flex items-center gap-3 py-1 hover:text-ivory">
              <Icon name="mail" className="size-4 text-gold-light" /> {contact.email.display}
            </a>
            <p lang="ar" dir="rtl" className="pt-3 text-right text-2xl text-gold-light/80">
              {site.motto.arabic}
            </p>
          </div>
        </div>
      </dialog>
    </header>
  );
}
