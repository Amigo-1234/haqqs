import { pageMetadata } from "@/lib/seo";
import { PageSeo } from "@/components/seo/PageSeo";
import type { Metadata } from "next";
import { DonationCard } from "@/components/sections/DonationCard";
import { Icon } from "@/components/ui/Icon";
import { Eyebrow } from "@/components/ui/primitives";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { contact, donation } from "@/content/site";

export const metadata: Metadata = pageMetadata("/donate", "Donate", "Find out how to support HAQSLAM. Bank transfer details are temporarily withheld pending confirmation.");

const steps = [
  { title: "Transfer", body: "Send your contribution to the society’s account using the details on this page." },
  { title: "Let us know", body: "If you wish, tell the society by phone or email so your support can be acknowledged." },
  { title: "Keep your receipt", body: "Your bank’s transfer confirmation is your record of the gift." },
];

export default function DonatePage() {
  return (
    <>
      <PageSeo path="/donate" name={"Donate"} />
      <PageHeader
        eyebrow="Support"
        arabic="صدقة"
        title="Support the work of HAQSLAM"
        intro="Your support sustains the society’s gatherings, classes and publications."
      />

      <section className="py-16 md:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <DonationCard headingLevel={2} />
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5">
            <Eyebrow>{donation.confirmed ? "How to give" : "Before giving"}</Eyebrow>
            <ol className="mt-6 space-y-6">
              {(donation.confirmed ? steps : [{ title: "Confirm the details", body: "Contact us on WhatsApp before making a donation. Transfer instructions will be published once the account has been reconfirmed." }]).map((s, i) => (
                <li key={s.title} className="flex gap-5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-parchment font-display text-lg text-gold-deep ring-1 ring-sand">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-display text-xl text-emerald-900">{s.title}</p>
                    <p className="mt-1 text-ink-soft">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-10 space-y-2 rounded-2xl bg-parchment p-6 ring-1 ring-sand">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold-deep">Questions about giving</p>
              <a href={contact.phone.href} className="flex items-center gap-3 text-emerald-900 hover:underline">
                <Icon name="phone" className="size-4 text-gold" /> {contact.phone.display}
              </a>
              <a href={contact.email.href} className="flex items-center gap-3 text-emerald-900 hover:underline">
                <Icon name="mail" className="size-4 text-gold" /> {contact.email.display} (awaiting confirmation)
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
