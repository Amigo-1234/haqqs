import type { Metadata } from "next";
import { MarkazFeature } from "@/components/sections/MarkazFeature";
import { Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { annualEvents } from "@/content/events";
import { partners } from "@/content/site";

export const metadata: Metadata = {
  title: "Markazul Ginaa",
  description: `${partners.markaz.fullName}: the educational institution led by the founder of HAQSLAM.`,
};

export default function MarkazPage() {
  const coHosted = annualEvents.filter((e) => e.partners.some((p) => p.startsWith("Markazu")));
  return (
    <>
      <MarkazFeature headingLevel={1} />
      <section className="py-16 md:py-24">
        <div className="container-page grid gap-12 md:grid-cols-2">
          <Reveal>
            <Eyebrow>Two institutions, one community</Eyebrow>
            <h2 className="mt-4 text-3xl text-emerald-900 md:text-4xl">How HAQSLAM and Markazul Ginaa relate</h2>
            <div className="mt-6 space-y-4 text-lg text-ink-soft">
              <p>
                HAQSLAM is the society for worship, remembrance and community. Markazul Ginaa is the educational
                institution, led by the founder of HAQSLAM as its Mudeer.
              </p>
              <p>
                Each keeps its own systems. This website does not hold student records or accounts, and signing in to
                Markazul Ginaa happens only on its own platform.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Eyebrow>Together</Eyebrow>
            <h2 className="mt-4 text-3xl text-emerald-900 md:text-4xl">Shared occasions</h2>
            <ul className="mt-6 space-y-4">
              {coHosted.map((e) => (
                <li key={e.slug} className="rounded-2xl bg-parchment p-6 ring-1 ring-sand">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-deep">{e.year}</p>
                  <p className="mt-1 font-display text-xl text-emerald-900">{e.title}</p>
                  <p className="mt-1 text-sm text-muted">Co-hosted with {partners.markaz.fullName}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
