import Link from "next/link";
import { Emblem } from "@/components/brand/Emblem";
import { GirihPattern } from "@/components/ui/GirihPattern";
import { Icon } from "@/components/ui/Icon";
import { fullNav } from "@/content/navigation";
import { contact, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-emerald-950 text-ivory/75">
      <GirihPattern className="text-gold opacity-[0.06]" />
      <div className="container-page relative pb-10 pt-16 md:pt-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-4">
              <Emblem size={72} />
              <div>
                <p className="font-display text-2xl text-ivory">{site.shortName}</p>
                <p className="text-sm text-gold-light/85">{site.name}</p>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed">{site.description}</p>
            <p lang="ar" dir="rtl" className="mt-6 text-left text-3xl text-gold-light">
              {site.motto.arabic}
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">Explore</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-[0.95rem] md:grid-cols-1">
              {fullNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-ivory">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">Visit & contact</p>
            <address className="mt-4 space-y-4 text-[0.95rem] not-italic">
              <p className="flex gap-3">
                <Icon name="pin" className="mt-1 size-4 shrink-0 text-gold-light" />
                <span>
                  {contact.secretariat.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </span>
              </p>
              <a href={contact.phone.href} className="flex items-center gap-3 hover:text-ivory">
                <Icon name="phone" className="size-4 text-gold-light" />
                {contact.phone.display}
              </a>
              <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-1 hover:text-ivory"><Icon name="phone" className="size-4 text-gold-light" /> WhatsApp<span className="sr-only"> (opens in a new tab)</span></a>
              <a href={contact.email.href} className="flex items-center gap-3 hover:text-ivory">
                <Icon name="mail" className="size-4 text-gold-light" />
                {contact.email.display} <span className="text-xs">(awaiting confirmation)</span>
              </a>
            </address>
          </div>
        </div>

        <div className="rule-gold mt-14 opacity-30" />
        <div className="mt-6 flex flex-col gap-2 text-xs text-ivory/50 md:flex-row md:items-center md:justify-between">
          <p>© Haqiqat-s-Salam Society of Nigeria. All rights reserved.</p>
          <p>Markazul Ginaa operates its own separate platform.</p>
        </div>
      </div>
    </footer>
  );
}
