import { CopyButton } from "@/components/ui/CopyButton";
import { GirihPattern } from "@/components/ui/GirihPattern";
import { contact, donation } from "@/content/site";

export function DonationCard() {
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
