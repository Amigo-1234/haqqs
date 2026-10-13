import { Notice } from "@/components/ui/primitives";
import { weeklyProgramme } from "@/content/activities";

const frequencyLabel = { daily: "Daily", weekly: "Weekly", monthly: "Monthly" } as const;

export function WeeklyProgramme({ showNotice = true }: { showNotice?: boolean }) {
  return (
    <div>
      <ul className="divide-y divide-sand border-y border-sand">
        {weeklyProgramme.map((a) => (
          <li key={a.name} className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 py-5 sm:grid-cols-[11rem_1fr_auto] sm:items-baseline">
            <p className="font-display text-xl text-emerald-900 sm:text-[1.35rem]">{a.name}</p>
            <p className="order-3 col-span-2 text-ink-soft sm:order-none sm:col-span-1">
              {a.when}
              {a.note && <span className="block text-sm text-muted">{a.note}</span>}
            </p>
            <div className="text-right">
              {a.time ? (
                <p className="font-semibold tabular-nums text-emerald-800">{a.time}</p>
              ) : (
                <p className="text-sm italic text-gold-deep">Time to be confirmed</p>
              )}
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted">{frequencyLabel[a.frequency]}</p>
            </div>
          </li>
        ))}
      </ul>
      {showNotice && (
        <div className="mt-5">
          <Notice>This schedule is carried over from the previous website and is being re-confirmed by the society.</Notice>
        </div>
      )}
    </div>
  );
}
