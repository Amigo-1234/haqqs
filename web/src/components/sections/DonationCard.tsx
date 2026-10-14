import { CopyButton } from "@/components/ui/CopyButton";
import { GirihPattern } from "@/components/ui/GirihPattern";
import { contact, donation } from "@/content/site";

export function DonationCard({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  if (!donation.confirmed) return (
    <div className="relative overflow-hidden rounded-[1.75rem] bg-emerald-900 p-7 text-ivory ring-1 ring-gold/30 sm:p-9">
      <GirihPattern className="text-gold opacity-[0.07]" />
      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">Donations temporarily paused</p>
        <Heading className="mt-5 text-2xl">Donation details are being confirmed</Heading>
        <p className="mt-4 text-ivory/80">Bank details from the previous website are withheld until they have been reconfirmed. Please do not transfer money using an old account number.</p>
        <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-11 items-center rounded-full px-5 font-semibold text-gold-light ring-1 ring-gold-light/40">Ask about supporting HAQSLAM<span className="sr-only"> (opens in a new tab)</span></a>
      </div>
    </div>
  );
  return (
    <div className="relative overflow-hidden rounded-[1.75rem] bg-emerald-900 p-7 text-ivory shadow-[0_40px_80px_-45px_rgba(7,29,28,.9)] ring-1 ring-gold/30 sm:p-9">
      <GirihPattern className="text-gold opacity-[0.07]" />
      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">Bank transfer</p>
        <dl className="mt-6 space-y-5">
          <div>
            <dt className="text-sm text-ivory/60">Bank</dt>
            <dd className="text-lg">{donation.bank}</dd>
          </div>
          <div>
            <dt className="text-sm text-ivory/60">Account name</dt>
            <dd className="text-lg tracking-wide">{donation.accountName}</dd>
          </div>
          <div>
            <dt className="text-sm text-ivory/60">Account number</dt>
            <dd className="mt-1 flex flex-wrap items-center gap-4">
              <span className="font-display text-[2.2rem] leading-none tracking-[0.12em] tabular-nums text-gold-light">
                {donation.accountNumber}
              </span>
              <CopyButton value={donation.accountNumber} label="Copy number" />
            </dd>
          </div>
        </dl>
        <div className="rule-gold my-7 opacity-30" />
        <p className="text-sm text-ivory/70">
          Online card payments are not yet available. After giving, you are welcome to let the society know by{" "}
          <a href={contact.phone.href} className="text-gold-light underline underline-offset-4">
            phone
          </a>{" "}
          or{" "}
          <a href={contact.email.href} className="text-gold-light underline underline-offset-4">
            email
          </a>
          .
        </p>
      </div>
    </div>
  );
}
