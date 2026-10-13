import Image from "next/image";
import Link from "next/link";
import { ArchFrame } from "@/components/ui/ArchFrame";
import { GirihPattern } from "@/components/ui/GirihPattern";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/primitives";
import { founder } from "@/content/founder";
import { site } from "@/content/site";

const explore = [
  { href: "/founder", label: "Our Founder", detail: "Khalifatu Khulafahi Ojokoro" },
  { href: "/activities", label: "Gatherings", detail: "Asalatu, Wasifat & more" },
  { href: "/library", label: "Islamic Library", detail: "Four devotional books" },
  { href: "/markaz", label: "Markazul Ginaa", detail: "Our educational institution" },
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-emerald-950 text-ivory">
      <GirihPattern className="text-gold opacity-[0.07]" />
      <div aria-hidden="true" className="absolute -right-48 -top-48 size-[46rem] rounded-full bg-emerald-700/25 blur-3xl" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-emerald-950 to-transparent" />

      <div className="container-page relative grid gap-14 pb-36 pt-10 sm:pt-14 lg:grid-cols-12 lg:items-center lg:gap-8 lg:pb-44 lg:pt-16">
        <div className="lg:col-span-7">
          <p lang="ar" dir="rtl" className="text-left text-xl text-gold-light/90 md:text-2xl">
            {site.basmala}
          </p>
          <p
            lang="ar"
            dir="rtl"
            className="mt-6 text-left text-[3.9rem] leading-[1.25] text-gold-light sm:text-7xl lg:text-[6.4rem]"
          >
            {site.arabicShort}
          </p>
          <h1 id="hero-title" className="mt-2 max-w-3xl text-[2.6rem] font-normal leading-[1.04] text-ivory sm:text-6xl lg:text-[4.4rem]">
            Haqiqat-s-Salam <span className="italic text-gold-light/95">Society</span> of Nigeria
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ivory/78 md:text-xl">
            Welcome to HAQSLAM, a community of worship, remembrance and learning in Ijaye-Ojokoro, Lagos, gathered under one
            testimony: <span className="text-gold-light">{site.motto.transliteration}</span>.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/activities">Our weekly gatherings</ButtonLink>
            <ButtonLink href="/prayer-times" variant="outline-light" icon="clock">
              Prayer times
            </ButtonLink>
          </div>

          <nav aria-label="Explore HAQSLAM" className="mt-14">
            <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-ivory/10 ring-1 ring-ivory/10 sm:grid-cols-4">
              {explore.map((item) => (
                <li key={item.href} className="bg-emerald-950/60">
                  <Link
                    href={item.href}
                    className="group flex h-full flex-col justify-between gap-3 p-4 transition-colors hover:bg-emerald-900/80"
                  >
                    <span className="flex items-center justify-between font-display text-[1.05rem] text-ivory">
                      {item.label}
                      <Icon name="arrowRight" className="size-4 text-gold-light transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <span className="text-xs leading-snug text-ivory/55">{item.detail}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-md lg:col-span-5 lg:max-w-none">
          <ArchFrame className="aspect-[4/5]" outline="text-gold-light/45">
            <Image
              src={founder.portrait.src}
              alt={founder.portrait.alt}
              fill
              priority
              sizes="(min-width: 1024px) 38vw, (min-width: 640px) 28rem, 90vw"
              className="animate-slow-zoom object-cover object-[50%_10%]"
            />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-emerald-950/85 to-transparent" />
            <p className="absolute inset-x-0 bottom-0 pb-6 pl-32 pr-6 text-right text-sm text-ivory/90 sm:pl-36">
              <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold-light">Founder</span>
              {founder.displayName}
            </p>
          </ArchFrame>

          {/* Motto seal */}
          <div className="absolute -bottom-8 -left-3 flex size-32 flex-col items-center justify-center rounded-full bg-ivory text-center shadow-[0_20px_40px_-20px_rgba(0,0,0,.7)] ring-1 ring-gold/50 sm:-left-8 sm:size-36">
            <span aria-hidden="true" className="absolute inset-1.5 rounded-full ring-1 ring-gold/40" />
            <span lang="ar" dir="rtl" className="text-[1.35rem] leading-tight text-emerald-900 sm:text-2xl">
              {site.motto.arabic}
            </span>
            <span className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-gold-deep">Our motto</span>
          </div>
        </div>
      </div>
    </section>
  );
}
