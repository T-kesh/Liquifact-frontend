import { daysUntilMaturity } from "@/app/invest/lib";

/**
 * Returns badge label + Tailwind classes for the maturity badge.
 * Accessible: state is always conveyed through text, not colour alone.
 *
 * @param {number} days - output of daysUntilMaturity()
 * @returns {{ label: string, className: string }}
 */
export function getMaturityBadgeProps(days) {
  if (days < 0) {
    return {
      label: `Overdue by ${Math.abs(days)} day${Math.abs(days) === 1 ? "" : "s"}`,
      className:
        "inline-flex items-center rounded-full bg-red-900/60 px-2.5 py-0.5 text-xs font-semibold text-red-300",
    };
  }
  if (days === 0) {
    return {
      label: "Matures today",
      className:
        "inline-flex items-center rounded-full bg-yellow-900/60 px-2.5 py-0.5 text-xs font-semibold text-yellow-300",
    };
  }
  return {
    label: `Matures in ${days} day${days === 1 ? "" : "s"}`,
    className:
      "inline-flex items-center rounded-full bg-slate-700/60 px-2.5 py-0.5 text-xs font-semibold text-slate-300",
  };
}

/**
 * InvoiceList
 *
 * Renders the marketplace invoice cards.  Each card includes a
 * "days-until-maturity" badge derived from `invoice.dueDate`.
 *
 * Props:
 * - invoices  {Array}  - invoice objects (id, issuer, amount, currency, dueDate, yield, status)
 * - now       {Date}   - reference date; defaults to today (pass in for testability)
 */
export default function InvoiceList({ invoices, now = new Date() }) {
  return (
    <ul className="space-y-4">
      {invoices.map((inv) => {
        const days = daysUntilMaturity(inv.dueDate, now);
        const badge = getMaturityBadgeProps(days);

        return (
          <li
            key={inv.id}
            className="rounded-xl border border-slate-800 bg-slate-900/50 p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-slate-100">{inv.issuer}</span>
              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-cyan-900/60 text-cyan-300">
                {inv.status}
              </span>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-slate-300 items-center">
              <span>
                {inv.currency}&nbsp;{inv.amount}
              </span>
              <span>Est. yield&nbsp;{inv.yield}</span>
              <span>Maturity&nbsp;{inv.dueDate}</span>

              {/* Maturity badge – state conveyed by text, not colour alone */}
              <span
                className={badge.className}
                aria-label={badge.label}
              >
                {badge.label}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
