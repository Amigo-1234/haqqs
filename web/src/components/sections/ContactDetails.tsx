import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/primitives";
import { contact } from "@/content/site";

export function ContactDetails() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div className="rounded-2xl bg-ivory p-6 ring-1 ring-sand sm:col-span-2 md:p-8">
        <div className="flex items-start gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-emerald-900 text-gold-light">
            <Icon name="pin" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-deep">{contact.secretariat.label}</p>
            <address className="mt-2 font-display text-xl not-italic leading-snug text-emerald-900 md:text-2xl">
              {contact.secretariat.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
            <div className="mt-5">
              <ButtonLink href={contact.secretariat.mapUrl} external variant="outline-dark">
                Open in Google Maps
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>

      <a
        href={contact.phone.href}
        className="group rounded-2xl bg-ivory p-6 ring-1 ring-sand transition-shadow hover:shadow-lg"
      >
        <Icon name="phone" className="size-5 text-gold" />
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold-deep">Call</p>
        <p className="mt-1 font-display text-xl text-emerald-900 group-hover:text-emerald-700">{contact.phone.display}</p>
      </a>
      <a
        href={contact.email.href}
        className="group rounded-2xl bg-ivory p-6 ring-1 ring-sand transition-shadow hover:shadow-lg"
      >
        <Icon name="mail" className="size-5 text-gold" />
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold-deep">Email</p>
        <p className="mt-1 break-all font-display text-xl text-emerald-900 group-hover:text-emerald-700">
          {contact.email.display}
        </p>
      </a>

      <div className="rounded-2xl p-6 ring-1 ring-sand sm:col-span-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-deep">{contact.branch.label}</p>
        <p className="mt-1 text-lg text-emerald-900">{contact.branch.lines.join(", ")}</p>
      </div>
    </div>
  );
}
