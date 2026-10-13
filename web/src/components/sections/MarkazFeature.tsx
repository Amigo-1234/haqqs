import Image from "next/image";
import { GirihPattern } from "@/components/ui/GirihPattern";
import { ButtonLink, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { partners } from "@/content/site";

const { markaz } = partners;

export function MarkazLink({ showAbout = true }: { showAbout?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {markaz.url ? (
        <ButtonLink href={markaz.url} external>
          Visit Markazul Ginaa
        </ButtonLink>
      ) : (
        <span className="inline-flex min-h-12 items-center rounded-full px-6 text-[0.95rem] font-semibold text-ivory/60 ring-1 ring-inset ring-ivory/20">
          Website link coming soon
        </span>
      )}
      {showAbout && (
        <ButtonLink href="/markaz" variant="outline-light">
          About Markazul Ginaa
        </ButtonLink>
      )}
    </div>
  );
}

export function MarkazFeature({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const onOwnPage = headingLevel === 1;
  const Heading = headingLevel === 1 ? "h1" : "h2";
  return (
    <section aria-labelledby="markaz-heading" className="relative overflow-hidden bg-emerald-900 py-20 text-ivory md:py-28">
      <GirihPattern className="text-gold opacity-[0.07]" tile={120} />
      <div aria-hidden="true" className="absolute -left-40 bottom-0 size-[36rem] rounded-full bg-emerald-600/20 blur-3xl" />
      <div className="container-page relative grid items-center gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <Eyebrow tone="dark">Education</Eyebrow>
          <p lang="ar" dir="rtl" className="mt-6 text-left text-5xl leading-tight text-gold-light md:text-6xl">
            {markaz.arabic}
          </p>
          <Heading id="markaz-heading" className="mt-2 text-4xl font-medium md:text-5xl">
            {markaz.name}
          </Heading>
          <p className="mt-3 text-sm uppercase tracking-[0.14em] text-ivory/60">{markaz.fullName}</p>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ivory/80">
            Markazul Ginaa is the educational institution led by our founder as Mudeer (Director). It works alongside
            HAQSLAM, co-hosting occasions such as the Annual Maolid Nabiyy.
          </p>
          <p className="mt-4 max-w-xl text-ivory/70">
            Students, parents and staff use Markazul Ginaa’s own platform. It is run separately from this website, with its
            own sign-in and records.
          </p>
          <div className="mt-10">
            <MarkazLink showAbout={!onOwnPage} />
          </div>
        </Reveal>

        <Reveal delay={150} className="lg:col-span-5">
          <figure className="relative mx-auto max-w-sm rounded-[2rem] bg-ivory p-8 text-center text-ink shadow-[0_40px_80px_-40px_rgba(0,0,0,.6)] ring-1 ring-gold/40">
            <Image
              src={markaz.logo}
              alt="Markazul Ginaa logo"
              width={355}
              height={373}
              sizes="(min-width: 1024px) 14rem, 12rem"
              className="mx-auto h-auto w-48 lg:w-56"
            />
            <figcaption className="mt-6">
              <p lang="ar" dir="rtl" className="text-3xl text-emerald-800">
                {markaz.motto.arabic}
              </p>
              <p className="font-display text-lg italic text-gold-deep">{markaz.motto.english}</p>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
