# UI Component Reference

## InvoiceList

Renders the invest marketplace invoice cards. Each card shows issuer, amount, yield, maturity date, and a **days-until-maturity badge** derived from `invoice.dueDate`.

### Props

| Prop       | Type    | Default      | Description                                          |
|------------|---------|--------------|------------------------------------------------------|
| `invoices` | Array   | required     | Array of invoice objects (see data contract below).  |
| `now`      | Date    | `new Date()` | Reference date for computing badge; pass in tests.   |

### Invoice data contract (per item)

```ts
{
  id:       string   // unique key
  issuer:   string   // company name
  amount:   string   // formatted number, e.g. "12,500"
  currency: string   // e.g. "USD"
  dueDate:  string   // ISO-8601 date, e.g. "2026-07-01"
  yield:    string   // illustrative, e.g. "8.2%"
  status:   string   // e.g. "Open"
}
```

### Maturity badge states

| Days to maturity | Label                     | Visual style |
|------------------|---------------------------|--------------|
| > 0              | "Matures in N day(s)"     | Slate/neutral |
| 0                | "Matures today"           | Yellow        |
| < 0              | "Overdue by N day(s)"     | Red           |

Overdue state is **always conveyed through text**, never colour alone (WCAG 1.4.1).

### Example

```jsx
import InvoiceList from "@/components/InvoiceList";

<InvoiceList invoices={invoices} />

// In tests, pass a fixed reference date:
<InvoiceList invoices={invoices} now={new Date("2026-06-26")} />
```

---

## daysUntilMaturity (app/invest/lib.js)

Helper that returns the number of whole days between a reference date and a maturity date.

```js
import { daysUntilMaturity } from "@/app/invest/lib";

daysUntilMaturity("2026-07-06", new Date("2026-06-26")); // → 10
daysUntilMaturity("2026-06-26", new Date("2026-06-26")); // → 0
daysUntilMaturity("2026-06-16", new Date("2026-06-26")); // → -10
```

Positive → future, zero → today, negative → overdue. Time-of-day differences in `now` are ignored (comparison is at UTC midnight).

---

## Footer

Provides the site footer with navigation links.

**Props:** none.

---

## ErrorBanner

Displays an error message with variant styling.

**Props:**
- `variant` (string): `"default"` | `"warning"` | `"error"` – determines color.
- `message` (string): The error text.

---

## InvoiceListSkeleton

Skeleton placeholder for invoice list while loading.

**Props:**
- `rows` (number, default `5`): Number of placeholder rows.

---

## Invest Marketplace (`/invest`)

The `/invest` page uses a polite live region to announce when the skeleton resolves:
- loaded: `N investable invoices loaded`
- empty: `No invoices available`

---

## WalletStatus

Shows connection status of Stellar wallet.

**Props:**
- `status` (`'connected' | 'disconnected' | 'loading'`)
