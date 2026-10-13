import Image from "next/image";
import Link from "next/link";
import { ArchFrame } from "@/components/ui/ArchFrame";
import { ButtonLink, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { founder } from "@/content/founder";

export function FounderRoles({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <ul className="space-y-4">
      {founder.roles.map((r) => (
        <li key={r.role} className="flex gap-4">
          <span aria-hidden="true" className="mt-2.5 size-2 shrink-0 rotate-45 bg-gold" />
          <div>
            <p className={`text-lg ${tone === "dark" ? "text-ivory" : "text-emerald-900"}`}>
              {"href" in r ? (
                <Link href={r.href} className="underline decoration-gold/50 underline-offset-4 hover:decoration-gold">
                  {r.role}
                </Link>
              ) : (
                r.role
              )}
            </p>
            <p className={`text-sm ${tone === "dark" ? "text-ivory/55" : "text-muted"}`}>Source: {r.source}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function FounderFeature() {
  return (
    <section aria-labelledby="founder-heading" className="relative overflow-hidden bg-parchment py-20 md:py-28">
      <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-1/3 bg-[linear-gradient(90deg,transparent,rgba(184,149,74,.08))] lg:block" />
      <div className="container-page relative grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
          <ArchFrame className="aspect-[3/4]">
            <Image
              src={founder.portrait.src}
              alt={founder.portrait.alt}
              fill
              sizes="(min-width: 1024px) 40vw, (min-width: 640px) 24rem, 90vw"
              className="object-cover object-[50%_12%] transition-transform duration-[1.6s] ease-[var(--ease-gentle)] hover:scale-[1.03]"
            />
          </ArchFrame>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-7">
          <Eyebrow>Meet our founder</Eyebrow>
          <p lang="ar" dir="rtl" className="mt-5 text-left text-2xl text-gold-deep md:text-[1.75rem]">
            {founder.arabicName}
          </p>
          <h2 id="founder-heading" className="mt-3 text-4xl font-medium text-emerald-900 md:text-[3.4rem]">
            {founder.displayName}
          </h2>
          <p className="mt-4 font-display text-xl italic text-gold-deep">{founder.title}</p>
          <p className="mt-2 text-sm text-muted">Styled on official programmes as {founder.formalName}.</p>
          <div className="rule-gold my-8 max-w-md opacity-60" />
          <FounderRoles />
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <ButtonLink href="/founder" variant="emerald">
              Read about our founder
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
