import type { Metadata } from "next";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { ButtonLink, Eyebrow } from "@/components/ui/primitives";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { contact } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Visit or contact Haqiqat-s-Salam Society of Nigeria in Ijaye-Ojokoro, Lagos.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Visit & contact"
        arabic="أهلا وسهلا"
        title="You are welcome among us"
        intro="Join us for prayer and our gatherings, ask a question, or share photographs and history of the society."
      />

      <section className="py-16 md:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-8">
            <ContactDetails />
          </Reveal>
          <Reveal delay={120} className="lg:col-span-4">
            <div className="rounded-[1.75rem] bg-emerald-900 p-7 text-ivory md:p-9">
              <Eyebrow tone="dark">Write to us</Eyebrow>
              <h2 className="mt-4 text-2xl md:text-3xl">Send a message</h2>
              <p className="mt-3 text-ivory/75">
                Email is the best way to reach the society with questions, requests or photographs. An online form will be
                added in a later phase.
              </p>
              <div className="mt-7">
                <ButtonLink href={`${contact.email.href}?subject=${encodeURIComponent("Message from the HAQSLAM website")}`} icon="mail">
                  Email the society
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
