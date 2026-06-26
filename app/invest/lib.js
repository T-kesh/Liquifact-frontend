/**
 * Returns the number of whole days between `now` and `maturityDate`.
 * Positive  → matures in N days
 * Zero      → matures today
 * Negative  → overdue by N days
 *
 * @param {string} maturityDate - ISO-8601 date string (e.g. "2026-07-01")
 * @param {Date}   now          - reference date (defaults to today; pass in for testability)
 * @returns {number}
 */
export function daysUntilMaturity(maturityDate, now = new Date()) {
  const maturity = new Date(maturityDate);
  const todayMs =
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const maturityMs =
    Date.UTC(maturity.getFullYear(), maturity.getMonth(), maturity.getDate());
  return Math.round((maturityMs - todayMs) / 86_400_000);
}
